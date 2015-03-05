###*
Created by matthew on 12/15/14.
###

###*
Created by matthew on 1/21/15.
###
window.permuteEmails = ->
  masterCallback = undefined

  start = (callback) ->
    log('permuting emails') if app.debug?

    done = ->
      log('done permuting emails') if app.debug?
      masterCallback()
    masterCallback = callback

    async.series [
      permuteEmails
      done
    ]

  convertStringToAscii = (email) ->
    email
    .replace /ö/g, "o"
    .replace /ç/g, "c"
    .replace /ş/g, "s"
    .replace /ı/g, "i"
    .replace /ğ/g, "g"
    .replace /ü/g, "u"
    .replace /é/g, "e"

  permuteEmails = (cb) ->
    $.each app.results[app.currentCompanyName], (index, person) ->
      person.emailConfirmed = false
      name = person.name
      if name and not name.skipPermutation
        try
          initial =
            first: name.first[0]
            last: name.last[0]
        catch err
          console.error err
        person.possibleEmails = [
          name.first + name.last
          name.first + "." + name.last
          initial.first + name.last
          initial.first + "." + name.last
          name.last + name.first
          name.last + "." + name.first
          name.first
          name.last
          initial.first + initial.last
        ].map((emailAddress) ->
          convertStringToAscii emailAddress + "@" + app.currentCompany.emailDomain
        )
    cb()
  {start: start}
