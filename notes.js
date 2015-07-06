window.setTimeout(addNote, 2000);

function addNote() {
    
    var noteEl = document.querySelector(".selection-sharing .social");
    var noteHTML = noteEl.innerHTML;
    noteEl.innerHTML = noteHTML + '<li class="social__item" data-link-name="note"><a class="rounded-icon social-icon social-icon--twitter js-selection-twitter" data-link-name="social-selection" target="_blank" href=""><span class="u-h">Share on Twitter</span><i class="i-share-twitter--white i"></i></a></li>';

    //TODO: ..    
};
