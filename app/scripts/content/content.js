window.helpers = require('../helpers');

var linkedin = require('./linkedin.js');
var google = require('./google.js');
require('./showScrapeBtn')();

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
            var time = {
                total: 0,
                interval: 50,
                out: 5000 //time.out ;)
            };

            var waitForSearchResults = setInterval(function (callback, time) {

                time.total += time.interval;

                var $results = $('#rso');
                var hasResults = $results.find('li').length;

                if (hasResults) {
                    setTimeout(function (callback) {
                        callback(google.getName());
                    }, 350, callback);

                    clearInterval(waitForSearchResults)
                }

                else if ($results.length) {
                    clearInterval(waitForSearchResults);
                    callback(false);
                }
                console.log(time.total)

            }, time.interval, sendResponse, time);
            break;

        case 'tryEmail':
            console.log('try email')
            google.tryEmail(message.args, sendResponse);
            break;
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);