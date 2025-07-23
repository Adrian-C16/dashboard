import React from "react";

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
    IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

//Definimos el tipo de usuario

export type User = {
    id: number;
    nombre: string;
    email: string;
    rol: string;
};

type UserTableProps = {
    usuarios: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
    onOpenTareas: (user: User) => void;
};

const UserTable: React.FC<UserTableProps> = ({usuarios, onEdit, onDelete, onOpenTareas}) => (
    <TableContainer component={Paper}>
        <Typography variant="h6" sx={{m: 2}}>
            Lista de Usuarios
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Rol</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {usuarios.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.nombre}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.rol}</TableCell>
                        <TableCell align="right">
                            <IconButton onClick={() => onEdit(user)} size="small" color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => onDelete(user.id)} size="small" color="error">
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => onOpenTareas(user)}>
                                <AssignmentTurnedInIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer> 
);

export default UserTable;




