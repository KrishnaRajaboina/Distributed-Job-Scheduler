import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {

    return (

        <div className="container">

            <Sidebar />

            <div className="content">

                <Navbar />

                {children}

            </div>

        </div>

    );

}

export default Layout;