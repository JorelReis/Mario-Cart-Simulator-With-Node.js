<h1>Projeto: Mario Kart.JS</h1>

  <table>
        <tr>
            <td>
                <img src="./docs/header.gif" alt="Mario Kart" width="200">
            </td>
            <td>
                <b>Objetivo:</b>
                <p>🏎️ Mario Kart Simulator - Node.js & WebSocket
Este projeto é uma simulação de corrida inspirada no Mario Kart, utilizando Node.js e WebSocket para permitir partidas entre dois jogadores em tempo real.</p>
            </td>
        </tr>
    </table>

<h2>Players</h2>
      <table style="border-collapse: collapse; width: 800px; margin: 0 auto;">
        <tr>
            <td style="border: 1px solid black; text-align: center;">
                <p>Mario</p>
                <img src="./docs/mario.gif" alt="Mario Kart" width="60" height="60">
            </td>
            <td style="border: 1px solid black; text-align: center;">
                <p>Velocidade: 4</p>
                <p>Manobrabilidade: 3</p>
                <p>Poder: 3</p>
            </td>
             <td style="border: 1px solid black; text-align: center;">
                <p>Peach</p>
                <img src="./docs/peach.gif" alt="Mario Kart" width="60" height="60">
            </td>
            <td style="border: 1px solid black; text-align: center;">
                <p>Velocidade: 3</p>
                <p>Manobrabilidade: 4</p>
                <p>Poder: 2</p>
            </td>
              <td style="border: 1px solid black; text-align: center;">
                <p>Yoshi</p>
                <img src="./docs/yoshi.gif" alt="Mario Kart" width="60" height="60">
            </td>
            <td style="border: 1px solid black; text-align: center;">
                <p>Velocidade: 2</p>
                <p>Manobrabilidade: 4</p>
                <p>Poder: 3</p>
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid black; text-align: center;">
                <p>Bowser</p>
                <img src="./docs/bowser.gif" alt="Mario Kart" width="60" height="60">
            </td>
            <td style="border: 1px solid black; text-align: center;">
                <p>Velocidade: 5</p>
                <p>Manobrabilidade: 2</p>
                <p>Poder: 5</p>
            </td>
            <td style="border: 1px solid black; text-align: center;">
                <p>Luigi</p>
                <img src="./docs/luigi.gif" alt="Mario Kart" width="60" height="60">
            </td>
            <td style="border: 1px solid black; text-align: center;">
                <p>Velocidade: 3</p>
                <p>Manobrabilidade: 4</p>
                <p>Poder: 4</p>
            </td>
            <td style="border: 1px solid black; text-align: center;">
                <p>Donkey Kong</p>
                <img src="./docs/dk.gif" alt="Mario Kart" width="60" height="60">
            </td>
            <td style="border: 1px solid black; text-align: center;">
                <p>Velocidade: 2</p>
                <p>Manobrabilidade: 2</p>
                <p>Poder: 5</p>
            </td>
        </tr>
    </table>

<p></p>



🚀 Tecnologias Utilizadas

Node.js - Para rodar o servidor e a lógica do jogo.

WebSocket - Para comunicação em tempo real entre os jogadores.

JavaScript - Para implementar as mecânicas de jogo e interatividade.

Readline-Sync - Para entrada de dados no terminal.

Git/GitHub - Para versionamento e compartilhamento do código.


🎯 Objetivo
Criar uma lógica de jogo que simule corridas entre personagens do Mario Kart, levando em consideração regras de velocidade, manobrabilidade e poder.


🏁 Como Funciona?
Dois jogadores se conectam ao servidor WebSocket e escolhem seus personagens.

O jogo sorteia 5 rodadas com diferentes tipos de pistas: Reta, Curva ou Confronto.

Em cada rodada, os jogadores jogam um dado e somam ao atributo correspondente ao tipo da pista.

O jogador com maior valor vence a rodada e ganha um ponto.

No final, quem tiver mais pontos vence a corrida!

⚙️ Regras do Jogo
1️⃣ Escolha de Personagem

Dois jogadores escolhem um personagem cada.

2️⃣ Rodadas

São 5 rodadas com trechos aleatórios da pista:

RETA: Testa a Velocidade.

CURVA: Testa a Manobrabilidade.

CONFRONTO: Testa o Poder.

3️⃣ Mecânica dos Dados

Em cada rodada, os jogadores jogam um dado de 6 lados.

O resultado do dado é somado ao atributo correspondente do personagem.

Quem tiver o maior valor ganha um ponto.

4️⃣ Condição de Vitória

Ao final das 5 rodadas, quem tiver mais pontos vence a corrida.

Empates são possíveis! 🏁

📡 Como Jogar?
Clone o repositório:
git clone https://github.com/seu-usuario/mario-kart-simulator.git
cd mario-kart-simulator

Instale as dependências:
npm install

Inicie o servidor:
node src/server.js

Abra dois terminais e rode os jogadores:
node src/index.js
Escolha seu personagem e jogue! 🎮

💬 Chat Após a Corrida
Depois que a corrida termina, os jogadores podem conversar no chat integrado.

O chat suporta mensagens em tempo real até que um dos jogadores digite "sair".
