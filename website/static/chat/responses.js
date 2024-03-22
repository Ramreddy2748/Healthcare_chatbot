function showUserMessage(message, datetime) {
    renderMessageToScreen({
        text: message,
        time: datetime,
        message_side: 'right',
    });
}

function showBotMessage(message, datetime) {
    renderMessageToScreen({
        text: message,
        time: datetime,
        message_side: 'left',
    });
}

$('#send_button').on('click', sendMessage);
$('#msg_input').on('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    var userMessage = $('#msg_input').val().trim();
    if (userMessage !== '') {
        $.ajax({
            url: '/processchat',
            type: 'GET',
            data: {
                text: userMessage,
            },
            success: function (response) {
                console.log('User Message:', userMessage);
                showUserMessage(userMessage, getCurrentTimestamp());
                console.log('Response:', response);
                setTimeout(function () {
                    showBotMessage(response, getCurrentTimestamp());
                }, 300);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    }

    $('#msg_input').val('');
}

function renderMessageToScreen(args) {
    let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    let messagesContainer = $('.messages');

    let message = $(`
        <li class="message ${args.message_side}">
            <div class="avatar"></div>
            <div class="text_wrapper">
                <div class="text">${args.text}</div>
                <div class="timestamp">${displayDate}</div>
            </div>
        </li>
    `);

    messagesContainer.append(message);

    setTimeout(function () {
        message.addClass('appeared');
    }, 0);
    messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

function getCurrentTimestamp() {
    return new Date();
}

$(window).on('load', function () {
    showBotMessage('Hello I am RISA your healthcare chatbot!.');
});

