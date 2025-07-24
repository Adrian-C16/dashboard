import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

interface LoginResponse {
    token: string;
    admin: {
        id: number;
        name: string;
        email: string;
    }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/admin/login`, {
            email,
            password,
        });

        // Guardar token y datos
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Error de autenticación');
        }
        throw new Error("Error de conexión");
        
    }
};

export const logout = async (): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            await axios.post(`${API_URL}/admin/logout`, {}, {
                headers: {Authorization: `Bearer ${token}`}
            });
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
    }
};

export const getCurrentAdmin = () => {
    const admin = localStorage.getItem('admin'); 
    return admin ? JSON.parse(admin) : null;
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
};