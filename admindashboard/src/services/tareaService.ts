import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tareas";

export type Tarea = {
    id: number;
    titulo: string;
    descripcion?: string;
    usuario_id: number;
    usuario_nombre: string;
    completada: boolean;
    comentario?: string;
    created_at?: string;
    updated_at?: string;
}

// Obtener tareas

export const getTareas = async (usuario_id?: number): Promise<Tarea[]> => {
    const params = usuario_id ? {params: {usuario_id} } : {};
    const response = await axios.get<Tarea[]>(API_URL, params);
    return response.data;
};

//Crear tarea
export const crearTarea = async (tarea: Omit<Tarea, "id" |"completada" | "created_at" | "updated_at">) => {
    const response = await axios.post<Tarea>(API_URL, tarea);
    return response.data;
};

//Actualizar tarea
export const actualizarTarea = async (id: number, datos: Partial<Tarea>) => {
    const response = await axios.put<Tarea>(`${API_URL}/${id}`, datos);
    return response.data;
};

//Borrar tarea
export const borrarTarea = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}

