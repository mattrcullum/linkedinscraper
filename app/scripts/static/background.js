
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
    results: {
      "apple": [
        {
          "name": {
            "first": "John",
            "last": "Wallace"
          },
          "profileLink": "https://www.linkedin.com/profile/view?id=1457210",
          "headline": "Senior SW Engineering Recruiter at Apple        iOS Apps & Frameworks",
          "location": "San Francisco Bay Area",
          "industry": "Internet",
          "companyName": "Apple",
          "currentPosition": "Senior Engineering Recruiter - App & Framework Developers for iOS, WebKit, Safari, iPhone & iPad",
          "pastPositions": ["Yahoo! Inc.", "Sony Computer Entertainment", "ONI Systems Inc. purchased by Ciena Corp. in 2003"],
          "education": ["Menlo College"],
          "emailConfirmed": "",
          "possibleEmails": ["JohnWallace@apple.com", "John.Wallace@apple.com", "JWallace@apple.com", "J.Wallace@apple.com", "WallaceJohn@apple.com", "Wallace.John@apple.com", "John@apple.com", "Wallace@apple.com", "JW@apple.com"]
        }, {
          "name": {
            "first": "Jacob",
            "last": "Conway"
          },
          "profileLink": "https://www.linkedin.com/profile/view?id=1644330",
          "headline": "Technical Sourcing Recruiter - Wireless Software at Apple",
          "location": "Greater San Diego Area",
          "industry": "Staffing and Recruiting",
          "companyName": "Apple",
          "currentPosition": "Technical Sourcing Recruiter - Wireless Software",
          "pastPositions": ["Novatel Wireless", "TalentWar.net, Inc.", "Networked Recruiter"],
          "education": ["Augustana College (SD)"],
          "emailConfirmed": "",
          "possibleEmails": ["JacobConway@apple.com", "Jacob.Conway@apple.com", "JConway@apple.com", "J.Conway@apple.com", "ConwayJacob@apple.com", "Conway.Jacob@apple.com", "Jacob@apple.com", "Conway@apple.com", "JC@apple.com"]
        }, {
          "name": {
            "first": "Bill",
            "last": "Dudney"
          },
          "profileLink": "https://www.linkedin.com/profile/view?id=480284",
          "headline": "Writer of Code at Apple",
          "location": "San Francisco Bay Area",
          "industry": "Computer Software",
          "companyName": "Apple",
          "currentPosition": "UIKit Engineer",
          "pastPositions": ["Apple Inc.", "Dudney.Net", "Virtuas Solutions"],
          "education": ["Texas A&M University"],
          "emailConfirmed": "",
          "possibleEmails": ["BillDudney@apple.com", "Bill.Dudney@apple.com", "BDudney@apple.com", "B.Dudney@apple.com", "DudneyBill@apple.com", "Dudney.Bill@apple.com", "Bill@apple.com", "Dudney@apple.com", "BD@apple.com"]
        }, {
          "name": {
            "first": "Brian",
            "last": "Temple"
          },
          "profileLink": "https://www.linkedin.com/profile/view?id=2674208",
          "headline": "Building software people love",
          "location": "Greater Denver Area",
          "industry": "Computer Software",
          "companyName": "Apple",
          "currentPosition": "iOS Engineer",
          "pastPositions": ["Photobucket", "Wayin", "University of Colorado"],
          "education": ["University of Colorado Boulder"],
          "emailConfirmed": "",
          "possibleEmails": ["BrianTemple@apple.com", "Brian.Temple@apple.com", "BTemple@apple.com", "B.Temple@apple.com", "TempleBrian@apple.com", "Temple.Brian@apple.com", "Brian@apple.com", "Temple@apple.com", "BT@apple.com"]
        }, {
          "name": {
            "first": "Corey",
            "last": "Carson"
          },
          "profileLink": "https://www.linkedin.com/profile/view?id=9816373",
          "headline": "Systems Engineering Manager at Apple",
          "location": "Greater Denver Area",
          "industry": "Information Technology and Services",
          "companyName": "Apple",
          "currentPosition": "Systems Engineering Manager",
          "pastPositions": ["Holcomb's Education Resource", "Maize USD 266"],
          "education": ["Pittsburg State University"],
          "emailConfirmed": "",
          "possibleEmails": ["CoreyCarson@apple.com", "Corey.Carson@apple.com", "CCarson@apple.com", "C.Carson@apple.com", "CarsonCorey@apple.com", "Carson.Corey@apple.com", "Corey@apple.com", "Carson@apple.com", "CC@apple.com"]
        }, {
          "name": {
            "first": "Samantha",
            "last": "Kish"
          },
          "profileLink": "https://www.linkedin.com/profile/view?id=10254966",
          "headline": "Global Supply Manager - Channel Procurement at Apple",
          "location": "San Francisco Bay Area",
          "industry": "Consumer Electronics",
          "companyName": "Apple",
          "currentPosition": "Global Supply Manager - Channel Procurement",
          "pastPositions": ["Apple", "Johns Manville", "Honeywell"],
          "education": ["University of Colorado at Denver"],
          "emailConfirmed": "",
          "possibleEmails": ["SamanthaKish@apple.com", "Samantha.Kish@apple.com", "SKish@apple.com", "S.Kish@apple.com", "KishSamantha@apple.com", "Kish.Samantha@apple.com", "Samantha@apple.com", "Kish@apple.com", "SK@apple.com"]
        }, {
          "name": {
            "first": "Dimitri",
            "last": "Geier"
          },
          "profileLink": "https://www.linkedin.com/profile/view?id=12063296",
          "headline": "Dimitri Geier is a Senior Software Engineer at Apple",
          "location": "San Francisco Bay Area",
          "industry": "Telecommunications",
          "companyName": "Apple",
          "currentPosition": "Senior Software Engineer",
          "pastPositions": ["Motorola", "Nextive Solutions", "Warner Music Group"],
          "education": ["Universität zu Köln"],
          "emailConfirmed": "",
          "possibleEmails": ["DimitriGeier@apple.com", "Dimitri.Geier@apple.com", "DGeier@apple.com", "D.Geier@apple.com", "GeierDimitri@apple.com", "Geier.Dimitri@apple.com", "Dimitri@apple.com", "Geier@apple.com", "DG@apple.com"]
        }, {
          "name": {
            "first": "Matthew",
            "last": "Gaddis"
          },
          "profileLink": "https://www.linkedin.com/profile/view?id=12213953",
          "headline": "UI Engineering Manager at Apple",
          "location": "San Francisco Bay Area",
          "industry": "Internet",
          "companyName": "Apple",
          "currentPosition": "UI Engineering Manager",
          "pastPositions": ["Scout Labs", "PlayCoed", "Self"],
          "education": ["University of Colorado Boulder"],
          "emailConfirmed": "",
          "possibleEmails": ["MatthewGaddis@apple.com", "Matthew.Gaddis@apple.com", "MGaddis@apple.com", "M.Gaddis@apple.com", "GaddisMatthew@apple.com", "Gaddis.Matthew@apple.com", "Matthew@apple.com", "Gaddis@apple.com", "MG@apple.com"]
        }, {
          "name": {
            "first": "Tri",
            "last": "Vuong"
          },
          "profileLink": "https://www.linkedin.com/profile/view?id=14068282",
          "headline": "Software Engineer at Apple",
          "location": "San Francisco Bay Area",
          "industry": "Computer Software",
          "companyName": "Apple",
          "currentPosition": "Software Engineer",
          "pastPositions": ["Twitter", "YP", "Better The World"],
          "education": ["University of Toronto"],
          "emailConfirmed": "",
          "possibleEmails": ["TriVuong@apple.com", "Tri.Vuong@apple.com", "TVuong@apple.com", "T.Vuong@apple.com", "VuongTri@apple.com", "Vuong.Tri@apple.com", "Tri@apple.com", "Vuong@apple.com", "TV@apple.com"]
        }, {
          "name": {
            "first": "Craig",
            "last": "Bartels"
          },
          "profileLink": "https://www.linkedin.com/profile/view?id=15174289",
          "headline": "Information Security at Apple",
          "location": "London, United Kingdom",
          "industry": "Information Technology and Services",
          "companyName": "Apple",
          "currentPosition": "Information Security",
          "pastPositions": ["Apple", "Honeywell", "IBM"],
          "education": ["University of Oxford"],
          "emailConfirmed": "",
          "possibleEmails": ["CraigBartels@apple.com", "Craig.Bartels@apple.com", "CBartels@apple.com", "C.Bartels@apple.com", "BartelsCraig@apple.com", "Bartels.Craig@apple.com", "Craig@apple.com", "Bartels@apple.com", "CB@apple.com"]
        }
      ]
    },
    debug: true
  };

  if (app.debug) {
    app.settings.scraper.limit = 8;
  }

  window.queue = [
    {
      "emailDomain": "apple.com",
      "companyName": "Apple",
      "companyID": "162479",
      "titleFilter": null,
      "skipEmails": false,
      "id": "Apple162479"
    }
  ];

  window.settings = {};

  window.go = function() {
    var i, nextQueueItem, routine;
    i = 0;
    routine = [validateEmails().start, nextQueueItem];
    nextQueueItem = function() {
      app.currentCompany = queue[i++];
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
        console.log(app.results);
        alert("Scraping is done! You may now close gmail.");
        if (app.debug) {
          return log('Scrape finished');
        }
      }
    };
    nextQueueItem();
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
    var arrangeEmails, createGmailTab, currentPerson, exit, findCurrentPersonsEmail, gmailInitialLoad, gmailTab, masterCallback, personIndex, start, successfulEmailFormats;
    masterCallback = void 0;
    gmailTab = void 0;
    currentPerson = void 0;
    personIndex = void 0;
    successfulEmailFormats = void 0;
    gmailInitialLoad = true;
    start = function(cb) {
      var executeSeries, nextIteration, series;
      if (app.debug != null) {
        log('validating emails');
      }
      gmailInitialLoad = true;
      masterCallback = cb;
      personIndex = 0;
      successfulEmailFormats = [];
      nextIteration = function() {
        var debugMessage;
        currentPerson = app.results[app.currentCompanyName][personIndex++];
        if (!currentPerson.name || currentPerson.name.skipPermutation) {
          if (app.debug != null) {
            log('skipping person');
          }
          return nextIteration();
        } else {
          if (status.done || !currentPerson) {
            debugMessage = status.done ? 'exiting because status.done' : 'exiting because currentPerson is ' + currentPerson;
            if (app.debug != null) {
              log(debugMessage);
            }
            return exit();
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
      var possibleEmails;
      possibleEmails = currentPerson.possibleEmails;
      if (possibleEmails && successfulEmailFormats.length) {
        $.each(successfulEmailFormats.reverse(), function(index, item) {
          return possibleEmails.move(item, 0);
        });
      }
      return callback();
    };
    findCurrentPersonsEmail = function(callback) {
      var composeNewEmail, email, i, nextIteration, series, timeout, tryNextVariation;
      timeout = (gmailInitialLoad ? 7000 : 800);
      email = void 0;
      i = 0;
      composeNewEmail = function(composeNewEmailCb) {
        var waitForLoad;
        if (app.debug != null) {
          log('composing new email');
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
          if (response && response.correct) {
            currentPerson.email = email;
            if (successfulEmailFormats.indexOf(i) === -1) {
              successfulEmailFormats.push(i - 1);
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
            return async.series(series);
          } else {
            if (!currentPerson.email) {
              currentPerson.email = possibleEmails[successfulEmailFormats[0] || 0];
              currentPerson.emailConfirmed = "";
            } else {
              currentPerson.emailConfirmed = "yes";
            }
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
