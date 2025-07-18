import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Toolbar, AppBar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';


const drawerWidth = 220;

const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/'},
    { text: 'Usuarios', icon: <PeopleIcon />, path: '/usuarios'},
];

const DashboardLayout: React.FC = () => {
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position='fixed' sx={{zIndex: (theme) => theme.zIndex.drawer +1}}>
                <Toolbar>
                    <Typography variant='h6' noWrap>
                        Dashboard Administrativo
                    </Typography>
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
                <Box sx={{overflow: 'auto'}}>
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
                </Box>
            </Drawer>

            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box> 
    );
};

export default DashboardLayout;