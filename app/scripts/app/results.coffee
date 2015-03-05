###*
Created by matthew on 1/27/15.
###
app.results = ->
  invokeCSVDownload = ->
    companies = app.bp.app.results
    csv = "FirstName,LastName,Title,Company,Email,Email Confirmed,Profile URL\n"
    $.each companies, (index, company) ->
      $.each company, (index, person) ->
        dataString = [
          person.name.first or ""
          person.name.last or ""
          person.currentPosition or ""
          person.companyName
          person.email or ""
          person.emailConfirmed or ""
          person.profileLink
        ].map((item) ->
          "\"" + item + "\""
        )
        dataString = dataString.join(",")

        #csv += index < companies[(companies.length-1)].length ? dataString + "\n" : dataString;
        csv += dataString + "\n"
    name = ""
    $.each companies, (index, item) ->
      name += item[0].companyName

    pom = document.createElement("a")
    pom.setAttribute "href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
    pom.setAttribute "download", name + "Employees.csv"
    pom.click()
  {
  invokeCSVDownload: invokeCSVDownload
  }