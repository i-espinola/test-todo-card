// dependencys
import React from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components Childs
import Layout from '../../layouts/LayoutLogin'
import SignIn from './_SignIn'
import SignUp from './_SignUp'

// Style
import '../../assets/scss/Login.scss'

class Login extends React.Component
{
    static propTypes = {
        topFlow: PropTypes.func.isRequired,
        topData: PropTypes.shape({
            api: PropTypes.string.isRequired,
            user: PropTypes.object.isRequired,
        }).isRequired
    }

    /**
     * @param {{ topData: { api: string; }; }} props
     */
    constructor (props)
    {
        super(props)
        this.state = {
            register: false,
            loader: false,
            api: this.props.topData.api,
        }
        this.loginFlow = this.loginFlow.bind(this)
    }
    
    /**
     * @param {object} data
     */
    loginFlow = (data) => this.setState(data)

    sessionLogin = () =>
    {
        const id = sessionStorage.getItem('id')
        if (id)
        {
            Axios.get(`${ this.props.topData.api }clients?id=` + id)
            .then(res => this.setState({ user: res.data[0] }) )
            .catch(() => { sessionStorage.clear() })
        }
    }

    componentDidUpdate = (prevProps, prevState) =>
    {
        const { user } = this.state
        if (user && !prevState.hasOwnProperty('user'))
        { 
            this.props.topFlow({ user: user })
            this.props.history.push('/dashboard')
        }
    }

    componentDidMount = () => this.sessionLogin()

    render = () => (
        <Layout>
            {
                this.state.register
                    ? <SignUp loginData={ this.state } loginFlow={ this.loginFlow } />
                    : <SignIn loginData={ this.state } loginFlow={ this.loginFlow } />
            }
        </Layout>
    )
}

export default withRouter(Login)
