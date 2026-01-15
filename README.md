# Automated Task Reminder and Tracking Application 

A **production-ready Spring Boot backend application** that allows users to **create, manage, track, and receive automated email reminders for tasks**. This project is designed with a clean layered architecture and exposes REST APIs that can be consumed by any frontend (React, Android, etc.). It also provides reporting, CSV export, and health monitoring features.

---

## ✨ Key Features

* 📝 Create, list, delete, and complete tasks
* ⏰ Due-date based task scheduling
* 📧 Automated email reminders using SMTP
* 📊 Task overview (total, completed, pending)
* 📁 Task categorization (STUDY, WORK, PERSONAL, etc.)
* 🚦 Task priority management (HIGH, MEDIUM, LOW)
* 📤 Export tasks to CSV format
* ❤️ Health check endpoint for monitoring
* 🐳 Dockerized for easy deployment
* ☁️ Environment-based configuration (ready for AWS)

---

## 🧠 System Architecture

```
Controller Layer  →  Service Layer  →  Repository Layer  →  Database
        ↓
     DTOs / Utils / Scheduler / Mail Service
```

* **Controller**: Handles HTTP requests and responses
* **Service**: Contains business logic
* **Repository**: Database access using Spring Data JPA
* **Scheduler**: Schedules reminder emails
* **Mail Service**: Sends emails using SMTP

---

## 🛠 Tech Stack

| Layer      | Technology                  |
| ---------- | --------------------------- |
| Language   | Java 21                     |
| Framework  | Spring Boot                 |
| ORM        | Spring Data JPA (Hibernate) |
| Database   | MySQL (AWS RDS supported)   |
| Build Tool | Maven                       |
| Email      | Spring Boot Mail (SMTP)     |
| Deployment | Docker, Render              |

---

## 📂 Project Structure

```
automated-task-reminder-and-tracking-system
│
├── src/main/java/com/abbasansari/tasktracker
│   ├── controller   # REST Controllers
│   ├── dto          # Request & Response DTOs
│   ├── model        # JPA Entities & Enums
│   ├── repository   # JPA Repositories
│   ├── scheduler    # Reminder scheduling
│   ├── service      # Business logic
│   ├── util         # Utility classes (CSV)
│   └── AutomatedTaskReminderAndTrackingApplication.java
│
├── src/main/resources
│   ├── application.properties
│   ├── static
│   └── templates
│
├── Dockerfile
├── pom.xml
├── mvnw / mvnw.cmd
└── README.md
```

---

## ⚙️ Configuration

### `application.properties`

```properties
spring.application.name=Automated Task Reminder and Tracking System

# Server
server.port=${PORT:8080}

# Database Configuration (MySQL / AWS RDS)
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Mail Configuration (Gmail SMTP)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${MAIL_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

> 🔐 Use **environment variables** for production deployments.

---

## ▶️ Running the Application Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/abbasdx/automated-task-reminder-and-tracking-application.git
cd automated-task-reminder-and-tracking-system
```

### 2️⃣ Build the Project

```bash
./mvnw clean package -DskipTests
```

### 3️⃣ Run the JAR

```bash
java -jar target/tasktracker.jar
```

Application will run at:

```
http://localhost:8080
```

---

## 🐳 Docker Support

### Build Image

```bash
docker build -t tasktracker-backend .
```

### Run Container

```bash
docker run -p 8080:8080 \
  -e DB_URL=jdbc:mysql://host:3306/db \
  -e DB_USERNAME=user \
  -e DB_PASSWORD=pass \
  -e MAIL_USERNAME=email@gmail.com \
  -e MAIL_PASSWORD=app-password \
  tasktracker-backend
```

---

## 📡 REST API Endpoints

### ❤️ Health Check

```
GET /health
```

Response:

```
OK
```

---

### 📝 Task Management

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | `/tasks/add`            | Create a new task      |
| GET    | `/tasks/list`           | Fetch all tasks        |
| DELETE | `/tasks/delete/{id}`    | Delete a task          |
| PUT    | `/completion/mark/{id}` | Mark task as completed |

#### Sample Request Body

```json
{
  "title": "Complete DBMS Notes",
  "description": "Revise normalization and indexing",
  "dueDate": "2026-01-10T10:00:00",
  "priority": "HIGH",
  "category": "STUDY"
}
```

---

### 📊 Reports & Analytics

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/reports/overview` | Task summary        |
| GET    | `/reports/export`   | Export tasks as CSV |

#### Overview Response

```json
{
  "totalTasks": 10,
  "completedTasks": 4,
  "pendingTasks": 6
}
```

---

### 📧 Email Testing

```
GET /tasks/test-mail
```

Sends a test email to verify SMTP configuration.

---

## 🗄 Database Schema

### `tasks` Table

```sql
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  description TEXT,
  due_date DATETIME,
  completed BOOLEAN,
  priority VARCHAR(20),
  category VARCHAR(50)
);
```

---

## ⏰ Reminder Scheduling Logic

* When a task has a `dueDate`
* A scheduled job is created using `ScheduledExecutorService`
* At the due time, an email reminder is sent automatically

---

## ☁️ Deployment Options

This project has been **successfully deployed using cloud services**, making it production-ready.

### 🚀 Current Deployment Setup (Used in This Project)

* **Backend Hosting**: Render (Docker-based deployment)
* **Database**: AWS RDS (MySQL)

Render is used for application hosting, while AWS RDS ensures a reliable, persistent MySQL database that does not shut down or lose data.

### 🌍 Supported Deployment Options

* ✅ **Render (Backend Hosting)** – used in this project
* ✅ **AWS RDS (MySQL Database)** – used in this project
* ✅ **AWS EC2 + RDS** (Alternative production setup)
* ⚠️ Railway / Free tiers – testing only

---

## 🔐 Best Practices Used

* Layered architecture
* DTO-based request handling
* Environment variable configuration
* Clean RESTful APIs
* Docker-ready setup

---

## 🚀 Future Enhancements

* JWT Authentication & Authorization
* Multi-user support
* Role-based access control
* Cron-based reminder system
* WebSocket notifications
* Swagger / OpenAPI documentation

---

## 👨‍💻 Author
**Abbas Ansari**

* GitHub: [https://github.com/abbasdx](https://github.com/abbasdx)

---

## 🤝 Contributing

Contributions are welcome and appreciated! 🎉

If you want to contribute to this project, please follow these steps:

1. **Fork** the repository
2. **Create a new branch** for your feature or fix

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes** with a clear message

   ```bash
   git commit -m "Add: meaningful description"
   ```
4. **Push to your forked repository**

   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request** explaining your changes

### Contribution Guidelines

* Follow clean code and Spring Boot best practices
* Keep commits small and meaningful
* Update documentation if required
* Make sure the application builds successfully

---

## 📜 License

MIT License

Copyright (c) 2026 Abbas Ansari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
