// dependencys
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import { Slider, Select, Result } from 'antd'

// Components childs
import CardGift from '../../components/CardGift'

// Image
import Brand from '../../assets/images/brand_white.svg'

class BuildCard extends React.Component
{
    
    static propType = {
        createFlow: PropTypes.func.isRequired,
        createData: PropTypes.shape({
            name: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            lists: PropTypes.array.isRequired,
        }).isRequired
    }

    select = () =>
    { 
        const namesList = []
        const { Option } = Select;
        
        this.props.createData.user.lists.map((list) =>
            namesList.push(<Option key={ list.id } value={ list.id } label={ list.name }>{ list.name }</Option>)
        )

        return (
            <React.Fragment>
                <label>Selecione uma lista *</label>
                <Select
                    showSearch={ false }
                    mode="multiple"
                    labelInValue={ true }
                    value={ this.props.createData.lists.length ? this.props.createData.lists : [] }
                    notFoundContent="Lista não encontrada"
                    onChange={ (selects) => this.props.createFlow({ lists: selects }) }
                    dropdownRender={ (menu) => (<div> { menu } </div>) }
                >
                    { namesList }
                </Select>
            </React.Fragment>    
        )
    }

    slider = () => (
        <React.Fragment>
            <label>Valor do cartão *</label>
            <Slider
                min={ 0 }
                step={ 100 }
                max={ 1000 }
                defaultValue={ 0 }
                value={ this.props.createData.value }
                onChange={ (value) => this.props.createFlow({ value: value }) }
            />
        </React.Fragment>
    )

    form = () => (
        <div>
            <div className="field-group">
                <div>
                    <label>Nome *</label>
                    <input
                        type="text"
                        name="name"
                        className="line"
                        autoComplete="on"
                        value={ this.props.createData.name }
                        onChange={ (e) => this.props.createFlow({ [e.target.name]: e.target.value }) }
                    />
                </div>
                <div>
                    <label>Sobrenome *</label>
                    <input
                        type="text"
                        name="lastName"
                        className="line"
                        autoComplete="on"
                        value={ this.props.createData.lastName }
                        onChange={ (e) => this.props.createFlow({ [e.target.name]: e.target.value }) }
                    />
                </div>                
            </div>
            <div className="field-group">
                <div>
                    { this.props.createData.cardCredit ? this.slider() : this.props.createData.cardList ? this.select()  : null }
                </div>
            </div>
        </div>
    )

    listEmpty = () => (
        <Result
            status="404"
            title="Nenhuma lista encontrada"
            subTitle="Parece que você ainda não criou nem uma lista de presente."
            extra={
                <button
                    type="button"
                    className="secondary"
                    onClick={ () => this.props.history.push('/create-list') }
                >
                    Criar lista de presente
                </button>
            }
        />
    )

    BuildCard = () => (
        <React.Fragment>
            <div className="row text-center">
                <div className="col mt-2 mb-4">
                    <h1>Configuração de conteúdo</h1>
                </div>
            </div>
            <div className="row d-flex align-items-center">
                <div className="col">
                    { this.form() }
                </div>
            </div>
            <div className="row d-flex align-items-center">
                <div className="col">
                    <CardGift
                        brand={ Brand }
                        name={ this.props.createData.name }
                        lastName={ this.props.createData.lastName }
                        value={ this.props.createData.value }
                    />
                </div>
            </div>
        </React.Fragment>
    )

     render = () => !this.props.createData.user.lists.length && this.props.createData.cardList ? this.listEmpty() : this.BuildCard()
}

export default withRouter(BuildCard)
