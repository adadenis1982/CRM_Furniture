const table = document.querySelector('#order');

table.addEventListener('click', async (event) => {
  if (event.target.classList.contains('deleteButton')) {
    const response = await fetch(`/client/order/${event.target.dataset.entryid}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (data.delete) {
      window.location = '/client';
    }
  }

  if (event.target.classList.contains('editButton')) {
    const response = await fetch(`/client/order/edit/${event.target.dataset.entryid}`);

    if (response.status === 200) {
      window.location = `/client/order/edit/${event.target.dataset.entryid}`;
    }
  }
});
