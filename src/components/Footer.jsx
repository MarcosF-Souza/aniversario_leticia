import { Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <Heart size={20} color="#FFACDB" fill="#FFACDB" />
        <p className="footer__title">Parabéns à minha outra metade</p>
        <p className="footer__tagline">
          Sempre que você quiser, pode revisitar esse site
        </p>
      </div>
    </footer>
  );
}