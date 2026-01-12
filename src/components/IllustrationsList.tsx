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
    <div className="p-4" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <div id="projects-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {illustrations.map((item, index) => (
          <div key={index} onClick={() => setSelectedItem(item)} className="cursor-pointer flex justify-center">
            <IllustrationCard item={item} />
          </div>
        ))}
      </div>

      {/* --- MODAL DE DETALLE (ESTILO RIDELITA) --- */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)', // Más oscuro
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '20px',
            backdropFilter: 'blur(10px)' // Efecto blur de fondo
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, #1a1a1a, #050505)',
              width: '100%',
              maxWidth: '450px',
              borderRadius: '30px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 0 40px rgba(168, 85, 247, 0.3)',
              border: '1px solid #333'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGEN DEL MODAL */}
            <div style={{ width: '100%', padding: '15px' }}>
              <img
                src={selectedItem.imgUrl}
                alt={selectedItem.title}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block', 
                  maxHeight: '50vh', 
                  objectFit: 'contain',
                  borderRadius: '20px'
                }}
              />
            </div>

            {/* TEXTO DEL MODAL */}
            <div style={{ padding: '24px', textAlign: 'left', color: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '22px', 
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 'bold', 
                  background: 'linear-gradient(to right, #fff, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: '1.2' 
                }}>
                  {selectedItem.title}
                </h2>
                <span style={{ color: '#ff00ff', fontSize: '14px', fontWeight: 'bold' }}>
                  {selectedItem.año}
                </span>
              </div>
              
              <p style={{ color: '#a855f7', fontSize: '14px', margin: '0 0 16px 0', fontWeight: '600' }}>
                by {selectedItem.autor}
              </p>

              <div style={{ height: '1px', background: 'linear-gradient(to right, #a855f7, transparent)', margin: '16px 0' }}></div>

              <p style={{ color: '#ccc', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                {selectedItem.description}
              </p>

              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(45deg, #a855f7, #6b21a8)',
                  color: '#ffffff',
                  borderRadius: '16px',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Cerrar Vibe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IllustrationsList;