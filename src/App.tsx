import { UniversalProvider } from './page/hook/MainContexts.tsx';
import HomeCanvas from './page/HomeCanvas.tsx';

function App() {
  return (
    <UniversalProvider>
        <HomeCanvas />
    </UniversalProvider>
  );
}

export default App;