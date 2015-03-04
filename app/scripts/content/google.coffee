###*
Created by matthew on 1/21/15.
###
window.google = ->
  getName = ->
    $results = $(".g:lt(3)")
    name = {}
    $.each $results, (index, item) ->
      title = $(item).find("h3").text()
      
      # The google result we want will look like one of the following:
      # "John Smith | LinkedIn"
      # "John S. | LinkedIn"
      # "John J. Smith | LinkedIn"
      if " ".hasChar(title, "|") # TO DO ***********************************************8
        fullName = title.split("|")[0].trim().split(" ")
        fName = fullName[0]
        lName = fullName[1]
        name =
          first: fName
          last: lName
          full: fullName
        false
    name or false
  isGmailReady = ->
  tryEmail = (message, callback) ->
    console.log message, callback
    email = message.email.replace(" ", "")
    $emailInput = $("textarea").first()
    $emailInput.focus()
    $emailInput.text email
    $emailInput.blur()
    setTimeout ((callback) -> # give rapportive 1500 milliseconds to initialize
      waitForRapportive = setInterval((callback) -> # now we wait for rapportive to load the results
        rapportiveSidebarExists = ->
          $rapportive.length isnt 0
        isLoadingResults = ->
          $rapportive.has(".wip-spinner").length or $rapportive.find(".links li a:contains(\"Looking up...\")").length
        $rapportive = $("#rapportive-sidebar")
        if rapportiveSidebarExists() and not isLoadingResults()
          clearInterval waitForRapportive
          $name = $rapportive.find("h1.name").first().text().trim().toLowerCase()
          $discardDraftBtn = $("[data-tooltip=\"Discard draft\"]")
          $discardDraftBtn.click()
          waitForDraftDiscard = setInterval((callback) ->
            $hasSendButton = $("div[role=\"button\"]:contains(\"Send\")").length
            unless $hasSendButton
              clearInterval waitForDraftDiscard
              if $name
                callback correct: true
                console.log "found email"
              else
                console.log "wrong"
                callback correct: false
            return
          , 100, callback)
        return
      , 100, callback)
      return
    ), 1500, callback
    return
  {
  getName: getName
  isGmailReady: isGmailReady
  tryEmail: tryEmail
  }
