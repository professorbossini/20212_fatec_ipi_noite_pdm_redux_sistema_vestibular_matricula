const prompts = require('prompts');

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

// const capturarDados = async() => {
//     const resposta = await prompts({
//         type: 'number',
//         name: 'opcao',
//         message: 'Digite a sua opcao'
//     })
//     console.log(resposta.opcao)
// }

// capturarDados()