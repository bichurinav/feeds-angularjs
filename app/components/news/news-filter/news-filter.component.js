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
    "storageService",
    function ($scope, filterService, newsDataService, storageService) {
      $scope.fields = Object.assign({}, filterService.filters);

      $scope.filterService = filterService;

      $scope.setFilter = function (event) {
        event.preventDefault();

        newsDataService.currentPage = 1;

        filterService.filters.country = $scope.fields.country;
        filterService.filters.category = $scope.fields.category;
        filterService.filters.q = $scope.fields.q;

        if ($scope.mode === "search") {
          $scope.fields.q = "";
        }

        if ($scope.mode === "search" && filterService.filters.q === "") {
          return;
        }

        filterService.isDisabledFilter = true;

        storageService.setData("filters", filterService.filters);
        $scope.getNews();
      };

      this.$onInit = function () {
        $scope.mode = this.mode;
        $scope.getNews = this.getNews;
      };
    },
  ],
});
