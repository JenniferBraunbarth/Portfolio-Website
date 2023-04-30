"use strict";

// dsvgo / impressum MODAL
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

const processDsvgo = (data) => {
  dsvgoContent = data;
  dsvgoEl();
};
const processImpressum = (data) => {
  impressumContent = data;
  impressumEl();
};

const loadData = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.addEventListener("load", () => {
    if (xhr.status == 200) callback(xhr.responseText);
    else console.log(xhr.statusText);
  });
  xhr.send();
};

// loadData("./impressum.txt", processImpressum);
// loadData("./dsvgo.txt", processDsvgo);

// all links open in new window
const links = document.querySelectorAll(".target_blank");
for (const link of links) {
  link.setAttribute("target", "_blank");
}
