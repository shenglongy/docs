# 本地 MySQL 基础与常用命令

这篇笔记记录本地使用 MySQL 时最常遇到的基础概念和命令，重点覆盖启动服务、登录、创建数据库、连接方式差异等内容。

## 查看 MySQL 版本

```bash
mysql --version
```

作用：

- 查看本机安装的 MySQL 客户端版本

## 使用 Homebrew 管理 MySQL 服务

启动：

```bash
brew services start mysql
```

重启：

```bash
brew services restart mysql
```

查看状态：

```bash
brew services list | rg '^mysql\s'
```

说明：

- `started` 表示服务已启动
- 如果看到 `error 1`，通常表示服务启动后又退出了，需要查看错误日志

## 检查 MySQL 是否存活

```bash
mysqladmin -u root ping
```

如果正常，通常会看到：

```text
mysqld is alive
```

注意：

- 如果直接写 `mysqladmin ping`，MySQL 可能会默认使用当前系统用户名
- 例如系统用户名是 `yourname`，就可能去尝试登录 `yourname@localhost`

## 登录 MySQL

最常见的登录方式：

```bash
mysql -u root
```

含义：

- `mysql`：MySQL 命令行客户端
- `-u`：指定用户名
- `root`：用户名是 `root`

如果需要密码，通常会写：

```bash
mysql -u root -p
```

这样回车后会提示输入密码。

### 常见参数缩写

MySQL 命令行里经常会看到这些参数：

- `-u` = `user`
- `-p` = `password`
- `-h` = `host`
- `-P` = `port`
- `-D` = `database`
- `-e` = `execute`

例如：

```bash
mysql -u root -D appdb -e "SHOW TABLES;"
```

可以理解为：

- 使用 `root` 用户连接
- 默认选择 `appdb` 数据库
- 执行 `SHOW TABLES;` 这条 SQL 后退出

## 创建数据库

登录后可以执行：

```sql
CREATE DATABASE IF NOT EXISTS appdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

说明：

- `IF NOT EXISTS` 可以避免重复创建时报错
- `utf8mb4` 更适合现代项目，能更完整支持 Unicode 字符

### 这条命令逐段是什么意思

```sql
CREATE DATABASE IF NOT EXISTS appdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

`CREATE DATABASE`：

- 表示创建一个数据库

`IF NOT EXISTS`：

- 如果数据库不存在就创建
- 如果已经存在就不报错

`appdb`：

- 数据库名
- 这一部分可以替换成你自己的名字

`CHARACTER SET utf8mb4`：

- 指定数据库默认字符集
- 一般新项目建议保留 `utf8mb4`

`COLLATE utf8mb4_unicode_ci`：

- 指定数据库默认排序规则
- `ci` 表示大小写不敏感

### 哪些部分可以替换

通常可以替换：

- 数据库名，例如 `appdb`
- 是否保留 `IF NOT EXISTS`
- 某些情况下排序规则

通常建议先保留：

- `CHARACTER SET utf8mb4`
- `COLLATE utf8mb4_unicode_ci`

### 一个更简单的版本

```sql
CREATE DATABASE appdb;
```

这种写法也能用，但会依赖 MySQL 当前默认字符集和排序规则。

### 一个更推荐的新项目版本

```sql
CREATE DATABASE IF NOT EXISTS appdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 数据库和表的关系

可以先这样理解：

- 数据库像一个更大的容器
- 表是数据库里面的具体数据结构

例如：

- `appdb` 是数据库名
- `users`、`posts`、`orders` 这些通常是表名

所以：

- `appdb.users`
- `appdb.posts`

表示的是同一个数据库中的不同表。

### 不同数据库里可以有同名表吗

可以。

例如你完全可以同时有：

- `appdb.users`
- `demo_db.users`

它们不是同一张表，因为它们属于不同数据库。

## 查看数据库列表

```bash
mysql -u root -e "SHOW DATABASES;"
```

作用：

- 查看当前 MySQL 里有哪些数据库

## 查看某个数据库里的表

```bash
mysql -u root -D appdb -e "SHOW TABLES;"
```

作用：

- 进入指定数据库
- 查看这个数据库里当前有哪些表

这里的：

- `-D appdb` 表示选择数据库 `appdb`

如果结果是空的，通常表示：

- 这个数据库已经存在
- 但里面还没有创建任何表

## 检查某张表是否存在

```bash
mysql -u root -D appdb -e "SHOW TABLES LIKE 'users';"
```

作用：

- 检查指定数据库里是否存在 `users` 表

如果查不到结果，通常表示这张表还没创建。

## localhost 和 127.0.0.1 的区别

这两个看起来很像，但在 MySQL 里经常有区别：

- `localhost` 往往优先走 socket 连接
- `127.0.0.1` 往往走 TCP 连接

所以有时候：

```bash
mysql -u root
```

和：

```bash
mysql -u root -h 127.0.0.1 -P 3306
```

结果不一定一样。

当你怀疑 socket 有问题时，显式指定 `127.0.0.1` 往往更容易排查。

## 什么是 DSN

DSN 一般可以理解成“数据库连接字符串”。

例如一个常见的 MySQL DSN：

```text
root:secret@tcp(127.0.0.1:3306)/appdb?parseTime=true&charset=utf8mb4&loc=Local
```

这里通常包含：

- 用户名
- 密码
- 主机地址
- 端口
- 数据库名
- 其他连接参数

可以简单理解为：

- 配置对象保存结构化字段
- DSN 把这些字段组装成数据库驱动能识别的连接字符串

## 常见排查命令

当 MySQL 连接失败时，常见排查顺序：

```bash
brew services restart mysql
brew services list | rg '^mysql\s'
mysqladmin -u root ping
```

如果服务状态异常，再看错误日志：

```bash
tail -n 100 /opt/homebrew/var/mysql/<your-hostname>.local.err
```

有时也可以查看：

```bash
tail -n 100 /opt/homebrew/var/mysql/localhost.err
```

## 当前最值得先记住的命令

```bash
mysql --version
brew services restart mysql
mysqladmin -u root ping
mysql -u root
mysql -u root -h 127.0.0.1 -P 3306
```
