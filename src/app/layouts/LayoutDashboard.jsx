// dependencys
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components children
import Content from '../components/Content'
import Header from '../components/Header'

const LayoutDashboard = (props) => (
    <React.Fragment>
        <Header />
        <div className="container">
            <Content>
                { props.children }
            </Content>
        </div>
    </React.Fragment>
)

LayoutDashboard.propType = {
    children: PropTypes.elementType.isRequired
}

export default withRouter(LayoutDashboard)
