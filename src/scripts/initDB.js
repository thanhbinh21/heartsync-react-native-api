const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const sampleUsers = [
  {
    username: 'admin',
    password: 'admin',
    profile: {
      name: 'Nguyễn Thành Bình',
      age: 22,
      photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'],
      aboutMe: 'Một chàng trai vui tính, thích công nghệ và thích ăn phở.',
      occupation: 'Sinh viên CNTT',
      gender: 'Nam',
      pronouns: 'Anh',
      education: 'Đại học Công nghiệp TP.HCM',
      location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
      height: "1m75",
      interests: ['Lập trình', 'Chạy bộ', 'Xem phim Marvel'],
      languages: ['Tiếng Việt']
    },
    preferences: {
      gender: ['Nữ'],
      ageRange: { min: 20, max: 26 },
      distance: 30,
      languages: ['Tiếng Việt']
    },
    subscription: 'free',
    verified: true
  },
  {
    username: 'minhchau',
    password: '123456',
    profile: {
      name: 'Trần Minh Châu',
      age: 23,
      photos: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400'],
      aboutMe: 'Yêu mèo, thích du lịch và sống hết mình vì tuổi trẻ.',
      occupation: 'Nhân viên marketing',
      gender: 'Nữ',
      pronouns: 'Cô',
      education: 'Đại học Kinh tế TP.HCM',
      location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
      height: "1m60",
      interests: ['Mèo', 'Cà phê', 'Du lịch'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nam'],
      ageRange: { min: 23, max: 30 },
      distance: 50,
      languages: ['Tiếng Việt']
    },
    subscription: 'premium',
    verified: true
  },
  {
    username: 'hoangvu',
    password: '123456',
    profile: {
      name: 'Lê Hoàng Vũ',
      age: 26,
      photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
      aboutMe: 'Thích thể thao và khám phá những điều mới mẻ.',
      occupation: 'Kỹ sư phần mềm',
      gender: 'Nam',
      pronouns: 'Anh',
      education: 'Đại học Bách Khoa Đà Nẵng',
      location: { city: 'Đà Nẵng', state: 'VN', zipCode: '550000' },
      height: "1m80",
      interests: ['Bóng đá', 'Game', 'Đi phượt'],
      languages: ['Tiếng Việt']
    },
    preferences: {
      gender: ['Nữ'],
      ageRange: { min: 22, max: 28 },
      distance: 100,
      languages: ['Tiếng Việt']
    },
    subscription: 'free',
    verified: true
  },
  {
    username: 'kimanh',
    password: '123456',
    profile: {
      name: 'Ngô Kim Anh',
      age: 24,
      photos: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'],
      aboutMe: 'Dịu dàng nhưng đôi khi cũng rất cá tính.',
      occupation: 'Chuyên viên thiết kế đồ họa',
      gender: 'Nữ',
      pronouns: 'Cô',
      education: 'Đại học Kiến trúc Hà Nội',
      location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
      height: "1m63",
      interests: ['Vẽ', 'Âm nhạc Hàn Quốc', 'Thời trang'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nam'],
      ageRange: { min: 24, max: 32 },
      distance: 50,
      languages: ['Tiếng Việt']
    },
    subscription: 'premium',
    verified: true
  },
  {
    username: 'quangthinh',
    password: '123456',
    profile: {
      name: 'Phạm Quang Thịnh',
      age: 29,
      photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400'],
      aboutMe: 'Chủ nghĩa xê dịch, đam mê phượt và trải nghiệm.',
      occupation: 'Nhiếp ảnh gia tự do',
      gender: 'Nam',
      pronouns: 'Anh',
      education: 'Đại học Quốc gia Hà Nội',
      location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
      height: "1m77",
      interests: ['Nhiếp ảnh', 'Leo núi', 'Camping'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nữ'],
      ageRange: { min: 24, max: 33 },
      distance: 200,
      languages: ['Tiếng Việt']
    },
    subscription: 'free',
    verified: true
  },
  {
    username: 'thuyduong',
    password: '123456',
    profile: {
      name: 'Võ Thúy Dương',
      age: 21,
      photos: ['https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400'],
      aboutMe: 'Bé vui vẻ, hay cười nhưng nghiêm túc khi yêu.',
      occupation: 'Sinh viên điều dưỡng',
      gender: 'Nữ',
      pronouns: 'Cô',
      education: 'Đại học Y Dược Huế',
      location: { city: 'Huế', state: 'VN', zipCode: '530000' },
      height: "1m58",
      interests: ['Nấu ăn', 'Xem phim Hàn', 'Tiktok'],
      languages: ['Tiếng Việt']
    },
    preferences: {
      gender: ['Nam'],
      ageRange: { min: 21, max: 27 },
      distance: 100,
      languages: ['Tiếng Việt']
    },
    subscription: 'free',
    verified: true
  },
  {
    username: 'thanhson',
    password: '123456',
    profile: {
      name: 'Đặng Thành Sơn',
      age: 27,
      photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'],
      aboutMe: 'IT boy chính hiệu, biết sửa máy tính và sửa trái tim em.',
      occupation: 'Dev Backend',
      gender: 'Nam',
      pronouns: 'Anh',
      education: 'Đại học CNTT TP.HCM',
      location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
      height: "1m78",
      interests: ['Âm nhạc', 'Đi du lịch', 'Coding'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nữ'],
      ageRange: { min: 22, max: 28 },
      distance: 30,
      languages: ['Tiếng Việt']
    },
    subscription: 'premium',
    verified: true
  },
  {
    username: 'ngoclan',
    password: '123456',
    profile: {
      name: 'Hoàng Ngọc Lan',
      age: 22,
      photos: ['https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400'],
      aboutMe: 'Thích sự lạc quan và những người thông minh.',
      occupation: 'Nhân viên văn phòng',
      gender: 'Nữ',
      pronouns: 'Cô',
      education: 'Đại học Công nghiệp Hà Nội',
      location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
      height: "1m62",
      interests: ['Đọc sách', 'Gym', 'Du lịch'],
      languages: ['Tiếng Việt']
    },
    preferences: {
      gender: ['Nam'],
      ageRange: { min: 22, max: 30 },
      distance: 70,
      languages: ['Tiếng Việt']
    },
    subscription: 'free',
    verified: true
  },
  {
    username: 'huutai',
    password: '123456',
    profile: {
      name: 'Trịnh Hữu Tài',
      age: 24,
      photos: ['https://images.unsplash.com/photo-1500047890485-07f69c8cb13a?w=400'],
      aboutMe: 'Vui tính, thích là đi, không ngại xa.',
      occupation: 'Kỹ thuật cơ khí',
      gender: 'Nam',
      pronouns: 'Anh',
      education: 'Đại học Sư phạm Kỹ thuật',
      location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
      height: "1m76",
      interests: ['Xem bóng đá', 'Phượt', 'Ăn uống'],
      languages: ['Tiếng Việt']
    },
    preferences: {
      gender: ['Nữ'],
      ageRange: { min: 21, max: 27 },
      distance: 50,
      languages: ['Tiếng Việt']
    },
    subscription: 'free',
    verified: false
  },
  {
    username: 'diemkhanh',
    password: '123456',
    profile: {
      name: 'Đỗ Diễm Khanh',
      age: 23,
      photos: ['https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'],
      aboutMe: 'Tự lập và yêu cuộc sống là chính mình.',
      occupation: 'Chuyên viên tài chính',
      gender: 'Nữ',
      pronouns: 'Cô',
      education: 'Học viện Ngân hàng',
      location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
      height: "1m65",
      interests: ['Yoga', 'Nấu ăn', 'Cafe chill'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nam'],
      ageRange: { min: 24, max: 32 },
      distance: 40,
      languages: ['Tiếng Việt']
    },
    subscription: 'premium',
    verified: true
  }
];


async function hashPasswords(users) {
  return Promise.all(
    users.map(async (user) => {
      const hashed = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashed };
    })
  );
}

async function initDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    await User.deleteMany({});
    console.log('🧹 Cleared existing users');

    // Hash password for each sample user
    for (const u of sampleUsers) {
      const hashed = await bcrypt.hash(u.password, 10);
      u.password = hashed;
    }

    await User.insertMany(sampleUsers);
    console.log(`✅ Inserted ${sampleUsers.length} sample users (hashed passwords)`);

    const userCount = await User.countDocuments();
    console.log(`📊 Total users in database: ${userCount}`);
    console.log('✨ Passwords are now securely hashed!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    process.exit(1);
  }
}

initDatabase();

