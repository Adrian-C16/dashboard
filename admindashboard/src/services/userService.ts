import axios from "axios";
import type {User} from "../components/UserTable";

const API_URL = "http://127.0.0.1:8000/api/usuarios";

export async function getUsuarios(): Promise<User[]> {
    const res = await axios.get<User[]>(API_URL);
    return res.data;
}

export async function addUsuario(user: Omit<User, "id">): Promise<User> {
    const res = await axios.post<User>(API_URL, user);
    return res.data;
}

export async function updateUsuario(id: number, user: Omit<User, "id">): Promise<User> {
    const res = await axios.put<User>(`${API_URL}/${id}`, user);
    return res.data;
}

export async function deleteUsuario(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
}