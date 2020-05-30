const compoanyName = "specialCo",
  tagline = "We are a creative agency with a passion for design",
  colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#cddc39",
    "#ffeb3b",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#9e9e9e",
    "#607d8b",
  ],
  sliders = [
    {
      img: "web.jpg",
      heading: "<span>Website</span> Design",
      parapraph:
        "Having a unique website design is important part of the branding and marketing process of your business",
      btn: {
        title: "startups",
        href: "#startups",
      },
    },
    {
      img: "wd.jpg",
      heading: "<span>Web</span> Development",
      parapraph:
        "Our new fangled approach to Website Development is directed creating and building deep love for your website",
      btn: {
        title: "Companies",
        href: "#Companies",
      },
    },
    {
      img: "seo.jpeg",
      heading: "<span>SEO</span> Optimization",
      parapraph:
        "Obtain top rankings for desired search terms and drive qualified leads that are crucial to building your business",
      btn: {
        title: "startups",
        href: "#startups",
      },
    },
    {
      img: "om.jpeg",
      heading: "<span>Online</span> Marketing",
      parapraph:
        "Our specialized marketing teams work to increase your conversions, repeat traffic, and expand your online visibility",
      btn: {
        title: "Any",
        href: "#Any",
      },
    },
  ],
  elements = {
    logo: document.querySelector(".logo"),
    landingPage: document.querySelector(".landing-page"),
    heading: document.querySelector(".landing-page .title"),
    parapraph: document.querySelector(".landing-page .description"),
    btn: document.querySelector(".intro .btn"),
    colorsList: document.getElementById("colors-list"),
    fontsList: document.getElementById("fonts-list"),
    sizesList: document.getElementById("sizes-list"),
    slideSpeed: document.getElementById("slide-speed"),

    /**
     * Settings
     */
    settingBox: document.querySelector(".setting-box"),
    toggle: document.querySelector(".setting-box .toggle"),
  };
let slide;
let activeSlide = 0;
let speed = 3;
let font;
let size;
let sliderInterval;

function renderSlider() {
  const { landingPage, heading, parapraph, btn } = elements;
  slide = sliders[activeSlide];
  landingPage.style.backgroundImage = `url(./images/${slide.img})`;
  heading.innerHTML = slide.heading;
  parapraph.innerHTML = slide.parapraph;
  btn.innerHTML = slide.btn.title;
  btn.href = slide.btn.href;
}

function init() {
  const {
    logo,
    settingBox,
    toggle,
    colorsList,
    fontsList,
    sizesList,
    landingPage,
    slideSpeed,
  } = elements;
  document.documentElement.style.setProperty("--main-color", colors[0]);

  logo.innerHTML = compoanyName;
  document.title = `${compoanyName} - ${tagline}`;
  renderSlider();

  /**
   * Bind localsotage
   */
  speed = localStorage.getItem("speed") ? localStorage.getItem("speed") : speed;
  font = localStorage.getItem("selected_font");
  size = localStorage.getItem("selected_size");

  slideSpeed.value = speed;
  sliderInterval = setInterval(() => {
    activeSlide++;
    if (activeSlide == sliders.length) {
      activeSlide = 0;
    }
    renderSlider();
  }, speed * 1000);

  if (font) {
    document.documentElement.style.setProperty("--font-family", font);

    fontsList.querySelectorAll("option").forEach((item) => {
      if (item.value == font) {
        item.setAttribute("selected", "selected");
        item.setAttribute("disabled", "disabled");
      }
    });
  }

  if (size) {
    document.documentElement.style.setProperty("--font-size", size);

    sizesList.querySelectorAll("option").forEach((item) => {
      if (item.value == size) {
        item.setAttribute("selected", "selected");
        item.setAttribute("disabled", "disabled");
      }
    });
  }

  toggle.onclick = function () {
    settingBox.classList.toggle("opened");
    toggle.querySelector(".fa-gear").classList.toggle("fa-spin");
  };
  landingPage.onclick = function () {
    settingBox.classList.remove("opened");
    toggle.querySelector(".fa-gear").classList.remove("fa-spin");
  };

  slideSpeed.onchange = function (event) {
    speed = event.target.value;

    localStorage.setItem("speed", speed);

    clearInterval(sliderInterval);

    sliderInterval = setInterval(() => {
      activeSlide++;
      if (activeSlide == sliders.length) {
        activeSlide = 0;
      }
      renderSlider();
    }, speed * 1000);
  };

  fontsList.onchange = function (event) {
    font = event.target.value;

    localStorage.setItem("selected_font", font);

    event.target.parentElement
      .querySelectorAll('[selected="selected"]')
      .forEach((item) => {
        item.removeAttribute("selected", "selected");
        item.removeAttribute("disabled", "disabled");
      });

    event.target
      .querySelector(`[value="${font}"]`)
      .setAttribute("selected", "selected");
    event.target
      .querySelector(`[value="${font}"]`)
      .setAttribute("disabled", "disabled");

    document.documentElement.style.setProperty("--font-family", font);
    localStorage.setItem("selected_font", font);
  };

  sizesList.onchange = function (event) {
    size = event.target.value;

    localStorage.setItem("selected_size", size);

    event.target.parentElement
      .querySelectorAll('[selected="selected"]')
      .forEach((item) => {
        item.removeAttribute("selected", "selected");
        item.removeAttribute("disabled", "disabled");
      });

    event.target
      .querySelector(`[value="${size}"]`)
      .setAttribute("selected", "selected");
    event.target
      .querySelector(`[value="${size}"]`)
      .setAttribute("disabled", "disabled");

    document.documentElement.style.setProperty("--font-size", size);
    localStorage.setItem("selected_size", size);
  };

  for (let index = 0; index < colors.length; index++) {
    var color = document.createElement("LI");
    color.setAttribute("data-color", colors[index]);
    color.style.backgroundColor = colors[index];
    colorsList.appendChild(color);

    color.addEventListener("click", function (event) {
      let color = event.target.dataset.color;
      var siblings = event.target.parentElement.querySelectorAll(".active");

      siblings.forEach((element) => {
        element.classList.remove("active");
      });

      event.target.classList.add("active");
      document.documentElement.style.setProperty("--main-color", color);
      localStorage.setItem("selected_color", JSON.stringify({ color, index }));
    });
  }
  const selectedColor = localStorage.getItem("selected_color");
  if (selectedColor) {
    var obj = JSON.parse(selectedColor);
    document.documentElement.style.setProperty("--main-color", obj.color);
    colorsList.querySelectorAll("li")[obj.index].classList.add("active");
  } else {
    colorsList.querySelectorAll("li")[0].classList.add("active");
  }
}

// *** Hide loader when everything is loaded *** //
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    console.log("readyState");
    init();
  }
};
