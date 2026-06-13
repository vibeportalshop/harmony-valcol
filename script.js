// Scroll Progress + Navbar Shrink
window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";

    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Scroll Reveal
const faders = document.querySelectorAll(".fade");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// Magnetic Buttons
document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});

// Floating Particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particlesArray = [];
for (let i = 0; i < 60; i++) {
    particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.4 + 0.2
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212,175,55,0.35)";
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// CART SYSTEM
document.addEventListener("DOMContentLoaded", () => {

    let cart = [];

    const cards = document.querySelectorAll(".v-card");
    const cartPanel = document.getElementById("cart-panel");
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const backBtn = document.getElementById("cart-back");

    // Close cart when clicking outside
    document.addEventListener("click", (e) => {
        if (
            cartPanel.classList.contains("open") &&
            !cartPanel.contains(e.target) &&
            !e.target.closest(".cart-icon")
        ) {
            cartPanel.classList.remove("open");
        }
    });

    // Select fragrances
    cards.forEach(card => {
        card.addEventListener("click", () => {

            const name = card.dataset.name;

            if (cart.includes(name)) {
                return;
            }

            if (cart.length >= 2) {
                alert("Only 2 fragrances allowed 💝");
                return;
            }

            cart.push(name);

            card.classList.add("selected-perfume");

            updateCart();
        });
    });

    // Open cart
    window.toggleCart = function () {
        cartPanel.classList.add("open");
    };

    // Close cart
    backBtn.addEventListener("click", () => {
        cartPanel.classList.remove("open");
    });

    // Update cart UI
    function updateCart() {

        cartItems.innerHTML = "";

        cart.forEach(item => {

            const li = document.createElement("li");

            li.innerHTML = `
                ${item}
                <span class="remove-btn" onclick="removeItem('${item}')">✕</span>
            `;

            cartItems.appendChild(li);
        });

        cartCount.textContent = cart.length;
    }

    // Remove item
    window.removeItem = function(name) {

        cart = cart.filter(item => item !== name);

        document.querySelectorAll(".v-card").forEach(card => {
            if (card.dataset.name === name) {
                card.classList.remove("selected-perfume");
            }
        });

        updateCart();
    };

    // Reset cart
    window.resetCart = function() {

        cart = [];

        document.querySelectorAll(".v-card").forEach(card => {
            card.classList.remove("selected-perfume");
        });

        updateCart();
    };

    // WhatsApp Checkout
    window.checkout = function() {

        if (cart.length !== 2) {
            alert("Please select exactly 2 fragrances 💕");
            return;
        }

        const message =
`Hello, I want to order the Valentine Couple Box:

• ${cart[0]}
• ${cart[1]}

Price: ₹400`;

        window.open(
            "https://wa.me/919322723436?text=" +
            encodeURIComponent(message),
            "_blank"
        );
    };

});

// open cart
window.toggleCart = function () {
    cartPanel.classList.add("open");
};

// back button close
backBtn.addEventListener("click", () => {
    cartPanel.classList.remove("open");
});

function updateCart() {
    cartItems.innerHTML = "";

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item}
            <span class="remove-btn" onclick="removeItem('${item}')">✕</span>
        `;
        cartItems.appendChild(li);
    });

    cartCount.textContent = cart.length;
}

window.removeItem = function(name) {
    cart = cart.filter(item => item !== name);
    updateCart();
};

window.resetCart = function() {
    cart = [];
    updateCart();
};

window.checkout = function() {

    if (cart.length !== 2) {
        alert("Please select exactly 2 fragrances 💕");
        return;
    }

    const message =
`Hello, I want to order the Valentine Couple Box:

• ${cart[0]}
• ${cart[1]}

Price: ₹400`;

    window.open(
        "https://wa.me/919322723436?text=" +
        encodeURIComponent(message),
        "_blank"
    );
};

});
