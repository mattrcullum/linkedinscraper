/**
 * Created by matthew on 12/7/14.
 */


//chrome.tabs.create({url:'http://linkedin.com'});
//chrome.tabs.create({url:'http://gmail.com'});

var $form, $steps, $contents, domain, $form, $steps, $contents, tld, position_filter, company, companyIDs;

var background = chrome.extension.getBackgroundPage();

$(document).ready(function () {

  company = helper.getParameterByName('company', location);
  companyIDs = helper.getParameterByName('companyID', location);

  $('#company-name').append(company);
  $('#company-IDs').append(companyIDs);

  $form = $('#options');
  $steps = $('#steps');
  $contents = $('#content');

  if (background.people.length) {
    show_step('results')
  }


  // click handler for scrape button
  $('#scrape-link.btn-primary').click(function () {
    var $self = $(this)
    position_filter = form_helper.format_position_filter($('#position-filter').val());
    domain = $('#domain').val();
    if (domain.length == 0) {
      alert("Domain cannot be empty");
      return;
    }
    domain += $('#tld').val();
    domain = '@' + domain;
    // if the button hasn't been clicked yet
    if ($self.hasClass('btn-primary')) {
      $self.removeClass('btn-primary').addClass('btn-danger').blur();
      scrape();
      $self.text('Cancel Scrape');
    }
    // the button has been clicked, which means it's now a cancel scrape button
    else {
      chrome.runtime.reload()
    }
  });


  // handles retrieval of last names
});

function scrape() {

  show_step('scrape');

  var LinkedInHost = 'http://linkedin.com/';
  var advancedSearchPath = 'vsearch/';
  var scrape_url =
    LinkedInHost +
    advancedSearchPath +
    'p?title=' + position_filter +
    '&f_CC=' + companyIDs +
    '&openAdvancedForm=true&titleScope=C&locationType=I';

  background.scraper.start(scrape_url);

  var cycle = setInterval(function () {
    var $names_retrieved = $('#names-retrieved');
    $names_retrieved.text(background.people.length);
    if (!background.scraper.running()) {
      clearInterval(cycle);
      last_names();
    }
  }, 100)
}

function last_names() {

  show_step('last-name-retrieval');

  // yo backend - i need last names. NOW!
  background.last_names.start();

  // similar to a wife, this block will yap at the backend every 100ms asking if it's done
  var cycle = setInterval(function () {

    // note to self: change this names. Really bad var name to describe an html element
    var $names_retrieved = $('#names-retrieved');
    $names_retrieved.text(background.people.length);

    if (background.last_names.done()) {
      clearInterval(cycle);
      show_step('get-emails')
      // got email addresses?
      get_emails()
    }
  }, 100)
}


function get_emails() {
  background.permuter.start(function () {
    background.email_checker.start(domain);
  });

  var cycle = setInterval(function () {

    if (background.email_checker.done()) {
      clearInterval(cycle);
      show_step('download')
    }
  }, 100)
}

function show_step(step) {
  if (step == 'results') {
    $('#download').click(download);
    $form.hide();
    $('#scrape-link').hide()
    $('.steps div').hide();
    $('#results').show();

    $('#im-done').click(function () {
      chrome.runtime.reload();
    })
  }
  else {
    var $current_step = $('#current-step');
    $current_step.show();

    hide_contents(function () {
      $form.hide();

      $steps = $('.steps div');
      $steps.hide();

      var $step = $('#' + step);
      $step.show('results');

      $current_step.text('Step ' + ($steps.index($step) + 1) + '/' + $steps.length)
    })
  }
}

function hide_contents(callback) {
  $contents.slideUp(600, function () {
    callback();
    $contents.delay(100).slideDown(200)
  });
}

function download() {
  var people = background.people;
  var csv = "";
  $.each(people, function (index, person) {
    var full_name = person.full_name;
    var email = person.email;
    var description = person.description;
    var dataString = [full_name, email, description];
    dataString = dataString.join(",");
    csv += index < people.length ? dataString + "\n" : dataString;
  })
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  pom.setAttribute('download', 'results.csv');
  pom.click();
};

var form_helper = {

  format_position_filter: function (title_filter) {
    var titles = title_filter.split(' ')
    var parsedString = '';
    for (var i = 0; i < titles.length; i++) {
      var currentTitle = titles[i]
      currentTitle = currentTitle.replace('.', '*')
      parsedString += currentTitle.toUpperCase();
      if ((i + 1) != titles.length) {
        parsedString += ' OR '
      }
    }
    return parsedString;
  }
};
