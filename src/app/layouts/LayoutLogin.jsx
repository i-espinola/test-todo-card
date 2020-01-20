// dependencys
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const LayoutLogin = (props) =>
{
    return (
        <div className="hero-login pattern">
            <div className="pattern"></div>
            <div className="login">
                <div className='container'>
                    { props.children }
                </div>
            </div>
        </div>
    )
}

LayoutLogin.propType = {
    children: PropTypes.elementType.isRequired
}

export default withRouter(LayoutLogin)
