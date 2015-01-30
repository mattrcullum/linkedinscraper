/**
 * Created by matthew on 1/27/15.
 */
/**
 * Created by matthew on 1/27/15.
 */

        $contents = $('#content');


    function eventListeners() {
        $('#download').click(downloadResults);

        $scrapeBtn.click(function () {
            var $self = $(this);

            // if the button hasn't been clicked yet
            if ($self.hasClass('btn-primary')) {
                if (submitScrapeForm()) {
                    $self.text('Cancel Scrape');
                    $self.removeClass('btn-primary').addClass('btn-danger').blur();
                }
            }

            // the button has been clicked, which means it's now a cancel scrape button
            else {
                chrome.runtime.reload()
            }
        });
    }


    eventListeners();

