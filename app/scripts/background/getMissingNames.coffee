###*
Created by matthew on 1/21/15.
###
window.getMissingNames = ->
  masterCallback = undefined
  searchTab = 0
  personIndex = undefined
  currentPerson = undefined
  status =
    done: false

  start = (cb) ->
    log('get missing names') if app.debug?
    masterCallback = cb
    personIndex = 0
    currentPerson = true

    # program control
    nextIteration = ->
      currentPerson = app.results[app.currentCompanyName][personIndex++]
      if status.done or not currentPerson
        debugMessage = if status.done then 'exiting because status is set to done' else 'exiting because current person is ' + currentPerson
        log(debugMessage) if app.debug?
        exit()
      else
        if currentPerson.name.isHidden or not currentPerson.name.last
          executeSeries()
        else
          nextIteration()

    series = [
      createSearchTab,
      getName,
      nextIteration,
    ]

    executeSeries = ->
      log('running program loop for ' + currentPerson.name.first) if app.debug?
      async.series series

    nextIteration()
  createSearchTab = (callback) ->
    unless currentPerson or currentPerson.headline or currentPerson.pastPositions or currentPerson.education or currentPerson.currentCompany
      callback()
    else
      tabUpdated = (tabID, info, tab) ->
        if searchTab is tabID and info.status is "complete"
          chrome.tabs.onUpdated.removeListener tabUpdated
          callback()
      searchText = "site:linkedin.com " + ((if currentPerson.name.first then currentPerson.name.first + " " else "")) + ((if currentPerson.name.last then currentPerson.name.last + " " else "")) + currentPerson.headline + " "
      url = "http://google.com" + "#q=" + searchText
      chrome.tabs.onUpdated.addListener tabUpdated
      chrome.tabs.create(
        url: url
        (tab) ->
          searchTab = tab.id
      )
  getName = (callback) ->
    handleResponse = (name) ->
      log('handling response from content script') if app.debug?
      if name and name.first and name.last
        currentPerson.name = name
      else
        currentPerson.name.skipPermutation = true
      chrome.tabs.remove searchTab
      callback()

    log('asking content script for missing name') if app.debug?
    app.callTabAction searchTab, "getName", handleResponse
  exit = ->
    log('get missing names done. now exiting') if app.debug?
    chrome.tabs.remove searchTab  if searchTab
    masterCallback()
  {start: start}
