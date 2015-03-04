###*
Created by matthew on 12/13/14.
###

# results
window.scraper = ->

  # scrape status
  running = false
  scrapeTab = 0
  masterCallback = undefined
  isFinished = false
  status = {}
  limit = app.settings.scraper.limit

  # starts scraping
  start = (cb) ->
    running = true
    masterCallback = cb

    nextIteration = ->
      if status.done
        exit()
      else
        series.execute()

    series =
      funcs: [getProfileLinks, nextIteration]
      execute: ->
        async.series(series['funcs'])

    async.series [
      create_scrapeTab
      series.execute
    ]

  # releases program control back to calling function
  exit = ->
    log('leaving scrape function') if app.debug
    if scrapeTab
      chrome.tabs.remove(
        scrapeTab
        ->
          scrapeTab = false
          isFinished = true
          masterCallback()
      )

  # creates the tab we'll use for scraping
  create_scrapeTab = (callback) ->
    log('create scrape tab') if app.debug
    if scrapeTab
      callback()
    else
      titleFilter = app.currentCompany.titleFilter
      url = "http://linkedin.com/" + "vsearch/p" + "?f_CC=" + app.currentCompany.companyID + ((if titleFilter then "&title=" + titleFilter else "")) + "&openAdvancedForm=true" + "&titleScope=C&locationType=I" + "&orig=MDYS"

      onTabLoad = (tabId, info) ->
        if info.status is "complete" and tabId is scrapeTab
          chrome.tabs.onUpdated.removeListener onTabLoad
          callback()

      chrome.tabs.create(
        url: url
        (tab) ->
          scrapeTab = tab.id
          chrome.tabs.onUpdated.addListener onTabLoad
      )
  # retrieves profile links from scrape tab
  getProfileLinks = (callback) ->
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
      else
        # if no next page, callback
        if not response.hasNextPage
          status.done = true
          callback()
          # otherwise, scrape next page
        else
          pageChange = (tabId, info, tab) ->
            url = tab.url
            if url? and tabId is scrapeTab and info.status is "complete"
              chrome.tabs.onUpdated.removeListener pageChange
              setTimeout callback, 2000
          chrome.tabs.update(
            url: "http://" + response.nextPage
            (response)->
              chrome.tabs.onUpdated.addListener pageChange
          )
    app.callTabAction scrapeTab, "scrapeProfileList", processResults

  # the api for this module
  {start: start}
