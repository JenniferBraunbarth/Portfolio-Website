"use strict";

// ----- sticky navigation -----
const header = document.querySelector("#home");
const nav = document.querySelector(".topnav");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// ----- smooth scrolling -----
const handleClick = (e) => {
  e.preventDefault();
  let targetSection = document.querySelector(e.target.getAttribute("href"));
  targetSection.scrollIntoView({ behavior: "smooth" });
};

const btnScrollTo = document.querySelectorAll(".btn_scroll_to");
btnScrollTo.forEach((btn) => btn.addEventListener("click", handleClick));

// ----- project Cards -----
let projectHTMLContent;
const projectContainer = document.querySelector(".projects");

const projectDisplay = (projects) => {
  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("card");
    projectContainer.append(projectCard);

    projectHTMLContent = `
      <figure>
        <img src="${project.image}" alt="${project.alt}">
      </figure>
      <section>
        <h3>${project.title}</h3>
        <a href="${project.codeLink}" target="_blank"><i class="fa-solid fa-code"></i> Code</a> |
        <a href="${project.demoLink}" target="_blank"><i class="fa-solid fa-laptop"></i> Demo</a>
        <p>${project.description}</p>
      </section>
    `;

    projectCard.insertAdjacentHTML("beforeend", projectHTMLContent);
  });
};

// ----- dsvgo / impressum MODAL -----
let dsvgoContent;
let dsvgoModal;
let impressumContent;
let impressumModal;

const closeModalBtn = document.querySelector(".close");
const closeModal = () => {
  modalWindow.style.display = "none";
  impressumModal.remove();
  dsvgoModal.remove();
};
closeModalBtn.addEventListener("click", closeModal);

const modalWindow = document.querySelector(".modal");

const dsvgoEl = () => {
  dsvgoModal = document.createElement("p");
  dsvgoModal.innerHTML = dsvgoContent;
  modalWindow.style.display = "block";
  modalWindow.append(dsvgoModal);
};
const dsvgo = document.querySelector(".dsvgo");
dsvgo.addEventListener("click", dsvgoEl);

const impressumEl = () => {
  impressumModal = document.createElement("p");
  impressumModal.innerHTML = impressumContent;
  modalWindow.style.display = "block";
  modalWindow.append(impressumModal);
};
const impressum = document.querySelector(".impressum");
impressum.addEventListener("click", impressumEl);

// ----- load Data txt/JSON -----
const processDsvgo = (data) => {
  dsvgoContent = data;
};
const processImpressum = (data) => {
  impressumContent = data;
};

const processProjects = (data) => {
  projectHTMLContent = data;
  projectDisplay(projectHTMLContent);
};

const loadData = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
      const contentType = xhr.getResponseHeader("Content-Type");
      if (contentType.includes("application/json")) {
        callback(JSON.parse(xhr.responseText));
      } else {
        callback(xhr.responseText);
      }
    } else {
      console.log(xhr.statusText);
    }
  });
  xhr.send();
};

loadData("./projects.json", processProjects);
loadData("./dsvgo.txt", processDsvgo);
loadData("./impressum.txt", processImpressum);
