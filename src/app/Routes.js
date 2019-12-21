import React from 'react'

// Tools
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// COMPONENTS VIEWS IMPORTS
import Home from './views/home'
import Login from './views/order/Login'

const Routes = props => (
	<Switch>
		<Route
			exact
			path="/home"
			render={() => <Home data={props.data} dataFlow={props.dataFlow} />}
		/>
		<Route
			path="/login"
			render={() => <Login data={props.data} dataFlow={props.dataFlow} />}
		/>
		<Redirect from="*" to="/home" />
	</Switch>
)

export default Routes

Routes.propTypes = {
	dataFlow: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}
