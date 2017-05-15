在CentOS系统中加入开机自动启动:

service crond start     //启动服务
service crond stop      //关闭服务
service crond restart   //重启服务
service crond reload    //重新载入配置
service crond status    //查看crontab服务状态



chkconfig --level 345 crond on



SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
0 0 3 * * root mysqldump -u -h -p 数据库名字 > /目录