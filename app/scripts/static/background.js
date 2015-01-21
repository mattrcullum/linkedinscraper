(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');

window.results = {
    people: []
};

window.go = function (settings) {

    // for debugging
    settings.scraper.limit = 9;

    var routine = [
        scraper.start.bind(undefined, settings, results),
        getBasicInfo.start.bind(undefined, settings, results)
    ];
    routine.push(done);

    async.series(routine);
};

function done() {
    console.table(results)
}

//var permuter = require('./emailPermuter.js');
//var find_last_names = require('./last_names.js');
//var email_verifier = require('./email_check.js');
},{"./getBasicInfo.js":2,"./scraper.js":3}],2:[function(require,module,exports){
/**
 * Created by matthew on 1/17/15.
 */
var currentWorkingTab;
var isFinished;
var results;
var masterCallback;
var settings;
var i = 0;
var currentPerson;

function init(settingsArg, resultsArg, callbackArg) {

    results = resultsArg;
    masterCallback = callbackArg;
    settings = settingsArg;

    iterate()
}

function getBasicInfo(person) {
    currentPerson = person;
    currentPerson.company = settings.general.companyName;

    // create the tab with link argument
    chrome.tabs.create({url: person.profileLink}, function (tab) {
        currentWorkingTab = tab;
        chrome.tabs.onUpdated.addListener(tabUpdated)
    });
}

function tabUpdated(tabId, info, tab) {
    if (tabId == currentWorkingTab.id && info.status == "complete") {

        // get the required data from the tab
        callTabAction(currentWorkingTab.id, "getBasicInfo", handleResponse);

        // just to be safe, remove the listener
        chrome.tabs.onUpdated.removeListener(tabUpdated)
    }
}

function handleResponse(response) {

    $.extend(currentPerson, response);

    /*
     var name.full = response.name.full.trim().toLowerCase();
     var headline = response.headline;

     switch (name.full){
     case 'linkedin member':
     }
     */
    // we're done with the tab. remove it
    chrome.tabs.remove(currentWorkingTab.id);

    // decide whether to run again or not
    if (i + 1 != results.people.length) {
        iterate()
    }
    else {
        masterCallback();
    }
}

function stringContainsPeriod(string) {
    return string.indexOf('.') != 0
}

function stringEquals(string, comparableString) {
    return string.trim().toLowerCase() == comparableString
}

function iterate() {
    getBasicInfo(results.people[i++]);
}

module.exports = {
    isFinished: function () {
        return isFinished;
    },
    start: init
};

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
        'p?title=' + settings.general.positionFilter +
        '&f_CC=' + settings.general.CompanyIDs +
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
    callTabAction(scrape_tab, 'scrapeProfileList', processLinkBatch);

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
        var limit = settings.scraper.limit;

        // if there are no more pages, we're done!
        if (!hasNextPage) {
            status.done = true;
            callback();
        }

        // at this point we're guaranteed to have a response and a next page. we'll check a few things and keep going
        else if (response.results.length != 0) {

            // concatenate the response to our existing array
            results.people = results.people.concat(response.results);


            if (results.people.length >= limit) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2dldEJhc2ljSW5mby5qcyIsImFwcC9zY3JpcHRzL2JhY2tncm91bmQvc2NyYXBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHNjcmFwZXIgPSByZXF1aXJlKCcuL3NjcmFwZXIuanMnKTtcbnZhciBnZXRCYXNpY0luZm8gPSByZXF1aXJlKCcuL2dldEJhc2ljSW5mby5qcycpO1xuXG53aW5kb3cucmVzdWx0cyA9IHtcbiAgICBwZW9wbGU6IFtdXG59O1xuXG53aW5kb3cuZ28gPSBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcblxuICAgIC8vIGZvciBkZWJ1Z2dpbmdcbiAgICBzZXR0aW5ncy5zY3JhcGVyLmxpbWl0ID0gOTtcblxuICAgIHZhciByb3V0aW5lID0gW1xuICAgICAgICBzY3JhcGVyLnN0YXJ0LmJpbmQodW5kZWZpbmVkLCBzZXR0aW5ncywgcmVzdWx0cyksXG4gICAgICAgIGdldEJhc2ljSW5mby5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpXG4gICAgXTtcbiAgICByb3V0aW5lLnB1c2goZG9uZSk7XG5cbiAgICBhc3luYy5zZXJpZXMocm91dGluZSk7XG59O1xuXG5mdW5jdGlvbiBkb25lKCkge1xuICAgIGNvbnNvbGUudGFibGUocmVzdWx0cylcbn1cblxuLy92YXIgcGVybXV0ZXIgPSByZXF1aXJlKCcuL2VtYWlsUGVybXV0ZXIuanMnKTtcbi8vdmFyIGZpbmRfbGFzdF9uYW1lcyA9IHJlcXVpcmUoJy4vbGFzdF9uYW1lcy5qcycpO1xuLy92YXIgZW1haWxfdmVyaWZpZXIgPSByZXF1aXJlKCcuL2VtYWlsX2NoZWNrLmpzJyk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xNy8xNS5cbiAqL1xudmFyIGN1cnJlbnRXb3JraW5nVGFiO1xudmFyIGlzRmluaXNoZWQ7XG52YXIgcmVzdWx0cztcbnZhciBtYXN0ZXJDYWxsYmFjaztcbnZhciBzZXR0aW5ncztcbnZhciBpID0gMDtcbnZhciBjdXJyZW50UGVyc29uO1xuXG5mdW5jdGlvbiBpbml0KHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuXG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuXG4gICAgaXRlcmF0ZSgpXG59XG5cbmZ1bmN0aW9uIGdldEJhc2ljSW5mbyhwZXJzb24pIHtcbiAgICBjdXJyZW50UGVyc29uID0gcGVyc29uO1xuICAgIGN1cnJlbnRQZXJzb24uY29tcGFueSA9IHNldHRpbmdzLmdlbmVyYWwuY29tcGFueU5hbWU7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYiB3aXRoIGxpbmsgYXJndW1lbnRcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogcGVyc29uLnByb2ZpbGVMaW5rfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICBjdXJyZW50V29ya2luZ1RhYiA9IHRhYjtcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHRhYlVwZGF0ZWQodGFiSWQsIGluZm8sIHRhYikge1xuICAgIGlmICh0YWJJZCA9PSBjdXJyZW50V29ya2luZ1RhYi5pZCAmJiBpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcblxuICAgICAgICAvLyBnZXQgdGhlIHJlcXVpcmVkIGRhdGEgZnJvbSB0aGUgdGFiXG4gICAgICAgIGNhbGxUYWJBY3Rpb24oY3VycmVudFdvcmtpbmdUYWIuaWQsIFwiZ2V0QmFzaWNJbmZvXCIsIGhhbmRsZVJlc3BvbnNlKTtcblxuICAgICAgICAvLyBqdXN0IHRvIGJlIHNhZmUsIHJlbW92ZSB0aGUgbGlzdGVuZXJcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVSZXNwb25zZShyZXNwb25zZSkge1xuXG4gICAgJC5leHRlbmQoY3VycmVudFBlcnNvbiwgcmVzcG9uc2UpO1xuXG4gICAgLypcbiAgICAgdmFyIG5hbWUuZnVsbCA9IHJlc3BvbnNlLm5hbWUuZnVsbC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgdmFyIGhlYWRsaW5lID0gcmVzcG9uc2UuaGVhZGxpbmU7XG5cbiAgICAgc3dpdGNoIChuYW1lLmZ1bGwpe1xuICAgICBjYXNlICdsaW5rZWRpbiBtZW1iZXInOlxuICAgICB9XG4gICAgICovXG4gICAgLy8gd2UncmUgZG9uZSB3aXRoIHRoZSB0YWIuIHJlbW92ZSBpdFxuICAgIGNocm9tZS50YWJzLnJlbW92ZShjdXJyZW50V29ya2luZ1RhYi5pZCk7XG5cbiAgICAvLyBkZWNpZGUgd2hldGhlciB0byBydW4gYWdhaW4gb3Igbm90XG4gICAgaWYgKGkgKyAxICE9IHJlc3VsdHMucGVvcGxlLmxlbmd0aCkge1xuICAgICAgICBpdGVyYXRlKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1hc3RlckNhbGxiYWNrKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdHJpbmdDb250YWluc1BlcmlvZChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLmluZGV4T2YoJy4nKSAhPSAwXG59XG5cbmZ1bmN0aW9uIHN0cmluZ0VxdWFscyhzdHJpbmcsIGNvbXBhcmFibGVTdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnRyaW0oKS50b0xvd2VyQ2FzZSgpID09IGNvbXBhcmFibGVTdHJpbmdcbn1cblxuZnVuY3Rpb24gaXRlcmF0ZSgpIHtcbiAgICBnZXRCYXNpY0luZm8ocmVzdWx0cy5wZW9wbGVbaSsrXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGlzRmluaXNoZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlzRmluaXNoZWQ7XG4gICAgfSxcbiAgICBzdGFydDogaW5pdFxufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEyLzEzLzE0LlxuICovXG4vLyByZXN1bHRzXG5cbi8vIHNjcmFwZSBzdGF0dXNcbnZhciBydW5uaW5nID0gZmFsc2U7XG5cbnZhciBzY3JhcGVfdGFiID0gMDtcblxudmFyIHNldHRpbmdzO1xudmFyIG1hc3RlckNhbGxiYWNrO1xuXG52YXIgaXNGaW5pc2hlZCA9IGZhbHNlO1xuXG52YXIgc3RhdHVzID0ge307XG52YXIgcmVzdWx0cztcblxuXG5mdW5jdGlvbiBpbml0aWFsaXplKHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuICAgIC8vaW5pdGlhbGl6YXRpb25cbiAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuICAgIHJlc3VsdHMgPSByZXN1bHRzQXJnO1xuICAgIG1hc3RlckNhbGxiYWNrID0gY2FsbGJhY2tBcmc7XG4gICAgc3RhcnQoKTtcbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgZnVuY3Rpb24gZ2V0QmF0Y2goY2FsbGJhY2spIHtcbiAgICAgICAgYXN5bmMuc2VyaWVzKFtcbiAgICAgICAgICAgIGNyZWF0ZV9zY3JhcGVfdGFiLFxuICAgICAgICAgICAgZ2V0UHJvZmlsZUxpbmtzLFxuICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgXSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgICAgIGNocm9tZS50YWJzLnJlbW92ZShzY3JhcGVfdGFiKTtcbiAgICAgICAgc2NyYXBlX3RhYiA9IGZhbHNlO1xuICAgICAgICBpc0ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgbWFzdGVyQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICAvLyBwcm9ncmFtIGNvbnRyb2xcbiAgICBmdW5jdGlvbiBjb250cm9sbGVyKCkge1xuICAgICAgICBnZXRCYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzLmRvbmUpIHtcbiAgICAgICAgICAgICAgICBmaW5pc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgZ2V0QmF0Y2goY29udHJvbGxlcilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb250cm9sbGVyKCk7XG59XG5cbi8vIGNyZWF0ZXMgYSB0YWIgd2UnbGwgdXNlIGZvciBzY3JlZW4gc2NyYXBpbmdcbmZ1bmN0aW9uIGNyZWF0ZV9zY3JhcGVfdGFiKGNhbGxiYWNrKSB7XG4gICAgaWYgKHNjcmFwZV90YWIpIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB1cmwgPVxuICAgICAgICAnaHR0cDovL2xpbmtlZGluLmNvbS8nICtcbiAgICAgICAgJ3ZzZWFyY2gvJyArXG4gICAgICAgICdwP3RpdGxlPScgKyBzZXR0aW5ncy5nZW5lcmFsLnBvc2l0aW9uRmlsdGVyICtcbiAgICAgICAgJyZmX0NDPScgKyBzZXR0aW5ncy5nZW5lcmFsLkNvbXBhbnlJRHMgK1xuICAgICAgICAnJm9wZW5BZHZhbmNlZEZvcm09dHJ1ZSZ0aXRsZVNjb3BlPUMmbG9jYXRpb25UeXBlPUknO1xuXG4gICAgLy8gY3JlYXRlIHRoZSB0YWJcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogdXJsfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICBzY3JhcGVfdGFiID0gdGFiLmlkO1xuICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIod2FpdEZvclRhYilcbiAgICB9KTtcblxuICAgIC8vIGFmdGVyIHRhYiBjcmVhdGlvbiByZXR1cm4gY29udHJvbCB0byB0aGUgY2FsbGluZyBmdW5jdGlvblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JUYWIodGFiSWQsIGluZm8pIHtcbiAgICAgICAgaWYgKGluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIiAmJiB0YWJJZCA9PSBzY3JhcGVfdGFiKSB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIod2FpdEZvclRhYik7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0UHJvZmlsZUxpbmtzKGNhbGxiYWNrKSB7XG4gICAgLy8gYXNrIGNvbnRlbnQgc2NyaXB0IGZvciBhbGwgdGhlIHByb2ZpbGUgbGlua3Mgb24gdGhlIHBhZ2VcbiAgICBjYWxsVGFiQWN0aW9uKHNjcmFwZV90YWIsICdzY3JhcGVQcm9maWxlTGlzdCcsIHByb2Nlc3NMaW5rQmF0Y2gpO1xuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0xpbmtCYXRjaChyZXNwb25zZSkge1xuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcilcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiByZXNwb25zZSBpcyBlbXB0eSwgd2UgaGF2ZSBhbiBpc3N1ZVxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXNwb25zZSBmb3IgcHJvY2Vzc0xpbmtCYXRjaCBpczpcIiArIHJlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYXNOZXh0UGFnZSA9IHJlc3BvbnNlLmhhc05leHRQYWdlO1xuICAgICAgICB2YXIgbGltaXQgPSBzZXR0aW5ncy5zY3JhcGVyLmxpbWl0O1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIHBhZ2VzLCB3ZSdyZSBkb25lIVxuICAgICAgICBpZiAoIWhhc05leHRQYWdlKSB7XG4gICAgICAgICAgICBzdGF0dXMuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB3ZSdyZSBndWFyYW50ZWVkIHRvIGhhdmUgYSByZXNwb25zZSBhbmQgYSBuZXh0IHBhZ2UuIHdlJ2xsIGNoZWNrIGEgZmV3IHRoaW5ncyBhbmQga2VlcCBnb2luZ1xuICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5yZXN1bHRzLmxlbmd0aCAhPSAwKSB7XG5cbiAgICAgICAgICAgIC8vIGNvbmNhdGVuYXRlIHRoZSByZXNwb25zZSB0byBvdXIgZXhpc3RpbmcgYXJyYXlcbiAgICAgICAgICAgIHJlc3VsdHMucGVvcGxlID0gcmVzdWx0cy5wZW9wbGUuY29uY2F0KHJlc3BvbnNlLnJlc3VsdHMpO1xuXG5cbiAgICAgICAgICAgIGlmIChyZXN1bHRzLnBlb3BsZS5sZW5ndGggPj0gbGltaXQpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKHt1cmw6IFwiaHR0cDovL1wiICsgcmVzcG9uc2UubmV4dFBhZ2V9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhZ2VDaGFuZ2UodGFiSWQsIGluZm8sIHRhYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IHRhYi51cmw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwgIT0gdW5kZWZpbmVkICYmIHRhYklkID09IHNjcmFwZV90YWIgJiYgaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UgZG9uZSBsb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIocGFnZUNoYW5nZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMDAsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihwYWdlQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlYWNoZWQgZWxzZSBzdGF0ZW1lbnQgaW4gcHJvY2Vzc0xpbmtCYXRjaCcpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gc3RvcHMgbW9kdWxlIG9uIGNhbmNlbFNjcmFwZSBldmVudFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5jZWxTY3JhcGVcIiwgZnVuY3Rpb24gKCkge1xuICAgIHN0b3AoKTtcbn0pO1xuXG4vLyB0aGUgYXBpIGZvciB0aGlzIG1vZHVsZVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnQ6IGluaXRpYWxpemUsXG4gICAgcHJvZmlsZUxpbmtzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzLnByb2ZpbGVMaW5rc1xuICAgIH0sXG4gICAgaXNGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNGaW5pc2hlZFxuICAgIH1cbn07XG5cblxuZnVuY3Rpb24gbG9nKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxufVxuXG4iXX0=
