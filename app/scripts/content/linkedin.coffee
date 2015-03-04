###*
Created by matthew on 1/11/15.
###
window.linkedin = ->
  scrapeProfileList = ->
    results = []
    error = null

    # grab each profile link and push it to results[]
    $peopleDiv = $("#results .mod.result.people")
    $.each $peopleDiv, (index, person) ->
      $person = $(person)
      $nameLink = $person.find(".bd h3 a.title")
      profileLink = $nameLink.attr("href").replace(/&authType(.*)/, "")
      headline = $person.find(".description").text()
      location = $person.find(".demographic bdi").text()
      industry = $person.find(".demographic dd:last-child").text()
      fullName = $nameLink.text().trim()
      name = {}
      if fullName is "LinkedIn Member"
        name.isHidden = true

        # if the fullName has a period, we'll assume it's abbreviated
      else if fullName.hasChar(".")
        name.first = fullName.split(" ")[0]

        # if it's it's not abbreviated, we'll assume it looks like "John Smith", "John J. Smith" or "John J. Smith II"
      else
        fullName = fullName.split(" ")
        name.first = fullName[0]

        # "John J. Smith or John J. Smith II"
        if fullName.length > 2
          name.last = fullName[2]

          # "John Smith"
        else
          name.first = fullName[0]
          name.last = fullName[1]
      person =
        name: name
        profileLink: profileLink
        headline: headline
        location: location
        industry: industry
      results.push person
      return
    error = "People container doesn't exist"  if results.length is 0
    {
    linkList: results
    hasNextPage: pagination().hasNextPage()
    nextPage: pagination().nextPage()
    error: error
    }
  scrapeProfileView = ->
    currentPosition = $(".current-position a[name=title]").first().text()
    pastPositions = $("#overview-summary-past td ol li a").map(->
      $.trim $(this).text()
    ).get()
    education = $("#overview-summary-education td ol li a").map(->
      $.trim $(this).text()
    ).get()
    {
    currentPosition: currentPosition
    pastPositions: pastPositions
    education: education
    }
  pagination = ->
    nextPage = ->
      $nextPaginationBtn = $("#results-pagination .next a")
      location.hostname + $nextPaginationBtn.attr("href")
    hasNextPage = ->
      $("#results-pagination .next a").length
    {
    nextPage: nextPage
    hasNextPage: hasNextPage
    }
  {
  scrapeProfileList: scrapeProfileList
  scrapeProfileView: scrapeProfileView
  pagination: pagination
  }