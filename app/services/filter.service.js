var feedApp = angular.module("feedApp");

feedApp.service("filterService", function () {
  this.filters = {
    category: "general",
    country: "",
    q: "",
  };

  this.isDisabledFilter = true;

  this.countryCodeList = [
    "ru",
    "ac",
    "ae",
    "am",
    "ar",
    "as",
    "at",
    "au",
    "be",
    "bg",
    "br",
    "ca",
    "ch",
    "cn",
    "co",
    "cu",
    "cz",
    "de",
    "di",
    "ea",
    "eb",
    "ee",
    "eg",
    "ei",
    "es",
    "ez",
    "fr",
    "gb",
    "gf",
    "gn",
    "gr",
    "gs",
    "hc",
    "hk",
    "hp",
    "ht",
    "hu",
    "id",
    "ie",
    "il",
    "in",
    "is",
    "it",
    "jp",
    "kh",
    "kr",
    "kt",
    "li",
    "ln",
    "lp",
    "lt",
    "lv",
    "ma",
    "mx",
    "my",
    "nc",
    "ng",
    "ni",
    "nl",
    "no",
    "nz",
    "oc",
    "on",
    "or",
    "ph",
    "pk",
    "pl",
    "pt",
    "ra",
    "rc",
    "rg",
    "rh",
    "rl",
    "ro",
    "rs",
    "rt",
    "sa",
    "se",
    "sg",
    "si",
    "sk",
    "sr",
    "sv",
    "ta",
    "th",
    "tj",
    "tl",
    "tr",
    "tw",
    "ua",
    "ub",
    "uc",
    "ui",
    "us",
    "ve",
    "vm",
    "wu",
    "xm",
    "yn",
    "za",
    "zd",
    "zp",
  ];

  this.categoryList = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  this.isRepeatFilter = function (value, filterName) {
    return value === this.filters[filterName];
  };

  this.setStatusFilter = function (values, names) {
    if (!this.filters.hasOwnProperty(names[0])) {
      throw new Error(
        "[FilterService] Данного фильтра не существует " + names[0]
      );
    }

    if (values.length !== names.length) {
      throw new Error(
        "[FilterService] Неправильно передано кол-во параметров: [values] [names]"
      );
    }

    var countRepeats = 0;

    for (var i = 0; i < names.length; i++) {
      if (this.isRepeatFilter(values[i], names[i])) {
        countRepeats++;
      }
    }

    if (names[0] === "q") {
      this.isDisabledFilter =
        countRepeats === values.length || values[0] === "";
      return;
    }

    this.isDisabledFilter = countRepeats === values.length;
  };

  this.clear = function () {
    this.isDisabledFilter = true;
    var filters = Object.keys(this.filters);
    for (var i = 0; i < filters.length; i++) {
      if (filters[i] === "category") {
        this.filters[filters[i]] = "general";
        return;
      }
      this.filters[filters[i]] = "";
    }
  };
});
