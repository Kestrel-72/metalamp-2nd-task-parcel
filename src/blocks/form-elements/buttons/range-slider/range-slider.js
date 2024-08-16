export function rangeSlider() {
   window.onload = function () {
      slideOne();
      slideTwo();
   };

   let sliderOne = document.getElementById("slider-1");
   let sliderTwo = document.getElementById("slider-2");
   let displayValOne = document.querySelector(".range-slider__value-1");
   let displayValTwo = document.querySelector(".range-slider__value-2");
   let minGap = 1000;
   let sliderTrack = document.querySelector(".range-slider__track");
   let sliderMaxValue = document.getElementById("slider-1").max;

   sliderOne.addEventListener("input", slideOne);
   sliderTwo.addEventListener("input", slideTwo);

   function slideOne() {
      if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = parseInt(sliderTwo.value) - minGap;
      }
      displayValOne.textContent = sliderOne.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₽ ";
      fillColor();
   }
   function slideTwo() {
      if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = parseInt(sliderOne.value) + minGap;
      }
      displayValTwo.textContent = sliderTwo.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₽ ";
      fillColor();
   }
   function fillColor() {
      percent1 = (sliderOne.value / sliderMaxValue) * 100;
      percent2 = (sliderTwo.value / sliderMaxValue) * 100;
      sliderTrack.style.background = 
      `linear-gradient(
         to right, 
         rgba(255, 255, 255, 1) ${percent1}% , 
         rgba(0, 0, 0, 0) ${percent1}% , 
         rgba(0, 0, 0, 0) ${percent2}%, 
         rgba(255, 255, 255, 1) ${percent2}%
      ) padding-box,
      linear-gradient(
         to bottom,
         #6FCF97,
         #66D2EA
      ) padding-box,
      linear-gradient(
         to right, 
         #1F204140 0%,
         #1F204140 ${percent1}%,
         rgba(0, 0, 0, 0) ${percent1}%,
         rgba(0, 0, 0, 0) ${percent2}%,
         #1F204140 ${percent2}%,   
         #1F204140 100%
      ) border-box
      `;
   }
 
}