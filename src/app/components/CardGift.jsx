import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

// Tools
import PropTypes from 'prop-types'

// Style
import '../assets/scss/_CardGift.scss'

const CardGift = (props) =>
{
    const loader = () => <Skeleton />
    const msgInfo = props.noInfo ? '' : '* Validade de 90 dias a partir da data de criação.' 
    const [cardFlip, setCardFlip] = useState(false)
    const [date, setDate] = useState('')
    
    if (!date)
    {
        const validity = new Date(Date.now() + (90 * 24 * 60 * 60 * 1000))
        const dateFormat = validity.toLocaleDateString('pt-BR')
        if (props.getDateCard) props.getDateCard(dateFormat)
        setDate(dateFormat)
    }

    return (
        <React.Fragment>
            <div className="card-gift">
                <div className={ cardFlip ? 'card flipped' : 'card' }
                    onClick={ () => setCardFlip(!cardFlip) }
                >
                    <div className="side front d-flex justify-content-between">
                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                <img
                                    className="brand"
                                    src={ props.brand }
                                    alt="logotipo"
                                >
                                </img>
                            </div>
                        </div>
                        <div className="row middle">
                            <div className="col text-center align-items-center justify-content-center">
                                <label>Vale presente</label>
                                <span>
                                    <b>{ props.value ? `R$ ${ props.value }` : '' }</b>
                                </span>
                            </div>
                        </div>
                        <div className="row footer">
                            <div className="col-9">
                                <label>Favorecido</label>
                                <span className='text-nowrap'>
                                    {
                                        props.loader
                                            ? loader()
                                            : props.name || props.lastName
                                                ? props.name + ' ' + props.lastName
                                                : 'Nome Sobrenome'
                                    }
                                </span>
                            </div>
                            <div className="col-3">
                                <label>Validade</label>
                                <span>
                                    {
                                        props.loader
                                            ? loader()
                                            : props.date
                                                ? props.date
                                                : date
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="side back d-flex justify-content-between">
                        <div className="row">
                            <div className="d-flex justify-content-end bar-black"></div>
                            <div className="d-flex justify-content-center bar-white msg">Os melhores presentes também estão nos menores frascos</div>
                        </div>
                        <div className="row"></div>
                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                <img
                                    className="brand"
                                    src={ props.brand }
                                    alt="logotipo"
                                ></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <small>{ msgInfo }</small>
            </div>
        </React.Fragment>
    )
}

CardGift.propTypes = {
    getDateCard: PropTypes.func,
    brand: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    loader: PropTypes.bool,
    date: PropTypes.string,
    noInfo: PropTypes.bool,
}

export default CardGift
