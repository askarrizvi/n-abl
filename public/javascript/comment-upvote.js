async function upvoteClickHandler(event) {
  event.preventDefault();

  const id = this.id;
  const response = await fetch('/api/comments/upvote', {
    method: 'PUT',
    body: JSON.stringify({
      comment_id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

buttons = document.getElementsByClassName("cupvote-btn");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", upvoteClickHandler);
}