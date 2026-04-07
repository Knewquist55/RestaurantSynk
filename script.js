// Small progressive enhancement for the FAQ section and button analytics hooks.
(function () {
  if (typeof document === "undefined") {
    return;
  }

  var details = document.querySelectorAll("details");

  for (var i = 0; i < details.length; i++) {
    details[i].addEventListener("toggle", (function (detail) {
      return function () {
        if (!detail.open) {
          return;
        }

        for (var j = 0; j < details.length; j++) {
          var other = details[j];
          if (other !== detail) {
            other.open = false;
          }
        }
      };
    })(details[i]));
  }
})();
