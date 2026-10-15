// SOLESTYLE FOOTWEAR STORE
// Front-end demonstration only.

const products = [
  {
    id: 1,
    name: "Classic Red Sneaker",
    category: "Unisex",
    price: 38500,
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 2,
    name: "Women's Fashion Heel",
    category: "Women",
    price: 45000,
    tag: "ELEGANT",
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=700&q=80",
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 3,
    name: "Men's Formal Shoe",
    category: "Men",
    price: 56000,
    tag: "CLASSIC",
    image: "https://images.unsplash.com/photo-1614252369475-531daf5b591b?auto=format&fit=crop&w=700&q=80",
    sizes: [39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 4,
    name: "Everyday Slides",
    category: "Unisex",
    price: 18500,
    tag: "COMFORT",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=700&q=80",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44]
  },
  {
    id: 5,
    name: "Women's Ballet Flats",
    category: "Women",
    price: 27500,
    tag: "EVERYDAY",
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d8bb5b?auto=format&fit=crop&w=700&q=80",
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 6,
    name: "Street High-Top Sneaker",
    category: "Men",
    price: 49500,
    tag: "STREET STYLE",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80",
    sizes: [39, 40, 41, 42, 43, 44, 45, 46]
  },
  {
    id: 7,
    name: "White Everyday Sneaker",
    category: "Unisex",
    price: 40000,
    tag: "POPULAR",
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=80",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44]
  },
  {
    id: 8,
    name: "Men's Sports Trainer",
    category: "Men",
    price: 52000,
    tag: "ACTIVE",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80",
    sizes: [39, 40, 41, 42, 43, 44, 45, 46]
  },
  {
    id: 9,
    name: "Women's Casual Mule",
    category: "Women",
    price: 33000,
    tag: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=700&q=80",
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 10,
    name: "Men's Derby Shoe",
    category: "Men",
    price: 61000,
    tag: "SMART STYLE",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=700&q=80",
    sizes: [39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 11,
    name: "Women's Casual Sneaker",
    category: "Women",
    price: 42000,
    tag: "FAVOURITE",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80",
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 12,
    name: "Unisex Casual Trainer",
    category: "Unisex",
    price: 36000,
    tag: "CASUAL",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=80",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44]
  }
];

const CART_KEY = "solestyle_cart";
const ACCOUNTS_KEY = "solestyle_demo_accounts";
const SESSION_KEY = "solestyle_demo_session";

let cart = loadData(CART_KEY, []);
let activeCategory = "All";
let authMode = "register";
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadData(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(price);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function showToast(message) {
  const toast = $("#toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// DISPLAY PRODUCTS

function renderProducts() {
  const search = $("#searchInput").value
    .trim()
    .toLowerCase();

  const sort = $("#sortSelect").value;

  let filtered = products.filter(product => {
    const categoryMatches =
      activeCategory === "All" ||
      product.category === activeCategory;

    const searchMatches =
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search);

    return categoryMatches && searchMatches;
  });

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  $("#productGrid").innerHTML = filtered.map(product => `
    <article class="product-card">

      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/500x600/f0eee7/34332e?text=Footwear'">

        <span class="product-tag">
          ${escapeHTML(product.tag)}
        </span>
      </div>

      <div class="product-info">

        <div class="product-top">
          <div>
            <h3 class="product-name">
              ${escapeHTML(product.name)}
            </h3>

            <p class="product-category">
              ${escapeHTML(product.category)} footwear
            </p>
          </div>

          <span class="product-price">
            ${formatPrice(product.price)}
          </span>
        </div>

        <label class="size-label" for="size-${product.id}">
          Choose shoe size
        </label>

        <select
          class="size-select"
          id="size-${product.id}"
          aria-label="Choose shoe size for ${escapeHTML(product.name)}">

          <option value="">Select size</option>

          ${product.sizes.map(size =>
            `<option value="${size}">${size}</option>`
          ).join("")}

        </select>

        <button
          class="add-button"
          data-add="${product.id}"
          type="button">
          Add to cart +
        </button>

      </div>
    </article>
  `).join("");

  $("#emptyMessage").classList.toggle(
    "hidden",
    filtered.length !== 0
  );
}

// ADD PRODUCTS TO CART

function addToCart(productId, size) {
  const product = products.find(
    item => item.id === Number(productId)
  );

  if (!product) return;

  if (!size) {
    showToast("Please choose a shoe size first.");
    $(`#size-${product.id}`).focus();
    return;
  }

  const existing = cart.find(item =>
    item.id === product.id &&
    String(item.size) === String(size)
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      size: String(size),
      quantity: 1
    });
  }

  saveCart();
  renderCart();

  showToast(`${product.name} added to your cart.`);
}

// DISPLAY CART

function renderCart() {
  // Remove entries for products that no longer exist.
  cart = cart.filter(item =>
    products.some(product => product.id === item.id) &&
    Number(item.quantity) > 0
  );

  saveCart();

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce((total, item) => {
    const product = products.find(
      product => product.id === item.id
    );

    return total + product.price * item.quantity;
  }, 0);

  $("#cartCount").textContent = count;
  $("#cartSubtotal").textContent = formatPrice(subtotal);

  $("#emptyCart").classList.toggle(
    "hidden",
    cart.length > 0
  );

  $("#cartFooter").classList.toggle(
    "hidden",
    cart.length === 0
  );

  $("#cartItems").innerHTML = cart.map((item, index) => {
    const product = products.find(
      product => product.id === item.id
    );

    return `
      <div class="cart-item">

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          onerror="this.onerror=null;this.src='https://placehold.co/200x220/f0eee7/34332e?text=Shoe'">

        <div>
          <h3>${escapeHTML(product.name)}</h3>

          <p>
            Size ${escapeHTML(item.size)} ·
            ${formatPrice(product.price)}
          </p>

          <strong>
            ${formatPrice(product.price * item.quantity)}
          </strong>

          <div class="quantity-controls">
            <button
              data-index="${index}"
              data-change="-1"
              type="button"
              aria-label="Decrease quantity">−</button>

            <span>${item.quantity}</span>

            <button
              data-index="${index}"
              data-change="1"
              type="button"
              aria-label="Increase quantity">+</button>
          </div>

          <button
            class="remove-btn"
            data-remove="${index}"
            type="button">
            Remove item
          </button>
        </div>

      </div>
    `;
  }).join("");
}

// CART BUTTONS

$("#productGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (!button) return;

  const id = Number(button.dataset.add);
  const size = $(`#size-${id}`).value;

  addToCart(id, size);
});

$("#cartItems").addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-index]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    const index = Number(quantityButton.dataset.index);
    const change = Number(quantityButton.dataset.change);

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    saveCart();
    renderCart();
  }

  if (removeButton) {
    cart.splice(Number(removeButton.dataset.remove), 1);

    saveCart();
    renderCart();

    showToast("Item removed from cart.");
  }
});

// FILTERS AND SEARCH

function selectCategory(category) {
  activeCategory = category;

  $$(".filter").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === category
    );
  });

  renderProducts();
}

$$(".filter").forEach(button => {
  button.addEventListener("click", () => {
    selectCategory(button.dataset.filter);
  });
});

$$("[data-filter]").forEach(link => {
  if (link.classList.contains("filter")) return;

  link.addEventListener("click", () => {
    selectCategory(link.dataset.filter);
  });
});

$("#searchInput").addEventListener("input", renderProducts);
$("#sortSelect").addEventListener("change", renderProducts);

// OPEN AND CLOSE CART

function openCart() {
  $("#cartPanel").classList.add("open");
  $("#overlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  $("#cartPanel").classList.remove("open");

  if ($("#accountModal").classList.contains("hidden")) {
    $("#overlay").classList.add("hidden");
  }

  document.body.style.overflow = "";
}

$("#cartBtn").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);

$("#continueShopping").addEventListener("click", () => {
  closeCart();
  $("#shop").scrollIntoView({ behavior: "smooth" });
});

$("#overlay").addEventListener("click", () => {
  closeCart();
  closeAccount();
});

// REGISTRATION AND LOGIN
// This is a local demonstration, not secure authentication.

function openAccount() {
  const session = loadData(SESSION_KEY, null);

  if (session) {
    $("#accountTitle").textContent =
      `Welcome, ${session.name}!`;

    setAuthMessage(
      `You are signed in as ${session.email}.`,
      true
    );
  } else {
    $("#accountTitle").textContent =
      authMode === "register"
        ? "Create your account"
        : "Welcome back";

    setAuthMessage("", true);
  }

  $("#accountModal").classList.remove("hidden");
  $("#overlay").classList.remove("hidden");

  document.body.style.overflow = "hidden";
}

function closeAccount() {
  $("#accountModal").classList.add("hidden");

  if (!$("#cartPanel").classList.contains("open")) {
    $("#overlay").classList.add("hidden");
  }

  document.body.style.overflow = "";
}

$("#accountBtn").addEventListener("click", openAccount);
$("#closeAccount").addEventListener("click", closeAccount);

function setAuthMode(mode) {
  authMode = mode;

  $$(".auth-tab").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.mode === mode
    );
  });

  const registering = mode === "register";

  $("#nameGroup").classList.toggle(
    "hidden",
    !registering
  );

  $("#fullName").required = registering;

  $("#password").autocomplete =
    registering ? "new-password" : "current-password";

  $("#accountTitle").textContent = registering
    ? "Create your account"
    : "Welcome back";

  $("#authSubmit").textContent = registering
    ? "Create account"
    : "Log in";

  setAuthMessage("", true);
}

$$(".auth-tab").forEach(button => {
  button.addEventListener("click", () => {
    setAuthMode(button.dataset.mode);
  });
});

function setAuthMessage(message, success) {
  const element = $("#authMessage");

  element.textContent = message;
  element.className = success ? "success" : "error";
}

$("#authForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("#fullName").value.trim();
  const email = $("#email").value.trim().toLowerCase();
  const password = $("#password").value;

  const accounts = loadData(ACCOUNTS_KEY, []);

  if (password.length < 6) {
    setAuthMessage(
      "Password must contain at least 6 characters.",
      false
    );
    return;
  }

  if (authMode === "register") {
    if (name.length < 2) {
      setAuthMessage("Please enter your full name.", false);
      return;
    }

    if (accounts.some(account => account.email === email)) {
      setAuthMessage(
        "This email already has a demo account. Please log in.",
        false
      );
      return;
    }

    // DEMO ONLY:
    // Do not store plain-text passwords in a real application.
    accounts.push({ name, email, password });

    localStorage.setItem(
      ACCOUNTS_KEY,
      JSON.stringify(accounts)
    );

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ name, email })
    );

    setAuthMessage(
      "Registration successful! You are signed in.",
      true
    );

    showToast("Welcome to SoleStyle!");

  } else {
    const account = accounts.find(item =>
      item.email === email &&
      item.password === password
    );

    if (!account) {
      setAuthMessage(
        "Incorrect email or password for this demo store.",
        false
      );
      return;
    }

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        name: account.name,
        email: account.email
      })
    );

    setAuthMessage("Login successful!", true);
    showToast(`Welcome back, ${account.name}!`);
  }

  setTimeout(() => {
    closeAccount();
    $("#authForm").reset();
  }, 900);
});

// CHECKOUT DEMONSTRATION

$("#checkoutBtn").addEventListener("click", () => {
  const session = loadData(SESSION_KEY, null);

  if (!cart.length) {
    showToast("Your cart is empty.");
    return;
  }

  if (!session) {
    closeCart();
    setAuthMode("register");
    openAccount();

    showToast("Please create an account to continue.");
    return;
  }

  showToast(
    "Demo checkout only. Connect a backend and payment provider to accept orders."
  );
});

// NEWSLETTER DEMONSTRATION

$("#newsletterForm").addEventListener("submit", event => {
  event.preventDefault();

  showToast(
    "Thank you! Newsletter subscription is a demo feature."
  );

  event.target.reset();
});

// MOBILE NAVIGATION

$("#menuBtn").addEventListener("click", () => {
  const nav = $("#navigation");
  nav.classList.toggle("show");
});

// CLOSE WINDOWS WITH ESCAPE

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeAccount();
  }
});

// INITIALISE STORE

$("#year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
