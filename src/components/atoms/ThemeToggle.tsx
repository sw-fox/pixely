import { useTheme } from '../../contexts/useTheme';
import style from './ThemeToggle.module.css';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={style.theme}>
      <Button icon={isDarkMode ? faSun : faMoon} onClick={toggleTheme} />
    </div>
  );
}

export default ThemeToggle;
