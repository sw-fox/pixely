

import { usePixel } from '../../contexts/usePixel';
import Pixel from '../atoms/Pixel';
import style from './View.module.css'

function View() {

    const { state, setIsMouseDown } = usePixel();

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    return (
        <div className={style.view} onMouseUp={handleMouseUp}>
            <div className={style.pixelGrid} onMouseUp={handleMouseUp}>
                {state.pixelGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className={style.pixelRow} onMouseUp={handleMouseUp}>
                        {row.map((color, colIndex) => (
                            <Pixel key={colIndex} rowIndex={rowIndex} colIndex={colIndex} color={color} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default View
