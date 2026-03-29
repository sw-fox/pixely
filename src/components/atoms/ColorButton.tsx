
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import style from './ColorButton.module.css';
import ColorWheel from './ColorWheel';
import Modal from './Modal';

export type ColorButtonProps = {
  color: string;
  onSelectColor: () => void;
  selected: boolean;
  editMode?: boolean;
  onRemove?: (color: string) => void;
  onUpdateColor?: (oldColor: string, newColor: string) => void;
}

function ColorButton(props: ColorButtonProps) {

  const cn = style.button + " " + (props.selected ? style.selected : "");

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const handleClick = () => {
    if (props.editMode) {
      setShowColorPicker(true);
    } else {
      props.onSelectColor();
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.onRemove) {
      props.onRemove(props.color);
    }
  };

  const setColor = (color: string) => {
    if (props.onUpdateColor) {
      props.onUpdateColor(props.color, color);
    }
    setShowColorPicker(false);
  };

  return (
    <div className={style.container}>
      <button
        className={cn}
        onClick={handleClick}
        style={{ backgroundColor: props.color }}
      >
      </button>
      {props.editMode && props.onRemove && (
        <button className={style.removeButton} onClick={handleRemoveClick}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
      {props.editMode &&
        <Modal isOpen={showColorPicker} onClose={() => setShowColorPicker(false)}>
          <ColorWheel onSelectColor={setColor} />
        </Modal>}
    </div>
  )
}

export default ColorButton
