###*
Created by matthew on 2/13/15.
###

# message sending/receiving
chrome.runtime.onMessage.addListener (message) ->
  chrome.tabs.create url: message.path  if message.action is "openApp"


# provides a proxy to call a content script function
app.callTabAction = (tabID, action, callback, args) ->
  unless action
    console.error "actions not set"
    return false
  message =
    to: "content"
    action: action
    args: args
  chrome.tabs.sendMessage tabID, message, callback