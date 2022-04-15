import React from "react";

import Cadastro from "./componentes/Cadastro";
import CadastroCanal from "./componentes/CadastroCanal";
import Home from "./componentes/Home";
import Login from "./componentes/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="cadastro-canal" element={<CadastroCanal />} />
        </Routes>
      </BrowserRouter>,
    </div>
  );
};

export default App;
