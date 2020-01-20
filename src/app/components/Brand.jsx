import React from 'react'

// Tools
import { Link } from 'react-router-dom'

// Style
import '../assets/scss/_Brand.scss'

//Image
import Brand from '../assets/images/brand_white.svg'

export default (props) => (
    <aside className='brand'>
        <Link to='/'>
            <img src={ Brand } alt='Logotipo' width={ props.width || 'auto' }></img>
        </Link>
    </aside>
)

