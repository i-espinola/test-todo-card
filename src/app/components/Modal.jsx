import React from 'react'

// Tools
import PropTypes from 'prop-types'

// Style
import '../assets/scss/_Modal.scss'

// Components Childs
import Brand from './Brand'

const Modal = (props) => (
    <div className={ props.display ? 'modal' : 'd-none' }>
        <div className='modal-content'>
            <div className='modal-head'>
                <Brand />
                <span>campos marcados com * são obrigatórios</span>
            </div>
            { props.children }
        </div>
    </div>
)

export default Modal

Modal.propTypes = {
    display: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}
