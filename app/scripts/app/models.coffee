models = ->
  view = ->
    return ->
      companyParam = app.params["company"]
      companyIDsParam = app.params["companyID"]

      self = this

      #functions
      self.removeFromQueue = (company) ->
        self.queue.remove company

      self.start = ->
        app.bp.go()

      self.invokeCSVDownload = ->
        app.results.invokeCSVDownload()

      self.reset = ->
        go = confirm("This will clear all results and reset the extension. Proceed?")
        chrome.runtime.reload()  if go

      self.appendQueue = (item) ->
        self.queue.push item

      #variables
      self.queue = app.ko.observableArray()
      self.emailDomain = app.ko.observable(companyParam.toLowerCase() + ".com")
      self.companyName = app.ko.observable(companyParam)
      self.companyIDs = app.ko.observable(companyIDsParam)
      self.titleFilter = app.ko.observable(null)
      self.skipEmailRetrieval = app.ko.observable(false)
      self.addToQueue = app.queue.add
      self.delay = app.ko.observable(app.bp.app.settings.delay)
      true
  view: view()