/**
 * Created by matthew on 12/16/14.
 */
// google search
//var google_tab_id = 0;

var last_name = function () {
  var done = false;

  function start() {
    var search_tab;
    var iteration = 0;
    var person;

    function wait_for_google(callback) {
      function listen(tabId, changeInfo, tab) {
        if (changeInfo.status == "complete" && tabId == search_tab && tab.url != "https://google.com") {
          callback()
          chrome.tabs.onUpdated.removeListener(listen)
        }
      }

      chrome.tabs.onUpdated.addListener(listen);
    }

    function recursively_get_last_names() {
      person = people[iteration];
      if (person) {
        if (person.name.last.indexOf('.') != -1) {
          wait_for_google(function () {
            send_to.tab(search_tab,
              "get_last_name",
              function (response) {
                if (!response) {
                  throw "Expected a last name from content script, instead received undefined."
                }
                else {
                  person.name.last = response.last_name.replace(/\(|\)|,/g, '');
                  person.full_name = person.name.first + ' ' + person.name.last;
                  ++iteration;
                  recursively_get_last_names();
                }
              })
          });
          chrome.tabs.update(search_tab, {
            url: "https://www.google.com/#q=site:linkedin.com+" +
            person.full_name +
            '+' +
            person.description
          })
        }
        else {
          ++iteration;
          recursively_get_last_names();
        }
      }
      else {
        done = true;
        chrome.tabs.remove(search_tab);
      }
    }

    // google, anyone?
    chrome.tabs.create(
      {url: "https://google.com", active: true}, function (tab) {
        search_tab = tab.id;
        recursively_get_last_names();
      });
  }

  return {
    start: start,
    done: function () {
      return done
    }
  }
};
