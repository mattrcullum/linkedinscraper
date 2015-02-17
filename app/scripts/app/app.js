var app = {};

$(document).ready(function () {

    // array of url GET params
    app.params = urlHelper.params;

    var params = app.params;

    // background page
    app.bp = chrome.extension.getBackgroundPage(); // bp = background page

    // knockout
    app.ko = ko;

    // models
    app.viewModel = new app.models.view();
    app.ko.applyBindings(app.viewModel);

    app.modals = {addToQueue: $('#addToQueue')};

    if (params['a'] == "addToQueue") {
        app.modals.addToQueue.modal('show');
    }

    app.viewModel.delay.subscribe(function (delay) {
        app.bp.app.settings.delay = delay
    });

});






