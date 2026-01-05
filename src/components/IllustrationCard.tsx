import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';

interface Illustration {
  title: string;
  año: string;
  description: string;
  imgUrl: string;
}

const IllustrationCard: React.FC<{ item: Illustration }> = ({ item }) => {
  return (
    <IonCard
      button
      className="group relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 transition m-0"
    >
      {/* Contenedor de Imagen 1:1 */}
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={item.imgUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <IonCardContent className="flex flex-col p-4">
        <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 leading-tight">
          {item.title}
        </h3>
        <h4 className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
          {item.año}
        </h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {item.description}
        </p>
      </IonCardContent>
    </IonCard>
  );
};

export default IllustrationCard;