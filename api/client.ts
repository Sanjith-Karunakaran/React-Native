import axios from 'axios';

const client = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  res => res,
  err => {
    console.log('API ERROR:', err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default client;
