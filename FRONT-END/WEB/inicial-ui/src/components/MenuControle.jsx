// Libs
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

// Styles
import '../assets/css/reset.css';
import '../assets/css/menuControle.css';

// Imgs
import sair from '../assets/img/menu-controle-sair.svg';
import logo from '../assets/img/logo.svg';


// Services
import {logout, parseJwt} from '../services/Auth';


class MenuControle extends Component{
    constructor(props){
        super(props);
        this.state = {
            qntdSalas : 0,
            qntdEquipamentos : 0
        }
    }

    contarSalas = () => {
        let URL = 'http://localhost:5000/api/salas';

        axios(URL, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .then(response => {
            if(response.status === 200){
                this.setState({ qntdSalas : response.data.length})
            }
        })

        .then(() => console.log('aqui '+ this.state.qntdSalas))

        .catch(erro => console.log(erro));
    }

    contarEquipamentos = () => {
        let URL = 'http://localhost:5000/api/equipamento';

        axios(URL, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('user-token')
            }
        })

        .then(response => {
            if(response.status === 200){
                this.setState({ qntdEquipamentos : response.data.length})
            }
        })

        .then(() => console.log('aqui '+ this.state.qntdEquipamentos))

        .catch(erro => console.log(erro));
    }

    componentDidMount(){
        this.contarSalas();
        this.contarEquipamentos();
    }

    render() {
        const URL = window.location.pathname;
        console.log(URL);
        return(
            <>
                <div className="menu-controle-background">
                    <div className="menu-controle">

                        <div className="menu-controle-content">
                            <div className="menu-controle-text">


                                 <img draggable="false" src={logo} />
                               
                               
                                <div className="menu-controle-pages">
                                    
                                    
                                    
                                    <div className={URL === '/salas' ? 'menu-controle-pages-page' : 'menu-controle-pages-page-disable'}>
                                        <Link to="/salas">
                                            <p className={URL === '/salas' ? 'menu-controle-pages-title' : 'menu-controle-pages-title-disable'}>Salas</p>
                                            <p className={URL === '/salas' ? 'menu-controle-pages-span' : 'menu-controle-pages-span-disable'}>({this.state.qntdSalas})</p>
                                        </Link>
                                    </div>

                                    <div className={URL === '/equipamentos' ? 'menu-controle-pages-page' : 'menu-controle-pages-page-disable'}>
                                        <Link to="/equipamentos">
                                            <p className={URL === '/equipamentos' ? 'menu-controle-pages-title' : 'menu-controle-pages-title-disable'}>Equipamentos</p>
                                            <p className={URL === '/equipamentos' ? 'menu-controle-pages-span' : 'menu-controle-pages-span-disable'}>({this.state.qntdEquipamentos})</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="menu-controle-logout">
                                <div className="menu-controle-logout-btn">
                                    <Link onClick={logout} to="/">
                                        <p className="menu-controle-logout-btn-title">Sair</p>
                                        <img draggable="false" src={sair} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default MenuControle;