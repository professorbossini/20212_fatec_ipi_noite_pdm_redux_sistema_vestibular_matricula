const prompts = require('prompts');
const redux = require ('redux')
//Essa função é criadora de ação
const realizarVestibular = (nome, cpf) => {
    const entre6e10 = Math.random() <= 0.7
    const nota = entre6e10 ? 6 + Math.random() * 4 : Math.random() * 5
    console.log(`nota: ${nota}`)
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

const inicio = async () => {
    const menu = "1-Realizar vestibular\n2-Realizar matrícula\n3-Visualizar meu status\n4-Visualizar lista de aprovados\n0-Sair"
    let resposta
    do{
        try{
            resposta = await prompts({
                type: 'number',
                name: 'opcao',
                message: menu
            })
            switch (resposta.opcao) {
                case 1:{
                    const { cpf } = await prompts ({ //devolve {cpf: 1234}
                        type: 'text',
                        name: 'cpf',
                        message: 'Digite seu cpf'
                    })
                    const { nome } = await prompts ({
                        type: 'text',
                        name: 'nome',
                        message: 'Digite seu nome'
                    })
                    const acao = realizarVestibular (nome, cpf)
                    store.dispatch(acao)
                    break
                }
                case 2: {
                    const { cpf } = await prompts ({ //devolve {cpf: 12}
                        type: 'text',
                        name: 'cpf',
                        message: 'Digite seu cpf'
                    })
                    const aprovado = store.getState().historicoVestibular.find(aluno => aluno.cpf === cpf && aluno.nota >= 6)
                    if (aprovado) {
                        store.dispatch(realizarMatricula(cpf, 'M'))
                        console.log('Ok, matriculado')
                    } 
                    else{
                        store.dispatch(realizarMatricula(cpf, 'NM'))
                        console.log('Infelizmente você não foi aprovado no vestibular ainda.')
                    }
                    break
                }
                case 3: {
                    const { cpf } = await prompts ({ //devolve {cpf: 12}
                        type: 'text',
                        name: 'cpf',
                        message: 'Digite seu cpf'
                    })
                    const aluno = store.getState().historicoMatriculas.find(aluno => aluno.cpf === cpf)
                    if (aluno) {
                        console.log(`Seu status é: ${aluno.status}`)
                    }
                    else{
                        console.log('Seu nome não consta na lista de matrículas')
                    }
                    break
                }
            }
        }
        catch (err){
            console.log("Opção inválida")
        }

    }while (resposta.opcao !== 0)
}

inicio()







// const capturarDados = async() => {
//     const resposta = await prompts({
//         type: 'number',
//         name: 'opcao',
//         message: 'Digite a sua opcao'
//     })
//     console.log(resposta.opcao)
// }

// capturarDados()