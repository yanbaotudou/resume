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
      caption: '被国防军工单位采纳'
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
        '面向多路摄像头接入场景，实现端侧实时识别与告警。项目为省级大创项目，成果被国防军工单位采纳。',
      outcome: '负责方案设计、核心开发、部署测试全流程。',
      techStack: [
        'C/C++',
        'Linux ARM环境',
        'RKNN SDK',
        'YOLO',
        'OpenCV',
        '多线程模型设计',
        '海康威视SDK',
        'JSON',
        'C#（WPF/WinForms）'
      ],
      architecturePoints: [
        '完成端侧推理链路设计与告警联动，形成可落地的工程方案。',
        '搭建多线程流水线，解耦采集/ROI裁剪/推理/上报，提高吞吐与稳定性。',
        '实现多摄像头与多ROI管理，支持服务器配置下发与热更新。',
        '完成海康SDK/RTSP对接与断线重连机制，保障长时运行可靠性。',
        '开发C#上位机用于设备管理与可视化。'
      ],
      metrics: ['省级大创项目', '成果被国防军工单位采纳']
    },
    {
      id: 'high-performance-yolo',
      title: '高性能YOLO视觉检测系统（嵌入式端/客户端）',
      role: '第一著作人',
      period: '2025.03-2025.06',
      background: '该项目产出软件著作权（第一著作人）。',
      outcome: '独立完成整体架构设计与全部功能实现。',
      techStack: [
        'C/C++',
        'C++11（智能指针、RAII、多线程、STL）',
        '多线程模型设计',
        'RKNN SDK',
        'YOLO',
        'OpenCV',
        'ZeroMQ',
        'Linux ARM环境',
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
