/**
 * Created by matthew on 1/22/15.
 */
var validateEmails = function () {
    var masterCallback, gmailTab, currentPerson, personIndex, successfulEmailFormats, gmailInitialLoad;

    function start(cb) {
        gmailInitialLoad = true;
        masterCallback = cb;
        personIndex = 0;
        successfulEmailFormats = [];

        var series = [
            arrangeEmails,
            findCurrentPersonsEmail,
            nextIteration
        ];

        function executeSeries() {
            async.series(series)
        }

        // program control
        function nextIteration() {
            currentPerson = app.results[app.currentCompanyName][personIndex++];
            log(currentPerson);

            if (status.done || !currentPerson) {
                exit();
            }
            else {
                executeSeries();
            }
        }

        async.series([
                createGmailTab,
                nextIteration
            ]
        )
    }

    function createGmailTab(callback) {
        if (gmailTab) {
            callback();
            return false;
        }
        chrome.tabs.create({url: "https://google.com"}, function (tab) {
            gmailTab = tab.id;
            setTimeout(callback, 1000);
        })
    }

    function arrangeEmails(callback) {
        // these are the email combinations we permuted in the previous step
        var possibleEmails = currentPerson.possibleEmails;
        if (possibleEmails) {

            if (successfulEmailFormats.length) {
                $.each(successfulEmailFormats.reverse(), function (index, item) {
                    possibleEmails.move(item, 0)
                })
            }
        }
        callback()
    }

    function findCurrentPersonsEmail(callback) {

        var i = 0;
        var email;

        function composeNewEmail(composeNewEmailCb) {
            var timeout = gmailInitialLoad ? 7000 : 800;
            console.log('compose email');

            function waitForLoad() {
                console.log('callback in 5s');
                setTimeout(composeNewEmailCb, timeout);
            }

            chrome.tabs.update(gmailTab, {url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"}, waitForLoad);
            gmailInitialLoad = false;
        }

        function tryNextVariation(nextVariationCb) {

            app.callTabAction(gmailTab, 'tryEmail', processResponse, {email: email, name: currentPerson.name});

            function processResponse(response) {
                if (response && response.correct) {
                    currentPerson.email = email;
                    if (successfulEmailFormats.indexOf(i) == -1) {
                        successfulEmailFormats.push(i - 1);
                    }
                }
                nextVariationCb();
            }
        }

        var series = [composeNewEmail, tryNextVariation, nextIteration];

        function nextIteration() {
            var possibleEmails = currentPerson.possibleEmails;
            if (possibleEmails) {
                email = currentPerson.possibleEmails[i++];
                if (email && !currentPerson.email) {
                    async.series(series);
                }
                else {
                    if (!currentPerson.email) {
                        currentPerson.email = possibleEmails[successfulEmailFormats[0] || 0];
                        currentPerson.emailConfirmed = '';
                    }
                    else {
                        currentPerson.emailConfirmed = 'yes';
                    }
                    callback()
                }
            }
            else {
                callback()
            }
        }

        nextIteration();
    }

    function exit() {
        masterCallback();
    }

    return {
        start: start
    };

}();
