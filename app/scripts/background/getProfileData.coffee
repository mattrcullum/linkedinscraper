###*
Created by matthew on 1/17/15.
###
getProfileData = ->
  start = (cb) ->
    
    # program control
    nextIteration = ->
      currentPerson = app.results[app.currentCompanyName][personIndex++]
      if status.done or not currentPerson
        exit()
      else
        executeSeries()
      return
    
    # execute series after a one-time function call
    #async.series([
    #         init,
    #         executeSeries
    #         ]
    #         );
    executeSeries = ->
      async.series series
      return
    masterCallback = cb
    personIndex = 0
    currentPerson = true
    series = [
      createProfileScrapeTab
      retrieveProfileData
      nextIteration
    ]
    nextIteration()
    return
  createProfileScrapeTab = (callback) ->
    
    # create the tab with link argument
    chrome.tabs.create
      url: currentPerson.profileLink
    , (tab) ->
      tabUpdated = (tabID, changeInfo, tab) ->
        if tabID is profileScrapeTab and changeInfo.status is "complete"
          chrome.tabs.onUpdated.removeListener tabUpdated
          setTimeout callback, app.settings.delay
          log app.settings.delay
        return
      profileScrapeTab = tab.id
      chrome.tabs.onUpdated.addListener tabUpdated
      return

    return
  retrieveProfileData = (callback) ->
    
    # get the required data from the tab
    handleResponse = (response) ->
      $.extend currentPerson, response
      
      # we're done with the tab. remove it
      chrome.tabs.remove profileScrapeTab
      callback()
      return
    app.callTabAction profileScrapeTab, "getBasicInfo", handleResponse
    return
  
  # releases program control back to calling function
  exit = ->
    masterCallback()
    return
  masterCallback = undefined
  currentPerson = undefined
  personIndex = undefined
  profileScrapeTab = undefined
  start: start
