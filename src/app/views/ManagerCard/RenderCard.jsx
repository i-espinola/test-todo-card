// dependencys
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Axios from 'axios'

// Components
import { Result } from 'antd'

// Components childs
import Layout from '../../layouts/LayoutEmpty'
import CardGift from '../../components/CardGift'

// Image
import Brand from '../../assets/images/brand_white.svg'

const RenderCard = (props) =>
{
    const apiQuery = 'https://todo-cartoes-api.herokuapp.com/api/clients?id='
    const [ cardCredit, setCardCredit ] = useState(false)
    const [ notFound, setNotFound ] = useState(false)
    const [ loader, setLoader ] = useState(false)
    const [dataCard, setDataCard] = useState({
        hash: 0,
        type: '',
        name: '',
        lastName: '',
        content: undefined,
        validData: '',
    })

    useEffect(() =>
    {
        if (!dataCard.hash)
        {
            setLoader(true)
            const { userId, cardHash } = props.match.params
            console.log(props.match.params)
            Axios.get(`${ apiQuery }${ userId }`)
                .then(res =>
                {
                    const card = res.data[0].cards.find(card => card.hash === Number(cardHash))
                    if (typeof (card.content) === "number")
                        setCardCredit(true)
                    setDataCard({ ...card })
                })
                .catch(() => setNotFound(true))
                .finally(() => setLoader(false))
        }
    }, [dataCard.hash, props])

    const cardRender = () => (
        <CardGift
            date={ dataCard.validData }
            loader={ loader }
            brand={ Brand }
            noInfo={ true }
            name={ dataCard.name }
            lastName={ dataCard.lastName }
            value={ cardCredit ? dataCard.content : null }
        />
    )

    const cardNotFound = () => (
        <Result
            status="404"
            title="Cartão não encontrado ou não existe."
            subTitle="Por favor, verifique se o link do seu cartão esta correto."
            extra={
                <button
                    type="button"
                    className="default"
                    onClick={ () => props.history.goBack() }
                >
                    Voltar
            </button>
            }
        />
    )

    return (
        <Layout>
            <div className="row">
                <div className="col d-flex align-items-center justify-content-center">
                    { loader || !notFound ? cardRender() : cardNotFound() }
                </div>
            </div>
        </Layout>
    )
}

RenderCard.propType = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            userId: PropTypes.string.isRequired,
            cardHash: PropTypes.string.isRequired
        })
    })
}

export default withRouter(RenderCard)
