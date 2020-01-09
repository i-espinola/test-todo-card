import React from 'react'

// dependencys
import Axios from 'axios'
import PropTypes from 'prop-types'

// Components childs
import Content from '../../components/Content'
import { Card, Slider, Result, Radio, Pagination } from 'antd'

const initState = {
    loader: false,
    products: [],
    listFilter: [],
    listSelected: []
}

const initFormSave = {
    nameList: '',
    saveList: []
}

const initFormFilter = {
    search: '',
    value: [0, 0],
    slider: {
        marks: {},
        valueMin: 0,
        valueMax: 0,
    }
}

export default class CardDefined extends React.Component
{

    constructor (props)
    {
        super(props)
        this.state = {
            ...initState,
            ...initFormSave,
            ...initFormFilter,
        }
    }

    getProducts = () =>
    {
        Axios.get(`${ this.props.topData.api }products`)
            .then((res) => this.setState(({ products: res.data }), () => this.sliderSet()))
            .finally(() => this.setState({ loader: false }))
    }

    sliderSet = () =>
    {
        const prices = []

        this.state.products.map(item => prices.push(item.price))

        const min = Number(Math.min(...prices).toFixed())
        const max = Number(Math.max(...prices).toFixed())

        this.setState({
            value: [min, max],
            slider: {
                marks: {
                    [min]: min,
                    [max]: max
                },
                valueMin: min,
                valueMax: max
            }
        })
    }

    formSave = () =>
    (
        <div className='row'>
            <form className="save">
                <div className='col'>
                    <label>Nome da lista</label>
                    <input
                        type='text'
                        name='nameList'
                        autoComplete='off'
                        value={ this.state.nameList }
                        onChange={ (e) => this.setState({ [e.target.name]: e.target.value }) }
                    />
                </div>
                <div className='col'>
                    <button
                        className="primary"
                    >
                        Salvar lista selecionada
                    </button>
                </div>
            </form>
        </div>
    )

    formFilter = () =>
    (
        <div className='row'>
            <form className="filters">                 
                <div className='col'>
                    <label>Filtrar por nome</label>
                    <input
                        type='text'
                        name='search'
                        autoComplete='off'
                        value={ this.state.search }
                        onChange={ (e) => this.setState({ [e.target.name]: e.target.value }) }
                    />
                </div>    
                <div className='col'>
                    <label>Filtrar valor</label>
                    <Slider
                        range
                        step={ 5 }
                        marks={ { [this.state.slider.valueMin]: this.state.slider.valueMin, [this.state.slider.valueMax]: this.state.slider.valueMax} }
                        min={ this.state.slider.valueMin }
                        max={ this.state.slider.valueMax }
                        value={ this.state.value }
                        onChange={ (value) => this.setState({ value: value }) }
                    />
                </div>    
                <div className='col'>
                    <button className="primary">Filtar</button>
                </div>    
            </form> 
        </div>
    )

    ifSelected = (id) =>
    {
        const result = !this.state.listSelected.length ? false : this.state.listSelected.find(el => el === id ? true : false)
        return result
    }

    selectToggle = (id) =>
    {
        if (this.ifSelected(id))
        {
            const unSelect = this.state.listSelected.filter(el => el !== id)
            this.setState({ listSelected: unSelect })
        } else this.setState(prevState => ({ listSelected: [...prevState.listSelected, id] }))
    }

    productsRender = () =>
    {
        const { Meta } = Card
        const list = this.state.products.length ? this.state.products : [1, 2, 3, 4]

        return (
            list.map((product, index) =>
            (
                <Card
                    key={ index }
                    loading={ this.state.loader }
                    className={ this.ifSelected(product.id) ? 'selected' : '' }
                    onClick={ () => this.selectToggle(product.id) }
                >
                    <Meta
                        title={ product.name }
                        description={ `R$ ${ product.price }` }
                    />
                </Card>
            ))
        )
    }

    componentDidMount = () =>
    {
        debugger
        if (!this.state.products.length) this.setState(({ loader: true }), () => this.getProducts())
        debugger
    }

    render = () => (
        <div className="container">
            <Content>
                <div className='content-head d-flex align-items-center justify-content-center'>
                    <h1>Criar lista pré-definida</h1>
                </div>
                <div className="content-body">
                    <div className="row d-flex align-items-center">
                        <div className="col">
                            { this.formFilter() }
                        </div>
                    </div>
                    <div className="row d-flex align-items-center">
                        <div className="col">
                            <h6>Lista de produtos</h6>
                            <div className="products-cards">
                                { this.productsRender() }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-footer">
                    <div className="row">
                        <div className="col mt-2 d-flex align-items-center justify-content-between">{ this.formSave() }</div>
                    </div>
                </div>
            </Content>
        </div>
    )
}

CardDefined.propType = {
    createFlow: PropTypes.func.isRequired,
    createData: PropTypes.shape({
        user: PropTypes.shape({
            list: PropTypes.array
        }).isRequired
    }).isRequired
}
