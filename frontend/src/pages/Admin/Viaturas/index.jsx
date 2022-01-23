import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomTable from "../../../components/CustomTable";
import TextInput from "../../../components/input/TextInput";
import Pagination from "../../../components/Pagination";
import { headersViaturas } from "../../../constants/dictionary";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
import "./estudante.css";
import CriarVendedor from "./Modal/index";
const Viaturas = () => {
  const { toast } = useAuth(useAuth)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viaturas, setUsuarios] = useState([])
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
    APIKit.get('/viaturas', {
      params: { ...filters }
    }).then(response => setUsuarios(response.data)).catch((err) => toast.error("Erro ao Buscar viaturas!"))
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
        history.push(`/viaturas/${item.id}`);
      },
    },
    {
      text: "Apagar",
      onClick: () => {
        toast.promise(APIKit.delete(`/viaturas/${item.id}`), {
          loading: 'Apagando!',
          success: () => {
            fetchData()
            return 'Viatura apagada com sucesso!'
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
          <h2 className="gradient-text">Viatura</h2>
          <p>Veja os viaturas correntes.</p>
        </div>
        <div className="flex-col">
          <button className="action-button" onClick={() => setIsModalVisible(true)}>
            Cadastrar Viatura
          </button>
        </div>
      </div>
      <div className="w-full">
        <h3 className="mb-1 mt-4 gradient-text">Filtros</h3>
        <div className="grid-col-4 gap-2">
          <TextInput
            name="viatura"
            label="Descrição da Viatura"
            type="text"
            placeholder="Toyota Passo"
            inputEvent={(data) => setFilter('viatura', data)}
          />
          <TextInput
            name="precoDia"
            label="Preço mínimo"
            type="text"
            placeholder="Preço mínimo"
            inputEvent={(data) => setFilter('precoDia', data)}
          />
        </div>
      </div>
      <CustomTable header={headersViaturas} items={viaturas?.items} menuItems={menuItems} />
      {(viaturas && viaturas.totalItems) ?
        <Pagination
          totalPages={viaturas.totalPages}
          currentPage={viaturas.currentPage}
          totalItems={viaturas.totalItems}
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
export default Viaturas;
