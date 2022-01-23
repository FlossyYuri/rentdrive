import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomTable from "../../../components/CustomTable";
import TextInput from "../../../components/input/TextInput";
import Pagination from "../../../components/Pagination";
import { headersFuncionario } from "../../../constants/dictionary";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
import CriarUsuario from "./CriarUsuario";
import "./estudante.css";
import CriarFuncionario from "./Criar";
const Funcionarios = () => {
  const { toast } = useAuth(useAuth)
  const [modalUser, setModalUser] = useState({ visible: false, funcionario: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [funcionarios, setUsuarios] = useState([])
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
    APIKit.get('/funcionarios', {
      params: { ...filters }
    }).then(response => setUsuarios(response.data)).catch((err) => toast.error("Erro ao Buscar funcionários!"))
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
        history.push(`/funcionarios/${item.id}`);
      },
    },
    {
      text: "Criar Conta",
      onClick: () => {
        setModalUser({ visible: true, funcionario: item })
      },
    },
    {
      text: "Apagar",
      onClick: () => {
        toast.promise(APIKit.delete(`/funcionarios/${item.id}`), {
          loading: 'Apagando!',
          success: () => {
            fetchData()
            return 'Funcionário apagado com sucesso!'
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
          <h2 className="gradient-text">Funcionário</h2>
          <p>Veja os funcionários correntes.</p>
        </div>
        <div className="flex-col">
          <button className="action-button" onClick={() => setIsModalVisible(true)}>
            Cadastrar Funcionário
          </button>
        </div>
      </div>
      <div className="w-full">
        <h3 className="mb-1 mt-4 gradient-text">Filtros</h3>
        <div className="grid-col-4 gap-2">
          <TextInput
            name="nome"
            label="Nome do funcionário"
            type="text"
            placeholder="Nome do funcionário"
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
      <CustomTable header={headersFuncionario} items={funcionarios?.items} menuItems={menuItems} />
      {(funcionarios && funcionarios.totalItems) ?
        <Pagination
          totalPages={funcionarios.totalPages}
          currentPage={funcionarios.currentPage}
          totalItems={funcionarios.totalItems}
          changePage={(id) => setFilter('page', id)}
        />
        : null}
      {isModalVisible ? (
        <CriarFuncionario fetchData={fetchData} onClose={() => setIsModalVisible(false)}>
          <h4>Criar</h4>
        </CriarFuncionario>
      ) : null}
      {modalUser.visible ? (
        <CriarUsuario funcionario={modalUser.funcionario} fetchData={fetchData} onClose={() => setModalUser({ visible: false, funcionario: null })}>
          <h4>Criar</h4>
        </CriarUsuario>
      ) : null}
    </div>
  );
};
export default Funcionarios;
