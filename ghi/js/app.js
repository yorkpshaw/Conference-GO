function createCard(name, description, pictureUrl, startDate, endDate, locationName) {
    return `

      <div class="card mb-5 shadow">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class = "card-footer">
        <small class = "text-muted">${startDate} - ${endDate} </small>
        </div>
      </div>
    `;
}


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Figure out what to do when the response is bad
        } else {
            const data = await response.json();

            for (let i in data.conferences) {
                const conference = data.conferences[i];
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const startDate = new Date(details.conference.starts).toLocaleDateString();
                    const endDate = new Date(details.conference.ends).toLocaleDateString();
                    const locationName = details.conference.location.name
                    const html = createCard(title, description, pictureUrl, startDate, endDate, locationName);
                    const column = document.querySelectorAll('.col');
                    column[i % 3].innerHTML += html;
                    console.log(details)
                }
            }

        }
    } catch (e) {
        console.error(e);
        // Figure out what to do if an error is raised
    }

});
