###*
Created by matthew on 2/11/15.
###
urlHelper = ->
  segments = ->
    location.pathname.substr(1).split "/"
  hostName = ->
    location.host.split(".")[1]
  param = (name, link) ->
    href = link or location
    
    # name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
    results = regex.exec(href.search)
    (if results is null then "" else decodeURI(results[1]))
  getSearchParameters = ->
    parameterString = window.location.search.substr(1)
    (if parameterString? and parameterString isnt "" then transformToArray(parameterString) else {})
  transformToArray = (parameterString) ->
    params = {}
    parameterArray = parameterString.split("&")
    i = 0

    while i < parameterArray.length
      tmparr = decodeURI(parameterArray[i]).split("=")
      params[tmparr[0]] = tmparr[1]
      i++
    params
  params: getSearchParameters()
  getParam: param
  segments: segments()
  hostName: hostName()

