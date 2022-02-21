const formNew = document.querySelector('#formNew');
const feedback = document.querySelector('#feedback');

formNew.addEventListener('submit', async (event) => {
  event.preventDefault();

  console.log(event.target.firstname.value);

  const response = await fetch('/client/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      email: event.target.email.value,
      address: event.target.address.value,
      comment: event.target.comment.value,
    }),
  });

  const data = await response.json();

  if (data.create) {
    window.location = '/client';
  } else {
    feedback.textContent = data.message;
    feedback.style.display = 'block';
  }
});
