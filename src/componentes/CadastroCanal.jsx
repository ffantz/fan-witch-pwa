import React from "react";
import './../style/Home.css';

import NavBar from "./NavBar";

import { Navigate, Link } from "react-router-dom";

class CadastroCanal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            nomeCanal: '',
            live: '',
            raid: '',
            votacao: '',
            cadastrado: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange (event, campo) {
        this.setState({ [campo]: event.target.value});
    }

    toggleChange (event, campo) {
        this.setState({ [campo]: event.target.checked});
    }

    submit (event) {
        event.preventDefault();

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        const usuario = localStorage.getItem("usuario");

        let canais = JSON.parse(usuarios[usuario]).canais
        canais = canais === "[]" ? [] : JSON.parse(canais)

        canais.push(JSON.stringify(this.state))

        let userStorage = JSON.parse(usuarios[usuario])
        userStorage.canais = JSON.stringify(canais)
        usuarios[usuario] = JSON.stringify(userStorage)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        localStorage.setItem("canais", JSON.stringify(canais))

        this.setState({ cadastrado: true });
        return false
    }

    render () {
        let logado = JSON.parse(localStorage.getItem("logado"));
        if (!logado) {
            return <Navigate to="/login" />
        }

        if (this.state.cadastrado) {
            return <Navigate to="/" />
        }

        return (
            <div className="main-container">
                <NavBar />

                <main role="main" className="container cadastro-canal">
                    <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm">

                        <div className="lh-100">
                            <h6 className="mb-0 text-white lh-100">Novo canal</h6>
                        </div>
                    </div>

                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                        <form className="row" id="formularioCanal" autoComplete="off" onSubmit={this.submit}>
                            <input type="hidden" id="item-canal" name="item-canal" />
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <label htmlFor="canal" className="form-label">Canal</label>
                                    <input type="text" className="form-control" value={this.state.nomeCanal} onChange={event => this.handleChange(event, "nomeCanal")} id="canal" name="canal" placeholder="Nome canal" required/ >
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="notificacao" className="form-label">Notificações</label>
                                    <div className="form-check">
                                        <input className="form-check-input" value={this.state.live} onChange={event => this.toggleChange(event, "live")} name="live" type="checkbox" id="live" />
                                        <label className="form-check-label" htmlFor="liveOn">Live on</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" value={this.state.raid} onChange={event => this.toggleChange(event, "raid")} name="raid" type="checkbox" id="raid" />
                                        <label className="form-check-label" htmlFor="Raid">Raid</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" value={this.state.votacao} onChange={event => this.toggleChange(event, "votacao")} name="votacao" type="checkbox" id="votacao" />
                                        <label className="form-check-label" htmlFor="votacao">Votação</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 text-right mt-3">
                                <Link to="/" style={{ marginRight: "10px" }}>
                                    <button type="button" className="btn btn-sm btn-info voltar-menu">Cancelar</button>
                                </Link>

                                <button type="submit" className="btn btn-sm btn btn-warning adicionar-canal-fan-witch"> Salvar canal </button>
                            </div>

                        </form>
                    </div>
                </main>
            </div>
        );
    };
};

export default CadastroCanal;