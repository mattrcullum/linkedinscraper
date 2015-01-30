/**
 * Created by matthew on 1/22/15.
 */
var settings, results, masterCallback;
var gmailTab;
var currentPerson;
var successfulEmailFormats = [];
var emailFound = false;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    validateEmails();
}

function validateEmails() {
    var i = -1;

    async.series([
        createGmailTab,
        nextPerson
    ]);

    function nextPerson() {

        currentPerson = results.people[++i];
        if (currentPerson) {


            if (currentPerson.possibleEmails) {
                async.series([
                    composeEmail,
                    findCurrentPersonsEmail,
                    nextPerson
                ])
            }
            else {
                nextPerson();
            }
        }
        else {
            masterCallback();
        }
    }
}

function createGmailTab(callback) {
    chrome.tabs.create({url: "https://google.com"}, function (tab) {
        gmailTab = tab.id;
        setTimeout(callback, 2500);
    })
}

function findCurrentPersonsEmail(callback) {

    // these are the email combinations we permuted in the previous step
    var possibleEmails = currentPerson.possibleEmails;

    if (successfulEmailFormats.length) {
        $.each(successfulEmailFormats.reverse(), function (index, item) {
            possibleEmails.move(item, 0)
        })
    }

    var i = 0;

    function tryVariation() {
        // decide on what email to try next
        var email = possibleEmails[i++];

        if (email) {

            email = convertStringToAscii(email);

            callTabAction(gmailTab, 'tryEmail', processResponse, {email: email, name: currentPerson.name});

            function processResponse(response) {
                if (response) {
                    if (response.correct) {
                        currentPerson.email = email;
                    }
                    else {
                        composeEmail(tryVariation());
                    }
                }
            }
        }
        else {
            callback()
        }
    }

    tryVariation();
}

function composeEmail(callback) {
    console.log('compose email');

    function waitForLoad() {
        console.log('callback in 5s');
        setTimeout(callback, 3000);
    }

    chrome.tabs.update(gmailTab, {url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"}, waitForLoad)
}

function convertStringToAscii(email) {

    //Convert Characters
    return email
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/é/g, 'e');
}

module.exports = {
    start: init
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};