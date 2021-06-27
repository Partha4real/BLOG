import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// user
export const signIn = (formData) => API.post("/user/signin", formData);
export const addUser = (formData) => API.post("/user/signup", formData);
export const getUsers = () => API.get("/user/getUsers");
export const updateUser = (id, updatedUser) =>
  API.post(`/user/deleteUser/${id}`, updatedUser);

// Enquiry Form
export const getBlogs = () => API.get("/blog/getBlogs");
export const addBlog = (formData) => API.post("/blog/addBlog", formData);
export const updateBlog = (id, updatedBlog) =>
  API.post(`/blog/updateBlog/${id}`, updatedBlog);
// export const deleteCustomerEnquiry = (id) =>
//   API.delete(`/customer-enquiry/deleteCustomerEnquiry/${id}`);
