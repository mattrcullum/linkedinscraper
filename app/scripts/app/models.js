/**
 * Created by matthew on 2/11/15.
 */
app.models = function () {
    function view() {
        var self = this;
        self.queue = app.ko.observableArray(app.bp.queue);

        self.removeFromQueue = function (company) {
            self.queue.remove(company)
        };
        self.start = function () {
            app.bp.go()
        };
        self.invokeCSVDownload = function () {
            app.results.invokeCSVDownload()
        };
        self.reset = function () {
            var go = confirm("This will clear all results and reset the extension. Proceed?");
            if (go) {
                chrome.runtime.reload();
            }
        };
        var companyParam = app.params['company'];
        var companyIDsParam = app.params['companyID'];

        self.emailDomain = app.ko.observable(companyParam.toLowerCase());
        self.companyName = app.ko.observable(companyParam);
        self.companyIDs = app.ko.observable(companyIDsParam);
        self.titleFilter = app.ko.observable(null);
        self.skipEmailRetrieval = app.ko.observable(false);

        self.addToQueue = app.queue.add;

        self.appendQueue = function (item) {
            self.queue.push(item);
        }
    }

    return {
        view: view
    }
}();