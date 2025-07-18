import React from "react";
import { Typography } from "@mui/material";

const Home: React.FC = () => (
    <div>
        <Typography variant="h4" gutterBottom>
            Bienvenido al Dashboard
        </Typography>
        <Typography>
            Seleciona una opción del menú para comenzar.
        </Typography>
    </div>
);

export default Home;