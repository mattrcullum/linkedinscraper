app = {}
$(document).ready ->

  # array of url GET params
  url = urlHelper();
  app.params = url.params
  app.queue = queue

  params = app.params
  debugger

  # background page
  app.bp = chrome.extension.getBackgroundPage() # bp = background page

  # knockout
  app.ko = ko
  app.viewModel = models.view()

  # models
  app.ko.applyBindings app.viewModel

  app.modals =
    addToQueue: $("#addToQueue")
  app.modals.addToQueue.modal "show" if params["a"] is "addToQueue"

  app.viewModel.delay.subscribe (delay) ->
    app.bp.app.settings.delay = delay
