"use strict";

angular.module("newsList", ["newsCard", "newsFilter"]).component("newsList", {
  templateUrl: "components/news/news-list/news-list.template.html",
  bindings: {
    filterMode: "@",
  },
  controller: [
    "$scope",
    "newsDataService",
    "tabService",
    "filterService",
    function ($scope, newsDataService, tabService, filterService) {
      $scope.total = 0;
      $scope.articles = [];
      $scope.filterMode = "";
      $scope.errorMessage = "";
      $scope.currentPage = newsDataService.currentPage;

      function getNews() {
        $scope.isLoading = true;

        var params = {
          page: newsDataService.currentPage,
        };

        if (tabService.currentTab.code === "top-headlines") {
          params.category = filterService.category;
          params.country = filterService.country;
        } else {
          params.q = filterService.q;
        }

        newsDataService.getNews(
          tabService.currentTab.code,
          function (res) {
            $scope.isLoading = false;

            if (res.status === "error") {
              $scope.errorMessage = res.message;
              $scope.articles = [];
              return;
            }

            $scope.errorMessage = "";
            $scope.total = res.data.totalResults;
            $scope.articles = res.data.articles;
          },
          params
        );
      }

      $scope.changePage = function (page) {
        newsDataService.currentPage = page;
        window.scrollTo(0, 0);
        getNews();
      };

      $scope.getNews = getNews;

      $scope.$on("$destroy", function () {
        filterService.clear();
        newsDataService.clear();
      });

      this.$onInit = function () {
        $scope.filterMode = this.filterMode;
        if (tabService.currentTab.code === "top-headlines") {
          getNews();
        }
      };
    },
  ],
});
