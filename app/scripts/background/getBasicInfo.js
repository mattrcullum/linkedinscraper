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
