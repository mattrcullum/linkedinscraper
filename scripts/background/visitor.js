/**
 * Created by matthew on 12/31/14.
 */
(function () {
    var people;

    exports.start = function (peopleArg) {
        people = peopleArg;
        function series(item) {
            if (item) {
                chrome.tabs.create({url: item.profileUrl}, function (tab) {
                    chrome.tabs.onUpdated.addListener(tabListener)
                    function tabListener(tabId, info) {
                        if (tabId == tab.id && info.status == "complete") {
                            send_to.tab(tab.id, "getProfileInfo", profileInfo)
                        }
                    }
                    function profileInfo(result){
                        people.push(result);
                        series(unsorted_people.shift())
                    }
                })
            }
            else {
                callback()
            }
        }

    }
})