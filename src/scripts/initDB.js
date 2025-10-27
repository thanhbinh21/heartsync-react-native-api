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
  },
  {
    username: 'anhtuan',
    password: '123456',
    profile: {
      name: 'Nguyễn Anh Tuấn',
      age: 28,
      photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'],
      aboutMe: 'Developer thích coffee và code, đôi khi cũng thích người yêu.',
      occupation: 'Full-stack Developer',
      gender: 'Nam',
      pronouns: 'Anh',
      education: 'Đại học Bách Khoa TP.HCM',
      location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
      height: "1m75",
      interests: ['Coding', 'Gaming', 'Netflix'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nữ'],
      ageRange: { min: 23, max: 30 },
      distance: 50,
      languages: ['Tiếng Việt']
    },
    subscription: 'premium',
    verified: true
  },
  {
    username: 'phuonganh',
    password: '123456',
    profile: {
      name: 'Lê Phương Anh',
      age: 25,
      photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'],
      aboutMe: 'Yêu thiên nhiên, thích đi phượt và sống chậm lại.',
      occupation: 'Content Creator',
      gender: 'Nữ',
      pronouns: 'Chị',
      education: 'Đại học Văn hóa Hà Nội',
      location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
      height: "1m60",
      interests: ['Photography', 'Travel', 'Vlogging'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nam'],
      ageRange: { min: 25, max: 33 },
      distance: 100,
      languages: ['Tiếng Việt']
    },
    subscription: 'free',
    verified: true
  },
  {
    username: 'ducminh',
    password: '123456',
    profile: {
      name: 'Trần Đức Minh',
      age: 30,
      photos: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400'],
      aboutMe: 'Kiến trúc sư thích thiết kế và cái đẹp trong cuộc sống.',
      occupation: 'Kiến trúc sư',
      gender: 'Nam',
      pronouns: 'Anh',
      education: 'Đại học Kiến trúc TP.HCM',
      location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
      height: "1m79",
      interests: ['Kiến trúc', 'Nghệ thuật', 'Du lịch'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nữ'],
      ageRange: { min: 25, max: 32 },
      distance: 30,
      languages: ['Tiếng Việt']
    },
    subscription: 'premium',
    verified: true
  },
  {
    username: 'mythao',
    password: '123456',
    profile: {
      name: 'Võ Mỹ Thảo',
      age: 22,
      photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400'],
      aboutMe: 'Sinh viên năm cuối, thích đọc sách và uống trà.',
      occupation: 'Sinh viên Marketing',
      gender: 'Nữ',
      pronouns: 'Em',
      education: 'Đại học Ngoại thương',
      location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
      height: "1m64",
      interests: ['Reading', 'Tea', 'Music'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nam'],
      ageRange: { min: 22, max: 28 },
      distance: 40,
      languages: ['Tiếng Việt']
    },
    subscription: 'free',
    verified: true
  },
  {
    username: 'duykhang',
    password: '123456',
    profile: {
      name: 'Phan Duy Khang',
      age: 26,
      photos: ['https://images.unsplash.com/photo-1463453091185-61582044d556?w=400'],
      aboutMe: 'Thể thao là niềm đam mê, yêu là dành cả trái tim.',
      occupation: 'HLV Gym',
      gender: 'Nam',
      pronouns: 'Anh',
      education: 'Đại học Thể dục Thể thao',
      location: { city: 'Đà Nẵng', state: 'VN', zipCode: '550000' },
      height: "1m82",
      interests: ['Gym', 'Bơi lội', 'Yoga'],
      languages: ['Tiếng Việt']
    },
    preferences: {
      gender: ['Nữ'],
      ageRange: { min: 21, max: 29 },
      distance: 60,
      languages: ['Tiếng Việt']
    },
    subscription: 'premium',
    verified: true
  },
  {
    username: 'huyentrang',
    password: '123456',
    profile: {
      name: 'Đặng Huyền Trang',
      age: 24,
      photos: ['https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400'],
      aboutMe: 'Nụ cười là vũ khí của em, yêu là chân thành.',
      occupation: 'Giáo viên Tiếng Anh',
      gender: 'Nữ',
      pronouns: 'Cô',
      education: 'Đại học Sư phạm Hà Nội',
      location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
      height: "1m61",
      interests: ['Teaching', 'Movies', 'Cafe'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nam'],
      ageRange: { min: 24, max: 31 },
      distance: 50,
      languages: ['Tiếng Việt']
    },
    subscription: 'free',
    verified: true
  },
  {
    username: 'vannam',
    password: '123456',
    profile: {
      name: 'Lương Văn Nam',
      age: 29,
      photos: ['https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400'],
      aboutMe: 'Bác sĩ trẻ đam mê công việc và yêu thương con người.',
      occupation: 'Bác sĩ nội trú',
      gender: 'Nam',
      pronouns: 'Anh',
      education: 'Đại học Y Hà Nội',
      location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
      height: "1m74",
      interests: ['Y học', 'Đọc sách', 'Chạy bộ'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nữ'],
      ageRange: { min: 24, max: 32 },
      distance: 40,
      languages: ['Tiếng Việt']
    },
    subscription: 'premium',
    verified: true
  },
  {
    username: 'baongoc',
    password: '123456',
    profile: {
      name: 'Bùi Bảo Ngọc',
      age: 23,
      photos: ['https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400'],
      aboutMe: 'Yêu động vật, thích âm nhạc acoustic và những ngày mưa.',
      occupation: 'Nhân viên thú y',
      gender: 'Nữ',
      pronouns: 'Em',
      education: 'Đại học Nông Lâm TP.HCM',
      location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
      height: "1m59",
      interests: ['Animals', 'Music', 'Rain'],
      languages: ['Tiếng Việt']
    },
    preferences: {
      gender: ['Nam'],
      ageRange: { min: 23, max: 29 },
      distance: 35,
      languages: ['Tiếng Việt']
    },
    subscription: 'free',
    verified: true
  },
  {
    username: 'quocanh',
    password: '123456',
    profile: {
      name: 'Trịnh Quốc Anh',
      age: 27,
      photos: ['https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400'],
      aboutMe: 'Doanh nhân trẻ với khát vọng xây dựng startup công nghệ.',
      occupation: 'CEO Startup',
      gender: 'Nam',
      pronouns: 'Anh',
      education: 'Đại học Kinh tế Quốc dân',
      location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
      height: "1m77",
      interests: ['Business', 'Tech', 'Networking'],
      languages: ['Tiếng Việt', 'Tiếng Anh']
    },
    preferences: {
      gender: ['Nữ'],
      ageRange: { min: 23, max: 30 },
      distance: 70,
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

