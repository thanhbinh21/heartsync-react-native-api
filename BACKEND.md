# 📱 HEARTSYNC - TÀI LIỆU BACKEND

> **Ứng dụng Dating App Backend API**  
> Version: 2.0.0  
> Ngày cập nhật: 04/11/2025

---

## 📋 MỤC LỤC

1. [Tổng Quan Project](#1-tổng-quan-project)
2. [Công Nghệ Sử Dụng](#2-công-nghệ-sử-dụng)
3. [Cấu Trúc Project](#3-cấu-trúc-project)
4. [Kiến Trúc Hệ Thống](#4-kiến-trúc-hệ-thống)
5. [Database Schema](#5-database-schema)
6. [API Endpoints](#6-api-endpoints)
7. [Authentication & Security](#7-authentication--security)
8. [Tính Năng Chính](#8-tính-năng-chính)
9. [Cài Đặt & Triển Khai](#9-cài-đặt--triển-khai)
10. [Environment Variables](#10-environment-variables)
11. [Testing](#11-testing)
12. [Tích Hợp Frontend](#12-tích-hợp-frontend)

---

## 1. TỔNG QUAN PROJECT

### 1.1. Giới Thiệu

**HeartSync** là một ứng dụng hẹn hò (Dating App) được xây dựng với mục tiêu kết nối những người có cùng sở thích và mong muốn tìm kiếm mối quan hệ. Backend API được thiết kế theo kiến trúc RESTful, cung cấp đầy đủ các chức năng cần thiết cho một ứng dụng dating hiện đại.

### 1.2. Mục Đích

- Cung cấp API backend hoàn chỉnh cho ứng dụng Dating
- Quản lý người dùng, profile, và preferences
- Hệ thống matching thông minh dựa trên sở thích và khoảng cách
- Messaging real-time giữa các users đã match
- Hệ thống notification cho các hoạt động quan trọng
- Hỗ trợ subscription model (Free & Premium)

### 1.3. Đặc Điểm Nổi Bật

✅ **RESTful API** - Thiết kế chuẩn REST, dễ tích hợp  
✅ **JWT Authentication** - Bảo mật với JSON Web Token  
✅ **MongoDB Atlas** - Database trên cloud, scalable  
✅ **Express.js** - Framework nhẹ, hiệu suất cao  
✅ **CORS Support** - Hỗ trợ cross-origin cho mobile app  
✅ **Error Handling** - Xử lý lỗi thống nhất, dễ debug  
✅ **Premium Features** - Hỗ trợ 2 tier: Free & Premium

---

## 2. CÔNG NGHỆ SỬ DỤNG

### 2.1. Core Technologies

| Công Nghệ | Version | Mục Đích |
|-----------|---------|----------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | ^4.18.2 | Web framework |
| **MongoDB** | ^8.0.0 | NoSQL Database |
| **Mongoose** | ^8.0.0 | ODM cho MongoDB |

### 2.2. Authentication & Security

| Package | Version | Mục Đích |
|---------|---------|----------|
| **jsonwebtoken** | ^9.0.2 | JWT authentication |
| **bcryptjs** | ^3.0.2 | Password hashing |
| **cors** | ^2.8.5 | Cross-origin resource sharing |

### 2.3. Development Tools

| Tool | Version | Mục Đích |
|------|---------|----------|
| **nodemon** | ^3.0.1 | Auto-restart server |
| **dotenv** | ^16.3.1 | Environment variables |

---

## 3. CẤU TRÚC PROJECT

```
backend/
│
├── src/
│   ├── server.js              # Entry point, khởi tạo Express server
│   │
│   ├── middleware/
│   │   └── auth.js            # JWT authentication & premium check
│   │
│   ├── models/                # MongoDB Schema Definitions
│   │   ├── User.js            # User profile & preferences
│   │   ├── Like.js            # Swipe actions (like/dislike)
│   │   ├── Match.js           # Matched users
│   │   ├── Message.js         # Chat messages
│   │   └── Notification.js    # User notifications
│   │
│   ├── routes/                # API Route Handlers
│   │   ├── auth.js            # Login, Register, Token refresh
│   │   ├── users.js           # Profile, Discovery, Preferences
│   │   ├── matches.js         # Match management & Swipe
│   │   ├── messages.js        # Messaging system
│   │   └── notifications.js   # Notification management
│   │
│   ├── scripts/
│   │   └── initDB.js          # Database initialization
│   │
│   └── utils/
│       └── types.ts           # TypeScript type definitions
│
├── dating_app_all_screens/    # UI reference images
├── .env                        # Environment variables
├── package.json                # Dependencies & scripts
├── API_DOCUMENTATION_COMPLETE.md  # API docs cho Frontend
└── BACKEND.md                  # Tài liệu này

```

### 3.1. Giải Thích Chi Tiết

#### **src/server.js**
- Entry point của ứng dụng
- Khởi tạo Express app
- Kết nối MongoDB Atlas
- Đăng ký các routes
- Error handling middleware

#### **src/middleware/auth.js**
- `authenticateToken`: Xác thực JWT token
- `requirePremium`: Kiểm tra subscription premium
- Bảo vệ các protected routes

#### **src/models/**
Các schema MongoDB sử dụng Mongoose:
- **User**: Thông tin người dùng, profile, preferences
- **Like**: Lưu các action swipe (like/dislike)
- **Match**: Quản lý các cặp đã match
- **Message**: Tin nhắn giữa các users
- **Notification**: Thông báo cho user

#### **src/routes/**
Các API endpoints được nhóm theo chức năng:
- **auth**: Đăng nhập, đăng ký
- **users**: Quản lý profile, discovery
- **matches**: Swipe, match management
- **messages**: Chat system
- **notifications**: Notification system

---

## 4. KIẾN TRÚC HỆ THỐNG

```
┌─────────────┐
│   Mobile    │
│   Frontend  │ ← React Native App
└──────┬──────┘
       │ HTTP/HTTPS + JWT
       ↓
┌─────────────────────────────────────┐
│         Express.js Server           │
│  ┌─────────────────────────────┐   │
│  │   Middleware Layer          │   │
│  │  • CORS                     │   │
│  │  • JSON Parser              │   │
│  │  • Auth (JWT)               │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Route Handlers            │   │
│  │  • /api/auth                │   │
│  │  • /api/users               │   │
│  │  • /api/matches             │   │
│  │  • /api/messages            │   │
│  │  • /api/notifications       │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Business Logic            │   │
│  │  • User Management          │   │
│  │  • Matching Algorithm       │   │
│  │  • Message Handling         │   │
│  └─────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │ Mongoose ODM
               ↓
┌─────────────────────────────────────┐
│      MongoDB Atlas (Cloud)          │
│  ┌──────────┐  ┌──────────┐        │
│  │  Users   │  │  Likes   │        │
│  └──────────┘  └──────────┘        │
│  ┌──────────┐  ┌──────────┐        │
│  │ Matches  │  │ Messages │        │
│  └──────────┘  └──────────┘        │
│  ┌──────────────────────┐          │
│  │   Notifications      │          │
│  └──────────────────────┘          │
└─────────────────────────────────────┘
```

### 4.1. Request Flow

1. **Client gửi request** → JWT token trong header
2. **CORS middleware** → Kiểm tra origin
3. **JSON parser** → Parse request body
4. **Auth middleware** → Verify JWT token
5. **Route handler** → Xử lý logic nghiệp vụ
6. **Mongoose** → Query/Update database
7. **Response** → Trả về JSON cho client

---

## 5. DATABASE SCHEMA

### 5.1. User Schema

```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  password: String (hashed, required),
  
  profile: {
    name: String,
    age: Number,
    photos: [String],          // Array of photo URLs
    aboutMe: String,
    occupation: String,
    gender: String,
    pronouns: String,
    education: String,
    location: {
      city: String,
      state: String,
      zipCode: String
    },
    height: String,
    smoking: String,
    drinking: String,
    pets: String,
    children: String,
    zodiac: String,
    religion: String,
    interests: [String],       // Array of interests
    languages: [String]        // Array of languages
  },
  
  preferences: {
    gender: [String],          // Looking for
    ageRange: {
      min: Number (default: 18),
      max: Number (default: 80)
    },
    distance: Number (default: 50),
    languages: [String]
  },
  
  subscription: {
    type: String (enum: ['free', 'premium']),
    startDate: Date,
    endDate: Date
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

### 5.2. Like Schema

```javascript
{
  _id: ObjectId,
  fromUser: ObjectId (ref: 'User'),
  toUser: ObjectId (ref: 'User'),
  action: String (enum: ['like', 'dislike']),
  createdAt: Date
}
```

### 5.3. Match Schema

```javascript
{
  _id: ObjectId,
  users: [ObjectId] (ref: 'User'),  // Array of 2 user IDs
  createdAt: Date,
  lastMessageAt: Date
}
```

### 5.4. Message Schema

```javascript
{
  _id: ObjectId,
  match: ObjectId (ref: 'Match'),
  sender: ObjectId (ref: 'User'),
  content: String (required),
  read: Boolean (default: false),
  createdAt: Date
}
```

### 5.5. Notification Schema

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User'),
  type: String (enum: ['match', 'message', 'like']),
  relatedUser: ObjectId (ref: 'User'),
  content: String,
  read: Boolean (default: false),
  createdAt: Date
}
```

---

## 6. API ENDPOINTS

### 6.1. Base URL

```
Development: http://localhost:5000/api
Production:  https://api.heartsync.app/api
```

### 6.2. Danh Sách Endpoints

#### **Authentication (không cần token)**
```
POST   /api/auth/register       # Đăng ký tài khoản mới
POST   /api/auth/login          # Đăng nhập
```

#### **Users (cần JWT token)**
```
GET    /api/users/profile       # Lấy profile của user hiện tại
PUT    /api/users/profile       # Cập nhật profile
GET    /api/users/discover      # Lấy danh sách user để discover
GET    /api/users/:id           # Xem profile user khác
PUT    /api/users/preferences   # Cập nhật preferences
PUT    /api/users/subscription  # Upgrade subscription
```

#### **Matches (cần JWT token)**
```
POST   /api/matches/swipe       # Swipe like/dislike
GET    /api/matches             # Lấy danh sách matches
DELETE /api/matches/:matchId    # Unmatch
```

#### **Messages (cần JWT token)**
```
POST   /api/messages/:matchId   # Gửi tin nhắn
GET    /api/messages/:matchId   # Lấy lịch sử chat
PUT    /api/messages/:messageId/read  # Đánh dấu đã đọc
```

#### **Notifications (cần JWT token)**
```
GET    /api/notifications        # Lấy danh sách notifications
PUT    /api/notifications/:id/read  # Đánh dấu đã đọc
DELETE /api/notifications/:id    # Xóa notification
PUT    /api/notifications/read-all  # Đánh dấu tất cả đã đọc
```

#### **Health Check (public)**
```
GET    /api/health              # Kiểm tra server status
GET    /api/test                # Test endpoint
```

### 6.3. Response Format

Tất cả API đều trả về format chuẩn:

```typescript
{
  success: boolean,      // true/false
  data?: any,           // Dữ liệu (nếu có)
  message?: string      // Thông báo
}
```

---

## 7. AUTHENTICATION & SECURITY

### 7.1. JWT Authentication

**Flow:**
1. User đăng nhập với username/password
2. Server verify thông tin
3. Server tạo JWT token chứa userId
4. Client lưu token (AsyncStorage)
5. Mỗi request gửi kèm token trong header
6. Server verify token và cho phép truy cập

**Token Structure:**
```javascript
{
  userId: "user_id_here",
  iat: 1234567890,    // Issued at
  exp: 1234567890     // Expiration (30 days)
}
```

### 7.2. Password Security

- **Bcrypt hashing** với salt rounds = 10
- Password không bao giờ lưu dạng plain text
- Password không trả về trong response

### 7.3. Middleware Protection

```javascript
// Public routes
POST /api/auth/login
POST /api/auth/register

// Protected routes (cần JWT)
authenticateToken → All other routes

// Premium only routes (cần premium subscription)
authenticateToken → requirePremium → Specific features
```

### 7.4. CORS Configuration

```javascript
// Cho phép tất cả origins (development)
// Production: Chỉ định specific origins
app.use(cors());
```

---

## 8. TÍNH NĂNG CHÍNH

### 8.1. User Management

**Đăng ký & Đăng nhập:**
- Tạo tài khoản mới với username/password
- Login và nhận JWT token
- Token có thời hạn 30 ngày

**Profile Management:**
- Cập nhật thông tin cá nhân đầy đủ
- Upload multiple photos
- Set interests, languages, lifestyle info
- Location management

**Preferences:**
- Set gender preferences
- Age range filter
- Distance radius
- Language preferences

### 8.2. Discovery System

**Algorithm:**
1. Lọc users theo preferences (gender, age, distance)
2. Loại trừ users đã swipe
3. Loại trừ users đã match
4. Shuffle random để tăng diversity
5. Limit kết quả (10-50 users)

**Features:**
- Smart filtering dựa trên preferences
- Không hiển thị duplicate
- Support pagination

### 8.3. Matching System

**Swipe Actions:**
- **Like**: Bày tỏ quan tâm
- **Dislike**: Bỏ qua user

**Match Logic:**
- User A likes User B
- User B likes User A back
- → Tạo Match mới
- → Gửi notification cho cả 2
- → Cho phép nhắn tin

**Match Management:**
- Xem danh sách matches
- Unmatch (xóa match)
- Xem thời gian match

### 8.4. Messaging System

**Features:**
- Chỉ chat được với matched users
- Real-time messaging ready structure
- Message history
- Read/unread status
- Timestamp cho mỗi message

**Message Flow:**
1. Kiểm tra match exists
2. Tạo message mới
3. Update lastMessageAt của match
4. Tạo notification cho receiver
5. Return message data

### 8.5. Notification System

**Types:**
- **match**: Có match mới
- **message**: Có tin nhắn mới
- **like**: Có người like (Premium only)

**Features:**
- Read/unread status
- Auto-create khi có event
- Bulk mark as read
- Delete individual/all

### 8.6. Subscription System

**Tiers:**

| Feature | Free | Premium |
|---------|------|---------|
| Swipe | Limited | Unlimited |
| See who liked you | ❌ | ✅ |
| Advanced filters | ❌ | ✅ |
| Unlimited likes | ❌ | ✅ |
| Rewind swipes | ❌ | ✅ |

**Upgrade:**
- API endpoint để upgrade
- Set subscription type & dates
- Middleware check premium status

---

## 9. CÀI ĐẶT & TRIỂN KHAI

### 9.1. Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0
MongoDB Atlas account (hoặc local MongoDB)
```

### 9.2. Installation Steps

**1. Clone repository:**
```bash
git clone <repository-url>
cd backend
```

**2. Install dependencies:**
```bash
npm install
```

**3. Setup environment variables:**
```bash
# Tạo file .env
cp .env.example .env

# Chỉnh sửa .env với thông tin của bạn
```

**4. Initialize database (optional):**
```bash
node src/scripts/initDB.js
```

**5. Start development server:**
```bash
npm run dev
```

**6. Start production server:**
```bash
npm start
```

### 9.3. Verification

**Test API:**
```bash
# Health check
curl http://localhost:5000/api/health

# Test endpoint
curl http://localhost:5000/api/test
```

---

## 10. ENVIRONMENT VARIABLES

### 10.1. Required Variables

Tạo file `.env` trong root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=30d

# CORS Configuration (Optional)
CORS_ORIGIN=*
```

### 10.2. Variable Descriptions

| Variable | Mô Tả | Example |
|----------|-------|---------|
| `PORT` | Port server chạy | 5000 |
| `NODE_ENV` | Environment | development/production |
| `MONGODB_URI` | Connection string MongoDB | mongodb+srv://... |
| `JWT_SECRET` | Secret key cho JWT | random_string_here |
| `JWT_EXPIRES_IN` | Token expiration | 30d |

### 10.3. Security Notes

⚠️ **QUAN TRỌNG:**
- Không commit file `.env` lên Git
- Thay đổi `JWT_SECRET` trong production
- Sử dụng strong password cho MongoDB
- Giới hạn CORS origin trong production

---

## 11. TESTING

### 11.1. Manual Testing

**Test Authentication:**
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"Test123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"Test123456"}'
```

**Test Protected Routes:**
```bash
# Get profile (cần token)
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 11.2. Test Scripts

Project có sẵn test scripts:

```bash
# Test update profile
node test-update-profile.js

# Check users
node check-users.js
```

### 11.3. Postman/Thunder Client

Import collection và test các endpoints:
- Tham khảo `API_DOCUMENTATION_COMPLETE.md` để có examples đầy đủ

---

## 12. TÍCH HỢP FRONTEND

### 12.1. Setup cho React Native

**1. Install Axios:**
```bash
npm install axios
```

**2. Create API service:**
```javascript
// services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://YOUR_IP:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 12.2. Authentication Flow

```javascript
// Login
const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', {
      username,
      password
    });
    
    if (response.data.success) {
      // Lưu token
      await AsyncStorage.setItem('token', response.data.data.token);
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};
```

### 12.3. API Call Examples

**Get Profile:**
```javascript
const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data.data;
};
```

**Update Profile:**
```javascript
const updateProfile = async (profileData) => {
  const response = await api.put('/users/profile', {
    profile: profileData
  });
  return response.data;
};
```

**Discover Users:**
```javascript
const discoverUsers = async () => {
  const response = await api.get('/users/discover');
  return response.data.data;
};
```

**Swipe:**
```javascript
const swipeUser = async (targetUserId, action) => {
  const response = await api.post('/matches/swipe', {
    targetUserId,
    action // 'like' or 'dislike'
  });
  return response.data;
};
```

**Get Matches:**
```javascript
const getMatches = async () => {
  const response = await api.get('/matches');
  return response.data.data;
};
```

**Send Message:**
```javascript
const sendMessage = async (matchId, content) => {
  const response = await api.post(`/messages/${matchId}`, {
    content
  });
  return response.data.data;
};
```

### 12.4. Error Handling

```javascript
// Xử lý errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    }
    return Promise.reject(error);
  }
);
```

### 12.5. Tài Liệu Chi Tiết

Xem file `API_DOCUMENTATION_COMPLETE.md` để có:
- Danh sách đầy đủ tất cả endpoints
- Request/Response examples chi tiết
- Error codes và cách xử lý
- Best practices cho Frontend

---

## 📞 HỖ TRỢ

### Liên Hệ

- **Developer**: HeartSync Team
- **Email**: support@heartsync.app
- **Documentation**: Xem `API_DOCUMENTATION_COMPLETE.md`

### Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)

---

## 📄 LICENSE

Copyright © 2025 HeartSync. All rights reserved.

---

**Version History:**
- v2.0.0 (04/11/2025) - Complete rewrite, improved structure
- v1.0.0 - Initial release
