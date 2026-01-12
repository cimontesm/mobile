import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';

interface Illustration {
  id: number;
  title: string;
  año: string;
  autor: string;
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
      style={{ 
        width: '280px', 
        margin: '16px auto', 
        borderRadius: '24px',
        background: '#0a0a0a', // Negro profundo
        border: '1px solid #333',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}
      className="group overflow-hidden transition-all duration-300 hover:border-purple-500"
    >
      <div style={{ padding: '10px', paddingBottom: '0px' }}> 
        <div style={{ 
          borderRadius: '18px', 
          overflow: 'hidden', 
          aspectRatio: '1/1',
          border: '1px solid #1a1a1a'
        }}>
          <img
            src={item.imgUrl}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <IonCardContent style={{ textAlign: 'left', padding: '16px' }}>
        <h3 
          style={{ 
            fontFamily: "'Playfair Display', serif",
            fontWeight: 'bold', 
            fontSize: '18px', 
            margin: '0 0 4px 0',
            background: 'linear-gradient(to right, #fff, #a855f7)', // Degradado morado
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'block'
          }}
        >
          {title_autor}
        </h3>
        
        <span style={{ fontSize: '12px', color: '#a855f7', display: 'block', marginBottom: '8px', fontWeight: 'bold', letterSpacing: '1px' }}>
          {item.año}
        </span>
        
        <p style={{ fontSize: '14px', margin: 0, color: '#aaa', lineHeight: '1.4' }}>
          {truncateText(item.description, 80)}
        </p>
      </IonCardContent>
    </IonCard>
  );
};

export default IllustrationCard;