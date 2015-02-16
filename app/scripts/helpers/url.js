/**
 * Created by matthew on 2/11/15.
 */
var urlHelper = function () {

    function segments() {
        return location.pathname.substr(1).split('/')
    }

    function hostName() {
        return location.host.split('.')[1];
    }

    function param(name, link) {
        var href = link || location;
        // name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(href.search);
        return results === null ? "" : decodeURI(results[1]);
    }

    function getSearchParameters() {
        var parameterString = window.location.search.substr(1);
        return parameterString != null && parameterString != "" ? transformToArray(parameterString) : {};
    }

    function transformToArray(parameterString) {
        var params = {};
        var parameterArray = parameterString.split("&");
        for (var i = 0; i < parameterArray.length; i++) {
            var tmparr = decodeURI(parameterArray[i]).split("=");
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    }

    return {
        params: getSearchParameters(),
        getParam: param,
        segments: segments(),
        hostName: hostName()
    }
}();