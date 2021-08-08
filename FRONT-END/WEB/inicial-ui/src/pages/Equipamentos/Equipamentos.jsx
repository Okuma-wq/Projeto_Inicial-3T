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
import '../../assets/css/equipamentos.css';
import '../../assets/css/reset.css';

// Imgs
import icon from '../../assets/img/cards-lista-btn.svg';
import ordenardown from '../../assets/img/ordenar-down-icon.svg';
import ordenarup from '../../assets/img/ordenar-up-icon.svg';


class Equipamentos extends Component {
    constructor(props){
        super(props);
        this.state = {
            listaEquipamentos : [],
            equipamentoSelecionado : [],
            itemEquipamento : {},
            listaSalas : [],
            listaTiposEquipamentos : [],

            idTipoEquipamento : 0,
            nomeEquipamento : '',
            nomeMarca : '',
            numeroPatrimonio : '',
            numeroSerie : '',
            descricao : '',
            situacao : true,
            idSala : 0,
            
            ordenar : false,
            isLoading : false,
            isModalOpenCadastro : false,
            isModalOpenInfo : false,
            isModalOpenEditar : false
        }
    }

    buscarEquipamentos = () => {
        let URL = 'http://localhost:5000/equipamentos';

        axios(URL, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .then(response => {
            if(response.status === 200){
                this.setState({ listaEquipamentos : response.data})
            }
        })

        .catch(erro => {console.log(erro)})
    }



    buscarEquipamentosPorId = (id) => {
        // let URL = 'http://localhost:5000/api/salaEquipamento/equipamentos/' + id;
        let URL = 'http://localhost:5000/api/equipamento/' + id;

        console.log(id);

        axios(URL, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .then(response => {
            if(response.status === 200){
                this.setState({ itemEquipamento : response.data})
                // console.log(this.state.itemEquipamento)
            }
        })

        .then(response => console.log(this.state.itemEquipamento))

        .then(console.log(this.state.itemEquipamento))

        .then(this.setState({isModalOpenInfo : true}))

        .catch(erro => {console.log(erro)})
    }



    buscarEquipamentosPorIdEditar = (id) => {
        // let URL = 'http://localhost:5000/api/salaEquipamento/equipamentos/' + id;
        let URL = 'http://localhost:5000/api/equipamento/' + id;

        console.log(id);

        axios(URL, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .then(response => {
            if(response.status === 200){
                this.setState({ itemEquipamento : response.data})
                // console.log(this.state.itemEquipamento)
            }
        })

        .then(response => console.log(this.state.itemEquipamento))

        .then(this.setState({isModalOpenInfo : false, isModalOpenEditar : true}))

        .catch(erro => {console.log(erro)})
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



    buscarTipoEquipamentos = () => {
        var URL = 'http://localhost:5000/api/tipoEquipamento';

        axios(URL, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .then(response => {
            if(response.status === 200){
                this.setState({ listaTiposEquipamentos : response.data})
            }
        })

        .catch(erro => {console.log(erro)})
    }



    cadastrarEquipamento = (event) => {
        event.preventDefault();

        var equipamento = {
            idTipoEquipamento : this.state.idTipoEquipamento,
            nomeEquipamento : this.state.nomeEquipamento,
            nomeMarca : this.state.nomeMarca,
            numeroPatrimonio : this.state.numeroPatrimonio,
            numeroSerie : this.state.numeroSerie,
            descricao : this.state.descricao,
            idSala : this.state.idSala,
            situacao : this.state.situacao
        }

        axios.post('http://localhost:5000/api/equipamento', equipamento, {
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

        .then(this.buscarEquipamentos)

        .then(this.cancelaModal)
    }



    atualizaEstado = async (event) => {
        await this.setState({
            [event.target.name] : event.target.value
        })
    }



    excluirEquipamento = (id) => {
        axios.delete('http://localhost:5000/api/equipamento/' + id, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .catch(erro => {console.log(erro)})

        .then(this.buscarEquipamentos)

        .then(this.cancelaModal)
    }



    cancelaModal = () => {
        this.setState({ isModalOpenCadastro : false })
        this.setState({ isModalOpenInfo : false })
        this.setState({ isModalOpenCadastro : false })
        this.setState({ idTipoEquipamento : 0 })
        this.setState({ idSala : 0 })
        this.setState({ nomeEquipamento : '' })
        this.setState({ nomeMarca : '' })
        this.setState({ numeroPatrimonio : '' })
        this.setState({ numeroSerie : '' })
        this.setState({ descricao : '' })
    }



    componentDidMount(){
        this.buscarEquipamentos();
        this.buscarSalas();
        this.buscarTipoEquipamentos();
    }



    render() {
        return(
            <>
                <MenuControle />
                    
                <div className="equipamentos-background">
                    <div className="equipamentos-btns">
                        <div className="equipamentos-btns-cadastro">
                            <button type="button" onClick={() => this.setState({isModalOpenCadastro : true})}>Cadastrar Equipamento</button>
                        </div>

                        <div className="equipamentos-btns-ordenar">
                            <button onClick={() => {this.setState({ordenar : !this.state.ordenar}); this.buscarEquipamentos()}}>Ordenar<img src={this.state.ordenar === false ? ordenardown : ordenarup} draggable="false" /></button>
                        </div>
                    </div>

                    <div className="equipamentos-lista">

                    {
                        this.state.ordenar && this.state.listaEquipamentos.sort((a, b) => b.idEquipamentoNavigation.idEquipamento - a.idEquipamentoNavigation.idEquipamento),
                        this.state.listaEquipamentos.map(equipamento => {
                            return(
                                <div key={equipamento.idEquipamento} className="equipamentos-lista-card">

                                    <button onClick={() => this.buscarEquipamentosPorId(equipamento.idEquipamentoNavigation.idEquipamento)} className="equipamentos-card-click">
                                    {/* <button onClick={() => this.alterarState(equipamento)} className="equipamentos-card-click"> */}
                                        <div className="equipamentos-card-btn-lateral">
                                            <img draggable="false" src={icon} />
                                        </div>

                                        <div className="equipamentos-card-text">
                                            <div className="equipamentos-card-text-item">
                                                <span className="equipamentos-card-text-title">Equipamento</span>
                                                <p className="salas-card-text-content">{equipamento.idEquipamentoNavigation.nomeEquipamento}</p>
                                            </div>
                                            <div className="equipamentos-card-text-item">
                                                <span className="equipamentos-card-text-title">N° Patrimônio</span>
                                                <p className="equipamentos-card-text-content">{equipamento.idEquipamentoNavigation.numeroPatrimonio}</p>
                                            </div>
                                            <div className="equipamentos-card-text-item">
                                                {/* <span className="equipamentos-card-text-title">Metragem</span> */}
                                                {
                                                    equipamento.idEquipamentoNavigation.situacao === false ?
                                                    <p className="modal-card-background-info-equipamentos-content-item-sub-situacao-disable">Indisponível</p> : ''
                                                }
                                                {
                                                    equipamento.idEquipamentoNavigation.situacao === true ?
                                                    <p className="modal-card-background-info-equipamentos-content-item-sub-situacao">Disponível</p> : ''
                                                }
                                            </div>
                                            
                                        </div>
                                    </button>
                                </div>      
                            )
                        })
                    }

                    </div>
                </div>
                
                <Modal isOpen={this.state.isModalOpenInfo} >
                    <div className="modal">
                        
                        <div className="modal-card-background-info-equipamentos">
                            <div className="modal-card-background-info-equipamentos-lateral">
                                <img draggable="false" src={icon} />
                            </div>

                            <div className="modal-card-background-info-equipamentos-content">
                                <div className="modal-card-background-info-equipamentos-content-title">
                                    <p>Informações do Equipamento</p>
                                    <button onClick={() => this.setState({isModalOpenInfo : false})}>x</button>
                                </div>

                                <div className="modal-card-background-info-equipamentos-text">
                                    <div className="modal-card-background-info-equipamentos-content-item">
                                        <span className="modal-card-background-info-equipamentos-content-item-title">Equipamento</span>
                                        <p className="modal-card-background-info-equipamentos-content-item-sub">{this.state.itemEquipamento.nomeEquipamento}</p>
                                    </div>

                                    <div className="modal-card-background-info-equipamentos-content-item">
                                        <span className="modal-card-background-info-equipamentos-content-item-title">Tipo de Equipamento</span>
                                        <p className="modal-card-background-info-equipamentos-content-item-sub">{this.state.itemEquipamento.idTipoEquipamento === 1 ? 'Laptop' : '' || this.state.itemEquipamento.idTipoEquipamento === 2 ? 'Mobília' : '' || this.state.itemEquipamento.idTipoEquipamento === 3 ? 'Modelo' : '' || this.state.itemEquipamento.idTipoEquipamento === 4 ? 'Instrumento Musical' : '' || this.state.itemEquipamento.idTipoEquipamento === 5 ? 'Laboratório' : ''}</p>
                                    </div>

                                    <div className="modal-card-background-info-equipamentos-content-item">
                                        <span className="modal-card-background-info-equipamentos-content-item-title">N° Patrimônio</span>
                                        <p className="modal-card-background-info-equipamentos-content-item-sub">{this.state.itemEquipamento.numeroPatrimonio}</p>
                                    </div>

                                    <div className="modal-card-background-info-equipamentos-content-item">
                                        <span className="modal-card-background-info-equipamentos-content-item-title">Marca</span>
                                        <p className="modal-card-background-info-equipamentos-content-item-sub">{this.state.itemEquipamento.nomeMarca}</p>
                                    </div>

                                    <div className="modal-card-background-info-equipamentos-content-item">
                                        <span className="modal-card-background-info-equipamentos-content-item-title">N° Série</span>
                                        <p className="modal-card-background-info-equipamentos-content-item-sub">{this.state.itemEquipamento.numeroSerie}</p>
                                    </div>

                                    <div className="modal-card-background-info-equipamentos-content-item">
                                        <span className="modal-card-background-info-equipamentos-content-item-title">Sala</span>
                                        <p className="modal-card-background-info-equipamentos-content-item-sub">{this.state.itemEquipamento.nomeSala}</p>
                                    </div>

                                    <div className="modal-card-background-info-equipamentos-content-item">
                                        {/* <span className="modal-card-background-info-equipamentos-content-item-title"></span> */}
                                        {/* <p className="modal-card-background-info-equipamentos-content-item-sub-situacao">Indisponível</p> */}

                                        {
                                            this.state.itemEquipamento.situacao === false ?
                                            <p className="modal-card-background-info-equipamentos-content-item-sub-situacao-disable">Indisponível</p> : ''
                                        }
                                        {
                                            this.state.itemEquipamento.situacao === true ?
                                            <p className="modal-card-background-info-equipamentos-content-item-sub-situacao">Disponível</p> : ''
                                        }
                                    </div>

                                    <div className="modal-card-background-info-equipamentos-content-item">
                                        <span className="modal-card-background-info-equipamentos-content-item-title">Descrição</span>
                                        <p className="modal-card-background-info-equipamentos-content-item-sub">{this.state.itemEquipamento.descricao}</p>
                                    </div>

                                </div>
                                <div className="modal-card-background-info-equipamentos-content-btns">
                                    <button onClick={() => this.buscarEquipamentosPorIdEditar(this.state.itemEquipamento.idEquipamento)} className="modal-card-background-info-equipamentos-content-btns-btn">Editar</button>
                                    <button type="button" onClick={() => this.excluirEquipamento(this.state.itemEquipamento.idEquipamento)} className="modal-card-background-info-equipamentos-content-btns-btn">Excluir</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </Modal>

                <Modal isOpen={this.state.isModalOpenCadastro}>
                    <div className="modal">
                        <form onSubmit={this.cadastrarEquipamento} className="modal-card-background-equipamentos">
                            <div className="modal-card-title">
                                <p>Cadastrar Equipamento</p>
                            </div>

                            <div className="modal-card-form">
                                <input name="nomeEquipamento" value={this.state.nomeEquipamento} onChange={this.atualizaEstado} required type="text" placeholder="Nome do equipamento" className="modal-card-form-input-nome" />
                                
                                <div className="modal-card-form-input-patrimonio-marca">
                                    <div className="modal-card-form-input-patrimonio-content">
                                        <input maxLength="8" name="numeroPatrimonio" value={this.state.numeroPatrimonio} onChange={this.atualizaEstado} required type="text" placeholder="N° Patrimônio" className="modal-card-form-input-patrimonio" />
                                    </div>
                                    <div className="modal-card-form-input-marca-content">
                                        <input name="nomeMarca" value={this.state.nomeMarca} onChange={this.atualizaEstado} required type="text" placeholder="Marca" className="modal-card-form-input-marca" />
                                    </div>
                                    {/* <select value="Metragem (m²)" className="modal-card-form-input-andar" /> */}
                                </div>

                                <div className="modal-card-form-input-serie-situacao">
                                    <div className="modal-card-form-input-serie-content">
                                        <input maxLength="11" name="numeroSerie" value={this.state.numeroSerie} onChange={this.atualizaEstado} required type="text" placeholder="N° Série" className="modal-card-form-input-serie" />
                                    </div>
                                    {
                                        <select 
                                            className="modal-card-form-input-situacao"
                                            name="idTipoEquipamento"
                                            value={this.state.idTipoEquipamento}
                                            onChange={this.atualizaEstado}
                                            id="idTipoEquipamento"
                                            required
                                        >
                                            <option value={0}>Tipo Equipamento...</option>
                                            {
                                                this.state.listaTiposEquipamentos.map(tipos => {
                                                    return(
                                                        <option key={tipos.idTipoEquipamento} value={tipos.idTipoEquipamento}>
                                                            {tipos.titulo}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        
                                    }
                                </div>
                                
                                <div className="modal-card-form-input-serie-situacao">
                                    <input name="descricao" value={this.state.descricao} onChange={this.atualizaEstado} required type="text" placeholder="Descrição" className="modal-card-form-input-descricao" />
                                    
                                    {
                                        <select 
                                            className="modal-card-form-input-tipoEquipamento"
                                            name="idSala"
                                            value={this.state.idSala}
                                            onChange={this.atualizaEstado}
                                            id="idSala"
                                            required
                                        >
                                            <option value={0}>Salas...</option>
                                            {
                                                this.state.listaSalas.map(salas => {
                                                    return(
                                                        <option key={salas.idSala} value={salas.idSala}>
                                                            {salas.nomeSala}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        
                                    }

                                </div>

                            </div>
                            <div className="modal-card-form-btns">
                                {
                                    this.state.isLoading === true && (<button className="modal-card-form-btns-btn-disable" value="aguarde..." type="submit" disabled>aguarde...</button>)
                                }
                                {
                                    this.state.isLoading === false && (<button className="modal-card-form-btns-btn" type="submit" disabled={this.state.idTipoEquipamento === 0 || this.state.idSala === 0 || this.state.nomeEquipamento === '' || this.state.nomeMarca === '' || this.state.numeroSerie === '' || this.state.descricao === '' ? "none" : ""}>cadastrar</button>)
                                }
                                {/* <button className="modal-card-form-btns-btn">Cadastrar</button> */}
                                <button onClick={() => this.cancelaModal()} disabled={this.state.isLoading === true ? 'none' : ''} className="modal-card-form-btns-btn">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </Modal>

                <Modal isOpen={this.state.isModalOpenEditar}>
                    <div className="modal">
                        <form onSubmit={this.editarEquipamentos} className="modal-card-background-equipamentos-editar">
                            <div className="modal-card-title">
                                <p>Editar Equipamento</p>
                            </div>

                            <div className="modal-card-form">
                                <input type="text" placeholder="Nome do equipamento" className="modal-card-form-input-nome" />

                                <div className="modal-card-form-input-serie-situacao">
                                    <div className="modal-card-form-input-serie-content">
                                        <input type="text" placeholder="N° Série" className="modal-card-form-input-serie" />
                                    </div>
                                    
                                    <select className="modal-card-form-input-situacao"><option>Sala</option></select>
                                </div>

                                <input type="text" placeholder="Descrição" className="modal-card-form-input-descricao" />

                            </div>
                            <div className="modal-card-form-btns">
                                <button className="modal-card-form-btns-btn">Salvar</button>
                                <button onClick={() => this.setState({isModalOpenEditar : false})} className="modal-card-form-btns-btn">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </>
        )
    }
}

export default Equipamentos;