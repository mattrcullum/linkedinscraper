###*
Created by matthew on 1/22/15.
###
validateEmails = ->
  start = (cb) ->
    executeSeries = ->
      async.series series
      return
    
    # program control
    nextIteration = ->
      currentPerson = app.results[app.currentCompanyName][personIndex++]
      if not currentPerson.name or currentPerson.name.skipPermutation
        nextIteration()
      else
        log currentPerson
        if status.done or not currentPerson
          exit()
        else
          executeSeries()
      return
    gmailInitialLoad = true
    masterCallback = cb
    personIndex = 0
    successfulEmailFormats = []
    series = [
      arrangeEmails
      findCurrentPersonsEmail
      nextIteration
    ]
    async.series [
      createGmailTab
      nextIteration
    ]
    return
  createGmailTab = (callback) ->
    if gmailTab
      callback()
      return false
    chrome.tabs.create
      url: "https://google.com"
    , (tab) ->
      gmailTab = tab.id
      setTimeout callback, 1000
      return

    return
  arrangeEmails = (callback) ->
    
    # these are the email combinations we permuted in the previous step
    possibleEmails = currentPerson.possibleEmails
    if possibleEmails
      if successfulEmailFormats.length
        $.each successfulEmailFormats.reverse(), (index, item) ->
          possibleEmails.move item, 0
          return

    callback()
    return
  findCurrentPersonsEmail = (callback) ->
    composeNewEmail = (composeNewEmailCb) ->
      waitForLoad = ->
        console.log "callback in 5s"
        setTimeout composeNewEmailCb, timeout
        return
      timeout = (if gmailInitialLoad then 7000 else 800)
      console.log "compose email"
      chrome.tabs.update gmailTab,
        url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"
      , waitForLoad
      gmailInitialLoad = false
      return
    tryNextVariation = (nextVariationCb) ->
      processResponse = (response) ->
        if response and response.correct
          currentPerson.email = email
          successfulEmailFormats.push i - 1  if successfulEmailFormats.indexOf(i) is -1
        nextVariationCb()
        return
      app.callTabAction gmailTab, "tryEmail", processResponse,
        email: email
        name: currentPerson.name

      return
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
      return
    i = 0
    email = undefined
    series = [
      composeNewEmail
      tryNextVariation
      nextIteration
    ]
    nextIteration()
    return
  exit = ->
    masterCallback()
    return
  masterCallback = undefined
  gmailTab = undefined
  currentPerson = undefined
  personIndex = undefined
  successfulEmailFormats = undefined
  gmailInitialLoad = undefined
  start: start
