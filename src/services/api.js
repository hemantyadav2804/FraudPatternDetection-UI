import axios from "axios";

// Base URL of Spring Boot backend
const BASE_URL = "http://localhost:8090";

// ---------------- AUTH ----------------

// Login
export const loginUser = (data) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
};

// Register
export const registerUser = (data) => {
  return axios.post(`${BASE_URL}/auth/register`, data);
};

// ---------------- USER ----------------

// Get balance
export const getBalance = (userId) => {
  return axios.get(`${BASE_URL}/account/balance/${userId}`);
};

// Transfer money
export const transferMoney = (data) => {
  return axios.post(`${BASE_URL}/transaction/transfer`, data);
};

// ---------------- ADMIN ----------------

// Get fraud users
export const getFraudUsers = (adminUsername) => {
  return axios.get(
    `${BASE_URL}/admin/fraud-users?adminUsername=${adminUsername}`
  );
};

// Block user
export const blockUser = (userId, adminUsername) => {
  return axios.post(
    `${BASE_URL}/admin/block/${userId}?adminUsername=${adminUsername}`
  );
};
