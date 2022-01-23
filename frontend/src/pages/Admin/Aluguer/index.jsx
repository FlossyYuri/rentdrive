import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomTable from "../../../components/CustomTable";
import TextInput from "../../../components/input/TextInput";
import Pagination from "../../../components/Pagination";
import { headersAluguer } from "../../../constants/dictionary";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
import Devolucao from "./Devolucao";
import "./estudante.css";
import CriarVendedor from "./Modal/index";
const Aluguer = () => {
  const { toast } = useAuth(useAuth)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalDevolucao, setModalDevolucao] = useState({ visible: false, aluguer: null });
  const [aluguer, setAlugueres] = useState({})
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
    APIKit.get('/alugueres', {
      params: { ...filters }
    }).then(response => setAlugueres(response.data)).catch((err) => toast.error("Erro ao Buscar aluguer!"))
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
        history.push(`/alugueres/${item.id}`);
      },
    },
    {
      text: "Registar Devolução",
      onClick: () => {
        setModalDevolucao({ visible: true, aluguer: item })
      },
    },
  ];
  return (
    <div className="container">
      <div className="w-full flex">
        <div className="flex-col flex-1">
          <h2 className="gradient-text">Aluguer</h2>
          <p>Veja os aluguer correntes.</p>
        </div>
        <div className="flex-col">
          <button className="action-button" onClick={() => setIsModalVisible(true)}>
            Cadastrar Aluguer
          </button>
        </div>
      </div>
      <div className="w-full">
        <h3 className="mb-1 mt-4 gradient-text">Filtros</h3>
        <div className="grid-col-4 gap-2">
          <TextInput
            name="cliente"
            label="Cliente"
            type="text"
            placeholder="Cliente"
            inputEvent={(data) => setFilter('cliente', data)}
          />
          <TextInput
            name="viatura"
            label="Viatura"
            type="text"
            placeholder="Viatura"
            inputEvent={(data) => setFilter('viatura', data)}
          />
          <TextInput
            name="data"
            label="Data"
            type="text"
            placeholder="Data"
            inputEvent={(data) => setFilter('data', data)}
          />
        </div>
      </div>
      <CustomTable header={headersAluguer} items={aluguer?.items} menuItems={menuItems} />
      {(aluguer && aluguer.totalItems) ?
        <Pagination
          totalPages={aluguer.totalPages}
          currentPage={aluguer.currentPage}
          totalItems={aluguer.totalItems}
          changePage={(id) => setFilter('page', id)}
        />
        : null}
      {isModalVisible ? (
        <CriarVendedor fetchData={fetchData} onClose={() => setIsModalVisible(false)} />
      ) : null}
      {modalDevolucao?.visible ? (
        <Devolucao fetchData={fetchData} aluguer={modalDevolucao?.aluguer} onClose={() => setModalDevolucao({ visible: false, aluguer: null })} />
      ) : null}
    </div>
  );
};
export default Aluguer;
