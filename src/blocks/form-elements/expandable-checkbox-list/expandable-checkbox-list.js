export function expandableCheckboxList() {
   let header = document.querySelector(".expandable-checkbox-list__header");
   header.addEventListener("click", toggleExpand);
   let list = document.querySelector(".expandable-checkbox-list__buttons-container");
   list.style.visibility = "hidden";
   list.style.height = "0px";

   let arrow = document.getElementById("expandCheckbox");

   function toggleExpand() {
      if (list.style.visibility == "visible") {
         list.style.visibility = "hidden";
         list.style.height = "0px";
         arrow.style.transform = "rotate(0)";
      } else {
         list.style.visibility = "visible"
         list.style.height = "max-content";
         arrow.style.transform = "rotate(180deg)";
      }
   }
}