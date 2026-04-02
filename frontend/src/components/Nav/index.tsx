import { NavLink } from "react-router-dom";

export function Nav() {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link fw-semibold nav-custom-link ${isActive ? "active" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold text-success fs-2 d-flex align-items-center gap-2" to="/">
          <span>🎬</span>
          <span>CineWeb</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCinema"
          aria-controls="navbarCinema"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCinema">
          <ul className="navbar-nav ms-auto gap-lg-3">
            <li className="nav-item">
              <NavLink to="/filmes" className={getLinkClass}>
                Filmes
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/salas" className={getLinkClass}>
                Salas
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/sessoes" className={getLinkClass}>
                Sessões
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/lanches" className={getLinkClass}>
                Lanches
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/ingressos" className={getLinkClass}>
                Ingressos
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/pedidos" className={getLinkClass}>
                Pedidos
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}