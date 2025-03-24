const WebSocket = require("ws");
const readline = require("readline-sync");
const players = require("./players");

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
    console.log("✅ Conectado ao servidor WebSocket!");
    chooseCharacter(); // O jogador escolhe seu personagem
});

ws.on("message", (message) => {
    try {
        const data = JSON.parse(message);

        if (data.type === "confirmation") {
            console.log(data.message);
        } else if (data.type === "error") {
            console.log(`❌ ${data.message}`);
            chooseCharacter(); // Se der erro, escolhe novamente
        } else if (data.type === "start_game") {
            console.log(`\n${data.message}`);
        } else if (data.type === "race_update") {
            console.log(`\n${data.message}`); // Apenas exibe a rodada da corrida
        } else if (data.type === "race_end") {
            console.log(`\n${data.message}`);
            startChat(); // Após a corrida, inicia o chat
        } else if (data.type === "chat") {
            console.log(`📩 Mensagem recebida: 💬 ${data.message}`);
        }

    } catch (error) {
        console.log("⚠ Erro ao processar mensagem recebida.");
    }
});

// Escolha de personagem
function chooseCharacter() {
    console.log(`\nEscolha seu personagem:`);

    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.NOME}`);
    });

    let choice;
    do {
        choice = parseInt(readline.question("Digite o número do personagem: ").trim(), 10);
    } while (isNaN(choice) || choice < 1 || choice > players.length);

    const chosenCharacter = players[choice - 1];

    ws.send(JSON.stringify({ type: "character_choice", character: chosenCharacter.NOME }));

    console.log(`✅ Você escolheu ${chosenCharacter.NOME}. Aguardando outro jogador...`);
}

// Inicia o chat após a corrida
function startChat() {
    console.log("💬 O chat está aberto! Digite mensagens ou 'sair' para encerrar.");

    // Criando uma entrada assíncrona para permitir mensagens recebidas enquanto escreve
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (message) => {
        message = message.trim();
        if (message.toLowerCase() === "sair") {
            console.log("🚪 Você saiu do chat.");
            process.stdin.pause();
            return;
        }
        ws.send(JSON.stringify({ type: "chat", message }));
    });
}

// Função que exibe o vencedor da corrida
async function declareWinner(character1, character2) {
    console.log("\n🏁 Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n🏆 ${character1.NOME} venceu a corrida! Parabéns!`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n🏆 ${character2.NOME} venceu a corrida! Parabéns!`);
    } else {
        console.log("🏁 A corrida terminou em empate!");
    }
}

// Função para gerar blocos aleatórios (Reta, Curva ou Confronto)
async function getRandomBlock() {
    let random = Math.random();
    if (random < 0.33) return "RETA";
    if (random < 0.66) return "CURVA";
    return "CONFRONTO";
}

// Função para rolar o dado (de 1 a 6)
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Função para exibir o resultado da rolagem do dado
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}
