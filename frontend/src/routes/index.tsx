import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Index";
import FilmesPage  from "../pages/Filmes/Index";
import { SalasPage } from "../pages/Salas/Index";
import  {SessoesPage}  from "../pages/Sessoes";
import { VendaIngressoPage } from "../pages/VendaIngresso";
import  {LanchesPage}  from "../pages/Lanches";
import { IngressosPage } from "../pages/Ingressos";
import { PedidosPage } from "../pages/Pedidos/Index";

export const AppRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/filmes" element={<FilmesPage />} />
      <Route path="/salas" element={<SalasPage />} />
      <Route path="/sessoes" element={<SessoesPage />} />
      <Route path="/venda-ingresso/:sessaoId" element={<VendaIngressoPage />} />
      <Route path="/ingressos" element={<IngressosPage />} />
      <Route path="/lanches" element={<LanchesPage />} />
      <Route path="/pedidos" element={<PedidosPage />} />
    </Routes>
  );
};