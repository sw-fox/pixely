
import { faMinus, faPaintRoller, faPlus, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import Button from '../atoms/Button'
import style from './ActionTab.module.css'
import { usePixel } from '../../contexts/usePixel';

function ActionTab() {

  const { dispatch, state } = usePixel();

const save = () => {
  const { pixelGrid } = state;
  const gridSize = pixelGrid.length;
  const pixelSize = 30;
  const canvasSize = gridSize * pixelSize;

  let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}">
`;

  pixelGrid.forEach((row, rowIndex) => {
    row.forEach((color, colIndex) => {
      const x = colIndex * pixelSize;
      const y = rowIndex * pixelSize;
      svgContent += `  <rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="${color}" />
`;
    });
  });

  svgContent += `</svg>`;

  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pixely.svg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

  return (
    <div className={style.actionTab}>
      <div className={style.buttons}>
        <Button icon={faSave} onClick={save} />
        <Button icon={faPaintRoller} onClick={() => dispatch({ type: 'fill' })} />
        <Button icon={faPlus} onClick={() => dispatch({ type: 'bigger' })} />
        <Button icon={faMinus} onClick={() => dispatch({ type: 'smaller' })} />
        <Button icon={faUndo} onClick={() => dispatch({ type: 'undo' })} />
      </div>
    </div>
  )
}

export default ActionTab
