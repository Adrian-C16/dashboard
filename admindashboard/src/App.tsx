import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";


const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element= {<DashboardLayout />}>
        <Route index element= {<Home />} />
        <Route path="usuarios" element={<Usuarios />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;