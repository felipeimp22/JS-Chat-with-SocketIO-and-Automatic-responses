

var socket = io('http://localhost:3000c');

function renderMessage(message) {
  $('.messages').append('<div class="message"><strong>' + message.author + '</strong>: ' + message.message + '</div>');
}
socket.on('previousMessage', function (messages) {
  for (message of messages) {
    renderMessage(message);
  }
});

socket.on('receivedMessage', function (message) {
  renderMessage(message);
});


$('#chat').submit(function (event) {
  event.preventDefault();

  var author = $('input[name=username]').val();
  var message = $('input[name=message]').val();
  if (author.length && message.length) {
    console.log("Mensagem Captada!");
    let all = [
      messageObject = {
        author: author,
        message: message,
      },
      bot = {
        author: "Robot",
        message: "oi",
      },
      bot2 = {
        author: "Robot",
        message: "com oque posso te ajudar ?",
      },
      bot3 = {
        author: "Robot",
        message: "não intendi",
      }
    ]
    if (all[0].message === "oi") {

      renderMessage(all[0]);

      renderMessage(all[1]);

    } else if (all[0].message === "help") {

      renderMessage(all[0]);

      renderMessage(all[2]);

    }
    else if (!all[0].message === "help" || "oi") {

      renderMessage(all[0]);

      renderMessage(all[3]);

    }
    // else if (all[0].message === "email") {

    // }
    else {
      renderMessage(all[0]);
    }
    // console.log(all[0].message)
    // renderMessage(all[1]);

    socket.emit('sendMessage', all);
  }
});