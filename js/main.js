const compoanyName = "specialCo",
  tagline = "We are a creative agency with a passion for design",
  selectors = {
    logo: document.querySelector(".logo"),
    landingPage: document.querySelector(".landing-page"),
    heading: document.querySelector(".landing-page .title"),
    parapraph: document.querySelector(".landing-page .description"),
    btn: document.querySelector(".intro .btn"),
  };

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
];
let slide;
let activeSlide = 0;

function renderSlider() {
  slide = sliders[activeSlide];
  selectors.landingPage.style.backgroundImage = `url(./images/${slide.img})`;
  selectors.heading.innerHTML = slide.heading;
  selectors.parapraph.innerHTML = slide.parapraph;
  selectors.btn.innerHTML = slide.btn.title;
  selectors.btn.href = slide.btn.href;
}
function init() {
  selectors.logo.innerHTML = compoanyName;
  document.title = `${compoanyName} - ${tagline}`;
  renderSlider();
  setInterval(() => {
    activeSlide++;
    if (activeSlide == sliders.length) {
      activeSlide = 0;
    }
    renderSlider();
  }, 3000);
}

// *** Hide loader when everything is loaded *** //
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    console.log("readyState");
    init();
  }
};
