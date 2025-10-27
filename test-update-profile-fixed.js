// Test Update Profile with CORRECT userId
const testUpdateProfileFixed = async () => {
  try {
    console.log('🧪 Test Update Profile - Fixed Version\n');
    console.log('=' .repeat(60));
    
    // Step 1: Login to get CURRENT userId
    console.log('\n📝 Step 1: Login to get current userId...');
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin' })
    });
    
    const loginData = await loginResponse.json();
    
    if (!loginData.success) {
      console.error('❌ Login failed:', loginData.message);
      return;
    }
    
    console.log('✅ Login successful!');
    console.log('📋 User Info:');
    console.log('   - Username:', loginData.user.username);
    console.log('   - Current Name:', loginData.user.profile.name);
    console.log('   - Current userId:', loginData.user.id);
    console.log('   ⚠️  IMPORTANT: This is the CORRECT userId to use!');
    
    const userId = loginData.user.id;
    
    // Step 2: Update Profile with CORRECT userId
    console.log('\n📝 Step 2: Update profile with CORRECT userId...');
    console.log('Sending request to: PUT /api/users/profile/' + userId);
    
    const updateData = {
      profile: {
        name: 'Binhcode',
        age: 22,
        gender: 'male',
        aboutMe: 'Tôi yêu mọi người nhiều lấm',
        interests: ['Sci-fi movies', 'Coding', 'Music'],
        languages: ['English', 'Finnish', 'Vietnamese'],
        location: {
          city: 'Las Vegas',
          state: 'NV',
          zipCode: '89104'
        }
      }
    };
    
    console.log('📦 Update data:', JSON.stringify(updateData, null, 2));
    
    const updateResponse = await fetch(`http://localhost:5000/api/users/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    
    const updateResult = await updateResponse.json();
    
    console.log('\n📬 Response:', JSON.stringify(updateResult, null, 2));
    
    if (updateResult.success) {
      console.log('\n✅ SUCCESS! Profile updated!');
      console.log('📋 Updated Profile:');
      console.log('   - Name:', updateResult.user.profile.name);
      console.log('   - Age:', updateResult.user.profile.age);
      console.log('   - Gender:', updateResult.user.profile.gender);
      console.log('   - About:', updateResult.user.profile.aboutMe);
      console.log('   - Interests:', updateResult.user.profile.interests.join(', '));
      console.log('   - Languages:', updateResult.user.profile.languages.join(', '));
      console.log('   - Location:', `${updateResult.user.profile.location.city}, ${updateResult.user.profile.location.state} ${updateResult.user.profile.location.zipCode}`);
    } else {
      console.log('\n❌ FAILED! Update unsuccessful');
      console.log('Error:', updateResult.message);
      if (updateResult.hint) {
        console.log('💡 Hint:', updateResult.hint);
      }
    }
    
    // Step 3: Verify
    console.log('\n📝 Step 3: Verify by fetching profile again...');
    const verifyResponse = await fetch(`http://localhost:5000/api/users/me/${userId}`);
    const verifyData = await verifyResponse.json();
    
    if (verifyData.success) {
      console.log('✅ Verification successful!');
      console.log('   Current name in DB:', verifyData.user.profile.name);
      console.log('   Current age in DB:', verifyData.user.profile.age);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 Test completed!\n');
    
  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    console.error(error);
  }
};

// Run test
console.log('🚀 Starting test...\n');
testUpdateProfileFixed();
