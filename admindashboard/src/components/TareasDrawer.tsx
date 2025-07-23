import React, { useEffect, useState } from "react";
import {
    Box, Typography, Drawer, TextField, Button, List, ListItem, ListItemText,
    IconButton, Divider, InputAdornment, CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CommentIcon from "@mui/icons-material/Comment";
import * as tareaService from "../services/tareaService";
import type { User } from "./UserTable";
import type { Tarea } from "../services/tareaService";

type Props = {
    usuario: User | null;
    open: boolean;
    onClose: () => void;
};

const TareasDrawer: React.FC<Props> = ({ usuario, open, onClose}) => {
    const [tareasUsuario, setTareasUsuario] = useState<Tarea[]>([]);
    const [nuevaTarea, setNuevaTarea] = useState({ titulo: "", descripcion: ""});
    const [comentarioCompletar, setComentarioCompletar] = useState<{ [id: number]: string }>({});
    const [cargandoTareas, setCargandoTareas] = useState(false);
    const [creando, setCreando] = useState(false);

    //cargar tareas al cambiar usuario o al abrir drawer
    useEffect (()=> {
        if (usuario && open) {
            setCargandoTareas(true);
            tareaService.getTareas(usuario.id)
            .then(setTareasUsuario)
            .finally(() => setCargandoTareas(false));
        } else {
            setTareasUsuario([]);
        }
    }, [usuario, open]);

    //crear una tarea
    const handleCrearTarea = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!nuevaTarea.titulo.trim() || !usuario) return;
        setCreando(true);
        await tareaService.crearTarea({
            titulo: nuevaTarea.titulo,
            descripcion: nuevaTarea.descripcion,
            usuario_id: usuario.id,
            usuario_nombre: usuario.nombre,

        });

        setNuevaTarea( { titulo: "", descripcion: "" });
        const tareas = await tareaService.getTareas(usuario.id);
        setTareasUsuario(tareas);
        setCreando(false);
    };

    //completar tarea
    const handleCompletarTarea = async (tarea: Tarea) => {
        await tareaService.actualizarTarea(tarea.id, {
            completada: true,
            comentario: comentarioCompletar[tarea.id] || "",
        });
        setComentarioCompletar(prev => ({...prev, [tarea.id]: ""}));
        const tareas = await tareaService.getTareas(usuario!.id);
        setTareasUsuario(tareas);
    };

    //Borrar tarea
    const handleBorrarTarea = async (id: number) => {
        await tareaService.borrarTarea(id);
        const tareas = await tareaService.getTareas(usuario!.id);
        setTareasUsuario(tareas);
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{ paper: { sx: {width: 400 }}}}
        >
            <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column"}}>
                <Typography variant="h6" gutterBottom>
                    {usuario ? `Tareas de &{usuario.nombre}` : "Tareas"}
                </Typography>

                {/*Formulario nueva tarea*/}

                {usuario && (
                    <Box component="form" onSubmit={handleCrearTarea} sx= {{ mb: 2}}>
                        <TextField
                            label="Título de la tarea"
                            value={nuevaTarea.titulo}
                            onChange={e => setNuevaTarea({...nuevaTarea, titulo: e.target.value})}
                            fullWidth
                            required
                            sx={{mb: 1}}
                        />
                        <TextField
                            label="Descripción"
                            value={nuevaTarea.descripcion}
                            onChange={e => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})}
                            fullWidth
                            multiline
                            rows={2}
                            sx={{mb:1}}
                        />
                        <Button type="submit" variant="contained" fullWidth disabled={creando}>
                            {creando ? "Asignando..." : "Asignar tarea"}
                        </Button>
                    </Box>
                )}

                <Divider sx={{mb: 2}} />

                <Typography variant="subtitle1" gutterBottom>
                    Lista de tareas asignadas
                </Typography>
                {cargandoTareas ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2}}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <List>
                        {tareasUsuario.length === 0 && (
                            <Typography color="text.secondary" sx={{mt: 2}}>
                                No hay tareas asignadas
                            </Typography>
                        )}
                        {tareasUsuario.map(tarea => (
                            <ListItem
                                key={tarea.id}
                                alignItems="flex-start"
                                secondaryAction= {
                                    <>
                                        {!tarea.completada && (
                                            <>
                                                <TextField
                                                    placeholder="Comentario"
                                                    size="small"
                                                    value={comentarioCompletar[tarea.id] || ""}
                                                    onChange={e => 
                                                        setComentarioCompletar(prev => ({
                                                            ...prev,
                                                            [tarea.id]: e.target.value,
                                                        }))
                                                    }
                                                    sx={{ mr: 1, width: 120 }}
                                                    slotProps={{
                                                        input: {
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <CommentIcon fontSize="small" />
                                                                </InputAdornment>
                                                            ),
                                                        }
                                                    }}
                                                />
                                                <IconButton
                                                    edge="end"
                                                    color="success"
                                                    onClick={()=> handleCompletarTarea(tarea)}
                                                    title="Marcar como completada"
                                                >
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>
                                        )}
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={()=> handleBorrarTarea(tarea.id)}
                                            title="Eliminar tarea"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary={
                                        <span style={tarea.completada ? { textDecoration: "line-through"} : {}}>
                                            {tarea.titulo}
                                        </span>
                                    }

                                    secondary={
                                        <>
                                            {tarea.descripcion && <span>{tarea.descripcion}<br /></span>}
                                            {tarea.completada && (
                                                <span style={{color: "green" }}>
                                                    Completada. Comentario: {tarea.comentario || "Sin comentario"}
                                                </span>
                                            )}
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </Drawer>
    );

};

export default TareasDrawer;