"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Cpu, ShieldCheck, Zap, Globe, LayoutDashboard } from "lucide-react";
import Link from "next/link";

// 1. 프로젝트별 상세 시각 자료 정의
const PROJECT_ASSETS = {
  cmp: {
    heroGif: "/images/cmp/provisioning.gif", // 메인 시연
    features: [
      { title: "관리자 모니터링", desc: "실시간 자원 사용량 트래킹", src: "/images/cmp/admin-monitoring.gif" },
      { title: "터미널 실시간 로그", desc: "Ansible 실행 과정 시각화", src: "/images/cmp/monitoring-terminal.gif" },
      { title: "사용자 히스토리", desc: "과거 배포 이력 관리", src: "/images/cmp/history.png" },
      { title: "간편한 회원가입", desc: "멀티 테넌트 환경 지원", src: "/images/cmp/signup.png" },
    ]
  },
  news: {
    heroGif: "/images/news/demo.gif", 
    features: []
  }
};

// 2. 트러블슈팅 데이터 (아까 작성한 내용 유지)
const TROUBLESHOOTING = [
  {
    title: "Issue 1: 환경 동적화",
    problem: "서버 IP, DB 주소 등이 하드코딩되어 인프라 변경 시 소스 수정 필요.",
    solution: "SystemSetting 관리 시스템 도입으로 접속 정보 중앙 집중화.",
    result: "Cloud-Native 구조 확보 및 유지보수성 향상"
  },
  {
    title: "Issue 2: 실시간 로그 스트리밍",
    problem: "인프라 생성 시 수 분간 진행 상황을 알 수 없는 Black-box 현상.",
    solution: "Redis와 WebSocket을 결합한 실시간 로그 중계 아키텍처 구현.",
    result: "Ansible 배포 전 과정 시각화로 서비스 신뢰도 향상"
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as string;
  const assets = PROJECT_ASSETS[id as keyof typeof PROJECT_ASSETS];

  if (!assets) return <div className="text-white text-center py-20">Project not found.</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-20 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* 상단 네비게이션 */}
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-all w-fit">
          <ArrowLeft size={18} /> <span>Back to Home</span>
        </Link>

        {/* Hero Section: 메인 시연 GIF */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {id === 'cmp' ? 'AWS Hybrid Cloud Platform' : 'AI News Curation'}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              {id === 'cmp' 
                ? "Terraform과 Ansible을 활용하여 복잡한 하이브리드 환경의 인프라 구축을 단 몇 번의 클릭으로 자동화하는 플랫폼입니다." 
                : "LLM 에이전트를 활용한 지능형 뉴스 요약 시스템입니다."}
            </p>
            <div className="flex gap-2 flex-wrap">
              {["Terraform", "Ansible", "AWS", "vSphere", "FastAPI"].map(tech => (
                <span key={tech} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-blue-500/10">
            <img src={assets.heroGif} alt="Hero Demo" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Visual Gallery 그리드 */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <LayoutDashboard className="text-blue-400" size={24} /> 주요 기능 시연
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assets.features.map((feature, idx) => (
              <div key={idx} className="group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={feature.src} alt={feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-200">{feature.title}</h3>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Troubleshooting 섹션 */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" size={24} /> 핵심 해결 과제
          </h2>
          <div className="space-y-6">
            {TROUBLESHOOTING.map((item, idx) => (
              <div key={idx} className="p-8 bg-red-500/5 border border-red-500/10 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap size={80} />
                </div>
                <h3 className="text-red-400 font-bold text-lg mb-4">{item.title}</h3>
                <div className="grid gap-4 text-sm text-slate-300 leading-relaxed">
                  <p><b className="text-slate-100">문제:</b> {item.problem}</p>
                  <p><b className="text-slate-100">해결:</b> {item.solution}</p>
                  <p className="text-emerald-400"><b className="text-slate-100">성과:</b> {item.result}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}