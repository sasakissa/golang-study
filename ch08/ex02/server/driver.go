package server

import "io"

type DriveFactory interface {
	NewDriver() (Driver, error)
}

// ftpのコマンド操作をデータ層に対して実行するためのinterface
// 実装クラスはfile-driverパッケージ内にある
type Driver interface {
	Init(*Conn)

	// params  パス
	// returns パスへの移動が許可されいるかどうか
	CnageDir(string) error

	// params パス
	// エラー
	ListDir(string) error

	// params パス
	// returns ディレクトリの削除の成否
	DeleteDir(string) error

	// params パス
	// returs ファイルの削除の成否
	DeleteFile(string) error

	// parasm パス
	// returns 新しいディレクトリの作成の成否
	MakeDir(string) error

	// params パス
	// returns ファイルの中身
	GetFile(string, int64) (int64, io.ReadCLoser, error)

	// params パス、ファイルデータを含むio.Reader
	// returns 書き込まれたバイト数と発生したエラー
	PutFile(stirng, io.Reader, bool) (int64, error)
}
