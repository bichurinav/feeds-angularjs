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
      $scope.fields = {
        country: "",
        category: "general",
        search: "",
      };

      $scope.filterService = filterService;

      $scope.setFilter = function (event) {
        event.preventDefault();

        newsDataService.currentPage = 1;

        filterService.filters.country = $scope.fields.country;
        filterService.filters.category = $scope.fields.category;
        filterService.filters.q = $scope.fields.search;

        if ($scope.mode === "search") {
          $scope.fields.search = "";
        }

        if ($scope.mode === "search" && filterService.filters.q === "") {
          return;
        }

        filterService.isDisabledFilter = true;

        $scope.getNews();
      };

      this.$onInit = function () {
        $scope.mode = this.mode;
        $scope.getNews = this.getNews;
      };
    },
  ],
});
