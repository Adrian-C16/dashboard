import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import type { User } from "./UserTable";

type UserFormProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (user: Omit<User, "id">) => void;
    initialData?: Omit<User, "id">;
    title: string;
};

const UserForm: React.FC<UserFormProps> = ({ open, onClose, onSubmit, initialData, title}) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');

    useEffect (() => {
        if (initialData) {
            setNombre(initialData.nombre);
            setEmail(initialData.email);
            setRol(initialData.rol);
        } else {
            setNombre('');
            setEmail('');
            setRol('');
        }
    }, [initialData, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({nombre, email, rol});
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box component= 'form' onSubmit={handleSubmit} sx={{mt: 2}}>
                    <TextField
                        label='Nombre'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label='Rol'
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <DialogActions>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button type="submit" variant="contained">
                            Guardar
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UserForm;