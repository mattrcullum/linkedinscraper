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
