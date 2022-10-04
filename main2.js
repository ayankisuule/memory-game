const model = document.getElementById("post_model");
model.parentElement.removeChild(model);

const posts = [
  {
    id: 0,
    title: "a note",
    body: "some text",
    image:
      "https://images.unsplash.com/photo-1606491048802-8342506d6471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  },
  {
    id: 1,
    title: "another note",
    body: "some more text",
    image:
      "https://images.unsplash.com/photo-1601373879104-b4290a56b691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  },
  {
    id: 2,
    title: "a third note",
    body: "and yet some text",
    image:
      "https://images.unsplash.com/photo-1608032364895-0da67af36cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  },
  {
    id: 3,
    title: "cat",
    body: "and yet some cats",
    image:
      "https://images.unsplash.com/photo-1613318282885-2168d00a8d2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const updaters = [];

const makePost = ({ id, title, body, image }) => {
  if (updaters[id]) {
    updaters[id](title, body, image);
  } else {
    const element = model.cloneNode(true);
    const h1 = element.getElementsByTagName("h1")[0];
    const p = element.getElementsByTagName("p")[0];
    const img = element.getElementsByTagName("img")[0];
    h1.innerHTML = title;
    p.innerHTML = body;
    img.innerHTML = image;
    img.setAttribute("src", image);
    document.getElementById("app").appendChild(element);
    const update = (title, body, image) => {
      if (h1.innerHTML !== title) {
        h1.innerHTML = title;
      }
      if (p.innerHTML !== body) {
        p.innerHTML = body;
      }
      if (img.innerHTML !== image) {
        img.innerHTML = image;
      }
    };
    updaters.unshift(update);
  }
};

// loading state
const get = () =>
  new Promise((ok) => {
    setTimeout(() => ok({ posts }), 500);
  });

const root = document.getElementById("root");

const refresh = async () => {
  root.classList.add("loading");
  try {
    const data = await get();
    data.posts.forEach(makePost);
  } catch (e) {
    console.error(e);
  }
  root.classList.remove("loading");
};
/////////////////////////////////////

document.getElementById("create").addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = evt.target.post_title.value;
  const body = evt.target.post_body.value;
  const image = evt.target.post_image.value;
  evt.target.post_title.value = "";
  evt.target.post_body.value = "";
  evt.target.post_image.value = "";
  if (!title || !body || !image) {
   return
  }
  const post = { id: posts.length, title, body, image };
  posts.push(post);
  refresh();
});

document.getElementById("button").addEventListener("click", refresh);

refresh();
