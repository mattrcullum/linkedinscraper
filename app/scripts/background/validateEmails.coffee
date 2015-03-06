###*
Created by matthew on 1/22/15.
###
window.validateEmails = ->
  masterCallback = undefined
  gmailTab = false
  currentPerson = undefined
  personIndex = undefined
  gmailInitialLoad = true
  currentCompany = false

  start = (cb) ->
    log('validating emails') if app.debug?
    gmailInitialLoad = true
    masterCallback = cb
    gmailTab = false
    personIndex = 0
    currentCompany = app.currentCompany
    nextIteration = ->
      currentPerson = app.results[app.currentCompanyName][personIndex++]
      if status.done or not currentPerson
        debugMessage = if status.done then 'exiting because status.done' else 'exiting because currentPerson is ' + currentPerson
        log(debugMessage) if app.debug?
        exit()
      else
        if not currentPerson.name or currentPerson.name.skipPermutation
          log('skipping person') if app.debug?
          nextIteration()
        else
          log('continuing to next person') if app.debug?
          executeSeries()

    series = [
      arrangeEmails
      findCurrentPersonsEmail
      nextIteration
    ]

    executeSeries = ->
      async.series series

    async.series [
      createGmailTab
      nextIteration
    ]

  createGmailTab = (callback) ->
    if gmailTab
      callback()
    chrome.tabs.create(
      url: "https://google.com"
      (tab) ->
        gmailTab = tab.id
        setTimeout callback, 1000
    )

  arrangeEmails = (callback) ->
    emailHits = currentCompany.emailFormatHits
    arrangedEmails = currentPerson.possibleEmails.slice 0

    if emailHits.length
      sorted = emailHits.sort(
        (a, b)->
          b.count - a.count
      )

      $.each sorted, (index, item) ->
        arrangedEmails.move item.id, 0
    currentPerson.arrangedEmails = arrangedEmails

    callback()

  findCurrentPersonsEmail = (callback) ->
    email = undefined
    i = 0

    composeNewEmail = (composeNewEmailCb) ->
      timeout = (if gmailInitialLoad then 7000 else 800)
      log('composing new email in' + timeout + 'ms') if app.debug?
      waitForLoad = ->
        setTimeout composeNewEmailCb, timeout
      chrome.tabs.update(
        gmailTab
        url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"
        waitForLoad
      )

      gmailInitialLoad = false

    tryNextVariation = (nextVariationCb) ->
      processResponse = (response) ->
        if response and response.correct
          currentPerson.email = email
          currentPerson.emailConfirmed = "yes"
          currentIndex = currentPerson.possibleEmails.indexOf(email)
          emailFormatHits = app.currentCompany.emailFormatHits

          hit = $.grep app.currentCompany.emailFormatHits, (a)->
            a.id is currentIndex

          if hit.length
            hit[0].count++
          else
            emailFormatHits.push({id: currentIndex, count: 1})
          debugger

        nextVariationCb()
      app.callTabAction gmailTab, "tryEmail", processResponse,
        email: email
        name: currentPerson.name

    nextIteration = ->
      arrangedEmails = currentPerson.arrangedEmails
      if arrangedEmails
        email = currentPerson.arrangedEmails[i++]
        if email and not currentPerson.email
          log('trying next possible email ' + currentPerson.email) if app.debug?
          async.series series
        else
          callback()
      else
        callback()

    series = [
      composeNewEmail
      tryNextVariation
      nextIteration
    ]

    nextIteration()

  exit = ->
    masterCallback()
  {start: start}
