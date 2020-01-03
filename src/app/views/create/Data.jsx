import React from 'react'

// Components Childs
import CardCredit from './CardCredit'
import CardDefined from './CardDefined'

const Data = (props) => (
    props.dataCreate.cardCredit
        ? <CardCredit />
        : <CardDefined /> 
)

export default Data
