import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';

// Actualizamos la interfaz para incluir el autor según tu JSON
interface Illustration {
  id: number;
  title: string;
  año: string;
  autor: string; // Nueva propiedad
  description: string;
  imgUrl: string;
}

const truncateText = (text: string, maxLength = 22) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

const IllustrationCard: React.FC<{ item: Illustration }> = ({ item }) => {
  const title_autor = truncateText(item.title + " - " + item.autor);
  return (
    <IonCard
      button
      style={{ width: '280px', margin: '16px auto', borderRadius: '20px' }}
      className="group overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition shadow-lg"
    >
      <div style={{ padding: '8px', paddingBottom: '0px' }}> 
        <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '1/1' }}>
          <img
            src={item.imgUrl}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <IonCardContent style={{ textAlign: 'left', padding: '16px' }}>
        {/* Título y Autor combinados: Title - Autor */}
        <h3 
          style={{ 
            fontWeight: 'bold', 
            fontSize: '18px', 
            margin: '0 0 4px 0',
            color: 'inherit',
            display: 'block'
          }}
        >
          {title_autor}
        </h3>
        
        <span style={{ fontSize: '12px', color: '#71717a', display: 'block', marginBottom: '8px' }}>
          {item.año}
        </span>
        
        <p style={{ fontSize: '14px', margin: 0, color: '#52525b', lineHeight: '1.4' }}>
          {truncateText(item.description, 80)}
        </p>
      </IonCardContent>
    </IonCard>
  );
};

export default IllustrationCard;