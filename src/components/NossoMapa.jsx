import { useEffect, useRef, useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { places, rooms } from '../lib/content';
import './NossoMapa.css';

const RIO_CENTER = [-22.96, -43.22];
// Tiles padrão do OpenStreetMap: gratuitos e sem chave de API (uso leve, com atribuição).
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

const room = rooms.find((r) => r.id === 'mapa');

// Coração do Lucide, em SVG puro, para usar dentro do marcador do Leaflet.
const heartSvg =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">' +
  '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>' +
  '</svg>';

const makeIcon = (active) =>
  new L.DivIcon({
    className: `mapa-pin ${active ? 'mapa-pin--active' : ''}`,
    html: `<span class="mapa-pin__dot">${heartSvg}</span>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

const pinIcon = makeIcon(false);
const pinIconActive = makeIcon(true);

// '2025-11-01' -> '01/11/2025' (sem passar por Date, para não sofrer com fuso horário).
function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export default function NossoMapa() {
  const [selectedId, setSelectedId] = useState(null);
  const wrapRef = useRef(null);
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new window.Map());

  // Cria o mapa uma única vez. O cleanup remove tudo, então funciona
  // também com o StrictMode (que monta o efeito duas vezes em dev).
  useEffect(() => {
    const map = new L.Map(containerRef.current, {
      center: RIO_CENTER,
      zoom: 12,
      scrollWheelZoom: false,
    });

    new L.TileLayer(TILE_URL, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);

    const markers = new window.Map();
    places.forEach((p) => {
      const marker = new L.Marker([p.lat, p.lng], { icon: pinIcon, title: p.name }).addTo(map);
      marker.on('click', () => setSelectedId(p.id));
      markers.set(p.id, marker);
    });

    if (places.length > 0) {
      map.fitBounds(
        places.map((p) => [p.lat, p.lng]),
        { padding: [56, 56], maxZoom: 14 },
      );
    }

    // A roda do mouse só dá zoom depois de clicar no mapa; assim ela não
    // "prende" a rolagem da página quando o cursor passa por cima.
    map.on('click', () => map.scrollWheelZoom.enable());
    const container = map.getContainer();
    const disableWheel = () => map.scrollWheelZoom.disable();
    container.addEventListener('mouseleave', disableWheel);

    // Só em `npm run dev`: clicar no mapa mostra as coordenadas para colar em content.js.
    if (import.meta.env.DEV) {
      map.on('click', (e) => {
        const lat = e.latlng.lat.toFixed(6);
        const lng = e.latlng.lng.toFixed(6);
        console.info(`[Nosso Mapa] lat: ${lat}, lng: ${lng}`);
        new L.Popup()
          .setLatLng(e.latlng)
          .setContent(`lat: ${lat}<br>lng: ${lng}`)
          .openOn(map);
      });
    }

    mapRef.current = map;
    markersRef.current = markers;

    return () => {
      container.removeEventListener('mouseleave', disableWheel);
      map.remove();
      mapRef.current = null;
      markersRef.current = new window.Map();
    };
  }, []);

  // Destaca o ponto selecionado e leva o mapa até ele.
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const active = id === selectedId;
      marker.setIcon(active ? pinIconActive : pinIcon);
      marker.setZIndexOffset(active ? 1000 : 0);
    });

    const map = mapRef.current;
    const place = places.find((p) => p.id === selectedId);
    if (map && place) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      map.flyTo([place.lat, place.lng], Math.max(map.getZoom(), 15), {
        animate: !reduceMotion,
        duration: 1.2,
      });
    }
  }, [selectedId]);

  // Clique na lista: alterna o item e, no celular (onde a lista fica abaixo
  // do mapa), rola a página de volta até o mapa.
  const handleSelectFromList = (id) => {
    setSelectedId((current) => (current === id ? null : id));
    wrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <section className="mapa">
      <div className="mapa__glow mapa__glow--blush" aria-hidden="true" />
      <div className="mapa__glow mapa__glow--peach" aria-hidden="true" />

      <header className="mapa__intro">
        <span className="mapa__kicker">{room.label}</span>
        <h1 className="mapa__title">{room.title}</h1>
        <p className="mapa__lead">
          {room.text} Toque em um ponto para ver o que aconteceu ali.
        </p>
      </header>

      <div className="mapa__layout">
        <div ref={wrapRef} className="mapa__map-wrap">
          <div
            ref={containerRef}
            className="mapa__map"
            role="region"
            aria-label="Mapa do Rio de Janeiro com os lugares da nossa história"
          />
        </div>

        <aside className="mapa__panel">
          {places.length === 0 ? (
            <p className="mapa__empty">Os primeiros pontos vão aparecer aqui.</p>
          ) : (
            <>
              <p className="mapa__count">
                {places.length} {places.length === 1 ? 'lugar' : 'lugares'}
              </p>

              <ul className="mapa__list">
                {places.map((p) => {
                  const active = p.id === selectedId;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        className={`place-card ${active ? 'place-card--active' : ''}`}
                        aria-expanded={active}
                        onClick={() => handleSelectFromList(p.id)}
                      >
                        <span className="place-card__icon">
                          <MapPin size={18} strokeWidth={1.75} />
                        </span>

                        <span className="place-card__body">
                          {p.tag && <span className="place-card__tag">{p.tag}</span>}
                          <span className="place-card__name">{p.name}</span>
                          {p.date && (
                            <span className="place-card__date">
                              <CalendarDays size={14} strokeWidth={1.75} />
                              {formatDate(p.date)}
                            </span>
                          )}
                          {active && p.text && (
                            <span className="place-card__text">{p.text}</span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
