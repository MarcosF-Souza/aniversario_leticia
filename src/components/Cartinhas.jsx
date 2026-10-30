import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Mail, X } from 'lucide-react';
import { rooms } from '../lib/content';
import './Cartinhas.css';

// Os PDFs ficam em /assets/cartas (fora de src). O Vite resolve cada arquivo
// em tempo de build e devolve a URL final já com hash, sem precisar copiar
// nada para /public.
const pdfModules = import.meta.glob('../../assets/cartas/*.pdf', {
  query: '?url',
  import: 'default',
  eager: true,
});

// O título vem do nome do arquivo: "a_viagem_de_janeiro.pdf" -> "A viagem de janeiro".
function titleFromPath(path) {
  const name = path
    .split('/')
    .pop()
    .replace(/\.pdf$/i, '')
    .replace(/_/g, ' ')
    .trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const cartas = Object.entries(pdfModules)
  .map(([path, url]) => ({ id: path, title: titleFromPath(path), url }))
  .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { numeric: true }));

const PAGE_SIZE = 6;
const accents = ['blush', 'peach', 'lavender'];
const room = rooms.find((r) => r.id === 'cartas');

function LetterViewer({ carta, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    // No StrictMode (dev) o efeito roda duas vezes; o guard evita reabrir.
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Não chamamos dialog.close() aqui: ao desmontar, o <dialog> sai do DOM
    // e deixa a camada modal sozinho. Chamar close() disparava o evento
    // "close" -> onClose -> setSelected(null), fechando a carta logo ao abrir.
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Clique no fundo escurecido (fora do conteúdo) fecha a carta.
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="letter-viewer"
      aria-label={carta.title}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className="letter-viewer__bar">
        <h2 className="letter-viewer__title">{carta.title}</h2>

        <div className="letter-viewer__actions">
          <a
            href={carta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="letter-viewer__open"
          >
            <ExternalLink size={16} />
            <span>Abrir em nova aba</span>
          </a>
          <button
            type="button"
            className="letter-viewer__close"
            onClick={onClose}
            aria-label="Fechar carta"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <iframe
        className="letter-viewer__frame"
        src={`${carta.url}#view=FitH`}
        title={carta.title}
      />

      <p className="letter-viewer__hint">
        A carta não apareceu? Toque em &ldquo;Abrir em nova aba&rdquo; para ler.
      </p>
    </dialog>
  );
}

function Pagination({ page, totalPages, onChange }) {
  return (
    <nav className="cartinhas__pagination" aria-label="Paginação das cartas">
      <button
        type="button"
        className="cartinhas__page-btn"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          className={`cartinhas__page-btn ${n === page ? 'cartinhas__page-btn--active' : ''}`}
          onClick={() => onChange(n)}
          aria-label={`Página ${n}`}
          aria-current={n === page ? 'page' : undefined}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        className="cartinhas__page-btn"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Próxima página"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}

export default function Cartinhas() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const listRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil(cartas.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = cartas.slice(start, start + PAGE_SIZE);

  const goToPage = (n) => {
    setPage(n);
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="cartinhas">
      <div className="cartinhas__glow cartinhas__glow--blush" aria-hidden="true" />
      <div className="cartinhas__glow cartinhas__glow--peach" aria-hidden="true" />

      <header className="cartinhas__intro">
        <span className="cartinhas__kicker">{room.label}</span>
        <h1 className="cartinhas__title">{room.title}</h1>
        <p className="cartinhas__lead">
          {room.text}. Escolha uma carta para abrir e ler com calma.
        </p>
      </header>

      <div ref={listRef} className="cartinhas__list-anchor">
        {cartas.length === 0 ? (
          <p className="cartinhas__empty">Nenhuma carta por aqui ainda.</p>
        ) : (
          <>
            <p className="cartinhas__count">
              {cartas.length} {cartas.length === 1 ? 'carta' : 'cartas'}
            </p>

            <ul className="cartinhas__grid">
              {visible.map((carta, i) => (
                <li key={carta.id}>
                  <button
                    type="button"
                    className="carta-card"
                    onClick={() => setSelected(carta)}
                  >
                    <span
                      className={`carta-card__icon carta-card__icon--${accents[(start + i) % accents.length]}`}
                    >
                      <Mail size={20} strokeWidth={1.75} />
                    </span>

                    <span className="carta-card__title">{carta.title}</span>

                    <span className="carta-card__footer">
                      <span className="carta-card__label">Ler carta</span>
                      <ArrowUpRight size={18} className="carta-card__arrow" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
            )}
          </>
        )}
      </div>

      {selected && (
        <LetterViewer
          key={selected.id}
          carta={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
