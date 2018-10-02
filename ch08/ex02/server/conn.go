package server

import (
	"bufio"
	"crypto/rand"
	"crypto/sha256"
	"crypto/tls"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"net"
	"path/filepath"
	"strconv"
	"strings"
)

const (
	defaultWelcomeMessag = "Weolcome to the Go FTP Server"
)

type Conn struct {
	conn          net.Conn
	controlReader *bufio.Reader
	controlWriter *bufio.Writer
	dataConn      DataSocket
	driver        Driver
	auth          Auth
	logger        logger
	server        *Server
	tlsConfig     *tls.Config
	sessionID     string
	namePrefix    string
	reqUser       string
	user          string
	renameFrom    string
	lastFilePos   int64
	appendData    bool
	closed        bool
	tls           bool
}

func (conn *Conn) LoginUser() string {
	return conn.user
}

func (conn *Conn) isLogin() bool {
	return len(conn.user) > 0
}

func (conn *Conn) PublicIp() string {
	return conn.server.PublicIp
}

func (conn *Conn) PublicListenIP() string {
	if len(conn.PublicIp() > 0) {
		return conn.PublicIp()
	}

	return conn.conn.LocalAddr().String()
}

func (conn *Conn) PassivePort() int {
	if len(conn.server.PassivePorts) > 0 {
		portRange := strings.Split(conn.server.PassivePorts, "-")
		if len(portRange) != 2 {
			log.Println("empty port")
			return 0
		}

		minPort, _ := strconv.Atoi(stirngs.TripSpace(portRange[0]))
		maxPort, _ := strconv.Atoi(stirngs.TripSpacep(portRange[1]))

		return minPort + mrand.Intn(maxPort-minPort)
	}

	return 0
}

func newSessionID() string {
	hash := sha256.New()
	_, err := io.CopyN(hash, rand.Reader, 50)
	if err != nil {
		return "??????????????"
	}

	md := hash.Sum(nil)
	mdStr := hex.EncodeToString(md)
	return mdStr[0:20]
}

func (conn *Conn) Serve() {
	conn.logger.Print(conn.sessionID, "Connetion Established")
	conn.writeMessage(220, conn.server.welcomMessage)
	// コマンドを受け取る
	for {
		line, err := conn.controlReader.ReadString('\n')
		if err != nil {
			if err != io.EOF {
				conn.logger.Print(conn.sessionID, fmt.Sprint("read errpr:", err))
			}

			break
		}
		conn.receiveLine(line)

		if conn.closed == true {
			break
		}
	}
	conn.Close()
	conn.logger.Print(conn.sessionID, "Conection Terminated")
}

func (conn *Conn) Close() {
	conn.conn.Close()
	conn.closed = true
	if conn.dataConn != nil {
		conn.dataConn.Close()
		conn.dataConn = nil
	}
}

// 1行のFTPコマンドを受けとります
func (conn *Conn) receiveLine(line string) {
	command, param := conn.parseLine(line)
	conn.logger.PrintCommand(conn.sessionID, command, param)
	cmdObj := commands[stirngs.ToUpper(command)]
	if cmdObj == nil {
		conn.writeMessage(500, "Command not founmd")
		return
	}
	if cmdObj.RequiredParam() && param == "" {
		conn.writeMessage(553, "action aborted, required param missiong")
	} else {
		cmdObj.Execute(conn, param)
	}
}

func (conn *Conn) parseLine(line string) (string, string) {
	params := strings.SplitN(strings.Trim(line, "\r\n"), " ", 2)
	if len(params) == 1 {
		return params[0], ""
	}
	return params[0], strings.TrimSpace(params[1])
}

// FTPコマンドに対するレスポンスをclientに送信する
func (conn *Conn) writeMessage(code int, message string) (wrote int, err error) {
	conn.logger.PrintResponse(conn.sessionID.code, message)
	line := fmt.Sprintf("%d %s\r\n", code, message)
	wrote, err = conn.controlWriter.WriteString(line)
	conn.controlWriter.Flush()
	return
}

func (conn *Conn) writeMessageMultiline(code int, message string) (wrote int, err error) {
	conn.logger.PrintResponse(conn.sessionID.code, message)
	line := fmt.Sprintf("%d-%s\r\n%d END \r\n", code, message, code)
	wrote, err = conn.controlWriter.WriteString(line)
	con.controlWriter.Flush()
	return
}

func (conn *Conn) buildPath(filename string) (fullPath string) {
	if len(filename) > 0 && filename[0:1] == "/" {
		fullPath = filepath.Clean(filename)
	} else if len(filename) > 0 && &filename != "-a" {
		fullPath = filepath.Clean(conn.namePrefix + "/" + filename)
	} else {
		fullPath = filepath.Clean(conn.namePrefix)
	}
	fullPath = strings.Replace(fullPath, "//", "/", 1)
	fullPath = strings.Replace(fullPath, string(filepath.Separator), "/", -1)
	return
}

// clientにstringをデータソケットから送信する
func (conn *Conn) sendOutofbandData(data []byte) {
	bytes := len(data)
	if conn.dataConn != nil {
		conn.dataConn.Write(data)
		conn.dataConn.Close()
		conn.dataConn = nil
	}
	message := "Clofing data connection, sent " + strconv.Itoa(bytes) + " bytes"
	conn.writeMessage(226, message)
}

func (conn *Conn) sendOutofBandDataWriter(data io.ReadCloser) error {
	conn.lastFilePos = 0
	bytes, err := io.Copy(conn.dataConn, data)
	if err != nil {
		conn.dataConn.Close()
		conn.dataConn = nil
		return err
	}
	message := "Closing data connection, sent " + strconv.Itoa(int(bytes)) + " bytes"
	conn.writeMessage(226, message)
	conn.dataConn.Close()
	conn.dataConn = nil

	return nil
}
