/**
 * Created by matthew on 1/12/15.
 */
var linkedin = require('./linkedin.js');

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
            setInterval(function (callback) {
                var $results = $('#res');
                if ($results.length) {
                    sendResponse(getName());
                }
            }, 50, sendResponse)
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);