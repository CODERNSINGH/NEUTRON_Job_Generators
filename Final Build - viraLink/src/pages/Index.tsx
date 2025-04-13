
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <DashboardOverview />
        </main>
      </div>
    </div>
  );
};

export default Index;
