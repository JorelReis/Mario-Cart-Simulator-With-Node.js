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

//Função para gerar blocos aleatórios. 
async function getRandomBlock() {
    let random = Math.random()
    let result

    //Estrutura condicional para testar um ou mais valores
    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }

    return result
}


async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)//expressão js
}


// Função motor para corrida, essa é uma função que recebe parametros, ou seja, outras funções de fora mandaram coisas para ele.
// Usaremos o for, para fazer um laço de repetição. 

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
      console.log(`🏁 Rodada ${round}`);
  
      // sortear bloco
      let block = await getRandomBlock();
      console.log(`Bloco: ${block}`);
  
      // rolar os dados
      let diceResult1 = await rollDice();
      let diceResult2 = await rollDice();
  
      //teste de habilidade
      let totalTestSkill1 = 0;
      let totalTestSkill2 = 0;
  
      if (block === "RETA") {
        totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
        totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
  
        await logRollResult(
          character1.NOME,
          "velocidade",
          diceResult1,
          character1.VELOCIDADE
        );
  
        await logRollResult(
          character2.NOME,
          "velocidade",
          diceResult2,
          character2.VELOCIDADE
        );
      }
  
      if (block === "CURVA") {
        totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
        totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
  
        await logRollResult(
          character1.NOME,
          "manobrabilidade",
          diceResult1,
          character1.MANOBRABILIDADE
        );
  
        await logRollResult(
          character2.NOME,
          "manobrabilidade",
          diceResult2,
          character2.MANOBRABILIDADE
        );
      }
  
      if (block === "CONFRONTO") {
        let powerResult1 = diceResult1 + character1.PODER;
        let powerResult2 = diceResult2 + character2.PODER;
  
        console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
  
        await logRollResult(
          character1.NOME,
          "poder",
          diceResult1,
          character1.PODER
        );
  
        await logRollResult(
          character2.NOME,
          "poder",
          diceResult2,
          character2.PODER
        );
  
        if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
          console.log(
            `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
          );
          character2.PONTOS--;
        }
  
        if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
          console.log(
            `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
          );
          character1.PONTOS--;
        }
  
        console.log(
          powerResult2 === powerResult1
            ? "Confronto empatado! Nenhum ponto foi perdido"
            : ""
        );
      }
  
      // verificando o vencedor
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.NOME} marcou um ponto!`);
        character1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.NOME} marcou um ponto!`);
        character2.PONTOS++;
      }
  
      console.log("-----------------------------");
    }
  }

  async function declareWinner(character1, character2) {
    console.log("Resultado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(S)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(S)`)

    if(character1.PONTOS > character2.PONTOS){
      console.log(`\n${character1.NOME} venceu a corrida! Parabéns 🏆`)
    } else if(character2.PONTOS > character1.NOME){
      console.log(`\n${character2.NOME} venceu a corrida! Parabéns 🏆`)
    }else{
      console.log("A corrida terminou em empate");
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
    await declareWinner(player1,player2);
})()

