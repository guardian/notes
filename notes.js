window.setTimeout(bootstrap, 3000);
/*document.addEventListener("DOMContentLoaded", bootstrap});*/

function bootstrap() {

    var noteEl = document.querySelector(".selection-sharing .social");
    var noteHTML = noteEl.innerHTML;
    noteEl.innerHTML = noteHTML + '<li class="social__item" data-link-name="note"><a class="rounded-icon social-icon social-icon--note" target="_blank" href="#"><svg width="22" height="22" viewBox="0 0 20 20" style="padding: 10px 0 0 8px;"><path d="M13 0l1 1v7l-1 1H7l-2 3H4V9H2L1 8V1l1-1h11z" style="fill: white;"></path></svg></a></li>';

    $('.social-icon--note').click(displayNoteForm);
}

function displayNoteForm(event) {
    var form = '<div class="d-comment-box__content js-note-input">' +
        '<div class="d-comment-box__messages"></div>' +
        '<textarea name="body" class="textarea d-comment-box__body" placeholder="Join the discussion…"></textarea>' +
        '<button type="submit" class="u-button-reset button button--large button--primary submit-input d-comment-box__submit" disabled="disabled">Post your comment</button>' +
        '<button type="submit" class="u-button-reset button button--large button--primary submit-input d-comment-box__submit js-note-cancel">Cancel</button>' +
        '<span class="u-fauxlink d-comment-box__preview" role="button">Preview</span>' +
        '<span class="u-fauxlink d-comment-box__hide-preview" role="button">Hide preview</span>' +
        '<span class="u-fauxlink d-comment-box__cancel" role="button">Cancel</span>' +
        '<ul class="d-comment-box__formatting-controls">' +
        '<li class="d-comment-box__formatting-bold" title="Bold">B</li>' +
        '<li class="d-comment-box__formatting-italic" title="Italic">i</li>' +
        '<li class="d-comment-box__formatting-quote" title="Quote">”</li>' +
        '<li class="d-comment-box__formatting-link" title="Link">Link</li>' +
        '</ul>' +
        '<div class="d-comment-box__preview-wrapper">' +
        '<div class="d-comment-box__preview-spout"></div>' +
        '<div class="d-comment-box__preview-block">' +
        '<div class="d-comment-box__preview-body"></div>' +
        '</div>' +
        '</div>' +
        '</div>';

    var selection = window.getSelection();
    var p = $(selection.baseNode).closest('p')[0];
    var pid = p.attributes.name.value;

    event.preventDefault();
    p.innerHTML = p.innerHTML + form;
    
    $('.js-note-cancel').click(removeNoteForm);
}

function removeNoteForm() {
    var formEl = document.querySelector(".js-note-input");
    formEl.parentElement.removeChild(formEl);
}

function renderComments(node) {}
