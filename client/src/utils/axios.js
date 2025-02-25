// import axios from 'axios';

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: 'https://wortal-recipes-2.onrender.com/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized access
//       localStorage.removeItem('token');
//       window.location.href = '/auth';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;