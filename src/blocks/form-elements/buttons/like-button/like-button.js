export function likeButton() {
   let likeButtons = document.querySelectorAll(".like-button");

   likeButtons.forEach(button => {
      button.addEventListener("click", () => 
         toggleButton(button))
   })

   function toggleButton(button) {
      button.classList.toggle("like-button_active");
      button.classList.toggle("like-button_inactive");
   }
}