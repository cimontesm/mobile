import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonPage, IonHeader, IonToolbar, IonButton, 
  IonIcon, IonModal, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent 
} from '@ionic/react';
import { shareOutline, closeOutline } from 'ionicons/icons';

const Tab3: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('assets/ilustraciones.json') 
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error al cargar:", err));
  }, []);

  const openPost = (item: any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border" style={{ backgroundColor: 'black' }}>
        <IonToolbar style={{ '--background': 'black' }} />
        
        {/* ENCABEZADO CON TAMAÑOS AUMENTADOS */}
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          justifyContent: 'space-between', padding: '30px 25px',
          borderBottom: '1px solid #333', backgroundColor: 'black', color: 'white'
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '30px' }}>
            
            {/* FOTO DE PERFIL GRANDE (150px) */}
            <div style={{
              width: '150px', height: '150px', borderRadius: '50%',
              overflow: 'hidden', border: '3px solid #444', flexShrink: 0
            }}>
              <img 
                src="assets/ProfilePic.png" // Ruta corregida (sin 'public/')
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* BLOQUE DE TEXTO MÁS GRANDE */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: '2.2rem', // Nombre aumentado
                margin: '0', 
                fontWeight: '700',
                color: 'white' 
              }}>
                Ridellita
              </h2>
              
              <div style={{ display: 'flex', gap: '25px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{items.length}</span>
                  <span style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'uppercase' }}>Vibes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>1.2k</span>
                  <span style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'uppercase' }}>Followers</span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTÓN DE COMPARTIR MÁS GRANDE */}
          <IonButton fill="clear" style={{ '--color': 'white' }}>
            <IonIcon slot="icon-only" icon={shareOutline} style={{ fontSize: '32px' }} />
          </IonButton>
        </div>
      </IonHeader>

      <IonContent style={{ '--background': 'black' }}>
        {/* GALERÍA DE POSTS */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px', padding: '2px', backgroundColor: 'black'
        }}>
          {items.map((item) => (
            <button 
              key={item.id} 
              onClick={() => openPost(item)}
              style={{
                width: '100%', aspectRatio: '1 / 1', overflow: 'hidden',
                backgroundColor: '#1a1a1a', border: 'none', padding: 0,
                cursor: 'pointer'
              }}
            >
              <img
                src={item.imgUrl}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </button>
          ))}
        </div>

        {/* MODAL DETALLE */}
        <IonModal 
          isOpen={showModal} 
          onDidDismiss={() => setShowModal(false)}
          style={{ '--background': 'rgba(0,0,0,0.9)' }}
        >
          <IonHeader className="ion-no-border">
            <IonToolbar style={{ '--background': 'black' }}>
              <IonButton slot="end" fill="clear" onClick={() => setShowModal(false)} style={{ '--color': 'white' }}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding" style={{ '--background': 'black' }}>
            {selectedItem && (
              <IonCard style={{ margin: 0, background: '#121212', borderRadius: '15px', overflow: 'hidden' }}>
                <img src={selectedItem.imgUrl} alt={selectedItem.title} style={{ width: '100%' }} />
                <IonCardHeader>
                  <IonCardSubtitle style={{ color: '#aaa' }}>{selectedItem.año}</IonCardSubtitle>
                  <IonCardTitle style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    color: 'white', 
                    fontSize: '2rem' 
                  }}>
                    {selectedItem.title}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent style={{ color: '#ccc', lineHeight: '1.6', fontSize: '1.1rem' }}>
                  {selectedItem.description}
                </IonCardContent>
              </IonCard>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;