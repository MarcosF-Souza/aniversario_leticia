import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { navLinks } from '../lib/content';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `navbar__link ${isActive ? 'navbar__link--active' : ''}`;

  const mobileLinkClass = ({ isActive }) =>
    `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`;

  return (
    <header className="navbar">
      <div className="navbar__row">
        <NavLink to="/" className="navbar__brand">
          <Heart size={18} color="#FFACDB" fill="#FFACDB" strokeWidth={2.5} />
          Um ano de nós
        </NavLink>

        <nav className="navbar__links">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="navbar__mobile-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={mobileLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
