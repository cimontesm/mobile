import React, { useEffect, useState } from 'react';
import IllustrationCard from './IllustrationCard';

interface Illustration {
  id: number;
  title: string;
  año: string;
  autor: string;
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
        setIllustrations(data);
      } catch (err) {
        console.error('Error cargando ilustraciones:', err);
      }
    };
    loadIllustrations();
  }, []);

  return (
    <div className="p-4">
      <div id="projects-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {illustrations.map((item, index) => (
          <div key={index} onClick={() => setSelectedItem(item)} className="cursor-pointer flex justify-center">
            <IllustrationCard item={item} />
          </div>
        ))}
      </div>

      {/* --- MODAL DE DETALLE (CLOSE UP) --- */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semi-transparente
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '20px'
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: '450px',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGEN DEL MODAL */}
            <div style={{ width: '100%', backgroundColor: '#f4f4f5' }}>
              <img
                src={selectedItem.imgUrl}
                alt={selectedItem.title}
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '60vh', objectFit: 'contain' }}
              />
            </div>

            {/* TEXTO DEL MODAL */}
            <div style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                {/* MODIFICACIÓN: Title - Autor sin truncar */}
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#18181b', lineHeight: '1.2' }}>
                  {selectedItem.title} - {selectedItem.autor}
                </h2>
                <span style={{ color: '#71717a', fontSize: '14px', whiteSpace: 'nowrap' }}>
                  {selectedItem.año}
                </span>
              </div>

              <div style={{ height: '1px', backgroundColor: '#e4e4e7', margin: '16px 0' }}></div>

              <p style={{ color: '#52525b', fontSize: '15px', lineHeight: '1.5', margin: 0 }}>
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
                  fontSize: '14px',
                  cursor: 'pointer'
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