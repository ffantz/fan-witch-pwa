import React from "react";
import './../style/Login.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";

import { Navigate } from "react-router-dom";

class Cadastro extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            usuario: '',
            senha: '',
            confirmarSenha: '',
            redirecionar: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange (event, campo) {
        this.setState({ [campo]: event.target.value});
    }

    submit (event) {
        event.preventDefault();
        if (this.state.confirmarSenha !== this.state.senha) {
            alert("As senhas não estão iguais")
            return false
        } else {
            // localStorage.removeItem("usuarios")
            let usuarios = localStorage.getItem("usuarios")

            if (usuarios === null) {
                usuarios = {}
            } else {
                usuarios = JSON.parse(usuarios)
            }

            if (usuarios[this.state.usuario]) {
                alert("Usuário já cadastrado! Escolha um novo")
                return false
            }

            const usuario = {
                usuario: this.state.usuario,
                senha: this.state.senha,
                canais: JSON.stringify([]),
            }

            usuarios[this.state.usuario] = JSON.stringify(usuario)

            localStorage.setItem("usuarios", JSON.stringify(usuarios))
            this.setState({ redirecionar: true });
            alert("Usuário cadastrado com sucesso! Faça login em seguida")
            return true;
        }
    }

    render () {
        if (this.state.redirecionar) {
            return <Navigate to="/login" />
        }

        return (
            <div className="main-container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="d-flex justify-content-center">
                                <img style={{marginRight: '10px' }} src="../assets/img/fanwitch-icone.png" alt="" width="35" height="35" />
                                <span >FanWitch</span>
                            </h3>
                        </div>
                        <div className="card-body">
                            <form id="formularioCadastro" onSubmit={this.submit}>
                                <div className="input-group form-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon style={{ height: "100%" }} icon={faUser} />
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" value={this.state.usuario} onChange={event => this.handleChange(event, "usuario")} placeholder="Usuário" required="required"/>
                                </div>

                                <div className="input-group form-group mb-2">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon style={{ height: "100%" }} icon={faKey} />
                                    </span>
                                    </div>
                                    <input type="password" className="form-control" value={this.state.senha} onChange={event => this.handleChange(event, "senha")} placeholder="Senha" required="required"/>
                                </div>

                                <div className="input-group form-group mb-5">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon style={{ height: "100%" }} icon={faKey} />
                                    </span>
                                    </div>
                                    <input type="password" className="form-control" value={this.state.confirmarSenha} onChange={event => this.handleChange(event, "confirmarSenha")} placeholder="Confirmar senha" required="required"/>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 buttons_login">
                                        <button type="submit" className="btn login_btn">Cadastrar</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Cadastro;