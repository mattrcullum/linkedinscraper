/**
 * Created by matthew on 1/21/15.
 */
var getMissingNames = function () {
    var masterCallback,
        searchTab,
        personIndex,
        currentPerson;

    function start(cb) {

        masterCallback = cb;
        personIndex = 0;
        currentPerson = true;

        var series = [
            createSearchTab,
            getName,
            nextIteration
        ];

        // program control
        function nextIteration() {

            currentPerson = app.results[app.currentCompanyName][personIndex++];

            if (status.done || !currentPerson) {
                exit();
            }
            else {
                if (currentPerson.name.isHidden || !currentPerson.name.last) {
                    executeSeries();
                }
                else {
                    nextIteration();
                }
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

    function createSearchTab(callback) {
        if (
            !(
            currentPerson ||
            currentPerson.headline ||
            currentPerson.pastPositions ||
            currentPerson.education ||
            currentPerson.currentCompany
            )
        ) {
            callback();
            return false;
        }
        else {
            //debugger;
            var searchText =
                "site:linkedin.com " +
                (currentPerson.name.first ? currentPerson.name.first + ' ' : '') +
                (currentPerson.name.last ? currentPerson.name.last + ' ' : '') +
                currentPerson.headline + ' ';
            // currentPerson.pastPositions.join(' ') + ' ' +
            //currentPerson.education.join(' ') + ' ';
            var url =
                "http://google.com" +
                "#q=" +
                searchText;

            chrome.tabs.onUpdated.addListener(tabUpdated);

            function tabUpdated(tabID, info, tab) {

                if (searchTab == tabID && info.status == "complete") {
                    chrome.tabs.onUpdated.removeListener(tabUpdated);
                    callback();
                }
            }

            chrome.tabs.create({url: url}, function (tab) {
                searchTab = tab.id;
            });
        }
    }

    function getName(callback) {
        app.callTabAction(searchTab, "getName", handleResponse);

        function handleResponse(name) {
            if (name && name.first && name.last) {
                currentPerson.name = name;
            }
            else {
                currentPerson.name = false;
            }
            chrome.tabs.remove(searchTab);
            callback();
        }
    }

    function exit() {
        if (searchTab) {
            chrome.tabs.remove(searchTab);
        }
        masterCallback();
    }


    return {
        start: start
    }
}();