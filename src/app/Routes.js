// Dependencys
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components views with routes
import Login from './views/Login'
import Dashboard from './views/Dashboard'

import ManagerCard from './views/ManagerCard/'
import CreateCard from './views/ManagerCard/CreateCard'
import CheckoutCard from './views/ManagerCard/CheckoutCard'
import RenderCard from './views/ManagerCard/RenderCard'

import ManagerList from './views/ManagerList/'
import CreateList from './views/ManagerList/CreateList'


const Routes = (props) =>
{
	const authenticated = props.topData.user.id

	return (
		<Switch>
			<Route
				exact
				path="/login"
				render={() => (
					<Login topData={props.topData} topFlow={props.topFlow} />
				)}
			/>
			<Route
				path="/dashboard"
				render={() => (
					<Dashboard
						topData={props.topData}
						topFlow={props.topFlow}
					/>
				)}
			/>
			<Route
				path="/cards"
				render={() => (
					<ManagerCard
						topData={props.topData}
						topFlow={props.topFlow}
					/>
				)}
			/>
			<Route
				path="/create-card"
				render={() => (
					<CreateCard
						topData={props.topData}
						topFlow={props.topFlow}
					/>
				)}
			/>
			<Route
				path="/lists"
				render={() => (
					<ManagerList
						topData={props.topData}
						topFlow={props.topFlow}
					/>
				)}
			/>
			<Route
				path="/create-list"
				render={() => (
					<CreateList
						topData={props.topData}
						topFlow={props.topFlow}
					/>
				)}
			/>
			<Route path="/checkout-card" render={() => <CheckoutCard />} />
			<Route
				path="/my-card/:userId/:cardHash"
				render={() => <RenderCard />}
			/>
			<Redirect from="*" to={ authenticated ? '/dashboard' : '/login' } />
		</Switch>
	)
}

Routes.propTypes = {
	topFlow: PropTypes.func.isRequired,
	topData: PropTypes.shape({
		api: PropTypes.string.isRequired,
		user: PropTypes.object.isRequired,
	}),
}

export default Routes
