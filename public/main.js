// Main.js file, all the magic happens here.

import "./css/styles.scss";

const carousel = document.querySelector(".carousel");

initialiseCarousel();

function initialiseCarousel() {
  const carouselSlider = document.createElement("div", {
    is: "carousel-slider",
  });
  const slides = carousel.querySelectorAll(".slide");
  const sliderOptions = JSON.parse(carousel.getAttribute("data-options"));
  const totalSlides = slides.length;
  let currentSlide = 1;

  carousel.appendChild(carouselSlider);
  carouselSlider.classList.add("slider");

  // Append available slides to the carousel slider
  slides.forEach((slide, index) => {
    slide.setAttribute("position", index + 1);
    carouselSlider.append(slide);
  });

  // Check and set options
  setCarouselOptions(sliderOptions, carouselSlider, carousel);

  function setDotPositions() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => {
      const position = dot.getAttribute("slide");
      if (currentSlide === parseInt(position)) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  if (sliderOptions.dots) {
    setDotPositions();
  }

  function setCarouselOptions(sliderOptions, carouselSlider, carousel) {
    if (sliderOptions.height) {
      carouselSlider.style.height = sliderOptions.height;
    }

    if (sliderOptions.dots) {
      const dotsContainer = document.createElement("div");
      dotsContainer.classList.add("dot-container");
      for (let index = 0; index < slides.length; index++) {
        const dotItem = document.createElement("div");
        dotItem.classList.add("dot");
        dotItem.setAttribute("slide", index + 1);
        dotsContainer.appendChild(dotItem);
      }
      carouselSlider.appendChild(dotsContainer);
    }

    if (sliderOptions.controls) {
      let controlContainer = document.createElement("div");
      let prevButton = document.createElement("div");
      let nextButton = document.createElement("div");

      controlContainer.classList.add("prev-next-buttons");
      prevButton.classList.add("prev");
      nextButton.classList.add("next");

      prevButton.addEventListener("click", (element) => {
        previousSlide();
      });

      nextButton.addEventListener("click", (element) => {
        nextSlide();
      });

      controlContainer.appendChild(prevButton);
      controlContainer.appendChild(nextButton);

      carousel.appendChild(controlContainer);
    }

    if (sliderOptions.autoPlay) {
      const autoplayControl = document.createElement("div");
      carousel.appendChild(autoplayControl);
      autoplayControl.classList.add("autoplay-control", "pause");

      let playbackSpeed = 5000;
      if (sliderOptions.playbackSpeed) {
        playbackSpeed = sliderOptions.playbackSpeed;
      }
      let autoPlayInterval = setInterval(() => {
        nextSlide();
      }, playbackSpeed);

      autoplayControl.addEventListener("click", () => {
        if (autoplayControl.classList.contains("pause")) {
          clearInterval(autoPlayInterval);
          autoplayControl.classList.remove("pause");
          autoplayControl.classList.add("play");
        } else if (autoplayControl.classList.contains("play")) {
          autoplayControl.classList.remove("play");
          autoplayControl.classList.add("pause");
          autoPlayInterval = setInterval(() => {
            nextSlide();
          }, playbackSpeed);
        }
      });
    }
  }

  setSlidePositions();

  function setSlidePositions() {
    const prevButton = document.querySelector(".prev-next-buttons .prev");
    const nextButton = document.querySelector(".prev-next-buttons .next");
    if (currentSlide === totalSlides) {
      nextButton.classList.add("inactive");
    } else {
      nextButton.classList.remove("inactive");
    }
    if (currentSlide === 1) {
      prevButton.classList.add("inactive");
    } else {
      prevButton.classList.remove("inactive");
    }

    slides.forEach((slide) => {
      const position = slide.getAttribute("position");
      if (currentSlide === parseInt(position)) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
      if (currentSlide - 1 === parseInt(position)) {
        slide.classList.add("prev");
      } else {
        slide.classList.remove("prev");
      }
      if (currentSlide + 1 === parseInt(position)) {
        slide.classList.add("next");
      } else {
        slide.classList.remove("next");
      }
    });
  }

  function nextSlide() {
    if (currentSlide && currentSlide !== totalSlides) {
      currentSlide++;
    }
    setSlidePositions();
    if (sliderOptions.dots) {
      setDotPositions();
    }
  }

  function previousSlide(carousel) {
    if (currentSlide && currentSlide !== 1) {
      currentSlide--;
    }
    setSlidePositions();
    if (sliderOptions.dots) {
      setDotPositions();
    }
  }
}
