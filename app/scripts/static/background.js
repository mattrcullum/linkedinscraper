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
        chrome.tabs.remove(scrape_tab);
        scrape_tab = false;
        masterCallback(people);
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
        if (!response) {
            console.error(chrome.runtime.lastError)
        }
        // if response is empty, we have an issue
        if (response.error) {
            console.error("Response for processLinkBatch is:" + response.error);
            return;
        }

        var hasNextPage = response.hasNextPage;
        var limit = settings.limit;

        // if there are no more pages, we're done!
        if (!hasNextPage) {
            status.done = true;
            callback();
        }

        // at this point we're guaranteed to have a response and a next page. we'll check a few things and keep going
        else if (response.profileLinks.length != 0) {

            // concatenate the response to our existing array
            people = people.concat(response.profileLinks);

            if (people.length >= limit) {
                status.done = true;
                callback();
            }
            else {

                chrome.tabs.update({url: "http://" + response.nextPage}, function () {
                    function pageChange(tabId, info, tab) {
                        var url = tab.url;

                        if (url != undefined && tabId == scrape_tab && info.status == "complete") {
                            console.log('page done loading');

                            chrome.tabs.onUpdated.removeListener(pageChange);

                            setTimeout(function (callback) {
                                callback();
                            }, 2000, callback);
                        }
                    }

                    chrome.tabs.onUpdated.addListener(pageChange);
                });
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL3NjcmFwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2luZG93LnNjcmFwZXIgPSByZXF1aXJlKCcuL3NjcmFwZXIuanMnKTtcblxuXG4vL3ZhciBwZXJtdXRlciA9IHJlcXVpcmUoJy4vcGVybXV0ZXIuanMnKTtcbi8vdmFyIGZpbmRfbGFzdF9uYW1lcyA9IHJlcXVpcmUoJy4vbGFzdF9uYW1lcy5qcycpO1xuLy92YXIgZW1haWxfdmVyaWZpZXIgPSByZXF1aXJlKCcuL2VtYWlsX2NoZWNrLmpzJyk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMTIvMTMvMTQuXG4gKi9cbi8vIHJlc3VsdHNcblxuLy8gc2NyYXBlIHN0YXR1c1xudmFyIHJ1bm5pbmcgPSBmYWxzZTtcblxudmFyIHNjcmFwZV90YWIgPSAwO1xuXG52YXIgc2V0dGluZ3M7XG52YXIgbWFzdGVyQ2FsbGJhY2s7XG52YXIgcGVvcGxlID0gW107XG5cbnZhciBzdGF0dXMgPSB7fTtcblxuXG5mdW5jdGlvbiBpbml0aWFsaXplKHNldHRpbmdzQXJnLCBjYWxsYmFja0FyZykge1xuICAgIC8vaW5pdGlhbGl6YXRpb25cbiAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuICAgIG1hc3RlckNhbGxiYWNrID0gY2FsbGJhY2tBcmc7XG4gICAgc2V0dGluZ3MubGltaXQgPSA0NTtcblxuICAgIHN0YXJ0KCk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGZ1bmN0aW9uIGdldEJhdGNoKGNhbGxiYWNrKSB7XG4gICAgICAgIGFzeW5jLnNlcmllcyhbXG4gICAgICAgICAgICBjcmVhdGVfc2NyYXBlX3RhYixcbiAgICAgICAgICAgIGdldFByb2ZpbGVMaW5rcyxcbiAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgIF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluaXNoKCkge1xuICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUoc2NyYXBlX3RhYik7XG4gICAgICAgIHNjcmFwZV90YWIgPSBmYWxzZTtcbiAgICAgICAgbWFzdGVyQ2FsbGJhY2socGVvcGxlKTtcbiAgICB9XG5cbiAgICAvLyBwcm9ncmFtIGNvbnRyb2xcbiAgICBmdW5jdGlvbiBjb250cm9sbGVyKCkge1xuICAgICAgICBnZXRCYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzLmRvbmUpIHtcbiAgICAgICAgICAgICAgICBmaW5pc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgZ2V0QmF0Y2goY29udHJvbGxlcilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb250cm9sbGVyKCk7XG59XG5cbi8vIGNyZWF0ZXMgYSB0YWIgd2UnbGwgdXNlIGZvciBzY3JlZW4gc2NyYXBpbmdcbmZ1bmN0aW9uIGNyZWF0ZV9zY3JhcGVfdGFiKGNhbGxiYWNrKSB7XG4gICAgaWYgKHNjcmFwZV90YWIpIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB1cmwgPVxuICAgICAgICAnaHR0cDovL2xpbmtlZGluLmNvbS8nICtcbiAgICAgICAgJ3ZzZWFyY2gvJyArXG4gICAgICAgICdwP3RpdGxlPScgKyBzZXR0aW5ncy5wb3NpdGlvbkZpbHRlciArXG4gICAgICAgICcmZl9DQz0nICsgc2V0dGluZ3MuQ29tcGFueUlEcyArXG4gICAgICAgICcmb3BlbkFkdmFuY2VkRm9ybT10cnVlJnRpdGxlU2NvcGU9QyZsb2NhdGlvblR5cGU9SSc7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYlxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiB1cmx9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIHNjcmFwZV90YWIgPSB0YWIuaWQ7XG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih3YWl0Rm9yVGFiKVxuICAgIH0pO1xuXG4gICAgLy8gYWZ0ZXIgdGFiIGNyZWF0aW9uIHJldHVybiBjb250cm9sIHRvIHRoZSBjYWxsaW5nIGZ1bmN0aW9uXG4gICAgZnVuY3Rpb24gd2FpdEZvclRhYih0YWJJZCwgaW5mbykge1xuICAgICAgICBpZiAoaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiICYmIHRhYklkID09IHNjcmFwZV90YWIpIHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih3YWl0Rm9yVGFiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZXRQcm9maWxlTGlua3MoY2FsbGJhY2spIHtcbiAgICAvLyBhc2sgY29udGVudCBzY3JpcHQgZm9yIGFsbCB0aGUgcHJvZmlsZSBsaW5rcyBvbiB0aGUgcGFnZVxuICAgIGNhbGxUYWJBY3Rpb24oc2NyYXBlX3RhYiwgJ2dldFByb2ZpbGVMaW5rcycsIHByb2Nlc3NMaW5rQmF0Y2gpO1xuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0xpbmtCYXRjaChyZXNwb25zZSkge1xuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcilcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiByZXNwb25zZSBpcyBlbXB0eSwgd2UgaGF2ZSBhbiBpc3N1ZVxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXNwb25zZSBmb3IgcHJvY2Vzc0xpbmtCYXRjaCBpczpcIiArIHJlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYXNOZXh0UGFnZSA9IHJlc3BvbnNlLmhhc05leHRQYWdlO1xuICAgICAgICB2YXIgbGltaXQgPSBzZXR0aW5ncy5saW1pdDtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSBwYWdlcywgd2UncmUgZG9uZSFcbiAgICAgICAgaWYgKCFoYXNOZXh0UGFnZSkge1xuICAgICAgICAgICAgc3RhdHVzLmRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGF0IHRoaXMgcG9pbnQgd2UncmUgZ3VhcmFudGVlZCB0byBoYXZlIGEgcmVzcG9uc2UgYW5kIGEgbmV4dCBwYWdlLiB3ZSdsbCBjaGVjayBhIGZldyB0aGluZ3MgYW5kIGtlZXAgZ29pbmdcbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UucHJvZmlsZUxpbmtzLmxlbmd0aCAhPSAwKSB7XG5cbiAgICAgICAgICAgIC8vIGNvbmNhdGVuYXRlIHRoZSByZXNwb25zZSB0byBvdXIgZXhpc3RpbmcgYXJyYXlcbiAgICAgICAgICAgIHBlb3BsZSA9IHBlb3BsZS5jb25jYXQocmVzcG9uc2UucHJvZmlsZUxpbmtzKTtcblxuICAgICAgICAgICAgaWYgKHBlb3BsZS5sZW5ndGggPj0gbGltaXQpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKHt1cmw6IFwiaHR0cDovL1wiICsgcmVzcG9uc2UubmV4dFBhZ2V9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhZ2VDaGFuZ2UodGFiSWQsIGluZm8sIHRhYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IHRhYi51cmw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwgIT0gdW5kZWZpbmVkICYmIHRhYklkID09IHNjcmFwZV90YWIgJiYgaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UgZG9uZSBsb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIocGFnZUNoYW5nZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMDAsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihwYWdlQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncmVhY2hlZCBlbHNlIHN0YXRlbWVudCBpbiBwcm9jZXNzTGlua0JhdGNoJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyBzdG9wcyBtb2R1bGUgb24gY2FuY2VsU2NyYXBlIGV2ZW50XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNhbmNlbFNjcmFwZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgc3RvcCgpO1xufSk7XG5cbi8vIHRoZSBhcGkgZm9yIHRoaXMgbW9kdWxlXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdGFydDogaW5pdGlhbGl6ZSxcbiAgICBzdG9wOiBzdG9wLFxuICAgIHBlb3BsZTogcGVvcGxlXG59O1xuXG5cbmZ1bmN0aW9uIGxvZyhtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSlcbn1cblxuIl19
