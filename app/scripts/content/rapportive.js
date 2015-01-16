/**
 * Created by matthew on 1/12/15.
 */

exports.checkEmail = function (email) {
    email = email.replace(' ', '');
    var name = message.args.full_name;
    console.log('email: ' + email);
    console.log('name: ' + name);
    var $element = $("textarea").first();

    $element.focus();
    $element.text(email);
    $element.blur();
    setTimeout(function (callback) {
        var wait_for_rapportive_sidebar = setInterval(function (callback) {
            var $rapportive = $('#rapportive-sidebar');
            if ($rapportive.length != 0 && !$rapportive.has('.wip-spinner').length && !$rapportive.find('.links li a:contains("Looking up...")').length) {
                clearInterval(wait_for_rapportive_sidebar)
                var $name = $rapportive.find('h1.name').first().text().trim().toLowerCase();
                $('[data-tooltip="Discard draft"]').click();
                var wait_for_draft_discard = setInterval(function (callback) {
                    $send_button = $('div[role="button"]:contains("Send")').length
                    if (!$send_button) {
                        clearInterval(wait_for_draft_discard);
                        if ($name == name) {
                            callback({correct: true})
                            console.log('found email')
                        }
                        else {
                            console.log('wrong')
                            callback({correct: false})
                        }
                    }
                }, 100, callback)
            }
        }, 100, callback);
    }, 1500, callback);
}

