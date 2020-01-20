import React from 'react'

// dependencys
import Axios from 'axios'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

//Image
import Brand from '../../assets/images/brand.svg'

const initState = {
    title: 'Login',
    discription: 'Campos obrigatórios são marcados com *',
    loader: false,
    form: {
        login: '',
        pwd: ''
    },
    error: {
        pwd: false,
        login: false,
        empty: false
    },
    msg: {
        empty: 'Preencha todos os campos',
        pwd: 'Senha incorreta',
        login: 'Login não encontrado',
    }
}

export default class SignIn extends React.Component
{
    static propTypes = {
        loginFlow: PropTypes.func.isRequired,
        loginData: PropTypes.shape({
            api: PropTypes.string.isRequired,
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
        const error = this.state.error.login
            ? this.state.msg.login
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
    formSubmit = (e) =>
    {
        e.preventDefault()
        if (this.state.form.login && this.state.form.pwd)
        {
            this.setState({ loader: true })
            Axios.get(`${ this.props.loginData.api }clients?login=${ this.state.form.login }`)
                .then(res =>
                {
                    const user = res.data[0]
                    if (user.password === this.state.form.pwd)
                    {
                        sessionStorage.setItem('id', user.id)
                        this.props.loginFlow({ user: user })
                    }
                    else if (!res.data.length)
                        this.setState(prevState => ({
                            error: { ...prevState.error, login: true }
                        }))
                    else if (user.password !== this.state.form.pwd)
                        this.setState(prevState => ({
                            error: { ...prevState.error, pwd: true }
                        }))
                })
            this.setState({ loader: false })
        } else this.formEmpty()
    }

    /**
     * @param {{ target: { name: string; value: string; }; }} e
     */
    formFields = (e) =>
    {
        const err = this.state.error
        const name = e.target.name
        const value = e.target.value
        this.setState(prevState => ({
            form: { ...prevState.form, [name]: value }
        }))
        if (err.login || err.pwd || err.empty) this.setState({ error: initState.error })
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
                    <label>Senha *</label>
                    <input
                        type='password'
                        name='pwd'
                        autoComplete='on'
                        value={ this.state.form.pwd }
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
                    disabled={ this.state.loader }
                    onClick={ () => this.props.loginFlow({ register: true }) }
                >
                    Criar conta
                </button>
                <button
                    type="submit"
                    className='primary'
                    disabled={ this.state.loader }
                    onClick={ (e) => this.formSubmit(e) }
                >
                    { this.state.loader ? <Icon type="loading" style={ { fontSize: 24 } } spin /> : 'login' }
                </button>
            </div>
        </form>
    )

    render = () => (
        <div className="row justify-content-end">
            <div className="col-auto">
                <div className="container-login">
                    { this.formBuild() }
                </div>
            </div>
        </div>
    )
}
