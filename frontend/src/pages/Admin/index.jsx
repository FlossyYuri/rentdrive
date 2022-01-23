import React from "react";
import { FiHome, FiLayers, FiPower, FiUsers, MdKeyboardArrowRight } from "react-icons/all";
import { FiUser } from "react-icons/fi";
import {
  Link,
  NavLink,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Logo from "../../assets/svgs/rent.svg";
import UserIcon from "../../assets/svgs/user";
import { funcoesUsuarioObject } from "../../constants/dictionary";
import { useAuth } from "../../context";
import Dashboard from "../Dashboard";
import Viaturas from "./Viaturas";
import EditEmpresa from "../Empresa/edit";
import VerEmpresa from "../Empresa/id";
import Perfil from "../Usuario/Perfil";
import Clientes from "./Clientes";
import Funcionarios from "./Funcionarios";
import "./layout.css";
import Usuarios from "./Usuarios";
import Aluguer from "./Aluguer";


const Admin = () => {
  const { logout, usuario } = useAuth(useAuth);
  return (
    <div className="container-admin">
      <aside>
        <div className="aside_1">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="aside_2">
          <NavLink
            to="/dashboard"
          >
            <div className="flex"><FiHome /> Relatório <MdKeyboardArrowRight size={24} className="self-end" /></div>
          </NavLink>
          <NavLink

            to="/aluguer"
          >
            <div className="flex"><FiLayers /> Aluguer <MdKeyboardArrowRight size={24} className="self-end" /></div>
          </NavLink>
          <NavLink

            to="/clientes"
          >
            <div className="flex"><FiLayers /> Clientes <MdKeyboardArrowRight size={24} className="self-end" /></div>
          </NavLink>
          <NavLink

            to="/viaturas"
          >
            <div className="flex"><FiLayers /> Viaturas <MdKeyboardArrowRight size={24} className="self-end" /></div>
          </NavLink>

          <NavLink

            to="/usuarios"
          >
            <div className="flex"><FiUsers /> Usuários <MdKeyboardArrowRight size={24} className="self-end" /></div>
          </NavLink>

          <NavLink

            to="/funcionarios"
          >
            <div className="flex"><FiUsers /> Funcionários <MdKeyboardArrowRight size={24} className="self-end" /></div>
          </NavLink>=
        </div>
      </aside>
      <header className="navbar-admin">
        <div className="profile">
          <div className="flex-col mr-2">
            <span className="font-bold">{usuario.nome}</span>
            <span className="gradient-text text-sm">{funcoesUsuarioObject[usuario.funcao]?.label}</span>
          </div>
          <div className="dropdown">
            <div className="user-logo">
              <UserIcon size={16} />
            </div>
            <div className="dropdown-content">
              <Link to="/perfil">
                <FiUser size={16} /> Meu Perfil
              </Link>
              <button type="button" className="flex items-center" onClick={logout}>
                <FiPower size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="main-admin ph-4">
        <Switch>
          <Route exact path="/clientes/edit/:id">
            <EditEmpresa />
          </Route>
          <Route path="/clientes/:id">
            <VerEmpresa />
          </Route>
          <Route exact path="/clientes">
            <Clientes />
          </Route>
          <Route exact path="/aluguer">
            <Aluguer />
          </Route>
          <Route exact path="/viaturas">
            <Viaturas />
          </Route>
          <Route exact path="/usuarios">
            <Usuarios />
          </Route>
          <Route exact path="/funcionarios">
            <Funcionarios />
          </Route>
          <Route exact path="/usuarios/:id">
            <Perfil />
          </Route>
          <Route exact path="/perfil">
            <Perfil />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </main>
    </div>
  );
};
export default Admin;
