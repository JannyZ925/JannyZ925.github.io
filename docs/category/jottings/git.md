# Git

## commit 相关规范

- feat:新功能
- fix：修补bug
- docs：表示更新文档
- style：表示修改样式（不影响代码运行变动）
- refactor:重构（既不是新增功能，也不是修改bug的变动）
- test：增加测试
- chore:构建过程或辅助工具的变动
- merge：合并分支
- perf：优化、性能提升
- revert：回滚到上一个版本
- build：构建

## git push 失败
解决方法：
- [创建config文件](https://blog.csdn.net/qq_36296794/article/details/126591405)
- [修改代理](https://www.bilibili.com/read/cv18201450)

## 撤销上一次commit 
1. git log --pretty=oneline　　 查看当前提交的日志
2. git reset --soft XXX 　　　　XXX是commitID(d6cdbba417…) 回退当前工作空间的上一个版本，并且保留代码更改
3. git log --pretty=oneline 　　再次查看当前提交的日志，确认是否成功撤销
4. git push origin master --force 　　强制提交当前版本号，以达到撤销版本号的目的。必须添加参数force进行强制提交，否则会提交失败

- [参考链接](https://blog.csdn.net/houxiaoni01/article/details/104499338)
