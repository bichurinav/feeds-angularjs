var feedApp = angular.module("feedApp");

feedApp.service("tabService", function () {
  this.TAB_HOT_NEWS = '"Горячие" новости';
  this.TAB_ALL_NEWS = "Все новости";

  this.tabs = [
    {
      code: "top-headlines",
      title: this.TAB_HOT_NEWS,
      path: "/",
    },
    {
      code: "everything",
      title: this.TAB_ALL_NEWS,
      path: "/news-all",
    },
  ];

  this.currentTab = this.tabs[0];

  this.setTab = function (tab) {
    this.currentTab = tab;
  };
});
