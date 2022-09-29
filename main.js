const model = document.getElementById("image-meme");
model.parentElement.removeChild(model);

const memes = [
    {id: 0, upper: "Very cold", lower:"canada"},
    {id: 1, upper: "curb", lower:"enthusiasm"},
    {id: 2, upper: "Arsenal fans", lower:"3-1"}
];

const updaters = [];

const makePost = ({ id, upper, lower }) => {
    if (updaters[id]) {
      updaters[id](upper, lower);
    } else {
      const element = model.cloneNode(true);
      const h3 = element.getElementsByTagName("h3")[0];
      const h3_2 = element.getElementsByTagName("h3")[0];
      h3.innerHTML = upper;
      h3_2.innerHTML = lower;
      document.getElementById("app").appendChild(element);
      const update = (title, body) => {
        if (h1.innerHTML !== title) {
          h1.innerHTML = title;
        }
        if (p.innerHTML !== body) {
          p.innerHTML = body;
        }
      };
      updaters.push(update);
    }
  };

