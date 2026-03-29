import { useState } from 'react';
import { usePixel } from '../../contexts/usePixel';
import ColorButton from '../atoms/ColorButton'
import style from './ColorTab.module.css'
import Button from '../atoms/Button';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import AddColorButton from '../atoms/AddColorButton';

function ColorTab() {

    const { dispatch, state } = usePixel();
    const [colors, setColors] = useState<string[]>(["#fff", "#000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"]);
    const [editMode, setEditMode] = useState(false);

    const handleAddColor = (newColor: string) => {
        setColors([...colors, newColor]);
    };

    const handleRemoveColor = (color: string) => {
        setColors(colors.filter(c => c !== color));
    };

    const handleUpdateColor = (oldColor: string, newColor: string) => {
        setColors(colors.map(c => c === oldColor ? newColor : c));
    };

    const handleColorClick = (color: string) => {
        if (!editMode) {
            dispatch({ type: 'color', color });
        }
    };

    return (
        <div className={style.colorTab}>
            <div className={style.buttons}>
                <Button icon={faPen} onClick={() => setEditMode(!editMode)} />
                {colors.map((color) => (
                    <ColorButton
                        key={color}
                        color={color}
                        selected={state.color === color}
                        onSelectColor={() => handleColorClick(color)}
                        editMode={editMode}
                        onRemove={handleRemoveColor}
                        onUpdateColor={handleUpdateColor}
                    />
                ))}
                {editMode && (
                    <AddColorButton
                        onAddColor={handleAddColor}
                        existingColors={colors}
                    />
                )}
            </div>
        </div>
    )
}

export default ColorTab
