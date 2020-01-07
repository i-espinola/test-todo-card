import React from 'react'

// Dependencys
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components Childs
import Content from '../../components/Content'
import Steps from '../../components/Steps'
import CardDefined from './CardDefined'
import CardCredit from './CardCredit'
import Select from './Select'
import Check from './Check'

// Style
import '../../assets/scss/Create.scss'

const initState = {
	title: 'Cartão gift',
	subtitle: 'Configuração',
}

const initStep = {
	stepActive: 0,
	stepsTitles: ['Seleção', 'Cartão', 'Confirmação'],
	stepsDescription: ['Selecione um tipo de cartão', 'Configurando o cartão', 'Confirmação do cartão'],
}

const initSelect = {
	cardCredit: false,
	cardDefined: false,
}

const initFormCredit = {
	name: '',
	lastName: '',
	validity: '',
	value: 300,
}

const initCardGift = {
	cardSideBack: false
}

class Create extends React.Component {

	constructor (props)
	{
		super(props)
		this.state = {
			...initStep,
			...initState,
			...initSelect,
			...initFormCredit,
			...initCardGift,
		}
		this.flowCreate = this.flowCreate.bind(this)
	}

	flowCreate = (data, key) =>
	{ 
		switch (key) {
			case 'select':
				this.setState(({
					...initSelect,
					...data
				}))
				break;
			default:
				this.setState(data)
				break;
		}
	}

	stepsBuild = () =>
	{
		const card = this.state.cardCredit
			? <CardCredit dataCreate={ this.state } flowCreate={ this.flowCreate } />
			: <CardDefined dataCreate={ this.state } flowCreate={ this.flowCreate } />
		const select = <Select dataCreate={ this.state } flowCreate={ this.flowCreate } />
		const check = <Check dataCreate={ this.state } flowCreate={ this.flowCreate } />
		const steps = [select, card, check]

		return steps
	}

	stepBtn = () => (

		<div className="d-flex justify-content-between">
			<button
				className="default"
				disabled={ !this.state.stepActive }
				onClick={ () => this.setState({ stepActive: this.state.stepActive - 1 }) }
			>
				Voltar
			</button>
			<button
				className="primary"
				onClick={ () => this.setState({ stepActive: this.state.stepActive + 1 }) }
			>
				{ this.state.stepActive === this.state.stepsTitles.length - 1 ? 'Concluir' : 'Próximo' }
			</button>
		</div>
	)


	contentBuild = () => (
		<React.Fragment>
			<div className="content-head d-flex align-items-center">
				<Steps
					active={ this.state.stepActive }
					titles={ this.state.stepsTitles }
				/>
			</div>
			<div className="content-body">
				<div className="row d-flex align-items-center">
					<div className="col mt-2">
						<Steps
							active={ this.state.stepActive }
						>
							{ this.stepsBuild() }
						</Steps>
					</div>
				</div>
			</div>
			<div className="content-footer">
				<div className="row d-flex justify-content-end">
					<div className="col mt-2">{ this.stepBtn() }</div>
				</div>
			</div>
		</React.Fragment>
	)

	validity = () =>
	{
		const date = new Date(Date.now() + (90 * 24 * 60 * 60 * 1000))
		const validity = date.toLocaleDateString('pt-BR')
		this.setState({ validity: validity })
	}

	componentDidMount = () => {
		if (!this.props.topData.user.id) this.props.history.push('/login')
		else if (!this.state.validity) this.validity()
	}

	render = () => (
		<div className="container">
			<Content>
				{ this.contentBuild() }
			</Content>
		</div>
	)
}

export default withRouter(Create)

Create.propTypes = {
	dataFlow: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}
