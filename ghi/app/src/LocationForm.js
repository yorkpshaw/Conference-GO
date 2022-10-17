import React from 'react';

class LocationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            roomCount: '',
            city: '',
            states: []
        };
        this.state = { states: [] };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRoomCountChange = this.handleRoomCountChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.room_count = data.roomCount;
        delete data.roomCount;
        delete data.states;
        console.log(data);

        const locationUrl = 'http://localhost:8000/api/locations/';
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
            console.log(newLocation);

            const cleared = {
                name: '',
                roomCount: '',
                city: '',
                state: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    };
    handleRoomCountChange(event) {
        const value = event.target.value;
        this.setState({ roomCount: value })
    };
    handleCityChange(event) {
        const value = event.target.value;
        this.setState({ city: value })
    };
    handleStateChange(event) {
        const value = event.target.value;
        this.setState({ state: value })
    };



    async componentDidMount() {
        const url = 'http://localhost:8000/api/states/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ states: data.states });


            //         const selectTag = document.getElementById('state');
            //         for (let state of data.states) {
            //             const option = document.createElement('option');
            //             option.value = state.abbreviation;
            //             option.innerHTML = state.name;
            //             selectTag.appendChild(option);
        }
    }



    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new location</h1>
                        <form onSubmit={this.handleSubmit} id="create-location-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name}
                                    placeholder="Name" required type="text" name="{name}" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleRoomCountChange} value={this.state.roomCount} placeholder="Room count" required type="number" name="room_count" id="room_count" className="form-control" />
                                <label htmlFor="room_count">Room count</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleCityChange} value={this.state.city} placeholder="City" required type="text" name="city" id="city" className="form-control" />
                                <label htmlFor="city">City</label>
                            </div>
                            <div className="mb-3">
                                <select required onChange={this.handleStateChange} value={this.state.state} name="state" id="state" className="form-select">
                                    <option value="">Choose a state</option>
                                    {this.state.states.map(state => {
                                        return (
                                            <option key={state.abbreviation} value={state.abbreviation}>
                                                {state.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default LocationForm;
