// Dependencys
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'

// Components
import { Result, Icon } from 'antd'

// Components children
import Layout from '../../layouts/LayoutDashboard'

const CheckoutCard = (props) =>
{ 
    
    useEffect(() => { if (!props.location.state) props.history.push('/') }, [props])
    
    const { state } = props.location
    const linkCard = `/my-card/${ state.userId }/${ state.cardHash }`

    return (
        <Layout>
            <div className="content-head d-flex align-items-center justify-content-center">
                <h1>Cartão criado com sucesso!</h1>
            </div>
            <div className="content-body">
                <div className="row d-flex align-items-center text-center">
                    <div className="col mt-2 mb-4">
                        <Result
                            icon={ <Icon type="smile" theme="twoTone" /> }
                            title="Seu cartão já esta pronto."
                            subTitle="Guarde o link abaixo em um ligar seguro. Este link da acesso ao cartão."
                        />
                        <Link target="_blank" to={ linkCard }><h5>{ `${ window.location.host }/my-card/${ state.userId }/${ state.cardHash }` }</h5></Link>
                    </div>
                </div>
            </div>
            <div className="content-footer">
                <div className="row">
                    <div className="col mt-2 text-center">
                        <button
                            type="button"
                            className="default"
                            onClick={ () => props.history.push('/dashboard') }
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

CheckoutCard.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            userId: PropTypes.number.isRequired,
            cardHash: PropTypes.number.isRequired,
        })
    })
}

export default withRouter(CheckoutCard)
