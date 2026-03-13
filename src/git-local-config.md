# Git 项目级别配置 user.name 和 user.email

当你有多个 Git 账号（如公司和个人），不想使用全局配置时，可以为当前项目单独设置。

## 设置项目级别的 name 和 email

在项目根目录下执行：

```bash
git config user.name "your name"
git config user.email "your@email.com"
```

不加 `--global` 参数，配置只会写入当前项目的 `.git/config` 文件。

## 查看当前生效的配置

```bash
git config user.name
git config user.email
```

## 查看配置来源

```bash
git config --show-origin user.name
git config --show-origin user.email
```

会显示配置值来自哪个文件，例如：

```
file:.git/config    your name
```

## 取消全局默认配置（可选）

如果希望强制每个项目都手动设置，可以移除全局配置：

```bash
git config --global --unset user.name
git config --global --unset user.email
```

这样在未配置的项目中提交时，Git 会报错提醒你设置。
