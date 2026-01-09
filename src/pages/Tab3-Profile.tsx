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
        <IonToolbar style={{ 
          '--background': 'black',
          '--min-height': '0px',
          '--padding-top': '0px',
          '--padding-bottom': '0px',
          height: '0px'
        }} />
        
        <div style={{
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center',
          justifyContent: 'space-between', 
          padding: '10px 20px 20px 25px', // 10px arriba para pegar el contenido al borde
          borderBottom: '1px solid #333', 
          backgroundColor: 'black', 
          color: 'white'
        }}>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            gap: 'clamp(15px, 4vw, 30px)',
            flex: '1'
          }}>
            
            <div style={{
              width: 'clamp(100px, 25vw, 150px)', 
              height: 'clamp(100px, 25vw, 150px)',
              borderRadius: '50%',
              overflow: 'hidden', 
              border: '2px solid #444', 
              flexShrink: 0
            }}>
              <img 
                src="assets/ProfilePic.png" 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: 'clamp(1.5rem, 6vw, 2.2rem)', 
                margin: '0', 
                fontWeight: '700',
                color: 'white' 
              }}>
                Ridellita
              </h2>
              
              <div style={{ 
                display: 'flex', 
                gap: 'clamp(10px, 3vw, 25px)', 
                marginTop: '5px'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', fontWeight: 'bold' }}>{items.length}</span>
                  <span style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)', color: '#aaa', textTransform: 'uppercase' }}>Vibes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', fontWeight: 'bold' }}>1.2k</span>
                  <span style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)', color: '#aaa', textTransform: 'uppercase' }}>Followers</span>
                </div>
              </div>
            </div>
          </div>

          <IonButton fill="clear" style={{ '--color': 'white', margin: 0 }}>
            <IonIcon slot="icon-only" icon={shareOutline} style={{ fontSize: 'clamp(28px, 5vw, 35px)' }} />
          </IonButton>
        </div>
      </IonHeader>

      <IonContent style={{ '--background': 'black' }}>
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
                    fontSize: 'clamp(1.5rem, 5vw, 2rem)' 
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