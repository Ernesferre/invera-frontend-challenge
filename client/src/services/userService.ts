import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  company: string;
  status: "Online" | "Offline";
}

const API_URL = 'http://localhost:8000';

export const userService = {
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users?_page=1&_limit=50`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener los usuarios: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  },

  createUser: async (userData: Omit<User, "id">) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  },

  updateUser: async (id: number, userData: Omit<User, "id">) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  },

  deleteUser: async (id: number) => {
    try {
        
      await axios.delete(`${API_URL}/users/${id}`);
    } catch (error) {
      throw new Error(`Error al eliminar el usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }
};

export type { User }; 