(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');

var results = {
    profileLinks: [
        /* "https://www.linkedin.com/profile/view?id=1457210&authType=OUT_OF_NETWORK&authToken=yZnT&locale=en_US&srchid=3717380161421683040433&srchindex=1&srchtotal=89718&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3717380161421683040433%2CVSRPtargetId%3A1457210%2CVSRPcmpt%3Aprimary",
        "https://www.linkedin.com/profile/view?id=1644330&authType=OPENLINK&authToken=b0qh&locale=en_US&srchid=3717380161421683040433&srchindex=2&srchtotal=89718&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3717380161421683040433%2CVSRPtargetId%3A1644330%2CVSRPcmpt%3Aprimary",
        "https://www.linkedin.com/profile/view?id=480284&authType=OUT_OF_NETWORK&authToken=beyh&locale=en_US&srchid=3717380161421683040433&srchindex=3&srchtotal=89718&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3717380161421683040433%2CVSRPtargetId%3A480284%2CVSRPcmpt%3Aprimary"
        */],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2dldEJhc2ljSW5mby5qcyIsImFwcC9zY3JpcHRzL2JhY2tncm91bmQvc2NyYXBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBzY3JhcGVyID0gcmVxdWlyZSgnLi9zY3JhcGVyLmpzJyk7XG52YXIgZ2V0QmFzaWNJbmZvID0gcmVxdWlyZSgnLi9nZXRCYXNpY0luZm8uanMnKTtcblxudmFyIHJlc3VsdHMgPSB7XG4gICAgcHJvZmlsZUxpbmtzOiBbXG4gICAgICAgIC8qIFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xNDU3MjEwJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF1dGhUb2tlbj15Wm5UJmxvY2FsZT1lbl9VUyZzcmNoaWQ9MzcxNzM4MDE2MTQyMTY4MzA0MDQzMyZzcmNoaW5kZXg9MSZzcmNodG90YWw9ODk3MTgmdHJrPXZzcnBfcGVvcGxlX3Jlc19uYW1lJnRya0luZm89VlNSUHNlYXJjaElkJTNBMzcxNzM4MDE2MTQyMTY4MzA0MDQzMyUyQ1ZTUlB0YXJnZXRJZCUzQTE0NTcyMTAlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcbiAgICAgICAgXCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE2NDQzMzAmYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva2VuPWIwcWgmbG9jYWxlPWVuX1VTJnNyY2hpZD0zNzE3MzgwMTYxNDIxNjgzMDQwNDMzJnNyY2hpbmRleD0yJnNyY2h0b3RhbD04OTcxOCZ0cms9dnNycF9wZW9wbGVfcmVzX25hbWUmdHJrSW5mbz1WU1JQc2VhcmNoSWQlM0EzNzE3MzgwMTYxNDIxNjgzMDQwNDMzJTJDVlNSUHRhcmdldElkJTNBMTY0NDMzMCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFxuICAgICAgICBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NDgwMjg0JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF1dGhUb2tlbj1iZXloJmxvY2FsZT1lbl9VUyZzcmNoaWQ9MzcxNzM4MDE2MTQyMTY4MzA0MDQzMyZzcmNoaW5kZXg9MyZzcmNodG90YWw9ODk3MTgmdHJrPXZzcnBfcGVvcGxlX3Jlc19uYW1lJnRya0luZm89VlNSUHNlYXJjaElkJTNBMzcxNzM4MDE2MTQyMTY4MzA0MDQzMyUyQ1ZTUlB0YXJnZXRJZCUzQTQ4MDI4NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiXG4gICAgICAgICovXSxcbiAgICBwZW9wbGU6IFtdXG59O1xuXG53aW5kb3cuZ28gPSBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcbiAgICB2YXIgcm91dGluZSA9IFtcbiAgICAgICAgc2NyYXBlci5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3Muc2NyYXBlciwgcmVzdWx0cyksXG4gICAgICAgIGdldEJhc2ljSW5mby5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MuZ2V0QmFzaWNJbmZvLCByZXN1bHRzKVxuICAgIF07XG5cbiAgICByb3V0aW5lLnB1c2goZG9uZSk7XG5cbiAgICBhc3luYy5zZXJpZXMocm91dGluZSk7XG5cbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRzLnByb2ZpbGVMaW5rcylcbiAgICB9XG59O1xuLy92YXIgcGVybXV0ZXIgPSByZXF1aXJlKCcuL3Blcm11dGVyLmpzJyk7XG4vL3ZhciBmaW5kX2xhc3RfbmFtZXMgPSByZXF1aXJlKCcuL2xhc3RfbmFtZXMuanMnKTtcbi8vdmFyIGVtYWlsX3ZlcmlmaWVyID0gcmVxdWlyZSgnLi9lbWFpbF9jaGVjay5qcycpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMTcvMTUuXG4gKi9cbnZhciBwcm9maWxlTGlua3M7XG52YXIgY3VycmVudFdvcmtpbmdUYWI7XG52YXIgaXNGaW5pc2hlZDtcbnZhciBwZW9wbGU7XG52YXIgcHJvZmlsZUxpbmtzO1xudmFyIG1hc3RlckNhbGxiYWNrO1xuXG5mdW5jdGlvbiBpbml0KHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuXG4gICAgcGVvcGxlID0gcmVzdWx0c0FyZy5wZW9wbGU7XG4gICAgcHJvZmlsZUxpbmtzID0gcmVzdWx0c0FyZy5wcm9maWxlTGlua3M7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcblxuICAgIGl0ZXJhdGUoKVxufVxuXG5mdW5jdGlvbiBnZXRCYXNpY0luZm8obGluaykge1xuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiBsaW5rfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICBjdXJyZW50V29ya2luZ1RhYiA9IHRhYjtcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB0YWJVcGRhdGVkKHRhYklkLCBpbmZvLCB0YWIpIHtcbiAgICAgICAgaWYgKHRhYklkID09IGN1cnJlbnRXb3JraW5nVGFiLmlkICYmIGluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIikge1xuXG4gICAgICAgICAgICBjYWxsVGFiQWN0aW9uKGN1cnJlbnRXb3JraW5nVGFiLmlkLCBcImdldEJhc2ljSW5mb1wiLCBoYW5kbGVSZXNwb25zZSlcblxuICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UoYmFzaWNJbmZvKSB7XG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKGN1cnJlbnRXb3JraW5nVGFiLmlkKTtcblxuICAgICAgICAgICAgICAgIHBlb3BsZS5wdXNoKGJhc2ljSW5mbyk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJvZmlsZUxpbmtzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRlKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGl0ZXJhdGUoKSB7XG4gICAgZ2V0QmFzaWNJbmZvKHByb2ZpbGVMaW5rcy5zaGlmdCgpKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc0ZpbmlzaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpc0ZpbmlzaGVkO1xuICAgIH0sXG4gICAgc3RhcnQ6IGluaXRcbn1cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEyLzEzLzE0LlxuICovXG4vLyByZXN1bHRzXG5cbi8vIHNjcmFwZSBzdGF0dXNcbnZhciBydW5uaW5nID0gZmFsc2U7XG5cbnZhciBzY3JhcGVfdGFiID0gMDtcblxudmFyIHNldHRpbmdzO1xudmFyIG1hc3RlckNhbGxiYWNrO1xuXG52YXIgaXNGaW5pc2hlZCA9IGZhbHNlO1xuXG52YXIgc3RhdHVzID0ge307XG52YXIgcmVzdWx0cztcblxuXG5mdW5jdGlvbiBpbml0aWFsaXplKHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuICAgIC8vaW5pdGlhbGl6YXRpb25cbiAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuICAgIHNldHRpbmdzLmxpbWl0ID0gMjA7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzdGFydCgpO1xufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBmdW5jdGlvbiBnZXRCYXRjaChjYWxsYmFjaykge1xuICAgICAgICBhc3luYy5zZXJpZXMoW1xuICAgICAgICAgICAgY3JlYXRlX3NjcmFwZV90YWIsXG4gICAgICAgICAgICBnZXRQcm9maWxlTGlua3MsXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICBdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHNjcmFwZV90YWIpO1xuICAgICAgICBzY3JhcGVfdGFiID0gZmFsc2U7XG4gICAgICAgIGlzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIHByb2dyYW0gY29udHJvbFxuICAgIGZ1bmN0aW9uIGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGdldEJhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMuZG9uZSkge1xuICAgICAgICAgICAgICAgIGZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBnZXRCYXRjaChjb250cm9sbGVyKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnRyb2xsZXIoKTtcbn1cblxuLy8gY3JlYXRlcyBhIHRhYiB3ZSdsbCB1c2UgZm9yIHNjcmVlbiBzY3JhcGluZ1xuZnVuY3Rpb24gY3JlYXRlX3NjcmFwZV90YWIoY2FsbGJhY2spIHtcbiAgICBpZiAoc2NyYXBlX3RhYikge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHVybCA9XG4gICAgICAgICdodHRwOi8vbGlua2VkaW4uY29tLycgK1xuICAgICAgICAndnNlYXJjaC8nICtcbiAgICAgICAgJ3A/dGl0bGU9JyArIHNldHRpbmdzLnBvc2l0aW9uRmlsdGVyICtcbiAgICAgICAgJyZmX0NDPScgKyBzZXR0aW5ncy5Db21wYW55SURzICtcbiAgICAgICAgJyZvcGVuQWR2YW5jZWRGb3JtPXRydWUmdGl0bGVTY29wZT1DJmxvY2F0aW9uVHlwZT1JJztcblxuICAgIC8vIGNyZWF0ZSB0aGUgdGFiXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IHVybH0sIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgc2NyYXBlX3RhYiA9IHRhYi5pZDtcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHdhaXRGb3JUYWIpXG4gICAgfSk7XG5cbiAgICAvLyBhZnRlciB0YWIgY3JlYXRpb24gcmV0dXJuIGNvbnRyb2wgdG8gdGhlIGNhbGxpbmcgZnVuY3Rpb25cbiAgICBmdW5jdGlvbiB3YWl0Rm9yVGFiKHRhYklkLCBpbmZvKSB7XG4gICAgICAgIGlmIChpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIgJiYgdGFiSWQgPT0gc2NyYXBlX3RhYikge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHdhaXRGb3JUYWIpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFByb2ZpbGVMaW5rcyhjYWxsYmFjaykge1xuICAgIC8vIGFzayBjb250ZW50IHNjcmlwdCBmb3IgYWxsIHRoZSBwcm9maWxlIGxpbmtzIG9uIHRoZSBwYWdlXG4gICAgY2FsbFRhYkFjdGlvbihzY3JhcGVfdGFiLCAnZ2V0UHJvZmlsZUxpbmtzJywgcHJvY2Vzc0xpbmtCYXRjaCk7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzTGlua0JhdGNoKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHJlc3BvbnNlIGlzIGVtcHR5LCB3ZSBoYXZlIGFuIGlzc3VlXG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlc3BvbnNlIGZvciBwcm9jZXNzTGlua0JhdGNoIGlzOlwiICsgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc05leHRQYWdlID0gcmVzcG9uc2UuaGFzTmV4dFBhZ2U7XG4gICAgICAgIHZhciBsaW1pdCA9IHNldHRpbmdzLmxpbWl0O1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIHBhZ2VzLCB3ZSdyZSBkb25lIVxuICAgICAgICBpZiAoIWhhc05leHRQYWdlKSB7XG4gICAgICAgICAgICBzdGF0dXMuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB3ZSdyZSBndWFyYW50ZWVkIHRvIGhhdmUgYSByZXNwb25zZSBhbmQgYSBuZXh0IHBhZ2UuIHdlJ2xsIGNoZWNrIGEgZmV3IHRoaW5ncyBhbmQga2VlcCBnb2luZ1xuICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5wcm9maWxlTGlua3MubGVuZ3RoICE9IDApIHtcblxuICAgICAgICAgICAgLy8gY29uY2F0ZW5hdGUgdGhlIHJlc3BvbnNlIHRvIG91ciBleGlzdGluZyBhcnJheVxuICAgICAgICAgICAgcmVzdWx0cy5wcm9maWxlTGlua3MgPSByZXN1bHRzLnByb2ZpbGVMaW5rcy5jb25jYXQocmVzcG9uc2UucHJvZmlsZUxpbmtzKTtcblxuXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5wcm9maWxlTGlua3MubGVuZ3RoID49IGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZSh7dXJsOiBcImh0dHA6Ly9cIiArIHJlc3BvbnNlLm5leHRQYWdlfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBwYWdlQ2hhbmdlKHRhYklkLCBpbmZvLCB0YWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSB0YWIudXJsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXJsICE9IHVuZGVmaW5lZCAmJiB0YWJJZCA9PSBzY3JhcGVfdGFiICYmIGluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGRvbmUgbG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHBhZ2VDaGFuZ2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIocGFnZUNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlYWNoZWQgZWxzZSBzdGF0ZW1lbnQgaW4gcHJvY2Vzc0xpbmtCYXRjaCcpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gc3RvcHMgbW9kdWxlIG9uIGNhbmNlbFNjcmFwZSBldmVudFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5jZWxTY3JhcGVcIiwgZnVuY3Rpb24gKCkge1xuICAgIHN0b3AoKTtcbn0pO1xuXG4vLyB0aGUgYXBpIGZvciB0aGlzIG1vZHVsZVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnQ6IGluaXRpYWxpemUsXG4gICAgcHJvZmlsZUxpbmtzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzLnByb2ZpbGVMaW5rc1xuICAgIH0sXG4gICAgaXNGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNGaW5pc2hlZFxuICAgIH1cbn07XG5cblxuZnVuY3Rpb24gbG9nKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxufVxuXG4iXX0=
