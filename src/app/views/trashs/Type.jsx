import React from 'react'

// dependencys
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio'

// Style
import '../../assets/scss/Type.scss'

const Type = (props) => (

	<React.Fragment>
		<div className="row d-flex align-items-center">
			<div className="col mt-2">
				<h3>Selecione o tipo de cartão</h3>
			</div>
		</div>
		<div className="row">
			<div className="col mt-2">
				<h5 className="d-flex align-items-center">
					<Radio
						checked={ props.data.cardDefined }
						onChange={ (e) => props.createFlow(e) }
						name="cardDefined"
						inputProps={ { 'aria-label': 'cardDefined' } }
					/>						
					Cartão pré-definido
				</h5>
				<p>
					O Cartão pré-definido define itens pré-definidos a partir 
					de uma lista personalizada que você poderá criar, ou 
					simplesmente selecionar itens avulsos ao cartão gift.
				</p>
			</div>
			<div className="col mt-2">
				<h5>
					<Radio
						checked={ props.data.cardCredit }
						onChange={ (e) => props.createFlow(e) }
						name="cardCredit"
						inputProps={ { 'aria-label': 'cardCredit' } }
					/>
					Cartão crédito
				</h5>
				<p>
					Este tipo de cartão, é definido um valor(R$) de crédito ao 
					cartão gift, desta forma, o beneficiário sera contemplado 
					com um valor moeda para gastar no estabelecimento até que 
					o valor total do cartão seja esgotado.
				</p>
			</div>
		</div>
	</React.Fragment>
)

export default Type

Type.propTypes = {
	createFlow: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}
