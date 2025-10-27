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
  },

  {
  username: 'hanhphuc',
  password: '123456',
  profile: {
    name: 'Nguyễn Hạnh Phúc',
    age: 22,
    photos: ['https://images.unsplash.com/photo-1531256379416-9f000e90a54c?w=400'],
    aboutMe: 'Cười nhiều để cuộc sống vui nhiều.',
    occupation: 'Sinh viên Kế toán',
    gender: 'Nữ',
    pronouns: 'Em',
    education: 'Đại học Tài chính - Marketing',
    location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
    height: "1m58",
    interests: ['Cafe', 'Học nấu ăn', 'Xem phim'],
    languages: ['Tiếng Việt']
  },
  preferences: {
    gender: ['Nam'],
    ageRange: { min: 22, max: 28 },
    distance: 30,
    languages: ['Tiếng Việt']
  },
  subscription: 'free',
  verified: true
},
{
  username: 'thienkim',
  password: '123456',
  profile: {
    name: 'Trần Thiên Kim',
    age: 24,
    photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400'],
    aboutMe: 'Thích thời trang và du lịch biển.',
    occupation: 'Nhân viên bán hàng',
    gender: 'Nữ',
    pronouns: 'Cô',
    education: 'Cao đẳng Kinh tế',
    location: { city: 'Đà Nẵng', state: 'VN', zipCode: '550000' },
    height: "1m63",
    interests: ['Shopping', 'Travel', 'Music'],
    languages: ['Tiếng Việt']
  },
  preferences: {
    gender: ['Nam'],
    ageRange: { min: 23, max: 30 },
    distance: 80,
    languages: ['Tiếng Việt']
  },
  subscription: 'premium',
  verified: true
},
{
  username: 'hoaianh',
  password: '123456',
  profile: {
    name: 'Đào Hoài Anh',
    age: 23,
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'],
    aboutMe: 'Nội tâm nhưng sâu sắc.',
    occupation: 'Designer Freelancer',
    gender: 'Nữ',
    pronouns: 'Cô',
    education: 'Đại học Mỹ thuật Công nghiệp',
    location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
    height: "1m61",
    interests: ['Art', 'Photography', 'Music'],
    languages: ['Tiếng Việt', 'Tiếng Anh']
  },
  preferences: {
    gender: ['Nam'],
    ageRange: { min: 24, max: 30 },
    distance: 100,
    languages: ['Tiếng Việt']
  },
  subscription: 'free',
  verified: true
},
{
  username: 'hongnhung',
  password: '123456',
  profile: {
    name: 'Phạm Hồng Nhung',
    age: 21,
    photos: ['https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400'],
    aboutMe: 'Hay cười và dễ thương.',
    occupation: 'Sinh viên Du lịch',
    gender: 'Nữ',
    pronouns: 'Em',
    education: 'Đại học Văn Lang',
    location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
    height: "1m57",
    interests: ['Travel', 'Makeup', 'TikTok'],
    languages: ['Tiếng Việt']
  },
  preferences: {
    gender: ['Nam'],
    ageRange: { min: 21, max: 27 },
    distance: 25,
    languages: ['Tiếng Việt']
  },
  subscription: 'free',
  verified: false
},
{
  username: 'yennhi',
  password: '123456',
  profile: {
    name: 'Đinh Yên Nhi',
    age: 22,
    photos: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400'],
    aboutMe: 'Tính tình dễ thương, ai tốt với mình mình tốt lại gấp đôi.',
    occupation: 'Nhân viên Spa',
    gender: 'Nữ',
    pronouns: 'Em',
    education: 'Trung cấp thẩm mỹ',
    location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
    height: "1m60",
    interests: ['Skincare', 'Music', 'Yoga'],
    languages: ['Tiếng Việt']
  },
  preferences: {
    gender: ['Nam'],
    ageRange: { min: 22, max: 30 },
    distance: 60,
    languages: ['Tiếng Việt']
  },
  subscription: 'premium',
  verified: true
},
{
  username: 'thienan',
  password: '123456',
  profile: {
    name: 'Nguyễn Thiên An',
    age: 23,
    photos: ['https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'],
    aboutMe: 'Cuộc đời là những chuyến đi.',
    occupation: 'Hướng dẫn viên du lịch',
    gender: 'Nữ',
    pronouns: 'Cô',
    education: 'Đại học Ngoại ngữ Đà Nẵng',
    location: { city: 'Đà Nẵng', state: 'VN', zipCode: '550000' },
    height: "1m62",
    interests: ['Travel', 'Coffee', 'Movies'],
    languages: ['Tiếng Việt', 'Tiếng Anh']
  },
  preferences: {
    gender: ['Nam'],
    ageRange: { min: 23, max: 29 },
    distance: 150,
    languages: ['Tiếng Việt']
  },
  subscription: 'free',
  verified: true
},
{
  username: 'camtu',
  password: '123456',
  profile: {
    name: 'Lê Cẩm Tú',
    age: 25,
    photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'],
    aboutMe: 'Thích gym và cuộc sống lành mạnh.',
    occupation: 'PT nữ',
    gender: 'Nữ',
    pronouns: 'Chị',
    education: 'Đại học TDTT TP.HCM',
    location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
    height: "1m63",
    interests: ['Gym', 'Healthy Food', 'Travel'],
    languages: ['Tiếng Việt']
  },
  preferences: {
    gender: ['Nam'],
    ageRange: { min: 25, max: 32 },
    distance: 45,
    languages: ['Tiếng Việt']
  },
  subscription: 'premium',
  verified: true
},
{
  username: 'thoan',
  password: '123456',
  profile: {
    name: 'Tạ Tho An',
    age: 20,
    photos: ['https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400'],
    aboutMe: 'Bé nhỏ nhưng không dễ bắt nạt.',
    occupation: 'Sinh viên năm 2',
    gender: 'Nữ',
    pronouns: 'Em',
    education: 'Đại học Mở TP.HCM',
    location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
    height: "1m55",
    interests: ['Kpop', 'Dance', 'Netflix'],
    languages: ['Tiếng Việt', 'Tiếng Hàn (basic)']
  },
  preferences: {
    gender: ['Nam'],
    ageRange: { min: 20, max: 26 },
    distance: 20,
    languages: ['Tiếng Việt']
  },
  subscription: 'free',
  verified: false
},
{
  username: 'khanhvy',
  password: '123456',
  profile: {
    name: 'Vũ Khánh Vy',
    age: 24,
    photos: ['https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400'],
    aboutMe: 'Không hoàn hảo nhưng luôn thật lòng.',
    occupation: 'Kế toán',
    gender: 'Nữ',
    pronouns: 'Cô',
    education: 'Đại học Thương Mại',
    location: { city: 'Hà Nội', state: 'VN', zipCode: '100000' },
    height: "1m61",
    interests: ['Music', 'Cafe', 'Gym'],
    languages: ['Tiếng Việt']
  },
  preferences: {
    gender: ['Nam'],
    ageRange: { min: 24, max: 32 },
    distance: 30,
    languages: ['Tiếng Việt']
  },
  subscription: 'free',
  verified: true
},
{
  username: 'ngocanh22',
  password: '123456',
  profile: {
    name: 'Mai Ngọc Ánh',
    age: 26,
    photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'],
    aboutMe: 'Ít nói nhưng yêu chân thành.',
    occupation: 'Nhân viên HR',
    gender: 'Nữ',
    pronouns: 'Chị',
    education: 'Đại học RMIT',
    location: { city: 'TP. Hồ Chí Minh', state: 'VN', zipCode: '700000' },
    height: "1m64",
    interests: ['HR', 'Music', 'Travel'],
    languages: ['Tiếng Việt', 'Tiếng Anh']
  },
  preferences: {
    gender: ['Nam'],
    ageRange: { min: 26, max: 34 },
    distance: 30,
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