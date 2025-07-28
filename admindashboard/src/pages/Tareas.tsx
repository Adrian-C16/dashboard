import React, { useEffect, useState } from "react";
import {
    Box, Card, CardContent, Typography, TextField,
    IconButton, Tooltip, Button, CircularProgress,
    Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import { Rnd } from "react-rnd";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    getTareas, crearTarea, actualizarTarea, borrarTarea 
} from "../services/tareaService";
import { getCurrentAdmin } from "../services/authService";
import type {Tarea as TareaBackend} from "../services/tareaService";


const LOCAL_STORAGE_KEY = "dashboard_postits";

type PostIt = {
    id: string;
    content: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

const defaultSize = { width: 250, height: 180 };

const Tareas: React.FC = () => {
    // POST-ITS (local)
    const [postIts, setPostIts] = useState<PostIt[]>(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(postIts));
    }, [postIts]);

    // TAREAS (backend)
    const [tareas, setTareas] = useState<TareaBackend[]>([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const usuarioActual = getCurrentAdmin();

    useEffect(() => {
        const cargarTareas = async () => {
            setCargando(true);
            setError('');
            try {
                if (usuarioActual?.id) {
                    const tareasUsuario = await getTareas(usuarioActual.id);
                    setTareas(tareasUsuario);
                }
            } catch (error) {
                setError('Error al cargar las tareas');
            } finally {
                setCargando(false);
            }
        };
        cargarTareas();
    }, [usuarioActual?.id]);

    const handleAgregarTarea = async () => {
        if (!nuevaTarea.trim() || !usuarioActual) return;
        setError('');
        try {
            const tarea = await crearTarea({
                titulo: nuevaTarea.trim(),
                descripcion: '',
                usuario_id: usuarioActual.id,
                usuario_nombre: usuarioActual.name || 'Usuario',
                
            });
            setTareas(prev => [...prev, tarea]);
            setNuevaTarea('');
        } catch (error) {
            setError('Error al crear la tarea');
        }
    };

    const handleToggleCompletada = async (id: number) => {
        try {
            const tarea = tareas.find(t => t.id === id);
            if (!tarea) return;
            const tareaActualizada = await actualizarTarea(id, {
                completada: !tarea.completada
            });
            setTareas(tareas.map(t => t.id === id ? tareaActualizada : t));
        } catch (error) {
            setError('Error al actualizar la tarea');
        }
    };

    const handleEliminarTarea = async (id: number) => {
        try {
            await borrarTarea(id);
            setTareas(tareas.filter(t => t.id !== id));
        } catch (error) {
            setError('Error al eliminar la tarea');
        }
    };

    // Acordeón expandido por defecto
    const [expanded, setExpanded] = useState<string | false>("tareas");

    const handleAccordionChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Box sx={{ width: "100%", minHeight: "80vh", position: "relative", bgcolor: "#fafafa", p: 3 }}>
            {/* ACCORDION Tareas backend */}
            <Accordion expanded={expanded === "tareas"} onChange={handleAccordionChange("tareas")}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Tareas del usuario</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Card sx={{ minWidth: 350, maxWidth: 500, margin: "0 auto", boxShadow: 2 }}>
                        <CardContent>
                            {error && (
                                <Typography color="error" gutterBottom>
                                    {error}
                                </Typography>
                            )}
                            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                                <TextField
                                    label="Nueva tarea"
                                    variant="outlined"
                                    size="small"
                                    value={nuevaTarea}
                                    onChange={e => setNuevaTarea(e.target.value)}
                                    fullWidth
                                    onKeyDown={e => e.key === "Enter" && handleAgregarTarea()}
                                />
                                <Button variant="contained" color="primary" onClick={handleAgregarTarea}>
                                    Añadir
                                </Button>
                            </Box>
                            {cargando ? (
                                <Box display="flex" justifyContent="center" p={2}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <Box>
                                    {tareas.length === 0 ? (
                                        <Typography color="text.secondary" align="center">No hay tareas</Typography>
                                    ) : (
                                        tareas.map(tarea => (
                                            <Box key={tarea.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                <input
                                                    type="checkbox"
                                                    checked={tarea.completada}
                                                    onChange={() => handleToggleCompletada(tarea.id)}
                                                    style={{ marginRight: 8 }}
                                                />
                                                <Typography
                                                    sx={{
                                                        flex: 1,
                                                        textDecoration: tarea.completada ? "line-through" : "none"
                                                    }}>
                                                    {tarea.titulo}
                                                </Typography>
                                                <IconButton
                                                    onClick={() => handleEliminarTarea(tarea.id)}
                                                    size="small"
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        ))
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </AccordionDetails>
            </Accordion>

            {/* ACCORDION Post-its locales */}
            <Accordion expanded={expanded === "postits"} onChange={handleAccordionChange("postits")}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Post-its rápidos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ width: "100%", minHeight: 300, position: "relative" }}>
                        {postIts.map((postIt, idx) => (
                            <Rnd
                                key={postIt.id}
                                default={{
                                    x: postIt.x ?? 100 + idx * 20,
                                    y: postIt.y ?? 100 + idx * 20,
                                    width: postIt.width ?? defaultSize.width,
                                    height: postIt.height ?? defaultSize.height
                                }}
                                bounds="parent"
                                style={{ position: "absolute", zIndex: 1 }}
                            >
                                <Card
                                    sx={{
                                        bgcolor: "#fffde7",
                                        border: "1px solid #ffe082",
                                        boxShadow: 3,
                                        borderRadius: 2,
                                    }}
                                >
                                    <CardContent>
                                        <TextField
                                            multiline
                                            fullWidth
                                            value={postIt.content}
                                            onChange={e => {
                                                const nuevos = [...postIts];
                                                nuevos[idx].content = e.target.value;
                                                setPostIts(nuevos);
                                            }}
                                            variant="standard"
                                            sx={{ background: "transparent" }}
                                        />
                                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                                            <Tooltip title="Eliminar nota">
                                                <IconButton
                                                    color="error"
                                                    size="small"
                                                    onClick={() => {
                                                        setPostIts(postIts.filter((_, i) => i !== idx));
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Rnd>
                        ))}

                        <IconButton
                            color="primary"
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                right: 16,
                                zIndex: 3,
                                background: "#fff",
                                boxShadow: 2
                            }}
                            onClick={() => {
                                setPostIts([
                                    ...postIts,
                                    {
                                        id: Date.now().toString(),
                                        content: "",
                                        x: 200,
                                        y: 200,
                                        width: defaultSize.width,
                                        height: defaultSize.height
                                    }
                                ]);
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default Tareas;