# git flow 说明

## 提交代码

- 长期存在两个分支：master 和 develop
- master 分支代表的是线上代码，禁止直接在 master 上进行commit
- develop 代表开发环境的代码，禁止直接在 develop 上直接进行commit
- 分支/tag 禁止用中文或其他特殊字符，只用英文、数字、连接符。

## 分支命名

- 创建分支的时间+项目描述: 2019-06-01-1500/fix-download-url
- 项目描述一定要清晰，至少结合两人的意见，禁止 fix/update/bugfix 之类的不清晰到描述

## tag 命名

- 打 tag 的时间 + 创建分支的时间 + 项目描述: 2019-06-03-1120/2019-06-01-1500/fix-download-url

## git messsage

- 新增：...文件/...功能
- 修复：...功能/...bug
- 优化：...功能/...样式/...体验
- 删除：...文件/...功能
- 更新：...文件/...功能
- 测试（不建议）：增加用于测试的代码

## git-flow 流程

### 开发一个新的需求(例如新增页面、功能更新、UI更改等)

  - 在develop 分支执行 `git flow feature start 2019-05-30-1500/mayday`
  - 此时会在本地开出一个 feature/2019-5-15-mayday 分支，我们可以把它 push 的远程git 仓库进行协作开发
  - 在项目开发过程中，所有的更改和提交都位于该 feature/2019-5-15-mayday 分支之上
  - 在开发完成之后，需要测试进入开始测试时
  - 在 feature 分支执行 `git flow feature finish 2019-05-30-1500/mayday`
    - 该操作会将该分支合并到 develop，同时删除该 feature 分支
  - 如果此时他人也合并过分支，那么需要自己手动解决冲突

### 需要测试该期需求

  - 此时 git flow 需要使用一个 release 分支进行时测试
  - 前提是 feature 分支已经完成，合并到了 develop
  - 在 develop 分支执行 `git flow release start 2019-05-30-1500/mayday` 创建一个 release
  - 之后测试出的问题，都是在该 release 分支进行修改和提交

### 需要发布

  - 在测试完需求之后，需要上线
  - 在 release 分支执行 `git flow release finish 2019-05-30-1500/mayday`
    - 该操作会把该 release 分支同时合并到 develop 和 master 分支上去，同时删除该分支
  - 注意：如果使用命令行进行操作，此时会在 vim 里打开关于 `commit message` 和 `tag message` 的说明，此时使用 `:q` 关闭即可
  - 此时 master 和 develop 上都是最新的代码，需要手动 `git push 到远程仓库`
  - git flow 此时会默认生成一个 tag `2019-05-30-1500/mayday` 注意我们不使用这个tag
  - 而是手动打个一个tag 使用 `git tag 2019-06-03-1120/2019-05-30-1500/mayday`
  - 手动把该 tag push 到远程 `git push origin 2019-06-03-1120/2019-05-30-1500/mayday`
  - 把 master 分支上的代码测试后即可发布上线
  
### 需要修复问题

  - 在任何开发阶段，如果出现线上问题，那么就需要一个 hotfix 分支去修复
  - 在 master 上执行 `git flow hotfix start 2019-05-30-1500/fix-download-url`
    - 该操作会创建一个 hotfix 分支，我们在 hotfix 上面进行代码的线上问题的修复和提交
  - 完成修复和测试后，需要发布该代码
  - 在 hotfix 分支执行 `git flow hotfix finish 2019-05-30-1500/fix-download-url`
    - 该操作会将该hotfix 分支的代码合并到master 和 develop 上去，同时删除该 hotfix 分支
  - git flow 此时会默认生成一个 tag `2019-05-30-1500/fix-download-url` 注意我们不使用这个tag
  - 而是手动打个一个tag 使用 `git tag 2019-06-03-1120/2019-05-30-1500/fix-download-url`
  - 手动把该 tag push 到远程 `git push origin 2019-06-03-1120/2019-05-30-1500/fix-download-url`
  - 把 master 分支上的代码测试后即可发布上线

### 注意

  - windows 上的命令行工具在 `git flow init` 时可能需要手动指定 prefix

### 参考

  - [git-flow备忘](https://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html)


# git常用命令

## 基础命令

### tag

- 增加一个标签 `git tag v1.0`
- 将标签推送到远程 `git push origin v1.0`
- 删除远程tag `git push --delete origin v2.8.3`
- 删除本地tag `git tag --d v2.8.3`

### branch

- 删除一个本地分支 `git branch -D feature/~`
- 将本地的分支和远程的对应 `git branch --set-upstream-to=origin/develop`
- 切换分支的时候，将当前分支修改的内容一起打包带走，同步到切换的分支下。 `git checkout --merge <branch>`
- 删除本地的remote 分支 `git branch -dr origin/hotfix/2019-05-31-fix`
- 删除远程分支 `git push origin --delete hotfix/2019-05-31-fix`
- 设置远程分支：查看项目创建时的 readme
- 基于远程仓库的分支创建新分支并且切换到新分支 `git checkout -b develop origin/develop`

### stash

- 放弃尚未 add 的更改 `git checkout .` （checkout：切换分支 | 移除尚未  add 的修改）
- 暂存当前修改 `git stash`
- 提取暂存到修改 `git stash pop`

### Git 问题

- [x] rm了文件，同时也想在 git 中不再追踪该文件

	- `git rm file1`
	- `git commit -am "abc"`

- [x] 忽略已追踪的文件

	- 如果你已經對一個文件進行追蹤了很多个版本，此時在 ignore 里面忽略是没用的
	- .gitignore只能忽略那些原来没有被track的文件
	- 正确的做法应该是：git rm --cached logs/xx.log，然后更新 .gitignore 忽略掉目标文件，最后 git commit -m "We really don't want Git to track this anymore!"

- [x] 本地对某些公共文件做了本地化的配置，希望可以 pull 和 Merge，但是不要提交修改

  - 用 .gitignore 忽略掉这个本地的 config.json，然后在代码里 try load 这个配置，如果失败，就使用公共的配置

### 其他

- `git config --global user.name "Your Name”`
- `git config --global user.email "email@example.com”` //全局的名称和邮箱设置
- `git diff test.md` //查看两次文件之间的差异
- 在git 中使用`HEAD`来表示当前版本，上一个版本则是HEAD^,上上个HEAD^^,上100个HEAD~100
- `git reset —-hard HEAD^` //将版本回退到上一个版本，此时index指向该版本，该版本之后的版本不会再log里面显示，但是可以通过commit id进行恢复
- `git reset —-hard 21e20ce` //id没有必要写完全，但要避免重复
- `git reflog` //reflog纪录每一次的命令
