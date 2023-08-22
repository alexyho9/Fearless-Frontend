window.addEventListener('DOMContentLoaded', async () => {
    const url = "http://localhost:8000/api/states/"

    const state_response = await fetch(url);
    if (state_response.ok) {
        const data = await state_response.json();

        const selectTag = document.querySelector('#state');
        for (let state of data.states) {
            // Create an 'option' element
            const optionTag = document.createElement('option');
            // Set the '.value' property of the option element to the
            // state's abbreviation
            optionTag.value = state.abbreviation;
            // Set the '.innerHTML' property of the option element to
            // the state's name
            optionTag.innerHTML = state.name;
            // Append the option element as a child of the select tag
            selectTag.appendChild(optionTag);
        }
    }

    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const location_response = await fetch(locationUrl, fetchConfig);
        if (location_response.ok) {
            formTag.reset();
            const newLocation = await location_response.json();
        }
    });


})


