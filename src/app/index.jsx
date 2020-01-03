import React from 'react'

// Tools
import { BrowserRouter } from "react-router-dom"

// Components Childs
import Header from './components/Header'
import Routes from './Routes'

const initState = {
	title: 'Welcome Geek',
	subtitle: 'Is the React boilerplate template',
	api: 'http://localhost:3030/',
}

const initUser = {
    // user: {},
    user: { // ENABLE ONLY DEVELOP
        name: 'Ivan Espí­nola Gomes',
        email: 'ivanspinola@gmail.com',
        login: 'logan',
        password: '123',
        list: [],
        cards: [],
        id: 1,
    }
}

export default class App extends React.Component 
{

    constructor (props)
    {
        super(props)
        this.state = {
            ...initState,
            ...initUser,
        }
        this.dataFlow = this.dataFlow.bind(this)
    }

    /**
     * @param {...object} data
     */
    dataFlow = (data) =>
    { 
        this.setState(prevState => ({
            user: { ...prevState.user, data }
        }))
    }

    render = () =>
    {
        return (
            <BrowserRouter>
                <div className="main">
                    <Header />
                    <Routes data={ this.state } dataFlow={ this.dataFlow } />
                </div>
            </BrowserRouter>
        )
    }
}

