import React from 'react'

// dependencys
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

// Components Childs
import Content from '../../components/Content'
import CardGift from '../../components/CardGift'
import Steps from '../../components/Steps'

// Style
import '../../assets/scss/Order.scss'

// Image
import Brand from '../../assets/images/brand.svg'

const initState = {
	title: 'Olá ',
	subtitle: 'Novo cartão presente',
	emptyMsg: 'Preencha todos os campos',
	cardSide: false,
	empty: false,
}

const initForm = {
	recipient: '',
	value: '',
	validity: '',
}

const initStep = {
	stepActive: 0,
	stepList: ['Tipo', 'Dados', 'Confirmação'],
}

const initType = {
	cardCredit: false,
	cardDefined: false,
}

class Order extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			...initState,
			...initForm,
			...initStep,
		}
	}

	toggleCard = () => this.setState({ cardSide: !this.state.cardSide })

	toggleCardType = (e) =>
	{ 
		const name = e.target.name
		this.setState(prevState => ({ ...initType, [name]: !this.state.cardSide }))
	}

	formFields = e => {
		const input = e.target.name
		const value = e.target.value
		this.state.empty
			? this.setState({ [input]: value, empty: false })
			: this.setState({ [input]: value })
	}

	submitForm = () => {
		if (this.state.recipient && this.state.value) {
			const cardBuild = {
				name: this.state.recipient,
				value: this.state.value,
				validity: this.state.validity,
			}
			const newCard = this.props.user.cards
			const addCard = newCard.push(cardBuild)
			const data = { cads: addCard }
			this.props.dataFlow(data)
		} else this.setState({ empty: true })
	}

	valuetext = value => {
		// this.state.value
		this.setState({ value: value })
		return `${value}°C`
	}

	componentDidUpdate(prevProps, prevState) {
		debugger
	}

	stepChange = (key) =>
	{ 
		switch (key) {
			case 'next':
				this.setState({stepActive: +1})
				break;
			case 'back':
					this.setState({stepActive: -1})
				break;
			case 'reset':
						this.setState({stepActive: 0})
				break;
			default:
				break;
		}
	}

	steps = () => {
		return (
			<Steps
				stepsList={this.state.stepList}
				stepActive={this.state.stepActive}
				stepChange={ () => this.stepChange() }
			/>
		)
	}

	formCard = () => {
		return (
			<form className="form">
				<h2>Criar cartão gift</h2>
				<small>Campor obrigatórios são marcados com *</small>
				<hr />
				<div className="field-group">
					<label>Beneficiário *</label>
					<input
						type="text"
						autoComplete="on"
						onChange={e => this.formFields(e)}
						name="recipient"
						value={this.state.recipient}
					/>
				</div>
				<div className="field-group">
					<label>Valor *</label>
					<input
						type="number"
						autoComplete="on"
						onChange={e => this.formFields(e)}
						name="value"
						value={this.state.value}
					/>
				</div>
				<div className="field-group">
					<label>Valor *</label>
					<Typography id="discrete-slider" gutterBottom>
						Temperature
					</Typography>
					<Slider
						defaultValue={300}
						getAriaValueText={this.state.value}
						aria-labelledby="discrete-slider"
						valueLabelDisplay="auto"
						step={100}
						marks
						min={100}
						max={1000}
					/>
				</div>
				<div className="error">
					<span>{this.state.empty ? this.state.emptyMsg : '⠀'}</span>
				</div>
				<div>
					<button
						onClick={() => this.submitForm()}
						className="primary"
					>
						Próximo
					</button>
				</div>
			</form>
		)
	}

	contentHeader = () => {
		let firstName = this.props.data.user.name.split(' ')
		return (
			<div className="content-head">
				<h1>{this.state.title + firstName[0]}</h1>
				<span>{this.state.subtitle}</span>
			</div>
		)
	}

	contentBody = () => {
		return (
			<div className="content-body">
				<div className="row d-flex align-items-center">
					<div className="col mt-2">{this.steps()}</div>
				</div>
				<div className="row d-flex align-items-center">
					<div className="col mt-2">
						{/* <h2>Vamos criar um cartão presente</h2>
						<p>Cartões físicos e virtuais para premiar sua equipe de forma ágil e segura.</p> */}
						{this.formCard()}
					</div>
					<div className="col d-flex justify-content-center">
						<CardGift
							cardSide={this.state.cardSide}
							toggleCard={this.toggleCard}
						>
							{this.cardBuild()}
						</CardGift>
					</div>
				</div>
			</div>
		)
	}

	cardBuild = () => {
		return (
			<React.Fragment>
				<div className="side front d-flex justify-content-between">
					<div className="row">
						<div className="col d-flex justify-content-end">
							<img
								className="brand"
								src={Brand}
								alt="logotipo"
							></img>
						</div>
					</div>
					<div className="row middle">
						<div className="col text-center">
							<label>Vale presente</label>
							<span>
								<b>R$300,00</b>
							</span>
						</div>
					</div>
					<div className="row footer">
						<div className="col-8">
							<label>Beneficiário</label>
							<span>{this.state.recipient}</span>
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
					<div className="row"></div>
					<div className="row">
						<div className="col d-flex justify-content-center">
							<img
								className="brand"
								src={Brand}
								alt="logotipo"
							></img>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}

	componentDidMount = () => {
		if (!this.props.data.user.id) this.props.history.push('/login')
	}

	render = () => {
		return (
			<div className="container">
				<Content header={this.contentHeader()}>
					{this.contentBody()}
				</Content>
			</div>
		)
	}
}

export default withRouter(Order)

Order.propTypes = {
	dataFlow: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}
