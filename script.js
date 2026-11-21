/* =========================================
   1. INTRODUCTION ANIMATIONS
========================================= */

window.addEventListener("load", () => {
  if (window.gsap) {
    const intro = gsap.timeline();

    intro
      .from(".top-header", {
        y: -30,
        opacity: 0,
        duration: 1
      })
      .from(".eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.4")
      .from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 1.2
      }, "-=0.4")
      .from(".hero-description", {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.6")
      .from(".reveal-button", {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.4")
      .from(".bottom-note", {
        opacity: 0,
        duration: 1
      }, "-=0.3");
  }
});


/* =========================================
   2. FLOATING BACKGROUND PARTICLES
========================================= */

const canvas = document.getElementById("particles");
const ctx = canvas ? canvas.getContext("2d") : null;

let particles = [];

function resizeCanvas() {
  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;

  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  createParticles();
}


class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * window.innerHeight;
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = window.innerHeight + 10;
    this.size = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 0.5 + 0.15;
    this.opacity = Math.random() * 0.6 + 0.15;
    this.drift = Math.random() * 0.4 - 0.2;
  }

  update() {
    this.y -= this.speed;
    this.x += this.drift;

    if (this.y < -10) {
      this.reset();
    }
  }

  draw() {
    if (!ctx) return;

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(120, 185, 245, ${this.opacity})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#246BCE";
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}


function createParticles() {
  const count = Math.min(
    65,
    Math.floor(window.innerWidth / 18)
  );

  particles = [];

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}


function animateParticles() {
  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();

  ctx.clearRect(
    0,
    0,
    rect.width,
    rect.height
  );

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}


if (canvas && ctx) {
  resizeCanvas();
  animateParticles();

  window.addEventListener("resize", resizeCanvas);
}


/* =========================================
   3. BIRTHDAY REVEAL INTERACTION
========================================= */

const revealButton = document.getElementById("reveal-button");

if (revealButton) {

  revealButton.addEventListener("click", () => {

    const openingScreen =
      document.getElementById("opening-screen");

    const hero =
      document.querySelector(".hero-content");

    if (revealButton.disabled) return;

    revealButton.disabled = true;

    const reveal = document.createElement("section");
    reveal.className = "birthday-reveal";

    reveal.innerHTML = `

      <!-- CHAPTER ONE: BIRTHDAY REVEAL -->

      <div class="reveal-layout">

        <div class="reveal-copy">

          <div class="reveal-label">
            ✦ TODAY, WE CELEBRATE YOU ✦
          </div>

          <h1 class="birthday-heading">
            Happy Birthday
            <span>Bassey Uduak!</span>
          </h1>

          <div class="reveal-role">
            MANAGING DIRECTOR · PLURAL MEDIA
          </div>

          <div class="celebration-line"></div>

          <p class="reveal-message">
            Today, we celebrate more than another year.
            We celebrate a remarkable man, a leader
            whose vision inspires, whose leadership
            makes a difference and whose journey
            continues to inspire those around him.

            <br><br>

            May this new chapter bring greater
            achievements, renewed strength and
            extraordinary possibilities.

            <br><br>

            Happy Birthday, Sir!
          </p>

        </div>

        <div class="portrait-frame">

          <img
            src="assets/bassey-portrait.png"
            alt="Bassey Uduak"
            id="bassey-portrait"
          >

          <div class="portrait-caption">
            A LEADER. A VISIONARY. AN INSPIRATION.
          </div>

        </div>

      </div>


      <!-- CHAPTER TWO: THE MAN BEHIND THE VISION -->

      <section class="tribute-section" id="tribute">

        <div class="tribute-heading">

          <div class="reveal-label">
            MORE THAN A TITLE · MORE THAN A ROLE
          </div>

          <h2>
            The Man Behind
            <span>The Vision.</span>
          </h2>

          <p>
            Every great organisation has a story.
            Behind the journey of Plural Media is a man
            whose vision, commitment and leadership
            continue to inspire.
          </p>

        </div>


        <!-- PHOTO GALLERY -->

        <div class="tribute-gallery">

          <button
            class="gallery-card"
            type="button"
            data-image="assets/bassey-casual.png"
            aria-label="View Bassey's portrait in black"
          >

            <img
              src="assets/bassey-casual.png"
              alt="Bassey Uduak in black"
              loading="lazy"
            >

            <span class="gallery-caption">
              THE MAN
            </span>

          </button>


          <button
            class="gallery-card"
            type="button"
            data-image="assets/bassey-traditional.png"
            aria-label="View Bassey's traditional portrait"
          >

            <img
              src="assets/bassey-traditional.png"
              alt="Bassey Uduak in traditional attire"
              loading="lazy"
            >

            <span class="gallery-caption">
              THE PERSONALITY
            </span>

          </button>

        </div>


        <!-- APPRECIATION MESSAGE -->

        <div class="tribute-quote">

          <div class="quote-mark">“</div>

          <p>
            Great leadership is not just about the
            position one occupies, but the impact
            one makes and the lives one inspires.
          </p>

          <span>
            WITH APPRECIATION FROM THE PLURAL MEDIA FAMILY
          </span>

        </div>

      </section>


      <!-- CHAPTER THREE: FINAL TRIBUTE -->

      <section class="final-tribute">

        <div class="final-tribute-content">

          <div class="reveal-label">
            ✦ A CELEBRATION OF EXCELLENCE ✦
          </div>

          <h2>
            Here's to another
            <span>remarkable chapter.</span>
          </h2>

          <p>
            May your days be filled with good health,
            greater wisdom, renewed strength and
            opportunities beyond imagination.

            May your vision continue to grow,
            your achievements multiply and your
            impact reach even greater heights.
          </p>

          <h3>
            Happy Birthday, Sir!
          </h3>

          <div class="final-signature">
            PLURAL MEDIA & TECHNOLOGIES LIMITED
          </div>

          <div class="final-year">
            DECEMBER 2 · CELEBRATING YOU
          </div>

        </div>

      </section>


      <!-- CHAPTER FOUR: CINEMATIC BIRTHDAY FINALE -->

      <section class="cinematic-ending">

        <div class="ending-particles"></div>

        <div class="ending-glow ending-glow-one"></div>

        <div class="ending-glow ending-glow-two"></div>

        <div class="cinematic-ending-content">

          <div class="ending-eyebrow">
            ✦ WITH GRATITUDE AND BEST WISHES ✦
          </div>

          <div class="ending-divider"></div>

          <p class="ending-intro">
            TO AN EXCEPTIONAL LEADER
          </p>

          <h2>
            Happy Birthday,
            <span>Sir.</span>
          </h2>

          <p class="ending-message">
            Your leadership continues to inspire,
            your vision continues to shape possibilities,
            and your impact continues to make a difference.
            May this new chapter bring you even greater
            accomplishments and lasting fulfilment.
          </p>

          <div class="ending-wish">
            Here's to more life, more wisdom and more victories.
          </div>

          <div class="ending-signature">

            <span class="signature-line"></span>

            FROM ALL OF US AT

            <strong>
              PLURAL MEDIA &amp; TECHNOLOGIES LIMITED
            </strong>

            <span class="ending-date">
              DECEMBER 2, 2026
            </span>

          </div>

          <div class="ending-star">✦</div>

        </div>

      </section>


      <!-- IMAGE LIGHTBOX -->

      <div class="image-lightbox" id="image-lightbox">

        <button
          class="lightbox-close"
          id="lightbox-close"
          type="button"
          aria-label="Close image"
        >
          ×
        </button>

        <img
          src=""
          alt="Bassey Uduak portrait enlarged"
          id="lightbox-image"
        >

      </div>

    `;


    // HIDE OPENING SCREEN CONTENT

    if (window.gsap) {

      gsap.to(hero, {
        opacity: 0,
        scale: 0.96,
        duration: 0.6,
        ease: "power2.inOut",

        onComplete: () => {

          hero.style.display = "none";

          openingScreen.appendChild(reveal);

          animateBirthdayReveal();
          setupGalleryLightbox();
          setupBackgroundMusic(reveal);
          initScrollAnimations(reveal);

        }

      });

    } else {

      hero.style.display = "none";

      openingScreen.appendChild(reveal);

      animateBirthdayReveal();
      setupGalleryLightbox();
      setupBackgroundMusic(reveal);
      initScrollAnimations(reveal);

    }

  });

}


/* =========================================
   4. ANIMATE BIRTHDAY REVEAL
========================================= */

function animateBirthdayReveal() {

  if (window.gsap) {

    const timeline = gsap.timeline();

    timeline
      .from(".reveal-label", {
        opacity: 0,
        y: 20,
        duration: 0.7
      })

      .from(".birthday-heading", {
        opacity: 0,
        y: 35,
        duration: 1
      }, "-=0.3")

      .from(".reveal-role", {
        opacity: 0,
        y: 15,
        duration: 0.7
      }, "-=0.5")

      .from(".celebration-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.6
      }, "-=0.3")

      .from(".reveal-message", {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, "-=0.3")

      .from(".portrait-frame", {
        opacity: 0,
        x: 60,
        scale: 0.94,
        duration: 1.3,
        ease: "power3.out"
      }, "-=1.2");

  }

  const portrait = document.getElementById("bassey-portrait");

  if (portrait) {
    portrait.addEventListener("error", () => {
      console.error(
        "Portrait not found. Check assets/bassey-portrait.png"
      );
    });
  }

  createBirthdayConfetti();

}


/* =========================================
   5. BIRTHDAY CONFETTI
========================================= */

function createBirthdayConfetti() {

  const colors = [
    "#246BCE",
    "#78B9F5",
    "#F5C96B",
    "#FFFFFF"
  ];

  const screen =
    document.getElementById("opening-screen");

  if (!screen) return;

  for (let i = 0; i < 90; i++) {

    const piece = document.createElement("div");

    piece.className = "reveal-confetti";

    piece.style.left =
      Math.random() * 100 + "%";

    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDuration =
      (Math.random() * 3 + 3) + "s";

    piece.style.animationDelay =
      Math.random() * 2 + "s";

    screen.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 8500);

  }

}


/* =========================================
   6. INTERACTIVE PHOTO GALLERY
========================================= */

function setupGalleryLightbox() {

  const galleryCards =
    document.querySelectorAll(".gallery-card");

  const lightbox =
    document.getElementById("image-lightbox");

  const lightboxImage =
    document.getElementById("lightbox-image");

  const closeButton =
    document.getElementById("lightbox-close");

  if (!lightbox || !lightboxImage || !closeButton) {
    return;
  }

/* =========================================
   BACKGROUND BIRTHDAY MUSIC PLAYER
========================================= */

function setupBackgroundMusic(reveal) {

  const music = document.createElement("audio");

  music.id = "birthday-music";
  music.src = "assets/birthday-instrumental.mp3";
  music.loop = true;
  music.preload = "auto";
  music.volume = 0.35;

  const musicButton = document.createElement("button");

  musicButton.className = "music-control";
  musicButton.type = "button";
  musicButton.innerHTML = `
    <span class="music-icon">♫</span>
    <span class="music-label">Play Music</span>
  `;

  musicButton.setAttribute("aria-label", "Play background music");

  reveal.appendChild(music);
  reveal.appendChild(musicButton);

  musicButton.addEventListener("click", async () => {

    const icon = musicButton.querySelector(".music-icon");
    const label = musicButton.querySelector(".music-label");

    if (music.paused) {

      try {

        await music.play();

        musicButton.classList.add("playing");
        icon.textContent = "Ⅱ";
        label.textContent = "Pause Music";

        musicButton.setAttribute(
          "aria-label",
          "Pause background music"
        );

      } catch (error) {

        console.error("Unable to play birthday music:", error);

        label.textContent = "Try Again";

      }

    } else {

      music.pause();

      musicButton.classList.remove("playing");
      icon.textContent = "♫";
      label.textContent = "Play Music";

      musicButton.setAttribute(
        "aria-label",
        "Play background music"
      );

    }

  });

  music.addEventListener("error", () => {
    console.error(
      "Music file not found. Check assets/birthday-instrumental.mp3"
    );
  });

}

  // OPEN SELECTED PHOTOGRAPH

  galleryCards.forEach(card => {

    card.addEventListener("click", () => {

      const imagePath = card.dataset.image;

      lightboxImage.src = imagePath;

      lightbox.classList.add("active");

      document.body.style.overflow = "hidden";

    });

  });


  // CLOSE LIGHTBOX

  function closeLightbox() {

    lightbox.classList.remove("active");

    lightboxImage.src = "";

    document.body.style.overflow = "";

  }

  closeButton.addEventListener("click", closeLightbox);


  // CLOSE WHEN CLICKING OUTSIDE IMAGE

  lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  // CLOSE WITH ESCAPE KEY

  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      lightbox.classList.contains("active")
    ) {
      closeLightbox();
    }

  });

}


/* =========================================
   BACKGROUND BIRTHDAY MUSIC PLAYER
========================================= */

function setupBackgroundMusic(reveal) {

  const music = document.createElement("audio");

  music.id = "birthday-music";
  music.src = "assets/birthday-instrumental.mp3";
  music.loop = true;
  music.preload = "auto";
  music.volume = 0.35;

  const musicButton = document.createElement("button");

  musicButton.className = "music-control";
  musicButton.type = "button";
  musicButton.innerHTML = `
    <span class="music-icon">♫</span>
    <span class="music-label">Play Music</span>
  `;

  musicButton.setAttribute("aria-label", "Play background music");

  reveal.appendChild(music);
  reveal.appendChild(musicButton);

  musicButton.addEventListener("click", async () => {

    const icon = musicButton.querySelector(".music-icon");
    const label = musicButton.querySelector(".music-label");

    if (music.paused) {

      try {

        await music.play();

        musicButton.classList.add("playing");
        icon.textContent = "Ⅱ";
        label.textContent = "Pause Music";

        musicButton.setAttribute(
          "aria-label",
          "Pause background music"
        );

      } catch (error) {

        console.error("Unable to play birthday music:", error);

        label.textContent = "Try Again";

      }

    } else {

      music.pause();

      musicButton.classList.remove("playing");
      icon.textContent = "♫";
      label.textContent = "Play Music";

      musicButton.setAttribute(
        "aria-label",
        "Play background music"
      );

    }

  });

  music.addEventListener("error", () => {
    console.error(
      "Music file not found. Check assets/birthday-instrumental.mp3"
    );
  });

}

/* =========================================
   7. SCROLL-TRIGGERED ANIMATIONS
========================================= */

function initScrollAnimations(reveal) {

  if (!window.gsap || !window.ScrollTrigger || !reveal) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // THE BIRTHDAY REVEAL IS THE SCROLLING CONTAINER

  const scroller = reveal;


  // ANIMATE THE MAN BEHIND THE VISION HEADING

  const tributeHeading =
    reveal.querySelector(".tribute-heading");

  if (tributeHeading) {

    gsap.fromTo(
      tributeHeading,
      {
        opacity: 0,
        y: 55
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: tributeHeading,
          scroller: scroller,
          start: "top 85%",
          once: true
        }
      }
    );

  }


  // ANIMATE GALLERY PHOTOGRAPHS

  const galleryCards =
    reveal.querySelectorAll(".gallery-card");

  galleryCards.forEach((card, index) => {

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 60,
        scale: 0.96
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: index * 0.15,
        ease: "power3.out",

        scrollTrigger: {
          trigger: card,
          scroller: scroller,
          start: "top 90%",
          once: true
        }
      }
    );

  });


  // ANIMATE APPRECIATION QUOTE

  const tributeQuote =
    reveal.querySelector(".tribute-quote");

  if (tributeQuote) {

    gsap.fromTo(
      tributeQuote,
      {
        opacity: 0,
        y: 55
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: tributeQuote,
          scroller: scroller,
          start: "top 88%",
          once: true
        }
      }
    );

  }


  // ANIMATE FINAL BIRTHDAY TRIBUTE

  const finalTribute =
    reveal.querySelector(".final-tribute-content");

  if (finalTribute) {

    const finalElements = finalTribute.children;

    gsap.fromTo(
      finalElements,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.16,
        ease: "power3.out",

        scrollTrigger: {
          trigger: finalTribute,
          scroller: scroller,
          start: "top 85%",
          once: true
        }
      }
    );

  }


  // ANIMATE THE CINEMATIC BIRTHDAY FINALE

  const endingContent =
    reveal.querySelector(".cinematic-ending-content");

  if (endingContent) {

    gsap.fromTo(
      endingContent.children,
      {
        opacity: 0,
        y: 45
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.18,
        ease: "power3.out",

        scrollTrigger: {
          trigger: endingContent,
          scroller: scroller,
          start: "top 80%",
          once: true
        }
      }
    );

  }


  // REFRESH AFTER DYNAMIC SECTIONS ARE READY

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

}