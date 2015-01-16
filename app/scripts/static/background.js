(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.scraper = require('./scraper.js');


//var permuter = require('./permuter.js');
//var find_last_names = require('./last_names.js');
//var email_verifier = require('./email_check.js');
},{"./scraper.js":2}],2:[function(require,module,exports){
/**
 * Created by matthew on 12/13/14.
 */
// results

// scrape status
var running = false;

var scrape_tab = 0;

var settings;
var masterCallback;
var people = [];

var status = {};


function initialize(settingsArg, callbackArg) {
    //initialization
    running = true;
    settings = settingsArg;
    masterCallback = callbackArg;
    settings.limit = 45;

    start();
}

function start() {
    function getBatch(callback) {
        async.series([
            create_scrape_tab,
            getProfileLinks,
            callback
        ])
    }

    function finish() {
        masterCallback()
    }

    // program control
    function controller() {
        getBatch(function () {
            if (status.done) {
                finish();
            }
            else getBatch(controller)
        })
    }

    controller();
}

// stops module and ties loose ends
function stop() {
    if (scrape_tab) {
        chrome.tabs.remove(scrape_tab);
        scrape_tab = false;
        running = false;
        status.done = true;
        masterCallback();
    }
}

// creates a tab we'll use for screen scraping
function create_scrape_tab(callback) {
    if (scrape_tab) {
        callback();
        return;
    }

    var url =
        'http://linkedin.com/' +
        'vsearch/' +
        'p?title=' + settings.positionFilter +
        '&f_CC=' + settings.CompanyIDs +
        '&openAdvancedForm=true&titleScope=C&locationType=I';

    // create the tab
    chrome.tabs.create({url: url}, function (tab) {
        scrape_tab = tab.id;
        chrome.tabs.onUpdated.addListener(waitForTab)
    });

    // after tab creation return control to the calling function
    function waitForTab(tabId, info) {
        if (info.status == "complete" && tabId == scrape_tab) {
            chrome.tabs.onUpdated.removeListener(waitForTab);
            callback();
        }
    }
}

function getProfileLinks(callback) {
    // ask content script for all the profile links on the page
    callTabAction(scrape_tab, 'getProfileLinks', processLinkBatch);

    function processLinkBatch(response) {
        var hasNextPage = response.hasNextPage;
        var limit = settings.limit;

        // if response is empty, we have a serious issue
        if (!response) {
            console.error("Response for processLinkBatch is:" + response);
            debugger;
        }

        // if there are no more pages, we're done!
        else if (!hasNextPage) {
            status.done = true;
            callback();
        }

        // at this point we're guaranteed to have a response and a next page. we'll check a few things and keep going
        else if (
            response.profileLinks.length != 0 &&
            people.length < limit
        ) {

            // concatenate the response to our existing array
            people = people.concat(response.profileLinks);

            callTabAction(scrape_tab, "nextPage", function () {
                log('asking for next page')
                callback();
            })
        }
        else {
            debugger;
            console.error('reached else statement in processLinkBatch')
        }
    }
}


// stops module on cancelScrape event
window.addEventListener("cancelScrape", function () {
    stop();
});

// the api for this module
module.exports = {
    start: initialize,
    stop: stop,
    people: people
};


function log(message) {
    console.log(message)
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL3NjcmFwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIndpbmRvdy5zY3JhcGVyID0gcmVxdWlyZSgnLi9zY3JhcGVyLmpzJyk7XG5cblxuLy92YXIgcGVybXV0ZXIgPSByZXF1aXJlKCcuL3Blcm11dGVyLmpzJyk7XG4vL3ZhciBmaW5kX2xhc3RfbmFtZXMgPSByZXF1aXJlKCcuL2xhc3RfbmFtZXMuanMnKTtcbi8vdmFyIGVtYWlsX3ZlcmlmaWVyID0gcmVxdWlyZSgnLi9lbWFpbF9jaGVjay5qcycpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEyLzEzLzE0LlxuICovXG4vLyByZXN1bHRzXG5cbi8vIHNjcmFwZSBzdGF0dXNcbnZhciBydW5uaW5nID0gZmFsc2U7XG5cbnZhciBzY3JhcGVfdGFiID0gMDtcblxudmFyIHNldHRpbmdzO1xudmFyIG1hc3RlckNhbGxiYWNrO1xudmFyIHBlb3BsZSA9IFtdO1xuXG52YXIgc3RhdHVzID0ge307XG5cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZShzZXR0aW5nc0FyZywgY2FsbGJhY2tBcmcpIHtcbiAgICAvL2luaXRpYWxpemF0aW9uXG4gICAgcnVubmluZyA9IHRydWU7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc0FyZztcbiAgICBtYXN0ZXJDYWxsYmFjayA9IGNhbGxiYWNrQXJnO1xuICAgIHNldHRpbmdzLmxpbWl0ID0gNDU7XG5cbiAgICBzdGFydCgpO1xufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBmdW5jdGlvbiBnZXRCYXRjaChjYWxsYmFjaykge1xuICAgICAgICBhc3luYy5zZXJpZXMoW1xuICAgICAgICAgICAgY3JlYXRlX3NjcmFwZV90YWIsXG4gICAgICAgICAgICBnZXRQcm9maWxlTGlua3MsXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICBdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICAgICAgbWFzdGVyQ2FsbGJhY2soKVxuICAgIH1cblxuICAgIC8vIHByb2dyYW0gY29udHJvbFxuICAgIGZ1bmN0aW9uIGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGdldEJhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMuZG9uZSkge1xuICAgICAgICAgICAgICAgIGZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBnZXRCYXRjaChjb250cm9sbGVyKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnRyb2xsZXIoKTtcbn1cblxuLy8gc3RvcHMgbW9kdWxlIGFuZCB0aWVzIGxvb3NlIGVuZHNcbmZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgaWYgKHNjcmFwZV90YWIpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHNjcmFwZV90YWIpO1xuICAgICAgICBzY3JhcGVfdGFiID0gZmFsc2U7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgc3RhdHVzLmRvbmUgPSB0cnVlO1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cbn1cblxuLy8gY3JlYXRlcyBhIHRhYiB3ZSdsbCB1c2UgZm9yIHNjcmVlbiBzY3JhcGluZ1xuZnVuY3Rpb24gY3JlYXRlX3NjcmFwZV90YWIoY2FsbGJhY2spIHtcbiAgICBpZiAoc2NyYXBlX3RhYikge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHVybCA9XG4gICAgICAgICdodHRwOi8vbGlua2VkaW4uY29tLycgK1xuICAgICAgICAndnNlYXJjaC8nICtcbiAgICAgICAgJ3A/dGl0bGU9JyArIHNldHRpbmdzLnBvc2l0aW9uRmlsdGVyICtcbiAgICAgICAgJyZmX0NDPScgKyBzZXR0aW5ncy5Db21wYW55SURzICtcbiAgICAgICAgJyZvcGVuQWR2YW5jZWRGb3JtPXRydWUmdGl0bGVTY29wZT1DJmxvY2F0aW9uVHlwZT1JJztcblxuICAgIC8vIGNyZWF0ZSB0aGUgdGFiXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IHVybH0sIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgc2NyYXBlX3RhYiA9IHRhYi5pZDtcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHdhaXRGb3JUYWIpXG4gICAgfSk7XG5cbiAgICAvLyBhZnRlciB0YWIgY3JlYXRpb24gcmV0dXJuIGNvbnRyb2wgdG8gdGhlIGNhbGxpbmcgZnVuY3Rpb25cbiAgICBmdW5jdGlvbiB3YWl0Rm9yVGFiKHRhYklkLCBpbmZvKSB7XG4gICAgICAgIGlmIChpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIgJiYgdGFiSWQgPT0gc2NyYXBlX3RhYikge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHdhaXRGb3JUYWIpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJvZmlsZUxpbmtzKGNhbGxiYWNrKSB7XG4gICAgLy8gYXNrIGNvbnRlbnQgc2NyaXB0IGZvciBhbGwgdGhlIHByb2ZpbGUgbGlua3Mgb24gdGhlIHBhZ2VcbiAgICBjYWxsVGFiQWN0aW9uKHNjcmFwZV90YWIsICdnZXRQcm9maWxlTGlua3MnLCBwcm9jZXNzTGlua0JhdGNoKTtcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NMaW5rQmF0Y2gocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGhhc05leHRQYWdlID0gcmVzcG9uc2UuaGFzTmV4dFBhZ2U7XG4gICAgICAgIHZhciBsaW1pdCA9IHNldHRpbmdzLmxpbWl0O1xuXG4gICAgICAgIC8vIGlmIHJlc3BvbnNlIGlzIGVtcHR5LCB3ZSBoYXZlIGEgc2VyaW91cyBpc3N1ZVxuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUmVzcG9uc2UgZm9yIHByb2Nlc3NMaW5rQmF0Y2ggaXM6XCIgKyByZXNwb25zZSk7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIHBhZ2VzLCB3ZSdyZSBkb25lIVxuICAgICAgICBlbHNlIGlmICghaGFzTmV4dFBhZ2UpIHtcbiAgICAgICAgICAgIHN0YXR1cy5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHdlJ3JlIGd1YXJhbnRlZWQgdG8gaGF2ZSBhIHJlc3BvbnNlIGFuZCBhIG5leHQgcGFnZS4gd2UnbGwgY2hlY2sgYSBmZXcgdGhpbmdzIGFuZCBrZWVwIGdvaW5nXG4gICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgcmVzcG9uc2UucHJvZmlsZUxpbmtzLmxlbmd0aCAhPSAwICYmXG4gICAgICAgICAgICBwZW9wbGUubGVuZ3RoIDwgbGltaXRcbiAgICAgICAgKSB7XG5cbiAgICAgICAgICAgIC8vIGNvbmNhdGVuYXRlIHRoZSByZXNwb25zZSB0byBvdXIgZXhpc3RpbmcgYXJyYXlcbiAgICAgICAgICAgIHBlb3BsZSA9IHBlb3BsZS5jb25jYXQocmVzcG9uc2UucHJvZmlsZUxpbmtzKTtcblxuICAgICAgICAgICAgY2FsbFRhYkFjdGlvbihzY3JhcGVfdGFiLCBcIm5leHRQYWdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsb2coJ2Fza2luZyBmb3IgbmV4dCBwYWdlJylcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncmVhY2hlZCBlbHNlIHN0YXRlbWVudCBpbiBwcm9jZXNzTGlua0JhdGNoJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyBzdG9wcyBtb2R1bGUgb24gY2FuY2VsU2NyYXBlIGV2ZW50XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNhbmNlbFNjcmFwZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgc3RvcCgpO1xufSk7XG5cbi8vIHRoZSBhcGkgZm9yIHRoaXMgbW9kdWxlXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdGFydDogaW5pdGlhbGl6ZSxcbiAgICBzdG9wOiBzdG9wLFxuICAgIHBlb3BsZTogcGVvcGxlXG59O1xuXG5cbmZ1bmN0aW9uIGxvZyhtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSlcbn1cblxuIl19
