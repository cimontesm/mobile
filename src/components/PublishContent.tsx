import { useRef, useState } from 'react';
import { IonButton, IonIcon, IonText } from '@ionic/react';
import { arrowUpOutline } from 'ionicons/icons';
import './PublishContent.css'; // Opcional para estilos personalizados

const PublishContent: React.FC = () => {
  // Creamos una referencia al input oculto
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado para manejar las imágenes seleccionadas
  const [previews, setPreviews] = useState<string[]>([]);

  const handleButtonClick = () => {
    // Cuando hacen clic en el botón, activamos el input manualmente
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convertimos los archivos a URLs temporales para verlas
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  return (
    <div className="publish-container">

      <IonText>
        <h2>Vibe with the World</h2>
        <p>Share your Vibe of today!</p>
      </IonText>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="button-wrapper">
        <IonButton
          shape="round"
          className="upload-btn"
          onClick={handleButtonClick}
        >
          <IonIcon slot="start" aria-hidden="true" icon={arrowUpOutline} />
          Upvibe
        </IonButton>
      </div>
      {/* CARRUSEL NATIVO REACT + CSS */}
      {previews.length > 0 && (
        <div className="custom-carousel">
          {previews.map((url, index) => (
            <div key={index} className="carousel-item">
              <img src={url} alt={`preview-${index}`} />
            </div>
          ))}
        </div>
      )}
      <div className="bottom-div">
        <div className="vibe-divider"></div>
        <h2>Vibe Board</h2>
        <p className="slogan-main">Organize your ideas</p>
        <p className="slogan-sub">project your vibes</p>
      </div>
    </div>
  );
};

export default PublishContent;