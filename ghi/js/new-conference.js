window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/locations/';

    let response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        const selectTag = document.getElementById('location');

        for (let location of data.locations) {
            let option = document.createElement('option')
            option.value = location.id
            option.innerHTML = location.name
            selectTag.appendChild(option)
        }
    }

    const formTag = document.getElementById('create-conference-form');
    formTag.addEventListener('submit', async (event) => {
        console.log(formTag)
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const conferenceURL = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "POST",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        response = await fetch(conferenceURL, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newConference = await response.json();
            console.log(newConference)
        }
    });
});
