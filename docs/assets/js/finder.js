function getQuery(hash) {
    var splited = hash.substr(1, hash.length - 1).split('&');
    for(var i = 0; i < splited.length; i++) {
        if (splited[i].startsWith('q=')) {
            return splited[i].split('=')[1];
        }
    }
    return '';
}

function setDisplay(nodeList, value){
    for(var i = 0; i < nodeList.length; i++) {
        nodeList[i].style.display = value;
    }
}

document.addEventListener('DOMContentLoaded', function(){
    /*
     * SEARCH BAR FUNCTION
     */
    var searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', function(){
        var text = searchInput.value;
        window.location.hash = 'q=' + text;
    });
    var hash = '';
    setInterval(function(){
        // update search
        if (hash === window.location.hash) {
            return;
        }
        hash = window.location.hash;
        var query = getQuery(hash);
        var elements = document.querySelectorAll('.icon-list ul li[title]')
        if (query === '') {
            setDisplay(elements, 'block');
        } else {
            setDisplay(elements, 'none');
            elements = document.querySelectorAll('.icon-list ul li[title*="' + query + '"]');
            setDisplay(elements, 'block');
        }
    }, 500);
    /*
     * MODAL FUNCTIONS
     */
    var copyCodeButton = document.getElementById('btn-modal-copy-code');
    var codeInput = document.getElementById('modal-code-input');
    copyCodeButton.addEventListener('click', function(){
        codeInput.selectionStart = 0;
        codeInput.selectionEnd = codeInput.value.length;
        codeInput.focus();
        document.execCommand('copy');
    });
    var iconModal = document.getElementById('icon-modal');
    iconModal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-close')) {
            iconModal.style.display = 'none';
        }
    });
    var modalTitle = document.getElementById('icon-modal-name');
    var modalIconPreview = document.getElementById('icon-modal-preview');
    var icons = document.querySelectorAll('.icon-list ul li');
    for(var i = 0; i < icons.length; i++) {
        icons[i].addEventListener('click', function(e){
            var element = e.target;
            var name = element.tagName.toUpperCase();
            while (name !== 'LI') {
                element = element.parentElement;
                name = element.tagName.toUpperCase();
            }
            var isColored = element.getAttribute('data-color') === 'true';
            var iconName = element.getAttribute('title');
            var code = '<i class="libre" data-icon="' + iconName + '"';
            if (isColored) {
                code = code + ' data-color="true"></i>';
            } else {
                code = code + '></i>';
            }
            codeInput.value = code;
            iconModal.style.display = 'block';
            modalTitle.innerText = (isColored ? '[color] ' : '') + iconName;
            modalIconPreview.innerHTML = element.querySelector('i.libre').outerHTML;
        });
    }
});