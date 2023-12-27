"use strict";

angular.module("newsFilter", []).component("newsFilter", {
  templateUrl: "components/news/news-filter/news-filter.template.html",
  bindings: {
    mode: "<",
    getNews: "<",
  },
  controller: [
    "$scope",
    "filterService",
    "newsDataService",
    function ($scope, filterService, newsDataService) {
      $scope.countryList = filterService.countryCodeList;
      $scope.categoryList = filterService.categoryList;
      $scope.fieldSearch = { value: "" };

      function isRepeatFilter(country, category, q) {
        if (
          $scope.mode === "default" &&
          filterService.country === country &&
          filterService.category === category
        ) {
          return true;
        }

        if ($scope.mode === "search" && filterService.q === q) return true;

        return false;
      }

      $scope.setFilter = function (event) {
        event.preventDefault();

        newsDataService.currentPage = 1;

        var country = "";
        var category = "";
        var search = $scope.fieldSearch.value;

        if ($scope.mode === "default") {
          country = event.target.elements["country"].value;
          category = event.target.elements["category"].value;
          if (isRepeatFilter(country, category, null)) {
            return;
          }
          filterService.country = country;
          filterService.category = category;
        } else {
          if (isRepeatFilter(null, null, search)) {
            return;
          }
          filterService.q = search;
          $scope.fieldSearch.value = "";
          if (filterService.q === "") {
            return;
          }
        }

        $scope.getNews();
      };

      this.$onInit = function () {
        $scope.mode = this.mode;
        $scope.getNews = this.getNews;
      };
    },
  ],
});
