# car-price-comparison-platform
**Project Instruction**
- AutoCompare helps you find the best car deals by providing detailed comparisons of features, prices, and reviews from all major brands
- The platform consists of four sub-projects:

```
1. car-price-comparison-admin
2. car-price-comparison-service
```

- Admin URL：https://car-price-comparison-platform-doxd.vercel.app/
- API URL: https://ec2-54-242-192-58.compute-1.amazonaws.com/swagger/index.html



**Feature**

- Friendly code structure and comments for ease of reading and secondary development
- Achieved front-end and back-end separation, using JWT for data interaction, so the front-end no longer needs to focus on back-end technology
- Page interactions using React, greatly improving development efficiency
- Introduced AWS Cloud
- Introduced Swagger documentation support, making it convenient to write API documentation



**Project Structure** 
```
car-price-comparison-platform
├─car-price-comparison-portal		Admin System
├─car-price-comparison-service		API Service
├─README.md

```



**Technology Selection** 

* car-price-comparison-admin
  * Core Technologies: React, Next.js, Ant Design (AntD), Tailwind CSS and Vercel.
  * Data Handling and Requests: Fetch API, Lodash and qs.
  * State Management: Redux Toolkit and React Redux.
  * Development Tools: TypeScript, ESLint and PostCSS.
  * Additional Dependencies: React Photo View and Various Type Definitions.
  * IDE: Visual Studio Code
  * Version: Git and GitHub

* car-price-comparison-service
  * Core Technologies: C# and Asp.Net
  * Data Storage and Management: AWS RDS
  * Authentication: JWT (JSON Web Tokens)
  * Hosting: AWS EC2
  * Monitoring and Management: AWS CloudWatch
  * API Documentation: Swagger
  * API Style: RESTful
  * IDE: Rider
  * Version: Git and GitHub 


 **Admin Deploy**
- Register or log in to your Vercel account
- Connect Vercel to your Git platform
- Configure the project
- Deploy and view the results


 **Service Deploy**

- Create the database auto_compare
- Create the table structures for auto_user, auto_vehicle, and auto_dealer
- Modify appsettings.json to update the MySQL address, username, and password
- Execute the build and package command in the command line:
```
dotnet publish -c Release -o ./publish
```
- Upload the compiled files to EC2 and start the service

