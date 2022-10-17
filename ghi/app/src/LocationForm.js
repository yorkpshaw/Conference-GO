import React from 'react';

class LocationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { states: [] };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRoomCountChange = this.handleRoomCountChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);

    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }
    handleRoomCountChange(event) {
        const value = event.target.value;
        this.setState({ roomCount: value })
    }
    handleCityChange(event) {
        const value = event.target.value;
        this.setState({ city: value })
    }
    handleStateChange(event) {
        const value = event.target.value;
        this.setState({ state: value })
    }

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
                        <form id="create-location-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleRoomCountChange} placeholder="Room count" required type="number" name="room_count" id="room_count" className="form-control" />
                                <label htmlFor="room_count">Room count</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleCityChange} placeholder="City" required type="text" name="city" id="city" className="form-control" />
                                <label htmlFor="city">City</label>
                            </div>
                            <div className="mb-3">
                                <select required onChange={this.handleStateChange} name="state" id="state" className="form-select">
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
