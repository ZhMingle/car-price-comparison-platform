# car-price-comparison-platform
**Project Instruction**(TODO)
- AutoCompare helps you find the best car deals by providing detailed comparisons of features, prices, and reviews from all major brands
- The platform consists of four sub-projects:

```
1. car-price-comparison-portal
2. car-price-comparison-admin
3. car-price-comparison-crawler
4. car-price-comparison-service
```

- Portal URL：https://{domain}/car-price-comparison-portal
- Admin URL：https://{domain}/car-price-comparison-admin
- Crawler URL：https://{domain}/car-price-comparison-crawler



**Feature**(TODO)

- 友好的代码结构及注释，便于阅读及二次开发
- 实现前后端分离，通过token进行数据交互，前端再也不用关注后端技术
- 灵活的权限控制，可控制到页面或按钮，满足绝大部分的权限需求
- 页面交互使用React，极大的提高了开发效率
- 引入Azure Clould
- 引入swagger文档支持，方便编写API接口文档



**Project Structure** (TODO)
```
car-price-comparison-platform
├─car-price-comparison-portal		Web portal
├─car-price-comparison-admin		Admin System
├─car-price-comparison-crawler		Crawler System
├─car-price-comparison-service		API Service
├─README.md

```



**Technology Selection** (TODO)

* car-price-comparison-portal

  * IDE: VS Code and Webstorm
  * 页面交互：React
* car-price-comparison-admin

  * 页面交互：React
* car-price-comparison-crawler

  * IDE: PyCharm
  * Crawler Platform: Pyspider
  * NoSQL: MongoDB
* car-price-comparison-service

  * IDE: Visual Studio and Rider
  * .NET , C# and ASP.NET
  * DB: MySQL
* Common
  * Cloud: Azure
  * Version: Git and GitHub 



 **Potal Deploy**
- 通过git下载源码
- idea、eclipse需安装lombok插件，不然会提示找不到entity的get set方法
- 创建数据库renren_fast，数据库编码为UTF-8
- 执行db/mysql.sql文件，初始化数据
- 修改application-dev.yml，更新MySQL账号和密码
- Eclipse、IDEA运行RenrenApplication.java，则可启动项目
- Swagger文档路径：http://localhost:8080/renren-fast/swagger/index.html
- Swagger注解路径：http://localhost:8080/renren-fast/swagger-ui.html



 **Admin Deploy**

- 通过git下载源码
- idea、eclipse需安装lombok插件，不然会提示找不到entity的get set方法
- 创建数据库renren_fast，数据库编码为UTF-8
- 执行db/mysql.sql文件，初始化数据
- 修改application-dev.yml，更新MySQL账号和密码
- Eclipse、IDEA运行RenrenApplication.java，则可启动项目
- Swagger文档路径：http://localhost:8080/renren-fast/swagger/index.html
- Swagger注解路径：http://localhost:8080/renren-fast/swagger-ui.html



 **Crawler Deploy**

- 通过git下载源码
- idea、eclipse需安装lombok插件，不然会提示找不到entity的get set方法
- 创建数据库renren_fast，数据库编码为UTF-8
- 执行db/mysql.sql文件，初始化数据
- 修改application-dev.yml，更新MySQL账号和密码
- Eclipse、IDEA运行RenrenApplication.java，则可启动项目
- Swagger文档路径：http://localhost:8080/renren-fast/swagger/index.html
- Swagger注解路径：http://localhost:8080/renren-fast/swagger-ui.html



 **Service Deploy**

- 通过git下载源码
- idea、eclipse需安装lombok插件，不然会提示找不到entity的get set方法
- 创建数据库renren_fast，数据库编码为UTF-8
- 执行db/mysql.sql文件，初始化数据
- 修改application-dev.yml，更新MySQL账号和密码
- Eclipse、IDEA运行RenrenApplication.java，则可启动项目
- Swagger文档路径：http://localhost:8080/renren-fast/swagger/index.html
- Swagger注解路径：http://localhost:8080/renren-fast/swagger-ui.html



**接口文档效果图：**
![输入图片说明](https://images.gitee.com/uploads/images/2018/0728/145341_73ba6f75_63154.jpeg "在这里输入图片标题")

 **效果图：**
![输入图片说明](https://gitee.com/uploads/images/2018/0505/173115_d3c045ef_63154.jpeg "在这里输入图片标题")