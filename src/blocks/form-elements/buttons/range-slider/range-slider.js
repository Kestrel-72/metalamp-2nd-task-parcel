export function rangeSlider() {
   $(".js-range-slider").ionRangeSlider({
      type: "double",
      min: 0,
      max: 15000,
      from: 5000,
      to: 10000,
      grid: false,
      step: 1000,
      min_interval: 1000,
      skin: "round",
      hide_min_max: true,
      postfix: "₽",

  });
}