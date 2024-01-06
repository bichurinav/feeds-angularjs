var feedApp = angular.module("feedApp");

feedApp.service("storageService", function () {
  this.filters = getData("filters") || {
    category: "general",
    country: "",
    q: "",
  };

  function getData(key) {
    var storageData = localStorage.getItem(key);
    if (!storageData) return null;
    return JSON.parse(storageData);
  }

  this.setData = function (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  };

  this.removeData = function (key) {
    localStorage.setItem(key, null);
  };

  this.getData = getData;
});
