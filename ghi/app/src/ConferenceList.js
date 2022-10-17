function ConferenceList(props) {
    return (
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Conference</th>
                </tr>
            </thead>
            <tbody>
                {props.conferences.map(conference => {
                    return (
                        <tr key={conference.name}>
                            <td>{conference.starts}</td>
                            <td>{conference.ends}</td>
                            <td>{conference.description}</td>
                            <td>{conference.max_presentations}</td>
                            <td>{conference.max_attendees}</td>
                            <td>{conference.location}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ConferenceList;
