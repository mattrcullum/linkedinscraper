/**
 * Created by matthew on 12/15/14.
 */
var validateEmails = (function () {

  var done = false;

  function start(domain) {
    var iteration = 0;
    var domain = domain;
    var gmail_tab = 0;
    var first_run = true;

    function wait_for_gmail(callback) {
      function listen(tabId, changeInfo) {
        if (changeInfo.status == "complete" && tabId == gmail_tab) {
          setTimeout(function (callback) {
            callback()
          }, 1200, callback);
          chrome.tabs.onUpdated.removeListener(listen);
        }
      }

      chrome.tabs.onUpdated.addListener(listen);
    }

    function verify_emails_recursive() {
      var person = people[iteration];
      if (person) {
        var possible_emails = person.possible_emails;

        var i = 0;

        function next_email() {
          var email = possible_emails[i];
          var full_name = person.full_name.toLowerCase().trim();
          if (email) {
            email = email + domain;
            chrome.tabs.update(gmail_tab, {url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"}, function () {
              if (first_run) {
                wait_for_gmail(ask)
              }
              else {
                setTimeout(function () {
                  ask()
                }, 1200)
              }

              function ask() {
                console.log('gmail ready')
                first_run = false;
                send_to.tab(gmail_tab, 'get_email', function (response) {
                  if (response.correct) {
                    person.email = email;
                    ++iteration;
                    verify_emails_recursive();
                  }
                  else {
                    ++i;
                    next_email();
                  }
                  console.table(people)
                }, {email: email, full_name: full_name})
              }
            });
          }
          else {
            ++iteration;
            person.email = 'not found'
            verify_emails_recursive()
          }
        }

        next_email()
      }
      else {
        done = true;
        setTimeout(function () {
          chrome.tabs.remove(gmail_tab);
        }, 1000)
      }
    }

    chrome.tabs.create({url: "https://google.com"}, function (tab) {
      gmail_tab = tab.id;
      verify_emails_recursive()
    });
  }

  return {
    done: function () {
      return done
    },
    start: start
  }
}

)
