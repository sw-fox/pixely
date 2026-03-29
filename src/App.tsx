
import style from './App.module.css'
import ColorTab from './components/molecules/ColorTab';
import ActionTab from './components/molecules/ActionTab';
import View from './components/molecules/View';
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
          <View />
          <ActionTab />
        </div>
        <Footer/>
      </PixelProvider>
    </ThemeProvider>
  )
}

export default App
