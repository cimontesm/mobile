import React, { useState, useEffect, useCallback } from 'react';
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

  // CARGA DE DATOS DESDE SESSION STORAGE
  const loadData = useCallback(() => {
    fetch('assets/ilustraciones.json') 
      .then(res => res.json())
      .then(staticData => {
        /**
         * CAMBIO CLAVE: Usamos sessionStorage. 
         * Al refrescar la página (F5), esta memoria se limpia automáticamente.
         */
        const localVibes = JSON.parse(sessionStorage.getItem('user_vibes') || '[]');
        setItems([...localVibes, ...staticData]);
      })
      .catch(err => console.error("Error al cargar:", err));
  }, []);

  useEffect(() => {
    loadData();
    const handleRefresh = () => loadData();
    window.addEventListener('vibe_published', handleRefresh);
    return () => window.removeEventListener('vibe_published', handleRefresh);
  }, [loadData]);

  const openPost = (item: any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border" style={{ backgroundColor: '#000' }}>
        <IonToolbar style={{ '--background': '#000', '--min-height': '0px', height: '0px' }} />
        
        <div style={{
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center',
          justifyContent: 'space-between', 
          padding: '20px 20px 25px 25px', 
          borderBottom: '1px solid #a855f7',
          backgroundColor: '#000', 
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
              width: 'clamp(90px, 22vw, 130px)', 
              height: 'clamp(90px, 22vw, 130px)',
              borderRadius: '50%',
              overflow: 'hidden', 
              border: '2px solid #a855f7', 
              boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)',
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
                background: 'linear-gradient(to right, #fff, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Ridellita
              </h2>
              
              <div style={{ 
                display: 'flex', 
                gap: 'clamp(10px, 3vw, 25px)', 
                marginTop: '5px'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{items.length}</span>
                  <span style={{ fontSize: '0.7rem', color: '#a855f7', textTransform: 'uppercase', letterSpacing: '1px' }}>Vibes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>1.2k</span>
                  <span style={{ fontSize: '0.7rem', color: '#a855f7', textTransform: 'uppercase', letterSpacing: '1px' }}>Followers</span>
                </div>
              </div>
            </div>
          </div>

          <IonButton fill="clear" style={{ '--color': '#a855f7', margin: 0 }}>
            <IonIcon slot="icon-only" icon={shareOutline} style={{ fontSize: 'clamp(26px, 5vw, 32px)' }} />
          </IonButton>
        </div>
      </IonHeader>

      <IonContent style={{ '--background': '#000' }}>
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px', 
          padding: '2px', 
          backgroundColor: '#000'
        }}>
          {items.map((item) => (
            <button 
              key={item.id} 
              onClick={() => openPost(item)}
              style={{
                width: '100%', 
                aspectRatio: '1 / 1', 
                overflow: 'hidden',
                backgroundColor: '#111', 
                border: 'none', 
                padding: 0,
                cursor: 'pointer',
                position: 'relative'
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
          style={{ '--background': 'rgba(0,0,0,0.95)' }}
        >
          <IonHeader className="ion-no-border">
            <IonToolbar style={{ '--background': '#000' }}>
              <IonButton slot="end" fill="clear" onClick={() => setShowModal(false)} style={{ '--color': '#ff00ff' }}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding" style={{ '--background': '#000' }}>
            {selectedItem && (
              <IonCard style={{ 
                margin: 0, 
                background: 'linear-gradient(145deg, #1a1a1a, #050505)', 
                borderRadius: '25px', 
                overflow: 'hidden',
                border: '1px solid #333'
              }}>
                <img src={selectedItem.imgUrl} alt={selectedItem.title} style={{ width: '100%' }} />
                
                <IonCardHeader>
                  <IonCardSubtitle style={{ color: '#a855f7', letterSpacing: '2px' }}>
                    {selectedItem.año}
                  </IonCardSubtitle>
                  <IonCardTitle style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    color: 'white', 
                    fontSize: '1.8rem',
                    fontWeight: '700'
                  }}>
                    {selectedItem.title}
                  </IonCardTitle>
                </IonCardHeader>
                
                <IonCardContent style={{ color: '#ccc', lineHeight: '1.6', fontSize: '1.05rem' }}>
                  {selectedItem.description}
                </IonCardContent>
                
                <div style={{ padding: '0 20px 20px', textAlign: 'right' }}>
                  <span style={{ color: '#ff00ff', fontSize: '0.8rem', fontWeight: 'bold' }}>◀ VIBE ▶</span>
                </div>
              </IonCard>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;