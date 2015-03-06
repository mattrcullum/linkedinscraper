window.guessEmails = (callback)->
  emailFormatHits = app.currentCompany.emailFormatHits
  if emailFormatHits.length
    $.each app.results[app.currentCompanyName], (index, value) ->
      if not value.emailConfirmed and value.name and value.name.first and value.name.last

        sorted = if emailFormatHits then emailFormatHits.sort (a, b)->
          b.count - a.count
        mostLikelyIndex = sorted[0].id

        value.email = value.possibleEmails[mostLikelyIndex]
        value.emailConfirmed = false
        log('setting email for ' + value.name.first + ' ' + value.name.last + ' to ' + value.email) if app.debug
  callback()