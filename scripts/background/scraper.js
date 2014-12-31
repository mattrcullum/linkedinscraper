/**
 * Created by matthew on 12/13/14.
 */
// results

var scrape = (function () {
    var base = this;
    // scrape status
    var running = false;

    var scrape_tab_id = 0;
    var scrape_ready = false;
    var settings;
    var callback;
    var people;


    function start(settings, callback) {
        running = true;
        base.settings = settings;
        base.callback = callback;

        create_scrape_tab(function () {
            retrievePeopleList(function () {

            })
        });
    }


    // retrieves the list of people on the current page
    function recursivelyScrape(callback) {
        send_to.tab(scrape_tab_id, "get_people_list", function (unsorted_people) {
            if (unsorted_people) {
                people.push(unsorted_people);
                if (unsorted_people.next) {

                    recursivelyScrape(callback);
                }
                else {
                    callback();
                }
            }
        })
    }

    // creates a tab we'll use for screen scraping
    function create_scrape_tab(callback) {
        var url =
            'http://linkedin.com/' +
            'vsearch/' +
            'p?title=' + position_filter +
            '&f_CC=' + companyIDs +
            '&openAdvancedForm=true&titleScope=C&locationType=I';

        // create the tab
        chrome.tabs.create({url: url, active: false}, function (tab) {
            scrape_tab_id = tab.id;
            chrome.tabs.onUpdated.addListener(waitForTab)
        })

        function waitForTab(tabId, info) {
            if (info.status == "complete" && tabId == scrape_tab_id) {
                callback();
            }
        }
    }

    // checks a few things before calling the retrievePeopleList function
    function prepare_scrape(tabId, info) {
        if (tabId == scrape_tab_id) {
            if (people.length > 9) {
                stop();
            }
            else {
                // the scrape tab has loaded
                if (info.status == "complete" && tabId == scrape_tab_id) {
                    retrievePeopleList(function () {
                        retrieve_people_info()
                    });
                }
            }
        }
    }

    function retrieve_people_info() {
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
    }

    // opens a tab, waits for it to load, then closes it
    function load_tab_then_close(url, callback) {
        chrome.tabs.create({url: url}, function (tab) {
            chrome.tabs.onUpdated.addListener(function (tabId, info) {
                if (tabId == tab.id && info.status == "complete") {
                    chrome.tabs.remove(tab.id)
                    callback()
                }
            })
        })
    }

    function log(message) {
        console.log(message)
    }

    function stop() {
        if (scrape_tab_id) {
            chrome.tabs.remove(scrape_tab_id);
            scrape_tab_id = 0;
            running = false;
        }
    }

    return {
        start: start,
        stop: stop,
        running: function () {
            return running
        }
    }
}
);


