// Dependencys
import React from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import { List, Card, Icon, Modal } from 'antd'
// Components children
import Layout from '../../layouts/LayoutDashboard'

class ManagerLists extends React.Component
{
    static propType = {
        topFlow: PropTypes.func.isRequired,
        topData: PropTypes.shape({
            api: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.number.isRequired,
                lists: PropTypes.array
            })
        }),
    }

    state = {
        mylists: [],
    }

    /**
     * Chama o modal de confirmação de exclusão de lista
     * @param {{ name: string; id: number; }} item{}
     */
    confirmRemove = (item) =>
    {
        const { confirm } = Modal

        confirm({
            title: 'Excluir',
            content: `Deseja mesmo excluir a lista ${ item.name }?`,
            okText: 'Excluir',
            cancelText: 'Cancelar',
            onOk: () => this.removeList(item.id),
            onCancel: () => false
        })
    }

    /**
    * Remove a lista solicitada pelo parametro
    * @param {number} id
    */
    removeList = async (id) =>
    {
        const { user } = this.props.topData
        const deleteList = user.lists.filter(list => list.id !== id)
        const req = `${ this.props.topData.api }clients/${ user.id }`
        user.lists = deleteList
        await Axios.put(req, user)
            .then(res =>
                this.props.topFlow({ user: { ...res.data } })
            )
    }

    /**
    * Lista todos os cards
    * @param {{ id: number; name: string; itens: array[]; }} list
    */
    listRender = (list) =>
    {
        const { Meta } = Card

        return (
            <List.Item>
                <Card
                    key={ list.id }
                    extra={ [
                        <Icon type="close" key="remove-list" onClick={ () => this.confirmRemove(list) } />
                    ] }
                    title={ list.name }
                >
                    <Meta
                        description={ `Itens: ${ list.itens.length }` }
                    />
                </Card>
            </List.Item>
        )
    }

    /**
    * Cria cards das listas existentes
    */
    cardsList = () =>
    {
        const { user } = this.props.topData
        const paginate = user.id ? user.lists.length > 10 ? { pageSize: 10 } : false : false

        return (
            <List
                itemLayout="horizontal"
                bordered={ false }
                locale={ { emptyText: 'Você não tem lista' } }
                pagination={ paginate }
                dataSource={ this.props.topData.user.lists }
                renderItem={ (lists) => this.listRender(lists) }
                grid={ {
                    gutter: 15,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                } }
            />
        )
    }

    componentDidMount = () => { if (!this.props.topData.user.id) this.props.history.push('/') }

    render = () => (
        <Layout>
            <div className="content-head d-flex align-items-center justify-content-center">
                <h1>Listas de presentes</h1>
            </div>
            <div className="content-body">
                <div className="row d-flex align-items-center">
                    <div className="col mt-2 mb-4">
                        { this.cardsList() }
                    </div>
                </div>
            </div>
            <div className="content-footer">
                <div className="row">
                    <div className="col mt-2">
                        <button
                            type="button"
                            className="default"
                            onClick={ () => this.props.history.goBack() }
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(ManagerLists)
