const prompts = require('prompts');
const redux = require ('redux')
//Essa função é criadora de ação
const realizarVestibular = (nome, cpf) => {
    const entre6e10 = Math.random() <= 0.7
    const nota = entre6e10 ? 6 + Math.random() * 4 : Math.random() * 5
    //Esse JSON que ela devolve é uma ação
    return {
        type: 'REALIZAR_VESTIBULAR',
        payload: {
            nome,
            cpf,
            nota
        }
    }
}
//essa função é criadora de ação
const realizarMatricula = (cpf, status) => {
    //devolve uma ação condizente com o enunciado
    //Esse JSON que ela devolve é uma ação
    return {
        type: 'REALIZAR_MATRICULA',
        payload: {
            cpf, status
        }
    }
}

//essa função é um reducer
const historicoVestibularReducer = (historicoVestibularAtual = [], acao) => {
    if (acao.type === 'REALIZAR_VESTIBULAR'){
        return [...historicoVestibularAtual, acao.payload]
    }
    return historicoVestibularAtual
}

//essa função é um reducer
const historicoMatriculasReducer = (historicoMatriculasAtual = [], acao) => {
    if (acao.type === 'REALIZAR_MATRICULA'){
        return [...historicoMatriculasAtual, acao.payload]
    }
    return historicoMatriculasAtual
}

// seu estado é desse jeito aqui:
/*
    {
        historicoVestibular: [],
        historicoMatriculas: []
    }
*/
const todosOsReducers = redux.combineReducers({
    historicoVestibular: historicoVestibularReducer,
    historicoMatriculas: historicoMatriculasReducer
})

const store = redux.createStore(todosOsReducers)








// const capturarDados = async() => {
//     const resposta = await prompts({
//         type: 'number',
//         name: 'opcao',
//         message: 'Digite a sua opcao'
//     })
//     console.log(resposta.opcao)
// }

// capturarDados()