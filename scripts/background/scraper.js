/**
 * Created by matthew on 12/13/14.
 */
// results

var scrape = (function () {

  // scrape status
  var running = false;

  var scrape_tab_id = 0;
  var scrape_ready = false;

  function start(url) {
    running = true;
    open_scrape_tab(url);
  }

  // retrieves the list of people on the current page
  function scrape_current_page() {
    scrape_ready = false;
    send_to.tab(scrape_tab_id, "get_people_list", function (unsorted_people) {
      if (!unsorted_people) {
        return;
      }

      $.each(unsorted_people, function (index, person) {
        var name = person.name.split(' ');
        var description = person.description;
        var first_name = name[0];
        var last_name = name[1].replace(/\(|\)|,/g, '');
        people.push({name: {first: first_name, last: last_name}, full_name: (first_name + ' ' + last_name), description: description});
      });

      send_to.tab(scrape_tab_id, 'next_page', function (response) {
        if (!response.next) {
          running = false;
        }
      });
    })
  }

  function open_person_profile(profile_url){
    chrome.tabs.create(profile_url, function(tab){

    })
  }

  function open_scrape_tab(url) {

    function tab_ready(tabId, info) {
      if (tabId == scrape_tab_id) {
        if (people.length > 9) {
          stop();
        }
        if (info.status == "complete" && tabId == scrape_tab_id && running) {
          scrape_current_page();
        }

      }
    }

    chrome.tabs.create({url: url, active: false}, function (tab) {
      scrape_tab_id = tab.id;
      chrome.tabs.onUpdated.addListener(tab_ready)
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

)
