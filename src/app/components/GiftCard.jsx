import React from 'react'

// Tools
import PropTypes from 'prop-types'

// Style
import '../assets/scss/_GiftCard.scss'

const GiftCard = (props) =>
{
    return (
        <div className="gift-card">
            <div className={ props.cardSide ? 'card flipped' : 'card' } onClick={ () => props.toggleCard() }>
                { props.children}
            </div>
        </div>
    )
 }

export default GiftCard

GiftCard.propTypes = {
    children: PropTypes.element.isRequired,
    toggleCard: PropTypes.func.isRequired,
    cardSide: PropTypes.bool.isRequired,
}

