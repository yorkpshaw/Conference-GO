

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Conference GO!</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="new-location.html">New location</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="new-conference.html">New conference</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search conferences" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                        <a className="btn btn-primary" href="attend-conference.html">Attend!</a>
                    </form>
                </div>
            </div>
        </nav>);
}

export default Nav;
