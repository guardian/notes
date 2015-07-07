window.setTimeout(bootstrap, 3000);
/*document.addEventListener("DOMContentLoaded", bootstrap});*/

function bootstrap() {

    var noteEl = document.querySelector(".selection-sharing .social");
    var noteHTML = noteEl.innerHTML;
    noteEl.innerHTML = noteHTML + '<li class="social__item" data-link-name="note"><a class="rounded-icon social-icon social-icon--note" target="_blank" href="#"><svg width="22" height="22" viewBox="0 0 20 20" style="padding: 10px 0 0 8px;"><path d="M13 0l1 1v7l-1 1H7l-2 3H4V9H2L1 8V1l1-1h11z" style="fill: white;"></path></svg></a></li>';

    $('.social-icon--note').click(displayNoteForm);
}

function displayNoteForm(event) {
    var form = '<div class="d-comment-box__content js-note-form">' +
        '<div class="d-comment-box__messages"></div>' +
        '<textarea name="body" class="textarea d-comment-box__body" placeholder="Join the discussion…"></textarea>' +
        '<button type="submit" class="u-button-reset button button--large button--primary submit-input d-comment-box__submit js-note-submit">Post your note</button>' +
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
        '</div>' +
        '<ul class="d-thread d-thread--notes js-note-list">' +
        '</ul>';

    var selection = window.getSelection();
    var p = $(selection.baseNode).closest('p')[0];
    var pid = p.attributes.name.value;

    event.preventDefault();
    p.innerHTML = p.innerHTML + form;

    $('.js-note-cancel').click(function() {
        removeNote('.js-note-form');
    });

    $('.js-note-submit').click(function() {
        addNote('.js-note-list');
    });
}

function removeNote(el) {
    var removeEl = document.querySelector(el);
    removeEl.parentElement.removeChild(removeEl);
}

function addNote(el) {
    var parentEl = document.querySelector(el),
        childEl = document.createElement('li'),
        text = $('.js-note-form textarea').val(),
        noteTemplate =         
        '<div class="d-comment__inner d-comment__inner--top-level">'+
            '<div class="d-comment__meta">' +
                '<span class="d-comment__avatar-wrapper">' +
                '<img src="http://genfu.azurewebsites.net/content/ninja.png" alt="" class="d-comment__avatar">' +
                '</span>' +
                '<div class="d-comment__meta-text">' +
                '<span itemscope="" itemprop="author" itemtype="http://schema.org/Person" title="Ninja" class="d-comment__author">' +
                '<a href="https://profile.theguardian.com/user/id/10708888" itemprop="url">' +
                '<span itemprop="givenName">Ninja</span></a></span>' +
                '<div class="d-comment__timestamp">' +
                '<a href="http://discussion.theguardian.com/comment-permalink/54497806" class="d-comment__timestamp block-time">' +
                '<time class="js-timestamp" itemprop="dateCreated" datetime="2015-06-26T15:46:05Z" data-timestamp="1435329965000" data-relativeformat="med" title="Permalink to this comment (7 July 2015)">7 July 2015</time>' +
                '<i class="i i-comment-anchor"></i>' +
                '</a>' +
                '</div>' +
                '</div>' +
            '</div>' +

            '<div class="d-comment__content">' +
                '<div class="d-comment__recommend js-recommend-comment" data-comment-id="54497806" data-user-id="10708888" data-recommend-count="0" title="0 recommendations">' +
                '<button class="u-button-reset d-comment__recommend-button">' +
                '<span class="d-comment__recommend-pulse"></span>' +
                '<i></i>' +
                '</button>' +
                '<span class="d-comment__recommend-count js-recommend-count">' +
                '<span class="d-comment__recommend-count--old">0</span>' +
                '<span class="d-comment__recommend-count--new">1</span>' +
                '</span>' +
                '</div>' +

                '<div class="d-comment__main ">' +
                '<div class="d-comment__body" itemprop="text">' +
                '<p class="js-note-text">'+ text +'</p>' +
                '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
        childEl.innerHTML = noteTemplate;
        parentEl.appendChild(childEl);
        
        $('.js-note-form textarea').val('');
}

function renderComments(node) {}
