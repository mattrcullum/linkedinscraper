/**
 * Created by matthew on 2/11/15.
 */
app.queue = function () {
    function add() {
        var company = {
            emailDomain: app.viewModel.emailDomain(),
            companyName: app.viewModel.companyName(),
            companyID: app.viewModel.companyIDs(),
            titleFilter: app.viewModel.titleFilter(),
            skipEmails: app.viewModel.skipEmailRetrieval()
        };
        company.id = company.companyName + company.companyID;

        var duplicate = false;

        $(app.bp.queue).each(function (index, item) {
            if (item.id == company.id) {
                alert('Company already in queue');
                duplicate = true;
                return false
            }
        });

        if (duplicate) {
            return false;
        }

        app.viewModel.appendQueue(company);
        app.modals.addToQueue.modal('hide');
    }

    function remove(company) {
    }

    return {
        add: add,
        remove: remove
    }
}();