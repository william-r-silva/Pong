const hud = document.getElementById('hud');
const hud_ctx = hud.getContext('2d');

const game = document.getElementById('game');
const game_ctx = game.getContext('2d');

window.addEventListener('keyup', onPlayerStopMove);
window.addEventListener('keydown', onPlayerMove);

function onPlayerStopMove(event) {
    const key = event.key;
    switch (key) {
        case 'ArrowUp':
            player.up_pressed = false;
            break;
        case 'ArrowDown':
            player.down_pressed = false;
            break;
    }
}

function onPlayerMove(event) {
    const key = event.key;
    switch (key) {
        case 'ArrowUp':
            player.up_pressed = true;
            break;
        case 'ArrowDown':
            player.down_pressed = true
            break;
    }
}

function animate() {
    drawHUD();
    drawGame();
    updatePlayer();
    requestAnimationFrame(animate);
}

function drawGame() {
    game.width = window.innerWidth;
    game.height = window.innerHeight - 52;

    game_ctx.clearRect(0, 0, game.width, game.height);

    if(GameConfigs.isGameReady){
        drawCircle(game_ctx, GameConfigs.ball);
        GameConfigs.players.forEach(player => {
            drawRect(game_ctx, player);
        });
    } else {
        writeText(game_ctx, 'Aguardando Jogador 2', { font: '3rem Arial', x: game.width / 2, y: game.height / 2 });
    }
}

function drawHUD(){
    hud.width = window.innerWidth;
    hud.height = 52;

    hud_ctx.clearRect(0, 0, hud.width, hud.height);

    const players = GameConfigs.players ?? [];
    let player1_points = 0;
    let player2_points = 0;

    if(players.length == 1){
        player1_points = players[0].points ?? 0;
    } else if(players.length == 2){
        player2_points = players[1].points ?? 0;
    }

    writeText(hud_ctx, player1_points, { x: (hud.width / 2) + 75, y: 25, font: '1.5rem Arial' });
    writeText(hud_ctx, player2_points, { x: (hud.width / 2) - 75, y: 25, font: '1.5rem Arial' });

    writeText(hud_ctx, 'Jogador 1', { x: 75, y: 25, font: '1.5rem Arial' });
    writeText(hud_ctx, 'VS', { x: hud.width / 2, y: 25, font: '1.5rem Arial' });
    writeText(hud_ctx, 'Jogador 2', { x: hud.width - 75, y: 25, font: '1.5rem Arial' });
    
    drawRect(hud_ctx, { x: 0, y: 50, width: hud.width, height: 2, color: '#000000' });
}

function writeText(context, text, { x, y, color, font } = {}) {
    context.font = font ?? '48px Arial';
    context.fillStyle = color ?? '#000000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const mensagem = text;

    const pos_x = x;
    const pos_y = y;

    context.fillText(mensagem, pos_x, pos_y);
}

function drawCircle(context, { x, y, radius, color }) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function drawRect(context, { x, y, width, height, color }) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}