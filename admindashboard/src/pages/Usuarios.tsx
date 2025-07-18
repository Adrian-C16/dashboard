import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import UserTable from "../components/UserTable";
import type { User } from "../components/UserTable";
import UserForm from "../components/UserForm";


const Usuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    useEffect (() => {
        //simulación llamada api
        setTimeout(() => {
            setUsuarios([
                { id: 1, nombre: "Juan Pérez", email: "juan.perez@email.com", rol: "Administrador" },
        { id: 2, nombre: "Ana Gómez", email: "ana.gomez@email.com", rol: "Editor" },
        { id: 3, nombre: "Carlos Ruiz", email: "carlos.ruiz@email.com", rol: "Usuario" }
            ]);    
        }, 1000);
    }, []);

    const handleAddUser = (user: Omit<User, "id">) => {
        setUsuarios((prev) => [
            ...prev,
            {...user, id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1}
        ]);
        setOpenAdd(false);
    };

    const handleEditUser = (user: Omit<User, "id">) => {
        if (userToEdit) {
            setUsuarios((prev) => 
            prev.map((u) => (u.id === userToEdit.id ? {...u, ...user} : u))
        );
        setUserToEdit(null);
        setOpenEdit(false);
        }
    };

    const handleDeleteUser = (id: number) => {
        setUsuarios ((prev) => prev.filter((u) => u.id !== id));
    };

    const openEditForm = (user: User) => {
        setUserToEdit(user);
        setOpenEdit(true);
    }


    return (
    <div>
        <Typography variant="h4" gutterBottom>
            Gestión de Usuarios
        </Typography>
        <Typography>
            Aquí podrás ver y administrar los usuarios del sistema.
        </Typography>
        <Box sx={{mb: 2}}>
            <Button variant="contained" onClick={() => setOpenAdd(true)}>
                Agregar Usuario
            </Button>
        </Box>
        <UserTable usuarios={usuarios} onEdit={openEditForm} onDelete={handleDeleteUser}/>
        <UserForm
            open={openAdd}
            onClose={()=> setOpenAdd(false)}
            onSubmit={handleAddUser}
            title="Agregar Usuario"
        />
        <UserForm
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            onSubmit={handleEditUser}
            initialData={
                userToEdit
                    ? {nombre: userToEdit.nombre, email: userToEdit.email, rol: userToEdit.rol}
                    : undefined
            }
            title="Editar Usuario"
        />
    </div>
    )
};

export default Usuarios;