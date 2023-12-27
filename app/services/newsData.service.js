var feedApp = angular.module("feedApp");

feedApp.service("newsDataService", function ($http) {
  this.apiUrl = "https://newsapi.org/v2/";
  this.apiKey = "f6f69b54526740e288474cbff0a73641";
  this.pageSize = 5;
  this.currentPage = 1;

  this.getNews = function (code, callback, params = {}) {
    var params = params;
    params.apiKey = this.apiKey;
    params.pageSize = this.pageSize;

    if (!code) {
      throw new Error("[newsDataService] Добавьте code из таба");
    }

    function success(res) {
      callback({ status: "success", data: res.data });
    }

    function error(res) {
      callback({ status: "error", message: res.data.message });
    }

    $http({ method: "GET", url: this.apiUrl + code, params }).then(
      success,
      error
    );
  };

  this.clear = function () {
    this.currentPage = 1;
  };
});
