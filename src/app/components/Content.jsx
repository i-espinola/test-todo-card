import React from 'react'

// Tools
import PropTypes from 'prop-types'

// Style
import '../assets/scss/_Content.scss'

export default function Content (props)
{
    return (
        <div className='content'>
            <div className='content-head text-center'>
                { props.header }
            </div>
            { props.children }
        </div>
    )
}

Content.propTypes = {
    header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node
    ]).isRequired
}

