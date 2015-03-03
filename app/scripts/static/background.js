
/**
Created by matthew on 2/12/15.
 */

(function() {
  var log;

  Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };


  /**
  Created by matthew on 2/13/15.
   */

  log = function(message) {
    console.log(message);
  };


  /**
  Created by matthew on 2/13/15.
   */

  String.prototype.hasChar = function(char) {
    return this.indexOf(char) !== -1;
  };


  /**
  Created by matthew on 2/11/15.
   */

  window.urlHelper = function() {
    var getSearchParameters, hostName, param, segments, transformToArray;
    segments = function() {
      return location.pathname.substr(1).split("/");
    };
    hostName = function() {
      return location.host.split(".")[1];
    };
    param = function(name, link) {
      var href, regex, results;
      href = link || location;
      regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      results = regex.exec(href.search);
      if (results === null) {
        return "";
      } else {
        return decodeURI(results[1]);
      }
    };
    getSearchParameters = function() {
      var parameterString;
      parameterString = window.location.search.substr(1);
      if ((parameterString != null) && parameterString !== "") {
        return transformToArray(parameterString);
      } else {
        return {};
      }
    };
    transformToArray = function(parameterString) {
      var i, parameterArray, params, tmparr;
      params = {};
      parameterArray = parameterString.split("&");
      i = 0;
      while (i < parameterArray.length) {
        tmparr = decodeURI(parameterArray[i]).split("=");
        params[tmparr[0]] = tmparr[1];
        i++;
      }
      return params;
    };
    return {
      params: getSearchParameters(),
      getParam: param,
      segments: segments(),
      hostName: hostName()
    };
  };

  window.app = {
    settings: {
      scraper: {
        limit: 1000000
      },
      delay: 500
    },
    currentCompany: "",
    currentCompanyName: "",
    results: {}
  };

  window.queue = [];

  window.settings = {};

  window.go = function() {
    var i, nextQueueItem, routine;
    nextQueueItem = function() {
      app.currentCompany = queue[i++];
      if (app.currentCompany && app.currentCompany.companyName) {
        log("starting scrape of" + app.currentCompany.companyName);
        app.currentCompanyName = app.currentCompany.companyName.replace(/\s+/g, "").replace(/\./g, "").toLowerCase();
        if (!app.results[app.currentCompanyName]) {
          app.results[app.currentCompanyName] = [];
        }
        return async.series(routine);
      } else {
        console.log(app.results);
        alert("Scraping is done! You may now close gmail.");
      }
    };
    console.table(queue);
    i = 0;
    routine = [scraper().start, getProfileData().start, getMissingNames().start, permuteEmails().start, validateEmails().start, nextQueueItem];
    return nextQueueItem();
  };


  /**
  Created by matthew on 2/13/15.
   */

  chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "openApp") {
      chrome.tabs.create({
        url: message.path
      });
    }
  });

  app.callTabAction = function(tabID, action, callback, args) {
    var message;
    if (!action) {
      console.error("actions not set");
      return false;
    }
    message = {
      to: "content",
      action: action,
      args: args
    };
    chrome.tabs.sendMessage(tabID, message, callback);
  };


  /**
  Created by matthew on 1/21/15.
   */

  window.getMissingNames = function() {
    var createSearchTab, currentPerson, exit, getName, masterCallback, personIndex, searchTab, start;
    start = function(cb) {
      var currentPerson, executeSeries, masterCallback, nextIteration, personIndex, series;
      nextIteration = function() {
        var currentPerson;
        currentPerson = app.results[app.currentCompanyName][personIndex++];
        if (status.done || !currentPerson) {
          exit();
        } else {
          if (currentPerson.name.isHidden || !currentPerson.name.last) {
            executeSeries();
          } else {
            nextIteration();
          }
        }
      };
      executeSeries = function() {
        async.series(series);
      };
      masterCallback = cb;
      personIndex = 0;
      currentPerson = true;
      series = [createSearchTab, getName, nextIteration];
      nextIteration();
    };
    createSearchTab = function(callback) {
      var searchText, tabUpdated, url;
      if (!(currentPerson || currentPerson.headline || currentPerson.pastPositions || currentPerson.education || currentPerson.currentCompany)) {
        callback();
        false;
      } else {
        tabUpdated = function(tabID, info, tab) {
          if (searchTab === tabID && info.status === "complete") {
            chrome.tabs.onUpdated.removeListener(tabUpdated);
            callback();
          }
        };
        searchText = "site:linkedin.com " + (currentPerson.name.first ? currentPerson.name.first + " " : "") + (currentPerson.name.last ? currentPerson.name.last + " " : "") + currentPerson.headline + " ";
        url = "http://google.com" + "#q=" + searchText;
        chrome.tabs.onUpdated.addListener(tabUpdated);
        chrome.tabs.create({
          url: url
        }, function(tab) {
          var searchTab;
          return searchTab = tab.id;
        });
      }
      return this;
    };
    getName = function(callback) {
      var handleResponse;
      handleResponse = function(name) {
        if (name && name.first && name.last) {
          currentPerson.name = name;
        } else {
          currentPerson.name.skipPermutation = true;
        }
        chrome.tabs.remove(searchTab);
        callback();
      };
      app.callTabAction(searchTab, "getName", handleResponse);
      return this;
    };
    exit = function() {
      if (searchTab) {
        chrome.tabs.remove(searchTab);
      }
      masterCallback();
    };
    masterCallback = void 0;
    searchTab = void 0;
    personIndex = void 0;
    currentPerson = void 0;
    return {
      start: start
    };
  };


  /**
  Created by matthew on 1/17/15.
   */

  window.getProfileData = function() {
    var createProfileScrapeTab, currentPerson, exit, masterCallback, personIndex, profileScrapeTab, retrieveProfileData, start;
    start = function(cb) {
      var currentPerson, executeSeries, masterCallback, nextIteration, personIndex, series;
      nextIteration = function() {
        var currentPerson;
        currentPerson = app.results[app.currentCompanyName][personIndex++];
        if (status.done || !currentPerson) {
          exit();
        } else {
          executeSeries();
        }
      };
      executeSeries = function() {
        async.series(series);
      };
      masterCallback = cb;
      personIndex = 0;
      currentPerson = true;
      series = [createProfileScrapeTab, retrieveProfileData, nextIteration];
      nextIteration();
    };
    createProfileScrapeTab = function(callback) {
      chrome.tabs.create({
        url: currentPerson.profileLink
      }, function(tab) {
        var profileScrapeTab, tabUpdated;
        tabUpdated = function(tabID, changeInfo, tab) {
          if (tabID === profileScrapeTab && changeInfo.status === "complete") {
            chrome.tabs.onUpdated.removeListener(tabUpdated);
            setTimeout(callback, app.settings.delay);
            log(app.settings.delay);
          }
        };
        profileScrapeTab = tab.id;
        chrome.tabs.onUpdated.addListener(tabUpdated);
      });
    };
    retrieveProfileData = function(callback) {
      var handleResponse;
      handleResponse = function(response) {
        $.extend(currentPerson, response);
        chrome.tabs.remove(profileScrapeTab);
        callback();
      };
      app.callTabAction(profileScrapeTab, "getBasicInfo", handleResponse);
      return this;
    };
    exit = function() {
      masterCallback();
    };
    masterCallback = void 0;
    currentPerson = void 0;
    personIndex = void 0;
    profileScrapeTab = void 0;
    return {
      start: start
    };
  };


  /**
  Created by matthew on 12/15/14.
   */


  /**
  Created by matthew on 1/21/15.
   */

  window.permuteEmails = function() {
    var masterCallback, permuteEmails, start;
    start = function(callback) {
      var done, masterCallback;
      done = function() {
        masterCallback();
      };
      masterCallback = callback;
      async.series([permuteEmails, done]);
    };
    permuteEmails = function(cb) {
      var convertStringToAscii;
      convertStringToAscii = function(email) {
        return email.replace(/ö/g, "o").replace(/ç/g, "c").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/é/g, "e");
      };
      $.each(app.results, function(index, resultset) {
        $.each(resultset, function(index, person) {
          var err, initial, name;
          person.emailConfirmed = "";
          name = person.name;
          if (name && !name.skipPermutation) {
            try {
              initial = {
                first: name.first[0],
                last: name.last[0]
              };
            } catch (_error) {
              err = _error;
              console.error(err);
            }
            person.possibleEmails = [name.first + name.last, name.first + "." + name.last, initial.first + name.last, initial.first + "." + name.last, name.last + name.first, name.last + "." + name.first, name.first, name.last, initial.first + initial.last].map(function(emailAddress) {
              return convertStringToAscii(emailAddress + "@" + app.currentCompany.emailDomain);
            });
          }
        });
      });
      cb();
      return this;
    };
    masterCallback = void 0;
    return {
      start: start
    };
  };


  /**
  Created by matthew on 12/13/14.
   */

  window.scraper = function() {
    var create_scrapeTab, exit, getProfileLinks, isFinished, limit, masterCallback, running, scrapeTab, start, status;
    start = function(cb) {
      var executeSeries, masterCallback, nextIteration, running, series;
      executeSeries = function() {
        async.series(series);
      };
      nextIteration = function() {
        if (status.done) {
          exit();
        } else {
          executeSeries();
        }
      };
      running = true;
      masterCallback = cb;
      series = [getProfileLinks, nextIteration];
      async.series([create_scrapeTab, executeSeries]);
    };
    exit = function() {
      var isFinished, scrapeTab;
      if (scrapeTab) {
        chrome.tabs.remove(scrapeTab);
      }
      scrapeTab = false;
      isFinished = true;
      masterCallback();
    };
    create_scrapeTab = function(callback) {
      var onTabLoad, titleFilter, url;
      onTabLoad = function(tabId, info) {
        if (info.status === "complete" && tabId === scrapeTab) {
          chrome.tabs.onUpdated.removeListener(onTabLoad);
          callback();
        }
      };
      if (scrapeTab) {
        callback();
        return;
      }
      titleFilter = app.currentCompany.titleFilter;
      url = "http://linkedin.com/" + "vsearch/p" + "?f_CC=" + app.currentCompany.companyID + (titleFilter ? "&title=" + titleFilter : "") + "&openAdvancedForm=true" + "&titleScope=C&locationType=I" + "&orig=MDYS";
      chrome.tabs.create({
        url: url
      }, function(tab) {
        var scrapeTab;
        scrapeTab = tab.id;
        chrome.tabs.onUpdated.addListener(onTabLoad);
      });
    };
    getProfileLinks = function(callback) {
      var processResults;
      processResults = function(response) {
        if (!response || response.error) {
          console.error(chrome.runtime.lastError);
          console.error("Response for processLinkBatch is:" + response.error);
          return false;
        }
        if (response.linkList.length !== 0) {
          $(response.linkList).each(function(index, item) {
            item.companyName = app.currentCompany.companyName;
          });
          app.results[app.currentCompanyName] = app.results[app.currentCompanyName].concat(response.linkList);
        }
        if (app.results[app.currentCompanyName].length >= limit) {
          status.done = true;
          callback();
          return false;
        }
        if (!response.hasNextPage) {
          status.done = true;
          callback();
          false;
        } else {
          chrome.tabs.update({
            url: "http://" + response.nextPage
          }, function() {
            var pageChange;
            pageChange = function(tabId, info, tab) {
              var url;
              url = tab.url;
              if ((url != null) && tabId === scrapeTab && info.status === "complete") {
                chrome.tabs.onUpdated.removeListener(pageChange);
                setTimeout((function(callback) {
                  callback();
                }), 2000, callback);
              }
            };
            chrome.tabs.onUpdated.addListener(pageChange);
          });
        }
      };
      app.callTabAction(scrapeTab, "scrapeProfileList", processResults);
      return this;
    };
    running = false;
    scrapeTab = 0;
    masterCallback = void 0;
    isFinished = false;
    status = {};
    limit = app.settings.scraper.limit;
    return {
      start: start
    };
  };


  /**
  Created by matthew on 1/22/15.
   */

  window.validateEmails = function() {
    var arrangeEmails, createGmailTab, currentPerson, exit, findCurrentPersonsEmail, gmailInitialLoad, gmailTab, masterCallback, personIndex, start, successfulEmailFormats;
    start = function(cb) {
      var executeSeries, gmailInitialLoad, masterCallback, nextIteration, personIndex, series, successfulEmailFormats;
      executeSeries = function() {
        async.series(series);
      };
      nextIteration = function() {
        var currentPerson;
        currentPerson = app.results[app.currentCompanyName][personIndex++];
        if (!currentPerson.name || currentPerson.name.skipPermutation) {
          nextIteration();
        } else {
          log(currentPerson);
          if (status.done || !currentPerson) {
            exit();
          } else {
            executeSeries();
          }
        }
      };
      gmailInitialLoad = true;
      masterCallback = cb;
      personIndex = 0;
      successfulEmailFormats = [];
      series = [arrangeEmails, findCurrentPersonsEmail, nextIteration];
      async.series([createGmailTab, nextIteration]);
    };
    createGmailTab = function(callback) {
      if (gmailTab) {
        callback();
        return false;
      }
      chrome.tabs.create({
        url: "https://google.com"
      }, function(tab) {
        var gmailTab;
        gmailTab = tab.id;
        setTimeout(callback, 1000);
      });
    };
    arrangeEmails = function(callback) {
      var possibleEmails;
      possibleEmails = currentPerson.possibleEmails;
      if (possibleEmails) {
        if (successfulEmailFormats.length) {
          $.each(successfulEmailFormats.reverse(), function(index, item) {
            possibleEmails.move(item, 0);
          });
        }
      }
      callback();
    };
    findCurrentPersonsEmail = function(callback) {
      var composeNewEmail, email, i, nextIteration, series, tryNextVariation;
      composeNewEmail = function(composeNewEmailCb) {
        var gmailInitialLoad, timeout, waitForLoad;
        waitForLoad = function() {
          console.log("callback in 5s");
          setTimeout(composeNewEmailCb, timeout);
        };
        timeout = (gmailInitialLoad ? 7000 : 800);
        console.log("compose email");
        chrome.tabs.update(gmailTab, {
          url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"
        }, waitForLoad);
        gmailInitialLoad = false;
      };
      tryNextVariation = function(nextVariationCb) {
        var processResponse;
        processResponse = function(response) {
          if (response && response.correct) {
            currentPerson.email = email;
            if (successfulEmailFormats.indexOf(i) === -1) {
              successfulEmailFormats.push(i - 1);
            }
          }
          nextVariationCb();
        };
        app.callTabAction(gmailTab, "tryEmail", processResponse, {
          email: email,
          name: currentPerson.name
        });
      };
      nextIteration = function() {
        var email, possibleEmails;
        possibleEmails = currentPerson.possibleEmails;
        if (possibleEmails) {
          email = currentPerson.possibleEmails[i++];
          if (email && !currentPerson.email) {
            async.series(series);
          } else {
            if (!currentPerson.email) {
              currentPerson.email = possibleEmails[successfulEmailFormats[0] || 0];
              currentPerson.emailConfirmed = "";
            } else {
              currentPerson.emailConfirmed = "yes";
            }
            callback();
          }
        } else {
          callback();
        }
      };
      i = 0;
      email = void 0;
      series = [composeNewEmail, tryNextVariation, nextIteration];
      nextIteration();
      return this;
    };
    exit = function() {
      masterCallback();
    };
    masterCallback = void 0;
    gmailTab = void 0;
    currentPerson = void 0;
    personIndex = void 0;
    successfulEmailFormats = void 0;
    gmailInitialLoad = void 0;
    return {
      start: start
    };
  };

}).call(this);
