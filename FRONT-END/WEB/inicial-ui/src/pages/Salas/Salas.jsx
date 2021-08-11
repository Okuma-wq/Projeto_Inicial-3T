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
import ordenardown from '../../assets/img/ordenar-down-icon.svg';
import ordenarup from '../../assets/img/ordenar-up-icon.svg';



class Salas extends Component {
    constructor(props){
        super(props);
        this.state = {
            listaSalas : [],
            itemSala : {},
            listaEquipamentosSala : [],
            listaAndares : [],

            nomeSala : '',
            andar : '',
            metragem : '',
            
            ordenar : false,
            isLoading : false,
            isModalOpenCadastro : false,
            isModalOpenInfo : false,
            isModalOpenEditar : false
        }
    }



    buscarSalas = () => {
        var URL = 'http://localhost:5000/api/salas';

        axios(URL, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .then(response => {
            if(response.status === 200){
                this.setState({ listaSalas : response.data})
            }
        })

        .catch(erro => {console.log(erro)})
    }



    buscarAndares = () => {
        var URL = 'http://localhost:5000/api/salas/andares';

        axios(URL, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .then(response => {
            if(response.status === 200){
                this.setState({ listaAndares : response.data})
            }
        })

        .then(response => console.log(this.state.listaAndares))

        .catch(erro => {console.log(erro)})
    }



    buscarSalasPorId = (id) => {
        let URL = 'http://localhost:5000/api/salas/buscar/' + id;

        console.log(id);

        axios(URL, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .then(response => {
            if(response.status === 200){
                this.setState({ itemSala : response.data})
            }
        })

        .then(response => console.log(this.state.itemSala))

        .then(this.setState({isModalOpenInfo : true}))

        .catch(erro => {console.log(erro)})
    }



    buscarEquipamentoSala = () => {
        let URL = 'http://localhost:5000/api/salas';

        axios(URL, {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("user-token")
            }
        })

        .then(response => {
            this.setState({listaEquipamentosSala : response.data})
            return response.data
        })

        .then(x => {
            let a = []

            x.map(sala => {

                axios.get('http://localhost:5000/api/salaequipamento/' + sala.idSala, {
                    headers : {
                        'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
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
            this.setState({listaEquipamentosSala : x})
            return "apolinario"
        })

        .then(x => console.log(this.state.listaEquipamentosSala))

        .catch(error => {
            console.log(error)
        })
    }



    cadastrarSala = (event) => {
        event.preventDefault();

        var sala = {
            nomeSala : this.state.nomeSala,
            andar : this.state.andar,
            metragem : this.state.metragem
        }

        axios.post('http://localhost:5000/api/salas', sala, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .then(response => {
            if(response.status === 201){
                this.setState({isLoading : false});
                this.setState({isModalOpenCadastro : false});
            }
        })

        .catch(erro => {
            this.setState({isLoading : false})
        })

        .then(this.buscarEquipamentoSala)

        .then(this.cancelaModal)
    }



    atualizaEstado = async (event) => {
        await this.setState({
            [event.target.name] : event.target.value
        })
    }



    excluirSala = (id) => {
        axios.delete('http://localhost:5000/api/salas/' + id, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .catch(erro => {console.log(erro)})

        .then(this.buscarSalas)

        .then(this.cancelaModal)
    }



    cancelaModal = () => {
        this.setState({ isModalOpenCadastro : false })
        this.setState({ isModalOpenInfo : false })
        this.setState({ isModalOpenCadastro : false })
        this.setState({ nomeSala : '' })
        this.setState({ andar : 0 })
        this.setState({ metragem : 0 })
    }



    componentDidMount() {
        this.buscarSalas();
        this.buscarEquipamentoSala();
        this.buscarAndares();
    }


    
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
                        <button onClick={() => {this.setState({ordenar : !this.state.ordenar}); this.buscarEquipamentoSala()}}>Ordenar<img src={this.state.ordenar === false ? ordenardown : ordenarup} draggable="false" /></button>
                        </div>
                    </div>

                    <div className="salas-lista">
                        {
                            this.state.ordenar && this.state.listaEquipamentosSala.sort((a, b) => b.idSala - a.idSala),
                            this.state.listaEquipamentosSala.map(sala => {
                                return(
                                    <div key={sala.idSala} className="salas-lista-card" >
                                        <button onClick={() => this.buscarSalasPorId(sala.idSala)} className="salas-card-click">
                                            <div className="salas-card-btn-lateral">
                                                <img draggable="false" src={icon} />
                                            </div>

                                            <div className="salas-card-text">
                                                <div className="salas-card-text-item">
                                                    <span className="salas-card-text-title">Sala</span>
                                                    <p className="salas-card-text-content">{sala.nomeSala}</p>
                                                </div>
                                                <div className="salas-card-text-item">
                                                    <span className="salas-card-text-title">Andar</span>
                                                    <p className="salas-card-text-content">{sala.andar === 0 ? 'Térreo' : sala.andar + '°'}</p>
                                                </div>
                                                <div className="salas-card-text-item">
                                                    <span className="salas-card-text-title">Metragem</span>
                                                    <p className="salas-card-text-content">{sala.metragem + 'm²'}</p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <Modal isOpen={this.state.isModalOpenCadastro}>
                    <div className="modal">
                        <form onSubmit={this.cadastrarSala} className="modal-card-background">
                            <div className="modal-card-title">
                                <p>Cadastrar Sala</p>
                            </div>

                            <div className="modal-card-form">
                                <input name="nomeSala" value={this.state.nomeSala} onChange={this.atualizaEstado} required type="text" placeholder="Nome da sala" className="modal-card-form-input-nome" />
                                <div className="modal-card-form-input-metragem-andar">
                                    <div className="modal-card-form-input-metragem-content">
                                        <input name="metragem" value={this.state.metragem} onChange={this.atualizaEstado} required type="text" placeholder="Metragem (m²)" className="modal-card-form-input-metragem" />
                                    </div>
                                    <input quantity max="2" min="0" name="andar" value={this.state.andar} onChange={this.atualizaEstado} required type="number" placeholder="Andar" className="modal-card-form-input-andar" />
                                </div>

                                <div className="modal-card-form-btns">
                                    {
                                        this.state.isLoading === true && (<button className="modal-card-form-btns-btn-disable" value="aguarde..." type="submit" disabled>aguarde...</button>)
                                    }
                                    {
                                        this.state.isLoading === false && (<button className="modal-card-form-btns-btn" type="submit" disabled={this.state.nomeSala === '' || this.state.metragem === '' || this.state.andar === '' ? "none" : ""}>cadastrar</button>)
                                    }
                                    <button onClick={() => this.cancelaModal()} disabled={this.state.isLoading === true ? 'none' : ''} className="modal-card-form-btns-btn">Cancelar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>

                <Modal isOpen={this.state.isModalOpenInfo}>
                    <div className="modal">
                        
                        <div className="modal-card-background-info-salas">
                            <div className="modal-card-content-info-header">
                                <div className="modal-card-content-info-header-text">

                                    <div className="modal-card-content-info-header-text-nome">
                                        <img src={sala} draggable="false" />
                                        <p>{'Sala de ' + this.state.itemSala.nomeSala}</p>
                                    </div>
                                </div>

                                <div className="modal-card-content-info-header-btns">
                                    <div className="modal-card-content-info-header-btns-cancel">
                                        <button onClick={() => this.setState({isModalOpenInfo : false})}>x</button>
                                    </div>

                                    <div className="modal-card-content-info-header-btns-btn">
                                        <button onClick={() => this.setState({isModalOpenInfo : false, isModalOpenEditar : true})}>Editar</button>
                                        <button onClick={() => this.excluirSala(this.state.itemSala.idSala)}>Excluir</button>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-card-info-line"></div>

                            <div className="modal-card-content-info-lista-equipamentos">
                                <div className="modal-card-content-info-lista-equipamentos-header">
                                    <p>Equipamentos da Sala:</p>
                                </div>

                                <div className="modal-card-content-info-lista-equipamentos-lista">
                                    {
                                        this.state.listaEquipamentosSala.map(item => {
                                            if(item.idSala === this.state.itemSala.idSala) {
                                                return item.Equipamentos.map(equipamento => {
                                                    return(
                                                        <div className="modal-card-content-info-lista-equipamentos-lista-card" key={equipamento.idEquipamentoNavigation.idEquipamento}>
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
                                                                    {
                                                                        equipamento.idEquipamentoNavigation.situacao === false ? 
                                                                        <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub-situacao-disable">Indisponível</p>
                                                                        : <p className="modal-card-content-info-lista-equipamentos-lista-card-text-item-sub-situacao">Disponível</p>

                                                                    }
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            return ''
                                        })
                                    }
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

                    </div>
                </Modal>

            </>
        )
    }
}

export default Salas;