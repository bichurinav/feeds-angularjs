"use strict";

angular.module("tabs", ["ngRoute"]).component("tabs", {
  templateUrl: "components/ui/tabs/tabs.template.html",
  controller: [
    "$scope",
    "tabService",
    function ($scope, tabService) {
      $scope.$on("$routeChangeStart", tabService.setTab.bind(tabService));

      this.$onInit = tabService.setTab.bind(tabService);

      $scope.tabs = tabService.tabs;

      $scope.activeClass = function (tab) {
        if (tabService.currentTab.path === tab.path) {
          return "active disabled";
        }
        return null;
      };
    },
  ],
});
