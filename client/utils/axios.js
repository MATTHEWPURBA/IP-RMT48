import axios from "axios";
export const localRequest = axios.create({
  baseURL: "localhost:3000",
});
