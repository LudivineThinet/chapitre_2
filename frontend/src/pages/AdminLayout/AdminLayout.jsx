import { Link, Outlet, Navigate } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  // 🔒 protection accès
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout">
      {/* ===== Sidebar ===== */}
      <aside className="admin-sidebar">
        <h2>Admin</h2>

        <nav>
          <Link to="/admin/buybacks">Demandes de rachat</Link>
          <Link to="/admin/orders">Commandes</Link>
          <Link to="/admin/books">Livres</Link>
          <Link to="/admin/stock">Exemplaires</Link>
          <Link to="/">Retour au site</Link>
        </nav>
      </aside>

      {/* ===== Contenu ===== */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;