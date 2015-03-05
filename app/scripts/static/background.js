
/**
Created by matthew on 2/12/15.
 */

(function() {
  var log;

  Array.prototype.move = function(from, to) {
    return this.splice(to, 0, this.splice(from, 1)[0]);
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
    results: {},
    debug: true
  };

  if (app.debug) {
    app.settings.scraper.limit = 8;
  }

  window.queue = [];

  window.settings = {};

  window.go = function() {
    var i, nextQueueItem, routine;
    i = 0;
    nextQueueItem = function() {
      app.currentCompany = queue[i++];
      app.currentCompany.emailFormatHits = [];
      if (app.currentCompany && app.currentCompany.companyName) {
        if (app.debug) {
          log("Queued " + app.currentCompany.companyName);
        }
        app.currentCompanyName = app.currentCompany.companyName.replace(/\s+/g, "").replace(/\./g, "").toLowerCase();
        if (!app.results[app.currentCompanyName]) {
          app.results[app.currentCompanyName] = [];
        }
        return async.series(routine);
      } else {
        alert("Scraping is done! You may now close gmail.");
        if (app.debug) {
          return log('scrape finished. Results:' + app.results);
        }
      }
    };
    routine = [scraper().start, getProfileData().start, getMissingNames().start, permuteEmails().start, validateEmails().start, guessEmails, nextQueueItem];
    return nextQueueItem();
  };


  /**
  Created by matthew on 2/13/15.
   */

  chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "openApp") {
      return chrome.tabs.create({
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
    return chrome.tabs.sendMessage(tabID, message, callback);
  };


  /**
  Created by matthew on 1/21/15.
   */

  window.getMissingNames = function() {
    var createSearchTab, currentPerson, exit, getName, masterCallback, personIndex, searchTab, start, status;
    masterCallback = void 0;
    searchTab = 0;
    personIndex = void 0;
    currentPerson = void 0;
    status = {
      done: false
    };
    start = function(cb) {
      var executeSeries, nextIteration, series;
      if (app.debug != null) {
        log('get missing names');
      }
      masterCallback = cb;
      personIndex = 0;
      currentPerson = true;
      nextIteration = function() {
        var debugMessage;
        currentPerson = app.results[app.currentCompanyName][personIndex++];
        if (status.done || !currentPerson) {
          debugMessage = status.done ? 'exiting because status is set to done' : 'exiting because current person is ' + currentPerson;
          if (app.debug != null) {
            log(debugMessage);
          }
          return exit();
        } else {
          if (currentPerson.name.isHidden || !currentPerson.name.last) {
            return executeSeries();
          } else {
            return nextIteration();
          }
        }
      };
      series = [createSearchTab, getName, nextIteration];
      executeSeries = function() {
        if (app.debug != null) {
          log('running program loop for ' + currentPerson.name.first);
        }
        return async.series(series);
      };
      return nextIteration();
    };
    createSearchTab = function(callback) {
      var searchText, tabUpdated, url;
      if (!(currentPerson || currentPerson.headline || currentPerson.pastPositions || currentPerson.education || currentPerson.currentCompany)) {
        return callback();
      } else {
        tabUpdated = function(tabID, info, tab) {
          if (searchTab === tabID && info.status === "complete") {
            chrome.tabs.onUpdated.removeListener(tabUpdated);
            return callback();
          }
        };
        searchText = "site:linkedin.com " + (currentPerson.name.first ? currentPerson.name.first + " " : "") + (currentPerson.name.last ? currentPerson.name.last + " " : "") + currentPerson.headline + " ";
        url = "http://google.com" + "#q=" + searchText;
        chrome.tabs.onUpdated.addListener(tabUpdated);
        return chrome.tabs.create({
          url: url
        }, function(tab) {
          return searchTab = tab.id;
        });
      }
    };
    getName = function(callback) {
      var handleResponse;
      handleResponse = function(name) {
        if (app.debug != null) {
          log('handling response from content script');
        }
        if (name && name.first && name.last) {
          currentPerson.name = name;
        } else {
          currentPerson.name.skipPermutation = true;
        }
        chrome.tabs.remove(searchTab);
        return callback();
      };
      if (app.debug != null) {
        log('asking content script for missing name');
      }
      return app.callTabAction(searchTab, "getName", handleResponse);
    };
    exit = function() {
      if (app.debug != null) {
        log('get missing names done. now exiting');
      }
      if (searchTab) {
        chrome.tabs.remove(searchTab);
      }
      return masterCallback();
    };
    return {
      start: start
    };
  };


  /**
  Created by matthew on 1/17/15.
   */

  window.getProfileData = function() {
    var createProfileScrapeTab, currentPerson, exit, masterCallback, personIndex, profileScrapeTab, retrieveProfileData, start, status;
    masterCallback = false;
    currentPerson = false;
    personIndex = false;
    profileScrapeTab = false;
    status = {};
    start = function(cb) {
      var nextIteration, series;
      if (app.debug != null) {
        log('getting profile data');
      }
      masterCallback = cb;
      personIndex = 0;
      currentPerson = true;
      nextIteration = function() {
        if (app.debug != null) {
          log('going to next person');
        }
        currentPerson = app.results[app.currentCompanyName][personIndex++];
        if (status.done || !currentPerson) {
          if (app.debug != null) {
            log('exiting because current person was nil');
          }
          return exit();
        } else {
          return async.series(series);
        }
      };
      series = [createProfileScrapeTab, retrieveProfileData, nextIteration];
      return nextIteration();
    };
    createProfileScrapeTab = function(callback) {
      if (app.debug != null) {
        log('creating profile view tab');
      }
      return chrome.tabs.create({
        url: currentPerson.profileLink
      }, function(tab) {
        var tabUpdated;
        tabUpdated = function(tabID, changeInfo, tab) {
          if (tabID === profileScrapeTab && changeInfo.status === "complete") {
            if (app.debug != null) {
              log('tab done loading. Callback after delay');
            }
            chrome.tabs.onUpdated.removeListener(tabUpdated);
            return setTimeout(callback, app.settings.delay);
          }
        };
        profileScrapeTab = tab.id;
        return chrome.tabs.onUpdated.addListener(tabUpdated);
      });
    };
    retrieveProfileData = function(callback) {
      var handleResponse;
      if (app.debug != null) {
        log('Asking content script for profile data');
      }
      handleResponse = function(response) {
        if (app.debug != null) {
          log('Response received from content script');
        }
        $.extend(currentPerson, response);
        return chrome.tabs.remove(profileScrapeTab, function() {
          log('Done with profile retrieval');
          return callback();
        });
      };
      return app.callTabAction(profileScrapeTab, "getBasicInfo", handleResponse);
    };
    exit = function() {
      return masterCallback();
    };
    return {
      start: start
    };
  };

  window.guessEmails = function() {
    return $.each(app.results[app.currentCompanyName], function(index, value) {
      var emailFormatHits, mostLikelyIndex, sorted;
      if (!value.email && value.name && value.name.first && value.name.last) {
        emailFormatHits = app.currentCompany.emailFormatHits;
        mostLikelyIndex = 0;
        if (emailFormatHits.length) {
          sorted = emailFormatHits ? emailFormatHits.sort(function(a, b) {
            return b.count - a.count;
          }) : void 0;
          mostLikelyIndex = sorted[0].id;
        }
        value.email = value.possibleEmails[mostLikelyIndex];
        return value.emailConfirmed = '';
      }
    });
  };


  /**
  Created by matthew on 12/15/14.
   */


  /**
  Created by matthew on 1/21/15.
   */

  window.permuteEmails = function() {
    var convertStringToAscii, masterCallback, permuteEmails, start;
    masterCallback = void 0;
    start = function(callback) {
      var done;
      if (app.debug != null) {
        log('permuting emails');
      }
      done = function() {
        if (app.debug != null) {
          log('done permuting emails');
        }
        return masterCallback();
      };
      masterCallback = callback;
      return async.series([permuteEmails, done]);
    };
    convertStringToAscii = function(email) {
      return email.replace(/ö/g, "o").replace(/ç/g, "c").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/é/g, "e");
    };
    permuteEmails = function(cb) {
      $.each(app.results, function(index, resultset) {
        return $.each(resultset, function(index, person) {
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
            return person.possibleEmails = [name.first + name.last, name.first + "." + name.last, initial.first + name.last, initial.first + "." + name.last, name.last + name.first, name.last + "." + name.first, name.first, name.last, initial.first + initial.last].map(function(emailAddress) {
              return convertStringToAscii(emailAddress + "@" + app.currentCompany.emailDomain);
            });
          }
        });
      });
      return cb();
    };
    return {
      start: start
    };
  };


  /**
  Created by matthew on 12/13/14.
   */

  window.scraper = function() {
    var create_scrapeTab, exit, getProfileLinks, isFinished, limit, masterCallback, running, scrapeTab, start, status;
    running = false;
    scrapeTab = 0;
    masterCallback = void 0;
    isFinished = false;
    status = {};
    limit = app.settings.scraper.limit;
    start = function(cb) {
      var nextIteration, series;
      running = true;
      masterCallback = cb;
      nextIteration = function() {
        if (status.done) {
          return exit();
        } else {
          return series.execute();
        }
      };
      series = {
        funcs: [getProfileLinks, nextIteration],
        execute: function() {
          return async.series(series['funcs']);
        }
      };
      return async.series([create_scrapeTab, series.execute]);
    };
    exit = function() {
      if (app.debug) {
        log('leaving scrape function');
      }
      if (scrapeTab) {
        return chrome.tabs.remove(scrapeTab, function() {
          scrapeTab = false;
          isFinished = true;
          return masterCallback();
        });
      }
    };
    create_scrapeTab = function(callback) {
      var onTabLoad, titleFilter, url;
      if (app.debug) {
        log('create scrape tab');
      }
      if (scrapeTab) {
        return callback();
      } else {
        titleFilter = app.currentCompany.titleFilter;
        url = "http://linkedin.com/" + "vsearch/p" + "?f_CC=" + app.currentCompany.companyID + (titleFilter ? "&title=" + titleFilter : "") + "&openAdvancedForm=true" + "&titleScope=C&locationType=I" + "&orig=MDYS";
        onTabLoad = function(tabId, info) {
          if (info.status === "complete" && tabId === scrapeTab) {
            chrome.tabs.onUpdated.removeListener(onTabLoad);
            return callback();
          }
        };
        return chrome.tabs.create({
          url: url
        }, function(tab) {
          scrapeTab = tab.id;
          return chrome.tabs.onUpdated.addListener(onTabLoad);
        });
      }
    };
    getProfileLinks = function(callback) {
      var processResults;
      processResults = function(response) {
        var pageChange;
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
          return callback();
        } else {
          if (!response.hasNextPage) {
            status.done = true;
            return callback();
          } else {
            pageChange = function(tabId, info, tab) {
              var url;
              url = tab.url;
              if ((url != null) && tabId === scrapeTab && info.status === "complete") {
                chrome.tabs.onUpdated.removeListener(pageChange);
                return setTimeout(callback, 2000);
              }
            };
            return chrome.tabs.update({
              url: "http://" + response.nextPage
            }, function(response) {
              return chrome.tabs.onUpdated.addListener(pageChange);
            });
          }
        }
      };
      return app.callTabAction(scrapeTab, "scrapeProfileList", processResults);
    };
    return {
      start: start
    };
  };


  /**
  Created by matthew on 1/22/15.
   */

  window.validateEmails = function() {
    var arrangeEmails, createGmailTab, currentCompany, currentPerson, exit, findCurrentPersonsEmail, gmailInitialLoad, gmailTab, masterCallback, personIndex, start;
    masterCallback = void 0;
    gmailTab = void 0;
    currentPerson = void 0;
    personIndex = void 0;
    gmailInitialLoad = true;
    currentCompany = false;
    start = function(cb) {
      var executeSeries, nextIteration, series;
      if (app.debug != null) {
        log('validating emails');
      }
      gmailInitialLoad = true;
      masterCallback = cb;
      personIndex = 0;
      currentCompany = app.currentCompany;
      nextIteration = function() {
        var debugMessage;
        currentPerson = app.results[app.currentCompanyName][personIndex++];
        if (status.done || !currentPerson) {
          debugMessage = status.done ? 'exiting because status.done' : 'exiting because currentPerson is ' + currentPerson;
          if (app.debug != null) {
            log(debugMessage);
          }
          return exit();
        } else {
          if (!currentPerson.name || currentPerson.name.skipPermutation) {
            if (app.debug != null) {
              log('skipping person');
            }
            return nextIteration();
          } else {
            if (app.debug != null) {
              log('continuing to next person');
            }
            return executeSeries();
          }
        }
      };
      series = [arrangeEmails, findCurrentPersonsEmail, nextIteration];
      executeSeries = function() {
        return async.series(series);
      };
      return async.series([createGmailTab, nextIteration]);
    };
    createGmailTab = function(callback) {
      if (gmailTab) {
        callback();
      }
      return chrome.tabs.create({
        url: "https://google.com"
      }, function(tab) {
        gmailTab = tab.id;
        return setTimeout(callback, 1000);
      });
    };
    arrangeEmails = function(callback) {
      var emailHits, possibleEmails, sorted;
      emailHits = currentCompany.emailFormatHits;
      possibleEmails = currentPerson.possibleEmails;
      if (emailHits.length) {
        sorted = emailHits.sort(function(a, b) {
          return b.count - a.count;
        });
        $.each(sorted, function(index, item) {
          return possibleEmails.move(item.id, 0);
        });
      }
      return callback();
    };
    findCurrentPersonsEmail = function(callback) {
      var composeNewEmail, email, i, nextIteration, series, tryNextVariation;
      email = void 0;
      i = 0;
      composeNewEmail = function(composeNewEmailCb) {
        var timeout, waitForLoad;
        timeout = (gmailInitialLoad ? 7000 : 800);
        if (app.debug != null) {
          log('composing new email' + timeout);
        }
        waitForLoad = function() {
          return setTimeout(composeNewEmailCb, timeout);
        };
        chrome.tabs.update(gmailTab, {
          url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"
        }, waitForLoad);
        return gmailInitialLoad = false;
      };
      tryNextVariation = function(nextVariationCb) {
        var processResponse;
        processResponse = function(response) {
          var hitFound;
          if (response && response.correct) {
            currentPerson.email = email;
            currentPerson.emailConfirmed = "yes";
            hitFound = false;
            $.each(app.currentCompany.emailFormatHits, function(index, item) {
              if (item.id === i - 1) {
                item.count += 1;
                return hitFound = true;
              }
            });
            if (!hitFound) {
              app.currentCompany.emailFormatHits.push({
                id: i - 1,
                count: 1
              });
            }
          }
          return nextVariationCb();
        };
        return app.callTabAction(gmailTab, "tryEmail", processResponse, {
          email: email,
          name: currentPerson.name
        });
      };
      nextIteration = function() {
        var possibleEmails;
        possibleEmails = currentPerson.possibleEmails;
        if (possibleEmails) {
          email = currentPerson.possibleEmails[i++];
          if (email && !currentPerson.email) {
            if (app.debug != null) {
              log('trying next possible email ' + currentPerson.email);
            }
            return async.series(series);
          } else {
            return callback();
          }
        } else {
          return callback();
        }
      };
      series = [composeNewEmail, tryNextVariation, nextIteration];
      return nextIteration();
    };
    exit = function() {
      return masterCallback();
    };
    return {
      start: start
    };
  };

}).call(this);
