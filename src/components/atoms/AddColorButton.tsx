import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from './Button';
import style from './AddColorButton.module.css';
import Modal from './Modal';
import ColorWheel from './ColorWheel';

type AddColorButtonProps = {
    onAddColor: (color: string) => void;
    existingColors: string[];
};

function AddColorButton(props: AddColorButtonProps) {
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

    const setColor = (color: string) => {
        props.onAddColor(color);
        setShowColorPicker(false);
    };

    return (
        <div className={style.container}>
            <Modal isOpen={showColorPicker} onClose={() => setShowColorPicker(false)}>
                <ColorWheel onSelectColor={setColor} />
            </Modal>
            <Button onClick={() => setShowColorPicker(prev => !prev)} icon={faPlus} />
        </div>
    );
}


export default AddColorButton;
