import React, { useEffect, useState } from "react";
import {  Button, Box, TextField, CircularProgress } from "@mui/material";
import UserTable from "../components/UserTable";
import type { User } from "../components/UserTable";
import UserForm from "../components/UserForm";
import * as userService from "../services/userService";
import TareasDrawer from "../components/TareasDrawer";

const Usuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [busqueda, setBusqueda] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [drawerTareasOpen, setDrawerTareasOpen] = useState(false);
    const [usuarioTareas, setUsuarioTareas] = useState<User | null >(null);
 
    useEffect (() => {
        setLoading(true);
        userService.getUsuarios().then(setUsuarios).finally(() => setLoading(false));
    }, []);

    const handleOpenTareas = (user: User) => {
        setUsuarioTareas(user);
        setDrawerTareasOpen(true);
    };

    const handleCloseTareas = () => {
        setDrawerTareasOpen(false);
        setUsuarioTareas(null);
    }

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

    const usuariosFiltrados = usuarios.filter(u => {
        const palabras = busqueda.trim().toLowerCase().split(/\s+/);
        return palabras.every(palabra => 
            u.nombre.toLowerCase().includes(palabra) ||
            u.email.toLowerCase().includes(palabra) ||
            u.rol.toLowerCase().includes(palabra)
        );
    });

    if (loading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "60vh"}}>
                <CircularProgress />
            </Box>
        );
    }


    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <TextField
                    label="Buscar usuario por nombre, email o rol"
                    variant="outlined"
                    size="small"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    sx={{ mr: 2, flex: 1 }}
                />
                <Button variant="contained" onClick={() => setOpenAdd(true)}>
                    Agregar Usuario
                </Button>
            </Box>
            <UserTable 
                usuarios= {usuariosFiltrados} 
                onEdit={openEditForm} 
                onDelete={handleDeleteUser}
                onOpenTareas={handleOpenTareas} 
            />
            <UserForm
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onSubmit={handleAddUser}
                title="Agregar Usuario"
            />
            <UserForm
                open={openEdit}
                onClose={()=> setOpenEdit(false)}
                onSubmit={handleEditUser}
                initialData={
                    userToEdit
                    ? {nombre: userToEdit.nombre, email: userToEdit.email, rol: userToEdit.rol}
                    : undefined
                }
                title="Editar Usuario"
            />
            <TareasDrawer
                usuario={usuarioTareas}
                open={drawerTareasOpen}
                onClose={handleCloseTareas}
            />
        </div>
    )
};

export default Usuarios;