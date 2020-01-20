// dependencys
import React from 'react'
import { Switch } from 'antd'
import PropTypes from 'prop-types'

// Components
import { Card } from 'antd'

const select = (props) =>
(
    <React.Fragment>
        <div className="row text-center">
            <div className="col mt-2 mb-4">
                <h1>{ props.createData.stepsDescription[props.createData.stepActive] }</h1>
            </div>
        </div>
        <div className="row">
            <div className="col mt-4 d-flex justify-content-center">
                <Card
                    className="type-card"
                    onClick={ () => props.createFlow({ cardCredit: !props.createData.cardCredit }) }
                >
                    <div className="type-card-header">
                        <Switch
                            checked={ props.createData.cardCredit }
                        />
                        <h6>Cartão crédito</h6>
                    </div>
                    <p>Este tipo de cartão, é definido um valor(R$) de crédito ao cartão gift, desta forma,
                        o beneficiário sera contemplado com um valor moeda para gastar no estabelecimento
                        até que o valor total do cartão seja esgotado.</p>
                </Card>
            </div>
            <div className="col mt-4 d-flex justify-content-center">
                <Card
                    className="type-card"
                    onClick={ () => props.createFlow({ cardList: !props.createData.cardList }) }
                >
                    <div className="type-card-header">
                        <Switch
                            checked={ props.createData.cardList }
                        />
                        <h6>Cartão pré-definido</h6>
                    </div>
                    <p>O Cartão pré-definido define itens pré-definidos a partir de uma lista personalizada 
                        que você poderá criar, ou simplesmente selecionar itens avulsos ao cartão gift.</p>
                </Card>
            </div>
        </div>
    </React.Fragment>
)

select.propType = {
    createFlow: PropTypes.func.isRequired,
    createData: PropTypes.shape({
        stepsDescription: PropTypes.array.isRequired,
        stepActive: PropTypes.number.isRequired,
        cardList: PropTypes.bool.isRequired,
        cardCredit: PropTypes.bool.isRequired,
    }).isRequired
}

export default select