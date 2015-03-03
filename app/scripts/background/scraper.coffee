###*
Created by matthew on 12/13/14.
###

# results
window.scraper = ->
  
  # scrape status
  
  # starts scraping
  start = (cb) ->
    executeSeries = ->
      async.series series
      return
    
    # program control
    nextIteration = ->
      if status.done
        exit()
      else
        executeSeries()
      return
    running = true
    masterCallback = cb
    series = [
      getProfileLinks
      nextIteration
    ]
    async.series [
      create_scrapeTab
      executeSeries
    ]
    return
  
  # releases program control back to calling function
  exit = ->
    chrome.tabs.remove scrapeTab  if scrapeTab
    scrapeTab = false
    isFinished = true
    masterCallback()
    return
  
  # creates the tab we'll use for scraping
  create_scrapeTab = (callback) ->
    
    # prevents creation of extra tab
    
    # create the tab
    
    # after tab creation return control to the calling function
    onTabLoad = (tabId, info) ->
      if info.status is "complete" and tabId is scrapeTab
        chrome.tabs.onUpdated.removeListener onTabLoad
        callback()
      return
    if scrapeTab
      callback()
      return
    titleFilter = app.currentCompany.titleFilter
    url = "http://linkedin.com/" + "vsearch/p" + "?f_CC=" + app.currentCompany.companyID + ((if titleFilter then "&title=" + titleFilter else "")) + "&openAdvancedForm=true" + "&titleScope=C&locationType=I" + "&orig=MDYS"
    chrome.tabs.create
      url: url
    , (tab) ->
      scrapeTab = tab.id
      chrome.tabs.onUpdated.addListener onTabLoad
      return

    return
  
  # retrieves profile links from scrape tab
  getProfileLinks = (callback) ->
    
    # tells the content script to grab and return the current page's profile links
    
    # checks the integrity of the response, then concatenates it to our app.results variable
    processResults = (response) ->
      
      # basic error checking
      if not response or response.error
        console.error chrome.runtime.lastError
        console.error "Response for processLinkBatch is:" + response.error
        return false
      
      # concatenate the response (if any) to our existing results array
      unless response.linkList.length is 0
        $(response.linkList).each (index, item) ->
          item.companyName = app.currentCompany.companyName
          return

        app.results[app.currentCompanyName] = app.results[app.currentCompanyName].concat(response.linkList)
      
      # when debugging, limits the number of profile links we collect
      if app.results[app.currentCompanyName].length >= limit
        status.done = true
        callback()
        return false
      
      # hasNextPage is a boolean representing whether the "next" pagination button exists.
      unless response.hasNextPage
        status.done = true
        callback()
        false
      
      # otherwise, go on to scrape next page
      else
        chrome.tabs.update
          url: "http://" + response.nextPage
        , ->
          pageChange = (tabId, info, tab) ->
            url = tab.url
            if url? and tabId is scrapeTab and info.status is "complete"
              chrome.tabs.onUpdated.removeListener pageChange
              setTimeout ((callback) ->
                callback()
                return
              ), 2000, callback
            return
          chrome.tabs.onUpdated.addListener pageChange
          return

      return
    app.callTabAction scrapeTab, "scrapeProfileList", processResults
    this
  running = false
  scrapeTab = 0
  masterCallback = undefined
  isFinished = false
  status = {}
  limit = app.settings.scraper.limit
  
  # the api for this module
  {start: start}
