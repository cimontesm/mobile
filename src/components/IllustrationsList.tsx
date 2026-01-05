import React, { useEffect, useState } from 'react';
import IllustrationCard from './IllustrationCard';

interface Illustration {
  title: string;
  año: string;
  description: string;
  imgUrl: string;
}


const truncateText = (text: string, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

const IllustrationsList: React.FC = () => {
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);

  useEffect(() => {
    const loadIllustrations = async () => {
      try {
        const response = await fetch('/assets/ilustraciones.json');
        const data = await response.json();

        const formattedData = data.map((item: Illustration) => ({
          ...item,
          // Aplicamos el truncado de 50 caracteres aquí
          description: truncateText(item.description, 50),
        }));

        setIllustrations(formattedData);
      } catch (err) {
        console.error('Error cargando ilustraciones:', err);
      }
    };
    loadIllustrations();
  }, []);

  return (
    <div className="p-4">
      <div
        id="projects-section"
        // grid-cols-1 (móvil), sm:grid-cols-2 (tablet), lg:grid-cols-3 (escritorio)
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {illustrations.map((item, index) => (
          <IllustrationCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default IllustrationsList;