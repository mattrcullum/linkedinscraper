###*
Created by matthew on 1/22/15.
###
window.validateEmails = ->
  masterCallback = undefined
  gmailTab = undefined
  currentPerson = undefined
  personIndex = undefined
  successfulEmailFormats = undefined
  gmailInitialLoad = true

  start = (cb) ->
    log('validating emails') if app.debug?
    gmailInitialLoad = true
    masterCallback = cb
    personIndex = 0
    successfulEmailFormats = []

    nextIteration = ->
      currentPerson = app.results[app.currentCompanyName][personIndex++]
      if not currentPerson.name or currentPerson.name.skipPermutation
        log('skipping person') if app.debug?
        nextIteration()
      else
        if status.done or not currentPerson
          debugMessage = if status.done then 'exiting because status.done' else 'exiting because currentPerson is ' + currentPerson
          log(debugMessage) if app.debug?
          exit()
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
    # these are the email combinations we permuted in the previous step
    possibleEmails = currentPerson.possibleEmails
    if possibleEmails and successfulEmailFormats.length
      $.each successfulEmailFormats.reverse(), (index, item) ->
        possibleEmails.move item, 0
    callback()

  findCurrentPersonsEmail = (callback) ->
    timeout = (if gmailInitialLoad then 7000 else 800)
    email = undefined
    i = 0

    composeNewEmail = (composeNewEmailCb) ->
      log('composing new email') if app.debug?
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
          successfulEmailFormats.push i - 1  if successfulEmailFormats.indexOf(i) is -1
        nextVariationCb()
      app.callTabAction gmailTab, "tryEmail", processResponse,
        email: email
        name: currentPerson.name

    nextIteration = ->
      possibleEmails = currentPerson.possibleEmails
      if possibleEmails
        email = currentPerson.possibleEmails[i++]
        if email and not currentPerson.email
          async.series series
        else
          unless currentPerson.email
            currentPerson.email = possibleEmails[successfulEmailFormats[0] or 0]
            currentPerson.emailConfirmed = ""
          else
            currentPerson.emailConfirmed = "yes"
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
