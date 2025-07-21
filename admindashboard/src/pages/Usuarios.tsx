import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import UserTable from "../components/UserTable";
import type { User } from "../components/UserTable";
import UserForm from "../components/UserForm";
import * as userService from "../services/userService";

const Usuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    useEffect (() => {
        userService.getUsuarios().then(setUsuarios);
    }, []);

    const handleAddUser = async (user: Omit<User, "id">) => {
        const nuevoUsuario = await userService.addUsuario(user);
        setUsuarios((prev) => [...prev, nuevoUsuario])
        setOpenAdd(false);
    };

    const handleEditUser = async (user: Omit<User, "id">) => {
        if (userToEdit) {
            const actualizado = await userService.updateUsuario(userToEdit.id, user);
            setUsuarios((prev) => 
            prev.map((u) => (u.id === userToEdit.id ? actualizado : u))
        );
        setUserToEdit(null);
        setOpenEdit(false);
        }
    };

    const handleDeleteUser = async (id: number) => {
        await userService.deleteUsuario(id);
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