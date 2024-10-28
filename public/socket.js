const socket = io(URL);
socket.on('onError', (data) => {
    Popup.show(data.message);
});

socket.on('onSuccessfullyConnected', (data) => {
    socket.emit('onUpdateScreen', {
        width: window.innerWidth,
        height: window.innerHeight
    });
    animate();
});

socket.on('onUpdateGame', (data) => {
    GameConfigs = data;
    console.log(JSON.stringify(data));
});

function updatePlayer(){
    socket.emit('onUpdatePlayer', player);
}