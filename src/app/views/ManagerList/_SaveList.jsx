import React, { useState } from 'react';

// dependencys
import Axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import { Card, List, Descriptions, Modal, Icon } from 'antd'

const SaveList = (props) =>
{
    const [listName, setListName] = useState('')
    const [pageSize] = useState(20)

    /**
     * Salva o nova lista criada na base de dados do usuário em questão
     * @param {{ preventDefault: () => void; }} event
     */
    const submit = (event) =>
    {
        event.preventDefault()
        const { user } = props
        const req = `${ props.endPoint }clients/${ user.id }`
        const listId = user.lists.length + 1
        const newList = {
            name: listName,
            itens: props.listSelected,
            id: listId
        }
        user.lists.push(newList)
        Axios.put(req, user)
            .then(res => props.topFlow({ user: { ...res.data } }))
        props.history.push('/dashboard')
    }

    /**
    * Modal de confirmação de deletar item da lista
    * @param {{ name: string; id: number; }} item
    */
    const confirmRemove = (item) =>
    {
        const { confirm } = Modal

        confirm({
            title: 'Excluir',
            content: `Deseja mesmo excluir o item ${ item.name } da sua lista?`,
            okText: 'Excluir',
            cancelText: 'Cancelar',
            onOk: () => unSelect(item.id),
            onCancel: () => false
        })
    }

    /**
    * Renderiza o formulário de salvar a lista
    */
    const form = () => (
        <div className="row">
            <form className="save d-flex align-items-end justify-content-between" method='post'>
                <div className="col">
                    <small>Nome da lista</small>
                    <input
                        type='text'
                        name='listName'
                        autoComplete='off'
                        value={ listName }
                        onChange={ (e) => setListName(e.target.value) }
                    />
                </div>
                <div className="col btn-group">
                    <button
                        className="default"
                        type="button"
                        onClick={ () => props.createListFlow({ save: false }) }
                    >
                        Voltar
                    </button>
                    <button
                        type="submit"
                        className="primary"
                        disabled={ listName.length ? false : true }
                        onClick={ (e) => submit(e) }
                    >
                        Salvar lista
                    </button>
                </div>
            </form>
        </div>
    )

    /**
    * Função que remove um item da lista
    * @param {number} id
    */
    const unSelect = (id) =>
    {

        const unSelect = props.listSelected.filter(item => item.id !== id)
        const data = {
            listSelected: unSelect,
            save: !unSelect.length ? false : true
        }

        props.createListFlow(data)
    }

    /**
    * Renderiza os cards da lista de produtos
    */
    /**
     * @param {{ id: number; name: string; price: number; image: string; }} item
     */
    const cards = (item) =>
    {
        const { Meta } = Card

        return (
            <List.Item>
                <Card
                    key={ item.id }
                    title={ item.name }
                    extra={ [
                        <Icon type="close" key="remove-item" onClick={ () => confirmRemove(item) } />
                    ] }
                >
                    <Meta
                        description={ `R$ ${ item.price }` }
                    />
                </Card>
            </List.Item>
        )
    }

    /**
    * Função renderiza a lista e faz a paginação da mesma
    */
    const list = () =>
    {
        const listRender = props.listSelected
        const paginate = listRender.length > pageSize ? { pageSize: pageSize } : false

        return (
            <List
                grid={ {
                    gutter: 20,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                } }
                itemLayout="horizontal"
                bordered={ false }
                locale={ { emptyText: 'Nada encontrado' } }
                pagination={ paginate }
                dataSource={ listRender }
                renderItem={ (products) => cards(products) }
            />
        )
    }

    /**
    * Renderiza os dados de lista de produtos selecionada
    */
    const descriptions = () =>
    {
        let values = []
        let valueTotal, valueMid = undefined

        props.listSelected.map(item => values.push(item.price))
        valueTotal = (values.reduce((a, b) => a + b)).toFixed(2)
        valueMid = (valueTotal / values.length).toFixed()

        return (
            <React.Fragment>
                <label>Dados da lista</label>
                <Descriptions layout="vertical">
                    <Descriptions.Item label="Total de itens">{ props.listSelected.length }</Descriptions.Item>
                    <Descriptions.Item label="Valor total de itens">{ `R$ ${ valueTotal }` }</Descriptions.Item>
                    <Descriptions.Item label="Valor médio de itens">{ `R$ ${ valueMid }` }</Descriptions.Item>
                </Descriptions>
                <hr />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className='content-head d-flex align-items-center justify-content-center'>
                <h1>Salvar lista de presentes</h1>
            </div>
            <div className="content-body">
                <div className="row d-flex align-items-center justify-content-between mt-3">
                    <div className="col">
                        { descriptions() }
                    </div>
                </div>
                <div className="row d-flex align-items-center justify-content-between mt-3">
                    <div className="col">
                        <label className="mb-3">Produtos selecionados</label>
                    </div>
                </div>
                <div className="row d-flex align-items-center">
                    <div className="col">
                        <div className="card-products">
                            { list() }
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-footer"> { form() } </div>
        </React.Fragment>
    )
}

SaveList.propType = {
    createListFlow: PropTypes.func.isRequired,
    listSelected: PropTypes.array.isRequired,
    endPoint: PropTypes.string.isRequired,
    topFlow: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        lists: PropTypes.array.isRequired
    }),
}

export default withRouter(SaveList)
