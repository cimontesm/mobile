import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PublishContent from '../components/PublishContent'; // Importamos tu componente
import './Tab2-Publish.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <PublishContent />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
