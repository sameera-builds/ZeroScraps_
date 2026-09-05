import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-surface text-text">
      <Navbar />

      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;