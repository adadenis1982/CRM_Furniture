const table = document.querySelector("#order");

table.addEventListener("click", async (event) => {
  if (event.target.classList.contains("deleteButton")) {
    const response = await fetch(`/order/${event.target.dataset.entryid}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.delete) {
      window.location = "/order";
    }
  }

  if (event.target.classList.contains("editButton")) {
    const response = await fetch(`/order/edit/${event.target.dataset.entryid}`);

    if (response.status === 200) {
      window.location = `/order/edit/${event.target.dataset.entryid}`;
    }
  }
});
