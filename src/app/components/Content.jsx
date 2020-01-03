import React from 'react'

// Tools
import PropTypes from 'prop-types'

// Style
import '../assets/scss/_Content.scss'

const Content = (props) => (
    <div className='content'>
        { props.children }
    </div>
)

export default Content

Content.propTypes = {
    children: PropTypes.node.isRequired
}

