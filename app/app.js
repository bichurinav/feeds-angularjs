var feedApp = angular.module("feedApp", [
  "ngRoute",
  "ui.bootstrap",
  "tabs",
  "newsHotView",
  "newsAllView",
]);

feedApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      template: "<news-hot-view></news-hot-view>",
    })
    .when("/news-all", {
      template: "<news-all-view></news-all-view>",
    })
    .otherwise("/");
});
