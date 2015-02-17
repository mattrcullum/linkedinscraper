/**
 * Created by matthew on 1/17/15.
 */
var getProfileData = function () {

    var masterCallback,
        currentPerson,
        personIndex,
        profileScrapeTab;

    function start(cb) {
        masterCallback = cb;
        personIndex = 0;
        currentPerson = true;

        var series = [
            createProfileScrapeTab,
            retrieveProfileData,
            nextIteration
        ];

        // program control
        function nextIteration() {
            currentPerson = app.results[personIndex++]

            if (status.done || !currentPerson) {
                exit();
            }
            else {
                executeSeries();
            }
        }

        // execute series after a one-time function call
        /*async.series([
         init,
         executeSeries
         ]
         );*/

        nextIteration();

        function executeSeries() {
            async.series(series)
        }
    }

    function createProfileScrapeTab(callback) {
        // create the tab with link argument
        chrome.tabs.create({url: currentPerson.profileLink}, function (tab) {
            profileScrapeTab = tab.id;
            chrome.tabs.onUpdated.addListener(tabUpdated);

            function tabUpdated(tabID, changeInfo, tab) {
                if (tabID == profileScrapeTab && changeInfo.status == "complete") {
                    chrome.tabs.onUpdated.removeListener(tabUpdated);
                    setTimeout(callback, app.settings.delay);
                    log(app.settings.delay)
                }
            }
        });
    }

    function retrieveProfileData(callback) {

        // get the required data from the tab
        app.callTabAction(profileScrapeTab, "getBasicInfo", handleResponse);

        function handleResponse(response) {

            $.extend(currentPerson, response);

            // we're done with the tab. remove it
            chrome.tabs.remove(profileScrapeTab);

            callback()
        }
    }

    // releases program control back to calling function
    function exit() {
        masterCallback();
    }

    return {
        start: start
    }
}();
