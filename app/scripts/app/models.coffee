models =
  view: ->
    self = this
    companyParam = app.params["company"]
    companyIDsParam = app.params["companyID"]

    #variables
    @minDelay = app.ko.observable(app.bp.app.settings.minDelay)
    @maxDelay = app.ko.observable(app.bp.app.settings.maxDelay)
    @queue = app.ko.observableArray(app.bp.queue)
    @emailDomain = app.ko.observable(companyParam.toLowerCase() + ".com")
    @companyName = app.ko.observable(companyParam)
    @companyIDs = app.ko.observable(companyIDsParam)
    @titleFilter = app.ko.observable(null)
    @skipEmailRetrieval = app.ko.observable(false)
    #functions
    @addToQueue = app.queue.add

    @start = ->
      app.bp.go()

    @invokeCSVDownload = ->
      app.results().invokeCSVDownload()

    @reset = ->
      go = confirm("This will clear all results and reset the extension. Proceed?")
      chrome.runtime.reload()  if go

    @appendQueue = (item) ->
      self.queue.push item

    @removeFromQueue = (company) ->
      self.queue.remove(company)

    return this