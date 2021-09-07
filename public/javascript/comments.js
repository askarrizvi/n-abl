async function commentFormHandler(event) {
  //event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  const tag = document.getElementById("tags").value;
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  var tag_id;

  if (tag == "geninfo") {
    tag_id = 1;
  }
  else if (tag == "humour") {
    tag_id = 2;
  }
  else if (tag == "media") {
    tag_id = 3;
  }
  console.log("hello");
  console.log(tag_id, post_id, comment_text);

  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text,
        tag_id 
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
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
