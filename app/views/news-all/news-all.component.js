"use strict";

angular.module("newsAllView", ["newsList"]).component("newsAllView", {
  templateUrl: "views/news-all/news-all.template.html",
  controller: [
    "$scope",
    "tabService",
    function ($scope, tabService) {
      $scope.title = tabService.currentTab.title || "Title";
    },
  ],
});
