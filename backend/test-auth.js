// Test script for JWT authentication endpoints
// Run this with: node test-auth.js

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAuthentication() {
  try {
    console.log('🧪 Testing JWT Authentication System...\n');

    // Test 1: Register a new user
    console.log('1️⃣ Testing User Registration...');
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      user_name: 'Test User',
      user_email: 'test@example.com',
      user_password: 'password123',
      role: 'buyer',
      user_phone: '1234567890',
      user_studyyear: '3rd Year',
      user_branch: 'Computer Science',
      user_section: 'A',
      user_residency: 'Hostel'
    });

    console.log('✅ Registration successful!');
    console.log('Token:', registerResponse.data.token.substring(0, 20) + '...');
    console.log('User:', registerResponse.data.user);

    const token = registerResponse.data.token;

    // Test 2: Login
    console.log('\n2️⃣ Testing User Login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      user_email: 'test@example.com',
      user_password: 'password123'
    });

    console.log('✅ Login successful!');
    console.log('Token:', loginResponse.data.token.substring(0, 20) + '...');

    // Test 3: Get Profile (Protected Route)
    console.log('\n3️⃣ Testing Protected Route (Get Profile)...');
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('✅ Profile retrieved successfully!');
    console.log('Profile:', profileResponse.data.user);

    // Test 4: Test Public Route (Get Products)
    console.log('\n4️⃣ Testing Public Route (Get Products)...');
    const productsResponse = await axios.get(`${BASE_URL}/products`);
    console.log('✅ Products retrieved successfully!');
    console.log('Products count:', productsResponse.data.length);

    // Test 5: Test Protected Route without Token (Should fail)
    console.log('\n5️⃣ Testing Protected Route without Token (Should fail)...');
    try {
      await axios.get(`${BASE_URL}/cart`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Correctly rejected request without token!');
        console.log('Error:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    if (error.response) {
      console.log('❌ Test failed!');
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    } else {
      console.log('❌ Network or server error:', error.message);
    }
  }
}

testAuthentication();
