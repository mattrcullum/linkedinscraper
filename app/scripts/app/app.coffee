app = {}
$(document).ready ->

  # array of url GET params
  url = urlHelper();
  app.params = url.params
  params = app.params

  # background page
  app.bp = chrome.extension.getBackgroundPage() # bp = background page

  # knockout
  app.ko = ko
  app.models = new models()

  # models
  app.viewModel = app.models.view
  app.ko.applyBindings app.viewModel
  log app.viewModel.delay

  app.modals =
    addToQueue: $("#addToQueue")
  app.modals.addToQueue.modal "show"  if params["a"] is "addToQueue"

  app.viewModel.delay.subscribe (delay) ->
    app.bp.app.settings.delay = delay