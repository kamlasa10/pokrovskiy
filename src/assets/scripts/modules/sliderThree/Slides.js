const createEleWithClass = (tag, className) => {
  const ele = document.createElement(tag);
  ele.className = className;
  return ele;
};
const createImgWithClass = (tag, className, src) => {
  const ele = document.createElement(tag);
  ele.className = className;
  ele.src = src;
  return ele;
};

class Slides {
  constructor(data) {
    this.data = data;
    this.container = createEleWithClass("div", "sliderThree__slides");
    this.currentIdx = 0;
    this.slides = this.data.map((entry, index) => {
      const slide = createEleWithClass("div", "sliderThree__slide");
      const title = createEleWithClass("h1", "sliderThree__slide-title");
      const meta = createEleWithClass("p", "sliderThree__slide-meta");
      const more = createEleWithClass("a", "sliderThree__slide-more");

      more.href = entry.href;
      slide.classList.add(index !== 0 ? "sliderThree__next" : "sliderThree__show-meta");
      meta.innerHTML = entry.meta;
      title.innerHTML = entry.title;
      more.innerHTML = entry.button;
      slide.appendChild(meta);
      slide.appendChild(title);
      slide.appendChild(more);
      this.container.appendChild(slide);
      // slide.appendChild(bg);
      return slide;
    });
    document.getElementById('sliderThree').appendChild(createEleWithClass("div", "sliderThree__slide-bg"));
    // document.getElementById('sliderThree').appendChild(createImgWithClass("img", "sliderThree__slide-bg-house", '/wp-content/themes/pokrovsky/assets/images/main/house.svg'));
  }

  mount(container) {
    container.appendChild(this.container);
  }

  onActiveIndexChange(activeIndex) {
    this.currentIdx = activeIndex;
    for (let i = 0; i < this.slides.length; i++) {
      if (activeIndex === i) {
        this.slides[i].classList.remove("sliderThree__next");
        this.slides[i].classList.remove("sliderThree__prev");
      } else {
        if (activeIndex > i) {
          this.slides[i].classList.remove("sliderThree__next");
          this.slides[i].classList.add("sliderThree__prev");
        } else {
          this.slides[i].classList.add("sliderThree__next");
          this.slides[i].classList.remove("sliderThree__prev");
        }
      }
    }
  }
  onMove(indexFloat) {
    this.container.style.transform = `translateY(${(indexFloat * 100) /
      this.slides.length}%)`;
  }
  appear() {
    this.container.classList.add("sliderThree__scrolling");
    this.slides[this.currentIdx].classList.remove("sliderThree__show-meta");
  }
  disperse(activeIndex) {
    //this.currentIdx = activeIndex;
    this.slides[this.currentIdx].classList.add("sliderThree__show-meta");
    this.container.classList.remove("sliderThree__scrolling");
    for (let index = 0; index < this.data.length; index++) {
      if (index > activeIndex) {
        this.slides[index].classList.add("sliderThree__next");
        this.slides[index].classList.remove("sliderThree__prev");
      } else if (index < activeIndex) {
        this.slides[index].classList.remove("sliderThree__next");
        this.slides[index].classList.add("sliderThree__prev");
      } else {
        this.slides[index].classList.remove("sliderThree__next");
        this.slides[index].classList.remove("sliderThree__prev");
      }
    }
  }
}

export { Slides };
