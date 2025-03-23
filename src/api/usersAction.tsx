import axios from "axios";
import { UserDTO } from "./dto/user-dto";

const API_URL = import.meta.env.BASE_URL_API;

export const createUser = async (dataUser: UserDTO): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}users`, dataUser);
    if (response.status !== 201) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error creating comparationurl", error);
  }
  return null;
};
