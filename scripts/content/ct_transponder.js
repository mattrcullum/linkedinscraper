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

            case 'next_page':

                var $next = $('#results-pagination .next a');
                if ($next.length) {
                    window.location.href = 'https://linkedin.com' + $next.attr('href');
                }
                else(callback({next: false}))
                break;

            case 'get_people_list':
                var people_list = [];


                // get each div element containing a person.
                // Our goal is to parse each div into an object literal
                var $people = $('#results .mod.result.people');

                // people will contain a list of people we've extracted from $people

                $.each($people, function (index, person) {
                    var $person = $(person);
                    var name = $person.find('h3 .title').text();
                    var description = $person.find('.description').text();
                    var profile_url = $person.find('.bd a.title').attr('href');

                    // we're only interested in profiles we can actually view
                    if (name != "LinkedIn Member") {
                        people_list.push({
                            name: name,
                            description: description,
                            profile_url: profile_url
                        })
                    }
                    console.log(people_list)
                });
                callback(people_list);
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
