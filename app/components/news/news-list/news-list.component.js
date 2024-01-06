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
    "storageService",
    function (
      $scope,
      newsDataService,
      tabService,
      filterService,
      storageService
    ) {
      $scope.filterMode = "";
      $scope.errorMessage = "";
      $scope.newsData = newsDataService;

      function getNews() {
        var params = {
          page: newsDataService.currentPage,
        };

        if (tabService.currentTab.code === "top-headlines") {
          params.category = filterService.filters.category;
          params.country = filterService.filters.country;
        } else {
          params.q = filterService.filters.q;
          if (!params.q) return;
        }

        $scope.isLoading = true;

        newsDataService.getNews(
          tabService.currentTab.code,
          function (res) {
            $scope.isLoading = false;

            if (res.status === "error") {
              $scope.errorMessage = res.message;
              return;
            }

            $scope.errorMessage = "";
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
        var storageFilters = storageService.getData("filters");
        if (storageFilters) {
          filterService.filters = storageFilters;
        }
        getNews();
      };
    },
  ],
});
