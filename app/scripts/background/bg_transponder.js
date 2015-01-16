var app = null;

chrome.runtime.onMessage.addListener(
    function (message, sender, callback) {
        if (message.to == "background") {
            switch (message.action) {
                case 'open_app':
                    var path = chrome.extension.getURL(message.path);
                    chrome.tabs.create({url: path}, function (tab) {
                        app = tab;
                    });
                    break;
            }
        }
    });

function callTabAction(tabId, action, callback, args) {
    var message = {to: 'content', action: action};
    chrome.tabs.sendMessage(tabId, message, callback)
}
