import React from 'react'

// dependencys
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components Childs
import Content from '../../components/Content'
import GiftCard from '../../components/GiftCard'

// Style
import '../../assets/scss/Home.scss'

// Image
import Brand from '../../assets/images/brand.svg'

const initState = {
    title: 'Bem vindo!',
    subtitle: 'Home',
    cardSide: false
}

export default class Home extends React.Component
{
    constructor (props)
    {
        super(props)
        this.state = {
            ...initState
        }
        this.toggleCard = this.toggleCard.bind(this)
    }

    toggleCard = () => this.setState({ cardSide: !this.state.cardSide })

    contentHeader = () =>
    {
        return (
            <React.Fragment>
                <h1>{ this.state.title }</h1>
                <span>{this.state.subtitle}</span>
            </React.Fragment>
        )
    }

    contentBody = () =>
    {
        return (
            <div className='content-body'>
                <div className='row d-flex align-items-center'>
                    <div className='col mt-2'>
                        <h2>Premiação Corporativa</h2>
                        <p>Cartões físicos e virtuais para premiar sua equipe de forma ágil e segura.</p>
                        <Link
                            to='/login'
                            className='primary mt-4'
                            onClick={ () => this.toggleCard() }
                        >
                            Criar cartão presente
                        </Link>
                    </div>
                    <div className='col d-flex justify-content-center'>
                        <GiftCard cardSide={ this.state.cardSide } toggleCard={ this.toggleCard }>
                            { this.cardBuild() }
                        </GiftCard>
                    </div>
                </div>
            </div>
		)
    }

    cardBuild = () =>
    { 
        return (
            <div className='content-body'>
                <div className="side front d-flex justify-content-between">
                    <div className="row">
                        <div className="col d-flex justify-content-end">
                            <img className='brand' src={ Brand } alt='logotipo'></img>
                        </div>
                    </div>
                    <div className="row middle">
                        <div className="col d-flex justify-content-center">
                            <h5>Vale presente <b>R$300,00</b></h5>
                        </div>
                    </div>
                    <div className="row footer">
                        <div className="col-8">
                            <label>Beneficiário</label>
                            <span>João da Silva</span>
                        </div>
                        <div className="col-4">
                            <label>Expira em</label>
                            <span>31/12/2025</span>
                        </div>
                    </div>
                </div>
                <div className="side back d-flex justify-content-between">
                    <div className="row">
                        <div className="d-flex justify-content-end bar-black"></div>
                        <div className="d-flex justify-content-center bar-white"></div>
                    </div>
                    <div className="row">
                    </div>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <img className='brand' src={ Brand } alt='logotipo'></img>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    render = () =>
    {
        return (
            <div className="container">
                <Content header={ this.contentHeader() } >
                    { this.contentBody() }
                </Content>
            </div>
        )
    }
}

Home.propTypes = {
	dataFlow: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}
