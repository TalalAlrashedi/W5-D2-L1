let container = document.getElementById("container");
let username = document.getElementById("username");
let text = document.getElementById("text");
let submitBtn = document.getElementById("submitBtn");
let imagePost = document.getElementById("image-url");

submitBtn.addEventListener("click", () => {
  fetch("https://68219a1b259dad2655afc217.mockapi.io/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      textarea: text.value,
      img: imagePost.value,
    }),
  }).then(() => {
    location.reload();
  });
});

fetch("https://68219a1b259dad2655afc217.mockapi.io/api/post")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      let postDiv = document.createElement("div");
      postDiv.className = "post-card";
      let usernameDiv = document.createElement("h4");
      let textDiv = document.createElement("p");
      let image = document.createElement("img");
      let deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger";

      deleteBtn.addEventListener("click", () => {
        fetch(
          `https://68219a1b259dad2655afc217.mockapi.io/api/post/${element.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(() => {
          postDiv.remove();
        });
      });

      usernameDiv.innerText = element.username;
      textDiv.innerText = element.textarea;
      image.src = element.img;
      //   image.style.width = "200px";
      deleteBtn.innerText = "Delete";

      postDiv.appendChild(usernameDiv);
      postDiv.appendChild(textDiv);
      postDiv.appendChild(image);
      postDiv.appendChild(deleteBtn);

      container.appendChild(postDiv);
    });
  });
