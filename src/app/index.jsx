// Dependencys
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

// Components Children
import Routes from './Routes'

export default class App extends React.Component 
{
    state = {
        api: 'https://todo-cartoes-api.herokuapp.com/api/',
        user: { id: 0  }
    }

    /**
     * Função responśavel por fazer o transbordo do objeto state de cima para baixo
     * @param {object} data
     */
    dataFlow = (data) => this.setState(data)

    render = () =>
    {
        return (
            <BrowserRouter>
                <Routes topData={ this.state } topFlow={ this.dataFlow.bind(this) } />
            </BrowserRouter>
        )
    }
}
