
/**
Created by matthew on 2/12/15.
 */

(function() {
  var add_scrape_button, first_path_segment, host_title, log, messageReceived, path_segments;

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

  messageReceived = function(message, sender, sendResponse) {
    var google, linkedin, results, time, waitForSearchResults;
    if (message.to !== "content") {
      return;
    }
    linkedin = window.linkedin();
    google = window.google();
    switch (message.action) {
      case "scrapeProfileList":
        results = linkedin.scrapeProfileList();
        sendResponse(results);
        break;
      case "nextPage":
        results = linkedin.pagination().nextPage();
        sendResponse(results);
        break;
      case "getBasicInfo":
        results = linkedin.scrapeProfileView();
        sendResponse(results);
        break;
      case "getName":
        time = {
          total: 0,
          interval: 50,
          out: 5000
        };
        waitForSearchResults = setInterval(function(callback, time) {
          var $results, hasResults;
          time.total += time.interval;
          $results = $("#rso");
          hasResults = $results.find("li").length;
          if (hasResults) {
            setTimeout((function(callback) {
              debugger;
              callback(google.getName());
            }), 350, callback);
            clearInterval(waitForSearchResults);
          } else if ($results.length) {
            clearInterval(waitForSearchResults);
            callback(false);
          }
          console.log(time.total);
        }, time.interval, sendResponse, time);
        break;
      case "tryEmail":
        google.tryEmail(message.args, sendResponse);
    }
    return true;
  };

  chrome.runtime.onMessage.addListener(messageReceived);


  /**
  Created by matthew on 1/21/15.
   */

  window.google = function() {
    var getName, isGmailReady, tryEmail;
    getName = function() {
      var $results, name;
      $results = $(".g:lt(3)");
      name = {};
      $.each($results, function(index, item) {
        var fName, fullName, lName, title;
        title = $(item).find("h3").text();
        if (" ".hasChar(title, "|")) {
          fullName = title.split("|")[0].trim().split(" ");
          fName = fullName[0];
          lName = fullName[1];
          name = {
            first: fName,
            last: lName,
            full: fullName
          };
          return false;
        }
      });
      return name || false;
    };
    isGmailReady = function() {};
    tryEmail = function(message, callback) {
      var $emailInput, email;
      console.log(message, callback);
      email = message.email.replace(" ", "");
      $emailInput = $("textarea").first();
      $emailInput.focus();
      $emailInput.text(email);
      $emailInput.blur();
      setTimeout((function(callback) {
        var waitForRapportive;
        waitForRapportive = setInterval(function(callback) {
          var $discardDraftBtn, $name, $rapportive, isLoadingResults, rapportiveSidebarExists, waitForDraftDiscard;
          rapportiveSidebarExists = function() {
            return $rapportive.length !== 0;
          };
          isLoadingResults = function() {
            return $rapportive.has(".wip-spinner").length || $rapportive.find(".links li a:contains(\"Looking up...\")").length;
          };
          $rapportive = $("#rapportive-sidebar");
          if (rapportiveSidebarExists() && !isLoadingResults()) {
            clearInterval(waitForRapportive);
            $name = $rapportive.find("h1.name").first().text().trim().toLowerCase();
            $discardDraftBtn = $("[data-tooltip=\"Discard draft\"]");
            $discardDraftBtn.click();
            waitForDraftDiscard = setInterval(function(callback) {
              var $hasSendButton;
              $hasSendButton = $("div[role=\"button\"]:contains(\"Send\")").length;
              if (!$hasSendButton) {
                clearInterval(waitForDraftDiscard);
                if ($name) {
                  callback({
                    correct: true
                  });
                  console.log("found email");
                } else {
                  console.log("wrong");
                  callback({
                    correct: false
                  });
                }
              }
            }, 100, callback);
          }
        }, 100, callback);
      }), 1500, callback);
    };
    return {
      getName: getName,
      isGmailReady: isGmailReady,
      tryEmail: tryEmail
    };
  };


  /**
  Created by matthew on 1/11/15.
   */

  window.linkedin = function() {
    var pagination, scrapeProfileList, scrapeProfileView;
    scrapeProfileList = function() {
      var $peopleDiv, error, results;
      results = [];
      error = null;
      $peopleDiv = $("#results .mod.result.people");
      $.each($peopleDiv, function(index, person) {
        var $nameLink, $person, fullName, headline, industry, location, name, profileLink;
        $person = $(person);
        $nameLink = $person.find(".bd h3 a.title");
        profileLink = $nameLink.attr("href").replace(/&authType(.*)/, "");
        headline = $person.find(".description").text();
        location = $person.find(".demographic bdi").text();
        industry = $person.find(".demographic dd:last-child").text();
        fullName = $nameLink.text().trim();
        name = {};
        if (fullName === "LinkedIn Member") {
          name.isHidden = true;
        } else if (fullName.hasChar(".")) {
          name.first = fullName.split(" ")[0];
        } else {
          fullName = fullName.split(" ");
          name.first = fullName[0];
          if (fullName.length > 2) {
            name.last = fullName[2];
          } else {
            name.first = fullName[0];
            name.last = fullName[1];
          }
        }
        person = {
          name: name,
          profileLink: profileLink,
          headline: headline,
          location: location,
          industry: industry
        };
        results.push(person);
      });
      if (results.length === 0) {
        error = "People container doesn't exist";
      }
      return {
        linkList: results,
        hasNextPage: pagination().hasNextPage(),
        nextPage: pagination().nextPage(),
        error: error
      };
    };
    scrapeProfileView = function() {
      var currentPosition, education, pastPositions;
      currentPosition = $(".current-position a[name=title]").first().text();
      pastPositions = $("#overview-summary-past td ol li a").map(function() {
        return $.trim($(this).text());
      }).get();
      education = $("#overview-summary-education td ol li a").map(function() {
        return $.trim($(this).text());
      }).get();
      return {
        currentPosition: currentPosition,
        pastPositions: pastPositions,
        education: education
      };
    };
    pagination = function() {
      var hasNextPage, nextPage;
      nextPage = function() {
        var $nextPaginationBtn;
        $nextPaginationBtn = $("#results-pagination .next a");
        return location.hostname + $nextPaginationBtn.attr("href");
      };
      hasNextPage = function() {
        return $("#results-pagination .next a").length;
      };
      return {
        nextPage: nextPage,
        hasNextPage: hasNextPage
      };
    };
    return {
      scrapeProfileList: scrapeProfileList,
      scrapeProfileView: scrapeProfileView,
      pagination: pagination
    };
  };


  /**
  Created by matthew on 12/12/14.
   */

  add_scrape_button = function() {
    var $follow_button, $scrape_btn, $scrape_btn_container, companyIDs, companyName, link_containing_company_IDs;
    link_containing_company_IDs = $(".how-connected .stats li .density")[0];
    companyIDs = urlHelper.getParam("f_CC", link_containing_company_IDs);
    companyName = $("span[itemprop=\"name\"]").text();
    $follow_button = $(".follow-content .not-hidden");
    $scrape_btn_container = $("<div></div>").css("display", "inline");
    $scrape_btn = $("<a></a>").addClass("").attr("id", "scrape").html("Scrape").css({
      background: "#27ae60",
      color: "white",
      fontWeight: "bold",
      fontSize: "12px",
      border: "solid 1px #34495e",
      padding: "2px 13px",
      cursor: "pointer",
      borderRadius: "3px",
      textDecoration: "none",
      lineHeight: "16px",
      height: "31px",
      marginLeft: "10px"
    });
    $scrape_btn.click(function() {
      var path;
      path = "/index.html" + "?a=addToQueue" + "&company=" + companyName + "&companyID=" + companyIDs + "&a=addToQueue";
      chrome.runtime.sendMessage({
        to: "background",
        action: "openApp",
        path: path
      });
    });
    $scrape_btn_container.html($scrape_btn);
    $scrape_btn_container.insertAfter($follow_button);
  };

  path_segments = urlHelper().segments;

  first_path_segment = path_segments[0] || null;

  host_title = urlHelper().hostName.toLowerCase();

  if (host_title === "linkedin" && first_path_segment === "company") {
    add_scrape_button();
  }

}).call(this);
