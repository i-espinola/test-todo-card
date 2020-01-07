import React from 'react'

// dependencys
import Axios from 'axios'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'


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

class SignIn extends React.Component
{
    /**
    * @param {{ loginData: { api: string; }; }} props
    */
    constructor (props)
    {
        super(props)
        this.state = {
            ...initState,
            api: this.props.loginData.api
        }
    }

    formEmpty = () =>
    {
        this.setState(prevState => ({
            error: { ...prevState.error, empty: true }
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
            Axios.get(`${ this.state.api }clients?login=${ this.state.form.login }`)
                .then(res =>
                {
                    if (res.data.length && res.data[0].password === this.state.form.pwd)
                    { 
                        this.props.topFlow(res.data[0])
                        this.props.history.push('/create')
                    }
                    else if (!res.data.length)
                        this.setState(prevState => ({
                            error: { ...prevState.error, login: true }
                        }))
                    else if (res.data[0].password !== this.state.form.pwd)
                        this.setState(prevState => ({
                            error: { ...prevState.error, pwd: true }
                        }))
                })
                .finally(() => this.setState({ loader: false }))
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
            <span className="description">{ this.state.discription }</span>
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
        <React.Fragment>
            <div className='content-head text-center'>
                <h1>{ this.state.title }</h1>
            </div>
            <div className='content-body pt-0 pb-0'>
                <div className='row d-flex align-items-center'>
                    <div className='col text-center d-flex justify-content-center'>
                        { this.formBuild() }
                    </div>
                    <div className='col pl-0 pr-0'>
                        <div className='bg-login' />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(SignIn)

SignIn.propTypes = {
    topFlow: PropTypes.func.isRequired,
    loginFlow: PropTypes.func.isRequired,
    loginData: PropTypes.shape({
        api: PropTypes.string
    })
}
