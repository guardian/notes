window.setTimeout(addNote, 2000);

function addNote() {

    var noteEl = document.querySelector(".selection-sharing .social");
    var noteHTML = noteEl.innerHTML;
    noteEl.innerHTML = noteHTML + '<li class="social__item" data-link-name="note"><a class="rounded-icon social-icon social-icon--note js-selection-twitter" data-link-name="social-selection" target="_blank" href=""><span class="u-h">Share on Twitter</span><svg width="22" height="22" viewBox="0 0 20 20" style="padding: 10px 0 0 8px;"><path d="M13 0l1 1v7l-1 1H7l-2 3H4V9H2L1 8V1l1-1h11z" style="fill: white;"></path></svg></a></li>';

    //TODO: ..
};
