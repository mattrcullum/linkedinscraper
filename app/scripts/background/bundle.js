(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var scraper = require('./scraper.js');

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
var callback;
var people = [];


function start(settingsArg, callbackArg) {
    running = true;
    settings = settingsArg;
    callback = callbackArg;

    create_scrape_tab(function () {
        scrape(function () {
            console.log(people)
        })
    });
}

// recursively retrieves the profiles links for every member of the company
function scrape(callback) {
    send_to.tab(scrape_tab, "get_profile_links", function (response) {
        if (response) {
            people.concat(response.profile_links);

            if (response.paginationHasNext) {
                scrape(callback);
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
        scrape_tab = tab.id;
        chrome.tabs.onUpdated.addListener(waitForTab)
    })

    function waitForTab(tabId, info) {
        if (info.status == "complete" && tabId == scrape_tab) {
            callback();
        }
    }
}

window.addEventListener("cancel_scrape", function () {
    if (scrape_tab) {
        chrome.tabs.remove(scrape_tab);
        scrape_tab = false;
        running = false;
    }
})

module.exports = {
    start: start,
    stop: function () {
        running = false;
    },
    isRunning: function () {
        return running
    }
}






},{}]},{},[1]);
