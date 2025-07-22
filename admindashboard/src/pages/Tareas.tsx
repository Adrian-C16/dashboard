import React from "react";
import { Card, CardContent, Typography, TextField, Box, IconButton, Tooltip, Button } from "@mui/material";
import { Rnd } from "react-rnd";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";


const LOCAL_STORAGE_KEY = "dashboard_postits";
const LOCAL_STORAGE_TODOS_KEY = "dashboard_todolist";

type Todo = {
    id: string;
    text: string;
    completada: boolean;
}

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
    const [postIts, setPostIts] = React.useState<PostIt[]>(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

//Estado y lógica todolist
const [todos, setTodos] = React.useState<Todo[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_TODOS_KEY);
    return saved ? JSON.parse(saved) : [];
});
const [nuevoTodo, setNuevoTodo] = React.useState("");

    //guardamos en localStorage cada vez que cambiamos los post its
    React.useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(postIts));
    }, [postIts]);

    React.useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = () => {
        if (nuevoTodo.trim() === "") return;
        setTodos([
            ...todos,
            {id: Date.now().toString(), text: nuevoTodo, completada: false}
        ]);
        setNuevoTodo("");
    };

    const handleToggleTodo = (id: string) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completada: !todo.completada } : todo
        ));
    };

    const handleDeleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    
    return (
        <Box sx={{ width: "100%", height: "80vh", position: "relative", bgcolor: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Card sx={{ minWidth: 350, maxWidth: 400, p: 2, boxShadow: 6, zIndex: 2}}>
                <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                        Tareas
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        <TextField
                            label="Nueva Tarea"
                            variant="outlined"
                            size="small"
                            value={nuevoTodo}
                            onChange={e => setNuevoTodo(e.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" color="primary" onClick={handleAddTodo}>
                            Añadir
                        </Button>
                    </Box>
                    <Box>
                        {todos.length === 0 ? (
                            <Typography color="text.secondary" align="center">No hay tareas pendientes</Typography>
                        ) : (
                            todos.map(todo => (
                                <Box key = {todo.id} sx={{ display: "flex", alignItems: "center", mb: 1 }} >
                                    <input
                                        type="checkbox"
                                        checked= {todo.completada}
                                        onChange= {() => handleToggleTodo(todo.id)}
                                        style={{marginRight: 8}}
                                    />
                                    <Typography
                                        sx={{ flex: 1, textDecoration: todo.completada ? "line-through" : "none"}}
                                        >
                                            {todo.text}
                                        </Typography>
                                        <IconButton onClick={() => handleDeleteTodo(todo.id)} size="small" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                </Box>
                            ))
                        )}
                    </Box>
                </CardContent>
            </Card>
            
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
                        sx={ {
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
                            <Box sx={{display: "flex", justifyContent:"flex-end", mt: 1 }}>
                                <Tooltip title="Eliminar nota">
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => {
                                            setPostIts(postIts.filter((_, i) => i !== idx));
                                        }}
                                    >
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </CardContent>
                    </Card>
                </Rnd>
            ))}

            <IconButton
                color="primary"
                sx={{ position: "absolute", bottom: 24, right: 24, zIndex: 3, background: "#fff", boxShadow: 2}}
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
    );
};

export default Tareas;