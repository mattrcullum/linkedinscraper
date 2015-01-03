/**
 * Created by matthew on 12/31/14.
 */
(function () {
    var people;

    exports.start = function (peopleArg) {
        people = peopleArg;
        function series(item) {
            if (item) {
                chrome.tabs.create({url: item.profileUrl}, function (tab) {
                    chrome.tabs.onUpdated.addListener(tabListener)
                    function tabListener(tabId, info) {
                        if (tabId == tab.id && info.status == "complete") {
                            send_to.tab(tab.id, "getProfileInfo", profileInfo)
                        }
                    }
                    function profileInfo(result){
                        people.push(result);
                        series(unsorted_people.shift())
                    }
                })
            }
            else {
                callback()
            }
        }

    }

    $.each(people, function (index, person) {
        var name = person.name.split(' ');
        var description = person.description;
        var first_name = name[0];
        var last_name = name[1].replace(/\(|\)|,/g, '');
        people.push({
            name: {first: first_name, last: last_name},
            full_name: (first_name + ' ' + last_name),
            description: description
        });
        load_tab_then_close(person.profile_url, function () {
            if (index == people.length - 1) {
                send_to.tab(scrape_tab_id, 'next_page', function (response) {
                    if (!response.next) {
                        running = false;
                    }
                });
            }
        })
    });
})