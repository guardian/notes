window.setTimeout(bootstrap, 3000);
/*document.addEventListener("DOMContentLoaded", bootstrap});*/

function bootstrap() {

    var noteEl = document.querySelector(".selection-sharing .social");
    var noteHTML = noteEl.innerHTML;
    noteEl.innerHTML = noteHTML + '<li class="social__item" data-link-name="note"><a class="rounded-icon social-icon social-icon--note" target="_blank" href="#"><svg width="22" height="22" viewBox="0 0 20 20" style="padding: 10px 0 0 8px;"><path d="M13 0l1 1v7l-1 1H7l-2 3H4V9H2L1 8V1l1-1h11z" style="fill: white;"></path></svg></a></li>';

    $('.social-icon--note').click(displayNoteForm);
    $('.js-note-icon').click(toggleNote);
    countNote();
}

function displayNoteForm(event) {
    var form = '<div class="d-comment-box__content js-note-form">' +
        '<div class="d-comment-box__messages"></div>' +
        '<textarea name="body" class="textarea d-comment-box__body" placeholder="Join the discussion…"></textarea>' +
        '<button type="submit" class="u-button-reset button button--large button--primary submit-input d-comment-box__submit js-note-submit">Post your note</button>' +
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

    var range = getRangeData(selection);
    highlightSelection(selection);

    event.preventDefault();

    $(p).after(form);
    //p.innerHTML = p.innerHTML + form;

    /*$('.js-note-cancel').click(function() {
        removeNote('.js-note-form');
        unHighlightText(p);
    });*/

    $('.js-note-submit').click(function() {
        addNote('.js-note-list', pid, range.start, range.end);
        unHighlightText(p);
        highlightSource();
        countNote();
    });
}

function highlight(node, startOffset, endOffset) {
    var text = node.innerHTML;
    var beginning = text.substring(0, startOffset);
    var middle = text.substring(startOffset, endOffset);
    var end = text.substring(endOffset);

    node.innerHTML = beginning + '<span class="note-highlight">' + middle + '</span>' + end;
}

function getRangeData(selection) {
    var p = $(selection.baseNode).closest('p')[0];
    var range = selection.getRangeAt(0);
    var startOffset = range.startOffset;
    var endOffset = range.endOffset;
    return { start: startOffset, end: endOffset };
}

function highlightSelection(selection) {
    var p = $(selection.baseNode).closest('p')[0];
    var range = getRangeData(selection);
    highlight(p, range.start, range.end);
}

function highlightSource() {
    $('.js-note-list li').hover(function() {
        var startOffset = this.attributes['data-start'].value;
        var endOffset = this.attributes['data-end'].value;
        var id = this.attributes['data-pid'].value;
        var p = $('p[name=' + id + ']')[0];
        highlight(p, startOffset, endOffset);
    }, function() {
        var id = this.attributes['data-pid'].value;
        var p = $('p[name=' + id + ']')[0];
        unHighlightText(p);
    });
}

function unHighlightText(node) {
    node.innerHTML = node.innerText; // such a hack - mind you all of this is the worst code I have ever written
}

function toggleNote() {
    $('.js-note-form').toggleClass("d-n");
    $('.js-note-list').toggleClass("d-n");
}

function countNote() {
    var count = $('.js-note-list li').length;
    if (count > 0) {
        $('.js-note-icon').addClass("d-b");
        document.querySelector('.js-note-count').textContent = count;
    } else {
        $('.js-note-icon').addClass("d-n");
    }
}

function removeNote(el) {
    var removeEl = document.querySelector(el);
    removeEl.parentElement.removeChild(removeEl);
}

function addNote(el, pid, start, end) {
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
        '<div class="d-comment__main ">' +
        '<div class="d-comment__body" itemprop="text">' +
        '<p class="js-note-text">'+ text +'</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    childEl.innerHTML = noteTemplate;

    childEl.setAttribute('data-pid', pid);
    childEl.setAttribute('data-start', start);
    childEl.setAttribute('data-end', end);

    parentEl.appendChild(childEl);
    //$(parentEl).after(childEl);

    $('.js-note-form textarea').val('');
}

function renderComments(node) {}
