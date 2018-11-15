成绩管理系统UI页面

启动前端项目

1 启动nginx服务器

start nginx

nginx -s stop //快速停止或关闭nginx

nginx -s quit //正常关闭或停止nginx

2 启动http-server

http-server -a localhost -p 8080

编辑器
VS Code (插件：git history,vscode-icons)

git 常用命令

git config --list //查看配置git参数

git config 有三个级别的保存位置 --sysem(本系统所有用户)  --global(当前用户，全局环境)  --local(本地匹配置，相当于当前目录)

git config --global user.name "xiaoming" //配置用户名
git config --global user.email "1111@qq.com" //配置邮箱 这些信息会永久保存到历史纪录中

git init //创建一个git仓库

git clone [远程url]

提交更新

git status //提交前查看修改了什么内容,用于显示工作目录和暂存区的状态，该命令可以看到那些修改被暂存到了，那些没有。，那些文件没有被git tracked 到

git add //添加文件或目录到暂存区，可以使用通配符
git add config.json //add file
git add *.js //add all js file 
git add /src/html/ //add all file in /src/html
git add -A // add all changed file 


git commit -m"commit info"

git pull
