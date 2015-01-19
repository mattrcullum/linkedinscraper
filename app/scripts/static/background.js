(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');

var results = {
    profileLinks: [],
    people: []
};

window.go = function (settings) {
    var routine = [
        scraper.start.bind(undefined, settings.scraper, results),
        getBasicInfo.start.bind(undefined, settings.getBasicInfo, results)
    ];

    routine.push(done);

    async.series(routine);

    function done() {
        console.log(results.profileLinks)
    }
};
//var permuter = require('./permuter.js');
//var find_last_names = require('./last_names.js');
//var email_verifier = require('./email_check.js');
},{"./getBasicInfo.js":2,"./scraper.js":3}],2:[function(require,module,exports){
/**
 * Created by matthew on 1/17/15.
 */
var profileLinks;
var currentWorkingTab;
var isFinished;
var people;
var profileLinks;
var masterCallback;

function init(settingsArg, resultsArg, callbackArg) {

    people = resultsArg.people;
    profileLinks = resultsArg.profileLinks;
    masterCallback = callbackArg;

    iterate()
}

function getBasicInfo(link) {
    chrome.tabs.create({url: link}, function (tab) {
        currentWorkingTab = tab;
        chrome.tabs.onUpdated.addListener(tabUpdated)
    });

    function tabUpdated(tabId, info, tab) {
        if (tabId == currentWorkingTab.id && info.status == "complete") {

            callTabAction(currentWorkingTab.id, "getBasicInfo", handleResponse)

            function handleResponse(basicInfo) {
                chrome.tabs.remove(currentWorkingTab.id);

                people.push(basicInfo);

                if (profileLinks.length) {
                    iterate()
                }

                else{
                    masterCallback();
                }
            }

            chrome.tabs.onUpdated.removeListener(tabUpdated)
        }
    }
}

function iterate() {
    getBasicInfo(profileLinks.shift())
}

module.exports = {
    isFinished: function () {
        return isFinished;
    },
    start: init
}

},{}],3:[function(require,module,exports){
/**
 * Created by matthew on 12/13/14.
 */
// results

// scrape status
var running = false;

var scrape_tab = 0;

var settings;
var masterCallback;

var isFinished = false;

var status = {};
var results;


function initialize(settingsArg, resultsArg, callbackArg) {
    //initialization
    running = true;
    settings = settingsArg;
    settings.limit = 20;
    results = resultsArg;
    masterCallback = callbackArg;
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
        isFinished = true;
        masterCallback();
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
            results.profileLinks = results.profileLinks.concat(response.profileLinks);

            if (results.profileLinks.length >= limit) {
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
    profileLinks: function () {
        return results.profileLinks
    },
    isFinished: function () {
        return isFinished
    }
};


function log(message) {
    console.log(message)
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2dldEJhc2ljSW5mby5qcyIsImFwcC9zY3JpcHRzL2JhY2tncm91bmQvc2NyYXBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHNjcmFwZXIgPSByZXF1aXJlKCcuL3NjcmFwZXIuanMnKTtcbnZhciBnZXRCYXNpY0luZm8gPSByZXF1aXJlKCcuL2dldEJhc2ljSW5mby5qcycpO1xuXG52YXIgcmVzdWx0cyA9IHtcbiAgICBwcm9maWxlTGlua3M6IFtdLFxuICAgIHBlb3BsZTogW11cbn07XG5cbndpbmRvdy5nbyA9IGZ1bmN0aW9uIChzZXR0aW5ncykge1xuICAgIHZhciByb3V0aW5lID0gW1xuICAgICAgICBzY3JhcGVyLnN0YXJ0LmJpbmQodW5kZWZpbmVkLCBzZXR0aW5ncy5zY3JhcGVyLCByZXN1bHRzKSxcbiAgICAgICAgZ2V0QmFzaWNJbmZvLnN0YXJ0LmJpbmQodW5kZWZpbmVkLCBzZXR0aW5ncy5nZXRCYXNpY0luZm8sIHJlc3VsdHMpXG4gICAgXTtcblxuICAgIHJvdXRpbmUucHVzaChkb25lKTtcblxuICAgIGFzeW5jLnNlcmllcyhyb3V0aW5lKTtcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMucHJvZmlsZUxpbmtzKVxuICAgIH1cbn07XG4vL3ZhciBwZXJtdXRlciA9IHJlcXVpcmUoJy4vcGVybXV0ZXIuanMnKTtcbi8vdmFyIGZpbmRfbGFzdF9uYW1lcyA9IHJlcXVpcmUoJy4vbGFzdF9uYW1lcy5qcycpO1xuLy92YXIgZW1haWxfdmVyaWZpZXIgPSByZXF1aXJlKCcuL2VtYWlsX2NoZWNrLmpzJyk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xNy8xNS5cbiAqL1xudmFyIHByb2ZpbGVMaW5rcztcbnZhciBjdXJyZW50V29ya2luZ1RhYjtcbnZhciBpc0ZpbmlzaGVkO1xudmFyIHBlb3BsZTtcbnZhciBwcm9maWxlTGlua3M7XG52YXIgbWFzdGVyQ2FsbGJhY2s7XG5cbmZ1bmN0aW9uIGluaXQoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG5cbiAgICBwZW9wbGUgPSByZXN1bHRzQXJnLnBlb3BsZTtcbiAgICBwcm9maWxlTGlua3MgPSByZXN1bHRzQXJnLnByb2ZpbGVMaW5rcztcbiAgICBtYXN0ZXJDYWxsYmFjayA9IGNhbGxiYWNrQXJnO1xuXG4gICAgaXRlcmF0ZSgpXG59XG5cbmZ1bmN0aW9uIGdldEJhc2ljSW5mbyhsaW5rKSB7XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IGxpbmt9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIGN1cnJlbnRXb3JraW5nVGFiID0gdGFiO1xuICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIodGFiVXBkYXRlZClcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHRhYlVwZGF0ZWQodGFiSWQsIGluZm8sIHRhYikge1xuICAgICAgICBpZiAodGFiSWQgPT0gY3VycmVudFdvcmtpbmdUYWIuaWQgJiYgaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiKSB7XG5cbiAgICAgICAgICAgIGNhbGxUYWJBY3Rpb24oY3VycmVudFdvcmtpbmdUYWIuaWQsIFwiZ2V0QmFzaWNJbmZvXCIsIGhhbmRsZVJlc3BvbnNlKVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVSZXNwb25zZShiYXNpY0luZm8pIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUoY3VycmVudFdvcmtpbmdUYWIuaWQpO1xuXG4gICAgICAgICAgICAgICAgcGVvcGxlLnB1c2goYmFzaWNJbmZvKTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9maWxlTGlua3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdGUoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIG1hc3RlckNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIodGFiVXBkYXRlZClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXRlcmF0ZSgpIHtcbiAgICBnZXRCYXNpY0luZm8ocHJvZmlsZUxpbmtzLnNoaWZ0KCkpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGlzRmluaXNoZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlzRmluaXNoZWQ7XG4gICAgfSxcbiAgICBzdGFydDogaW5pdFxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMTIvMTMvMTQuXG4gKi9cbi8vIHJlc3VsdHNcblxuLy8gc2NyYXBlIHN0YXR1c1xudmFyIHJ1bm5pbmcgPSBmYWxzZTtcblxudmFyIHNjcmFwZV90YWIgPSAwO1xuXG52YXIgc2V0dGluZ3M7XG52YXIgbWFzdGVyQ2FsbGJhY2s7XG5cbnZhciBpc0ZpbmlzaGVkID0gZmFsc2U7XG5cbnZhciBzdGF0dXMgPSB7fTtcbnZhciByZXN1bHRzO1xuXG5cbmZ1bmN0aW9uIGluaXRpYWxpemUoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgLy9pbml0aWFsaXphdGlvblxuICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG4gICAgc2V0dGluZ3MubGltaXQgPSAyMDtcbiAgICByZXN1bHRzID0gcmVzdWx0c0FyZztcbiAgICBtYXN0ZXJDYWxsYmFjayA9IGNhbGxiYWNrQXJnO1xuICAgIHN0YXJ0KCk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGZ1bmN0aW9uIGdldEJhdGNoKGNhbGxiYWNrKSB7XG4gICAgICAgIGFzeW5jLnNlcmllcyhbXG4gICAgICAgICAgICBjcmVhdGVfc2NyYXBlX3RhYixcbiAgICAgICAgICAgIGdldFByb2ZpbGVMaW5rcyxcbiAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgIF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluaXNoKCkge1xuICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUoc2NyYXBlX3RhYik7XG4gICAgICAgIHNjcmFwZV90YWIgPSBmYWxzZTtcbiAgICAgICAgaXNGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIG1hc3RlckNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgLy8gcHJvZ3JhbSBjb250cm9sXG4gICAgZnVuY3Rpb24gY29udHJvbGxlcigpIHtcbiAgICAgICAgZ2V0QmF0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHN0YXR1cy5kb25lKSB7XG4gICAgICAgICAgICAgICAgZmluaXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGdldEJhdGNoKGNvbnRyb2xsZXIpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29udHJvbGxlcigpO1xufVxuXG4vLyBjcmVhdGVzIGEgdGFiIHdlJ2xsIHVzZSBmb3Igc2NyZWVuIHNjcmFwaW5nXG5mdW5jdGlvbiBjcmVhdGVfc2NyYXBlX3RhYihjYWxsYmFjaykge1xuICAgIGlmIChzY3JhcGVfdGFiKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdXJsID1cbiAgICAgICAgJ2h0dHA6Ly9saW5rZWRpbi5jb20vJyArXG4gICAgICAgICd2c2VhcmNoLycgK1xuICAgICAgICAncD90aXRsZT0nICsgc2V0dGluZ3MucG9zaXRpb25GaWx0ZXIgK1xuICAgICAgICAnJmZfQ0M9JyArIHNldHRpbmdzLkNvbXBhbnlJRHMgK1xuICAgICAgICAnJm9wZW5BZHZhbmNlZEZvcm09dHJ1ZSZ0aXRsZVNjb3BlPUMmbG9jYXRpb25UeXBlPUknO1xuXG4gICAgLy8gY3JlYXRlIHRoZSB0YWJcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogdXJsfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICBzY3JhcGVfdGFiID0gdGFiLmlkO1xuICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIod2FpdEZvclRhYilcbiAgICB9KTtcblxuICAgIC8vIGFmdGVyIHRhYiBjcmVhdGlvbiByZXR1cm4gY29udHJvbCB0byB0aGUgY2FsbGluZyBmdW5jdGlvblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JUYWIodGFiSWQsIGluZm8pIHtcbiAgICAgICAgaWYgKGluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIiAmJiB0YWJJZCA9PSBzY3JhcGVfdGFiKSB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIod2FpdEZvclRhYik7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0UHJvZmlsZUxpbmtzKGNhbGxiYWNrKSB7XG4gICAgLy8gYXNrIGNvbnRlbnQgc2NyaXB0IGZvciBhbGwgdGhlIHByb2ZpbGUgbGlua3Mgb24gdGhlIHBhZ2VcbiAgICBjYWxsVGFiQWN0aW9uKHNjcmFwZV90YWIsICdnZXRQcm9maWxlTGlua3MnLCBwcm9jZXNzTGlua0JhdGNoKTtcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NMaW5rQmF0Y2gocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpXG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgcmVzcG9uc2UgaXMgZW1wdHksIHdlIGhhdmUgYW4gaXNzdWVcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUmVzcG9uc2UgZm9yIHByb2Nlc3NMaW5rQmF0Y2ggaXM6XCIgKyByZXNwb25zZS5lcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFzTmV4dFBhZ2UgPSByZXNwb25zZS5oYXNOZXh0UGFnZTtcbiAgICAgICAgdmFyIGxpbWl0ID0gc2V0dGluZ3MubGltaXQ7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgcGFnZXMsIHdlJ3JlIGRvbmUhXG4gICAgICAgIGlmICghaGFzTmV4dFBhZ2UpIHtcbiAgICAgICAgICAgIHN0YXR1cy5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHdlJ3JlIGd1YXJhbnRlZWQgdG8gaGF2ZSBhIHJlc3BvbnNlIGFuZCBhIG5leHQgcGFnZS4gd2UnbGwgY2hlY2sgYSBmZXcgdGhpbmdzIGFuZCBrZWVwIGdvaW5nXG4gICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnByb2ZpbGVMaW5rcy5sZW5ndGggIT0gMCkge1xuXG4gICAgICAgICAgICAvLyBjb25jYXRlbmF0ZSB0aGUgcmVzcG9uc2UgdG8gb3VyIGV4aXN0aW5nIGFycmF5XG4gICAgICAgICAgICByZXN1bHRzLnByb2ZpbGVMaW5rcyA9IHJlc3VsdHMucHJvZmlsZUxpbmtzLmNvbmNhdChyZXNwb25zZS5wcm9maWxlTGlua3MpO1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5wcm9maWxlTGlua3MubGVuZ3RoID49IGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZSh7dXJsOiBcImh0dHA6Ly9cIiArIHJlc3BvbnNlLm5leHRQYWdlfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBwYWdlQ2hhbmdlKHRhYklkLCBpbmZvLCB0YWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSB0YWIudXJsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXJsICE9IHVuZGVmaW5lZCAmJiB0YWJJZCA9PSBzY3JhcGVfdGFiICYmIGluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGRvbmUgbG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHBhZ2VDaGFuZ2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIocGFnZUNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlYWNoZWQgZWxzZSBzdGF0ZW1lbnQgaW4gcHJvY2Vzc0xpbmtCYXRjaCcpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gc3RvcHMgbW9kdWxlIG9uIGNhbmNlbFNjcmFwZSBldmVudFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5jZWxTY3JhcGVcIiwgZnVuY3Rpb24gKCkge1xuICAgIHN0b3AoKTtcbn0pO1xuXG4vLyB0aGUgYXBpIGZvciB0aGlzIG1vZHVsZVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnQ6IGluaXRpYWxpemUsXG4gICAgcHJvZmlsZUxpbmtzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzLnByb2ZpbGVMaW5rc1xuICAgIH0sXG4gICAgaXNGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNGaW5pc2hlZFxuICAgIH1cbn07XG5cblxuZnVuY3Rpb24gbG9nKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxufVxuXG4iXX0=
