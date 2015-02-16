function messageReceived(message, sender, sendResponse) {

    if (message.to != 'content') return;

    switch (message.action) {

        case 'scrapeProfileList':
            var results = linkedin.scrapeProfileList();
            sendResponse(results);
            break;

        case 'nextPage':
            var results = linkedin.pagination.nextPage();
            sendResponse(results);
            break;

        case 'getBasicInfo':
            var results = linkedin.scrapeProfileView();
            sendResponse(results);
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
                    setTimeout(function (callback) {debugger;
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
            google.tryEmail(message.args, sendResponse);
            break;
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);