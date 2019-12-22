import React from 'react'

// dependencys
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components Childs
import Content from '../../components/Content'

// Style
import '../../assets/scss/Create.scss'

const initState = {
	title: 'Inicie uma sessão',
	subtitle: 'Login',
}

class Create extends React.Component
{
    
	constructor(props) {
		super(props)
		this.state = {
			...initState,
		}
	}

	contentHeader = () => {
		return (
			<React.Fragment>
				<h1>{this.state.title}</h1>
				<span>{this.state.subtitle}</span>
			</React.Fragment>
		)
	}

	contentBody = () => {
		return (
			<div className="content-body pt-0 pb-0">
				<div className="row d-flex align-items-center">
                    <h1>hello geek</h1>
				</div>
			</div>
		)
    }
    componentDidMount = () =>
    { 
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

export default withRouter(Create)

Create.propTypes = {
	dataFlow: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}
