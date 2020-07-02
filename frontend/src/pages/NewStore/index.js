import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const history = useHistory();

  const companyId = localStorage.getItem("companyId");
  const companyName = localStorage.getItem("companyName");

  async function handleNewStore(e) {
    e.preventDefault();

    const data = {
      name,
      description,
    
    };

    try {
      await api.post("stores", data, {
        headers: {
          Authorization: companyId,
        },
      });

      history.push("/profile");
    } catch (err) {
      alert("erro ao cadasatrar o loja, tente novamente ");
    }
  }

  return (
    <div className="new-container">
      <div className="content">
        <section>
          <img src={logoImg}  alt=""/>

          <h1>Cadastrar uma nova loja</h1>
          <p>Olá, {companyName}</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewStore}>
          <input
            placeholder=" Título da loja"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder=" Descrição da loja"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className=" button " type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
