import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Toolbar, AppBar, Typography, IconButton, Menu, MenuItem, TextField, Button, CircularProgress } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import Logout from '@mui/icons-material/Logout';
import { login, logout, getCurrentAdmin } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';

const drawerWidth = 220;

const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/'},
    { text: 'Usuarios', icon: <PeopleIcon />, path: '/usuarios'},
    { text: 'Tareas', icon: <ChecklistOutlinedIcon />, path: 'tareas'},
];

const DashboardLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState('');

//Verificar autenticación al cargar componente
React.useEffect(() => {
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if(token) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Error validando sesión:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            setIsLoggedIn(false);
        } finally {
            setIsLoading(false);
        }
    }

    checkAuth();
 }, []);


    //estado menu login
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');



    const handleLogin = async () => {
        try {
            await login(username, password);
            setIsLoggedIn(true);
            setUsername('');
            setPassword('');
            setError('');
            handleClose();
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Error de autenticación');
        }
    };

    const handleLogout = async () => {
        await logout();
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    if (isLoading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <CircularProgress />
            </Box>
        );
    }


    if(!isLoggedIn) {
        return (
            <Box>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                            AdTechnologies
                        </Typography>
                        <Button
                            color='inherit'
                            onClick={handleMenu}
                            startIcon={<AccountCircle />}
                            id='login-button'
                        >
                            Iniciar Sesión
                        </Button> 
                    </Toolbar>
                </AppBar>
            {anchorEl && (
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    
                >
                    <Box sx={{ p: 2, width: 300 }}>
                        <Typography variant='h6' gutterBottom>Iniciar Sesión</Typography>
                        {error && (
                            <Typography color='error' variant='body2' sx={{ mb: 2}}>
                                {error}
                            </Typography>
                        )}
                        <TextField
                            label='Email'
                            type='email'
                            fullWidth
                            margin='normal'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete='email'
                        />
                        <TextField
                            label='Contraseña'
                            type='password'
                            fullWidth
                            margin='normal'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='current-password'
                        />
                        <Button
                            variant='contained'
                            fullWidth
                            onClick={handleLogin}
                            sx={{ mt: 2}}
                        >
                            Ingresar
                        </Button>
                    </Box>
                </Menu>
            )}

                <WelcomePage />
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position='fixed' sx={{zIndex: (theme) => theme.zIndex.drawer +1}}>
                <Toolbar>
                    <Typography variant='h6' noWrap>
                        Dashboard Administrativo
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='subtitle2' sx={{ mr: 2 }}>
                            {getCurrentAdmin()?.email || 'Usuario'}
                        </Typography>
                        <IconButton
                            size='large'
                            edge="end"
                            color='inherit'
                            onClick={handleMenu}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Cerrar Sesión</ListItemText>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                variant='permanent'
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box'},      
                }}
            >
                <Toolbar />
                    <List>
                        {menuItems.map((item) => (
                            <ListItemButton
                                key={item.text}
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        ))}
                    </List>
                
            </Drawer>

            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    minHeight: "100vh",
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box> 
    );
};

export default DashboardLayout;