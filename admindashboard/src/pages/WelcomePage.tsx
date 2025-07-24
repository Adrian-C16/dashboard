import React from 'react';
import { Box, Typography, Container, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Grid from '@mui/material/Grid';

const FeatureCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8],
    },
}));

const WelcomePage: React.FC = () => {
    const theme = useTheme();

    const features = [
        {
            icon: <DashboardIcon color='primary' sx={{ fontSize: 50, mb: 2 }} />,
            title: 'Panel de Control',
            description: 'Accede a todas las herramientas de administración en un solo lugar.'
        },
        {
            icon: <SecurityIcon color='primary' sx={{ fontSize: 50, mb: 2 }} />,
            title: 'Seguridad Garantizada',
            description: 'Protegemos tus datos con los más altos estándares de seguridad.'
        },
        {
            icon: <CodeIcon color='primary' sx={{ fontSize: 50, mb: 2 }} />,
            title: 'Tecnología Avanzada',
            description: 'Utilizamos las últimas tecnologías para ofrecerte el mejor rendimiento.'
        }
    ];

    return (
        <Box 
            sx={{
                minHeight: '100vh',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'white',
                pt: 15,
                pb: 10,
            }}
        >
            <Container maxWidth='lg'>
                <Box textAlign='center' mb={8}>
                    <Typography
                        variant='h2'
                        component='h1'
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                            mb: 3
                        }}
                    >
                        Bienvenido a AdTechologies
                    </Typography>
                    <Typography
                        variant='h5'
                        component='h2'
                        sx={{
                            maxWidth: 700,
                            mx: 'auto',
                            mb: 4,
                            opacity: 0.9
                        }}
                    >
                        La plataforma tecnológica más avanzada del mercado.
                    </Typography>
                </Box>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <FeatureCard elevation={4}>
                                {feature.icon}
                                <Typography variant='h5' component='h3' gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant='body1' color='text.secondary'>
                                    {feature.description}
                                </Typography>
                            </FeatureCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default WelcomePage;