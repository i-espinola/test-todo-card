import React from 'react'

// dependencys
import Axios from 'axios'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

//Image
import Brand from '../../assets/images/brand.svg'

const initState = {
    title: 'Criar conta',
    discription: 'Campos obrigatórios são marcados com *',
    form: {
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
        login: 'Login indisponível - Tente outro login',
        pwd: 'A senha e confirmação não são idênticas',
        email: 'O e-mail e confirmação não são idênticos',
    }
}

export default class SignUp extends React.Component
{
    static propTypes = {
        loginFlow: PropTypes.func.isRequired,
        loginData: PropTypes.shape({
            api: PropTypes.string.isRequired,
            loader: PropTypes.bool.isRequired,
            register: PropTypes.bool.isRequired,
        }).isRequired
    }
    
    /**
     * @param {{ loginData: { api: string; }; }} props
     */
    constructor (props)
    {
        super(props)
        this.state = initState
    }

    formValid = () =>
    {
        const form = this.state.form

        if (form.name && form.login && form.email && form.emailCheck && form.pwd && form.pwdCheck)
        {
            const checkEmail = form.email === form.emailCheck
                ? true
                : this.setState(prevState => ({
                    error: { ...prevState.error, email: true }
                }))
            const checkPwd = form.pwd === form.pwdCheck
                ? true
                : this.setState(prevState => ({
                    error: { ...prevState.error, pwd: true }
                }))

            return checkEmail && checkPwd ? true : false
        } else this.formEmpty()
    }

    validLogin = async () =>
    {
        await Axios.get(`${ this.props.loginData.api }clients?login=${ this.state.form.login }`)
            .then(res =>
            {
                if (res.data.length) this.setState(prevState => ({
                    error: { ...prevState.error, login: true }
                }))
            })

        return !this.state.error.login
    }

    formEmpty = () => this.setState(prevState => ({ error: { ...prevState.error, empty: true } }))

    formError = () =>
    {
        const error = this.state.error.login
            ? this.state.msg.login
            : this.state.error.email
                ? this.state.msg.email
                : this.state.error.pwd
                    ? this.state.msg.pwd
                    : this.state.error.empty
                        ? this.state.msg.empty
                        : '⠀'

        return error
    }

    /**
     * @param {{ preventDefault: () => void; }} e
     */
    formSubmit = async (e) =>
    {
        e.preventDefault()
        const valid = this.formValid() ? await this.validLogin() : false

        if (valid)
        {
            const model = {
                name: this.state.form.name,
                email: this.state.form.email,
                login: this.state.form.login,
                password: this.state.form.pwd,
                lists: [],
                cards: [],
            }
            Axios.post(`${ this.props.loginData.api }clients`, model)
                .then(res =>
                {
                    sessionStorage.setItem('id', res.data.id)
                    this.props.loginFlow({ user: res.data })
                })
        }
    }

    /**
     * @param {{ target: { name: string; value: string; }; }} e
     */
    formFields = (e) =>
    {
        const err = this.state.error
        const name = e.target.name
        const value = e.target.value

        this.setState(prevState => ({ form: { ...prevState.form, [name]: value } }))
        if (err.email || err.login || err.pwd || err.empty) this.setState({ error: initState.error })
    }

    formBuild = () => (
        <form method="post">
            <div>
                <img src={ Brand } alt='Logotipo' width='auto'></img>
                <h1>{ this.state.title }</h1>
                <span className="description">{ this.state.discription }</span>
            </div>
            <div className='field-group'>
                <div>
                    <label>Nome *</label>
                    <input
                        type='text'
                        name='name'
                        autoComplete='on'
                        value={ this.state.form.name }
                        onChange={ (e) => this.formFields(e) }
                    />
                </div>
                <div>
                    <label>Login *</label>
                    <input
                        type='text'
                        name='login'
                        autoComplete='on'
                        value={ this.state.form.login }
                        onChange={ (e) => this.formFields(e) }
                    />
                </div>
            </div>
            <div className='field-group'>
                <div>
                    <label>E-mail *</label>
                    <input
                        type='text'
                        name='email'
                        autoComplete='on'
                        value={ this.state.form.email }
                        onChange={ (e) => this.formFields(e) }
                    />
                </div>
                <div>
                    <label>Confirmação de E-mail *</label>
                    <input
                        type='text'
                        name='emailCheck'
                        autoComplete='on'
                        value={ this.state.form.emailCheck }
                        onChange={ (e) => this.formFields(e) }
                    />
                </div>
            </div>
            <div className='field-group'>
                <div>
                    <label>Senha *</label>
                    <input
                        type='password'
                        name='pwd'
                        autoComplete='on'
                        value={ this.state.form.pwd }
                        onChange={ (e) => this.formFields(e) }
                    />
                </div>
                <div>
                    <label>Confirmação de senha *</label>
                    <input
                        type='password'
                        name='pwdCheck'
                        autoComplete='on'
                        value={ this.state.form.pwdCheck }
                        onChange={ (e) => this.formFields(e) }
                    />
                </div>
            </div>
            <div className='error'>
                <span>{ this.formError() }</span>
            </div>
            <div className='btn-group'>
                <button
                    type="button"
                    className='secondary'
                    disabled={ this.props.loginData.loader }
                    onClick={ () => this.props.loginFlow({ register: false }) }
                >
                    Voltar
                </button>
                <button
                    type="submit"
                    className='primary'
                    disabled={ this.props.loginData.loader }
                    onClick={ (e) => this.formSubmit(e) }
                >
                    { this.props.loginData.loader ? <Icon type="loading" style={ { fontSize: 24 } } spin /> : 'Criar conta' }
                </button>
            </div>
        </form>
    )

    render = () => (
        <div className="row justify-content-center">
            <div className="col-auto">
                <div className="container-login">
                    { this.formBuild() }
                </div>
            </div>
        </div>
    )
}
