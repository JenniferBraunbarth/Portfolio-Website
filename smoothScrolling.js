export const initSmoothScrolling = () => {
const handleClick = (e) => {
    e.preventDefault();
    let targetSection = document.querySelector(e.target.getAttribute("href"));
    targetSection.scrollIntoView({ behavior: "smooth" });
  };
  
  const btnScrollTo = document.querySelectorAll(".btn_scroll_to");
  btnScrollTo.forEach((btn) => btn.addEventListener("click", handleClick));
}