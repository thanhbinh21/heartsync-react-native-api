# 💕 HEARTSYNC - DATING APP BACKEND

<div align="center">

![HeartSync Logo](https://img.shields.io/badge/HeartSync-Dating_App-ff69b4?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**Ứng dụng hẹn hò kết nối những trái tim cô đơn** 💖

[Tài Liệu API](./API_DOCUMENTATION_COMPLETE.md) • [Backend Details](./BACKEND.md) • [Báo Cáo](#)

</div>

---

## 👥 THÔNG TIN NHÓM THỰC HIỆN

### 📚 Thông Tin Học Phần

| Thông Tin | Chi Tiết |
|-----------|----------|
| **Môn học** | LẬP TRÌNH THIẾT BỊ DI ĐỘNG |
| **Đề tài** | DATING APP |
| **Lớp học phần** | DHKTPM18B |
| **Nhóm** | 21 |
| **Giảng viên hướng dẫn** | **Nguyễn Minh Hải** |
| **Học kỳ** | 1 - Năm học 2025 |

### 👨‍💻 Thành Viên Nhóm

| STT | Họ và Tên | MSSV | 
|-----|-----------|------|
| 1 | **Dương Nhật Anh** | 22728821 |
| 2 | **Nguyễn Thanh Bình** (NT) | 22660171 | 


## 📱 GIỚI THIỆU PROJECT

### 🎯 Tổng Quan

**HeartSync** là một ứng dụng hẹn hò (Dating App) hiện đại được xây dựng với công nghệ React Native (Frontend) và Node.js + Express (Backend). Ứng dụng giúp kết nối những người có cùng sở thích và mong muốn tìm kiếm mối quan hệ thông qua hệ thống matching thông minh.

### ✨ Tính Năng Chính

#### 🔐 Authentication & User Management
- ✅ Đăng ký và đăng nhập tài khoản
- ✅ JWT authentication bảo mật
- ✅ Quản lý profile cá nhân
- ✅ Upload và quản lý ảnh
- ✅ Thiết lập preferences (sở thích tìm kiếm)

#### 💘 Discovery & Matching
- ✅ Hệ thống discover users thông minh
- ✅ Swipe right (like) / left (dislike)
- ✅ Matching algorithm dựa trên preferences
- ✅ Lọc theo độ tuổi, giới tính, khoảng cách
- ✅ Hiển thị profile chi tiết

#### 💬 Messaging System
- ✅ Chat real-time với matched users
- ✅ Lịch sử tin nhắn
- ✅ Trạng thái đã đọc/chưa đọc
- ✅ Notification khi có tin nhắn mới

#### 🔔 Notification System
- ✅ Thông báo khi có match mới
- ✅ Thông báo tin nhắn
- ✅ Thông báo like (Premium feature)
- ✅ Quản lý trạng thái notifications

#### 💎 Subscription System
- ✅ Free tier với tính năng cơ bản
- ✅ Premium tier với tính năng nâng cao
- ✅ Unlimited swipes cho Premium
- ✅ Xem ai đã like bạn (Premium)

### 🏗️ Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT SIDE                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │         React Native Mobile App                  │   │
│  │  • Home Screen      • Profile Screen            │   │
│  │  • Discovery Screen • Match Screen              │   │
│  │  • Chat Screen      • Settings Screen           │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │ HTTPS / REST API
                      │ JWT Authentication
                      │
┌─────────────────────▼───────────────────────────────────┐
│                    SERVER SIDE                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │            Express.js Backend API                │   │
│  │  • Auth Routes      • User Routes               │   │
│  │  • Match Routes     • Message Routes            │   │
│  │  • Notification Routes                          │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Middleware Layer                    │   │
│  │  • JWT Verification  • Premium Check            │   │
│  │  • CORS Handler     • Error Handler             │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │ Mongoose ODM
                      │
┌─────────────────────▼───────────────────────────────────┐
│                   DATABASE LAYER                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │              MongoDB Atlas (Cloud)               │   │
│  │  Collections:                                    │   │
│  │  • users         • likes        • matches        │   │
│  │  • messages      • notifications                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 🛠️ Công Nghệ Sử Dụng

#### Backend Stack
| Công Nghệ | Version | Mục Đích |
|-----------|---------|----------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 4.18.2 | Web framework |
| **MongoDB** | 8.0+ | NoSQL Database |
| **Mongoose** | 8.0.0 | MongoDB ODM |
| **JWT** | 9.0.2 | Authentication |
| **Bcrypt.js** | 3.0.2 | Password hashing |
| **CORS** | 2.8.5 | Cross-origin support |

#### Frontend Stack (Repository riêng)
- **React Native** - Mobile framework
- **React Navigation** - Navigation
- **Axios** - HTTP client
- **AsyncStorage** - Local storage

### 📊 Database Schema

```
Users Collection
├── username (unique)
├── password (hashed)
├── profile
│   ├── name, age, gender
│   ├── photos[]
│   ├── aboutMe
│   ├── interests[]
│   └── location
├── preferences
│   ├── gender[]
│   ├── ageRange
│   └── distance
└── subscription
    ├── type (free/premium)
    └── dates

Likes Collection
├── fromUser (ref)
├── toUser (ref)
└── action (like/dislike)

Matches Collection
├── users[] (2 users)
└── lastMessageAt

Messages Collection
├── match (ref)
├── sender (ref)
├── content
└── read (boolean)

Notifications Collection
├── user (ref)
├── type (match/message/like)
├── relatedUser (ref)
└── read (boolean)
```

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT & CHẠY PROJECT

### 📋 Yêu Cầu Hệ Thống

Trước khi bắt đầu, đảm bảo máy tính của bạn đã cài đặt:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (đi kèm với Node.js)
- **Git** ([Download](https://git-scm.com/))
- **MongoDB Atlas Account** (hoặc MongoDB local)
- **Text Editor**: VS Code (khuyên dùng)

Kiểm tra phiên bản đã cài:
```powershell
node --version    # Phải >= v18.0.0
npm --version     # Phải >= 9.0.0
git --version
```

---

### 📥 PHẦN 1: CÀI ĐẶT BACKEND

#### Bước 1: Clone Repository

```powershell
# Clone project từ GitHub
git clone https://github.com/thanhbinh21/heartsync-react-native-api.git

# Di chuyển vào thư mục backend
cd heartsync-react-native-api
```

#### Bước 2: Cài Đặt Dependencies

```powershell
# Cài đặt tất cả các packages cần thiết
npm install

# Hoặc nếu dùng yarn
yarn install
```

**Các packages sẽ được cài đặt:**
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- cors: Cross-origin support
- dotenv: Environment variables
- nodemon: Auto-restart (dev)

#### Bước 3: Cấu Hình Environment Variables

Tạo file `.env` trong thư mục backend:

```powershell
# Copy file mẫu
copy .env.example .env

# Hoặc tạo file mới
notepad .env
```

**Nội dung file `.env`:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/heartsync?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=heartsync_jwt_secret_2025_change_this_in_production
JWT_EXPIRES_IN=30d

# CORS (Optional)
CORS_ORIGIN=*
```

#### Bước 4: Cấu Hình MongoDB Atlas

**4.1. Tạo MongoDB Atlas Account:**
1. Truy cập [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Đăng ký tài khoản miễn phí
3. Tạo cluster mới (chọn FREE tier)

**4.2. Tạo Database User:**
1. Vào **Database Access** → **Add New Database User**
2. Tạo username/password
3. Set quyền: **Read and write to any database**

**4.3. Whitelist IP:**
1. Vào **Network Access** → **Add IP Address**
2. Chọn **Allow Access from Anywhere** (0.0.0.0/0)
3. Hoặc thêm IP cụ thể của bạn

**4.4. Lấy Connection String:**
1. Vào **Database** → **Connect**
2. Chọn **Connect your application**
3. Copy connection string
4. Thay `<username>`, `<password>`, `<database>` vào `.env`

**Ví dụ:**
```env
MONGODB_URI=mongodb+srv://heartsync_admin:MyPassword123@cluster0.abc123.mongodb.net/heartsync_db?retryWrites=true&w=majority
```

#### Bước 5: Khởi Tạo Database (Optional)

Nếu muốn có dữ liệu mẫu để test:

```powershell
# Chạy script khởi tạo database
node src/scripts/initDB.js

# Hoặc seed dữ liệu mẫu (nếu có)
npm run seed
```

#### Bước 6: Chạy Backend Server

**Development Mode** (với auto-restart):
```powershell
npm run dev
```

**Production Mode**:
```powershell
npm start
```

**Kết quả mong đợi:**
```
✅ Connected to MongoDB Atlas
🚀 Server running on port 5000
📱 API URL: http://localhost:5000/api
```

#### Bước 7: Kiểm Tra Backend

**Test bằng browser:**
```
http://localhost:5000/api/health
http://localhost:5000/api/test
```

**Test bằng PowerShell:**
```powershell
# Health check
curl http://localhost:5000/api/health

# Test endpoint
curl http://localhost:5000/api/test
```

**Response mong đợi:**
```json
{
  "status": "OK",
  "message": "HeartSync API is running",
  "database": "Connected"
}
```

---

### 📱 PHẦN 2: CÀI ĐẶT FRONTEND (React Native)

> **Lưu ý:** Frontend code nằm ở repository riêng hoặc thư mục khác

#### Bước 1: Cài Đặt React Native Environment

**1.1. Cài đặt Node.js** (đã có ở trên)

**1.2. Cài đặt Expo CLI** (nếu dùng Expo):
```powershell
npm install -g expo-cli
```

**Hoặc React Native CLI** (nếu dùng bare React Native):
```powershell
npm install -g react-native-cli
```

**1.3. Cài đặt Android Studio** (cho Android):
- Download [Android Studio](https://developer.android.com/studio)
- Cài đặt Android SDK
- Tạo Android Virtual Device (AVD)

**1.4. Cài đặt Xcode** (cho iOS - chỉ trên macOS):
- Download từ Mac App Store
- Cài đặt Command Line Tools

#### Bước 2: Clone Frontend Repository

```powershell
# Clone frontend repo (nếu riêng)
git clone <frontend-repo-url>

# Hoặc di chuyển vào thư mục frontend
cd ../frontend
```

#### Bước 3: Cài Đặt Frontend Dependencies

```powershell
# Cài đặt packages
npm install

# Hoặc
yarn install
```

#### Bước 4: Cấu Hình API URL

Tìm file config API (thường là `config.js` hoặc `api.js`):

```javascript
// config/api.js hoặc services/api.js
const API_URL = 'http://YOUR_IP_ADDRESS:5000/api';
// Thay YOUR_IP_ADDRESS bằng IP máy tính của bạn
```

**Lấy IP Address:**
```powershell
# Windows PowerShell
ipconfig

# Tìm IPv4 Address (ví dụ: 192.168.1.100)
```

**Cấu hình:**
```javascript
const API_URL = 'http://192.168.1.100:5000/api';
```

#### Bước 5: Chạy React Native App

**Nếu dùng Expo:**
```powershell
# Start Expo development server
npm start
# hoặc
expo start

# Scan QR code bằng Expo Go app trên điện thoại
```

**Nếu dùng React Native CLI:**

**Cho Android:**
```powershell
# Chạy Android emulator trước hoặc kết nối thiết bị
npm run android
# hoặc
react-native run-android
```

**Cho iOS** (chỉ trên macOS):
```powershell
# Cài đặt CocoaPods dependencies
cd ios
pod install
cd ..

# Chạy app
npm run ios
# hoặc
react-native run-ios
```

---

### 🔧 TROUBLESHOOTING

#### ❌ Backend Issues

**1. "Cannot connect to MongoDB"**
```powershell
# Kiểm tra:
- Connection string trong .env có đúng không?
- Username/password có đúng không?
- IP đã được whitelist chưa?
- Internet connection có ổn định không?
```

**2. "Port 5000 already in use"**
```powershell
# Thay đổi PORT trong .env
PORT=5001

# Hoặc kill process đang dùng port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**3. "JWT_SECRET is not defined"**
```powershell
# Đảm bảo file .env có JWT_SECRET
# Restart server sau khi thay đổi .env
```

#### ❌ Frontend Issues

**1. "Network request failed"**
```
- Kiểm tra backend có đang chạy không?
- API_URL có đúng IP không?
- Điện thoại và máy tính cùng mạng WiFi?
- Tắt firewall/antivirus thử
```

**2. "Unable to resolve module"**
```powershell
# Clear cache và reinstall
rm -rf node_modules
npm install
npm start -- --reset-cache
```

**3. Metro bundler issues**
```powershell
# Clear Metro cache
npx react-native start --reset-cache
```

---

### 📱 TEST TOÀN BỘ HỆ THỐNG

#### 1. Test Backend

```powershell
# Test health check
curl http://localhost:5000/api/health

# Test register
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"username":"testuser","password":"Test123456"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"username":"testuser","password":"Test123456"}'
```

#### 2. Test Frontend

1. Mở app trên điện thoại/emulator
2. Test đăng ký tài khoản mới
3. Test đăng nhập
4. Test xem profile
5. Test discovery users
6. Test swipe
7. Test chat

---

## 📚 TÀI LIỆU THAM KHẢO

### 📖 Documentation Files

| File | Nội Dung |
|------|----------|
| [`README.md`](./README.md) | Tài liệu tổng quan này |
| [`BACKEND.md`](./BACKEND.md) | Chi tiết kiến trúc Backend |
| [`API_DOCUMENTATION_COMPLETE.md`](./API_DOCUMENTATION_COMPLETE.md) | API docs đầy đủ cho Frontend |

### 🔗 Links Hữu Ích

- **Backend Repository**: [heartsync-react-native-api](https://github.com/thanhbinh21/heartsync-react-native-api)
- **Node.js Documentation**: https://nodejs.org/docs
- **Express.js Guide**: https://expressjs.com/
- **MongoDB Manual**: https://docs.mongodb.com/
- **React Native Docs**: https://reactnative.dev/docs
- **Mongoose Guide**: https://mongoosejs.com/docs/

### 📞 Liên Hệ & Hỗ Trợ

**Nhóm phát triển:**
- **Dương Nhật Anh** - Frontend Developer
- **Nguyễn Thanh Bình** - Backend Developer

**Giảng viên hướng dẫn:**
- **TS. Nguyễn Minh Hải**

---

## 📄 LICENSE

Copyright © 2025 HeartSync Team - DHKTPM18B - Nhóm 21

Đồ án môn học: Lập Trình Thiết Bị Di Động  
Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM

---

## 🎯 TIẾN ĐỘ PROJECT

### ✅ Hoàn Thành

- [x] Thiết kế database schema
- [x] Xây dựng RESTful API
- [x] Implement authentication (JWT)
- [x] User management system
- [x] Discovery & matching algorithm
- [x] Messaging system
- [x] Notification system
- [x] Subscription model
- [x] API documentation
- [x] Frontend UI design
- [x] API integration
- [x] Testing & debugging

### 🚧 Đang Phát Triển

- [ ] Real-time chat với Socket.io
- [ ] Push notifications
- [ ] Image upload với Cloudinary
- [ ] Advanced matching algorithm
- [ ] Location-based filtering
- [ ] Payment integration

### 📈 Kế Hoạch Tương Lai

- [ ] Video call feature
- [ ] Story feature (Instagram-like)
- [ ] AI-powered matching
- [ ] Multi-language support
- [ ] Admin dashboard

---

<div align="center">

**Made with ❤️ by HeartSync Team**

⭐ Star this repo if you like it!

[⬆ Back to top](#-heartsync---dating-app-backend)

</div>
