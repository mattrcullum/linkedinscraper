###*
Created by matthew on 1/21/15.
###
getMissingNames = ->
  start = (cb) ->
    
    # program control
    nextIteration = ->
      currentPerson = app.results[app.currentCompanyName][personIndex++]
      if status.done or not currentPerson
        exit()
      else
        if currentPerson.name.isHidden or not currentPerson.name.last
          executeSeries()
        else
          nextIteration()
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
      createSearchTab
      getName
      nextIteration
    ]
    nextIteration()
    return
  createSearchTab = (callback) ->
    unless currentPerson or currentPerson.headline or currentPerson.pastPositions or currentPerson.education or currentPerson.currentCompany
      callback()
      false
    else
      
      #debugger;
      
      # currentPerson.pastPositions.join(' ') + ' ' +
      #currentPerson.education.join(' ') + ' ';
      tabUpdated = (tabID, info, tab) ->
        if searchTab is tabID and info.status is "complete"
          chrome.tabs.onUpdated.removeListener tabUpdated
          callback()
        return
      searchText = "site:linkedin.com " + ((if currentPerson.name.first then currentPerson.name.first + " " else "")) + ((if currentPerson.name.last then currentPerson.name.last + " " else "")) + currentPerson.headline + " "
      url = "http://google.com" + "#q=" + searchText
      chrome.tabs.onUpdated.addListener tabUpdated
      chrome.tabs.create
        url: url
      , (tab) ->
        searchTab = tab.id
        return

    return
  getName = (callback) ->
    handleResponse = (name) ->
      if name and name.first and name.last
        currentPerson.name = name
      else
        currentPerson.name.skipPermutation = true
      chrome.tabs.remove searchTab
      callback()
      return
    app.callTabAction searchTab, "getName", handleResponse
    return
  exit = ->
    chrome.tabs.remove searchTab  if searchTab
    masterCallback()
    return
  masterCallback = undefined
  searchTab = undefined
  personIndex = undefined
  currentPerson = undefined
  start: start
