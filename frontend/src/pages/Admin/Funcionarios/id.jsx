
import React from "react";
import {
  FaRegBuilding, FiExternalLink, HiOutlineMail, IoCallSharp
} from "react-icons/all";
import { useParams } from "react-router-dom";
import UserIcon from "../../../assets/svgs/user";
import ReservaJaCard from "../../../components/ReservaJaCard";
import { useAuth } from "../../../context";
import './id.css';

const View = () => {
  const { toast } = useAuth(useAuth);
  let { id } = useParams();

  const confirmAction = (callback, text) => {
    toast((t) => (
      <span className="flex items-center">
        {text}
        <button className="ph-2 pv-1 blue-bg text-white ml-1" onClick={() => { callback(); toast.dismiss(t.id) }}>
          Confirmar
        </button>
      </span>
    ));
  }
  return (
    <div className="container">
      <div className="w-full mb-4">
        <h2 className="gradient-text">Dados do Funcionário X</h2>
        <p>Abaixo estão listados os dados do Funcionário.</p>
      </div>
      <div className="grid-col-2 gap-4 w-full mb-4">
        <div className="flex-col gap-4">
          <div className="details-card">
            <div className="flex gap-2 items-center">
              <div className="company-img">
                <UserIcon />
              </div>
              <div className="flex-col flex-1">
                <h3 className="flex items-center"><span className="mr-1">Emerson</span></h3>
                <p className="mb-1 gradient-text">Alguma</p>
                <p>Coisa</p>
              </div>
            </div>
            <span className="seller-badge">Funcao</span>
          </div>

        </div>
      </div>

    </div >
  );
};
export default View;
