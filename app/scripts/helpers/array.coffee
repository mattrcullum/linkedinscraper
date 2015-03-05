###*
Created by matthew on 2/12/15.
###
Array.prototype.move = (from, to) ->
  @.splice to, 0, @.splice(from, 1)[0]