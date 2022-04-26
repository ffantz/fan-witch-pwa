import React from "react";
import './../style/Login.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faGooglePlusSquare, faTwitch, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

import { Navigate } from "react-router-dom";

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            usuario: '',
            senha: '',
            logado: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    // Manipulações de campos do formulário
    handleChange (event, campo) {
        this.setState({ [campo]: event.target.value});
    }

    // Define os dados do canal cadastrado pelo usuário em local storage, bem como sua tratativa dos dados pré-existentes
    submit (event) {
        event.preventDefault();
        const usuarios = JSON.parse(localStorage.getItem("usuarios"));

        if (!usuarios || Object.keys(usuarios).length === 0) {
            alert("Usuário não cadastrado! Cadastre-o seu agora")
            return false
        }

        if (!usuarios[this.state.usuario]) {
            alert("Usuário não cadastrado! Cadastre-o seu agora")
            return false
        }

        if (JSON.parse(usuarios[this.state.usuario]).senha !== this.state.senha) {
            alert("Senha incorreta")
            return false
        }

        this.setState({ logado: true });
        localStorage.setItem("usuario", this.state.usuario );
        localStorage.setItem("canais", JSON.parse(usuarios[this.state.usuario]).canais );
        localStorage.setItem("logado", 1 );
        return true
    }

    render () {
        // Valida login e redireciona para a página de autenticação caso não exista
        if (this.state.logado) {
            return <Navigate to="/" />
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
                            <form id="formularioLogin" onSubmit={this.submit}>
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

                                <div className="row align-items-center remember mb-5">
                                    <input type="checkbox"/>Salvar senha
                                </div>

                                <div className="row">
                                    <div className="col-md-12 buttons_login">
                                        <button type="submit" className="btn login_btn">Entrar</button>
                                    </div>

                                    <div className="col-md-12 buttons_login mt-2">
                                        <div className="social_icon">
                                            <span>
                                                <FontAwesomeIcon icon={faTwitch} />
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faFacebookSquare} />
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faGooglePlusSquare} />
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faTwitterSquare} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Não possui conta? <a href="/cadastro">Cadastre-se</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Login;
