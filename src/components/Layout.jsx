import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="relative">
        {children}
      </main>
    </div>
  );
}

export default Layout;