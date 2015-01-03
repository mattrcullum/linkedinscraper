var helper = {
  url: {
    get_path_segments: function (location) {
      return location.pathname.substr(1).split('/')
    },
    get_host_title: function (location) {
      return location.host.split('.')[1];
    }
  },
  getParameterByName: function (name, href) {
    // name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(href.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}