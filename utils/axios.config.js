import axios from 'axios';

const instance = axios.create({
  //baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001',
  baseURL: ''
});

export default instance;