/**
 * Created by matthew on 12/13/14.
 */
var LINKED_IN_PEOPLE_CONTAINER = '#rso';

function Actions(message, sender, callback) {
    var li = {
        paginationHasNext: function () {
            return $('#results-pagination .next a').length
        },
        getProfileLinks: function () {
            var profile_links = [];
            var response = {};

            // grab each profile link and push it to profile_links[]
            var $profileLinks = $('#results .mod.result.people .bd h3 a.title');

            $.each($profileLinks, function (index, link) {
                var link = $(link).attr('href');
                profile_links.push({
                    profile_url: link
                })
            });

            response.profile_links = profile_links;
            response.paginationHasNext = $paginationNext;

            callback(response);
        },

        goToNextPage: function () {
            $('#results-pagination .next a')[0].click();

            var waitForNextPage = setInterval(function (callback) {
                if ($('#voltron-overlay').is(':empty')) {
                    clearInterval(waitForNextPage);
                    callback();
                }
            }, 20, callback);
        }
    }
    var rapportive = {
        checkEmail: function (email) {
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
    }
};

function actionExists(website, actionName) {
    if (typeof Actions[website][actionName] == 'function') {
        return true;
    }
}

// callback when element is present
function waitForElement($element, callback) {

    var checkExistence = setInterval(function ($element, callback) {
        if ($element.length) {
            clearInterval(checkExistence);
            callback();
        }
    }, 20, $element, callback);
}

function messageReceived(message, sender, callback) {
    if (message.to != 'content') return;

    var website = message.website;
    var action = message.action;

    if (actionExists(website, action)) {
        var action = new Actions();
        action[website][action](message, sender, callback);
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);

