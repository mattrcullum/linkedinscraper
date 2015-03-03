###*
Created by matthew on 2/11/15.
###
queue =
  add: ->
    company =
      emailDomain: app.viewModel.emailDomain()
      companyName: app.viewModel.companyName()
      companyID: app.viewModel.companyIDs()
      titleFilter: app.viewModel.titleFilter()
      skipEmails: app.viewModel.skipEmailRetrieval()

    company.id = company.companyName + company.companyID
    duplicate = false

    $(app.bp.queue).each (index, item) ->
      if item.id is company.id
        alert "Company already in queue"
        duplicate = true

    return false if duplicate

    app.viewModel.appendQueue company
    app.modals.addToQueue.modal "hide"