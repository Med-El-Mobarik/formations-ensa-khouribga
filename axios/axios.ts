import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:3000/api/",
// });

const instance = axios.create({
  baseURL: "https://ensak-formations.com/api/",
});

// const instance = axios.create({
//   baseURL: "https://ensakh-formations.vercel.app/api/",
// });

export default instance;
