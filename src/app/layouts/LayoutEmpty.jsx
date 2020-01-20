// dependencys
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const LayoutEmpty = (props) => (
    <React.Fragment>
        <div className='container'>
            { props.children }
        </div>
    </React.Fragment>
)

LayoutEmpty.propType = {
    children: PropTypes.elementType.isRequired
}

export default withRouter(LayoutEmpty)
