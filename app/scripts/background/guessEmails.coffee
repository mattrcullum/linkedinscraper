window.guessEmails = (callback)->
  $.each app.results[app.currentCompanyName], (index, value) ->
    if not value.email and not value.emailConfirmed and value.name and value.name.first and value.name.last
      emailFormatHits = app.currentCompany.emailFormatHits

      mostLikelyIndex = 0

      if emailFormatHits.length
        sorted = if emailFormatHits then emailFormatHits.sort (a, b)->
          b.count - a.count
        mostLikelyIndex = sorted[0].id

      value.email = value.possibleEmails[mostLikelyIndex]
      value.emailConfirmed = false
  callback()