const formEditOrder = document.querySelector('#formEditOrder');
const feedbackOrder = document.querySelector('#feedbackOrder');

formEditOrder.addEventListener('submit', async (event) => {
  event.preventDefault();

  const response = await fetch(`${event.target.action}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: event.target.action.split('http://localhost:4000/client/order/edit/')[1],
      status: event.target.status.value,
      number: event.target.number.value,
      delivery_price: event.target.delivery_price.value,
      assembly_price: event.target.assembly_price.value,
      type: event.target.type.value,
      price: event.target.price.value,
      title: event.target.title.value,
      comment: event.target.comment.value,
    }),
  });

  const data = await response.json();
  if (data.update) {
    window.location = '/client';
  } else {
    feedbackOrder.textContent = data.message;
    feedbackOrder.style.display = 'block';
  }
});
