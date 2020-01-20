// dependencys
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import { Card, Icon, List } from 'antd'

// Components children
import Layout from '../../layouts/LayoutDashboard'

const Dashboard = (props) =>
{

    const { Meta } = Card

    const ManagerCard = () => (
        <List.Item>        
            <Card
                actions={ [
                    <Icon type="plus" key="add-card" onClick={ () => props.history.push('/create-card') } />,
                    <Icon type="setting" key="setting-card" onClick={ () => props.history.push('/cards') } />,
                ] }
            >
                <Meta
                    avatar={
                        <Icon type="credit-card" />
                    }
                    title="Cartão gift"
                    description="Crie e gerencie seus cartões gift ativos"
                />
            </Card>
        </List.Item>
    )
    const ManagerList = () => (
        <List.Item>        
            <Card
                actions={ [
                    <Icon type="plus" key="add-list" onClick={ () => props.history.push('/create-list') } />,
                    <Icon type="setting" key="setting-list" onClick={ () => props.history.push('/lists') } />,
                ] }
            >
                <Meta
                    avatar={
                        <Icon type="appstore" />
                    }
                    title="Lista de presentes"
                    description="Crie e gerencie suas listas de produtos"
                />
            </Card>
        </List.Item>
    )

    useEffect(() => { if (!props.topData.user.id) props.history.push('/') }, [props])

    return (
            <Layout>
                <div className="content-head text-center">
                    <h1> Painel de controle </h1>
                    <span>gerencie cartões e listas de presentes</span>
                </div>
                <div className="content-body">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-auto mt-2 mb-4">{ ManagerCard() }</div>
                        <div className="col-auto mt-2 mb-4">{ ManagerList() }</div>
                    </div>
                </div>
            </Layout>
    )
}

Dashboard.propType = {
    topFlow: PropTypes.func.isRequired,
    topData: PropTypes.shape({
        api: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            cards: PropTypes.array
        })
    }),
}

export default withRouter(Dashboard)
    