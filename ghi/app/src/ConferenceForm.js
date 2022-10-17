import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            max_presentations: '',
            max_attendees: '',
            location: '',
            locations: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartsChange = this.handleStartsChange.bind(this);
        this.handleEndsChange = this.handleEndsChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxPresentationsChange = this.handleMaxPresentationsChange.bind(this);
        this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
        this.handleLocationsChange = this.handleLocationsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.room_count = data.roomCount;
        delete data.roomCount;

        const locationUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();

            const cleared = {
                name: '',
                starts: '',
                ends: '',
                description: '',
                max_presentations: '',
                max_attendees: '',
                locations: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    };
    handleStartsChange(event) {
        const value = event.target.value;
        this.setState({ starts: value })
    };
    handleEndsChange(event) {
        const value = event.target.value;
        this.setState({ ends: value })
    };
    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({ description: value })
    };
    handleMaxPresentationsChange(event) {
        const value = event.target.value;
        this.setState({ max_presentations: value })
    };
    handleMaxAttendeesChange(event) {
        const value = event.target.value;
        this.setState({ max_attendees: value })
    };
    handleLocationsChange(event) {
        const value = event.target.value;
        this.setState({ location: value })
    };

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ locations: data.locations });
            console.log(this.state.locations)
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new conference</h1>
                        <form onSubmit={this.handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleStartsChange} value={this.state.starts} placeholder="Start date" name="starts" type="date" id="starts" className="form-control" />
                                <label htmlFor="starts">Start date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEndsChange} value={this.state.ends} placeholder="End date" name="ends" type="date" id="ends" className="form-control" />
                                <label htmlFor="ends">End date</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label"></label>
                                <textarea onChange={this.handleDescriptionChange} className="form-control" placeholder="Description" id="description" rows="3"></textarea>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleMaxPresentationsChange} value={this.state.max_presentations} placeholder="Maximum presentations" name="max_presentations" required type="number" id="max_presentations" className="form-control" />
                                <label htmlFor="room_count">Maximum presentations</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleMaxAttendeesChange} value={this.state.max_attendees} placeholder="Maximum attendees" name="max_attendees" required type="number" id="max_attendees" className="form-control" />
                                <label htmlFor="room_count">Maximum attendees</label>
                            </div>
                            <div className="mb-3">
                                <select required onChange={this.handleLocationsChange} id="location" name="location" className="form-select">
                                    <option value="">Choose a location</option>
                                    {this.state.locations.map(location => {
                                        return (
                                            <option key={location.id} value={location.name}>
                                                {location.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div >
            </div >

        );
    }
}
export default ConferenceForm;
