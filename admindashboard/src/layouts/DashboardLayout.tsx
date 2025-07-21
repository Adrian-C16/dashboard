import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Toolbar, AppBar, Typography, IconButton, Menu, TextField, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircle from "@mui/icons-material/AccountCircle";


const drawerWidth = 220;

const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/'},
    { text: 'Usuarios', icon: <PeopleIcon />, path: '/usuarios'},
];

const DashboardLayout: React.FC = () => {
    const location = useLocation();

    //estado menu login
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogin = () => {
        //lógica de autenticación
        handleClose();
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position='fixed' sx={{zIndex: (theme) => theme.zIndex.drawer +1}}>
                <Toolbar>
                    <Typography variant='h6' noWrap>
                        Dashboard Administrativo
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        size='large'
                        edge="end"
                        color='inherit'
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <Box
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                p: 2,
                                minWidth: 250,
                                gap: 2,
                            }}
                            onSubmit={e => {e.preventDefault(); handleLogin(); }}
                        >
                            <TextField
                                label="Usuario"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                size="small"
                                autoFocus
                            />
                            <TextField
                                label="Contraseña"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                size="small"
                            />
                            <Button variant='contained' type='submit' fullWidth>
                                Entrar
                            </Button>
                        </Box>
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