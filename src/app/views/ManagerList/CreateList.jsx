// Dependencys
import React from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import Layout from '../../layouts/LayoutDashboard'
import { Card, Slider, List, Select } from 'antd'

// Components children
import SaveList from './_SaveList'

const initState = {
    loader: false,
    save: false,
    pageSize: 20,
}

const initLists = {
    list: [],
    listFiltered: [],
    listSelected: [],
}

const initOrder = {
    order: {
        priceUp: false,
        priceDown: false,
        name: false
    }
}

const initFormFilter = {
    search: '',
    slider: {
        range: [],
        marks: {},
        min: 0,
        max: 0
    }
}

class CreateList extends React.Component
{

    static propType = {
        topFlow: PropTypes.func.isRequired,
        topData: PropTypes.shape({
            api: PropTypes.string.isRequired,
            user: PropTypes.object.isRequired
        }).isRequired
    }

    /**
    * @param {object} props
    */
    constructor (props)
    {
        super(props)
        this.state = {
            ...initState,
            ...initLists,
            ...initFormFilter,
            ...initOrder,
            endPoint: this.props.topData.api,
            user: this.props.topData.user,
        }
        this.createListFlow = this.createListFlow.bind(this)
    }

    /**
    * @param {object} data
    */
    createListFlow = (data) => this.setState(data)

    /**
    * Busca a lista de produtos, organiza em ordem alfabética e guarda a lista no objeto this.state.list
    */
    getProducts = () =>
    {
        Axios.get(`${ this.state.endPoint }products`)
            .then((res) =>
            {
                res.data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : null)
                this.setState(({
                    list: [...res.data],
                    order: {
                        ...initOrder,
                        name: true
                    }
                }), () => this.sliderSet())
            })
            .finally(() => this.setState({ loader: false }))
    }

    /**
    * Seta o componente Slider com o maior e menor valor da lista de componente
    */
    sliderSet = () =>
    {
        let values = []
        let min, max = 0

        this.state.list.map(item => values.push(item.price))
        min = Number(Math.min(...values).toFixed())
        max = Number(Math.max(...values).toFixed())

        this.setState({
            slider: {
                range: [min, max],
                marks: {
                    [min]: '',
                    [max]: ''
                },
                min: min,
                max: max
            }
        })
    }

    /**
    * Função responsável por filtrar a lista de produtos de acordo com as configurações do forumulário de filtros
    */
    handleFilter = () =>
    {
        const sliderFilter = this.state.slider.range[0] !== this.state.slider.min || this.state.slider.range[1] !== this.state.slider.max
        const searchFilter = this.state.search.length
        if (sliderFilter || searchFilter)
        {
            const regEx = RegExp(this.state.search, "i")
            const filtered = this.state.list.filter(item =>
            {
                const rangePrice = item.price >= this.state.slider.range[0] && item.price <= this.state.slider.range[1]
                const search = regEx.test(item.name)
                const result = rangePrice && search ? item : false
                return result
            })
            this.setState({ listFiltered: filtered })
        } else { this.setState({ listFiltered: [] }) }
    }

    /**
    * Função responsável inserir caracteres no filtro de procura por nome
    * @param {{ target: { name: any; value: any; }; }} e
    */
    handleSearch = (e) => this.setState(({ [e.target.name]: e.target.value }), () => this.handleFilter())

    /**
    * Altera os valores do componente Slider, e executa o filtro de acordo o intervalo selecionado
    * @param {array[number]} range: [number, number]
    */
    handleSlider = (range) =>
    {
        this.setState(prevState => ({
            slider: {
                ...prevState.slider,
                range: range,
                marks: {
                    [this.state.slider.min]: '',
                    [this.state.slider.max]: '',
                    [range[0]]: `R$ ${ range[0] }`,
                    [range[1]]: `R$ ${ range[1] }`,
                }
            }
        }), () => this.handleFilter())
    }

    /**
    * Função que recebe como paramêtro uma  chave para ordenar a lista de produtos
    * @param {string} key: priceUp | priceDown | name 
    */
    handleOrder = (key) =>
    {
        const list = this.state.list
        const listFiltered = this.state.listFiltered
        const orderByDesc = (key) =>
        {
            list.sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0)
            listFiltered.sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0)
        }
        const orderByAsc = (key) =>
        {
            list.sort((a, b) => a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0)
            listFiltered.sort((a, b) => a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0)
        }

        switch (key)
        {
            case 'priceUp':
                orderByAsc('price')
                break;
            case 'priceDown':
                orderByDesc('price')
                break;
            case 'name':
                orderByDesc('name')
                break;
            default:
                break;
        }

        this.setState({
            list: list,
            listFiltered: listFiltered,
            order: {
                ...initOrder.order,
                [key]: true
            }
        })
    }

    /**
    * Renderiza o formulário de filtros
    */
    formFilter = () =>
    {
        const { Option } = Select;

        return (
            <React.Fragment>
                <label>Filtrar</label>
                <div className="row d-flex align-items-center">
                    <div className="filters">
                        <div className='col'>
                            <small>Nome</small>
                            <input
                                type='text'
                                name='search'
                                autoComplete='off'
                                value={ this.state.search }
                                onChange={ (e) => this.handleSearch(e) }
                            />
                        </div>
                        <div className='col'>
                            <small className='m-0'>Ordenar por</small>
                            <Select
                                defaultValue="name"
                                onChange={ (order) => { this.handleOrder(order) } }
                            >
                                <Option value="name">Nome</Option>
                                <Option value="priceUp">Maior valor</Option>
                                <Option value="priceDown">Menor valor</Option>
                            </Select>
                        </div>
                        <div className='col'>
                            <small className='m-0'>Valores em R$</small>
                            <Slider
                                range
                                // tooltipVisible={ true }
                                step={ 5 }
                                marks={ this.state.slider.marks }
                                min={ this.state.slider.min }
                                max={ this.state.slider.max }
                                value={ [this.state.slider.range[0], this.state.slider.range[1]] }
                                onChange={ (value) => this.handleSlider(value) }
                            />
                        </div>
                    </div>
                </div>
                <hr />
            </React.Fragment>
        )
    }

    /**
     * Função que verifica se o item esta ou não selecionado
     */
    selectConsult = (id) => (this.state.listSelected.find(item => item.id === id))

    /**
    * Função que seleciona e remove seleção de um item da lista
    */
    selectToggle = (item) =>
    {
        if (this.selectConsult(item.id))
        {
            const unSelect = this.state.listSelected.filter(ite => ite.id !== item.id)
            this.setState({ listSelected: unSelect })
        }
        else this.setState(prevState => ({
            listSelected: [
                ...prevState.listSelected,
                item
            ]
        }))
    }

    /**
    * Renderiza os cards da lista de produtos
    * @param {{ id: number; name: string; image: string; price: number; }} item
    */
    productCard = (item) =>
    {
        const { Meta } = Card

        return (
            <List.Item>
                <Card
                    key={ item.id }
                    loading={ this.state.loader }
                    className={ this.selectConsult(item.id) ? 'selected' : '' }
                    onClick={ () => { this.selectToggle(item) } }
                    cover={
                        <img
                            alt={ item.name }
                            src={ item.image }
                        />
                    }
                >
                    <Meta
                        title={ item.name }
                        description={ item ? `R$ ${ item.price.toFixed(2) }` : '' }
                    />
                </Card>
            </List.Item>
        )
    }

    /**
    * Função renderiza a lista e faz a paginação da mesma
    */
    productsList = () =>
    {
        const { state } = this
        const loader = Array.from(Array(state.pageSize).keys())
        const sliderMood = state.slider.range[0] !== state.slider.min || state.slider.range[1] !== state.slider.max
        const listFiltered = state.listFiltered.length || (!state.listFiltered.length && (sliderMood || state.search))
        const listRender = listFiltered
            ? state.listFiltered
            : state.list.length
                ? state.list
                : loader
        const paginate = listRender.length > state.pageSize ? { pageSize: state.pageSize } : false

        return (
            <List
                itemLayout="horizontal"
                bordered={ false }
                locale={ { emptyText: 'Nada encontrado' } }
                pagination={ paginate }
                dataSource={ listRender }
                renderItem={ (products) => this.productCard(products) }
                grid={ {
                    gutter: 20,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                } }
            />
        )
    }

    /**
    * Renderiza o container da lista de produtos
    */
    productsRender = () => (
        <React.Fragment>
            <div className='content-head d-flex align-items-center justify-content-center'>
                <h1>Criar lista de presentes</h1>
            </div>
            <div className="content-body">
                { this.formFilter() }
                <div className="row d-flex align-items-center justify-content-between mt-5">
                    <div className="col">
                        <label className="mb-3">Lista de produtos</label>
                    </div>
                </div>
                <div className="row d-flex align-items-center">
                    <div className="col">
                        <div className="card-products">
                            { this.productsList() }
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-footer">
                <div className="row">
                    <div className="col d-flex align-items-center justify-content-between">
                        <button
                            className='default'
                            type='button'
                            onClick={ () => { this.props.history.goBack() } }
                        >
                            voltar
                            </button>
                        <button
                            className='primary'
                            type='button'
                            disabled={ this.state.listSelected.length ? false : true }
                            onClick={ () => { this.setState({ save: true }) } }
                        >
                            Concluir
                            </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

    componentDidMount = () =>
    {
        if (!this.props.topData.user.id)
            this.props.history.push('/')
        else if (!this.state.list.length)
            this.setState(({ loader: true }), () => this.getProducts())
    }

    render = () =>
    {
        const saveList = () => <SaveList
            createListFlow={ this.createListFlow }
            topFlow={ this.props.topFlow }
            user={ this.state.user }
            listSelected={ this.state.listSelected }
            endPoint={ this.state.endPoint }
        />

        return (
            <Layout>
                <div className="create-list">
                    { this.state.save ? saveList() : this.productsRender() }
                </div>
            </Layout>
        )
    }
}

export default withRouter(CreateList)
