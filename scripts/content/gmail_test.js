/**
 * Created by matthew on 12/20/14.
 */

$(document).ready(function () {
  var $element = $("textarea").first();

  $element.focus();
  $element.text('hello@gmail.com');
  $element.blur();

});
