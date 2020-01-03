import React from 'react'

// dependencys
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components Childs
// import CardGift from '../../components/CardGift'
import Content from '../../components/Content'
import Steps from '../../components/Steps'

import Type from './Type'
import Data from './Data'

// Style
import '../../assets/scss/Create.scss'

// Image
// import Brand from '../../assets/images/brand.svg'

const initState = {
	title: 'Criar cartão gift',
	subtitle: 'Configuração',
	emptyMsg: 'Preencha todos os campos',
	cardSideBack: false,
}

const initFormCredit = {
	empty: false,
	recipient: String,
	validity: String,
	value: String,
}

const initStep = {
	stepActive: 0,
	stepsList: ['Tipo', 'Dados', 'Confirmação'],
}

const initCardType = {
	cardCredit: false,
	cardDefined: false,
}

class Create extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			...initStep,
			...initState,
			...initCardType,
			...initFormCredit,
		}
		this.dataFlowCreate = this.dataFlowCreate.bind(this)
	}

	dataFlowCreate = (data) =>
	{
		debugger
		if (data.target)
		{
			const name = data.target.name
			this.setState(prevState => ({
				...initCardType,
				[name]: !this.state[name]
			}))
		} else this.setState({ ...data })
	}

	stepButtons = () => {
		const isFinally = this.state.stepActive === this.state.stepsList.length
		const btnPrimary = this.state.stepActive === this.state.stepsList.length - 1
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
		const nextBack = () => (
			<div className="d-flex justify-content-between">
				<button
					className="default"
					data-action="back"
					disabled={ !this.state.stepActive }
					onClick={ () =>	this.setState({ stepActive: this.state.stepActive - 1 }) }
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

		return isFinally ? reset() : nextBack()
	}

	stepSelect = () =>
	{
		const type = <Type data={ this.state } dataFlowCreate={ this.dataFlowCreate } />
		const data = <Data data={ this.state } dataFlowCreate={ this.dataFlowCreate } />
		const steps = [type, data]
		const step = this.state.stepActive

		return steps[step]
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
							stepsList={ this.state.stepsList }
							stepActive={ this.state.stepActive }
						/>
					</div>
				</div>
				{ this.stepSelect() }
			</div>
			<div className="content-footer">
				<div className="row d-flex justify-content-end">
					<div className="col mt-2">{ this.stepButtons() }</div>
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
