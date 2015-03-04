messageReceived = (message, sender, sendResponse) ->
  return unless message.to is "content"

  linkedin = window.linkedin()
  google = window.google()

  switch message.action
    when "scrapeProfileList"
      results = linkedin.scrapeProfileList()
      sendResponse results
    when "nextPage"
      results = linkedin.pagination().nextPage()
      sendResponse results
    when "getBasicInfo"
      results = linkedin.scrapeProfileView()
      sendResponse results
    when "getName"
      time =
        total: 0
        interval: 50
        out: 5000 #time.out ;)

      waitForSearchResults = setInterval((callback, time) ->
        time.total += time.interval
        $results = $("#rso")
        hasResults = $results.find("li").length
        if hasResults
          setTimeout ((callback) ->
            debugger
            callback google.getName()
            return
          ), 350, callback
          clearInterval waitForSearchResults
        else if $results.length
          clearInterval waitForSearchResults
          callback false
        console.log time.total
        return
      , time.interval, sendResponse, time)
    when "tryEmail"
      google.tryEmail message.args, sendResponse
  true

chrome.runtime.onMessage.addListener messageReceived