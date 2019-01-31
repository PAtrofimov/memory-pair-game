
class Game {
  constructor() {
    this.main = document.getElementById("parent");
    this.cards = [
      "img/head001.png",
      "img/head002.png",
      "img/head003.png",
      "img/head004.png",
      "img/head005.png",
      "img/head006.png",
      "img/head001.png",
      "img/head002.png",
      "img/head003.png",
      "img/head004.png",
      "img/head005.png",
      "img/head006.png"
    ];
  }
 
  addListeners() {
    this.main.addEventListener("click", event => {
      this.toggleCard(event.target);
      this.disableCards();
    });
  }
  
  makeElement (tagName, className, textInfo, srcInfo) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (textInfo) {
    element.textContent = textInfo;
  }
  if (srcInfo) {
    element.src = srcInfo;
  }
  return element;
};
  
  createContent(item) {
  const content = this.makeElement("div", "flip-box");
  const flipper = this.makeElement("div", "flipper");
  const flipper_front = this.makeElement("div", "flip-box__front");
  const flipper_back = this.makeElement("div", "flip-box__back");
  const image = this.makeElement("img", "flip-box__img", "", item);

  flipper_back.appendChild(image);
  flipper.appendChild(flipper_front);
  flipper.appendChild(flipper_back);
  content.appendChild(flipper);

  return content;
};

  sortCards() {
    this.cards.sort(() => {
      return 0.5 - Math.random();
    });
  }

  showCards() {
    const fragment = document.createDocumentFragment();
    this.cards.forEach(item => {
      fragment.appendChild(this.createContent(item));
    });
    this.main.appendChild(fragment);
  }

  toggleCard(element) {
    const activeCards = [...document.querySelectorAll(".active")];
    if (activeCards.length > 1) {
      activeCards.forEach(item => {
        item.classList.remove("active");
      });
    }
    if (element.classList.contains("flip-box")) {
      element.classList.toggle("active");
    }
  }

  disableCards() {
    if (this.sameCards()) {
      const activeElements = document.querySelectorAll(".active");
      [...activeElements].forEach(item => {
        item.classList.add("hidden");
      });
    }
  }

  sameCards() {
    const activeImageElements = document.querySelectorAll(".active .flip-box__img");
    const images = [...activeImageElements];
    return images.length === 2 && images[0].src === images[1].src;
  }

  init() {
    this.sortCards();
    this.showCards();
    this.addListeners();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.init();
});
