import React from 'react';

class PresentationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            company_name: '',
            title: '',
            synopsis: '',
            conference: '',
            conferences: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeSynopsis = this.handleChangeSynopsis.bind(this);
        this.handleChangeConference = this.handleChangeConference.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            this.setState({ conferences: data.conferences })
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.conferences;

        let conferenceHref = this.state.conference
        const presentationURL = `http://localhost:8000/api/conferences/${conferenceHref}/presentations`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationURL, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json();
            this.setState({
                name: '',
                email: '',
                company_name: '',
                title: '',
                synopsis: '',
                conference: '',
            });
        }
    }

    handleChangeName(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }
    handleChangeEmail(event) {
        const value = event.target.value;
        this.setState({ email: value });
    }
    handleChangeCompanyName(event) {
        const value = event.target.value;
        this.setState({ company_name: value });
    }
    handleChangeTitle(event) {
        const value = event.target.value;
        this.setState({ title: value });
    }
    handleChangeSynopsis(event) {
        const value = event.target.value;
        this.setState({ synopsis: value });
    }
    handleChangeConference(event) {
        const value = event.target.value;
        this.setState({ conference: value });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new presentation</h1>
                        <form onSubmit={this.handleSubmit} id="create-presentation-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeName} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                                <label htmlFor="presenter_name">Presenter name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeEmail} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" />
                                <label htmlFor="presenter_email">Presenter email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeCompanyName} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" />
                                <label htmlFor="company_name">Company name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeTitle} placeholder="Title" required type="text" name="title" id="title" className="form-control" />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="synopsis">Synopsis</label>
                                <textarea onChange={this.handleChangeSynopsis} className="form-control" id="synopsis" rows="3" name="synopsis"></textarea>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChangeConference} required name="conference" id="conference" className="form-select">
                                    <option value="">Choose a conference</option>
                                    {this.state.conferences.map(conference => {
                                        return (
                                            <option key={conference.href} value={conference.href}>
                                                {conference.name}
                                            </option>
                                        )
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

export default PresentationForm;
