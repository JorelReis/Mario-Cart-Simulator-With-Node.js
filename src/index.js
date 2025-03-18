const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS : 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS : 0,
};



// Objetivo : Rolar o dado de 1 a 6 para escolher os personagens. 
//Declaramos a função e utilizamos o Math que é uma ferramenta do node para matemática. 
// O .random sorteira um numero aleario de 0 a 1, então múltiplicamos por 6 e arredondamos com o .florr. Depois somamos com 1 porque o dado vai de 1-6 e nao de 0-5.
// damos o return antes pois outras funções do lado de fora chamarão essa function. 
//async para transformarmos essa função em assíncrona, e esperar uma coisa terminar para depois ela começar.

async function rollDice (){
    return Math.floor(Math.random()*6) + 1;
}

// Função motor para corrida, essa é uma função que recebe parametros, ou seja, outras funções de fora mandaram coisas para ele.
// Usaremos o for, para fazer um laço de repetição. 
async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round ++) {
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco

    }
}

//Função principal (ela que chama as outras funções):
//função entre parenteses com parenteses no final é uma função auto invocácvel. Ela se chama sozinha ao executar o index.js
//Function chain, uma function dentro da outra. 
(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );
// Await para esperar esse código executar para depois ele ir para a próxima coisa.
    await playRaceEngine(player1, player2);
})()

