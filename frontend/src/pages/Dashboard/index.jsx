import React, { useEffect, useState } from "react";
import {
  BsCheckCircle, FaMoneyBillWave, MdBusinessCenter, RiTestTubeLine
} from "react-icons/all";
import { useParams } from "react-router-dom";
import Dropdown from "../../components/input/Dropdown";
import TextInput from "../../components/input/TextInput";
import { pacotesEmpresa, tiposEmpresa } from "../../constants/dictionary";
import { useAuth } from "../../context";
import { APIKit } from "../../services/api";
import { formatMoney, itemPlusTodos } from "../../utils";
import "./dashboard.css";

const Dashboard = () => {
  const { toast } = useAuth(useAuth);
  const [dashboard, setdashboard] = useState(null)
  const query = useParams();
  const [filters, setFilters] = useState({
    nome: '',
    tipo: '',
    pacote: '',
    page: 0,
  })
  const setFilter = (key, value) => {
    const data = { ...filters, [key]: value }
    if (key !== 'page') data.page = 0
    setFilters(data)
  }

  const fetchData = () => {
    APIKit.get('/dashboard', {
      params: { ...filters }
    }).then(response => setdashboard(response.data)).catch(() => toast.error("Erro ao Buscar dados da estatísticas!"))
  }

  useEffect(() => {
    fetchData()
  }, [filters])

  useEffect(() => {
    setFilters({ ...query })
  }, [])


  return (
    <div className="container">
      <div className="w-full">
        <h2 className="gradient-text">Relatório Estatístico</h2>
        <p>Veja o desempenho da empresa.</p>
      </div>

      <div className="dashboard-card-group w-full">
        <div className="dashboard-analise-card">
          <div className="dashboard-icon">
            <BsCheckCircle color="white" size={18} />
          </div>
          <div className="dashboard-detail">
            <h2>{dashboard?.aluguers || 0}</h2>
            <p>Total de Alugueres</p>
          </div>
        </div>
        <div className="dashboard-analise-card">
          <div className="dashboard-icon">
            <RiTestTubeLine color="white" size={18} />
          </div>
          <div className="dashboard-detail">
            <h2>{dashboard?.clientes || 0}</h2>
            <p>Total de clientes</p>
          </div>
        </div>
        <div className="dashboard-analise-card">
          <div className="dashboard-icon">
            <MdBusinessCenter color="white" size={18} />
          </div>
          <div className="dashboard-detail">
            <h2>{dashboard?.viaturas || 0}</h2>
            <p>Total de Viaturas</p>
          </div>
        </div>
        <div className="dashboard-analise-card">
          <div className="dashboard-icon">
            <FaMoneyBillWave color="white" size={18} />
          </div>
          <div className="dashboard-detail">
            <h2 className="text-base">{formatMoney(dashboard?.receita) || 0}</h2>
            <p>Receita do último mês</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
