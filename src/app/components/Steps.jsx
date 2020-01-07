import React from 'react'

// dependencys
import PropTypes from 'prop-types'
import { Steps } from 'antd';

const { Step } = Steps

const steps = (props) => {

	return (
		< React.Fragment >
			{ !props.children
				? <Steps progressDot current={ props.active }>
					{
						props.titles.map((title, index) =>
							<Step key={ index } title={ title } />
						)
					}
				</Steps>
				: props.children[props.active]
			}
		</React.Fragment>
	)
}

export default steps

steps.propTypes = {
	active: PropTypes.number.isRequired,
	titles: (props) => (!props.children ? PropTypes.array.isRequired : PropTypes.array),
	subtitles: PropTypes.array,
	children: (props) => (!props.titles ? PropTypes.array.isRequired : PropTypes.array),
}
