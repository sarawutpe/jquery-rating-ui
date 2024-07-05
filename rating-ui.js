/*!
 * jQuery RatingUI v1.0.0
 * Released under MIT license
 */

class RatingUI {
  constructor(element, options) {
    // Default options
    this.ratingNumber = 0;
    this.settings = $.extend({ inputName: "" }, options);
    this.$element = $(element);
    if (!this.$element.length) {
      throw new Error("Element not found.");
    }
    this.$star;
    this.drawStarIcon();
    this.initialize();
  }

  drawStarIcon() {
    // Generate star HTML
    const starHtml = Array.from(
      { length: 5 },
      (_, index) => `
      <li class="star" data-index="${index + 1}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      </li>`
    ).join("");
    // Append the star HTML to the rating-ui container
    this.$element.append(`<ul class='rating-ui'>${starHtml}</ul>`);
    // Set store val star
    this.$star = this.$element.find(".rating-ui li.star");
    if (!this.$star.length) {
      throw new Error("Element not found.");
    }
  }

  initialize() {
    const $input = $("input[name=" + this.settings.inputName + "]");
    const inputValue = parseInt($input.val());

    // Store reference to this
    const self = this;

    // Set default stars
    if (inputValue >= 1 && inputValue <= 5) {
      this.ratingNumber = $input.val();
      this.renderStar();
    }

    this.$star.on("mouseenter", function () {
      self.resetStar();
      $(this).prevAll().addBack().addClass("active");
    });

    this.$star.on("mouseleave", function () {
      $(this).siblings().addBack().removeClass("active");
      self.renderStar();
    });

    this.$star.on("click", function () {
      self.ratingNumber = parseInt($(this).data("index"));
      if ($input.length) {
        $input.val(self.ratingNumber);
      }
    });
  }

  renderStar() {
    this.$star.each((index, star) => {
      if (index < this.ratingNumber) {
        $(star).addClass("active");
      }
    });
  }

  resetStar() {
    this.$star.removeClass("active");
  }
}

(function ($) {
  $.fn.RatingUI = function (options) {
    return this.each(function () {
      new RatingUI(this, options);
    });
  };
})(jQuery);
