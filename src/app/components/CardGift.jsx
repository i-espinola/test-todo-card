import React from 'react'

// Tools
import PropTypes from 'prop-types'

// Style
import '../assets/scss/_CardGift.scss'

const CardGift = (props) => (

    <div className="card-gift">
        <div className={ props.cardSideBack ? 'card flipped' : 'card' }
            onClick={ () => props.toggle({ cardSideBack: !props.cardSideBack }) }
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
                            <b>{ `R$ ${props.value}` }</b>
                        </span>
                    </div>
                </div>
                <div className="row footer">
                    <div className="col-8">
                        <label>Beneficiário</label>
                        <span>{ props.recipient }</span>
                    </div>
                    <div className="col-4">
                        <label>Expira em</label>
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

export default CardGift

CardGift.propTypes = {
    cardSideBack: PropTypes.bool.isRequired,
    recipient: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    brand: PropTypes.string.isRequired,
    validity: PropTypes.string.isRequired,
    value: PropTypes.string,
}

