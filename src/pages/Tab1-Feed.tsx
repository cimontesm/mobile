import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1-Feed.css';
import IllustrationsList from '../components/IllustrationsList';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>        
        <IllustrationsList/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
