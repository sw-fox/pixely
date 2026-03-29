

import { usePixel } from '../../contexts/usePixel';
import style from './Pixel.module.css'

export type PixelProps = {
    rowIndex: number;
    colIndex: number;
    color: string;
}

function Pixel(props: PixelProps) {

    const { dispatch, isMouseDown, setIsMouseDown } = usePixel();

    const handleMouseDown = () => {
        setIsMouseDown(true);
        dispatch({ type: 'draw', rowIndex: props.rowIndex, colIndex: props.colIndex });
    };

    const handleMouseEnter = () => {
        if (isMouseDown) {
            dispatch({ type: 'draw', rowIndex: props.rowIndex, colIndex: props.colIndex });
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    return (
        <button
            key={props.colIndex}
            className={style.pixel}
            style={{ backgroundColor: props.color }}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
        />
    )
}

export default Pixel
