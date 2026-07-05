import { Link } from "react-router-dom";

function Sidebar() {

    return (
        <div className="sidebar">

            <h2>Scheduler</h2>

            <nav>

                <Link to="/">Dashboard</Link>

                <Link to="/jobs">Jobs</Link>

                <Link to="/workers">Workers</Link>

                <Link to="/queues">Queues</Link>

                <Link to="/metrics">Metrics</Link>

            </nav>

        </div>
    );

}

export default Sidebar;