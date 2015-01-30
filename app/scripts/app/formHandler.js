/**
 * Created by matthew on 1/27/15.
 */
module.exports = function(){

    return {
    formatPositionFilter: function (title_filter) {
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
    }
};
