(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');

var results = {
    profileLinks: [
        "https://www.linkedin.com/profile/view?id=11088867&authType=OUT_OF_NETWORK&authToken=f4q4&locale=en_US&srchid=3717380161421699983017&srchindex=26&srchtotal=89737&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3717380161421699983017%2CVSRPtargetId%3A11088867%2CVSRPcmpt%3Aprimary",
        "https://www.linkedin.com/profile/view?id=19163054&authType=OUT_OF_NETWORK&authToken=3Pi2&locale=en_US&srchid=3717380161421700008669&srchindex=31&srchtotal=89721&trk=vsrp_people_res_name_headless&trkInfo=VSRPsearchId%3A3717380161421700008669%2CVSRPtargetId%3A19163054%2CVSRPcmpt%3Aprimary",
        "https://www.linkedin.com/profile/view?id=18757&authType=OUT_OF_NETWORK&authToken=ZOal&locale=en_US&srchid=3717380161421700008669&srchindex=32&srchtotal=89721&trk=vsrp_people_res_name_headless&trkInfo=VSRPsearchId%3A3717380161421700008669%2CVSRPtargetId%3A18757%2CVSRPcmpt%3Aprimary"
    ],
    people: []
};

window.go = function (settings) {

    // for debugging
    settings.scraper.limit = 9;

    var routine = [
        //scraper.start.bind(undefined, settings, results),
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
var profileLinks;
var currentWorkingTab;
var currentWorkingProfileLink;
var isFinished;
var results;
var profileLinks;
var masterCallback;
var settings;

function init(settingsArg, resultsArg, callbackArg) {

    results = resultsArg;
    profileLinks = resultsArg.profileLinks;
    masterCallback = callbackArg;
    settings = settingsArg;

    iterate()
}

function getBasicInfo(link) {
    currentWorkingProfileLink = link;

    // create the tab with link argument
    chrome.tabs.create({url: link}, function (tab) {
        currentWorkingTab = tab;
        chrome.tabs.onUpdated.addListener(tabUpdated)
    });
}

function tabUpdated(tabId, info, tab) {
    if (tabId == currentWorkingTab.id && info.status == "complete") {

        // get the required data from the tab
        callTabAction(currentWorkingTab.id, "getBasicInfo", handleResponse)

        // just to be safe, remove the listener
        chrome.tabs.onUpdated.removeListener(tabUpdated)
    }
}

$.each($('.profile-overview-content p, .profile-overview-content span, .profile-overview-content a'), function (index, item) {
    console.log($(item).text())
})

function handleResponse(response) {
    response.profileLink = currentWorkingProfileLink;
    response.company = settings.general.companyName;

    // if the full name contains and initial or no actual name
    if (
        response.fullName.indexOf('.') != 0
        ||
        response.name.full.trim().toLowerCase() == "linkedin member"
    ) {
        response.name.incomplete = true;
    }
    /*
     var name.full = response.name.full.trim().toLowerCase();
     var headline = response.headline;

     switch (name.full){
     case 'linkedin member':
     }
     */
    // we're done with the tab. remove it
    chrome.tabs.remove(currentWorkingTab.id);

    // push the response to our results object
    results.people.push(response);

    // decide whether to run again or not
    if (profileLinks.length) {
        iterate()
    }
    else {
        masterCallback();
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
        var limit = settings.scraper.limit;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2dldEJhc2ljSW5mby5qcyIsImFwcC9zY3JpcHRzL2JhY2tncm91bmQvc2NyYXBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBzY3JhcGVyID0gcmVxdWlyZSgnLi9zY3JhcGVyLmpzJyk7XG52YXIgZ2V0QmFzaWNJbmZvID0gcmVxdWlyZSgnLi9nZXRCYXNpY0luZm8uanMnKTtcblxudmFyIHJlc3VsdHMgPSB7XG4gICAgcHJvZmlsZUxpbmtzOiBbXG4gICAgICAgIFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMTA4ODg2NyZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZhdXRoVG9rZW49ZjRxNCZsb2NhbGU9ZW5fVVMmc3JjaGlkPTM3MTczODAxNjE0MjE2OTk5ODMwMTcmc3JjaGluZGV4PTI2JnNyY2h0b3RhbD04OTczNyZ0cms9dnNycF9wZW9wbGVfcmVzX25hbWUmdHJrSW5mbz1WU1JQc2VhcmNoSWQlM0EzNzE3MzgwMTYxNDIxNjk5OTgzMDE3JTJDVlNSUHRhcmdldElkJTNBMTEwODg4NjclMkNWU1JQY21wdCUzQXByaW1hcnlcIixcbiAgICAgICAgXCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE5MTYzMDU0JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF1dGhUb2tlbj0zUGkyJmxvY2FsZT1lbl9VUyZzcmNoaWQ9MzcxNzM4MDE2MTQyMTcwMDAwODY2OSZzcmNoaW5kZXg9MzEmc3JjaHRvdGFsPTg5NzIxJnRyaz12c3JwX3Blb3BsZV9yZXNfbmFtZV9oZWFkbGVzcyZ0cmtJbmZvPVZTUlBzZWFyY2hJZCUzQTM3MTczODAxNjE0MjE3MDAwMDg2NjklMkNWU1JQdGFyZ2V0SWQlM0ExOTE2MzA1NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFxuICAgICAgICBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTg3NTcmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYXV0aFRva2VuPVpPYWwmbG9jYWxlPWVuX1VTJnNyY2hpZD0zNzE3MzgwMTYxNDIxNzAwMDA4NjY5JnNyY2hpbmRleD0zMiZzcmNodG90YWw9ODk3MjEmdHJrPXZzcnBfcGVvcGxlX3Jlc19uYW1lX2hlYWRsZXNzJnRya0luZm89VlNSUHNlYXJjaElkJTNBMzcxNzM4MDE2MTQyMTcwMDAwODY2OSUyQ1ZTUlB0YXJnZXRJZCUzQTE4NzU3JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCJcbiAgICBdLFxuICAgIHBlb3BsZTogW11cbn07XG5cbndpbmRvdy5nbyA9IGZ1bmN0aW9uIChzZXR0aW5ncykge1xuXG4gICAgLy8gZm9yIGRlYnVnZ2luZ1xuICAgIHNldHRpbmdzLnNjcmFwZXIubGltaXQgPSA5O1xuXG4gICAgdmFyIHJvdXRpbmUgPSBbXG4gICAgICAgIC8vc2NyYXBlci5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpLFxuICAgICAgICBnZXRCYXNpY0luZm8uc3RhcnQuYmluZCh1bmRlZmluZWQsIHNldHRpbmdzLCByZXN1bHRzKVxuICAgIF07XG4gICAgcm91dGluZS5wdXNoKGRvbmUpO1xuXG4gICAgYXN5bmMuc2VyaWVzKHJvdXRpbmUpO1xufTtcblxuZnVuY3Rpb24gZG9uZSgpIHtcbiAgICBjb25zb2xlLnRhYmxlKHJlc3VsdHMpXG59XG5cbi8vdmFyIHBlcm11dGVyID0gcmVxdWlyZSgnLi9lbWFpbFBlcm11dGVyLmpzJyk7XG4vL3ZhciBmaW5kX2xhc3RfbmFtZXMgPSByZXF1aXJlKCcuL2xhc3RfbmFtZXMuanMnKTtcbi8vdmFyIGVtYWlsX3ZlcmlmaWVyID0gcmVxdWlyZSgnLi9lbWFpbF9jaGVjay5qcycpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMTcvMTUuXG4gKi9cbnZhciBwcm9maWxlTGlua3M7XG52YXIgY3VycmVudFdvcmtpbmdUYWI7XG52YXIgY3VycmVudFdvcmtpbmdQcm9maWxlTGluaztcbnZhciBpc0ZpbmlzaGVkO1xudmFyIHJlc3VsdHM7XG52YXIgcHJvZmlsZUxpbmtzO1xudmFyIG1hc3RlckNhbGxiYWNrO1xudmFyIHNldHRpbmdzO1xuXG5mdW5jdGlvbiBpbml0KHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuXG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgcHJvZmlsZUxpbmtzID0gcmVzdWx0c0FyZy5wcm9maWxlTGlua3M7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuXG4gICAgaXRlcmF0ZSgpXG59XG5cbmZ1bmN0aW9uIGdldEJhc2ljSW5mbyhsaW5rKSB7XG4gICAgY3VycmVudFdvcmtpbmdQcm9maWxlTGluayA9IGxpbms7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYiB3aXRoIGxpbmsgYXJndW1lbnRcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogbGlua30sIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgY3VycmVudFdvcmtpbmdUYWIgPSB0YWI7XG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih0YWJVcGRhdGVkKVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB0YWJVcGRhdGVkKHRhYklkLCBpbmZvLCB0YWIpIHtcbiAgICBpZiAodGFiSWQgPT0gY3VycmVudFdvcmtpbmdUYWIuaWQgJiYgaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiKSB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSByZXF1aXJlZCBkYXRhIGZyb20gdGhlIHRhYlxuICAgICAgICBjYWxsVGFiQWN0aW9uKGN1cnJlbnRXb3JraW5nVGFiLmlkLCBcImdldEJhc2ljSW5mb1wiLCBoYW5kbGVSZXNwb25zZSlcblxuICAgICAgICAvLyBqdXN0IHRvIGJlIHNhZmUsIHJlbW92ZSB0aGUgbGlzdGVuZXJcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgfVxufVxuXG4kLmVhY2goJCgnLnByb2ZpbGUtb3ZlcnZpZXctY29udGVudCBwLCAucHJvZmlsZS1vdmVydmlldy1jb250ZW50IHNwYW4sIC5wcm9maWxlLW92ZXJ2aWV3LWNvbnRlbnQgYScpLCBmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcbiAgICBjb25zb2xlLmxvZygkKGl0ZW0pLnRleHQoKSlcbn0pXG5cbmZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgcmVzcG9uc2UucHJvZmlsZUxpbmsgPSBjdXJyZW50V29ya2luZ1Byb2ZpbGVMaW5rO1xuICAgIHJlc3BvbnNlLmNvbXBhbnkgPSBzZXR0aW5ncy5nZW5lcmFsLmNvbXBhbnlOYW1lO1xuXG4gICAgLy8gaWYgdGhlIGZ1bGwgbmFtZSBjb250YWlucyBhbmQgaW5pdGlhbCBvciBubyBhY3R1YWwgbmFtZVxuICAgIGlmIChcbiAgICAgICAgcmVzcG9uc2UuZnVsbE5hbWUuaW5kZXhPZignLicpICE9IDBcbiAgICAgICAgfHxcbiAgICAgICAgcmVzcG9uc2UubmFtZS5mdWxsLnRyaW0oKS50b0xvd2VyQ2FzZSgpID09IFwibGlua2VkaW4gbWVtYmVyXCJcbiAgICApIHtcbiAgICAgICAgcmVzcG9uc2UubmFtZS5pbmNvbXBsZXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgLypcbiAgICAgdmFyIG5hbWUuZnVsbCA9IHJlc3BvbnNlLm5hbWUuZnVsbC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgdmFyIGhlYWRsaW5lID0gcmVzcG9uc2UuaGVhZGxpbmU7XG5cbiAgICAgc3dpdGNoIChuYW1lLmZ1bGwpe1xuICAgICBjYXNlICdsaW5rZWRpbiBtZW1iZXInOlxuICAgICB9XG4gICAgICovXG4gICAgLy8gd2UncmUgZG9uZSB3aXRoIHRoZSB0YWIuIHJlbW92ZSBpdFxuICAgIGNocm9tZS50YWJzLnJlbW92ZShjdXJyZW50V29ya2luZ1RhYi5pZCk7XG5cbiAgICAvLyBwdXNoIHRoZSByZXNwb25zZSB0byBvdXIgcmVzdWx0cyBvYmplY3RcbiAgICByZXN1bHRzLnBlb3BsZS5wdXNoKHJlc3BvbnNlKTtcblxuICAgIC8vIGRlY2lkZSB3aGV0aGVyIHRvIHJ1biBhZ2FpbiBvciBub3RcbiAgICBpZiAocHJvZmlsZUxpbmtzLmxlbmd0aCkge1xuICAgICAgICBpdGVyYXRlKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1hc3RlckNhbGxiYWNrKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpdGVyYXRlKCkge1xuICAgIGdldEJhc2ljSW5mbyhwcm9maWxlTGlua3Muc2hpZnQoKSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaXNGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNGaW5pc2hlZDtcbiAgICB9LFxuICAgIHN0YXJ0OiBpbml0XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMTIvMTMvMTQuXG4gKi9cbi8vIHJlc3VsdHNcblxuLy8gc2NyYXBlIHN0YXR1c1xudmFyIHJ1bm5pbmcgPSBmYWxzZTtcblxudmFyIHNjcmFwZV90YWIgPSAwO1xuXG52YXIgc2V0dGluZ3M7XG52YXIgbWFzdGVyQ2FsbGJhY2s7XG5cbnZhciBpc0ZpbmlzaGVkID0gZmFsc2U7XG5cbnZhciBzdGF0dXMgPSB7fTtcbnZhciByZXN1bHRzO1xuXG5cbmZ1bmN0aW9uIGluaXRpYWxpemUoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgLy9pbml0aWFsaXphdGlvblxuICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzdGFydCgpO1xufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBmdW5jdGlvbiBnZXRCYXRjaChjYWxsYmFjaykge1xuICAgICAgICBhc3luYy5zZXJpZXMoW1xuICAgICAgICAgICAgY3JlYXRlX3NjcmFwZV90YWIsXG4gICAgICAgICAgICBnZXRQcm9maWxlTGlua3MsXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICBdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHNjcmFwZV90YWIpO1xuICAgICAgICBzY3JhcGVfdGFiID0gZmFsc2U7XG4gICAgICAgIGlzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIHByb2dyYW0gY29udHJvbFxuICAgIGZ1bmN0aW9uIGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGdldEJhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMuZG9uZSkge1xuICAgICAgICAgICAgICAgIGZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBnZXRCYXRjaChjb250cm9sbGVyKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnRyb2xsZXIoKTtcbn1cblxuLy8gY3JlYXRlcyBhIHRhYiB3ZSdsbCB1c2UgZm9yIHNjcmVlbiBzY3JhcGluZ1xuZnVuY3Rpb24gY3JlYXRlX3NjcmFwZV90YWIoY2FsbGJhY2spIHtcbiAgICBpZiAoc2NyYXBlX3RhYikge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHVybCA9XG4gICAgICAgICdodHRwOi8vbGlua2VkaW4uY29tLycgK1xuICAgICAgICAndnNlYXJjaC8nICtcbiAgICAgICAgJ3A/dGl0bGU9JyArIHNldHRpbmdzLmdlbmVyYWwucG9zaXRpb25GaWx0ZXIgK1xuICAgICAgICAnJmZfQ0M9JyArIHNldHRpbmdzLmdlbmVyYWwuQ29tcGFueUlEcyArXG4gICAgICAgICcmb3BlbkFkdmFuY2VkRm9ybT10cnVlJnRpdGxlU2NvcGU9QyZsb2NhdGlvblR5cGU9SSc7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYlxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiB1cmx9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIHNjcmFwZV90YWIgPSB0YWIuaWQ7XG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih3YWl0Rm9yVGFiKVxuICAgIH0pO1xuXG4gICAgLy8gYWZ0ZXIgdGFiIGNyZWF0aW9uIHJldHVybiBjb250cm9sIHRvIHRoZSBjYWxsaW5nIGZ1bmN0aW9uXG4gICAgZnVuY3Rpb24gd2FpdEZvclRhYih0YWJJZCwgaW5mbykge1xuICAgICAgICBpZiAoaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiICYmIHRhYklkID09IHNjcmFwZV90YWIpIHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih3YWl0Rm9yVGFiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZXRQcm9maWxlTGlua3MoY2FsbGJhY2spIHtcbiAgICAvLyBhc2sgY29udGVudCBzY3JpcHQgZm9yIGFsbCB0aGUgcHJvZmlsZSBsaW5rcyBvbiB0aGUgcGFnZVxuICAgIGNhbGxUYWJBY3Rpb24oc2NyYXBlX3RhYiwgJ2dldFByb2ZpbGVMaW5rcycsIHByb2Nlc3NMaW5rQmF0Y2gpO1xuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0xpbmtCYXRjaChyZXNwb25zZSkge1xuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcilcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiByZXNwb25zZSBpcyBlbXB0eSwgd2UgaGF2ZSBhbiBpc3N1ZVxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXNwb25zZSBmb3IgcHJvY2Vzc0xpbmtCYXRjaCBpczpcIiArIHJlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYXNOZXh0UGFnZSA9IHJlc3BvbnNlLmhhc05leHRQYWdlO1xuICAgICAgICB2YXIgbGltaXQgPSBzZXR0aW5ncy5zY3JhcGVyLmxpbWl0O1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIHBhZ2VzLCB3ZSdyZSBkb25lIVxuICAgICAgICBpZiAoIWhhc05leHRQYWdlKSB7XG4gICAgICAgICAgICBzdGF0dXMuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB3ZSdyZSBndWFyYW50ZWVkIHRvIGhhdmUgYSByZXNwb25zZSBhbmQgYSBuZXh0IHBhZ2UuIHdlJ2xsIGNoZWNrIGEgZmV3IHRoaW5ncyBhbmQga2VlcCBnb2luZ1xuICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5wcm9maWxlTGlua3MubGVuZ3RoICE9IDApIHtcblxuICAgICAgICAgICAgLy8gY29uY2F0ZW5hdGUgdGhlIHJlc3BvbnNlIHRvIG91ciBleGlzdGluZyBhcnJheVxuICAgICAgICAgICAgcmVzdWx0cy5wcm9maWxlTGlua3MgPSByZXN1bHRzLnByb2ZpbGVMaW5rcy5jb25jYXQocmVzcG9uc2UucHJvZmlsZUxpbmtzKTtcblxuXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5wcm9maWxlTGlua3MubGVuZ3RoID49IGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZSh7dXJsOiBcImh0dHA6Ly9cIiArIHJlc3BvbnNlLm5leHRQYWdlfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBwYWdlQ2hhbmdlKHRhYklkLCBpbmZvLCB0YWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSB0YWIudXJsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXJsICE9IHVuZGVmaW5lZCAmJiB0YWJJZCA9PSBzY3JhcGVfdGFiICYmIGluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGRvbmUgbG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHBhZ2VDaGFuZ2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIocGFnZUNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlYWNoZWQgZWxzZSBzdGF0ZW1lbnQgaW4gcHJvY2Vzc0xpbmtCYXRjaCcpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gc3RvcHMgbW9kdWxlIG9uIGNhbmNlbFNjcmFwZSBldmVudFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5jZWxTY3JhcGVcIiwgZnVuY3Rpb24gKCkge1xuICAgIHN0b3AoKTtcbn0pO1xuXG4vLyB0aGUgYXBpIGZvciB0aGlzIG1vZHVsZVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnQ6IGluaXRpYWxpemUsXG4gICAgcHJvZmlsZUxpbmtzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzLnByb2ZpbGVMaW5rc1xuICAgIH0sXG4gICAgaXNGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNGaW5pc2hlZFxuICAgIH1cbn07XG5cblxuZnVuY3Rpb24gbG9nKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxufVxuXG4iXX0=
