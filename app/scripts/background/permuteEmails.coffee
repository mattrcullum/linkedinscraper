###*
Created by matthew on 12/15/14.
###

###*
Created by matthew on 1/21/15.
###
window.permuteEmails = ->
  start = (callback) ->
    done = ->
      masterCallback()
      return
    masterCallback = callback
    async.series [
      permuteEmails
      done
    ]
    return
  permuteEmails = (cb) ->
    convertStringToAscii = (email) ->
      
      #Convert Characters
      email.replace(/ö/g, "o").replace(/ç/g, "c").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace /é/g, "e"
    $.each app.results, (index, resultset) ->
      $.each resultset, (index, person) ->
        person.emailConfirmed = ""
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
        return

      return

    cb()
    this
  masterCallback = undefined
  {start: start}
