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
                <h1>Selecione o tipo de cartão gift</h1>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-auto mt-4 d-flex justify-content-center">
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
                        <p>
                            No cartão crédito você define um valor(R$) de crédito ao cartão gift, desta forma,
                            o beneficiário sera contemplado com um valor moeda para consumir no estabelecimento
                            até que o valor total do cartão seja esgotado.
                        </p>
                </Card>
            </div>
            <div className="col-auto mt-4 d-flex justify-content-center">
                <Card
                    className="type-card"
                    onClick={ () => props.createFlow({ cardList: !props.createData.cardList }) }
                >
                    <div className="type-card-header">
                        <Switch
                            checked={ props.createData.cardList }
                        />
                        <h6>Cartão lista</h6>
                    </div>
                        <p>
                            O Cartão lista tem como conteúdo uma ou várias listas de presente que você tem.
                            Você pode adicionar itens a uma nova lista e calcular o valor total da lista e 
                            valor médio dos itens inclusos em cada lista de presentes que você criar.
                        </p>
                </Card>
            </div>
        </div>
    </React.Fragment>
)

select.propType = {
    createFlow: PropTypes.func.isRequired,
    createData: PropTypes.shape({
        cardList: PropTypes.bool.isRequired,
        cardCredit: PropTypes.bool.isRequired,
    }).isRequired
}

export default select
