import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;