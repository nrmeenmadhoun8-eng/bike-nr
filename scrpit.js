(function () {
  const menuBtn = document.getElementById("menuToggle");
  const menu = document.getElementById("mainMenu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      menu.classList.toggle("show");
      menuBtn.classList.toggle("active");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 767) menu.classList.remove("show");
      });
    });
  }

  const seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.16 });

  document.querySelectorAll(".move-up, .move-left, .move-right, .fade-item, .best-card, .cat-card, .info-card, .post-card, .service-card, .team-card, .faq-box, .product-card").forEach(function (el) {
    seen.observe(el);
  });

  const slides = [
    { name: "Antonio Benz", job: "Bike designer", image: "image/1.png" },
    { name: "Sarah Lisgun", job: "Bike rider", image: "image/3.png" },
    { name: "Mark Henry", job: "Repair expert", image: "image/4.png" }
  ];
  let slide = 0;
  const img = document.getElementById("personImg");
  const nameEl = document.getElementById("personName");
  const jobEl = document.getElementById("personJob");
  const textEl = document.getElementById("personText");
  const rowEl = document.querySelector(".person-row");
  function showSlide(step) {
    if (!img || !nameEl || !jobEl || !textEl || !rowEl) return;
    slide = (slide + step + slides.length) % slides.length;
    rowEl.classList.add("talk-out");
    textEl.classList.add("talk-out");
    setTimeout(function () {
      img.src = slides[slide].image;
      nameEl.textContent = slides[slide].name;
      jobEl.textContent = slides[slide].job;
      rowEl.classList.remove("talk-out");
      textEl.classList.remove("talk-out");
      rowEl.classList.add("talk-in");
      textEl.classList.add("talk-in");
      setTimeout(function () {
        rowEl.classList.remove("talk-in");
        textEl.classList.remove("talk-in");
      }, 320);
    }, 220);
  }
  const next = document.getElementById("talkNext");
  const prev = document.getElementById("talkPrev");
  if (next) next.addEventListener("click", function () { showSlide(1); });
  if (prev) prev.addEventListener("click", function () { showSlide(-1); });

  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const kind = btn.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      document.querySelectorAll(".product-card").forEach(function (card) {
        card.style.display = kind === "all" || card.dataset.kind === kind ? "block" : "none";
      });
    });
  });

  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const item = btn.closest(".faq-box");
      if (!item) return;

      item.classList.toggle("open");
      const icon = btn.querySelector("i");
      if (icon) {
        icon.className = item.classList.contains("open") ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down";
      }
    });
  });

  document.querySelectorAll(".best-btn, .cart-btn").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      let toast = document.querySelector(".cart-toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.className = "cart-toast";
        document.body.appendChild(toast);
      }
      toast.textContent = "Product has been added to your cart.";
      toast.classList.add("show");
      setTimeout(function () { toast.classList.remove("show"); }, 1800);
    });
  });
})();

// Contact form
const contactForm = document.getElementById("contactForm");
const contactAlert = document.getElementById("contactAlert");

if (contactForm) {
  const fields = contactForm.querySelectorAll("input, textarea, select");

  fields.forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.value.trim() !== "") {
        field.classList.add("is-filled");
      } else {
        field.classList.remove("is-filled");
      }
      field.classList.remove("is-error");
      if (contactAlert) contactAlert.classList.remove("show");
    });
  });

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isOk = true;

    fields.forEach(function (field) {
      if (field.hasAttribute("required") && field.value.trim() === "") {
        field.classList.add("is-error");
        isOk = false;
      }
    });

    if (!isOk) {
      if (contactAlert) contactAlert.classList.add("show");
      return;
    }

    if (contactAlert) {
      contactAlert.textContent = "Your message has been sent successfully.";
      contactAlert.classList.add("show");
    }
    contactForm.reset();
    fields.forEach(function (field) {
      field.classList.remove("is-filled");
    });
  });
}


// Shop page
const shopGrid = document.getElementById("shopGrid");
const shopTabs = document.querySelectorAll(".shop-tab");
const viewBtns = document.querySelectorAll(".view-btn");
const sortProducts = document.getElementById("sortProducts");

shopTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    const kind = tab.dataset.kind;

    shopTabs.forEach(function (item) {
      item.classList.remove("active");
    });
    tab.classList.add("active");

    document.querySelectorAll(".shop-card").forEach(function (card) {
      card.style.display = kind === "all" || card.dataset.kind === kind ? "block" : "none";
    });
  });
});

viewBtns.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    viewBtns.forEach(function (item) {
      item.classList.remove("active");
    });
    btn.classList.add("active");

    if (shopGrid) {
      const columns = index === 0 ? 2 : index === 1 ? 3 : 4;
      shopGrid.style.gridTemplateColumns = "repeat(" + columns + ", 1fr)";
    }
  });
});

if (sortProducts && shopGrid) {
  sortProducts.addEventListener("change", function () {
    const cards = Array.from(shopGrid.querySelectorAll(".shop-card"));
    const value = sortProducts.value;

    if (value === "Price low to high") {
      cards.sort(function (a, b) { return Number(a.dataset.price) - Number(b.dataset.price); });
    }

    if (value === "Price high to low") {
      cards.sort(function (a, b) { return Number(b.dataset.price) - Number(a.dataset.price); });
    }

    if (value === "Alphabetically, A-Z") {
      cards.sort(function (a, b) { return a.dataset.name.localeCompare(b.dataset.name); });
    }

    if (value === "Alphabetically, Z-A") {
      cards.sort(function (a, b) { return b.dataset.name.localeCompare(a.dataset.name); });
    }

    cards.forEach(function (card) {
      shopGrid.appendChild(card);
    });
  });
}

// Blog page
const blogSearch = document.querySelector(".blog-search");
const blogInput = document.getElementById("blogSearch");

if (blogSearch && blogInput) {
  blogSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    const word = blogInput.value.toLowerCase();

    document.querySelectorAll(".blog-item").forEach(function (item) {
      const title = item.querySelector("h2").textContent.toLowerCase();
      item.style.display = title.includes(word) ? "grid" : "none";
    });
  });
}

const replyForm = document.getElementById("replyForm");
const replyAlert = document.getElementById("replyAlert");

if (replyForm) {
  const replyFields = replyForm.querySelectorAll("input, textarea");

  replyFields.forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.value.trim() !== "") {
        field.classList.add("is-filled");
      } else {
        field.classList.remove("is-filled");
      }
      if (replyAlert) replyAlert.classList.remove("show");
    });
  });

  replyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let ok = true;

    replyFields.forEach(function (field) {
      if (field.hasAttribute("required") && field.value.trim() === "") {
        ok = false;
      }
    });

    if (!ok) {
      if (replyAlert) replyAlert.classList.add("show");
      return;
    }

    if (replyAlert) {
      replyAlert.textContent = "Your comment has been sent.";
      replyAlert.classList.add("show");
    }
    replyForm.reset();
    replyFields.forEach(function (field) {
      field.classList.remove("is-filled");
    });
  });
}

// About page
const topArrow = document.getElementById("topArrow");
if (topArrow) {
  topArrow.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const aboutTrack = document.getElementById("aboutTrack");
const aboutPrev = document.getElementById("aboutPrev");
const aboutNext = document.getElementById("aboutNext");
const aboutDots = document.querySelectorAll("#aboutDots span");
let aboutSlide = 2;

function paintAboutSlider() {
  if (!aboutTrack) return;
  const bikes = aboutTrack.querySelectorAll("img");

  bikes.forEach(function (bike) {
    bike.classList.remove("active");
  });
  if (bikes[aboutSlide]) bikes[aboutSlide].classList.add("active");

  aboutDots.forEach(function (dot) {
    dot.classList.remove("active");
  });
  if (aboutDots[aboutSlide]) aboutDots[aboutSlide].classList.add("active");
}

function showAboutSlide(step) {
  if (!aboutTrack) return;
  const bikes = aboutTrack.querySelectorAll("img");
  aboutSlide = (aboutSlide + step + bikes.length) % bikes.length;
  paintAboutSlider();
}

paintAboutSlider();
if (aboutPrev) aboutPrev.addEventListener("click", function () { showAboutSlide(-1); });
if (aboutNext) aboutNext.addEventListener("click", function () { showAboutSlide(1); });

