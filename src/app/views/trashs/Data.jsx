import React from 'react'

// dependencys
import PropTypes from 'prop-types'
import Slider from '@material-ui/core/Slider'

// Components
import CardGift from '../../components/CardGift'

// Image
import Brand from '../../assets/images/brand.svg'

// Style
import '../../assets/scss/_Fields.scss'
import '../../assets/scss/_CardGift.scss'

export default class CardData extends React.Component
{
	constructor (props)
	{
		super(props);
		this.state = {
		}
	}

	formCredit = () => (
		<form className="form">
			<h2>Criar cartão gift</h2>
			<small>Campor obrigatórios são marcados com *</small>
			<hr />
			<div className="field-group">
				<label>Beneficiário *</label>
				<input
					type="text"
					autoComplete="on"
					onChange={ e => this.props.flowCreate(e) }
					name="recipient"
					value={ this.props.data.recipient }
				/>
			</div>
			<div className="field-group">
				<label>Valor *</label>
				<input
					type="number"
					autoComplete="on"
					onChange={ e => this.props.flowCreate(e) }
					name="value"
					value={ this.props.data.value }
				/>
			</div>
			<div className="field-group">
				<label>Valor *</label>
				<Slider
					defaultValue={ 300 }
					getAriaValueText={ this.props.data.value }
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					step={ 100 }
					marks
					min={ 100 }
					max={ 1000 }
				/>
			</div>
			<div className="error">
				{/* <span>{ this.state.empty ? this.state.emptyMsg : '⠀' }</span> */}
			</div>
		</form>
	)

	cardCredit = () =>
	{ 
		return (
			<div className="row d-flex align-items-center">
				<div className="col"> { this.formCredit() } </div>
				<div className="col d-flex justify-content-center">
					<CardGift
						cardSideBack={ this.props.data.cardSideBack }
						toggle={ this.props.flowCreate }
						recipient={ this.props.data.recipient }
						value={ this.props.data.value }
						date={ this.props.data.date }
						brand={ Brand }
					/>
				</div>
			</div>
		)
	}

	cardDefined = () =>
	{
		return <h1>hello geek</h1> 	
	}

	render = () => (
		<div>
			{ this.props.data.cardCredit
				? this.cardCredit()
				: this.props.data.cardDefined
					? this.cardDefined()
					: null
			}
		</div>
	)
}

CardData.propTypes = {
	flowCreate: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}
