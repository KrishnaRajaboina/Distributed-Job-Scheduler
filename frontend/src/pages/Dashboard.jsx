import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {

    const [metrics, setMetrics] = useState({
        totalJobs: 0,
        completedJobs: 0,
        failedJobs: 0,
        activeWorkers: 0,
    });

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {

        try {

            const res = await api.get("/metrics");

            setMetrics({
                totalJobs: res.data.jobs.total,
                completedJobs: res.data.jobs.completed,
                failedJobs: res.data.jobs.failed,
                activeWorkers: res.data.workers.active
            });

        } catch (err) {
            console.log(err);
        }

    };

    return (
        <Layout>

            <h2>Dashboard</h2>

            <div className="dashboard-grid">

                <DashboardCard
                    title="Total Jobs"
                    value={metrics.totalJobs}
                />

                <DashboardCard
                    title="Completed Jobs"
                    value={metrics.completedJobs}
                />

                <DashboardCard
                    title="Failed Jobs"
                    value={metrics.failedJobs}
                />

                <DashboardCard
                    title="Active Workers"
                    value={metrics.activeWorkers}
                />

            </div>

        </Layout>
    );

}

export default Dashboard;