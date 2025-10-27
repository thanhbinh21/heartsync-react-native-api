# FIX LỖI "USER NOT FOUND" KHI SAVE PROFILE

## 🔍 VẤN ĐỀ:
Frontend đang dùng userId cũ: `68fc73fefe90db6e9024594e`  
Nhưng database hiện tại có userId mới: `68ff7945a5af320b4d1b0187`

## ❓ TẠI SAO?
Database đã được reseed (xóa và tạo lại users), nên tất cả user IDs đã thay đổi.

## ✅ GIẢI PHÁP:

### Bước 1: Xóa dữ liệu cũ trong Frontend
```javascript
// Xóa user data cũ khỏi AsyncStorage
await AsyncStorage.removeItem('user');
await AsyncStorage.removeItem('userId');
await AsyncStorage.clear(); // Hoặc clear tất cả
```

### Bước 2: Login lại để lấy userId mới
```javascript
const login = async (username, password) => {
  try {
    const response = await fetch('http://192.168.1.31:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // ✅ Lưu userId MỚI vào AsyncStorage
      await AsyncStorage.setItem('userId', data.user.id);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      
      console.log('✅ New userId:', data.user.id);
      return data.user;
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

### Bước 3: Update Profile với userId mới
```javascript
const updateProfile = async (profileData) => {
  try {
    // ✅ Lấy userId MỚI từ AsyncStorage
    const userId = await AsyncStorage.getItem('userId');
    
    if (!userId) {
      throw new Error('Please login first');
    }
    
    console.log('Updating profile for userId:', userId);
    
    const response = await fetch(`http://192.168.1.31:5000/api/users/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile: {
          name: profileData.name,
          age: profileData.age,
          gender: profileData.gender,
          aboutMe: profileData.aboutMe,
          interests: profileData.interests,
          languages: profileData.languages,
          location: {
            zipCode: profileData.zipCode
          }
        }
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Profile updated!');
      // Cập nhật lại user data trong AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(result.user));
      return result.user;
    } else {
      console.error('❌ Update failed:', result.message);
      if (result.hint) {
        console.log('💡 Hint:', result.hint);
      }
    }
  } catch (error) {
    console.error('Update profile error:', error);
  }
};
```

## 📋 TÀI KHOẢN TEST HIỆN TẠI:

| Username | Password | Name | Current ID |
|----------|----------|------|------------|
| admin | admin | 111 | 68ff7945a5af320b4d1b0187 |
| minhchau | password | Trần Minh Châu | 68ff7945a5af320b4d1b0188 |
| hoangvu | password | Lê Hoàng Vũ | 68ff7945a5af320b4d1b0189 |

## 🧪 TEST NHANH:

### 1. Login để lấy userId mới:
```bash
POST http://192.168.1.31:5000/api/auth/login
Body: { "username": "admin", "password": "admin" }
```

Response sẽ có:
```json
{
  "success": true,
  "user": {
    "id": "68ff7945a5af320b4d1b0187",  // ← Đây là userId MỚI
    "username": "admin",
    "profile": { ... }
  }
}
```

### 2. Update profile với userId MỚI:
```bash
PUT http://192.168.1.31:5000/api/users/profile/68ff7945a5af320b4d1b0187
Body: {
  "profile": {
    "name": "Binhcode",
    "age": 22,
    "gender": "male",
    "aboutMe": "Tôi yêu mọi người nhiều lấm"
  }
}
```

## 🔧 BACKEND ĐÃ CẢI THIỆN:

Backend giờ sẽ:
- ✅ Validate userId format
- ✅ Show helpful error message khi user not found
- ✅ List available users trong console để debug
- ✅ Suggest login lại trong response

## 📝 LƯU Ý:

1. **Mỗi khi reseed database** → Phải login lại
2. **Luôn lưu userId** từ response login
3. **Check userId** trước khi gọi API
4. **Handle 404 error** → Redirect về login screen

## 🎯 QUICK FIX CHO FRONTEND:

Thêm error handler này:
```javascript
// Trong API call
.catch(error => {
  if (error.message.includes('User not found') || error.message.includes('login again')) {
    // Clear storage và redirect về login
    AsyncStorage.clear();
    navigation.navigate('Login');
    Alert.alert('Session Expired', 'Please login again');
  }
});
```
