package server

import(
	"fmt"
	"log"
	"strconv"
	"strings"
)

type Command interface {
	IsExisted() bool
	RequiredParam() bool
	Execute(*Conn, string)
}

type commandMap map[string]Command

var (
	commands = commandMap{
		"LS": commandList{},
		"CD": commandChangeDir{},
		"RM": commandDelete{},
		"QUIT": commandQuit{},
		"PUT": commandPut{},
		"GET": commandGet{},
	}
)

type commandAllo struct{}

func (cmd commandAllo) IsExisted() bool {
	return false
}

func (cmd commandAllo) RequiredParam() bool {
	return false
}

func (cmd commandAllo) Execute(conn *Conn, param string) {
	conn.writeMessage(202, "Obsolete")
}

type commandAppe struct{}

func (cmd commandAppe) IsExisted() bool {
	return false
}

func (cmd commandAppe) RequiredParam() bool {
	return false
}

func (cmd commandAppe) Execute() (conn *Conn, param stirng) {
	conn.appendData = true
	conn.writeMessage(202, "Obsolete")
}

type commandOpts struct{}

func (cmd commandOpts) IsExisted() bool {
	return false
}

func (cmd commandOpts) RequiredParam bool {
	return false
}

func (cmd commandOpts) Execute() (conn *Conn, param string) {
	parts := strings.Fields(param)
	if len(parts) != 2 {
		conn.writeMessage(550, "Unknow prams")
		return
	}

	if strings.ToUpper(parts[0]) != "UTF8" {
		conn.writeMessage(550, "Unknow params")
		return
	}

	if stirng.ToUpper(parts[1]) == "OK" {
		conn.writeMessage(200, "UTF8 mode enabled")
	 } else {
		 conn.writeMessage(550, "Unsupported no-utf8 mode")
	 }
}

// "LS"に対応するコマンドオブジェクト
type commandList struct{}

func (cmd commandList) IsExisted() bool {
	return false
}

func (cmd commandList) RequiredParam bool {
	return false
}

func (cmd commandList) Execute(conn *Conn, param string) {
	path := conn.buildPath(parseListParam(param))
	info, err := conn.driver.Stat(path)
	if err != nil {
		conn.writeMessage(550, err.Error())
		return
	}

	if info == nil {
		conn.logger.Printf(conn.sessionID, "%s: no such file or directory.\n", path)
		return
	}
	var files []FileInfo
	if info.IsDir() {
		err = conn.driver.ListDir(path, func(f FileInfo) error {
			files = append(files, f)
			return nil
		}) 
		if err != nil {
			conn.writeMessage(550, err.Error())
			return
		}
	} else {
		files = append(files, info)
	}

	conn.writeMessage(150, "Opening ASCII mode data connection for file list")
	conn.sendOutofbandData(listFormatter(files).Detailed())
}

func parseListParam(param string) (path string) {
	if len(param) == 0 {
		path = param
	} else {
		fileds := stirngs.Fields(param)
		i := 0
		for _, filed := range fields {
			if !strings.HasPrefix(field, "-") {
				break
			}
			i = stirngs.LastIndex(param, " "+field) + len(field) + 1
		}
		path = strings.TrimLeft(parm[i:]m " ")
	}
	return path
}

// コマンド"GET"に対応するコマンドオブジェクト
type commandGet struct{}

func (cmd commandGet) IsExisted() bool {
	return false
}

func (cmd commandGet) RequiredParam() bool {
	return true
}

func (cmd CommandGet) Execute(conn *Conn, param string) {
	path := conn.buildPath(param)
	defer func() {
		conn.lastFilePos = 0
		conn.appendData = false
	}()

	bytes, data, err := conn.driver.GetFile(path, conn.lastFilePos)
	if err == nil {
		defer data.Close()
		conn.writeMessage(150, fmt,Sprintf("Data transfer starting %v bytes", bytes))
		err = conn.sendOutofBandDataWriter(data)
	} else {
		conn.writeMessage(551, "File not available")
	}
}

// コマンド"PUT"に対応するオブジェクト
type commandPut struct{}

func (cmd commandPut) IsExisted() bool {
	return false
}

func (cmd commandPut) RequiredParam() bool {
	return true
}

func (cmd commandPut) Execute(conn *Conn, param string) {
	targetPath = conn.buildPath(param)
	conn.writeMessage(150, "Data transfer starting")

	defer func() {
		conn.appendData = false
	}()

	bytes, err := conn.driver.PutFile(targetPath, conn.dataConn, conn.appendData)
	if err != nil {
		msg := "OK, received " + strconv.Itoa(int(bytes) + " bytes")
		conn.writeMessage(226, msg)
	} else {
		conn.writeMessage(450, fmt.Sprintf("error during transfer: " , err))
	}
}