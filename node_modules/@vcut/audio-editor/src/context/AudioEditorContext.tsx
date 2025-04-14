import React, { createContext, useContext, useReducer, ReactNode, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  AudioEditorState, 
  AudioEditorAction, 
  AudioTrack, 
  AudioEffect,
  AudioMarker
} from '../types';
import AudioService from '../services/AudioService';

// 초기 상태 정의
const initialState: AudioEditorState = {
  tracks: [],
  masterVolume: 1.0,
  currentTime: 0,
  isPlaying: false,
  isPaused: false,
  selectedTrackId: null,
  selectedMarker: null,
  zoom: 1,
  loop: {
    enabled: false,
    start: 0,
    end: 0
  },
  isRecording: false,
  sampleRate: 44100,
  duration: 0
};

// 리듀서 함수
const reducer = (state: AudioEditorState, action: AudioEditorAction): AudioEditorState => {
  switch (action.type) {
    case 'ADD_TRACK':
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
        selectedTrackId: action.payload.id, // 새 트랙 추가 시 선택
        // 트랙이 추가될 때 전체 재생 시간도 업데이트 해야 함
        duration: Math.max(state.duration, action.payload.duration || 0)
      };
    
    case 'REMOVE_TRACK':
      return {
        ...state,
        tracks: state.tracks.filter(track => track.id !== action.payload),
        selectedTrackId: state.selectedTrackId === action.payload ? null : state.selectedTrackId
      };
    
    case 'UPDATE_TRACK':
      return {
        ...state,
        tracks: state.tracks.map(track => 
          track.id === action.payload.id 
            ? { ...track, ...action.payload.updates } 
            : track
        ),
        // 트랙 업데이트 시 duration도 업데이트 (오디오 버퍼가 업데이트된 경우)
        duration: action.payload.updates.duration !== undefined
          ? Math.max(
              ...state.tracks
                .filter(t => t.id !== action.payload.id)
                .map(t => t.duration || 0),
              action.payload.updates.duration
            )
          : state.duration
      };
    
    case 'SET_TRACK_VOLUME':
      return {
        ...state,
        tracks: state.tracks.map(track => 
          track.id === action.payload.id 
            ? { ...track, volume: action.payload.volume } 
            : track
        )
      };
    
    case 'TOGGLE_TRACK_MUTE':
      return {
        ...state,
        tracks: state.tracks.map(track => 
          track.id === action.payload 
            ? { ...track, muted: !track.muted } 
            : track
        )
      };
    
    case 'TOGGLE_TRACK_SOLO':
      return {
        ...state,
        tracks: state.tracks.map(track => 
          track.id === action.payload 
            ? { ...track, solo: !track.solo } 
            : track
        )
      };
    
    case 'SELECT_TRACK':
      return {
        ...state,
        selectedTrackId: action.payload,
        tracks: state.tracks.map(track => ({
          ...track,
          isSelected: track.id === action.payload
        }))
      };
    
    case 'SET_MASTER_VOLUME':
      return {
        ...state,
        masterVolume: action.payload
      };
    
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload
      };
    
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
        isPaused: false
      };
    
    case 'STOP':
      return {
        ...state,
        isPlaying: false,
        isPaused: false
      };
    
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false,
        isPaused: true
      };
    
    case 'SET_LOOP':
      return {
        ...state,
        loop: {
          enabled: action.payload.enabled,
          start: action.payload.start ?? state.loop.start,
          end: action.payload.end ?? state.loop.end
        },
        // 루프 끝 시간이 총 오디오 길이보다 길면 duration도 업데이트
        duration: (action.payload.end ?? 0) > state.duration 
          ? (action.payload.end ?? state.duration) 
          : state.duration
      };

    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload
      };
    
    case 'ADD_EFFECT':
      return {
        ...state,
        tracks: state.tracks.map(track => 
          track.id === action.payload.trackId
            ? { 
                ...track, 
                effects: [...track.effects, action.payload.effect] 
              }
            : track
        )
      };
    
    case 'REMOVE_EFFECT':
      return {
        ...state,
        tracks: state.tracks.map(track => 
          track.id === action.payload.trackId
            ? { 
                ...track, 
                effects: track.effects.filter(e => e.id !== action.payload.effectId) 
              }
            : track
        )
      };
    
    case 'UPDATE_EFFECT':
      return {
        ...state,
        tracks: state.tracks.map(track => 
          track.id === action.payload.trackId
            ? { 
                ...track, 
                effects: track.effects.map(effect => 
                  effect.id === action.payload.effectId
                    ? { ...effect, ...action.payload.updates }
                    : effect
                )
              }
            : track
        )
      };
    
    case 'ADD_MARKER':
      return {
        ...state,
        tracks: state.tracks.map(track => 
          track.id === action.payload.trackId
            ? { 
                ...track, 
                markers: [...track.markers, action.payload.marker] 
              }
            : track
        )
      };
    
    case 'REMOVE_MARKER':
      return {
        ...state,
        tracks: state.tracks.map(track => 
          track.id === action.payload.trackId
            ? { 
                ...track, 
                markers: track.markers.filter(m => m.id !== action.payload.markerId) 
              }
            : track
        )
      };
    
    case 'UPDATE_MARKER':
      return {
        ...state,
        tracks: state.tracks.map(track => 
          track.id === action.payload.trackId
            ? { 
                ...track, 
                markers: track.markers.map(marker => 
                  marker.id === action.payload.markerId
                    ? { ...marker, ...action.payload.updates }
                    : marker
                )
              }
            : track
        )
      };
    
    default:
      return state;
  }
};

// 컨텍스트 생성
const AudioEditorContext = createContext<{
  state: AudioEditorState;
  dispatch: React.Dispatch<AudioEditorAction>;
  addTrack: (track: AudioTrack) => Promise<string>;
  removeTrack: (id: string) => void;
  updateTrack: (id: string, updates: Partial<AudioTrack>) => void;
  setTrackVolume: (id: string, volume: number) => void;
  toggleTrackMute: (id: string) => void;
  toggleTrackSolo: (id: string) => void;
  setMasterVolume: (volume: number) => void;
  addEffect: (trackId: string, effect: AudioEffect) => void;
  removeEffect: (trackId: string, effectId: string) => void;
  updateEffect: (trackId: string, effectId: string, updates: Partial<AudioEffect>) => void;
  addMarker: (trackId: string, marker: AudioMarker) => void;
  removeMarker: (trackId: string, markerId: string) => void;
  updateMarker: (trackId: string, markerId: string, updates: Partial<AudioMarker>) => void;
  setLoop: (enabled: boolean, start: number, end: number) => void;
  setCurrentTime: (time: number) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setSelectedTrack: (trackId: string | null) => void;
  loadAudioFile: (url: string, name: string) => Promise<string>;
  exportAudio: (id: string, startTime: number, duration: number, format?: 'wav' | 'mp3') => Promise<Blob>;
}>({
  state: initialState,
  dispatch: () => null,
  addTrack: async () => '',
  removeTrack: () => {},
  updateTrack: () => {},
  setTrackVolume: () => {},
  toggleTrackMute: () => {},
  toggleTrackSolo: () => {},
  setMasterVolume: () => {},
  addEffect: () => {},
  removeEffect: () => {},
  updateEffect: () => {},
  addMarker: () => {},
  removeMarker: () => {},
  updateMarker: () => {},
  setLoop: () => {},
  setCurrentTime: () => {},
  play: () => {},
  pause: () => {},
  stop: () => {},
  setSelectedTrack: () => {},
  loadAudioFile: async () => '',
  exportAudio: async () => new Blob()
});

// Provider 컴포넌트
export const AudioEditorProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // AudioService 인스턴스 생성 및 관리
  const audioServiceRef = useRef<AudioService | null>(null);
  const timeUpdateInterval = useRef<number | null>(null);
  
  // AudioService 초기화
  useEffect(() => {
    // AudioService 인스턴스 생성
    console.log('AudioEditorContext: AudioService 초기화 시작...');
    
    try {
      // 이미 생성된 인스턴스가 있다면 리소스 정리
      if (audioServiceRef.current) {
        console.log('기존 AudioService 인스턴스 정리...');
        // 기존 인터벌 정리
        if (timeUpdateInterval.current) {
          clearInterval(timeUpdateInterval.current);
          timeUpdateInterval.current = null;
        }
      }
      
      // 새 인스턴스 생성
      audioServiceRef.current = new AudioService();
      
      // 초기화 호출
      audioServiceRef.current.initialize();
      
      // 사용자 상호작용으로 AudioContext 재개 설정
      const resumeAudioContext = () => {
        if (audioServiceRef.current && audioServiceRef.current.audioContext.state === 'suspended') {
          console.log('사용자 상호작용 감지, AudioContext 재개 시도...');
          audioServiceRef.current.audioContext.resume().then(() => {
            console.log('AudioContext 재개 성공');
          }).catch(err => {
            console.error('AudioContext 재개 실패:', err);
          });
        }
      };
      
      // 사용자 상호작용 이벤트에 리스너 추가
      const interactionEvents = ['click', 'touchstart', 'keydown'];
      interactionEvents.forEach(eventType => {
        document.addEventListener(eventType, resumeAudioContext, { once: true });
      });
      
      console.log('AudioService 초기화 완료');
      
      // 컴포넌트 언마운트 시 정리
      return () => {
        console.log('AudioEditorContext 언마운트: 리소스 정리...');
        
        // 이벤트 리스너 제거
        interactionEvents.forEach(eventType => {
          document.removeEventListener(eventType, resumeAudioContext);
        });
        
        // 시간 업데이트 인터벌 정리
        if (timeUpdateInterval.current) {
          clearInterval(timeUpdateInterval.current);
          timeUpdateInterval.current = null;
        }
        
        // AudioService 정리
        if (audioServiceRef.current) {
          try {
            // 재생 중이면 정지
            if (audioServiceRef.current.getIsPlaying()) {
              audioServiceRef.current.stopAllTracks();
            }
            
            // AudioContext 닫기 (메모리 누수 방지)
            audioServiceRef.current.audioContext.close().then(() => {
              console.log('AudioContext 닫기 성공');
            }).catch(err => {
              console.error('AudioContext 닫기 실패:', err);
            });
          } catch (error) {
            console.error('AudioService 정리 중 오류:', error);
          }
          
          audioServiceRef.current = null;
        }
      };
    } catch (error) {
      console.error('AudioService 초기화 중 오류 발생:', error);
    }
  }, []);
  
  // 직접 참조를 위한 getter
  const getAudioService = useCallback(() => {
    return audioServiceRef.current;
  }, []);

  // 임시 트랙 생성 (사용되지 않음 - 향후 확장을 위해 보존)
  // const createTempTrack = useCallback(() => {
  //   const trackId = uuidv4();
  //   const tempTrack: AudioTrack = {
  //     id: trackId,
  //     name: 'Temporary Track',
  //     audioBuffer: null,
  //     waveformData: [],
  //     volume: 1,
  //     pan: 0,
  //     muted: false,
  //     solo: false,
  //     gain: 1.0,
  //     startTime: 0,
  //     duration: 0,
  //     effects: [],
  //     markers: [],
  //     isSelected: false
  //   };
  //   dispatch({ type: 'ADD_TRACK', payload: tempTrack });
  //   return trackId;
  // }, [dispatch]);

  // 트랙 추가
  const addTrack = useCallback(async (track: AudioTrack): Promise<string> => {
    const audioService = getAudioService();
    if (!audioService) return '';
    
    try {
      // 트랙 ID가 있으면 사용, 없으면 새로 생성
      const trackId = track.id || uuidv4();
      console.log(`트랙 추가: ${trackId}, 이름: ${track.name}`);
      
      // 오디오 서비스에 트랙 설정
      audioService.setupTrack(track);
      
      // 상태 업데이트
      dispatch({ type: 'ADD_TRACK', payload: track });
      
      return trackId;
    } catch (error) {
      console.error('트랙 추가 중 오류:', error);
      return '';
    }
  }, [getAudioService]);

  // 트랙 제거
  const removeTrack = useCallback((id: string) => {
    const audioService = getAudioService();
    if (!audioService) return;
    
    audioService.releaseTrack(id);
    dispatch({ type: 'REMOVE_TRACK', payload: id });
  }, [getAudioService]);

  // 트랙 업데이트
  const updateTrack = useCallback((id: string, updates: Partial<AudioTrack>) => {
    const audioService = getAudioService();
    if (!audioService) return;
    
    // 오디오 서비스에 트랙 속성 업데이트
    if (updates.volume !== undefined) {
      audioService.setTrackVolume(id, updates.volume);
    }
    
    if (updates.pan !== undefined) {
      audioService.setTrackPan(id, updates.pan);
    }
    
    if (updates.audioBuffer) {
      audioService.setTrackAudioBuffer(id, updates.audioBuffer);
    }
    
    dispatch({ 
      type: 'UPDATE_TRACK',
      payload: { id, updates }
    });
  }, [getAudioService]);

  // 트랙 볼륨 설정
  const setTrackVolume = useCallback((id: string, volume: number) => {
    const audioService = getAudioService();
    if (!audioService) return;
    
    audioService.setTrackVolume(id, volume);
    dispatch({ 
      type: 'SET_TRACK_VOLUME', 
      payload: { id, volume } 
    });
  }, [getAudioService]);

  // 트랙 음소거 토글
  const toggleTrackMute = useCallback((id: string) => {
    const track = state.tracks.find(t => t.id === id);
    if (!track) return;
    
    const audioService = getAudioService();
    if (!audioService) return;
    
    // 음소거 상태에 따라 볼륨 조절
    audioService.setTrackVolume(id, track.muted ? track.volume : 0);
    
    dispatch({ type: 'TOGGLE_TRACK_MUTE', payload: id });
  }, [state.tracks, getAudioService]);

  // 트랙 솔로 토글
  const toggleTrackSolo = useCallback((id: string) => {
    const audioService = getAudioService();
    if (!audioService) return;
    
    dispatch({ type: 'TOGGLE_TRACK_SOLO', payload: id });
    
    // 솔로 처리 로직: 후처리에서 진행
    setTimeout(() => {
      state.tracks.forEach(track => {
        // 솔로 트랙이 있으면 솔로 트랙만 재생, 없으면 음소거되지 않은 모든 트랙 재생
        const soloTracks = state.tracks.filter(t => t.solo);
        const shouldPlay = soloTracks.length === 0 ? !track.muted : track.solo;
        
        audioService.setTrackVolume(
          track.id, 
          shouldPlay ? track.volume : 0
        );
      });
    }, 0);
  }, [state.tracks, getAudioService]);

  // 마스터 볼륨 설정
  const setMasterVolume = useCallback((volume: number) => {
    const audioService = getAudioService();
    if (!audioService) return;
    
    audioService.setMasterVolume(volume);
    dispatch({ type: 'SET_MASTER_VOLUME', payload: volume });
  }, [getAudioService]);

  // 효과 추가
  const addEffect = useCallback((trackId: string, effect: AudioEffect) => {
    const audioService = getAudioService();
    if (!audioService) return;
    
    // 효과 적용
    audioService.applyEffect(trackId, effect);
    
    dispatch({ 
      type: 'ADD_EFFECT', 
      payload: { trackId, effect } 
    });
  }, [getAudioService]);

  // 효과 제거
  const removeEffect = useCallback((trackId: string, effectId: string) => {
    dispatch({ 
      type: 'REMOVE_EFFECT', 
      payload: { trackId, effectId } 
    });
  }, []);

  // 효과 업데이트
  const updateEffect = useCallback((trackId: string, effectId: string, updates: Partial<AudioEffect>) => {
    dispatch({ 
      type: 'UPDATE_EFFECT', 
      payload: { trackId, effectId, updates } 
    });
  }, []);

  // 마커 추가
  const addMarker = useCallback((trackId: string, marker: AudioMarker) => {
    dispatch({ 
      type: 'ADD_MARKER', 
      payload: { trackId, marker }
    });
  }, []);

  // 마커 제거
  const removeMarker = useCallback((trackId: string, markerId: string) => {
    dispatch({ 
      type: 'REMOVE_MARKER', 
      payload: { trackId, markerId }
    });
  }, []);

  // 마커 업데이트
  const updateMarker = useCallback((trackId: string, markerId: string, updates: Partial<AudioMarker>) => {
    dispatch({ 
      type: 'UPDATE_MARKER', 
      payload: { trackId, markerId, updates }
    });
  }, []);

  // 오디오 파일 로드
  const loadAudioFile = useCallback(async (url: string, name: string): Promise<string> => {
    const audioService = getAudioService();
    if (!audioService) return '';
    
    try {
      console.log(`파일 로드 시작: ${url}, 이름: ${name}`);
      
      let audioBuffer: AudioBuffer;
      
      // 로컬 파일 경로 확인 (C:\ 또는 /로 시작하는 경로)
      if (url.match(/^([A-Za-z]:\\|\/)/)) {
        console.log('로컬 파일 경로가 감지되었습니다.');
        
        // Electron 환경 확인
        if (typeof window !== 'undefined' && (window as any).electron) {
          console.log('Electron 환경 감지됨, 로컬 파일 로드 중...');
          
          // Electron의 파일 시스템 모듈 사용
          try {
            const electronFs = (window as any).electron.fs;
            const fileData = await electronFs.readFile(url);
            const arrayBuffer = fileData.buffer;
            
            console.log(`파일 읽기 완료, 크기: ${arrayBuffer.byteLength} 바이트, 디코딩 시작...`);
            audioBuffer = await audioService.decodeAudioData(arrayBuffer);
          } catch (error) {
            console.error('Electron 파일 로드 오류:', error);
            throw new Error(`로컬 파일 접근 오류: ${error instanceof Error ? error.message : String(error)}`);
          }
        } else {
          // 브라우저 환경에서는 파일 선택 대화상자 열기
          console.log('브라우저 환경에서 로컬 파일 접근 시도. 파일 선택기 표시...');
          
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'audio/*';
          
          // 파일 선택 Promise 생성
          const filePromise = new Promise<File>((resolve, reject) => {
            fileInput.onchange = (event) => {
              const files = (event.target as HTMLInputElement).files;
              if (files && files.length > 0) {
                resolve(files[0]);
              } else {
                reject(new Error('파일을 선택하지 않았습니다.'));
              }
            };
            
            // 취소 시 타임아웃 설정
            setTimeout(() => {
              if (!fileInput.files || fileInput.files.length === 0) {
                reject(new Error('파일 선택 시간이 초과되었습니다.'));
              }
            }, 30000); // 30초 타임아웃
          });
          
          // 파일 선택기 클릭
          fileInput.click();
          
          // 선택된 파일 처리
          console.log('파일 선택 대기 중...');
          const file = await filePromise;
          console.log(`파일 선택됨: ${file.name}, 크기: ${file.size} 바이트`);
          
          // 파일 이름을 트랙 이름으로 사용 (이름이 지정되지 않은 경우)
          if (!name) {
            name = file.name;
          }
          
          // 파일을 ArrayBuffer로 변환
          const arrayBuffer = await file.arrayBuffer();
          console.log(`파일 읽기 완료, 크기: ${arrayBuffer.byteLength} 바이트, 디코딩 시작...`);
          
          // 오디오 디코딩 (새로운 decodeAudioData 메소드 사용)
          audioBuffer = await audioService.decodeAudioData(arrayBuffer);
        }
      } else {
        // URL인 경우 오디오 서비스를 통해 로드
        console.log('URL에서 오디오 파일 로드 중...');
        audioBuffer = await audioService.loadAudioFile(url);
      }
      
      console.log(`오디오 버퍼 생성 완료 - 길이: ${audioBuffer.duration.toFixed(2)}초, 채널: ${audioBuffer.numberOfChannels}`);
      
      // 새 트랙 생성
      const trackId = uuidv4();
      console.log(`새 트랙 생성: ${trackId}`);
      
      // 파형 데이터 생성
      console.log('파형 데이터 생성 중...');
      const waveformData = audioService.generateWaveformData(audioBuffer, 2000);
      
      // 새 트랙 객체 생성
      const newTrack: AudioTrack = {
        id: trackId,
        name: name || 'New Track',
        audioBuffer,
        waveformData,
        volume: 1,
        pan: 0,
        muted: false,
        solo: false,
        gain: 1.0,
        startTime: 0,
        duration: audioBuffer.duration,
        effects: [],
        markers: [],
        isSelected: false
      };
      
      // 오디오 트랙 준비
      console.log('트랙 설정 중...');
      audioService.setupTrack(newTrack);
      
      // 디스패치로 상태 업데이트
      console.log('상태 업데이트 중...');
      dispatch({ type: 'ADD_TRACK', payload: newTrack });
      
      // 루프 종료 지점 설정
      if (state.loop.end === 0 || state.loop.end < audioBuffer.duration) {
        dispatch({ 
          type: 'SET_LOOP', 
          payload: { 
            enabled: state.loop.enabled, 
            start: state.loop.start, 
            end: audioBuffer.duration 
          } 
        });
      }
      
      console.log(`트랙 로드 완료: ${trackId}, 이름: ${name}, 길이: ${audioBuffer.duration.toFixed(2)}초`);
      return trackId;
    } catch (error) {
      console.error('오디오 파일 로드 중 오류 발생:', error);
      return '';
    }
  }, [getAudioService, dispatch, state.loop]);

  // 오디오 재생 시작
  const play = useCallback(() => {
    const audioService = getAudioService();
    if (!audioService || state.isPlaying) {
      console.error('AudioService가 초기화되지 않았습니다.');
      return;
    }
    
    console.log('재생 시작 시도...', state.tracks.length, '개의 트랙 존재');
    
    // 일시정지 상태에서 재개하는 경우
    if (state.isPaused) {
      console.log('일시정지 상태에서 재개합니다.');
      audioService.resumePlayback();
      
      dispatch({ type: 'PLAY' });
      
      return;
    }
    
    // 새로 재생을 시작하는 경우
    console.log(`${state.currentTime}초 지점부터 재생합니다.`);
    
    // AudioContext 상태를 체크하고 필요하면 resume
    if (audioService.audioContext.state === 'suspended') {
      console.log('AudioContext가 suspended 상태입니다. resume 시도...');
      audioService.audioContext.resume().then(() => {
        console.log('AudioContext resumed');
        startPlayback();
      }).catch(err => {
        console.error('AudioContext resume 실패:', err);
      });
    } else {
      startPlayback();
    }
  }, [state.isPaused, state.currentTime, state.tracks.length, getAudioService, dispatch]);

  // 실제 재생 시작 로직
  const startPlayback = useCallback(() => {
    const audioService = getAudioService();
    if (!audioService) {
      console.error('startPlayback: AudioService가 초기화되지 않았습니다.');
      return;
    }
    
    // 재생 전 상태 체크
    console.log('재생 시작 전 상태:', {
      트랙수: state.tracks.length,
      현재시간: state.currentTime,
      재생중: state.isPlaying,
      일시정지: state.isPaused
    });
    
    // PLAY 액션을 먼저 디스패치하여 UI 상태 업데이트
    dispatch({ type: 'PLAY' });
    
    // 모든 트랙 재생
    audioService.playAllTracks(state.currentTime);
    
    // 시간 업데이트를 위한 인터벌 설정
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
    }
    
    // 타임 업데이트 인터벌 로직 개선 - 이전보다 더 자주 업데이트
    timeUpdateInterval.current = window.setInterval(() => {
      const audioServiceInstance = getAudioService();
      if (audioServiceInstance && audioServiceInstance.getIsPlaying()) {
        try {
          const newTime = audioServiceInstance.getCurrentTime();
          
          // 시간 변경 감지 및 로그 출력
          if (Math.abs(newTime - state.currentTime) > 0.1) {
            console.log(`시간 업데이트: ${state.currentTime.toFixed(2)}초 -> ${newTime.toFixed(2)}초`);
          }
          
          // 디버그 로그 추가 (빈도 제한)
          if (newTime % 1 < 0.05) { // 대략 1초마다 로그 출력
            console.log(`재생 중: ${newTime.toFixed(2)}초, 전체 길이: ${state.duration.toFixed(2)}초`);
          }
          
          // 중요: UI 상태 업데이트를 위한 디스패치
          dispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
          
          // 루프 기능 처리
          if (state.loop.enabled && newTime >= state.loop.end) {
            audioServiceInstance.playAllTracks(state.loop.start);
            dispatch({ type: 'SET_CURRENT_TIME', payload: state.loop.start });
          }
          
          // 현재 시간이 전체 재생 시간을 초과하면 정지
          // 실제 재생 가능한 길이보다 약간 작은 값으로 비교 (버퍼 오차 고려)
          if (newTime >= state.duration - 0.1 && state.duration > 0) {
            console.log(`재생 종료 지점 도달: ${newTime.toFixed(2)}초 >= ${(state.duration - 0.1).toFixed(2)}초`);
            if (timeUpdateInterval.current) {
              clearInterval(timeUpdateInterval.current);
              timeUpdateInterval.current = null;
            }
            audioServiceInstance.stopAllTracks();
            dispatch({ type: 'STOP' });
          }
        } catch (error) {
          console.error('시간 업데이트 중 오류:', error);
        }
      }
    }, 30); // 30ms마다 업데이트 (더 부드러운 시간 표시를 위해)
  }, [state.currentTime, state.loop, state.duration, state.tracks.length, state.isPlaying, state.isPaused, getAudioService, dispatch]);

  // 일시정지
  const pause = useCallback(() => {
    const audioService = getAudioService();
    if (!audioService || !state.isPlaying) return;
    
    audioService.pausePlayback();
    
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
      timeUpdateInterval.current = null;
    }
    
    dispatch({ type: 'PAUSE' });
  }, [state.isPlaying, getAudioService]);

  // 정지
  const stop = useCallback(() => {
    const audioService = getAudioService();
    if (!audioService) return;
    
    audioService.stopAllTracks();
    
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
      timeUpdateInterval.current = null;
    }
    
    dispatch({ type: 'SET_CURRENT_TIME', payload: 0 });
    dispatch({ type: 'STOP' });
  }, [getAudioService]);

  // 트랙 선택
  const setSelectedTrack = useCallback((trackId: string | null) => {
    dispatch({ type: 'SELECT_TRACK', payload: trackId });
  }, []);

  // 루프 설정
  const setLoop = useCallback((enabled: boolean, start: number, end: number) => {
    dispatch({ 
      type: 'SET_LOOP', 
      payload: { enabled, start, end } 
    });
  }, []);

  // 현재 시간 설정
  const setCurrentTime = useCallback((time: number) => {
    dispatch({ type: 'SET_CURRENT_TIME', payload: time });
  }, []);

  // 오디오 내보내기
  const exportAudio = useCallback(async (id: string, startTime: number, duration: number, format?: 'wav' | 'mp3'): Promise<Blob> => {
    const audioService = getAudioService();
    if (!audioService) {
      throw new Error('오디오 서비스가 초기화되지 않았습니다.');
    }
    
    try {
      return await audioService.exportAudio(id, startTime, duration, format);
    } catch (error) {
      console.error('오디오 내보내기 중 오류:', error);
      throw error;
    }
  }, [getAudioService]);

  return (
    <AudioEditorContext.Provider
      value={{
        state,
        dispatch,
        addTrack,
        removeTrack,
        updateTrack,
        setTrackVolume,
        toggleTrackMute,
        toggleTrackSolo,
        setMasterVolume,
        addEffect,
        removeEffect,
        updateEffect,
        addMarker,
        removeMarker,
        updateMarker,
        setLoop,
        setCurrentTime,
        play,
        pause,
        stop,
        setSelectedTrack,
        loadAudioFile,
        exportAudio
      }}
    >
      {children}
    </AudioEditorContext.Provider>
  );
};

// 훅 사용
export const useAudioEditor = () => {
  const context = useContext(AudioEditorContext);
  if (context === undefined) {
    throw new Error('useAudioEditor must be used within an AudioEditorProvider');
  }
  return context;
};
