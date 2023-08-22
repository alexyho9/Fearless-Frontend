function createCard(name, description, pictureUrl) {
    return `
      <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if(!response.ok) {
            // figure out what to do

        } else {
            const data = await response.json();

            const columns = document.querySelectorAll('div.col')

            for (let i = 0; data.conferences.length; i++) {
                let counter = i % 3;
                const detailUrl = `http://localhost:8000${data.conferences[i].href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const html = createCard(title, description, pictureUrl);
                    // const column = document.querySelector('div.col');
                    columns[counter].innerHTML += html;
                }
            }


        }
    } catch (e) {
        console.error(e);
    }

});
