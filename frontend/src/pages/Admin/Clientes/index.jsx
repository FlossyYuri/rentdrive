import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomTable from "../../../components/CustomTable";
import TextInput from "../../../components/input/TextInput";
import Pagination from "../../../components/Pagination";
import { headersClientes } from "../../../constants/dictionary";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
import "./estudante.css";
import CriarVendedor from "./Modal/index";
const Clientes = () => {
  const { toast } = useAuth(useAuth)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clientes, setUsuarios] = useState([])
  const query = useParams();
  const history = useHistory();
  const [filters, setFilters] = useState({
    page: 0,
  })
  const setFilter = (key, value) => {
    const data = { ...filters, [key]: value }
    if (key !== 'page') data.page = 0
    setFilters(data)
  }

  const fetchData = () => {
    APIKit.get('/clientes', {
      params: { ...filters }
    }).then(response => setUsuarios(response.data)).catch((err) => toast.error("Erro ao Buscar clientes!"))
  }

  useEffect(() => {
    fetchData()
  }, [filters])

  useEffect(() => {
    setFilters({ ...query })
  }, [])

  const menuItems = (item) => [
    {
      text: "Ver Detalhes",
      onClick: () => {
        history.push(`/clientes/${item.id}`);
      },
    },
    {
      text: "Apagar",
      onClick: () => {
        toast.promise(APIKit.delete(`/clientes/${item.id}`), {
          loading: 'Apagando!',
          success: () => {
            fetchData()
            return 'Cliente apagado com sucesso!'
          },
          error: 'Ups, ocorreu um erro!',
        });
      },
    },
  ];
  return (
    <div className="container">
      <div className="w-full flex">
        <div className="flex-col flex-1">
          <h2 className="gradient-text">Cliente</h2>
          <p>Veja os clientes correntes.</p>
        </div>
        <div className="flex-col">
          <button className="action-button" onClick={() => setIsModalVisible(true)}>
            Cadastrar Cliente
          </button>
        </div>
      </div>
      <div className="w-full">
        <h3 className="mb-1 mt-4 gradient-text">Filtros</h3>
        <div className="grid-col-4 gap-2">
          <TextInput
            name="nome"
            label="Nome do cliente"
            type="text"
            placeholder="Nome do cliente"
            inputEvent={(data) => setFilter('nome', data)}
          />
          <TextInput
            name="bi"
            label="BI"
            type="text"
            placeholder="BI"
            inputEvent={(data) => setFilter('bi', data)}
          />
        </div>
      </div>
      <CustomTable header={headersClientes} items={clientes?.items} menuItems={menuItems} />
      {(clientes && clientes.totalItems) ?
        <Pagination
          totalPages={clientes.totalPages}
          currentPage={clientes.currentPage}
          totalItems={clientes.totalItems}
          changePage={(id) => setFilter('page', id)}
        />
        : null}
      {isModalVisible ? (
        <CriarVendedor fetchData={fetchData} onClose={() => setIsModalVisible(false)}>
          <h4>Criar</h4>
        </CriarVendedor>
      ) : null}
    </div>
  );
};
export default Clientes;
