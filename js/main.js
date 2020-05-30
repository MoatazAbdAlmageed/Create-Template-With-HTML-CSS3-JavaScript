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
    colorsHolder: document.getElementById("colors-holder"),

    /**
     * Settings
     */
    settingBox: document.querySelector(".setting-box"),
    toggle: document.querySelector(".setting-box .toggle"),
  };
let slide;
let activeSlide = 0;

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
  const { logo, settingBox, toggle, colorsHolder, landingPage } = elements;
  document.documentElement.style.setProperty("--main-color", colors[0]);

  logo.innerHTML = compoanyName;
  document.title = `${compoanyName} - ${tagline}`;
  renderSlider();
  setInterval(() => {
    activeSlide++;
    if (activeSlide == sliders.length) {
      activeSlide = 0;
    }
    renderSlider();
  }, 3000);

  toggle.onclick = function () {
    settingBox.classList.toggle("opened");
    toggle.querySelector(".fa-gear").classList.toggle("fa-spin");
  };
  landingPage.onclick = function () {
    settingBox.classList.remove("opened");
  };

  for (let index = 0; index < colors.length; index++) {
    var color = document.createElement("LI");
    color.setAttribute("data-color", colors[index]);
    color.style.backgroundColor = colors[index];
    colorsHolder.appendChild(color);

    color.addEventListener("click", function (event) {
      var siblings = this.parentNode.childNodes;

      for (let index = 0; index < siblings.length; index++) {
        siblings[index].classList.remove("selected");
      }
      siblings[index].classList.add("selected");
      document.documentElement.style.setProperty(
        "--main-color",
        event.target.dataset.color
      );
    });
  }

  colorsHolder.querySelectorAll("li")[0].classList.add("selected");
}

// *** Hide loader when everything is loaded *** //
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    console.log("readyState");
    init();
  }
};
