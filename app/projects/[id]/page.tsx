"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Cpu, ShieldCheck, Zap, Globe, LayoutDashboard, Share2, Server } from "lucide-react";
import Link from "next/link";

// 1. 프로젝트별 상세 시각 자료 정의
const PROJECT_ASSETS = {
  cmp: {
    heroGif: "/images/cmp/provisioning.gif", // 메인 시연
    architecture: {
      logical: "/images/cmp/logical-arch.png",
      physical: "/images/cmp/physical-arch.png"
    },
    features: [
      { title: "관리자 모니터링", desc: "실시간 자원 사용량 트래킹", src: "/images/cmp/admin-monitoring.gif" },
      { title: "터미널 실시간 로그", desc: "Ansible 실행 과정 시각화", src: "/images/cmp/monitoring-terminal.gif" },
      { title: "사용자 히스토리", desc: "과거 배포 이력 관리", src: "/images/cmp/history.png" },
      { title: "간편한 회원가입", desc: "멀티 테넌트 환경 지원", src: "/images/cmp/signup.png" },
    ]
  },
  news: {
    heroGif: "/images/news/demo.gif",
    architecture: null,
    features: []
  }
};

// 2. 트러블슈팅 데이터
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

  // 아키텍처 탭 상태 (logical | physical)
  const [archTab, setArchTab] = useState<"logical" | "physical">("logical");

  if (!assets) return <div className="text-white text-center py-20">Project not found.</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-20 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* 상단 네비게이션 */}
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-all w-fit">
          <ArrowLeft size={18} /> <span>Back to Home</span>
        </Link>

        {/* 1. Hero Section (시연 GIF) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {id === 'cmp' ? 'AWS Hybrid Cloud Platform' : 'AI News Curation'}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              Terraform과 Ansible을 활용하여 하이브리드 인프라를 자동화하는 플랫폼입니다. 
              vSphere의 온프레미스 자원과 AWS 퍼블릭 클라우드를 통합 관리합니다.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-blue-500/10">
            <img src={assets.heroGif} alt="Hero Demo" className="w-full h-auto" />
          </div>
        </div>

        {/* 2. Architecture Section (핵심 추가 파트) */}
        {assets.architecture && (
          <section className="mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Share2 className="text-blue-400" /> System Architecture
                </h2>
                <p className="text-slate-500 mt-2">논리적 흐름과 물리적 구성을 통한 인프라 설계도</p>
              </div>
              
              {/* 탭 버튼 */}
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button 
                  onClick={() => setArchTab("logical")}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${archTab === "logical" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
                >
                  Logical View
                </button>
                <button 
                  onClick={() => setArchTab("physical")}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${archTab === "physical" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
                >
                  Physical View
                </button>
              </div>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-4 md:p-8 backdrop-blur-sm">
              <div className="relative group cursor-zoom-in overflow-hidden rounded-xl">
                <img 
                  src={archTab === "logical" ? assets.architecture.logical : assets.architecture.physical} 
                  alt="Architecture Diagram" 
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              
              {/* 아키텍처별 핵심 설명 설명 */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">
                    {archTab === "logical" ? "Control Plane" : "Mgmt Cluster"}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {archTab === "logical" 
                      ? "Platform API에서 Ansible 서버로 요청을 전달하고 vCenter Endpoint와 통신합니다." 
                      : "ESXi vCenter 서버와 Ansible, Web Platform이 위치한 핵심 관리 클러스터입니다."}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">
                    {archTab === "logical" ? "Automation Bus" : "Network Design"}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {archTab === "logical" 
                      ? "Ansible Playbook을 통해 Target VM들로 자동화 명령이 전달되는 채널입니다." 
                      : "L2 Bridge Switch를 기반으로 VLAN 10/20/30 및 vMotion 네트워크가 설계되었습니다."}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <h4 className="text-purple-400 font-bold mb-2 font-mono text-sm">
                    {archTab === "logical" ? "Storage Flow" : "External Storage"}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {archTab === "logical" 
                      ? "워크로드 클러스터가 NFS/Nas4Free 스토리지를 공유하여 데이터를 유지합니다." 
                      : "240GB vMEM과 8GB vRAM 기반의 전용 NAS Storage 구성을 통해 데이터 영속성을 보장합니다."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

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