const table = document.querySelector('#client');
const feedback = document.querySelector('#feedback');

table.addEventListener('click', async (event) => {
  if (event.target.classList.contains('deleteButton')) {
    console.log(event.target.dataset.entryid);

    const response = await fetch(`/client/${event.target.dataset.entryid}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (data.delete) {
      window.location = '/client';
    }
  }

  if (event.target.classList.contains('editButton')) {
    console.log(event.target.dataset.entryid);

    const response = await fetch(
      `/client/edit/${event.target.dataset.entryid}`,
    );

    if (response.status === 200) {
      window.location = `/client/edit/${event.target.dataset.entryid}`;
    };
  }

  if (event.target.classList.contains('orderButton')) {
    console.log(event.target.dataset.entryid);

    const response = await fetch(
      `/client/order/${event.target.dataset.entryid}`,
    );

    if (response.status === 200) {
      window.location = `/client/order/${event.target.dataset.entryid}`;
    } else {
      feedback.textContent = 'У клиента еще нет заказов';
      feedback.style.display = 'block';
    }
  }
});
