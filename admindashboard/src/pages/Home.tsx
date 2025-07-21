import React from "react";
import { Typography, Grid , Card, CardContent, CardActionArea, Box, Badge } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";


const cards = [
    {
        title: "Trámites",
        icon: <AssignmentIcon fontSize="large" color="primary"/>,
        description: "Accede a la gestión de trámites administrativos.",
        badge:  5,
        iconColor: "primary.light",
        iconFg: "primary.main"
    },
    {
        title: "Formación",
        icon: <SchoolIcon fontSize="large" color="secondary"/>,
        description: "Consulta y gestiona la formación disponible.",
        badge: 2,
        iconColor: "secondary.light",
        iconFg: "secondary.main"
    },
    {
        title: "Otros",
        icon: <MoreHorizIcon fontSize="large" color="action" />,
        description: "Accede a otras utilidades y recursos.",
        badge: 0,
        iconColor: "grey.200",
        iconFg: "grey.700"
    }
];

const Home: React.FC = () => (
    <div>
        <Typography variant="h4" gutterBottom>
            Bienvenido a tu Area Personal
        </Typography>
        <Typography gutterBottom>
            Selecciona la opción que necesites:
        </Typography>
        <Grid 
            columns={12}
            columnSpacing={3}
            rowSpacing={3}
            sx={{ mt:2, display: "grid", gridTemplateColumns: {xs: "1fr", md: "repeat(3, 1fr)"}, 
                gap: 2}}
            >
            {cards.map((card) => (
                <div key={card.title} style={{ height: "100%" }}>                
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                            transition: "transform 0.15s, box-shadow 0.15s",
                            "&:hover" : {
                                transform: "translateY(-4px) scale(1.03)",
                                boxShadow: 8
                            }
                        }}
                    >
                        <CardActionArea sx={{height: "100%"}}>
                            <CardContent sx={{ 
                                textAlign: "center",
                                minHeight:180,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 3,
                                backgroundColor: "background.paper" 
                                }}
                            >
                                <Badge
                                    badgeContent={card.badge > 0 ? card.badge : undefined}
                                    color="error"
                                    sx={{mb:2}}
                                    >
                                <Box sx={{ 
                                    mb: 2, 
                                    display: "flex", 
                                    justifyContent: "center", 
                                    alignItems: "center", 
                                    Height: 56, 
                                    width: 56, 
                                    borderRadius: "50%",
                                    backgroundColor: card.iconColor,
                                    color: card.iconFg,
                                    }}
                                >
                                {card.icon}
                                </Box>
                                </Badge>
                                <Typography variant="h6" sx={{ mt: 1}}>
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            ))}
        </Grid>
    </div>
);

export default Home;