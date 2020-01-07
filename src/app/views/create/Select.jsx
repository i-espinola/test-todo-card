import React from 'react'
import { Switch } from 'antd'

// dependencys
import PropTypes from 'prop-types'
import { Card } from 'antd'

const select = (props) =>
{
    const description = props.dataCreate.stepsDescription
    const active = props.dataCreate.stepActive

    return (
        <React.Fragment>
            <div className="row text-center">
                <div className="col mt-2">
                    <h1>{ description[active] }</h1>
                </div>
            </div>
            <div className="row">
                <div className="col mt-4 d-flex justify-content-center">
                    <Card
                        className="select-card"
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <div className="select-card-header">
                            <Switch
                                checked={ props.dataCreate.cardCredit }
                                onClick={ () => props.flowCreate({ cardCredit: !props.dataCreate.cardCredit }, 'select') }
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
                        className="select-card"
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <div className="select-card-header">
                            <Switch
                                checked={ props.dataCreate.cardDefined }
                                onClick={ () => props.flowCreate({cardDefined: !props.dataCreate.cardDefined}, 'select' ) }
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

export default select

select.propType = {
    flowCreate: PropTypes.func.isRequired,
    dataCreate: PropTypes.object.isRequired,
}
