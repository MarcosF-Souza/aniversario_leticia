import { Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <Heart size={20} color="#FFACDB" fill="#FFACDB" />
        <p className="footer__title">Um ano de nós</p>
        <p className="footer__tagline">
          Feito à mão, um detalhe de cada vez — pra você reler sempre que
          quiser.
        </p>
      </div>
    </footer>
  );
}
