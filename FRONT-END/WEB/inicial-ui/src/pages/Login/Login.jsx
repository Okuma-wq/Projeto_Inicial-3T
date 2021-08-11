// Libs
import { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

// Services
import {parseJwt} from '../../services/Auth';

// Styles
import '../../assets/css/login.css';
import '../../assets/css/reset.css';

// Imgs
import banner from '../../assets/img/login-banner.svg';
import logo from '../../assets/img/logo.svg';
import lock from '../../assets/img/lock.svg';
import mail from '../../assets/img/mail.svg';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : '',
            mensagem : '',
            isLoading : false
        }
    }

    gerarToken = (event) => {
        event.preventDefault();

        this.setState({ erroMensagem : "", isLoading: true });

        axios.post("http://localhost:5000/api/login", {
            email : this.state.email,
            senha : this.state.senha
        })

        .then((response => {
            if (response.status === 200) { console.log(response)
                localStorage.setItem("user-token", response.data.token)

                this.setState({isLoading : false});

                switch (parseJwt().role) {
                    case "1":
                        this.props.history.push('/salas');
                        break;

                    case "2":
                        this.props.history.push('/salas');
                        break;
                
                    default:
                        this.props.history.push('/');
                        break;
                }
            }
        }))
        .catch(() => {
            this.setState({
                erroMensagem : "E-mail ou senha inválidos! Tente novamente.",
                isLoading : false
            })
        })
    }

    limparCampos = () => {
        this.setState({
            email : '',
            senha : ''
        })
    }

    atualizarEmail = (email) => {
        this.setState({[email.target.name] : email.target.value})
    }

    atualizarSenha = (senha) => {
        this.setState({[senha.target.name] : senha.target.value})
    }



    render() {
        return(
            <>
                <div className="login-banner-background">
                    <div className="login-banner">

                        <div className="logo">
                            <img src={logo} draggable="false" className="logo"/>
                        </div>

                        <div className="banner">
                            <img src={banner} draggable="false" />
                        </div>

                    </div>
                </div>

                <div className="login-form-background">
                    <form onSubmit={this.gerarToken} className="login-form">
                        <div className="login-form-title">
                            <p>Login</p>
                        </div>

                        <div className="login-form-inputs">

                            <div className="mail">
                                <img src={mail} draggable="false" />
                                <input name="email" value={this.state.email} onChange={this.atualizarEmail} autoComplete="off" type="email" placeholder="E-mail" />
                            </div>

                            <div className="lock">
                                <img src={lock} draggable="false" />    
                                <input name="senha" value={this.state.senha} onChange={this.atualizarSenha} type="password" placeholder="Senha" />    
                            </div>
                            
                        </div>

                        <div className="login-form-btns">
                            {
                                this.state.isLoading === true && (<input value="Entrando..." type="submit" className="login-form-btns-btn" disabled />)
                            }
                            {
                                this.state.isLoading === false && (<input value="Entrar" className="login-form-btns-btn" type="submit" disabled={this.state.email === "" || this.state.senha === "" ? "none" : ""} />)
                            }
                        </div>

                        <div className="login-form-erro">
                            <p>{this.state.erroMensagem}</p>
                        </div>
                    </form>
                </div>
            </>
        )
    }

}

export default Login;