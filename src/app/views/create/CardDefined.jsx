import React from 'react'

// dependencys
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components childs
import { Result } from 'antd'

const CardDefined = (props) => 
{

    const listEmpty = () =>
    {
        const btnCreate = () => (
            <button
                type="button"
                className="secondary"
                onClick={ () => props.history.push('/new-list') }
            >
                Criar lista pré-definida
            </button>
        )

        return (
            <Result
                status="404"
                title="Nenhuma lista encontrada"
                subTitle="Parece que você ainda não criou uma lista de produtos pré-definida."
                extra={ btnCreate() }
            />
        )
    }

    const listRender = () =>
    { 
        return <h1>render lists</h1>
    }

    return (
        <React.Fragment>
            { props.createData.user.list.length
                ? listRender()
                : listEmpty()
            }
        </React.Fragment>
    )
}

CardDefined.propType = {
    createFlow: PropTypes.func.isRequired,
    createData: PropTypes.shape({
        user: PropTypes.shape({
            list: PropTypes.array
        }).isRequired
    }).isRequired
}

export default withRouter(CardDefined)
