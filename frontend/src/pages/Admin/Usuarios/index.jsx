import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomTable from "../../../components/CustomTable";
import TextInput from "../../../components/input/TextInput";
import Pagination from "../../../components/Pagination";
import { headersUsuario } from "../../../constants/dictionary";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
import EditarUsuario from "./edit";
import "./estudante.css";
const Usuarios = () => {
  const { toast } = useAuth(useAuth)
  const [usuarios, setUsuarios] = useState([])
  const [modalEditar, setModalEditar] = useState({ visible: false, item: null });
  const query = useParams();
  const [filters, setFilters] = useState({
    page: 0,
  })
  const setFilter = (key, value) => {
    const data = { ...filters, [key]: value }
    if (key !== 'page') data.page = 0
    setFilters(data)
  }

  const fetchData = () => {
    APIKit.get('/usuarios', {
      params: { ...filters }
    }).then(response => setUsuarios(response.data)).catch((err) => toast.error("Erro ao Buscar usuários!"))
  }

  useEffect(() => {
    fetchData()
  }, [filters])

  useEffect(() => {
    setFilters({ ...query })
  }, [])

  const menuItems = (item) => [
    {
      text: "Editar",
      onClick: () => {
        setModalEditar({ visible: true, item })
      },
    },
    {
      text: "Apagar",
      onClick: () => {
        toast.promise(APIKit.delete(`/usuarios/${item.id}`), {
          loading: 'Apagando!',
          success: () => {
            fetchData()
            return 'Usuário apagado com sucesso!'
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
          <h2 className="gradient-text">Usuário</h2>
          <p>Veja os usuários correntes.</p>
        </div>
      </div>
      <div className="w-full">
        <h3 className="mb-1 mt-4 gradient-text">Filtros</h3>
        <div className="grid-col-4 gap-2">
          <TextInput
            name="nome"
            label="Nome do usuário"
            type="text"
            placeholder="Nome do usuário"
            inputEvent={(data) => setFilter('nome', data)}
          />
        </div>
      </div>
      <CustomTable header={headersUsuario} items={usuarios?.items} menuItems={menuItems} />
      {(usuarios && usuarios.totalItems) ?
        <Pagination
          totalPages={usuarios.totalPages}
          currentPage={usuarios.currentPage}
          totalItems={usuarios.totalItems}
          changePage={(id) => setFilter('page', id)}
        />
        : null}

      {modalEditar.visible ? (
        <EditarUsuario item={modalEditar.item} fetchData={fetchData} onClose={() => setModalEditar({ visible: false, item: null })} />
      ) : null}
    </div>
  );
};
export default Usuarios;
