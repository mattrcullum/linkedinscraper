###*
Created by matthew on 2/12/15.
###
Array::move = (from, to) ->
  @splice to, 0, @splice(from, 1)[0]
  return