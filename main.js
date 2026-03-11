async function loadPartial(selector, filePath) {
  const target = document.querySelector(selector);
  if (!target) return;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Kunne ikke laste ${filePath}`);
    }

    const html = await response.text();
    target.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function normalizePath(path) {
  if (!path || path === "/") return "index.html";
  return path.split("/").pop() || "index.html";
}

function setActiveNavLink() {
  const currentPage = normalizePath(window.location.pathname);
  const navLinks = document.querySelectorAll(".site-nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const baseHref = href.split("#")[0] || "index.html";

    const isIndexSectionLink =
      currentPage === "index.html" &&
      (href === "index.html#om" ||
        href === "index.html#foreldre" ||
        href === "index.html#kontakt");

    const isExactPageMatch = baseHref === currentPage;

    if (isIndexSectionLink || isExactPageMatch) {
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPartial("#site-navbar", "partials/navbar.html");
  await loadPartial("#site-footer", "partials/footer.html");
  setActiveNavLink();
});