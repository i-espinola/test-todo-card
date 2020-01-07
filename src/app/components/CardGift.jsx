import React, { useState } from 'react';

// Tools
import PropTypes from 'prop-types'

// Style
import '../assets/scss/_CardGift.scss'

const CardGift = (props) =>
{
    const [cardSideBack, setCardSideBack] = useState(false)

    return (
        <div className="card-gift">
            <div className={ cardSideBack ? 'card flipped' : 'card' }
                onClick={ () => setCardSideBack(!cardSideBack) }
            >
                <div className="side front d-flex justify-content-between">
                    <div className="row">
                        <div className="col d-flex justify-content-end">
                            <img
                                className="brand"
                                src={ props.brand }
                                alt="logotipo"
                            >
                            </img>
                        </div>
                    </div>
                    <div className="row middle">
                        <div className="col text-center">
                            <label>Vale presente</label>
                            <span>
                                <b>`R$ ${ props.value }`</b>
                            </span>
                        </div>
                    </div>
                    <div className="row footer">
                        <div className="col-8">
                            <label>Favorecido</label>
                            <span>{ props.name || props.lastName ? props.name + ' ' + props.lastName : 'Nome Sobrenome' }</span>
                        </div>
                        <div className="col-4">
                            <label>Validade</label>
                            <span>{ props.validity }</span>
                        </div>
                    </div>
                </div>
                <div className="side back d-flex justify-content-between">
                    <div className="row">
                        <div className="d-flex justify-content-end bar-black"></div>
                        <div className="d-flex justify-content-center bar-white"></div>
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
    )
}

export default CardGift

CardGift.propTypes = {
    validity: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    brand: PropTypes.string.isRequired,
    cardSideBack: PropTypes.bool.isRequired,
}

