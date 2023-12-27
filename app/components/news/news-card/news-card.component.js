"use strict";

angular.module("newsCard", []).component("newsCard", {
  templateUrl: "components/news/news-card/news-card.template.html",
  bindings: {
    data: "<",
  },
  controller: [
    "$scope",
    function ($scope) {
      $scope.getSrcImage = function (urlToImage) {
        if (urlToImage) {
          return urlToImage;
        }
        return "./img/image-placeholder.jpg";
      };

      this.$onInit = function () {
        $scope.card = this.data;
      };
    },
  ],
});
