function createCard(name, description, venue, pictureUrl, s, e) {
    return `
      <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${venue}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
            ${s.getMonth()}/${s.getDate()}/${s.getFullYear()} - ${e.getMonth()}/${e.getDate()}/${e.getFullYear()}
        </div>
      </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if(!response.ok) {
            const errorMessage = `
                <div class="alert alert-info" role="alert">
                    Warning: Invalid URL
                </div>`;
            const errorContainer = document.createElement("div");
            errorContainer.innerHTML = errorMessage;
            // does not work yet
            document.body.header.insertAdjacentHTML('beforebegin', errorContainer);

        } else {
            const data = await response.json();

            const columns = document.querySelectorAll('div.col')

            for (let i = 0; data.conferences.length; i++) {
                let counter = i % 3;
                const detailUrl = `http://localhost:8000${data.conferences[i].href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const venue = details.conference.location.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const startDate = new Date(details.conference.starts);
                    const endDate = new Date(details.conference.ends);
                    const html = createCard(name, description, venue, pictureUrl, startDate, endDate);
                    // const column = document.querySelector('div.col');
                    columns[counter].innerHTML += html;
                }
            }


        }
    } catch (e) {
        console.error(e);
    }

});
