import React from 'react'

// dependencys
import PropTypes from 'prop-types'

// Image
import Brand from '../../assets/images/brand.svg'

// Components childs
import { Slider } from 'antd'
import CardGift from '../../components/CardGift'

const cardCredit = (props) => {

    const formBuild = () => (
        <div>
            <div className="field-group">
                <div>
                    <label>Nome *</label>
                    <input
                        type="text"
                        name="name"
                        className="line"
                        autoComplete="on"
                        value={ props.createData.name }
                        onChange={ (e) => props.createFlow({ [e.target.name]: e.target.value }) }
                    />
                </div>
                <div>
                    <label>Sobrenome *</label>
                    <input
                        type="text"
                        name="lastName"
                        className="line"
                        autoComplete="on"
                        value={ props.createData.lastName }
                        onChange={ (e) => props.createFlow({ [e.target.name]: e.target.value }) }
                    />
                </div>                
            </div>
            <div className="field-group">
                <div>
                    <label>Valor do cartão *</label>
                    <Slider
                        min={ 100 }
                        step={ 100 }
                        max={ 1000 }
                        defaultValue={ props.createData.value }
                        onChange={ (value) => props.createFlow({ value: value }) }
                    />
                </div>
            </div>
        </div>
    )

    const cardLayout = () => (
        <CardGift
            brand={ Brand }
            name={ props.createData.name }
            lastName={ props.createData.lastName }
            validity={ props.createData.validity }
            value={ props.createData.value }
        />
    )

    return (
        <React.Fragment>
            <div className="row text-center">
                <div className="col mt-2">
                    <h1>{ props.createData.stepsDescription[props.createData.stepActive] }</h1>
                </div>
            </div>
            <div className="row d-flex align-items-center">
                <div className="col">
                    { formBuild() }
                </div>
                <div className="col d-flex justify-content-center">
                    { cardLayout() }
                </div>
            </div>
        </React.Fragment>
    )
}

cardCredit.propType = {
    createFlow: PropTypes.func.isRequired,
    createData: PropTypes.shape({
        stepsDescription: PropTypes.array.isRequired,
        stepActive: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        validity: PropTypes.string.isRequired,
    }).isRequired
}

export default cardCredit
