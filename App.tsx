import { StatusBar } from 'expo-status-bar';

//------Screens-------//

import Home from './src/screens/Home'

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <Home />
    </>
  );
}
