window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    let response = await fetch(url);
    if (response.ok) {
        const data = await response.json();

        for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }

        selectTag.classList.remove('d-none');
        const spinner = document.getElementById('loading-conference-spinner');
        spinner.classList.add('d-none')

    }

    const formTag = document.getElementById('create-attendee-form');
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formTag);
        console.log(formData)
        const json = JSON.stringify(Object.fromEntries(formData));

        const attendeeURL = 'http://localhost:8001/api/attendees/';
        const fetchConfig = {
            method: "POST",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        response = await fetch(attendeeURL, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newAttendee = await response.json();
            const successTag = document.getElementById('success-message');
            successTag.classList.remove('d-none');
            formTag.classList.add('d-none')
        }
    });
});
