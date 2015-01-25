/**
 * Created by matthew on 1/22/15.
 */
var settings, results, masterCallback;
var gmailTab;
var currentPerson;
var successfulEmailComboIndexes = [];
var emailFound = false;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    validateEmails();
}

function validateEmails() {
    var i = 0;

    async.series([
        createGmailTab,
        nextPerson
    ]);

    function nextPerson() {
        currentPerson = results.people[i];

        async.series(
            composeNewEmail,
            findCurrentPersonsEmail()
        )
    }
}

function createGmailTab(callback) {
    chrome.tabs.create({url: "https://google.com"}, function (tab) {
        gmailTab = tab.id;
        callback()
    })
}
function composeNewEmail(callback) {
    function waitForLoad(tabId, status) {
        if (tabId == gmailTab && status == "complete") {

            chrome.tabs.onUpdated.removeListener(waitForLoad);

            setTimeout(function (callback) {
                callback()
            }, 1200, callback);

        }
    }

    chrome.tabs.update(gmailTab, {url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"}, waitForLoad)
}
function findCurrentPersonsEmail(callback) {

    var possibleEmails = currentPerson.possibleEmails;
    var prioritizedComboIndexes;
    var email = null;

    if (successfulEmailComboIndexes.length) {
        prioritizedComboIndexes = successfulEmailComboIndexes.splice();

        var index = prioritizedComboIndexes.splice(0, 1);
        email = possibleEmails.splice(index, 1);

        tryEmail(convertStringToAscii(email), processResponse)
    }

    else {
        email = possibleEmails.splice(0, 1);
    }

    function tryEmail(email, callback) {
        callTabAction(gmailTab, 'tryEmail', processResponse, {email: email})
    }

    function processResponse(response) {
        if (response) {
            currentPerson.email = email;
        }
    }
}
function convertStringToAscii(email) {
    //Convert Characters
    return email
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u');
}

module.exports = {
    start: init
}