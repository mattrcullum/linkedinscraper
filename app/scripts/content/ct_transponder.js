/**
 * Created by matthew on 12/13/14.
 */


chrome.runtime.onMessage.addListener(function (request, message_sender, callback) {
    if (request.to == 'content') {
        switch (request.message) {
            case 'on_page_ready':
            {
                $(document).ready(function () {
                    callback();
                })
            }
                break;

            case 'get_profile_links':
                var $paginationNext = $('#results-pagination .next a').length;
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
                break;

            case 'nextPage':
                $('#results-pagination .next a')[0].click();

                var waitForNextPage = setInterval(function (callback) {
                    if ($('#voltron-overlay').is(':empty')) {
                        clearInterval(waitForNextPage);
                        console.log('case nextPage')
                        callback();
                    }
                }, 20, callback);
                break;

            case 'get_last_name':
                var cycle = setInterval(function (callback) {
                    if ($('#rso').length) {
                        var name = $('#rso .srg .g:first-child a:first-child').text().split('|')[0].trim().split(' ');
                        console.log(name)
                        var last_name = name[1];
                        callback({last_name: last_name});
                        clearInterval(cycle)
                    }
                }, 1000, callback);
                break;

            case 'get_email':

                var email = request.args.email;
                email = email.replace(' ', '');
                var name = request.args.full_name;
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
                break
        }
    }
    return true;
});
