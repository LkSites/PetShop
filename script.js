/*
  PERSONALIZAÇÃO RÁPIDA:
  1. Troque o nome da loja e textos "PetViva" em index.html.
  2. Altere WHATSAPP para o número do cliente com código do país e DDD.
     Exemplo: 5555991234567 (55 Brasil + 55 DDD + número).
  3. Atualize endereço, horário, fotos e serviços reais antes de publicar.
*/
const PETSHOP_CONFIG = {
  name: "PetViva",
  whatsapp: "5555999999999", // TROCAR pelo WhatsApp real da loja
  address: "Santa Rosa — RS", // TROCAR pelo endereço real
  hours: "Segunda a sábado, consulte os horários", // TROCAR pelo horário real
  phoneDisplay: "(55) 99999-9999" // TROCAR pelo telefone real
};

document.title = `${PETSHOP_CONFIG.name} | Cuidado e carinho para seu pet`;

document.querySelectorAll('[data-config="address"]').forEach(el => el.textContent = PETSHOP_CONFIG.address);
document.querySelectorAll('[data-config="hours"]').forEach(el => el.textContent = PETSHOP_CONFIG.hours);
document.querySelectorAll('[data-config="phoneDisplay"]').forEach(el => el.textContent = PETSHOP_CONFIG.phoneDisplay);
document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

function whatsappUrl(message = "Olá! Gostaria de saber mais sobre os serviços e produtos.") {
  const number = PETSHOP_CONFIG.whatsapp.replace(/\D/g, "");
  if (!number || number === "5555999999999") {
    showToast("Configure o WhatsApp real da loja no arquivo js/script.js antes de publicar.");
    document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
    return null;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

document.getElementById("whatsapp-float").addEventListener("click", event => {
  event.preventDefault();
  const url = whatsappUrl();
  if (url) window.open(url, "_blank", "noopener,noreferrer");
});

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("service-select");
    const requested = link.dataset.service;
    const match = [...select.options].find(option => option.text.toLowerCase() === requested.toLowerCase());
    if (match) select.value = match.value;
    else if (/rações|alimentação|petiscos/i.test(requested)) select.value = "Rações e petiscos";
    else if (/brinquedos/i.test(requested)) select.value = "Brinquedos e acessórios";
    else if (/higiene/i.test(requested)) select.value = "Produtos de higiene e cuidado";
    else if (/banho/i.test(requested)) select.value = "Banho e tosa";
    else select.value = "Outra dúvida";
  });
});

document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const pet = String(form.get("pet") || "").trim();
  const service = String(form.get("service") || "").trim();
  const message = String(form.get("message") || "").trim();
  const text = [
    `Olá! Meu nome é ${name}.`,
    pet ? `Meu pet se chama ${pet}.` : "",
    `Gostaria de informações sobre: ${service}.`,
    message ? `Mensagem: ${message}` : "",
    "Vim pelo site."
  ].filter(Boolean).join("\n");
  const url = whatsappUrl(text);
  if (url) window.open(url, "_blank", "noopener,noreferrer");
});

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
}
