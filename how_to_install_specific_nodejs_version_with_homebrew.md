# homebrew安装指定版本nodejs

::: tip
几年前我曾在简书上写过一篇[homebrew 安装指定版本node](https://www.jianshu.com/p/c5c298486dbd)，担心某一天这平台也不复存在，遂记录于此。
:::

mac环境下,使用homebrew 安装的nodejs, 默认是最高版本,命令如下:
```sh
brew install node
```

那么使用homebrew如何安装指定版本的nodejs呢?

1. 如果之前使用brew install node安装过node,需要先执行`brew unlink node`来'解绑'node
2. 查找可用的node版本 `brew search node`
3. 安装你需要的版本, 比如 `brew install node@8`
4. 然后`brew link node@8`, 这一步可能会报错, 按照提示执行命令就ok了, 比如我最后执行的是`brew link --overwrite --force node@8`
5. `node -v` 不出意外, 就安装好了你想要的node版本

参考链接:

[How to install specific NodeJS version](https://katopz.medium.com/how-to-install-specific-nodejs-version-c6e1cec8aa11)  
[Can't brew link an unlinked keg](https://stackoverflow.com/questions/10868133/cant-brew-link-an-unlinked-keg)
