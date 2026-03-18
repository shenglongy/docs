# Go 常用命令与模块基础

这篇笔记记录 Go 开发中常用的一组命令，重点偏向模块管理、依赖升级、测试和日常开发速查。

## 当前最值得先记住的命令

```bash
go version
go run .
go test ./...
go mod tidy
go get -u ./...
```

## 启动一个 Go 程序

最常见的方式是运行当前目录下的 `main` 包：

```bash
go run .
```

说明：

- 适合开发阶段快速启动程序
- `.` 表示当前目录
- Go 会在当前目录查找 `package main` 和 `func main()`

如果项目把入口放在 `cmd/api` 这类目录下，也可以这样运行：

```bash
go run ./cmd/api
```

## 运行测试

```bash
go test ./...
```

说明：

- 运行当前模块下所有包的测试
- `./...` 表示递归匹配当前模块里的所有包

## 查看 Go 版本

```bash
go version
```

说明：

- 查看本机当前安装的 Go 版本

## 整理模块依赖

```bash
go mod tidy
```

作用：

- 补齐代码实际需要的依赖
- 删除不再需要的依赖
- 更新 `go.mod` 和 `go.sum`

常见使用场景：

- 新增了 import 之后
- 删除了不再使用的包之后
- 升级依赖之后

## 升级依赖

```bash
go get -u ./...
```

作用：

- 升级当前模块使用到的依赖
- 直接依赖和间接依赖都可能一起变化

说明：

- 升级后通常还需要执行一次 `go mod tidy`
- 最后再用 `go test ./...` 验证

## 指定版本安装或升级依赖

```bash
go get github.com/gin-gonic/gin@v1.12.0
```

作用：

- 把某个依赖升级或降级到指定版本

## 常见组合命令

升级依赖时常见流程：

```bash
go get -u ./...
go mod tidy
go test ./...
```

可以理解为：

1. 先升级
2. 再整理
3. 最后验证

## go run、go build、go install 的区别

### go run

```bash
go run .
```

作用：

- 直接运行当前目录下的 Go 程序
- 适合开发阶段快速调试

也可以指定目录：

```bash
go run ./cmd/api
```

也可以指定单个文件：

```bash
go run main.go
```

说明：

- `go run .` 更偏“按包运行”
- `go run main.go` 更偏“按文件运行”
- 如果当前包里有多个文件，通常更推荐 `go run .`

### go build

```bash
go build
```

作用：

- 编译当前包
- 生成可执行文件

也可以指定输出文件名：

```bash
go build -o app
```

适合场景：

- 想确认代码可以成功构建
- 想得到一个明确的可执行文件
- 部署前打包程序

### go install

```bash
go install
```

作用：

- 编译并安装可执行文件到 Go 的 bin 目录

更常见的使用方式是安装工具：

```bash
go install golang.org/x/tools/cmd/stringer@latest
```

适合场景：

- 安装 Go 命令行工具
- 希望工具可以全局执行

### 一个简单记法

- `go run`：直接跑
- `go build`：编译出文件
- `go install`：安装到 bin

## go.mod 和 go.sum 的区别

`go.mod`：

- 记录当前模块的基础信息
- 声明模块名
- 声明 Go 版本
- 声明依赖版本

`go.sum`：

- 记录依赖包的校验信息
- 用来保证依赖下载内容一致

可以简单理解为：

- `go.mod` 管“依赖声明”
- `go.sum` 管“依赖校验”

## go.mod 和 go.sum 是怎么生成的

### go.mod 的生成方式

通常先执行：

```bash
go mod init 模块名
```

例如：

```bash
go mod init example/server
```

执行后，Go 会创建 `go.mod`，并写入当前模块名。

后续当你执行这些命令时，`go.mod` 还会继续被更新：

- `go get`
- `go mod tidy`
- `go test`
- `go run`

如果代码里新增了依赖，Go 会把需要的模块版本补进 `go.mod`。

### go.sum 的生成方式

`go.sum` 一般不是手写的，而是在下载依赖时由 Go 自动生成。

常见触发命令：

```bash
go get ...
go mod tidy
go test ./...
go run ./cmd/api
```

只要这些命令触发了模块下载，Go 就会把对应依赖的校验信息写进 `go.sum`。

### 一个常见流程

```bash
go mod init example/server
go get github.com/gin-gonic/gin
go mod tidy
```

可以理解为：

1. `go mod init` 先创建 `go.mod`
2. `go get` 下载依赖并更新 `go.mod`
3. `go mod tidy` 整理依赖并补全 `go.sum`

### 是否需要手动编辑

一般情况下：

- `go.mod` 可以看、可以理解，但通常通过 Go 命令维护
- `go.sum` 通常不手动编辑

更常见的做法是执行：

```bash
go mod tidy
```

让 Go 自动把模块文件整理到正确状态

## go mod init 后面的模块名怎么取

例如本地目录结构是：

```text
playground/
  server/
```

如果你进入 `server` 目录，并把它当成一个独立 Go 模块，可以执行：

```bash
go mod init playground/server
```

这样会生成：

```go
module playground/server
```

### 什么时候这样取名可以

这种写法比较适合：

- 本地学习项目
- 小型实验项目
- 不打算公开发布的练习代码

### 更常见的正式写法

如果项目未来会放到 GitHub 或长期维护，更常见的是使用仓库路径风格：

```bash
go mod init github.com/yourname/playground/server
```

例如：

```bash
go mod init github.com/shenglongy/playground/server
```

### 要点

- `go mod init` 后面的内容不是“本机磁盘路径”
- 它是“这个 Go 模块对外声明的名字”
- 这个名字通常会出现在 import 路径里

### 一个简单判断

如果是本地练习：

```bash
go mod init playground/server
```

如果是正式仓库：

```bash
go mod init github.com/yourname/project/server
```
