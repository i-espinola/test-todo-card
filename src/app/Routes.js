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
		<Route exact path="/login" render={ () => <Login data={ props.data } dataFlow={ props.dataFlow } /> } />
		<Route path="/create" render={ () => <Create data={ props.data } dataFlow={ props.dataFlow } /> } />
		{/* <Route path="/home" render={ () => <Home data={ props.data } dataFlow={ props.dataFlow } /> } /> */}
		<Redirect from="*" to="/login" />
	</Switch>
)

export default Routes

Routes.propTypes = {
	dataFlow: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}
