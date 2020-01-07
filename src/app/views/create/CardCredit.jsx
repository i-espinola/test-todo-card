import React from 'react'

// dependencys
import PropTypes from 'prop-types'
import { Slider } from 'antd'

// Image
import Brand from '../../assets/images/brand.svg'

// Components
import CardGift from '../../components/CardGift'

export default class CardCredit extends React.Component
{

    formBuild = () => (
        <form className="form">
            <div className="field-group">
                <label>Nome *</label>
                <input
                    type="text"
                    name="name"
                    autoComplete="on"
                    value={ this.props.dataCreate.recipient }
                    onChange={ e => this.props.flowCreate({ [e.target.name]: e.target.value }) }
                />
            </div>
            <div className="field-group">
                <label>Sobrenome *</label>
                <input
                    type="text"
                    name="lastName"
                    autoComplete="on"
                    value={ this.props.dataCreate.recipient }
                    onChange={ e => this.props.flowCreate({ [e.target.name]: e.target.value }) }
                />
            </div>
            <div className="field-group">
                <label>Valor do cartão*</label>
                <Slider
                    min={ 100 }
                    max={ 1000 }
                    step={ 100 }
                    defaultValue={ this.props.dataCreate.value }
                    onChange={ (value) => this.props.flowCreate({ value: value }) }
                />
            </div>
            <div className="error">
                {/* <span>{ this.state.empty ? this.state.emptyMsg : '⠀' }</span> */}
            </div>
        </form>
    )

    cardLayout = () => (
        <CardGift
            brand={ Brand }
            name={ this.props.dataCreate.name }
            value={ this.props.dataCreate.value }
            validity={ this.props.dataCreate.validity }
            lastName={ this.props.dataCreate.lastName }
            cardSideBack={ this.props.dataCreate.cardSideBack }
        />
    )

    render = () => (
        <React.Fragment>
            <div className="row text-center">
                <div className="col mt-2">
                    <h1>{ this.props.dataCreate.stepsDescription[this.props.dataCreate.stepActive] }</h1>
                </div>
            </div>
            <div className="row d-flex align-items-center">
                <div className="col">
                    { this.formBuild() }
                </div>
                <div className="col d-flex justify-content-center">
                    { this.cardLayout() }
                </div>
            </div>
        </React.Fragment>
    )
}

CardCredit.propType = {
    flowCreate: PropTypes.func.isRequired,
    dataCreate: PropTypes.object.isRequired,
}
