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
}

const initForm = {
    signIn: {
        login: '',
        pwd: ''
    },
    signUp: {
        name: '',
        email: '',
        emailCheck: '',
        login: '',
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
            ...initState,
            ...initForm,
        }
    }

    validSignUp = () =>
    { 
        const regis = this.state.signUp

        if (regis.name && regis.login && regis.email && regis.emailCheck && regis.pwd && regis.pwdCheck)
        {
            const checkEmail = regis.email === regis.emailCheck
                ? true
                : this.setState(prevState => ({ error: { ...prevState.error, email: true } }))
            const checkPwd = regis.pwd === regis.pwdCheck
                ? true
                : this.setState(prevState => ({ error: { ...prevState.error, pwd: true } }))
            const valid = checkEmail && checkPwd ? true : false
            return valid
        } else  this.formEmpty()
    }

    validLogin = async () =>
    { 
        await Axios.get(`${ this.props.data.api }clients?login=${ this.state.signUp.login }`)
            .then(res =>
            {
                if (res.data.length)
                {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            login: true
                        }
                    }))
                }
            })
        return !this.state.error.login        
    }

    formEmpty = () =>
    { 
        this.setState(prevState => ({
            error: {
                ...prevState.error,
                empty: true
            }
        }))
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
					if (res.data.length && res.data[0].password === this.state.signIn.pwd) {
                        this.props.dataFlow(...res.data[0])
						this.props.history.push('/order')
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

    submitsignUp = async () =>
    { 
        const valid = this.validSignUp() ? await this.validLogin() : false

        if (valid) {
            const model = {
                name: this.state.signUp.name,
                email: this.state.signUp.email,
                login: this.state.signUp.login,
                password: this.state.signUp.pwd,
                list: []
			}
            Axios.post(`${ this.props.data.api }clients`, model)
                .then(res =>
                {
                    this.props.dataFlow(...res.data)
                    this.props.history.push('/order')
                })
		}
    }

    resetErrors = () => this.setState({ error: initState.error })

    toggleForm = () =>
    { 
        this.setState({
            ...initForm,
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

    formSignUp = () => (
        <div className='form sign-up'>
            <h2>Criar conta</h2>
            <small>Campor obrigatórios são marcados com *</small>
            <hr />
            <div className='field-group'>
                <label>Nome *</label>
                <input
                    type='text'
                    name='name'
                    autoComplete='on'
                    data-form='signUp'
                    value={ this.state.signUp.name }
                    onChange={ (e) => this.formFields(e) }
                />
            </div>
            <div className='field-group'>
                <label>Login *</label>
                <input
                    type='text'
                    name='login'
                    autoComplete='on'
                    data-form='signUp'
                    value={ this.state.signUp.login }
                    onChange={ (e) => this.formFields(e) }
                />
            </div>
            <div className='field-group'>
                <label>E-mail *</label>
                <input
                    type='text'
                    name='email'
                    autoComplete='on'
                    data-form='signUp'
                    value={ this.state.signUp.email }
                    onChange={ (e) => this.formFields(e) }
                />
            </div>
            <div className='field-group'>
                <label>Confirmação de E-mail *</label>
                <input
                    type='text'
                    name='emailCheck'
                    autoComplete='on'
                    data-form='signUp'
                    value={ this.state.signUp.emailCheck }
                    onChange={ (e) => this.formFields(e) }
                />
            </div>
            <div className='field-group'>
                <label>Senha *</label>
                <input
                    type='password'
                    name='pwd'
                    autoComplete='on'
                    data-form='signUp'
                    value={ this.state.signUp.pwd }
                    onChange={ (e) => this.formFields(e) }
                />
            </div>
            <div className='field-group'>
                <label>Confirmação de senha *</label>
                <input
                    type='password'
                    name='pwdCheck'
                    autoComplete='on'
                    data-form='signUp'
                    value={ this.state.signUp.pwdCheck }
                    onChange={ (e) => this.formFields(e) }
                />
            </div>
            <div className='error'>
                <span>{this.formError()}</span>
            </div>
            <div className='btn-group'>
                <button
                    className='secondary'
                    disabled={ this.state.loader }
                    onClick={ () => this.toggleForm() }
                >
                    Voltar
                </button>
                <button
                    className='primary'
                    disabled={ this.state.loader }
                    onClick={ () => this.submitsignUp() }
                >
                    { this.state.loader ? <i className='fa fa-spinner fa-pulse'></i> : 'Criar conta' }
                </button>
            </div>
        </div>
    )

    formSignIn = () => (
        <div className='form'>
            <h2>Login</h2>
            <small>Campor obrigatórios são marcados com *</small>
            <hr />
            <div className='field-group'>
                <label>Login *</label>
                <input
                    type='text'
                    name='login'
                    autoComplete='on'
                    data-form='signIn'
                    value={ this.state.signIn.login }
                    onChange={ (e) => this.formFields(e) }
                />
            </div>
            <div className='field-group'>
                <label>Senha *</label>
                <input
                    type='password'
                    name='pwd'
                    autoComplete='on'
                    data-form='signIn'
                    value={this.state.signIn.pwd}
                    onChange={ (e) => this.formFields(e) }
                />
            </div>
            <div className='error'>
                <span>{this.formError()}</span>
            </div>
            <div className='btn-group'>
                <button
                    className='secondary'
                    disabled={ this.state.loader }
                    onClick={ () => this.toggleForm() }
                >
                    Criar conta
                </button>
                <button
                    className='primary'
                    disabled={ this.state.loader }
                    onClick={ () => this.submitSignIn() }
                >
                    { this.state.loader ? <i className='fa fa-spinner fa-pulse' /> : 'login' }
                </button>
            </div>
        </div>
    )

    contentBuild = () => (
        <React.Fragment>
            <div className='content-head text-center'>
                <h1>{ this.state.title }</h1>
                <span>{ this.state.subtitle }</span>
            </div>
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
        </React.Fragment>
    )

    render = () => (
        <div className='container'>
            <Content>
                { this.contentBuild() }
            </Content>
        </div>
    )
}

export default withRouter(Login)

Login.propTypes = {
    dataFlow: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}
