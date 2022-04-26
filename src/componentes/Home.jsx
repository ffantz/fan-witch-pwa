import React from "react";
import './../style/Home.css';

import NavBar from "./NavBar";

import { Navigate, Link } from "react-router-dom";

class Home extends React.Component {
    constructor (props) {
        super(props);

        // Define o state padrão
        this.state = {
            logado: true,
            canais: JSON.parse(localStorage.getItem("canais")) !== null ? JSON.parse(localStorage.getItem("canais")) : []
        };

        // @TODO
        // this.editarCanal = this.editarCanal.bind(this);
        this.removerCanal = this.removerCanal.bind(this);
    }

    //  @TODO
    // editarCanal (event, index) {
    //     localStorage.setItem("indexEdicao", index)
    //     return <Navigate to="/cadastro-canal" />
    // }

    // Remove o canal do indice específico na listagem
    removerCanal (event, index) {
        this.state.canais.splice(index, 1)

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        const usuario = localStorage.getItem("usuario");

        let userStorage = JSON.parse(usuarios[usuario])
        userStorage.canais = JSON.stringify(this.state.canais)
        usuarios[usuario] = JSON.stringify(userStorage)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        localStorage.setItem("canais", JSON.stringify(this.state.canais))

        // Re-render
        this.forceUpdate();
    }

    render () {
        // Valida login e redireciona para a página de autenticação caso não exista
        let logado = JSON.parse(localStorage.getItem("logado"));
        if (!logado || !this.state.logado) {
            return <Navigate to="/login" />
        }

        return (
            <div className="main-container">
                <NavBar />

                <main role="main" className="container home">
                    <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm">
                        <div className="lh-100">
                            <h6 className="mb-0 text-white lh-100">Meus Canais</h6>
                        </div>
                    </div>

                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                        <div className="meus-canais">
                            {/* Div mostrada caso não existam canais cadastrados pelo usuário */}
                            { this.state.canais.length === 0 &&
                                <div className="media text-muted pt-3  border-bottom border-gray pb-2">
                                    <div className="alert alert-warning" role="alert" style={{width: "100%"}}>
                                        Nenhum canal seguido
                                    </div>
                                </div>
                            }

                            {/* Loop renderizando canais cadastrados pelo usuário */}
                            { this.state.canais.map((item, index) => {
                                item = JSON.parse(item)
                                return <div className="media text-muted pt-3 border-bottom border-gray pb-2" key={index}>
                                    <div className="row">
                                        <img src="./assets/img/icone.svg" alt="" className="mr-2 rounded col-md-1 col-sm-1" />
                                        <div className="media-body mb-0 small lh-125 col-md-9 col-sm-9">
                                            <div className="d-flex align-items-center w-100">
                                                Canal:<strong className="text-gray-dark" style={{ marginLeft: "10px" }}>{item.nomeCanal}</strong>
                                            </div>
                                            Notificações:
                                            <ul>
                                                { item.live ? <li>Live On</li> : '' }
                                                { item.raid ? <li>Raid</li> : '' }
                                                { item.votacao ? <li>Votação</li> : '' }
                                            </ul>
                                        </div>
                                        <div className="action-canal col-md-2 col-sm-2">
                                            <button className="btn btn-sm btn-link btn-remover-canal" onClick={(e) => this.removerCanal(e, index)}>Remover</button>
                                        </div>
                                    </div>
                                </div>
                            }) }

                            <div>


                            </div>
                        </div>

                        <div className="row pt-3">
                            <div className="col-md-12 text-right">
                                <Link to="/cadastro-canal">
                                    <button type="button" className="btn btn-sm btn-warning seguir-canal"> Seguir novo canal</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                        <h6 className="border-bottom border-gray pb-2 mb-0">Atualizações recentes FanWitch</h6>
                        <div className="media text-muted pt-3">
                            <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" className="mr-2 rounded" />
                            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                <strong className="d-block text-gray-dark">@Canal FanWitch</strong>
                                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                                mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                            </p>
                        </div>
                        <div className="media text-muted pt-3">
                            <img data-src="holder.js/32x32?theme=thumb&bg=e83e8c&fg=e83e8c&size=1" alt="" className="mr-2 rounded" />
                            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                <strong className="d-block text-gray-dark">@Canal Twitch</strong>
                                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                                mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                            </p>
                        </div>
                        <div className="media text-muted pt-3">
                            <img data-src="holder.js/32x32?theme=thumb&bg=6f42c1&fg=6f42c1&size=1" alt="" className="mr-2 rounded" />
                            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                <strong className="d-block text-gray-dark">@Canal konami</strong>
                                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                                mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;