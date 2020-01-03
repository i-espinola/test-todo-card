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
	title: 'Criar cartão gift',
	subtitle: 'Configuração',
}

const initStep = {
	stepActive: 1,
	steps: ['Seleção', 'Cartão', 'Confirmação'],
}

const initSelect = {
	cardCredit: true,
	cardDefined: false,
}

const initFormCredit = {
	recipient: 'persona',
	validity: 'date',
	value: 100,
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
		}
		this.dataFlowCreate = this.dataFlowCreate.bind(this)
	}

	// dataFlowCreate = (data) => this.setState(data)
	dataFlowCreate = (data) =>
	{
		debugger
		if (data.target)
		{
			debugger
			const name = data.target.name
			const select = data.target.type === 'radio'
			
			if (select) {
				debugger
				this.setState({
					...initSelect,
					[name]: !this.state[name]
				})
			} else { 
				debugger
				const value = data.target.value
				this.setState({	[name]: value })
			}
			
		} else this.setState({ ...data })
	}

	stepSelect = () =>
	{
		const card = this.state.cardCredit
			? (<CardCredit dataCreate={ this.state } dataFlowCreate={ this.dataFlowCreate } />)
			: (<CardDefined dataCreate={ this.state } dataFlowCreate={ this.dataFlowCreate } />)
		const select = <Select dataCreate={ this.state } dataFlowCreate={ this.dataFlowCreate } />
		const check = <Check dataCreate={ this.state } dataFlowCreate={ this.dataFlowCreate } />
		const steps = [select, card, check]
		const active = this.state.stepActive

		return steps[active]
	}

	stepNav = () =>
	{
		const isFinally = this.state.stepActive === this.state.steps.length
		const btnPrimary = this.state.stepActive === this.state.steps.length - 1
			? 'Concluir'
			: 'Próximo'
		const reset = () => (
			<div>
				<label> Todas etapas concluídas</label>
				<button
					data-action="reset"
					className="secondary"
					onClick={ () => this.setState({ stepActive: 0 }) }
				>
					Reiniciar
				</button>
			</div>
		)
		const backNext = () => (
			<div className="d-flex justify-content-between">
				<button
					className="default"
					data-action="back"
					disabled={ !this.state.stepActive }
					onClick={ () => this.setState({ stepActive: this.state.stepActive - 1 }) }
				>
					Voltar
				</button>
				<button
					className="primary"
					data-action="next"
					onClick={ () => this.setState({ stepActive: this.state.stepActive + 1 }) }
				>
					{ btnPrimary }
				</button>
			</div>
		)

		return isFinally ? reset() : backNext()
	}

	contentBuild = () => (
		<React.Fragment>
			<div className="content-head text-center">
				<h1>{ this.state.title }</h1>
				<span>{ this.state.subtitle }</span>
			</div>
			<div className="content-body">
				<div className="row d-flex align-items-center">
					<div className="col mt-2">
						<Steps
							steps={ this.state.steps }
							stepActive={ this.state.stepActive }
						/>
					</div>
				</div>
				{ this.stepSelect() }
			</div>
			<div className="content-footer">
				<div className="row d-flex justify-content-end">
					<div className="col mt-2">{ this.stepNav() }</div>
				</div>
			</div>
		</React.Fragment>
	)

	componentDidMount = () => {
		if (!this.props.data.user.id) this.props.history.push('/login')
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
