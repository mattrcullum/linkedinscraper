/**
 * Created by matthew on 1/21/15.
 */
var getMissingNames = function () {
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
        currentPerson = results.people[++i];
        var currentName = currentPerson.name;
        var currentPersonFullName = currentPerson.name.full;

        if (i == results.people.length) {
            masterCallback();
            return;
        }

        if (currentName.isHidden || !currentName.last) {
            getMissingName(function () {
                iterate();
            })
        }
        else {
            /*var fullNameSplit = currentPersonFullName.split('|')[0].split(' ');
             currentPerson.name.first = fullNameSplit[0];
             currentPerson.name.last = fullNameSplit[1];*/
            iterate()
        }
    }

    function getMissingName(callback) {
        if (!(currentPerson &&
            currentPerson.headline &&
            currentPerson.pastPositions &&
            currentPerson.education &&
            currentPerson.company)) {
            callback();
            return;
        }
        //debugger;
        var searchText =
            "site:linkedin.com " +
            (currentPerson.name.first ? currentPerson.name.first + ' ' : '') +
            (currentPerson.name.last ? currentPerson.name.last + ' ' : '') +
            currentPerson.headline + ' ' +
            currentPerson.pastPositions.join(' ') + ' ' +
            currentPerson.education.join(' ') + ' ';
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
            if (name && name.first && name.last) {
                currentPerson.name = name;
            }
            chrome.tabs.remove(tabid);
            callback();
        }


        chrome.tabs.create({url: url}, function (tab) {
            tabid = tab.id;
        });
    }

    return {
        start: init
    }
}();