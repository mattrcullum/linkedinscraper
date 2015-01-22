/**
 * Created by matthew on 1/21/15.
 */
var settings, results, masterCallback;
var i = -1;
var currentPerson;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    iterate()
}

function iterate() {
    currentPerson = results.people[++i];
    var currentPersonFullName = currentPerson.name.full;

    if (isNameHidden(currentPersonFullName) || isNameAbbreviated(currentPersonFullName)) {
        getMissingName(function () {
            iterate();
        })
    }
    else if (i + 1 == results.people.length) {
        masterCallback();
    }
    else {
        iterate()
    }
}

function getMissingName(callback) {
    //debugger;
    var searchText = (
    "site:linkedin.com " +
    currentPerson.headline + ' ' +
    currentPerson.currentPosition + ' ' +
    currentPerson.pastPositions.join(' ') + ' ' +
    currentPerson.education.join(' ') + ' ' +
    currentPerson.company).replace(/\s+/g, " ").replace(/([a-z])([A-Z])/g, '$1 $2');

    var url =
        "http://google.com" +
        "#q=" +
        searchText;
    var tabid;

    chrome.tabs.onUpdated.addListener(tabUpdated);

    function tabUpdated(tabId, info, tab) {

        if (tabId == tabid && info.status == "complete") {
            callTabAction(tabid, "getName", googleResultResponse);
            chrome.tabs.onUpdated.removeListener(tabUpdated);
        }
    }

    function googleResultResponse(name) {
        console.table(name)
        currentPerson.name.last = name;
        chrome.tabs.remove(tabid);
        callback();
    }

    chrome.tabs.create({url: url}, function (tab) {
        tabid = tab.id;
    });
}

function isNameHidden(name) {
    return name.trim().toLowerCase() == "linkedin member"
}

function isNameAbbreviated(name) {
    return name.indexOf('.') != -1
}

module.exports = {
    start: init
}