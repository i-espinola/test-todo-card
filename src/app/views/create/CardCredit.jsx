import React from 'react'

// dependencys
// import PropTypes from 'prop-types'
import Slider from '@material-ui/core/Slider'

// Image
import Brand from '../../assets/images/brand.svg'

// Components
import CardGift from '../../components/CardGift'

export default class CardCredit extends React.Component
{

    formFields = (data) =>
    { 
        const name = data.target.name
        const value = data.target.value
        this.props.dataFlowCreate({ [name]: value })
    }

    formBuild = () => (
        <form className="form">
            <h2>Criar cartão gift</h2>
            <small>Campor obrigatórios são marcados com *</small>
            <hr />
            <div className="field-group">
                <label>Beneficiário *</label>
                <input
                    type="text"
                    name="recipient"
                    autoComplete="on"
                    value={ this.props.dataCreate.recipient }
                    onChange={ e => this.formFields(e) }
                />
            </div>
            <div className="field-group">
                <label>Valor *</label>
                <Slider
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    min={ 100 }
                    max={ 1000 }
                    step={ 100 }
                    marks={ true }
                    defaultValue={ this.props.dataCreate.value }
                    // value={ this.props.dataCreate.value }
                    // name='value'
                    // required={ true }
                    getAriaValueText={ (e) => this.valuetext(e) }
                    // getAriaLabel={ (e) => this.props.dataFlowCreate(e) }
                    // getAriaValueText={ (e) => this.props.dataFlowCreate(e) }
                    // onChange={ (e, val) => this.props.dataFlowCreate({ value: val }) }
                />
            </div>
            <div className="error">
                {/* <span>{ this.state.empty ? this.state.emptyMsg : '⠀' }</span> */}
            </div>
        </form>
    )

    // valuetext = (e, val) => this.props.dataFlowCreate(val)
    valuetext = (value) => 
    {
        debugger
        console.log(`${ value }°C`)
        return `${ value }°C`;
    }

    cardLayout = () => (
        <CardGift
            brand={ Brand }
            toggle={ this.props.dataFlowCreate }
            value={ this.props.dataCreate.value }
            validity={ this.props.dataCreate.validity }
            recipient={ this.props.dataCreate.recipient }
            cardSideBack={ this.props.dataCreate.cardSideBack }
        />
        // <h1>hello geek</h1>
    )

    render = () => (
        <div className="row d-flex align-items-center">
            <div className="col">
                { this.formBuild() }
            </div>
            <div className="col d-flex justify-content-center">
                { this.cardLayout() }
            </div>
        </div>
    )
}
