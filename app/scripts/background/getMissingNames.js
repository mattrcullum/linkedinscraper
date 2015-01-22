/**
 * Created by matthew on 1/21/15.
 */
var settings, results, masterCallback;
var i = 0;
var currentPerson;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    iterate()
}

function iterate() {
    currentPerson = results.people[i];
    var currentPersonFullName = currentPerson.name.full;

    if (isNameHidden(currentPersonFullName) || isNameAbbreviated(currentPersonFullName)) {
        getMissingName()
    }
    else if (i + 1 == results.people.length) {
        masterCallback();
        return;
    }
    else {
        i++;
        iterate()
    }
}

function getMissingName() {
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
            callTabAction(tabid, "getGoogleResult", googleResultResponse)
            chrome.tabs.onUpdated.removeListener(tabUpdated)
        }
    }

    function googleResultResponse(response) {

        var fullName = response.split('|').trim();

        response = response.split('|').trim().split(' ');
        var fname = response[0];
        var lname = response[1];

        currentPerson.name.full = fullName;
        currentPerson.name.first = fname;
        currentPerson.name.last = lname;
    }

    chrome.tabs.create({url: url}, function (tab) {
        tabid = tab.id;
        i++;
        iterate();
    });
}

function processGoogleResponse(response) {
    if (response) {
        response.name.full
    }
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