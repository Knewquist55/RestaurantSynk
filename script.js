// Small progressive enhancement for the FAQ section, CTA priority, and Google Ads event hooks.
(function () {
  if (typeof document === "undefined") {
    return;
  }

  var ga4MeasurementId = "G-3B1LXME2PP";
  var calculatorUrl = "https://www.restaurantsynk.com/cost-calculator/";

  if (typeof window.gtag === "function") {
    window.gtag("config", ga4MeasurementId);
  }

  function trackEvent(name, params) {
    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", name, params || {});
  }

  function makeReviewCta(link) {
    if (!link) {
      return;
    }

    link.textContent = "Get Free POS Review";
    link.setAttribute("href", "#next-steps");
    link.removeAttribute("target");
    link.removeAttribute("rel");
  }

  function makeBookingCta(link) {
    if (!link) {
      return;
    }

    link.textContent = "Book a Consultation";
    link.setAttribute("href", "https://calendly.com/kitchen-restaurantsynk/30min");
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  }

  function createCalculatorLink(extraClasses) {
    var link = document.createElement("a");
    link.className = extraClasses;
    link.textContent = "Cost Calculator";
    link.setAttribute("href", calculatorUrl);
    link.setAttribute("aria-label", "Open the RestaurantSynk cost calculator");
    return link;
  }

  function addCalculatorLinks() {
    var topbarCta = document.querySelector(".topbar .btn-small");
    if (topbarCta && !document.querySelector(".topbar .calculator-link")) {
      var topbarLink = createCalculatorLink("btn btn-small btn-ghost calculator-link");
      topbarCta.insertAdjacentElement("afterend", topbarLink);
    }

    var heroActions = document.querySelector(".hero-actions");
    if (heroActions && !heroActions.querySelector(".calculator-link")) {
      var heroLink = createCalculatorLink("btn btn-ghost calculator-link");
      heroActions.appendChild(heroLink);
    }
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
    makeReviewCta(document.querySelector(".topbar .btn-small"));
    makeReviewCta(document.querySelector(".hero-actions .btn:not(.btn-ghost)"));
    makeBookingCta(document.querySelector(".hero-actions .btn-ghost"));
    addCalculatorLinks();

    var reviewLinks = document.querySelectorAll('a[href="#next-steps"]');

    for (var h = 0; h < reviewLinks.length; h++) {
      reviewLinks[h].addEventListener("click", function () {
        trackEvent("start_pos_review", {
          event_category: "lead",
          event_label: "cta_click"
        });
      });
    }

    var calculatorLinks = document.querySelectorAll('a[href="' + calculatorUrl + '"]');

    for (var c = 0; c < calculatorLinks.length; c++) {
      calculatorLinks[c].addEventListener("click", function () {
        trackEvent("open_cost_calculator", {
          event_category: "engagement",
          event_label: "calculator_click"
        });
      });
    }

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
