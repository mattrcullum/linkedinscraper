###*
Created by matthew on 1/17/15.
###
window.getProfileData = ->
  masterCallback = false
  currentPerson = false
  personIndex = false
  profileScrapeTab = false
  status = {}

  start = (cb) ->
    log('getting profile data') if app.debug?
    masterCallback = cb
    personIndex = 0
    currentPerson = true

    nextIteration = ->
      log('going to next person') if app.debug?
      currentPerson = app.results[app.currentCompanyName][personIndex++]
      if status.done or not currentPerson
        log('exiting because current person was nil') if app.debug?
        exit()
      else
        async.series series

    series = [
      createProfileScrapeTab,
      retrieveProfileData,
      nextIteration
    ]

    nextIteration()

  createProfileScrapeTab = (callback) ->
    log('creating profile view tab') if app.debug?
    chrome.tabs.create(
      url: currentPerson.profileLink,
      (tab) ->
        tabUpdated = (tabID, changeInfo, tab) ->
          if tabID is profileScrapeTab and changeInfo.status is "complete"
            log('tab done loading. Callback after delay') if app.debug?
            chrome.tabs.onUpdated.removeListener tabUpdated
            delay = Math.random() * (app.settings.maxDelay - app.settings.minDelay) + app.settings.minDelay
            log('delay is set to: ' + delay + 'ms') if app.debug?
            setTimeout callback, delay
        profileScrapeTab = tab.id
        chrome.tabs.onUpdated.addListener tabUpdated
    )
  retrieveProfileData = (callback) ->
    log('Asking content script for profile data') if app.debug?
    # get the required data from the tab
    handleResponse = (response) ->
      log('Response received from content script') if app.debug?
      $.extend currentPerson, response

      # we're done with the tab. remove it
      chrome.tabs.remove(
        profileScrapeTab
        ->
          log('Done with profile retrieval')
          callback()
      )

    app.callTabAction profileScrapeTab, "getBasicInfo", handleResponse

  # releases program control back to calling function
  exit = ->
    masterCallback()
  {start: start}
