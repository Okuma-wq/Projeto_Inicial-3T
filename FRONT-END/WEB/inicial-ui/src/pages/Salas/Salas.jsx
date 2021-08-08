// Libs
import { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

// Services
// import {parseJwt} from '../../services/Auth';

// Components
import MenuControle from '../../components/MenuControle';
import Modal from '../../components/Modal';

// Styles
import '../../assets/css/salas.css';
import '../../assets/css/reset.css';

// Imgs
import icon from '../../assets/img/cards-lista-btn.svg';
import sala from '../../assets/img/sala-modal-info-icon.svg';

class Salas extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpenCadastro : false,
            isModalOpenInfo : false,
            isModalOpenEditar : false,
            sala : [],
            equipamento : [],
            salasEquipamento : [],
            idInfo : 0
        }
    }

    async componentDidMount() {
        this.sala()
        // this.equipamento()
        //this.salasequipamento()
    }

    sala = () => {
        axios.get("http://localhost:5000/api/salas", {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("user-token")
            }
        })
        .then(response => {
            this.setState({sala : response.data})
            return response.data
        })
        .then(x => {
            let a = []
            x.map(sala => {
                axios.get("http://localhost:5000/api/salaequipamento/"+sala.idSala, {
                    headers : {
                        "Authorization" : "Bearer " + localStorage.getItem("user_token")
                    }
                })
                .then(response => {
                    sala.Equipamentos = response.data
                })
                .catch(error => {
                    console.log(error)
                })
                a.push(sala)
                return true
            })
            return a
        })
        .then(x => {
            this.setState({sala : x})
            return "apolinario"
        })
        .then(x => console.log(this.state.sala))
        .catch(error => {
            console.log(error)
        })
        

        
    }
    
    // equipamento = () => {
    //     axios.get("http://localhost:5000/api/equipamento", {
    //         headers : {
    //             "Authorization" : "Bearer " + localStorage.getItem("user-token")
    //         }
    //     })
    //     .then(response => {
    //         this.setState({equipamento : response.data})
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

    // salasequipamento = () => {
    //     axios.get("http://localhost:5000/equipamentos", {
    //         headers : {
    //             "Authorization" : "Bearer " + localStorage.getItem("user-token")
    //         }
    //     })
    //     .then(response => {
    //         this.setState({salasEquipamento : response.data})
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

    
    render() {
        return(
            <>
                <MenuControle />
                <div className="salas-background">
                    <div className="salas-btns">
                        <div className="salas-btns-cadastro">
                            <button onClick={() => this.setState({isModalOpenCadastro : true})}>Cadastrar Sala</button>
                        </div>

                        <div className="salas-btns-ordenar">
                            <button>Ordenar</button>
                        </div>
                    </div>

                    <div className="salas-lista">
                        {this.state.sala.map(x => {
                            return <div className="salas-lista-card" key={x.idSala}>
                                        <button onClick={() => this.setState({isModalOpenInfo : true, idInfo : x.idSala})} className="salas-card-click">
                                            <div className="salas-card-btn-lateral">
                                                <img draggable="false" src={icon} />
                                            </div>

                                            <div className="salas-card-text">
                                                <div className="salas-card-text-item">
                                                    <span className="salas-card-text-title">Sala</span>
                                                    <p className="salas-card-text-content">{x.nomeSala}</p>
                                                </div>
                                                <div className="salas-card-text-item">
                                                    <span className="salas-card-text-title">Andar</span>
                                                    <p className="salas-card-text-content">{x.Andar}</p>
                                                </div>
                                                <div className="salas-card-text-item">
                                                    <span className="salas-card-text-title">Metragem</span>
                                                    <p className="salas-card-text-content">{x.metragem}m²</p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                        })}
                        

                    </div>
                </div>

                <Modal isOpen={this.state.isModalOpenCadastro}>
                    <div className="modal">
                        <div className="modal-card-background">
                            <div className="modal-card-title">
                                <p>Cadastrar Sala</p>
                            </div>

                            <div className="modal-card-form">
                                <input type="text" placeholder="Nome da sala" className="modal-card-form-input-nome" />
                                <div className="modal-card-form-input-metragem-andar">
                                    <div className="modal-card-form-input-metragem-content">
                                        <input type="text" placeholder="Metragem (m²)" className="modal-card-form-input-metragem" />
                                    </div>
                                    <select value="Metragem (m²)" className="modal-card-form-input-andar" />
                                </div>

                                <div className="modal-card-form-btns">
                                    <button className="modal-card-form-btns-btn">Cadastrar</button>
                                    <button onClick={() => this.setState({isModalOpenCadastro : false})} className="modal-card-form-btns-btn">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal isOpen={this.state.isModalOpenInfo}>
                    <div className="modal">
                        <div className="modal-card-background-info-salas">
                            <div className="modal-card-content-info-header">
                                <div className="modal-card-content-info-header-text">

                                    <div className="modal-card-content-info-header-text-nome">
                                        <img src={sala} draggable="false" />
                                        <p>{this.state.sala.map(x => {
                                            if(x.idSala == this.state.idInfo) {
                                                return x.nomeSala
                                            }
                                            return ""
                                            })}</p>
                                    </div>
                                </div>

                                <div className="modal-card-content-info-header-btns">
                                    <div className="modal-card-content-info-header-btns-cancel">
                                        <button onClick={() => this.setState({isModalOpenInfo : false})}>x</button>
                                    </div>

                                    <div className="modal-card-content-info-header-btns-btn">
                                        <button onClick={() => this.setState({isModalOpenInfo : false, isModalOpenEditar : true})}>Editar</button>
                                        <button>Excluir</button>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-card-info-line"></div>

                            <div className="modal-card-content-info-lista-equipamentos">
                                <div className="modal-card-content-info-lista-equipamentos-header">
                                    <p>Equipamentos da Sala:</p>
                                </div>

                                <div className="modal-card-content-info-lista-equipamentos-lista">
                                    {this.state.sala.map(x => {
                                        if(x.idSala === this.state.idInfo) {
                                            return x.Equipamentos.map(equipamento => {
                                            return <div className="modal-card-content-info-lista-equipamentos-lista-card" key={equipamento.idEquipamentoNavigation.idEquipamento}>
                                                <div className="modal-card-content-info-lista-equipamentos-lista-card-lateral">
                                                    <img draggable="false" src={icon} />
                                                </div>

                                                <div className="modal-card-content-info-lista-equipamentos-lista-card-text">
                                                    <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                        <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">Equipamento</p>
                                                        <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub">{equipamento.idEquipamentoNavigation.nomeEquipamento}</p>
                                                    </div>

                                                    <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                        <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">N° Patrimônio</p>
                                                        <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub">{equipamento.idEquipamentoNavigation.numeroPatrimonio}</p>
                                                    </div>

                                                    <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                        {/* <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">Situação</p> */}
                                                        <p className={"modal-card-content-info-lista-equipamentos-lista-card-text-item-sub-situacao" + !!equipamento.idEquipamentoNavigation.situacao ? "" : "disable"}>{!!equipamento.idEquipamentoNavigation.situacao ? "Disponivel" : "Indisponivel"}</p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            })
                                        }
                                        return ""
                                    })}
                                    

                                    <div className="modal-card-content-info-lista-equipamentos-lista-card">
                                        <div className="modal-card-content-info-lista-equipamentos-lista-card-lateral">
                                            <img draggable="false" src={icon} />
                                        </div>

                                        <div className="modal-card-content-info-lista-equipamentos-lista-card-text">
                                            <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">Equipamento</p>
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub">Esqueleto Anatômico</p>
                                            </div>

                                            <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">N° Patrimônio</p>
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub">13200001</p>
                                            </div>

                                            <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                {/* <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">Situação</p> */}
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub-situacao">Disponível</p>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className="modal-card-content-info-lista-equipamentos-lista-card">
                                        <div className="modal-card-content-info-lista-equipamentos-lista-card-lateral">
                                            <img draggable="false" src={icon} />
                                        </div>

                                        <div className="modal-card-content-info-lista-equipamentos-lista-card-text">
                                            <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">Equipamento</p>
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub">Esqueleto Anatômico</p>
                                            </div>

                                            <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">N° Patrimônio</p>
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub">13200001</p>
                                            </div>

                                            <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                {/* <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">Situação</p> */}
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub-situacao">Disponível</p>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className="modal-card-content-info-lista-equipamentos-lista-card">
                                        <div className="modal-card-content-info-lista-equipamentos-lista-card-lateral">
                                            <img draggable="false" src={icon} />
                                        </div>

                                        <div className="modal-card-content-info-lista-equipamentos-lista-card-text">
                                            <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">Equipamento</p>
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub">Esqueleto Anatômico</p>
                                            </div>

                                            <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">N° Patrimônio</p>
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub">13200001</p>
                                            </div>

                                            <div className="modal-card-content-info-lista-equipamentos-lista-card-text-item">
                                                {/* <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-title">Situação</p> */}
                                                <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub-situacao">Disponível</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal isOpen={this.state.isModalOpenEditar}>
                    <div className="modal">
                        <div className="modal-card-background">
                            <div className="modal-card-title">
                                <p>Editar Sala</p>
                            </div>

                            <div className="modal-card-form">
                                <input type="text" placeholder="Nome da sala" className="modal-card-form-input-nome" />
                                <div className="modal-card-form-input-metragem-andar">
                                    <div className="modal-card-form-input-metragem-content">
                                        <input type="text" placeholder="Metragem (m²)" className="modal-card-form-input-metragem" />
                                    </div>
                                    <select value="Metragem (m²)" className="modal-card-form-input-andar" />
                                </div>

                                <div className="modal-card-form-btns">
                                    <button className="modal-card-form-btns-btn">Editar</button>
                                    <button onClick={() => this.setState({isModalOpenEditar : false})} className="modal-card-form-btns-btn">Cancelar</button>
                                </div>
                            </div>
                        </div>
                        {this.state.sala.map(x => true)}
                    </div>
                </Modal>

            </>
        )
    }
}

export default Salas;