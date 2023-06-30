const socket = io();
let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
    title: "Nombre de usuario",
    input: "text",
    inputValidator: (value) => {
        return !value && "Por favor ingresa tu nombre de usuario";
    },
    allowOutsideClick: false
    }).then(result => {
    user = result.value;

    chatBox.addEventListener("keyup", evt => {
        if (evt.key === "Enter") {
            if (chatBox.value.trim().length > 0) {
                socket.emit("message", { user: user, message: chatBox.value });
                chatBox.value = "";
            }
        }
    });
});

socket.on("messagesLogs", data => {
    let log = document.getElementById("messageLogs");
    let messages = "";
    data.forEach(m => {
    messages = messages + `${m.user}: ${m.message}<br>`;
    });
    log.innerHTML = messages;
});