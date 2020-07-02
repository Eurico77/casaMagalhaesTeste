import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import heroesImg from "../../assets/Component2.svg";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const res = await api.post("sessions", { id });

      localStorage.setItem("companyId", id);
      localStorage.setItem("companyName", res.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tente novamente. ");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <form onSubmit={handleLogon}>
          <h1>Faça seu login</h1>
          <input
            placeholder="Sua identificação"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
