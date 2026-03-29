
import { useState } from 'react';
import style from './ColorWheel.module.css';

type ColorWheelProps = {
    onSelectColor: (color: string) => void;
};

function ColorWheel(props: ColorWheelProps) {
  const [lightness, setLightness] = useState<number>(50);

    const size = 20;
    const color = (x: number, y: number): string => {
        // Normalize to [-1, 1]
        const nx = (x / 100) * 2 - 1;
        const ny = (y / 100) * 2 - 1;

        const angle = Math.atan2(ny, nx);
        let hue = (angle * 180) / Math.PI;
        if (hue < 0) hue += 360;

        // Distance from center → saturation (0–100)
        const dist = Math.sqrt(nx * nx + ny * ny);
        const saturation = Math.min(dist * 100, 100);

        return `hsl(${hue.toFixed(0)}, ${saturation.toFixed(0)}%, ${lightness}%)`;
    }

    function changeLightness(x: number): void {
        const value = Math.max(0, Math.min(255, x));
        setLightness(value);
    }

    function blackAndWhite(x: number): string {
        const clamped = Math.max(0, Math.min(100, x));

        // Map 0–100 → 0–255
        const value = Math.round((clamped / 100) * 255);
        return `rgb(${value}, ${value}, ${value})`;
    }

    return (
        <div className={style.colorWheelContainer}>
            <div className={style.colorWheelPixels}>
                {Array.from({ length: size }).map((_, col) => {
                    const x = (col / (size - 1)) * 100;
                    const c = blackAndWhite(x);
                    return (
                        <div
                            key={`bw-${col}`}
                            className={style.colorPixel}
                            style={{
                                backgroundColor: c,
                            }}
                            onClick={() => changeLightness(x)}
                        />
                    );
                })}
            </div>
            <div className={style.colorWheelPixels}>
                {Array.from({ length: size }).map((_, row) =>
                    Array.from({ length: size }).map((_, col) => {
                        const x = (col / (size - 1)) * 100;
                        const y = (row / (size - 1)) * 100;
                        const c = color(x, y);
                        return (
                            <div
                                key={`${row}-${col}`}
                                className={style.colorPixel}
                                style={{
                                    backgroundColor: c,
                                }}
                                onClick={() => props.onSelectColor(c)}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default ColorWheel;
