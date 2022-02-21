const formNewOrder = document.querySelector('#formNewOrder');
const feedbackOrder = document.querySelector('#feedbackOrder');

formNewOrder.addEventListener('submit', async (event) => {
  event.preventDefault();
  const response = await fetch('/order/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: event.target.email.value,
      status: event.target.status.value,
      number: event.target.number.value,
      delivery_price: event.target.delivery_price.value,
      assembly_price: event.target.assembly_price.value,
      type: event.target.type.value,
      price: event.target.price.value,
      title: event.target.title.value,
      com: event.target.com.value,
    }),
  });

  const data = await response.json();

  if (data.create) {
    window.location = '/order';
  } else {
    feedbackOrder.textContent = data.message;
    feedbackOrder.style.display = 'block';
  }
});
