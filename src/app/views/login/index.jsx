import React from 'react'

// dependencys
import PropTypes from 'prop-types'

// Components Childs
import Content from '../../components/Content'
import SignIn from './SignIn'
import SignUp from './SignUp'

// Style
import '../../assets/scss/Login.scss'

const initState = {
    register: false,
    loader: false,
}

export default class Login extends React.Component
{
    /**
     * @param {{ topData: { api: string; }; }} props
     */
    constructor (props)
    {
        super(props)
        this.state = {
            ...initState,
            api: props.topData.api
        }
        this.loginFlow = this.loginFlow.bind(this)
    }
    
    /**
     * @param {object} data
     */
    loginFlow = (data) => this.setState(data)

    render = () => (
        <div className='container'>
            <Content>
                {
                    this.state.register
                        ? <SignUp loginData={ this.state } loginFlow={ this.loginFlow } topFlow={ this.props.topFlow } />
                        : <SignIn loginData={ this.state } loginFlow={ this.loginFlow } topFlow={ this.props.topFlow } />
                }
            </Content>
        </div>
    )
}

Login.propTypes = {
    topFlow: PropTypes.func.isRequired,
    topData: PropTypes.shape({
        api: PropTypes.string.isRequired
    }).isRequired
}
