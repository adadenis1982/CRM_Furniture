const formEdit = document.querySelector('#formEdit');
const feedback = document.querySelector('#feedback');

formEdit.addEventListener('submit', async (event) => {
  event.preventDefault();

  console.log(event.target.comment.value);

  const response = await fetch(`${event.target.action}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment: event.target.comment.value,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      email: event.target.email.value,
      address: event.target.address.value,
    }),
  });

  const data = await response.json();

  if (data.update) {
    window.location = '/client';
  } else {
    feedback.textContent = data.message;
    feedback.style.display = 'block';
  }
});
