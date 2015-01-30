/**
 * Created by matthew on 1/27/15.
 */
module.exports = function (app) {

    return {
        queue: {
            add: function (company) {
                var $queue = $('#queue');

                var $queueItems = $queue.find('.queue-item');

                var $queueItemTemplate = $queueItems.first().clone();
                var $lastQueueItem = $queueItems.last();

                $queueItemTemplate.find('#companyName').text(company.name);
                $lastQueueItem.after($queueItemTemplate.show());
            }
        },
        modal: {
            addToQueue: function (company, onSubmit) {
                // Populate the page with the company name and IDs
                $('#company-name').append(company.name);
                $('#company-IDs').append(company.IDs);
                $('#emailDomain').val(company.name.toLowerCase());
                var emailDomain =
                    '@' +
                    $('#emailDomain').val() +
                    $('#tld').val();

                var $modal = $('#addToQueue');
                $modal.modal('show');

                $modal.find('#submit').click(function () {
                    var emailDomain = $('#emailDomain').val();

                    if (emailDomain.length == 0) {
                        alert("Domain cannot be empty");
                    }
                    else {
                        $modal.modal('toggle');
                        onSubmit()
                    }
                })
            }
        }
    };

    function formatPositionFilter(title_filter) {
        var titles = title_filter.split(' ');
        var parsedString = '';
        for (var i = 0; i < titles.length; i++) {
            var currentTitle = titles[i];
            currentTitle = currentTitle.replace('.', '*');
            parsedString += currentTitle.toUpperCase();
            if ((i + 1) != titles.length) {
                parsedString += ' OR '
            }
        }
        return parsedString;
    }
};