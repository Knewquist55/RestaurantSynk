// Small progressive enhancement for the FAQ section and Google Ads event hooks.
(function () {
  if (typeof document === "undefined") {
    return;
  }

  var ga4MeasurementId = "G-3B1LXME2PP";

  if (typeof window.gtag === "function") {
    window.gtag("config", ga4MeasurementId);
  }

  function trackEvent(name, params) {
    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", name, params || {});
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

  document.addEventListener("DOMContentLoaded", function () {
    var appointmentLinks = document.querySelectorAll('a[href*="calendly.com/kitchen-restaurantsynk/30min"]');

    for (var k = 0; k < appointmentLinks.length; k++) {
      appointmentLinks[k].addEventListener("click", function () {
        trackEvent("book_appointment", {
          event_category: "lead",
          event_label: "calendly_click"
        });
      });
    }

    var leadForms = document.querySelectorAll('form[name="pos-stack-review"]');

    for (var l = 0; l < leadForms.length; l++) {
      leadForms[l].addEventListener("submit", function () {
        trackEvent("generate_lead", {
          event_category: "lead",
          event_label: "pos_stack_review_form"
        });
      });
    }

    if (document.body && document.body.getAttribute("data-conversion-page") === "thank-you") {
      trackEvent("generate_lead", {
        event_category: "lead",
        event_label: "thank_you_page"
      });
    }
  });
})();
