import { Link } from 'react-router-dom';
import { Mail, MapPin, Image, Music, Clock, Gift, ArrowUpRight } from 'lucide-react';
import { rooms } from '../lib/content';
import './RoomTour.css';

const icons = { Mail, MapPin, Image, Music, Clock, Gift };

function RoomCard({ room }) {
  const Icon = icons[room.icon];
  return (
    <Link
      to={`/${room.id}`}
      className={`room-card ${room.featured ? 'room-card--featured' : ''}`}
    >
      <div className="room-card__glow" aria-hidden="true" />

      <div>
        <span className={`room-card__icon room-card__icon--${room.accent}`}>
          <Icon size={20} strokeWidth={1.75} />
        </span>

        <h3 className="room-card__title">{room.title}</h3>
        <p className="room-card__text">{room.text}</p>
      </div>

      <div className="room-card__footer">
        <span className="room-card__label">{room.label}</span>
        <ArrowUpRight size={18} className="room-card__arrow" />
      </div>
    </Link>
  );
}

export default function RoomTour() {
  return (
    <section className="room-tour">
      <div className="room-tour__intro">
        <h2 className="room-tour__title">
          Cada cômodo guarda uma parte da história
        </h2>
        <p className="room-tour__subtitle">
          Explore como quiser — não existe ordem certa para reviver uma
          memória.
        </p>
      </div>

      <div className="room-tour__grid">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}
