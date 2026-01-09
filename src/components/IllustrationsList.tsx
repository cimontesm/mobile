import React, { useEffect, useState } from 'react';
import IllustrationCard from './IllustrationCard';
import { createPortal } from 'react-dom';

interface Illustration {
  title: string;
  año: string;
  description: string;
  imgUrl: string;
}

const IllustrationsList: React.FC = () => {
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const [selectedItem, setSelectedItem] = useState<Illustration | null>(null);

  useEffect(() => {
    const loadIllustrations = async () => {
      try {
        const response = await fetch('/assets/ilustracionesFeed.json');
        const data = await response.json();
        // Guardamos la data completa sin truncar aquí
        setIllustrations(data);
      } catch (err) {
        console.error('Error cargando ilustraciones:', err);
      }
    };
    loadIllustrations();
  }, []);

  return (
    <div className="p-4">
      <div
        id="projects-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {illustrations.map((item, index) => (
          <div key={index} onClick={() => setSelectedItem(item)} className="cursor-pointer">
            <IllustrationCard key={index} item={item} />
          </div>
        ))}
      </div>
      {/* --- POSTS SUPERPUESTOS AL FIN YA FINALIZADO CREO --- */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#00000088', // Negro sólido (95% opacidad)
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999, // Un número ridículamente alto
            padding: '20px'
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff', // Fondo blanco puro para que no se mezcle
              width: '100%',
              maxWidth: '400px',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGEN */}
            <div style={{ width: '100%', backgroundColor: '#f4f4f5' }}>
              <img
                src={selectedItem.imgUrl}
                alt={selectedItem.title}
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '50vh', objectFit: 'cover' }}
              />
            </div>

            {/* TEXTO */}
            <div style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#18181b' }}>
                  {selectedItem.title}
                </h2>
                <span style={{ color: '#71717a', fontSize: '14px' }}>{selectedItem.año}</span>
              </div>

              <div style={{ height: '1px', backgroundColor: '#e4e4e7', margin: '16px 0' }}></div>

              <p style={{ color: '#90878d', fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
                {selectedItem.description}
              </p>

              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#8b8bcd',
                  color: '#ffffff',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IllustrationsList;