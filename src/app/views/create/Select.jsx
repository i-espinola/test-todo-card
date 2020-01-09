import React from 'react'
import { Switch } from 'antd'

// dependencys
import PropTypes from 'prop-types'
import { Card } from 'antd'

const select = (props) =>
{
    return (
        <React.Fragment>
            <div className="row text-center">
                <div className="col mt-2">
                    <h1>{ props.createData.stepsDescription[props.createData.stepActive] }</h1>
                </div>
            </div>
            <div className="row">
                <div className="col mt-4 d-flex justify-content-center">
                    <Card className="select-card">
                        <div className="select-card-header">
                            <Switch
                                checked={ props.createData.cardCredit }
                                onClick={ () => props.createFlow({ cardCredit: !props.createData.cardCredit }, 'select') }
                            />
                            <h6>Cartão crédito</h6>
                        </div>
                        <p>Este tipo de cartão, é definido um valor(R$) de crédito ao cartão gift, desta forma,
                            o beneficiário sera contemplado com um valor moeda para gastar no estabelecimento
                            até que o valor total do cartão seja esgotado.</p>
                    </Card>
                </div>
                <div className="col mt-4 d-flex justify-content-center">
                    <Card className="select-card">
                        <div className="select-card-header">
                            <Switch
                                checked={ props.createData.cardDefined }
                                onClick={ () => props.createFlow({cardDefined: !props.createData.cardDefined}, 'select' ) }
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
}

select.propType = {
    createFlow: PropTypes.func.isRequired,
    createData: PropTypes.shape({
        stepsDescription: PropTypes.array.isRequired,
        stepActive: PropTypes.number.isRequired,
        cardDefined: PropTypes.bool.isRequired,
        cardCredit: PropTypes.bool.isRequired,
    }).isRequired
}

export default select
