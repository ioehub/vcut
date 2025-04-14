import React from 'react';
import { PlayerContextType } from './types';
declare const PlayerContext: React.Context<PlayerContextType | undefined>;
export declare const PlayerProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const usePlayer: () => PlayerContextType;
export default PlayerContext;
