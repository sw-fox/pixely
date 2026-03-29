
export interface PixelState {
    color: string;
    pixelGrid: string[][];
    history: string[][][];
}

export type PixelAction =
    | { type: 'color'; color: string }
    | { type: 'draw'; rowIndex: number; colIndex: number }
    | { type: 'fill' }
    | { type: 'bigger' }
    | { type: 'smaller' }
    | { type: 'undo' }
    | { type: 'up' }
    | { type: 'down' }
    | { type: 'left' }
    | { type: 'right' };

export const pixelReducer = (state: PixelState, action: PixelAction): PixelState => {
    switch (action.type) {
        case 'color':
            return { ...state, color: action.color };
        case 'draw':
            return drawAt(state, action.rowIndex, action.colIndex);
        case 'fill':
            return fill(state);
        case 'bigger':
            return bigger(state);
        case 'smaller':
            return smaller(state);
        case 'undo':
            return undo(state);
        case 'up':
            return { ...state };
        case 'down':
            return { ...state };
        case 'left':
            return { ...state };
        case 'right':
            return { ...state };
        default:
            return state;
    }
};

const drawAt = (state: PixelState, rowIndex: number, colIndex: number): PixelState => {
    const newPixelGrid = state.pixelGrid.map((row) => [...row]);
    newPixelGrid[rowIndex][colIndex] = state.color;
    const newHistory = [...state.history, state.pixelGrid];
    return { ...state, pixelGrid: newPixelGrid, history: newHistory };
};

const fill = (state: PixelState): PixelState => {
    const countRows = state.pixelGrid.length;
    const newPixelGrid = Array(countRows).fill(null).map(() => Array(countRows).fill(state.color));
    const newHistory = [...state.history, state.pixelGrid];
    return { ...state, pixelGrid: newPixelGrid, history: newHistory };
};

const bigger = (state: PixelState): PixelState => {
    const oldRows = state.pixelGrid.length;
    
    if (oldRows > 16) {
        return state;
    }
    const oldCols = state.pixelGrid[0]?.length ?? 0;
    
    const newRows = oldRows + 1;
    const newCols = oldCols + 1;
    
    const newPixelGrid: string[][] = [];
    
    for (let i = 0; i < newRows; i++) {
        const newRow: string[] = [];
        for (let j = 0; j < newCols; j++) {
            if (i < oldRows && j < oldCols) {
                newRow.push(state.pixelGrid[i][j]);
            } else {
                newRow.push('#fff');
            }
        }
        newPixelGrid.push(newRow);
    }
    
    const newHistory = [...state.history, state.pixelGrid];
    return { ...state, pixelGrid: newPixelGrid, history: newHistory };
};

const smaller = (state: PixelState): PixelState => {
    const oldRows = state.pixelGrid.length;
    const oldCols = state.pixelGrid[0]?.length ?? 0;
    
    if (oldRows <= 1 || oldCols <= 1) {
        return state;
    }
    
    const newRows = oldRows - 1;
    const newCols = oldCols - 1;
    
    const newPixelGrid: string[][] = [];
    
    for (let i = 0; i < newRows; i++) {
        const newRow: string[] = [];
        for (let j = 0; j < newCols; j++) {
            newRow.push(state.pixelGrid[i][j]);
        }
        newPixelGrid.push(newRow);
    }
    
    const newHistory = [...state.history, state.pixelGrid];
    return { ...state, pixelGrid: newPixelGrid, history: newHistory };
};

const undo = (state: PixelState): PixelState => {
    if (state.history.length === 0) {
        return state;
    }
    
    const previousHistory = state.history.slice(0, -1);
    const previousGrid = state.history[state.history.length - 1];
    
    return { ...state, pixelGrid: previousGrid, history: previousHistory };
};
