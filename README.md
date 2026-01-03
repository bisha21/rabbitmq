# 🐇 NestJS + RabbitMQ Learning Project

A simple learning project to understand **event-driven microservices** with **NestJS**, **RabbitMQ**, and **Nodemailer**.

---

## 📋 **Overview**

This project demonstrates how to:
- Create an order via REST API
- Process payment asynchronously
- Send email notifications to users
- **No delays** and **no data loss** using RabbitMQ message queues

---

## 🏗️ **Architecture**

```
API Gateway → RabbitMQ → Order Service → Payment Service → Notification Service → Email
```

**Flow:**
1. User creates order (REST API)
2. Order sent to RabbitMQ queue
3. Order Service processes order
4. Payment Service processes payment
5. Notification Service sends email confirmation

---

## ✨ **What I Learned**

- NestJS **controllers, modules, and providers**
- Using **ClientProxy** to emit events to RabbitMQ
- Listening to events with **@EventPattern** and **@Payload**
- Connecting to RabbitMQ queues (`order_queue`, `payment_queue`, `notification_queue`)
- Sending emails with **Nodemailer**
- Using **.env** for configuration
- Building **event-driven architecture** for scalability

---

## 🔧 **Prerequisites**

- Node.js (v16+)
- RabbitMQ (Docker or local)
- Gmail account for email

---

## 📦 **Installation**

```bash
# Clone repo
git clone <repo-url>
cd nestjs-rabbitmq-learning

# Install dependencies
npm install

# Start RabbitMQ (Docker)
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

---

## ⚙️ **Configuration**

Create `.env` file:

```env
RABBITMQ_URL=amqp://localhost:5672

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

PORT=3000
```

---

## 🚀 **Running the App**

```bash
npm run start:dev
```

API available at `http://localhost:3000`

---

## 🌐 **API Example**

**POST** `/orders`

```json
{
  "userId": "user123",
  "productId": "product456",
  "quantity": 2,
  "amount": 99.99
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "orderId": "order-1234567890"
}
```

---

## 🛠️ **Tech Stack**

- **NestJS** - Framework
- **RabbitMQ** - Message broker
- **Nodemailer** - Email service
- **TypeScript** - Language

---

## 🎓 **Why RabbitMQ?**

✅ **No delays** - Async processing  
✅ **No data loss** - Messages persist in queues  
✅ **Reliable** - Messages retry if service fails  
✅ **Scalable** - Services work independently  

---

**Happy Learning! 🚀**
