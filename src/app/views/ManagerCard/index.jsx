// Dependencys
import React from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'

// Components
import { List, Card, Icon, Modal } from 'antd'
// Components children
import Layout from '../../layouts/LayoutDashboard'

class ManagerCards extends React.Component
{ 
	static propType = {
		topFlow: PropTypes.func.isRequired,
		topData: PropTypes.shape({
			api: PropTypes.string.isRequired,
			user: PropTypes.shape({
				id: PropTypes.number.isRequired,
				cards: PropTypes.array
			})
		}),
	}

	state = {
		myCards: [],
	}

	/**
	* Chama o modal de confirmação de exclusão de lista
	* @param {{ name: string; hash: number; }} item{}
	*/
	confirmRemove = (item) =>
	{
		const { confirm } = Modal

		confirm({
			title: 'Excluir',
			content: `Deseja mesmo excluir o cartão gift de ${ item.name }?`,
			okText: 'Excluir',
			cancelText: 'Cancelar',
			onOk: () => this.removeCard(item.hash),
			onCancel: () => false
		})
	}
	
	/**
	* Remove o cartão solicitado pelo parametro
	* @param {number} hash
	*/
	removeCard = async (hash) =>
	{ 
		const { user } = this.props.topData
		const deleteCard = user.cards.filter(cards => cards.hash !== hash)
		const req = `${ this.props.topData.api }clients/${ user.id }`
		user.cards = deleteCard
		await Axios.put(req, user)
			.then(res =>
				this.props.topFlow({ user: { ...res.data } })
			)
	}

	/**
	* Cria cards dos cartões existentes
	*/
	cardsRender = (item) => { 

		const linkCard = `/my-card${ this.props.topData.user.id }/${ item.hash }`
		const typeCard = typeof (item.content) === 'number' ? 'Cartão crédito' : 'Cartão lista'  
		return (
            <List.Item>
				<Card
					key={ item.key }
					title={ item.name + item.lastName }
					extra={ [
						<Icon type="close" key="remove-card" onClick={ () => this.confirmRemove(item) } />,
					] }
					actions={ [
						 <Link target="_blank" to={ linkCard }><Icon type="credit-card" key="view-card"/></Link>,
					] }
				>
					<p>Validade: <b>{ item.validData }</b></p>
					<p>Tipo: <b>{ typeCard }</b></p>
				</Card>
            </List.Item>
        )
	}

	cardsList = () =>
	{
		const { user } = this.props.topData
		const paginate = user.id ? user.cards.length > 10 ? { pageSize: 10 } : false : false

		return (
			<List
				itemLayout="horizontal"
				bordered={ false }
				locale={ { emptyText: 'Você não tem cartões' } }
				pagination={ paginate }
				dataSource={ user.cards }
				renderItem={ (cards) => this.cardsRender(cards) }
				grid={ {
					gutter: 15,
					sm: 1,
					md: 2,
					lg: 3,
					xl: 4,
				} }
			/>
		)
	}

	componentDidMount = () => { if (!this.props.topData.user.id) this.props.history.push('/') }

	render = () => (
		<Layout>
			<div className="content-head d-flex align-items-center justify-content-center">
				<h1>Cartões gift</h1>
			</div>
			<div className="content-body">
				<div className="row d-flex align-items-center">
					<div className="col mt-2 mb-4">
						{ this.cardsList() }
					</div>
				</div>
			</div>
			<div className="content-footer">
				<div className="row">
					<div className="col mt-2">
						<button
							type="button"
							className="default"
							onClick={ () => this.props.history.goBack() }
						>
							Voltar
						</button>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default withRouter(ManagerCards)
