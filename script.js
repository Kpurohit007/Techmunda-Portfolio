// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Smooth scroll for custom buttons
document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSelector = btn.getAttribute("data-scroll");
    if (!targetSelector) return;
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Simple testimonial slider
const testimonials = Array.from(document.querySelectorAll(".testimonial"));
const dots = Array.from(document.querySelectorAll(".dot"));

let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });
  dots.forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
  currentIndex = index;
}

if (testimonials.length && dots.length) {
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showTestimonial(index));
  });

  // Auto-rotate every 8 seconds
  setInterval(() => {
    const next = (currentIndex + 1) % testimonials.length;
    showTestimonial(next);
  }, 8000);
}

// Intersection animation
const animatedNodes = document.querySelectorAll(
  ".section, .service-card, .project-card, .testimonial-slider, .google-reviews, .contact-card, .project-form, .consultation-form"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.animate = "fade-up";
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.14,
    }
  );

  animatedNodes.forEach((el) => {
    el.dataset.animate = "fade-up";
    observer.observe(el);
  });
}

// Contact form -> send to backend API
const contactForm = document.querySelector(".contact-form");
const statusEl = document.querySelector(".form-status");

if (contactForm && statusEl) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.textContent = "Sending your inquiry...";
    statusEl.classList.remove("error", "success");

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      phone: formData.get("phone")?.trim() || null,
      service: formData.get("service") || null,
      project: formData.get("project")?.trim(),
      message: formData.get("message")?.trim() || null,
    };

    fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const msg = data.error || "Something went wrong. Please try again.";
          throw new Error(msg);
        }
        return res.json();
      })
      .then(() => {
        statusEl.textContent =
          "Thank you! Your inquiry has been received. We'll get back to you soon.";
        statusEl.classList.add("success");
        contactForm.reset();
      })
      .catch((err) => {
        console.error(err);
        statusEl.textContent =
          err.message ||
          "Unable to send right now. Please email us directly at Techmunda21@gmail.com.";
        statusEl.classList.add("error");
      });
  });
}

// Button handlers for form navigation
document.querySelectorAll("[data-form]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const formId = btn.getAttribute("data-form");
    const targetSection = document.getElementById(formId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Project form submission
const projectForm = document.querySelector(".project-form");
if (projectForm) {
  const projectStatusEl = projectForm.querySelector(".form-status");
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    projectStatusEl.textContent = "Submitting your project details...";
    projectStatusEl.classList.remove("error", "success");

    const formData = new FormData(projectForm);
    const payload = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      phone: formData.get("phone")?.trim() || null,
      company: formData.get("company")?.trim() || null,
      projectType: formData.get("projectType") || null,
      budget: formData.get("budget") || null,
      description: formData.get("description")?.trim(),
      timeline: formData.get("timeline") || null,
      type: "project_discussion",
    };

    fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const msg = data.error || "Something went wrong. Please try again.";
          throw new Error(msg);
        }
        return res.json();
      })
      .then(() => {
        projectStatusEl.textContent =
          "Thank you! Your project details have been received. We'll review and get back to you with a tailored proposal soon.";
        projectStatusEl.classList.add("success");
        projectForm.reset();
      })
      .catch((err) => {
        console.error(err);
        projectStatusEl.textContent =
          err.message ||
          "Unable to submit right now. Please email us directly at Techmunda21@gmail.com.";
        projectStatusEl.classList.add("error");
      });
  });
}

// Consultation form submission
const consultationForm = document.querySelector(".consultation-form");
if (consultationForm) {
  const consultStatusEl = consultationForm.querySelector(".form-status");
  consultationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    consultStatusEl.textContent = "Submitting your consultation request...";
    consultStatusEl.classList.remove("error", "success");

    const formData = new FormData(consultationForm);
    const payload = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      phone: formData.get("phone")?.trim(),
      company: formData.get("company")?.trim() || null,
      topic: formData.get("topic") || null,
      preferredTime: formData.get("preferredTime") || null,
      message: formData.get("message")?.trim(),
      type: "free_consultation",
    };

    fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const msg = data.error || "Something went wrong. Please try again.";
          throw new Error(msg);
        }
        return res.json();
      })
      .then(() => {
        consultStatusEl.textContent =
          "Thank you! Your consultation request has been received. We'll review and contact you within 24 hours to schedule your call.";
        consultStatusEl.classList.add("success");
        consultationForm.reset();
      })
      .catch((err) => {
        console.error(err);
        consultStatusEl.textContent =
          err.message ||
          "Unable to submit right now. Please email us directly at Techmunda21@gmail.com.";
        consultStatusEl.classList.add("error");
      });
  });
}

// Dynamic year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}


