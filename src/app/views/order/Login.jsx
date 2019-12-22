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
    loader: false,
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
        empty: false
    },
    msg: {
        empty: 'Preencha todos os campos',
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

    validSignUp = () =>
    { 
        const regis = this.state.signUp

        if (regis.name && regis.login && regis.email && regis.emailCheck && regis.pwd && regis.pwdCheck)
        {
            const checkEmail = regis.email === regis.emailCheck ? true : this.setState(prevState => ({ error: { ...prevState.error, email: true } }), () => { return false })
            const checkPwd = regis.pwd === regis.pwdCheck ? true : this.setState(prevState => ({ error: { ...prevState.error, pwd: true } }), () => { return false })
            const valid = checkPwd && checkEmail ? true : false

            return valid
        } else
        { 
            this.formEmpty()
            return false
        }
    }

    formEmpty = () =>
    { 
        this.setState(prevState => ({ error: { ...prevState.error, empty: true } }))
    }

    formError = () =>
    { 
        if (this.state.register)
        {
            const error = this.state.error.login
                ? this.state.msg.upLogin
                : this.state.error.email
                ? this.state.msg.upEmail
                : this.state.error.pwd
                ? this.state.msg.upPwd
                : this.state.error.empty
                ? this.state.msg.empty
                : '⠀'
            
            return error
        } else
        { 
            const error = this.state.error.login
				? this.state.msg.inLogin
				: this.state.error.pwd
				? this.state.msg.inPwd
				: this.state.error.empty
				? this.state.msg.empty
                : '⠀'
            
            return error
        }
    }

    submitSignIn = () =>
    {
        if (this.state.signIn.login && this.state.signIn.pwd) {
			this.setState({ loader: true })
			Axios.get(`${this.props.data.api}clients?login=${this.state.signIn.login}`)
				.then(res => {
					if (
						res.data.length &&
						res.data[0].pwd === this.state.signIn.pwd
					) {
						const sectionData = ['user', res.data[0]]
						this.props.dataFlow(sectionData)
						this.props.history.push('/create')
					} else if (!res.data.length) {
						this.setState(prevState => ({
							error: { ...prevState.error, login: true },
						}))
					} else {
						this.setState(prevState => ({
							error: { ...prevState.error, pwd: true },
						}))
					}
				})
				.finally(() => {
					this.setState({ loader: false })
				})
		} else this.formEmpty()
    }

    submitsignUp = () =>
    { 
        if (this.validSignUp())
        {
            debugger
        } else
        { 
            debugger
        }
    }

    resetErrors = () => this.setState({ error: initState.error })

    toggleForm = () =>
    { 
        this.setState({
            error: initState.error,
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
        if (err.email || err.login || err.pwd || err.empty) this.resetErrors()
        this.setState({ [form]: input })
    }

    formSignUp = () =>
    { 
        return (
			<div className="form sign-up">
				<h2>Criar conta</h2>
				<small>Campor obrigatórios são marcados com *</small>
				<hr />
				<div className="field-group">
					<label>Nome *</label>
					<input
						type="text"
						onChange={e => this.formFields(e)}
						name="name"
						data-form="signUp"
						value={this.state.signUp.name}
					/>
				</div>
				<div className="field-group">
					<label>Login *</label>
					<input
						type="text"
						onChange={e => this.formFields(e)}
						name="login"
						data-form="signUp"
						value={this.state.signUp.login}
					/>
				</div>
				<div className="field-group">
					<label>E-mail *</label>
					<input
						type="text"
						onChange={e => this.formFields(e)}
						name="email"
						data-form="signUp"
						value={this.state.signUp.email}
					/>
				</div>
				<div className="field-group">
					<label>Confirmação de E-mail *</label>
					<input
						type="text"
						onChange={e => this.formFields(e)}
						name="emailCheck"
						data-form="signUp"
						value={this.state.signUp.emailCheck}
					/>
				</div>
				<div className="field-group">
					<label>Senha *</label>
					<input
						type="password"
						onChange={e => this.formFields(e)}
						name="pwd"
						data-form="signUp"
						value={this.state.signUp.pwd}
					/>
				</div>
				<div className="field-group">
					<label>Confirmação de senha *</label>
					<input
						type="password"
						onChange={e => this.formFields(e)}
						name="pwdCheck"
						data-form="signUp"
						value={this.state.signUp.pwdCheck}
					/>
				</div>
				<div className="error">
					<span>{this.formError()}</span>
				</div>
				<div className="btn-group">
                    <button
                        disabled={ this.state.loader }
						onClick={() => this.toggleForm()}
						className="secondary"
					>
						Voltar
					</button>
                    <button
                        disabled={ this.state.loader }
						onClick={() => this.submitsignUp()}
						className="primary"
					>
						{ this.state.loader ? <i className='fa fa-spinner fa-pulse'></i> : 'Criar conta' }
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
						onChange={e => this.formFields(e)}
						name="pwd"
						data-form="signIn"
						value={this.state.signIn.pwd}
					/>
				</div>
				<div className="error">
					<span>{this.formError()}</span>
				</div>
				<div className="btn-group">
                    <button
                        disabled={ this.state.loader }
						onClick={() => this.toggleForm()}
						className="secondary"
					>
						Criar conta
					</button>
                    <button
                        disabled={ this.state.loader }
						onClick={() => this.submitSignIn()}
						className="primary"
					>
						{ this.state.loader ? <i className='fa fa-spinner fa-pulse'></i> : 'login' }
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
