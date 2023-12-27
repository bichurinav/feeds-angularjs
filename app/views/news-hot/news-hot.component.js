"use strict";

angular.module("newsHotView", ["newsList"]).component("newsHotView", {
  templateUrl: "views/news-hot/news-hot.template.html",
  controller: [
    "$scope",
    "tabService",
    function ($scope, tabService) {
      $scope.title = tabService.currentTab.title || "Title";
    },
  ],
});
