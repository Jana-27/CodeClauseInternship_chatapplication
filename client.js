const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

const socket = new WebSocket('ws://localhost:3000'); // Replace with your server address

socket.addEventListener('open', (event) => {
    console.log('Connected to the server.');
});

socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.username}: ${message.text}`;
    chat.appendChild(messageElement);
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    const username = 'User'; // You can add user authentication to get the actual username

    if (message && username) {
        const messageObject = { username, text: message };
        socket.send(JSON.stringify(messageObject));
        messageInput.value = '';
    }
});
