console.log("JS is running");

// Select all elements with the "reveal" class
const reveals = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right'
);

/**
 * Function to reveal or hide elements based on viewport
 */
function revealOnScroll() {
  reveals.forEach(reveal => {
    const rect = reveal.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      // Element is in viewport → show it
      reveal.classList.add('active');
      reveal.classList.remove('hide');
    } else {
      // Element is out of viewport → hide it
      reveal.classList.remove('active');
      reveal.classList.add('hide');
    }
  });
}




// Optimize scroll events using requestAnimationFrame
let ticking = false;
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', revealOnScroll); // 页面加载时触发


// Event listeners
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  const percentage = document.querySelector(".loading-percentage");

  let progress = 0;

  // 模拟加载进度 0 → 100
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1; // 每次增加 1~5
    if (progress > 100) progress = 100;
    percentage.textContent = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      // 渐隐
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 800);

      // 页面 reveal 动画
      if (typeof revealOnScroll === "function") revealOnScroll();
    }
  }, 50); // 每50ms更新一次
});





// FAQ Toggle
// FAQ 折叠功能，只在 FAQ 页面生效
const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove("active");
      });

      item.classList.toggle("active");
    });
  });
}


document.addEventListener("DOMContentLoaded", function () {
    const text = "Caro Chiro";
    const typingEl = document.getElementById("typing");

    let i = 0;
    let isDeleting = false;

    function typeLoop() {
        if (!typingEl) return;

        if (!isDeleting) {
            // 👉 打字
            typingEl.innerHTML = text.substring(0, i + 1);
            i++;

            if (i === text.length) {
                isDeleting = true;
                setTimeout(typeLoop, 2300); // 打完停一下
                return;
            }

        } else {
            // 👉 删除
            typingEl.innerHTML = text.substring(0, i - 1);
            i--;

            if (i === 0) {
                isDeleting = false;
            }
        }

        const speed = isDeleting ? 50 : 90;
        setTimeout(typeLoop, speed);
    }

    typeLoop();
});

const footer = document.querySelector(".footer");

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.85;
    const top = footer.getBoundingClientRect().top;

    if(top < trigger){
        footer.style.opacity = "1";
        footer.style.transform = "translateY(0)";
    }
});


const cards = document.querySelectorAll(".service-card");

cards.forEach(card => {
    const textEl = card.querySelector(".typing-text");
    const fullText = textEl.innerText;

    textEl.innerText = "";

    let index = 0;
    let typingInterval;

    card.addEventListener("mouseenter", () => {
        textEl.innerText = "";
        index = 0;
        textEl.classList.add("active");

        typingInterval = setInterval(() => {
            if (index < fullText.length) {
                textEl.innerText += fullText.charAt(index);
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 25); // 打字速度（越小越快）
    });

    card.addEventListener("mouseleave", () => {
  clearInterval(typingInterval);
});

}); // ❌ 这一行你现在少了（关闭 forEach）








const segments = document.querySelectorAll(".spine-segment");

let i = 0;

const interval = setInterval(() => {

    if (i < segments.length) {

        segments[i].classList.add("active");

        // 🌸 软弹跳
        segments[i].animate([
            { transform: "scale(1)" },
            { transform: "scale(1.5)" },
            { transform: "scale(1.2)" }
        ], {
            duration: 400,
            easing: "ease-out"
        });

        i++;

    } else {
        clearInterval(interval);
    }

}, 150);




document.querySelectorAll(".service-card").forEach(card => {
    const textEl = card.querySelector(".typing-text");
    const fullText = textEl.getAttribute("data-text");

    let typing = false;

    card.addEventListener("mouseenter", () => {
        if (typing) return;
        typing = true;

        textEl.innerHTML = "";
        let i = 0;

        function type() {
            if (i < fullText.length) {
                textEl.innerHTML += fullText.charAt(i);
                i++;
                setTimeout(type, 18);
            }
        }

        type();
    });

    card.addEventListener("mouseleave", () => {
        textEl.innerHTML = "";
        typing = false;
    });
});





let lastScrollY = window.scrollY;
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // 页面还没滑到一半前，不隐藏
  if (currentScrollY < 300) {
    nav.classList.remove("hide-nav");
    lastScrollY = currentScrollY;
    return;
  }

  // 往下滑 -> 隐藏
  if (currentScrollY > lastScrollY) {
    nav.classList.add("hide-nav");
  } 
  // 往上滑 -> 显示
  else {
    nav.classList.remove("hide-nav");
  }

  lastScrollY = currentScrollY;
});





const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dots .dot");

let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 4000);

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  });
});







document.getElementById("bookingForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("fullName").value;
    const phone = document.getElementById("phoneNumber").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // 🚨 检查有没有选
    if(!date || !time){
        alert("Please select date and time");
        return;
    }

    const message = `Appointment Request:
Name: ${name}
Phone: ${phone}
Service: ${service}
Date: ${date}
Time: ${time}`;

    // ✅ encode（关键）
    const url = `https://wa.me/60129673850?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
});




    const items = document.querySelectorAll(".faq-item");
    items.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            items.forEach(i => { if(i !== item) i.classList.remove("active"); });
            item.classList.toggle("active");
        });
    });


