function getMessages() {
    const requeteAjex = new XMLHttpRequest();
    requeteAjex.open("GET", "handler.php");
    requeteAjex.onload = function () {
        const result = JSON.parse(requeteAjex.responseText);
        const html = result.reverse().map(function (message) {
                return `
                    <div class="message">
                        <span class="date">${message.created_at.substring(11, 16)}</span>
                        <span class="author">${message.author}</span> :
                        <span class="content">${message.content}</span>
                    </div>
                    `
        }).join('');

        const messages = document.querySelector('.messages');
        messages.innerHTML= html;
        messages.scrollTop = messages.scrollHeight;
    }
    requeteAjex.send();

}

function postMessage(event) {
    // 1 elle doit stopper le submit button
    event.preventDefault();
    // 2 Elle doit récuperer les données du formulaire
    const author = document.querySelector('#author');
    const content = document.querySelector('#content');
    // 3 Elle doit conditionner les données
    const data = new FormData();
    data.append('author', author.value);
    data.append('content', content.value);

    //4 elle doit configurer une requete ajax en POST et envoyer les données
    const requeteAjax = new XMLHttpRequest();
    requeteAjax.open('POST', 'handler.php?task=write');
    requeteAjax.onload = function () {
        content.value = '';
        content.focus();
        getMessages();
    }
    requeteAjax.send(data);
}

document.querySelector('form').addEventListener('submit', postMessage);

const interval = window.setInterval(getMessages, 3000);

getMessages();