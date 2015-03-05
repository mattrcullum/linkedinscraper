
/**
Created by matthew on 2/12/15.
 */

(function() {
  var app, log, models, queue;

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

  app = {};

  $(document).ready(function() {
    var params, url;
    url = urlHelper();
    app.params = url.params;
    app.queue = queue;
    params = app.params;
    app.bp = chrome.extension.getBackgroundPage();
    app.ko = ko;
    app.viewModel = models.view();
    app.ko.applyBindings(app.viewModel);
    app.modals = {
      addToQueue: $("#addToQueue")
    };
    if (params["a"] === "addToQueue") {
      app.modals.addToQueue.modal("show");
    }
    return app.viewModel.delay.subscribe(function(delay) {
      return app.bp.app.settings.delay = delay;
    });
  });

  models = {
    view: function() {
      var companyIDsParam, companyParam, self;
      self = this;
      companyParam = app.params["company"];
      companyIDsParam = app.params["companyID"];
      this.delay = app.ko.observable(app.bp.app.settings.delay);
      this.queue = app.ko.observableArray(app.bp.queue);
      this.emailDomain = app.ko.observable(companyParam.toLowerCase() + ".com");
      this.companyName = app.ko.observable(companyParam);
      this.companyIDs = app.ko.observable(companyIDsParam);
      this.titleFilter = app.ko.observable(null);
      this.skipEmailRetrieval = app.ko.observable(false);
      this.addToQueue = app.queue.add;
      this.start = function() {
        return app.bp.go();
      };
      this.invokeCSVDownload = function() {
        return app.results().invokeCSVDownload();
      };
      this.reset = function() {
        var go;
        go = confirm("This will clear all results and reset the extension. Proceed?");
        if (go) {
          return chrome.runtime.reload();
        }
      };
      this.appendQueue = function(item) {
        return self.queue.push(item);
      };
      this.removeFromQueue = function(company) {
        return self.queue.remove(company);
      };
      return this;
    }
  };


  /**
  Created by matthew on 2/11/15.
   */

  queue = {
    add: function() {
      var company, duplicate;
      company = {
        emailDomain: app.viewModel.emailDomain(),
        companyName: app.viewModel.companyName(),
        companyID: app.viewModel.companyIDs(),
        titleFilter: app.viewModel.titleFilter(),
        skipEmails: app.viewModel.skipEmailRetrieval()
      };
      company.id = company.companyName + company.companyID;
      duplicate = false;
      $(app.bp.queue).each(function(index, item) {
        if (item.id === company.id) {
          alert("Company already in queue");
          return duplicate = true;
        }
      });
      if (duplicate) {
        return false;
      }
      app.viewModel.appendQueue(company);
      return app.modals.addToQueue.modal("hide");
    }
  };


  /**
  Created by matthew on 1/27/15.
   */

  app.results = function() {
    var invokeCSVDownload;
    invokeCSVDownload = function() {
      var companies, csv, name, pom;
      companies = app.bp.app.results;
      csv = "FirstName,LastName,Title,Company,Email,Email Confirmed,Profile URL\n";
      $.each(companies, function(index, company) {
        return $.each(company, function(index, person) {
          var dataString;
          dataString = [person.name.first || "", person.name.last || "", person.currentPosition || "", person.companyName, person.email || "", person.emailConfirmed, person.profileLink].map(function(item) {
            return "\"" + item + "\"";
          });
          dataString = dataString.join(",");
          return csv += dataString + "\n";
        });
      });
      name = "";
      $.each(companies, function(index, item) {
        return name += item[0].companyName;
      });
      pom = document.createElement("a");
      pom.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv));
      pom.setAttribute("download", name + "Employees.csv");
      return pom.click();
    };
    return {
      invokeCSVDownload: invokeCSVDownload
    };
  };

}).call(this);
