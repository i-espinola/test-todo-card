import React from 'react'

// Tools
import { Link } from 'react-router-dom'

// Style
import '../assets/scss/_Brand.scss'

//Image
import Brand from '../assets/images/brand.svg'

export default props =>
(
    <aside className='brand'>
        <Link to='/'>
            {/* <b>Boilerplate</b>React<i>.</i>app */}
                <img src={ Brand } alt='Logotipo Todo Cartões' width={ props.width || null }></img>
        </Link>
    </aside>
)

