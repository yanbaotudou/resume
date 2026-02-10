import type { ResumeData } from '../types';

export const resumeData: ResumeData = {
  name: '胡力文',
  direction: '嵌入式linux软件开发、C++软件开发',
  city: '成都',
  status: '实习',
  phone: '18982859660',
  email: '18982859660@163.com',
  metrics: [
    {
      value: '45 FPS',
      label: '端侧 YOLO 推理性能',
      caption: 'RK3588 实测'
    },
    {
      value: '30 ms',
      label: '端到端传输延迟',
      caption: '百兆网络实测'
    },
    {
      value: '1 项',
      label: '成果采纳应用',
      caption: '被国防军工集团采纳'
    },
    {
      value: '4 项',
      label: '荣誉与奖项',
      caption: '国家级竞赛与校内奖项'
    }
  ],
  skillGroups: [
    {
      title: 'C/C++',
      skills: [
        'C/C++',
        'C++11（智能指针、RAII、多线程、STL）',
        '条件变量',
        '并发编程',
        '多线程模型设计'
      ]
    },
    {
      title: 'Linux',
      skills: ['Linux ARM环境', '交叉编译', '部署与调试']
    },
    {
      title: '边缘计算与视觉',
      skills: ['YOLO', 'RKNN SDK', 'OpenCV', 'NPU推理']
    },
    {
      title: '上位机开发',
      skills: ['C#（WPF/WinForms）']
    },
    {
      title: '工具与框架',
      skills: ['GCC', 'CMake', 'ZeroMQ', 'Qt', 'VS2022', 'VS Code', 'Git']
    }
  ],
  projects: [
    {
      id: 'rk3576-vision-system',
      title: '边缘计算视觉检测与人员识别系统（RK3576端）',
      role: '项目负责人',
      period: '2025.08-2025.12',
      background:
        '面向多路摄像头接入场景，实现端侧实时识别与告警。项目为省级大创项目，成果被国防军工集团采纳。',
      outcome: '负责方案设计、核心开发、部署测试全流程。',
      detailedIntro: [
        '采用“配置驱动 + 多线程流水线”架构，启动阶段先拉取配置，再初始化摄像头、人员检测、三违识别与人脸识别模块。',
        '支持 `camera_source` 动态增删摄像头与 `area/areas` 单ROI/多ROI裁剪，并维护ROI与原图映射保证回贴准确。',
        '检测结果与标注图通过 `Base64 + JSON` 封装上报，形成端侧识别到云端告警的闭环链路。',
        '守护线程周期拉取人脸资料并完成特征提取与回传，支撑人员库持续更新与离线恢复。',
        '本地 `face_recognition / violations_recognition / save_image` 开关可热生效，无需重启即可调整能力。',
        '具备断线重连、初始化失败重试与日志排障机制，适配 7x24 无人值守运行场景。',
        '在线更新支持程序/模型/依赖下发、MD5 校验与回滚策略，降低现场运维与升级风险。'
      ],
      techStack: [
        'C/C++',
        'Linux ARM环境',
        'RKNN SDK',
        'YOLO',
        'YOLO Violations',
        'OpenCV',
        '多线程模型设计',
        '海康威视SDK',
        'RTSP',
        'JSON',
        'Base64',
        'camera_source',
        'area/areas',
        'capture_interval',
        '功能开关热更新',
        'MD5校验更新',
        'C#（WPF/WinForms）'
      ],
      architecturePoints: [
        '完成端侧推理链路设计与告警联动，形成可落地的工程方案。',
        '搭建多线程流水线，解耦采集/ROI裁剪/推理/上报，提高吞吐与稳定性。',
        '实现多摄像头与多ROI管理，支持服务器配置下发与热更新。',
        '完成海康SDK/RTSP对接与断线重连机制，保障长时运行可靠性。',
        '开发C#上位机用于设备管理与可视化。'
      ],
      metrics: ['省级大创项目', '成果被国防军工集团采纳']
    },
    {
      id: 'high-performance-yolo',
      title: '高性能YOLO视觉检测系统（嵌入式端/客户端）',
      role: '第一著作人',
      period: '2025.03-2025.06',
      background: '该项目产出软件著作权（第一著作人）。',
      outcome: '独立完成整体架构设计与全部功能实现。',
      detailedIntro: [
        '采用 PC 上位机 + NPU 服务端协同架构，PC 负责控制展示，NPU 负责采集、推理与结果回传。',
        '推理模块使用多线程 + 线程池驱动 YOLO 引擎，提升 RK3588 / RK3576 平台 NPU 并行利用率。',
        '相机模块支持参数化初始化（相机ID、触发模式、曝光参数等），统一图像格式供后续推理。',
        'ZeroMQ 双向通信链路承载开始/暂停/断开与结果回传，弱网下具备重试与校验机制。',
        '模型路径、标签路径与线程数均可配置，支持快速切换模型版本与检测类别。',
        '客户端提供连接状态、实时预览与指令控制，提升联调效率与现场运维体验。',
        '说明书侧强调单帧推理可小于50ms，结合项目实测指标形成“架构能力 + 量化结果”证明链路。'
      ],
      techStack: [
        'C/C++',
        'C++11（智能指针、RAII、多线程、STL）',
        'Linux ARM环境',
        'RKNN SDK',
        'YOLO',
        'OpenCV',
        '多线程模型设计',
        '线程池',
        'NPU多核并行',
        'ZeroMQ',
        'PC-Server架构',
        '模型路径参数化',
        '标签路径参数化',
        '相机参数初始化',
        '控制指令协议',
        'C#（WPF/WinForms）'
      ],
      architecturePoints: [
        '在RK3588/RK3576端实现多线程YOLO推理引擎，兼顾性能与稳定性。',
        '使用三缓冲队列解耦采集/推理/发送阶段，降低阻塞与抖动。',
        '完成模型与标签路径参数化，提升部署灵活性。',
        '基于ZeroMQ完成嵌入式端与上位机通信，实现结果实时展示。'
      ],
      metrics: ['RK3588约45FPS', 'RK3576约24FPS', '百兆网络端到端延迟约30ms']
    }
  ],
  education: [
    {
      school: '成都信息工程大学',
      major: '软件工程',
      degree: '本科',
      period: '2023.09-2027.06'
    }
  ],
  honors: [
    '传智杯算法设计赛道国家级三等奖',
    '马蹄杯算法设计赛道国家级三等奖',
    '校级二等奖学金',
    '院系学业优良奖'
  ]
};
