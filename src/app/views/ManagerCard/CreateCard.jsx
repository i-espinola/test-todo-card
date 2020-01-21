// Dependencys
import React from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import Steps from '../../components/Steps'

// Components children
import Layout from '../../layouts/LayoutDashboard'
import SelectCard from './_StepSelect'
import CheckCard from './_StepCheck'
import BuildCard from './_StepBuildCard'

// Style
import '../../assets/scss/Create.scss'

const initState = {
    title: 'Cartão gift',
    subtitle: 'Configuração',
}

const initStep = {
    stepActive: 0,
    stepsTitles: ['Seleção', 'Criar', 'Confirmação'],
    stepsDescription: ['Selecione o tipo de cartão', 'Configure o cartão', 'Confirme os dados'],
}

const initCardType = {
    cardCredit: false,
    cardList: false,
}

const initForm = {
    validData: '',
    lastName: '',
    name: '',
    value: 0,
    lists: {},
}

const initValidation = {
    empty: false,
    emptyMsg: 'Preencha todos os campos',
    unSelected: false,
    unSelectedMsg: 'Selecione uma das opções'
}

class Create extends React.Component 
{
    static propTypes = {
        topFlow: PropTypes.func.isRequired,
        topData: PropTypes.shape({
            api: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.number.isRequired,
                cards: PropTypes.array
            })
        }),
    }

    constructor (props)
    {
        super(props)
        this.state = {
            ...initStep,
            ...initState,
            ...initCardType,
            ...initForm,
            ...initValidation,
            ...this.props.topData
        }
        this.createFlow = this.createFlow.bind(this)
    }

    createFlow = (data) =>
    {
        const { cardCredit, cardList } = data
        if (cardCredit || cardList)
        {
            this.setState({
                ...initForm,
                ...initCardType,
                ...data,
            })
        } else
        {
            this.state.empty || this.state.unSelected
                ? this.setState({ ...initValidation, ...data })
                : this.setState(data)
        }
    }

    cardSave = async () =>
    {
        const { user } = this.props.topData
        const { state } = this
        const req = `${ this.props.topData.api }clients/${ user.id }`
        const createHash = () =>
        {
            const str = new Date().getMilliseconds().toString() + this.props.location.key
            const hash = str.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
            return hash
        }
        const cardModel = {
            hash: createHash(),
            type: state.cardCredit ? 'credit' : state.cardList ? 'list' : undefined,
            name: state.name,
            lastName: state.lastName,
            content: state.cardCredit ? state.value : state.cardList ? state.lists : undefined,
            validData: state.validData,
        }
        const params = {
            userId: user.id,
            cardHash: cardModel.hash
        }
        user.cards.push(cardModel)

        await Axios.put(req, user).then(res => this.props.topFlow({ user: { ...res.data } }))

        this.setState({
            ...initStep,
            ...initCardType,
            ...initForm,
        })

        this.props.history.push('/checkout-card', params)
    }

    stepValitation = () =>
    {
        const { state } = this
        const step = state.stepActive.toString()
        const validation = {
            cardSelect: state.cardCredit || state.cardList,
            formName: state.name.length && state.lastName.length,
            formList: state.lists.length,
            cardDate: state.validData.length,
            formValue: state.value,
        }

        switch (step)
        {
            case '0':
                validation.cardSelect
                    ? this.setState({ ...initValidation, stepActive: state.stepActive + 1 })
                    : this.setState({ unSelected: true })
                break;

            case '1':
                (validation.formName && (validation.formValue || validation.formList))
                    ? this.setState({ ...initValidation, stepActive: state.stepActive + 1 })
                    : this.setState({ empty: true })
                break;

            case '2':
                this.cardSave()
                break;

            default:
                console.error('chave desconhecida')
                break;
        }
    }

    stepError = () =>
    {
        const error = this.state.empty
            ? this.state.emptyMsg
            : this.state.unSelected
                ? this.state.unSelectedMsg
                : '⠀'
        return error
    }

    stepNav = () => (
        <React.Fragment>
            <button
                type="button"
                className="default"
                onClick={ () => !this.state.stepActive
                    ? this.props.history.goBack()
                    : this.setState({ stepActive: this.state.stepActive - 1 }) }
            >
                Voltar
			</button>
            <span className="step-validation-msg">{ this.stepError() }</span>
            <button
                type="button"
                className="primary"
                onClick={ () => this.stepValitation() }
            >
                { this.state.stepActive === this.state.stepsTitles.length - 1 ? 'Criar cartão' : 'Próximo' }
            </button>
        </React.Fragment>
    )

    stepsBuild = () =>
    {
        const selectCard = <SelectCard key='selectCard' createData={ this.state } createFlow={ this.createFlow } />
        const buildCard = <BuildCard key='buildCard' createData={ this.state } createFlow={ this.createFlow } />
        const checkCard = <CheckCard key='CheckCard' createData={ this.state } createFlow={ this.createFlow } />

        return [selectCard, buildCard, checkCard]
    }

    componentDidMount = () =>
    {
        if (!this.props.topData.user.id) this.props.history.push('/')
    }

    render = () => (
        <Layout>
            <div className="content-head d-flex align-items-center">
                <div className="row">
                <div className="col-auto">
                        <Steps active={ this.state.stepActive } titles={ this.state.stepsTitles } />
                </div>
                </div>
            </div>
            <div className="content-body">
                <div className="row d-flex align-items-center">
                    <div className="col mt-2 mb-4">
                        <Steps active={ this.state.stepActive } >
                            { this.stepsBuild() }
                        </Steps>
                    </div>
                </div>
            </div>
            <div className="content-footer">
                <div className="row">
                    <div className="col mt-2 d-flex align-items-center justify-content-between">
                        { this.stepNav() }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Create)
