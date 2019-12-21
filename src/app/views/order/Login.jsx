import React from 'react'

// dependencys
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components Childs
import Content from '../../components/Content'

// Style
import '../../assets/scss/Login.scss'

const initState = {
    title: 'Inicie uma sessão',
    subtitle: 'Login',
    register: false,
    signIn: {
        login: '',
        pwd: ''
    },
    signUp: {
        name: '',
        login: '',
        email: '',
        emailCheck: '',
        pwd: '',
        pwdCheck: '',
    }
}

export default class Login extends React.Component
{
    constructor (props)
    {
        super(props)
        this.state = {
            ...initState
        }
    }


    contentHeader = () =>
    {
        return (
            <React.Fragment>
                <h1>{ this.state.title }</h1>
                <span>{ this.state.subtitle }</span>
            </React.Fragment>
        )
    }

    formFields = (e) =>
    { 
        const form = e.target.dataset.form
        const input = {
            ...this.state[form],
            [e.target.name]: e.target.value
        }
        this.setState({[form]: input})
    }

    formSignUp = () =>
    { 
        return(
            <div className='form sign-up'>
                <h2>Criar conta</h2>
                <small>Campor obrigatórios são marcados com *</small>
                <hr />
                <div className="field-group">
                    <label>Nome *</label>
                    <input
                        type="text"
                        onChange={ (e) => this.formFields(e) }
                        name="name"
                        data-form='signUp'
                        value={ this.state.signUp.name }
                    />
                </div>
                <div className="field-group">
                    <label>Login *</label>
                    <input
                        type="text"
                        onChange={ (e) => this.formFields(e) }
                        name="login"
                        data-form='signUp'
                        value={ this.state.signUp.login }
                    />
                </div>
                <div className="field-group">
                    <label>E-mail *</label>
                    <input
                        type="text"
                        onChange={ (e) => this.formFields(e) }
                        name="email"
                        data-form='signUp'
                        value={ this.state.signUp.email }
                    />
                </div>
                <div className="field-group">
                    <label>Confirmação de E-mail *</label>
                    <input
                        type="text"
                        onChange={ (e) => this.formFields(e) }
                        name="email-check"
                        data-form='signUp'
                        value={ this.state.signUp.emailCheck }
                    />
                </div>
                <div className="field-group">
                    <label>Senha *</label>
                    <input
                        type="password"
                        onChange={ (e) => this.formFields(e) }
                        name="pwd"
                        data-form='signUp'
                        value={ this.state.signUp.pwd }
                    />
                </div>
                <div className="field-group">
                    <label>Confirmação de senha *</label>
                    <input
                        type="password"
                        onChange={ (e) => this.formFields(e) }
                        name="pwd-check"
                        data-form='signUp'
                        value={ this.state.signUp.pwdCheck }
                    />
                </div>
                <div className="btn-group">
                    <button
                        onClick={ () => this.setState({ register: !this.state.register }) }
                        className="secondary"
                    >
                        Voltar
                            </button>
                    <button
                        className="primary"
                    >
                        Criar conta
                            </button>
                </div>
            </div>
        )
    }

    formSignIn = () =>
    { 
        return (
            <div className='form'>
                <h2>Login</h2>
                <small>Campor obrigatórios são marcados com *</small>
                <hr />
                <div className="field-group">
                    <label>Login *</label>
                    <input
                        type="text"
                        onChange={ (e) => this.formFields(e) }
                        name="login"
                        data-form='signIn'
                        value={ this.state.signIn.login }
                    />
                </div>
                <div className="field-group">
                    <label>Senha *</label>
                    <input
                        type="text"
                        onChange={ (e) => this.formFields(e) }
                        name="pwd"
                        data-form='signIn'
                        value={ this.state.signIn.pwd }
                    />
                </div>
                <div className="btn-group">
                    <button
                        onClick={ () => this.setState({ register: !this.state.register }) }
                        className="secondary"
                    >
                        Criar conta
                    </button>
                    <button
                        className="primary"
                    >
                        Login
                    </button>
                </div>
            </div>
        )
    }

    contentBody = () =>
    {
        return (
            <div className='content-body pt-0 pb-0'>
                <div className='row d-flex align-items-center'>
                    <div className={ this.state.register ? 'd-none' : 'col-6 text-center d-flex justify-content-center' }>
                        { this.formSignIn() }
                    </div>
                    <div className='col-6 pl-0 pr-0'>
                        <div className='bg-login' />
                    </div>
                    <div className={ this.state.register ? 'col-6 text-center d-flex justify-content-center' : 'd-none' }>
                        { this.formSignUp() }
                    </div>
                </div>
            </div>    
        )
    }

    render = () =>
    {
        return (
            <div className="container">
                <Content header={ this.contentHeader() } >
                    { this.contentBody() }
                </Content>
            </div>
        )
    }
}

Login.propTypes = {
    dataFlow: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}
