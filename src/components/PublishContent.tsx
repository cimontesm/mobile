import { useRef, useState } from 'react';
import { IonButton, IonIcon, IonItem, IonLabel, IonInput, IonTextarea } from '@ionic/react';
import { cloudUploadOutline, imageOutline } from 'ionicons/icons';
import './PublishContent.css';

const PublishContent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const isFormValid = previews.length > 0 && title.trim() !== '' && description.trim() !== '';

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => allowedTypes.includes(file.type));
      if (validFiles.length !== files.length) alert("Solo se permiten imágenes JPG, PNG o WebP.");
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews); 
    }
    e.target.value = "";
  };

  const handlePublish = () => {
    const newIllustration = {
      id: Date.now(),
      title: title,
      año: new Date().getFullYear().toString(),
      description: description,
      imgUrl: previews[0] 
    };

    /** * USANDO SESSION STORAGE:
     * Los datos se eliminan automáticamente al refrescar la página.
     */
    const existingVibes = JSON.parse(sessionStorage.getItem('user_vibes') || '[]');
    const updatedVibes = [newIllustration, ...existingVibes];
    sessionStorage.setItem('user_vibes', JSON.stringify(updatedVibes));

    window.dispatchEvent(new Event('vibe_published'));
    
    
    setTitle('');
    setDescription('');
    setPreviews([]);
  };

  return (
    <div className="publish-container" style={{ 
      padding: '30px 20px', 
      backgroundColor: '#000', 
      minHeight: '100%',
      color: 'white'
    }}>
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '2rem', 
          fontWeight: '700', 
          margin: '0',
          background: 'linear-gradient(to right, #fff, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Vibe with the World
        </h2>
        <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '5px' }}>
          Share your Vibe of today!
        </p>
      </div>

      {/* FORMULARIO */}
      <div style={{ 
        background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)', 
        borderRadius: '28px', 
        padding: '20px',
        border: '1px solid #333',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <IonItem lines="full" style={{ 
          '--background': 'transparent', 
          '--color': 'white',
          '--border-color': '#444',
          marginBottom: '15px'
        }}>
          <IonLabel position="stacked" style={{ color: '#a855f7', fontWeight: 'bold' }}>Illustration's title</IonLabel>
          <IonInput 
            value={title} 
            placeholder=".........." 
            onIonInput={(e) => setTitle(e.detail.value!)} 
            style={{ fontSize: '1.1rem' }}
          />
        </IonItem>

        <IonItem lines="none" style={{ '--background': 'transparent', '--color': 'white' }}>
          <IonLabel position="stacked" style={{ color: '#a855f7', fontWeight: 'bold' }}>Illustration's description</IonLabel>
          <IonTextarea 
            value={description} 
            placeholder=".........." 
            onIonInput={(e) => setDescription(e.detail.value!)}
            rows={4}
            style={{ fontSize: '1rem', marginTop: '10px' }}
          />
        </IonItem>
      </div>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />

      {/* BOTONES */}
      <div className="button-wrapper" style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '25px',
        justifyContent: 'center' 
      }}>
        <IonButton
          fill="clear"
          onClick={handleButtonClick}
          style={{ 
            '--color': '#fff', 
            border: '1px solid #a855f7', 
            borderRadius: '16px',
            textTransform: 'none',
            fontWeight: '600'
          }}
        >
          <IonIcon slot="start" icon={imageOutline} />
          {previews.length > 0 ? "Change" : "Upload"}
        </IonButton>

        <IonButton
          disabled={!isFormValid}
          onClick={handlePublish}
          style={{ 
            '--background': isFormValid ? '#a855f7' : '#333',
            '--color': isFormValid ? 'white' : '#666',
            '--border-radius': '16px',
            textTransform: 'none',
            fontWeight: 'bold',
            boxShadow: isFormValid ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none'
          }}
        >
          <IonIcon slot="start" icon={cloudUploadOutline} />
          Vibe
        </IonButton>
      </div>

      {/* VISTA PREVIA */}
      {previews.length > 0 && (
        <div style={{ marginTop: '30px', animation: 'fadeIn 0.5s ease' }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '320px', 
            margin: '0 auto',
            aspectRatio: '1/1', 
            borderRadius: '24px', 
            border: '2px solid #a855f7',
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'
          }}>
            <img src={previews[0]} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="bottom-div" style={{ marginTop: '20px', textAlign: 'center' }}>
        <div style={{ 
          height: '1px', 
          background: 'linear-gradient(to right, transparent, #444, transparent)', 
          margin: '15px 0' 
        }}></div>
        <h2 style={{ 
          fontFamily: "'Playfair Display', serif", 
          color: '#ff00ff', 
          fontSize: '1.8rem',
          letterSpacing: '2px',
          margin: '0' 
        }}>
          ◀ Vibe Board ▶
        </h2>
        <p style={{ margin: '5px 0 0', color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Organize your ideas
        </p>
        <p style={{ margin: '0', color: '#444', fontSize: '0.7rem', textTransform: 'lowercase' }}>
          project your vibes
        </p>
      </div>
    </div>
  );
};

export default PublishContent;