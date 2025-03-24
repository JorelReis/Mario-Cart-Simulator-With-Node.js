//servidor WebSocket
// o WebSocket permite que: 
// ✅ O servidor envie mensagens para o cliente sem que o cliente precise perguntar.
// ✅ O cliente envie mensagens ao servidor, que pode distribuí-las para outros clientes conectados.
// ✅ Ambos se comuniquem em tempo real, como um chat ao vivo.

const WebSocket = require("ws");
const players = require("./players"); // Importa os personagens e seus atributos

const wss = new WebSocket.Server({ port: 8080 });
console.log("🎮 Servidor WebSocket rodando na porta 8080...");

let playersInGame = {}; // Armazena os jogadores conectados
let playerSockets = {}; // Armazena as conexões WebSocket

wss.on("connection", (ws) => {
    console.log("🔌 Novo jogador conectado!");

    ws.on("message", (message) => {
        const data = JSON.parse(message);
    
        if (data.type === "character_choice") {
            if (Object.keys(playersInGame).length < 2) {
                const chosenCharacter = players.find(p => p.NOME === data.character);
                if (chosenCharacter) {
                    playersInGame[data.character] = { ...chosenCharacter, PONTOS: 0 };
                    playerSockets[data.character] = ws;
                    console.log(`✅ ${data.character} foi escolhido!`);
    
                    ws.send(JSON.stringify({ type: "confirmation", message: `✅ Você escolheu ${data.character}` }));
    
                    if (Object.keys(playersInGame).length === 2) {
                        startGame();
                    }
                } else {
                    ws.send(JSON.stringify({ type: "error", message: "Personagem não encontrado!" }));
                }
            } else {
                ws.send(JSON.stringify({ type: "error", message: "Já temos dois jogadores na partida!" }));
            }
        }
    
        // 💬 Se o jogador enviar uma mensagem de chat, repassar para o outro jogador
        if (data.type === "chat") {
            // Repassar a mensagem para todos os jogadores, menos o remetente
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: "chat", message: `💬 ${data.message}` }));
                }
            });
        }
    });
    

    ws.on("close", () => {
        console.log("❌ Jogador desconectado.");
        playersInGame = {};
        playerSockets = {};
    });
});

// Função para iniciar a corrida
function startGame() {
    const playerNames = Object.keys(playersInGame);
    const player1 = playersInGame[playerNames[0]];
    const player2 = playersInGame[playerNames[1]];

    console.log(`🚀 Iniciando jogo entre: ${player1.NOME} e ${player2.NOME}`);

    broadcast({ type: "start_game", message: `🏁 A corrida começou entre ${player1.NOME} e ${player2.NOME}!` });

    playRaceEngine(player1, player2);
}

// Função para enviar mensagens para todos os jogadores
function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

// Função para rodar a corrida no servidor
async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        const block = getRandomBlock();
        const diceResult1 = rollDice();
        const diceResult2 = rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;
        let attribute = "";

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
            attribute = "velocidade";
        } else if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
            attribute = "manobrabilidade";
        } else if (block === "CONFRONTO") {
            totalTestSkill1 = diceResult1 + character1.PODER;
            totalTestSkill2 = diceResult2 + character2.PODER;
            attribute = "poder";
        }

        let message = `🏁 Rodada ${round}\nBloco: ${block}\n`;
        message += `${character1.NOME} 🎲 rolou um dado de ${attribute}: ${diceResult1} + ${character1[attribute.toUpperCase()]} = ${totalTestSkill1}\n`;
        message += `${character2.NOME} 🎲 rolou um dado de ${attribute}: ${diceResult2} + ${character2[attribute.toUpperCase()]} = ${totalTestSkill2}\n`;

        if (totalTestSkill1 > totalTestSkill2) {
            character1.PONTOS++;
            message += `✅ ${character1.NOME} marcou um ponto!\n`;
        } else if (totalTestSkill2 > totalTestSkill1) {
            character2.PONTOS++;
            message += `✅ ${character2.NOME} marcou um ponto!\n`;
        }

        broadcast({ type: "race_update", message });
    }

    declareWinner(character1, character2);
}

// Função para declarar o vencedor
function declareWinner(character1, character2) {
    let message = "\n🏁 Resultado final:\n";
    message += `${character1.NOME}: ${character1.PONTOS} ponto(s)\n`;
    message += `${character2.NOME}: ${character2.PONTOS} ponto(s)\n`;

    if (character1.PONTOS > character2.PONTOS) {
        message += `🏆 ${character1.NOME} venceu a corrida! Parabéns!\n`;
    } else if (character2.PONTOS > character1.PONTOS) {
        message += `🏆 ${character2.NOME} venceu a corrida! Parabéns!\n`;
    } else {
        message += "🏁 A corrida terminou em empate!\n";
    }

    broadcast({ type: "race_end", message });
}

// Função para gerar blocos aleatórios (Reta, Curva ou Confronto)
function getRandomBlock() {
    let random = Math.random();
    if (random < 0.33) return "RETA";
    if (random < 0.66) return "CURVA";
    return "CONFRONTO";
}

// Função para rolar o dado (de 1 a 6)
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
