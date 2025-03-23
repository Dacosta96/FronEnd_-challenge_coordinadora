import axios from "axios";
import { UserDTO } from "./dto/user-dto";

const API_URL = import.meta.env.VITE_PUBLIC_URL_API;

export const createUser = async (dataUser: UserDTO): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}users`, dataUser);

    if (response.status !== 201) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error creating user", error);
  }
  return null;
};

export const getUserByEmail = async (email: string): Promise<any> => {
  try {
    console.log("Getting user by email", email);
    const response = await axios.get(`${API_URL}users/email/${email}`);
    console.log("response", response);
    if (response.status !== 200) {
      console.error("Error getting user by email");
      return { user: [] };
    }
    return response.data;
  } catch (error) {
    console.error(error);
    console.error("Error getting user by email");
  }
  return { user: [] };
};
