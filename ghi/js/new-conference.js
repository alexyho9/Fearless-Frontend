window.addEventListener('DOMContentLoaded', async () => {

    const url = "http://localhost:8000/api/locations/"

    const locationResponse = await fetch(url);

    if (locationResponse.ok) {

        const data = await locationResponse.json();

        const selectTag = document.querySelector('#location')

        for (let location of data.locations) {
            const optionTag = document.createElement('option');
            optionTag.value = location.id;
            optionTag.innerHTML = location.name;
            selectTag.appendChild(optionTag);
        }
    }

    const formTag = document.getElementById('create-conference-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(formTag);

        const json = JSON.stringify(Object.fromEntries(formData));

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const conferenceResponse = await fetch(conferenceUrl, fetchConfig);
        if (conferenceResponse.ok) {
            formTag.reset();
            const newConference = await conferenceResponse.json();
        }
    });

})
