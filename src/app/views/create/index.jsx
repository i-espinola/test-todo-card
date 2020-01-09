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
	stepActive: 1,
	stepsTitles: ['Seleção', 'Configuração', 'Confirmação'],
	stepsDescription: ['Selecione o tipo de cartão', 'Configurando o cartão', 'Confirmação do cartão'],
}

const initSelect = {
	cardCredit: false,
	cardDefined: true,
}

const initFormCredit = {
	name: '',
	lastName: '',
	validity: '',
	value: 300,
}

const initValidation = {
	empty: false,
	emptyMsg: 'Preencha todos os campos',
	unSelected: false,
	unSelectedMsg: 'Selecione uma das opções'
}

const initCardGift = {
	cardSideBack: false
}

class Create extends React.Component 
{
	constructor (props)
	{
		super(props)
		this.state = {
			...initStep,
			...initState,
			...initSelect,
			...initCardGift,
			...initFormCredit,
			...initValidation,
			...this.props.topData
		}
		this.createFlow = this.createFlow.bind(this)
	}

	createFlow = (data, key) =>
	{ 
		switch (key) {
			case 'select':
				this.setState({	...initSelect, ...data	})
				break;
			default:
				this.setState(data)
				break;
		}
	}

	cardValidity = () =>
	{
		const date = new Date(Date.now() + (90 * 24 * 60 * 60 * 1000))
		const validity = date.toLocaleDateString('pt-BR')
		this.setState({ validity: validity })
	}

	stepValitation = () =>
	{
		const step = this.state.stepActive.toString()
		switch (step)
		{
			case '0':
				this.state.cardCredit || this.state.cardDefined
					? this.setState({ ...initValidation, stepActive: this.state.stepActive + 1 })
					: this.setState({ unSelected: true })
				break;
			case '1':
				this.state.name && this.state.lastName && this.state.value
					? this.setState({ ...initValidation, stepActive: this.state.stepActive + 1 })
					: this.setState({ empty: true })
				break;
			default:
				break;
		}
	}

	stepError = () =>
	{
		const error = this.state.empty
			? this.state.emptyMsg
			: this.state.unSelected
				? this.state.unSelectedMsg
				: '⠀'
		return error
	}

	stepNav = () => (
		<React.Fragment>
			<button
				type="button"
				className="default"
				disabled={ !this.state.stepActive }
				onClick={ () => this.setState({ ...initValidation, stepActive: this.state.stepActive - 1 }) }
			>
				Voltar
			</button>
			<span className="step-validation">{ this.stepError() }</span>
			<button
				type="button"
				className="primary"
				onClick={ () => this.stepValitation() }
			>
				{ this.state.stepActive === this.state.stepsTitles.length - 1 ? 'Confirmar' : 'Próximo' }
			</button>
		</React.Fragment>
	)

	stepsBuild = () =>
	{
		const select = <Select key='select' createData={ this.state } createFlow={ this.createFlow } />
		const cardCredit = <CardCredit key='card-credit' createData={ this.state } createFlow={ this.createFlow } />
		const cardDefined = <CardDefined key='card-defined' createData={ this.state } createFlow={ this.createFlow } />
		const check = <Check key='check' createData={ this.state } createFlow={ this.createFlow } />
		const config = this.state.cardCredit ? cardCredit : this.state.cardDefined ? cardDefined : undefined

		return [select, config, check]
	}

	componentDidMount = () =>
	{
		console.log(this.props)
		if (!this.props.topData.user.id) this.props.history.push('/login')
		else if (!this.state.validity) this.cardValidity()
	}

	render = () => (
		<div className="container">
			<Content>
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
					<div className="row">
						<div className="col mt-2 d-flex align-items-center justify-content-between">{ this.stepNav() }</div>
					</div>
				</div>
			</Content>
		</div>
	)
}


Create.propTypes = {
	topFlow: PropTypes.func.isRequired,
	topData: PropTypes.object.isRequired,
}

export default withRouter(Create)
