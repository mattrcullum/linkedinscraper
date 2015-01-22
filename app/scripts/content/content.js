/**
 * Created by matthew on 1/12/15.
 */
var linkedin = require('./linkedin.js');
var google = require('./google.js');

function messageReceived(message, sender, sendResponse) {

    if (message.to != 'content') return;

    switch (message.action) {
        case 'scrapeProfileList':
            sendResponse(
                linkedin.scrapeProfileList()
            );
            break;
        case 'nextPage':
            sendResponse(
                linkedin.pagination.nextPage()
            );
            break;
        case 'getBasicInfo':
            sendResponse(
                linkedin.scrapeProfileView()
            );
            break;
        case 'getName':
            var waitForSearchResults = setInterval(function (callback) {
                var $results = $('#rso');

                if ($results.length) {
                    callback(google.getName());
                    clearInterval(waitForSearchResults)
                }

            }, 50, sendResponse)
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);