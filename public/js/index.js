const form = document.querySelector('#formLogin');
const feedback = document.querySelector('#feedback');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {
    name: { value: name },
    password: { value: password },
  } = event.target;

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  });

  const data = await response.json();

  if (data.login) {
    window.location = '/client';
  } else {
    feedback.textContent = data.message;
    feedback.style.display = 'block';
  }
});
