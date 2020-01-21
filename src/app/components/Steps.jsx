import React from 'react'

// dependencys
import PropTypes from 'prop-types'
import { Steps } from 'antd';


const Stages = (props) => {
	
	const { Step } = Steps

	return (
		< React.Fragment >
			{ !props.children
				? <Steps progressDot current={ props.active }>
					{
						props.titles.map((title, index) =>
							<Step key={ index } title={ title } description={ props.subtitles[index] } />
						)
					}
				</Steps>
				: props.children[props.active]
			}
		</React.Fragment>
	)
}

Stages.propTypes = {
	titles: (props) => !(props.children ? PropTypes.array.isRequired : PropTypes.array),
	children: (props) => !(props.titles ? PropTypes.array.isRequired : PropTypes.array),
	active: PropTypes.number.isRequired,
	subtitles: PropTypes.array,
}

export default Stages
