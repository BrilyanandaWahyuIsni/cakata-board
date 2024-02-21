import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeCanvas from './canvas/HomeCanvas.tsx';
import UiHome from './uiHome/UiHome.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UiHome />,
  },
  {
    path: '/canvas',
    element: <HomeCanvas />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
