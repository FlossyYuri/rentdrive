import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context";
import SellerIcon from "../../../assets/svgs/seller";
import "./perfil.css";
import { useParams } from "react-router-dom";
import { APIKit } from "../../../services/api";
import { funcoesUsuarioObject } from "../../../constants/dictionary";
import { formatMoney } from "../../../utils";


const Perfil = () => {
  const { usuario: localUser, logout, toast } = useAuth(useAuth);
  let { id } = useParams();
  const [fetchedUsuario, setUsuario] = useState(id ? null : localUser)
  const fetchData = () => {
    APIKit.get(`/usuarios/${id}`)
      .then(response => setUsuario(response.data))
      .catch(() => toast.error("Erro ao Buscar usuários!"))
  }

  const setStatus = () => {
    fetchedUsuario.ativo
      ? APIKit.put(`/usuarios/${fetchedUsuario.id}`, { ativo: 0 })
        .then(() => { toast.success(`Usuário ${fetchedUsuario.nome} desativado!`) })
        .catch(() => { toast.error(`Erro ao desativar o usuário ${fetchedUsuario.nome}!`) })
        .finally(() => fetchData())
      : APIKit.put(`/usuarios/${fetchedUsuario.id}`, { ativo: 1 })
        .then(() => { toast.success(`Usuário ${fetchedUsuario.nome} ativado!`) })
        .catch(() => { toast.error(`Erro ao ativar o usuário ${fetchedUsuario.nome}!`) })
        .finally(() => fetchData())
  }

  useEffect(() => {
    if (id)
      fetchData()
  }, [])

  return (
    <div className="container perfil">
      <div className="profile-card shadow">
        <div className="icon relative">
          <SellerIcon />
          {fetchedUsuario?.ativo ? <div className="enabled-circle" /> : <div className="disabled-circle" />}
        </div>
        <div className="flex-col p-4 profile-main">
          <h3 className="mb-1 blue-text">{fetchedUsuario?.nome} {id ? <span className="badge">{fetchedUsuario?.tipo ? funcoesUsuarioObject[fetchedUsuario?.tipo].label : ""}</span> : ''}</h3>
          <span className="text-opaque">{fetchedUsuario?.funcionario?.email}</span>
          <span className="text-opaque">{fetchedUsuario?.funcionario?.telefone}</span>
        </div>
        <div className="flex-col profile-footer p-4">
          <div className="flex">
            <div className="flex-col w-50">
              <span className="blue-text font-bold ls-1">{fetchedUsuario?.tipo && funcoesUsuarioObject[fetchedUsuario?.tipo].label}</span>
              <span className="text-opaque">Tipo de Usuário</span>
            </div>
            <div className="flex-col w-50">
              <span className="blue-text font-bold ls-1">{formatMoney(fetchedUsuario?.funcionario?.salario)}</span>
              <span className="text-opaque">Salário</span>
            </div>
          </div>
          <div className="flex mt-2">
            {id ? <>
              {fetchedUsuario?.ativo
                ? <button type="button" onClick={setStatus} className="ph-4 pv-1 shadow orange-bg text-white">Desativar conta</button>
                : <button type="button" onClick={setStatus} className="ph-4 pv-1 shadow bg-white">Ativar conta</button>}

            </> : <button type="button" onClick={logout} className="logout ph-4 pv-1 shadow">Terminar sessão</button>}

          </div>
        </div>
      </div>
    </div>
  );
};
export default Perfil;
