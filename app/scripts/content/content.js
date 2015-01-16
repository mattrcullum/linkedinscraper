/**
 * Created by matthew on 1/12/15.
 */
var linkedin = require('./linkedin.js');

function messageReceived(message, sender, sendResponse) {

    if (message.to != 'content') return;

    switch (message.action) {
        case 'getProfileLinks':
            sendResponse(
                linkedin.getProfileLinks()
            );
            break;
        case 'nextPage':
            linkedin.pagination.goNextPage(sendResponse)
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);