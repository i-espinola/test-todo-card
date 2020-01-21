// dependencys
import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Descriptions } from 'antd'

// Components childs
import CardGift from '../../components/CardGift'

// Image
import Brand from '../../assets/images/brand_white.svg'

const CheckCard = (props) =>
{
    /**
    * Recebe a data de validade do cartão do componente CardGift.jsx
     */
    const getDateCard = (date) =>
    { 
        props.createFlow({ validData: date })
    }

    /**
    * Formata para renderizar valores na moeda Brasileira Real
    */
    const currencyFormat = (num) => `R$ ${ num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') }`

    /**
    * Calcula os valores dos itens se o tipo de cartao é lista
    */
    const listDescriptions = (props) =>
    {
        const ids = props.createData.lists.map(list => list.key )
        const lists = props.createData.user.lists.filter(list => ids.includes(list.id))
        let total = 0, itens = 0, names = []

        lists.map((list, index) =>
        {
            const and = lists.length > 1 && lists.length === index + 1 ? ';' : ''

            names.push(and + list.name)
            list.itens.map(item =>
            {
                itens++
                total += item.price
                return false
            })

            return false
        })

        const coinTotal = currencyFormat(total)
        const coinMedium = currencyFormat(total / itens)
        const labels = `${ names.toString().replace(/,;/g, ' e ').replace(/,/g, ', ') }.`

        return (
            <React.Fragment>
                <Descriptions.Item label={ props.createData.lists.length > 1 ? 'Listas' : 'Lista' }>{ labels }</Descriptions.Item>
                <Descriptions.Item label="Quantidade total de itens">{ itens }</Descriptions.Item>
                <Descriptions.Item label="Valor total de itens">{ coinTotal }</Descriptions.Item>
                <Descriptions.Item label="Valor médio dos itens">{ coinMedium }</Descriptions.Item>
            </React.Fragment>
        )
    }

    /**
    * Renderiza as descrições do cartão a ser criado
    */
    const descriptions = (props) =>
    {
        const typeCard = props.createData.cardCredit ? 'Crédito' : props.createData.cardList ? 'Lista' : ''

        return (
            <React.Fragment>
                <Descriptions
                    size="default"
                    layout="vertical"
                    column={ { xs: 1, sm: 2, md: 3 } }
                >
                    {
                        props.createData.cardCredit
                            ? <Descriptions.Item label="Valor do cartão">{ currencyFormat(props.createData.value) }</Descriptions.Item>
                            : listDescriptions(props)
                    }
                    <Descriptions.Item label="Tipo de cartão">{ typeCard }</Descriptions.Item>
                    <Descriptions.Item label="Validade do cartão">{ props.createData.validData }</Descriptions.Item>
                    <Descriptions.Item label="Nome do favorecido">{ `${ props.createData.name } ${ props.createData.lastName }` }</Descriptions.Item>

                </Descriptions>
                <hr />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className="row text-center">
                <div className="col mt-2 mb-4">
                    <h1>Confirme os dados do cartão</h1>
                </div>
            </div>
            <div className="row text-center d-flex align-items-center">
                <div className="col">
                    { descriptions(props) }
                </div>
            </div>
            <div className="row d-flex align-items-center">
                <div className="col d-flex justify-content-center">
                    <CardGift
                        brand={ Brand }
                        name={ props.createData.name }
                        lastName={ props.createData.lastName }
                        value={ props.createData.value }
                        getDateCard={ getDateCard }
                        noInfo={ true }
                    />
                </div>
            </div>
        </React.Fragment>
    )
}

CheckCard.propType = {
    topFlow: PropTypes.func.isRequired,
    endPoint: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
}

export default CheckCard
