import React from 'react'

// dependencys
import Axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

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
    },
    error: {
        pwd: false,
        login: false,
        email: false,
    },
    msg: {
        inPwd: 'Senha incorreta',
        inLogin: 'Login não encontrado',
        upLogin: 'Login indisponível - Tente outro login',
        upPwd: 'A senha e confirmação não são idênticas',
        upEmail: 'O e-mail e confirmação não são idênticos',
    }
}

class Login extends React.Component
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

    submitSignIn = () =>
    {
        Axios.get(`${ this.props.data.api }clients?login=${ this.state.signIn.login }`)
        .then(res =>
        {
            if (res.data.length && res.data[0].pwd === this.state.signIn.pwd)
            {
                const sectionData = ['user', res.data[0]]
                this.props.dataFlow(sectionData)
                // MANDAR P PAGINA DE CRIACAO
                this.props.history.push('/create')
            } else if (res.data[0].pwd !== this.state.signIn.pwd) 
            {
                this.setState(prevState => ({
                    error: { ...prevState.error, pwd: true },
                }))
            } else {
                this.setState(prevState => ({
                    error: { ...prevState.error, login: true },
                }))
            }
        })
    }

    submitsignUp = () => { }

    resetErrors = () => this.setState({ error: initState.error })

    toggleForm = () =>
    { 
        this.setState({
			signIn: initState.signIn,
			signUp: initState.signUp,
			register: !this.state.register,
		})
    }

    formFields = (e) =>
    { 
        const err = this.state.error
        const form = e.target.dataset.form
        const input = {
            ...this.state[form],
            [e.target.name]: e.target.value
        }
        if (err.email || err.login || err.pwd) this.resetErrors()
        this.setState({ [form]: input })
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
                        name="emailCheck"
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
                        name="pwdCheck"
                        data-form='signUp'
                        value={ this.state.signUp.pwdCheck }
                    />
                </div>
                <div className="btn-group">
                    <button
                        onClick={ () => this.toggleForm() }
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
			<div className="form">
				<h2>Login</h2>
				<small>Campor obrigatórios são marcados com *</small>
				<hr />
				<div className="field-group">
					<label>Login *</label>
					<input
						type="text"
						onChange={e => this.formFields(e)}
						name="login"
						data-form="signIn"
						value={this.state.signIn.login}
					/>
				</div>
				<div className="field-group">
					<label>Senha *</label>
					<input
						type="password"
						onChange={(e) => this.formFields(e)}
						name="pwd"
						data-form="signIn"
						value={this.state.signIn.pwd}
					/>
				</div>
				<div className="btn-group">
					<button
						onClick={() => this.toggleForm()}
						className="secondary"
					>
						Criar conta
					</button>
					<button
						onClick={() => this.submitSignIn()}
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

export default withRouter(Login)

Login.propTypes = {
    dataFlow: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}
