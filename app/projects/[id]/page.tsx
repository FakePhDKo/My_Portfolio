"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Cpu, ShieldCheck, Zap, LayoutDashboard, Share2, FileText, Download } from "lucide-react";
import Link from "next/link";

// 1. 프로젝트별 통합 데이터 정의 (모든 텍스트를 데이터화)
const PROJECT_DATA = {
  cmp: {
    title: "AWS Hybrid Cloud Platform",
    subTitle: "Terraform과 Ansible을 활용하여 하이브리드 인프라를 자동화하는 플랫폼입니다. vSphere의 온프레미스 자원과 AWS 퍼블릭 클라우드를 통합 관리합니다.",
    heroGif: "/images/cmp/provisioning.gif",
    architecture: {
      logical: "/images/cmp/logical-arch.png",
      physical: "/images/cmp/physical-arch.png",
      // 아키텍처 탭별 하단 설명 카드
      descriptions: {
        logical: [
          { title: "Control Plane", color: "text-blue-400", desc: "Platform API에서 Ansible 서버로 요청을 전달하고 vCenter Endpoint와 통신합니다." },
          { title: "Automation Bus", color: "text-emerald-400", desc: "Ansible Playbook을 통해 Target VM들로 자동화 명령이 전달되는 채널입니다." },
          { title: "Storage Flow", color: "text-purple-400", desc: "워크로드 클러스터가 NFS 스토리지를 공유하여 데이터 영속성을 유지합니다." }
        ],
        physical: [
          { title: "Mgmt Cluster", color: "text-blue-400", desc: "ESXi vCenter 서버와 Ansible, Web Platform이 위치한 관리 클러스터입니다." },
          { title: "Network Design", color: "text-emerald-400", desc: "L2 Bridge Switch를 기반으로 VLAN 및 vMotion 네트워크가 설계되었습니다." },
          { title: "NAS Storage", color: "text-purple-400", desc: "240GB vMEM 기반의 전용 NAS 구성을 통해 고가용성 스토리지를 제공합니다." }
        ]
      }
    },
    features: [
      { title: "관리자 모니터링", desc: "실시간 자원 사용량 트래킹", src: "/images/cmp/admin-monitoring.gif" },
      { title: "웹 터미널 제공", desc: "사용자가 웹에서 즉시 VM 제어 가능", src: "/images/cmp/monitoring-terminal.gif" },
      { title: "배포 히스토리", desc: "과거 인프라 생성 및 변경 이력 관리", src: "/images/cmp/history.png" },
      { title: "가입 승인 시스템", desc: "관리자 승인 기반의 테넌트 격리 환경", src: "/images/cmp/signup.png" },
    ],
    troubleshooting: [
      { title: "Issue 1: 환경 동적화", problem: "인프라 변경 시 하드코딩된 접속 정보 수정의 한계.", solution: "GatewayVM 기반 사설망 및 DB 중앙 설정 테이블 구축.", result: "유지보수 효율성 및 보안성 대폭 향상" },
      { title: "Issue 2: 실시간 로그 스트리밍", problem: "배포 중 진행 상황을 알 수 없는 Black-box 현상.", solution: "Redis와 WebSocket을 결합한 비동기 로그 중계 구현.", result: "배포 가시성 100% 확보 및 사용자 신뢰도 향상" }
    ]
  },
  news: {
    title: "AI Agent News Curation",
    subTitle: "MCP(Model Context Protocol)와 LLM 에이전트를 결합하여 정보 과부하 문제를 해결하는 지능형 뉴스 자동화 파이프라인 연구입니다.",
    heroGif: "/images/news/newspage.gif",
    architecture: {
      logical: "/images/news/news-flow-logic.png", 
      physical: "/images/news/system-infra.png",
      descriptions: {
        logical: [
          { title: "Agentic Workflow", color: "text-blue-400", desc: "에이전트가 뉴스 중요도를 판단하고 적절한 Tool(검색, 요약)을 스스로 선택합니다." },
          { title: "RAG Pipeline", color: "text-emerald-400", desc: "수집된 뉴스 원문을 Vector DB에 적재하여 환각 현상을 방지하고 정확도를 높입니다." },
          { title: "Delivery Loop", color: "text-purple-400", desc: "분석된 결과를 사용자 페르소나에 맞춰 이메일 및 웹으로 자동 전송합니다." }
        ],
        physical: [
          { title: "Data Crawler", color: "text-blue-400", desc: "Python 기반 비동기 크롤러가 다양한 뉴스 API 및 웹 소스를 탐색합니다." },
          { title: "Vector Storage", color: "text-emerald-400", desc: "정형/비정형 뉴스 데이터를 정제하여 효율적인 검색이 가능하도록 저장합니다." },
          { title: "Notification Server", color: "text-purple-400", desc: "SMTP 프로토콜을 활용해 요약된 리포트를 사용자에게 푸시 전송합니다." }
        ]
      }
    },
    features: [
      { title: "지능형 스케줄러", desc: "지정한 시간마다 에이전트가 자동 작동", src: "/images/news/scheduler.gif" },
      { title: "자동 메일 큐레이션", desc: "사용자 맞춤형 요약 리포트 전송", src: "/images/news/mail.gif" },
      { title: "웹 아카이빙", desc: "DB에 저장된 과거 뉴스 데이터 시각화", src: "/images/news/newspage.gif" },
    ],
    troubleshooting: [
      { title: "Issue 1: LLM 환각(Hallucination)", problem: "요약 과정에서 기사에 없는 가짜 정보 생성 위험.", solution: "원본 텍스트 기반 RAG 도입 및 출처 링크 강제 매핑.", result: "큐레이션 정보의 신뢰도 및 객관성 확보" },
      { title: "Issue 2: 수집 속도 병목", problem: "다중 소스 순차 수집 시 처리 시간 지연.", solution: "Asyncio 기반 비동기 파이프라인으로 전환.", result: "전체 처리 속도 기존 대비 약 70% 단축" }
    ],
    thesisAbstract: "본 논문은 정보 과부하 시대의 효율적인 정보 소비를 위해 MCP 기반 에이전트 설계 방안을 연구하였습니다. 단순 수집을 넘어 AI가 맥락을 이해하고 요약하는 자동화 파이프라인의 효율성을 입증하였습니다."
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as keyof typeof PROJECT_DATA;
  const project = PROJECT_DATA[id];

  const [archTab, setArchTab] = useState<"logical" | "physical">("logical");

  if (!project) return <div className="text-white text-center py-20">Project not found.</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-20 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* 상단 네비게이션 */}
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-all w-fit">
          <ArrowLeft size={18} /> <span>Back to Home</span>
        </Link>

        {/* 1. Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              {project.subTitle}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-blue-500/10">
            <img src={project.heroGif} alt="Hero Demo" className="w-full h-auto" />
          </div>
        </div>

        {/* 2. Thesis Abstract (뉴스 프로젝트 전용) */}
        {id === 'news' && project.thesisAbstract && (
          <section className="mb-32 p-8 bg-blue-500/5 border border-blue-500/10 rounded-3xl relative overflow-hidden">
            <div className="absolute -top-6 -right-6 opacity-5 rotate-12 text-blue-400">
              <FileText size={160} />
            </div>
            <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              <FileText size={20} /> Graduation Thesis Abstract
            </h2>
            <p className="text-slate-300 leading-relaxed italic relative z-10">
              "{project.thesisAbstract}"
            </p>
            <button className="mt-8 flex items-center gap-2 px-6 py-3 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-sm font-bold">
              <Download size={18} /> Full Thesis Download (PDF)
            </button>
          </section>
        )}

        {/* 3. Architecture Section */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-100">
                <Share2 className="text-blue-400" /> System Architecture
              </h2>
              <p className="text-slate-500 mt-2">프로젝트의 논리적 흐름과 물리적 구성도</p>
            </div>
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              {["logical", "physical"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setArchTab(tab as any)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all uppercase tracking-wider ${archTab === tab ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-4 md:p-8">
            <div className="relative group cursor-zoom-in overflow-hidden rounded-xl border border-slate-800">
              <img 
                src={archTab === "logical" ? project.architecture.logical : project.architecture.physical} 
                alt="Architecture Diagram" 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.architecture.descriptions[archTab].map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                  <h4 className={`${item.color} font-bold mb-2 font-mono text-sm uppercase`}>{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Visual Gallery 그리드 */}
        <section className="mb-32">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <LayoutDashboard className="text-blue-400" size={24} /> 주요 기능 시연
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.features.map((feature, idx) => (
              <div key={idx} className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-500 transition-all">
                <div className="aspect-video overflow-hidden border-b border-slate-800">
                  <img src={feature.src} alt={feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-200 text-lg mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Troubleshooting 섹션 */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" size={24} /> 핵심 해결 과제
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {project.troubleshooting.map((item, idx) => (
              <div key={idx} className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-400">
                  <Zap size={120} />
                </div>
                <h3 className="text-emerald-400 font-bold text-xl mb-6 flex items-center gap-2">
                   <Zap size={18} fill="currentColor" /> {item.title}
                </h3>
                <div className="space-y-4 text-slate-300">
                  <p className="leading-relaxed"><b className="text-slate-100 bg-slate-800 px-2 py-0.5 rounded mr-2 text-xs">PROBLEM</b> {item.problem}</p>
                  <p className="leading-relaxed"><b className="text-slate-100 bg-slate-800 px-2 py-0.5 rounded mr-2 text-xs">SOLUTION</b> {item.solution}</p>
                  <p className="leading-relaxed text-emerald-400/90 font-medium"><b className="text-slate-100 bg-slate-800 px-2 py-0.5 rounded mr-2 text-xs">RESULT</b> {item.result}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}