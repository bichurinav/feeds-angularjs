"use strict";

angular.module("tabs", ["ngRoute"]).component("tabs", {
  templateUrl: "components/ui/tabs/tabs.template.html",
  controller: [
    "$location",
    "$scope",
    "tabService",
    function ($location, $scope, tabService) {
      function updateTab() {
        var currentPath = $location.path();

        if (currentPath === tabService.currentTab.path) return;

        var currentTab = $scope.tabs.find((tab) => tab.path === currentPath);

        if (currentTab) {
          tabService.setTab(currentTab);
        }
      }

      $scope.$on("$routeChangeStart", updateTab);

      this.$onInit = updateTab;

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
