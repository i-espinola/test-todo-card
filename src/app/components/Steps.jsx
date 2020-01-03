import React from 'react'

// dependencys
import PropTypes from 'prop-types'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

const Steps = (props) => (
	<Stepper activeStep={ props.stepActive } alternativeLabel>
		{
			props.steps.map(label => (
				<Step key={ label }>
					<StepLabel>{ label }</StepLabel>
				</Step>
			))
		}
	</Stepper>
)

export default Steps

Steps.propTypes = {
	steps: PropTypes.array.isRequired,
	stepActive: PropTypes.number.isRequired,
}
