var feedApp = angular.module("feedApp");

feedApp.service("tabService", function ($location) {
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

  this.setTab = function () {
    var currentPath = $location.path();
    var currentTab = null;

    if (currentPath === this.currentTab.path) return;

    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].path === currentPath) {
        currentTab = this.tabs[i];
      }
    }

    if (currentTab) {
      this.currentTab = currentTab;
    }
  };
});
