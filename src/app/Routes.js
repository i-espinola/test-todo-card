import React from 'react'

// Tools
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// COMPONENTS VIEWS IMPORTS
import Login from './views/login'
import Create from './views/create'
// import Home from './views/home'

const Routes = props => (
	<Switch>
		<Route exact path="/login" render={ () => <Login topData={ props.topData } topFlow={ props.topFlow } /> } />
		<Route path="/create" render={ () => <Create topData={ props.topData } topFlow={ props.topFlow } /> } />
		{/* <Route path="/home" render={ () => <Home topData={ props.topData } topFlow={ props.topFlow } /> } /> */}
		<Redirect from="*" to="/login" />
	</Switch>
)

export default Routes

Routes.propTypes = {
	topFlow: PropTypes.func.isRequired,
	topData: PropTypes.object.isRequired,
}
