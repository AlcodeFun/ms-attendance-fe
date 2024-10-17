import axios from "axios";

// Configure axios to send cookies
axios.defaults.withCredentials = true; // Ensure cookies are sent with each request

// API for login
export const apiLogin = async (credentials) => {
  const response = await axios.post("http://localhost:5000/login", credentials);
  return response.data; // Return user data
};

// API for logout
export const apiLogout = async () => {
  const response = await axios.delete("http://localhost:5000/logout");
  return response.data;
};

// API to fetch logged-in user data (session check)
export const fetchUserData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/me");
    return response.data;
  } catch (error) {
    throw error; // Let the store handle 401 errors
  }
};

export const getStatistics = async () => {
  const response = await axios.get("http://localhost:5000/statistics");
  return response.data;
};
