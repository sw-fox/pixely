
import style from './App.module.css'
import ColorTab from './components/molecules/ColorTab';
import ActionTab from './components/molecules/ActionTab';
import ViewWrapper from './components/molecules/ViewWrapper';
import { PixelProvider } from './contexts/PixelContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/atoms/ThemeToggle';
import Footer from './components/atoms/Footer';

function App() {

  return (
    <ThemeProvider>
      <PixelProvider>
        <div className={style.app}>
          <ThemeToggle />
          <ColorTab />
          <ViewWrapper />
          <ActionTab />
        </div>
        <Footer/>
      </PixelProvider>
    </ThemeProvider>
  )
}

export default App
