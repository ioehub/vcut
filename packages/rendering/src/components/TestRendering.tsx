import React, { useState, useEffect } from 'react';
import { RenderJob, RenderSettings } from '../types';
import RenderingEngine from './RenderingEngine';
import ProgressMonitor from './ProgressMonitor';
import RenderingQueue from './RenderingQueue';
import RenderSettingsComponent from './RenderSettings';
import { RenderPresets } from '../utils/renderPresets';
import { detectGPU } from '../utils/hardwareDetection';

/**
 * 렌더링 모듈의 모든 기능을 테스트하기 위한 페이지 컴포넌트
 */
const TestRendering: React.FC = () => {
  const [jobs, setJobs] = useState<RenderJob[]>([]);
  const [currentSettings, setCurrentSettings] = useState<RenderSettings>(RenderPresets['1080p'].settings as RenderSettings);
  const [outputPath, setOutputPath] = useState<string>('C:/Users/사용자/Videos/출력파일.mp4');
  const [projectName, setProjectName] = useState<string>('테스트 프로젝트');
  const [demoMode, setDemoMode] = useState<'settings' | 'progress' | 'queue' | 'hardware'>('settings');
  
  // 초기 GPU 정보 감지 및 설정
  useEffect(() => {
    const gpuInfo = detectGPU();
    console.log('감지된 GPU 정보:', gpuInfo);
  }, []);
  
  // 렌더링 작업 생성
  const createRenderJob = (settings: RenderSettings): RenderJob => {
    return {
      id: 'job-' + Date.now(),
      projectId: 'project-1',
      name: `${projectName} - ${settings.resolution.width}x${settings.resolution.height} (${settings.format})`,
      settings,
      status: 'waiting' as const,
      progress: 0,
      outputPath,
      estimatedTimeRemaining: 0
    };
  };
  
  // 여러 해상도로 테스트 렌더링 작업 생성
  const createMultiResolutionJobs = () => {
    const resolutions = ['480p', '720p', '1080p', '4K'];
    const outputPath = `C:\\Temp\\test_render_${Date.now()}.mp4`;
    
    const newJobs = resolutions.map(res => {
      const [width, height] = res === '4K' 
        ? [3840, 2160] 
        : res === '1080p' 
          ? [1920, 1080] 
          : res === '720p' 
            ? [1280, 720] 
            : [854, 480];
            
      return {
        id: `test-${res}-${Date.now()}`,
        projectId: 'test-project',
        name: `${res} 테스트 렌더링`,
        settings: {
          ...currentSettings,
          resolution: {
            width,
            height,
            aspectRatio: '16:9'
          }
        },
        status: 'waiting' as const,
        progress: 0,
        outputPath: outputPath.replace('.mp4', `-${res}.mp4`),
        estimatedTimeRemaining: 0
      };
    });
    
    setJobs([...jobs, ...newJobs]);
  };
  
  // 렌더링 시작
  const startRendering = () => {
    const newJob = createRenderJob(currentSettings);
    setJobs([...jobs, newJob]);
  };
  
  // 여러 해상도로 일괄 렌더링 시작
  const startBatchRendering = () => {
    const resolutions = ['480p', '720p', '1080p', '4K'];
    const newJobs = resolutions.map((res, index) => {
      const settings = {
        ...RenderPresets[res].settings,
        id: 'batch-' + Date.now() + index,
        name: `${res} 렌더링`
      } as RenderSettings;
      
      return {
        id: 'job-' + Date.now() + index,
        projectId: 'project-1',
        name: `${projectName} - ${res}`,
        settings,
        status: 'waiting' as const,
        progress: 0,
        outputPath: outputPath.replace('.mp4', `-${res}.mp4`),
        estimatedTimeRemaining: 0
      };
    });
    
    setJobs([...jobs, ...newJobs]);
  };
  
  // 작업 상태 변경 핸들러
  const handleJobStatusChange = (jobId: string, status: RenderJob['status']) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job.id === jobId ? { ...job, status } : job
    ));
  };
  
  // 작업 진행 상황 업데이트 핸들러
  const handleJobProgressUpdate = (jobId: string, progress: number, timeRemaining: number) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job.id === jobId ? { ...job, progress, estimatedTimeRemaining: timeRemaining } : job
    ));
  };
  
  // 작업 제거 핸들러
  const handleJobRemove = (jobId: string) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  };
  
  // 설정 변경 핸들러
  const handleSettingsChange = (settings: RenderSettings) => {
    setCurrentSettings(settings);
  };
  
  // 활성 작업 (현재 처리 중인 작업)
  const activeJob = jobs.find(job => job.status === 'processing');
  
  return (
    <div className="test-rendering" style={{
      fontFamily: 'Noto Sans KR, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <header style={{
        marginBottom: '24px',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '16px'
      }}>
        <h1 style={{
          marginTop: '0',
          marginBottom: '16px',
          fontSize: '28px',
          color: '#333'
        }}>vCut 렌더링 모듈 테스트</h1>
        <div className="tabs" style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          <button 
            className={demoMode === 'settings' ? 'active' : ''} 
            onClick={() => setDemoMode('settings')}
            style={{
              padding: '8px 16px',
              border: 'none',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            인코딩 옵션 테스트
          </button>
          <button 
            className={demoMode === 'progress' ? 'active' : ''} 
            onClick={() => setDemoMode('progress')}
            style={{
              padding: '8px 16px',
              border: 'none',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            진행 상황 모니터링 테스트
          </button>
          <button 
            className={demoMode === 'queue' ? 'active' : ''} 
            onClick={() => setDemoMode('queue')}
            style={{
              padding: '8px 16px',
              border: 'none',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            대기열 관리 테스트
          </button>
          <button 
            className={demoMode === 'hardware' ? 'active' : ''} 
            onClick={() => setDemoMode('hardware')}
            style={{
              padding: '8px 16px',
              border: 'none',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            하드웨어 가속 테스트
          </button>
        </div>
      </header>
      
      <main>
        {demoMode === 'settings' && (
          <div className="section" style={{
            marginBottom: '32px'
          }}>
            <h2 style={{
              marginTop: '0',
              marginBottom: '16px',
              fontSize: '22px',
              color: '#333'
            }}>인코딩 옵션 및 품질 설정 테스트</h2>
            <div className="project-info" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px',
              backgroundColor: '#f9f9f9',
              padding: '16px',
              borderRadius: '8px'
            }}>
              <div className="settings-field" style={{
                flex: '1',
                minWidth: '200px'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>프로젝트 이름:</label>
                <input 
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div className="settings-field" style={{
                flex: '1',
                minWidth: '200px'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>출력 경로:</label>
                <input 
                  type="text"
                  value={outputPath}
                  onChange={(e) => setOutputPath(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>
            
            <RenderSettingsComponent
              initialSettings={currentSettings}
              onSettingsChange={handleSettingsChange}
            />
            
            <div className="actions" style={{
              marginTop: '24px',
              textAlign: 'center'
            }}>
              <button 
                className="start-button" 
                onClick={startRendering}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                이 설정으로 렌더링 시작
              </button>
            </div>
          </div>
        )}
        
        {demoMode === 'progress' && (
          <div className="section" style={{
            marginBottom: '32px'
          }}>
            <h2 style={{
              marginTop: '0',
              marginBottom: '16px',
              fontSize: '22px',
              color: '#333'
            }}>렌더링 진행 상황 모니터링 테스트</h2>
            <p style={{
              marginBottom: '16px'
            }}>이 테스트에서는 렌더링 진행 상황을 실시간으로 모니터링할 수 있습니다.</p>
            
            {activeJob ? (
              <div className="progress-test" style={{
                marginBottom: '24px'
              }}>
                <h3 style={{
                  marginTop: '0',
                  marginBottom: '12px',
                  fontSize: '18px',
                  color: '#333'
                }}>현재 렌더링 중: {activeJob.name}</h3>
                <ProgressMonitor 
                  progress={activeJob.progress} 
                  timeRemaining={activeJob.estimatedTimeRemaining}
                  status="처리 중"
                />
                <div className="job-info" style={{
                  backgroundColor: '#f5f5f5',
                  padding: '12px',
                  borderRadius: '4px',
                  marginTop: '16px'
                }}>
                  <p style={{
                    margin: '6px 0'
                  }}><strong>해상도:</strong> {activeJob.settings.resolution.width}x{activeJob.settings.resolution.height}</p>
                  <p style={{
                    margin: '6px 0'
                  }}><strong>포맷:</strong> {activeJob.settings.format.toUpperCase()}</p>
                  <p style={{
                    margin: '6px 0'
                  }}><strong>코덱:</strong> {activeJob.settings.codec}</p>
                  <p style={{
                    margin: '6px 0'
                  }}><strong>하드웨어 가속:</strong> {activeJob.settings.useHardwareAcceleration ? '사용' : '사용 안 함'}</p>
                </div>
              </div>
            ) : (
              <div className="no-active-job" style={{
                textAlign: 'center',
                padding: '32px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}>
                <p style={{
                  marginBottom: '16px'
                }}>현재 진행 중인 렌더링 작업이 없습니다.</p>
                <button 
                  className="start-button" 
                  onClick={startRendering}
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                >
                  테스트 렌더링 시작
                </button>
              </div>
            )}
            
            {/* 엔진 컴포넌트 (작업 시뮬레이션 및 진행 상황 업데이트) */}
            {activeJob && (
              <RenderingEngine
                job={activeJob}
                onProgress={(progress, timeRemaining) => handleJobProgressUpdate(activeJob.id, progress, timeRemaining)}
                onComplete={(job) => handleJobStatusChange(job.id, 'completed')}
                onError={(error) => console.error('렌더링 오류:', error)}
              />
            )}
          </div>
        )}
        
        {demoMode === 'queue' && (
          <div className="section" style={{
            marginBottom: '32px'
          }}>
            <h2 style={{
              marginTop: '0',
              marginBottom: '16px',
              fontSize: '22px',
              color: '#333'
            }}>일괄 렌더링 및 대기열 관리 테스트</h2>
            <p style={{
              marginBottom: '16px'
            }}>이 테스트에서는 여러 렌더링 작업을 대기열에 추가하고 관리할 수 있습니다.</p>
            
            <div className="batch-controls" style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <button 
                className="start-button" 
                onClick={startBatchRendering}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                다양한 해상도로 일괄 렌더링 시작
              </button>
              <button 
                className="start-button" 
                onClick={startRendering}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                현재 설정으로 대기열에 추가
              </button>
            </div>
            
            <RenderingQueue
              jobs={jobs}
              onJobStatusChange={handleJobStatusChange}
              onJobProgressUpdate={handleJobProgressUpdate}
              onJobRemove={handleJobRemove}
            />
            
            {/* 엔진 컴포넌트 (첫 번째 대기 중인 작업을 처리하기 위함) */}
            {jobs.filter(job => job.status === 'waiting').length > 0 && !activeJob && (
              <RenderingEngine
                job={jobs.find(job => job.status === 'waiting')}
                onProgress={(progress, timeRemaining) => {
                  const waitingJob = jobs.find(job => job.status === 'waiting');
                  if (waitingJob) {
                    handleJobProgressUpdate(waitingJob.id, progress, timeRemaining);
                  }
                }}
                onComplete={(job) => handleJobStatusChange(job.id, 'completed')}
                onError={(error) => console.error('렌더링 오류:', error)}
              />
            )}
          </div>
        )}
        
        {demoMode === 'hardware' && (
          <div className="section" style={{
            marginBottom: '32px'
          }}>
            <h2 style={{
              marginTop: '0',
              marginBottom: '16px',
              fontSize: '22px',
              color: '#333'
            }}>하드웨어 가속 렌더링 테스트</h2>
            <p style={{
              marginBottom: '16px'
            }}>이 테스트에서는 하드웨어 가속의 성능 향상을 테스트할 수 있습니다.</p>
            
            <div className="hardware-test" style={{
              marginBottom: '24px'
            }}>
              <div className="settings-field checkbox" style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <input 
                  type="checkbox" 
                  id="use-hardware" 
                  checked={currentSettings.useHardwareAcceleration}
                  onChange={(e) => setCurrentSettings({
                    ...currentSettings,
                    useHardwareAcceleration: e.target.checked
                  })}
                  style={{
                    width: 'auto',
                    marginRight: '8px'
                  }}
                />
                <label 
                  htmlFor="use-hardware" 
                  style={{
                    marginBottom: '0'
                  }}
                >하드웨어 가속 사용</label>
              </div>
              
              <div className="hardware-comparison" style={{
                display: 'flex',
                gap: '16px',
                margin: '24px 0'
              }}>
                <div className="comparison-card" style={{
                  flex: '1',
                  backgroundColor: '#f5f5f5',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <h3 style={{
                    marginTop: '0',
                    marginBottom: '12px',
                    fontSize: '18px',
                    color: '#333'
                  }}>CPU 인코딩</h3>
                  <p style={{
                    margin: '8px 0'
                  }}>장점: 모든 시스템에서 호환</p>
                  <p style={{
                    margin: '8px 0'
                  }}>단점: 더 긴 렌더링 시간, 높은 CPU 사용량</p>
                  <p 
                    className="performance" 
                    style={{
                      fontWeight: 'bold',
                      color: '#2196F3'
                    }}
                  >예상 렌더링 시간: 15초</p>
                </div>
                
                <div 
                  className="comparison-card highlight" 
                  style={{
                    flex: '1',
                    backgroundColor: '#e8f5e9',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #4CAF50'
                  }}
                >
                  <h3 style={{
                    marginTop: '0',
                    marginBottom: '12px',
                    fontSize: '18px',
                    color: '#333'
                  }}>GPU 가속 인코딩</h3>
                  <p style={{
                    margin: '8px 0'
                  }}>장점: 빠른 렌더링 시간, 낮은 CPU 사용량</p>
                  <p style={{
                    margin: '8px 0'
                  }}>단점: 지원되는 하드웨어 필요</p>
                  <p 
                    className="performance" 
                    style={{
                      fontWeight: 'bold',
                      color: '#2196F3'
                    }}
                  >예상 렌더링 시간: 5초</p>
                </div>
              </div>
              
              <div className="hardware-detection" style={{
                margin: '24px 0',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}>
                <h3 style={{
                  marginTop: '0',
                  marginBottom: '16px'
                }}>감지된 하드웨어</h3>
                <RenderingEngine />
              </div>
              
              <div className="actions" style={{
                marginTop: '24px',
                textAlign: 'center'
              }}>
                <button 
                  className="start-button" 
                  onClick={() => {
                    // CPU 버전 렌더링 작업 생성
                    const cpuJob = createRenderJob({
                      ...currentSettings,
                      useHardwareAcceleration: false,
                      name: projectName + ' (CPU 인코딩)'
                    });
                    
                    // GPU 버전 렌더링 작업 생성
                    const gpuJob = createRenderJob({
                      ...currentSettings,
                      useHardwareAcceleration: true,
                      name: projectName + ' (GPU 인코딩)'
                    });
                    
                    setJobs([...jobs, cpuJob, gpuJob]);
                  }}
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                >
                  CPU 및 GPU 렌더링 비교 테스트 시작
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TestRendering;
