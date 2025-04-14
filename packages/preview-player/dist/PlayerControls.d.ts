import React from 'react';
import './PlayerControls.css';
interface PlayerControlsProps {
    /** 컨트롤 표시 여부 */
    showControls: boolean;
    /** 시간 표시 형식 (기본: 'mm:ss') */
    timeFormat?: 'mm:ss' | 'hh:mm:ss' | 'seconds';
    /** 볼륨 컨트롤 표시 여부 */
    showVolumeControl?: boolean;
    /** 전체 화면 버튼 표시 여부 */
    showFullscreenButton?: boolean;
    /** 진행 바 표시 여부 */
    showProgressBar?: boolean;
}
/**
 * 플레이어 컨트롤 컴포넌트
 */
declare const PlayerControls: React.FC<PlayerControlsProps>;
export default PlayerControls;
