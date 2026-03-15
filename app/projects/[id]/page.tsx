"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Server, Cpu, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const TROUBLESHOOTING_DATA = [
  {
    title: "Issue 1: 환경 동적화",
    problem: "서버 IP, DB 주소, 로그인 경로 등이 하드코딩되어 인프라 변경 시마다 소스 수정 필요",
    solution: "환경 변수 및 DB 기반의 SystemSetting 관리 시스템 도입으로 접속 정보 중앙 집중화",
    result: "인프라 환경 변화에 독립적인 Cloud-Native 소프트웨어 구조 확보 및 유지보수성 향상",
    highlight: "SystemSetting"
  },
  {
    title: "Issue 2: 실시간 로그 스트리밍",
    problem: "인프라 생성(Playbook) 시 수 분간 진행 상황을 알 수 없는 Black-box 현상으로 인한 사용자 불안 유발",
    solution: "Redis(버퍼)와 WebSocket(통신)을 결합한 실시간 로그 중계 아키텍처 설계 및 구현",
    result: "Ansible 배포 전 과정을 실시간 텍스트 로그로 시각화하여 서비스 신뢰도 향상",
    highlight: "Redis & WebSocket"
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id;

  const isCMP = id === "cmp";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft size={20} /> Back to Portfolio
        </Link>

        {/* 프로젝트 헤더 */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            {isCMP ? "AWS Hybrid Cloud Orchestrator" : "AI Agent News Curation"}
          </h1>
          <div className="flex gap-3">
            {(isCMP ? ["Ansible", "AWS", "Terraform", "vSphere", "XigmaNAS"] : ["Python", "LLM", "MCP-Agent"]).map(tech => (
              <span key={tech} className="px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-full text-sm text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* PPT 내용을 반영한 핵심 섹션 */}
        <div className="grid grid-cols-1 gap-12">
          {/* 1. Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">Overview</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              {isCMP 
                ? "인프라 제공을 위해 설계된 하이브리드 클라우드 자원 제공 및 관리 시스템입니다. vSphere 온프레미스 환경과 AWS 퍼블릭 클라우드를 유기적으로 연결했습니다."
                : "사용자 정보 기반으로 AI 에이전트가 뉴스를 수집하고 핵심 정보를 요약하여 전달하는 자동화 파이프라인을 구축했습니다."}
            </p>
          </section>

          {/* 2. Key Accomplishments */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <Zap className="text-yellow-400 mb-4" />
              <h3 className="font-bold mb-2">Efficiency</h3>
              <p className="text-slate-400 text-sm">기존 수동 구축 대비 배포 시간 80% 단축 성공</p>
            </div>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <ShieldCheck className="text-emerald-400 mb-4" />
              <h3 className="font-bold mb-2">Stability</h3>
              <p className="text-slate-400 text-sm">IaC 모듈화를 통한 구성 관리의 무결성 확보</p>
            </div>
          </section>

          {/* 3. Troubleshooting */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">Troubleshooting</h2>
            {TROUBLESHOOTING_DATA.map((item, index) => (
                <div key={index} className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
                <h3 className="text-red-400 font-mono text-sm mb-4">{item.title}</h3>
                <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                    <p><span className="text-red-400/80 font-semibold">발생 문제:</span> {item.problem}</p>
                    <p>
                    <span className="text-blue-400/80 font-semibold">해결 방안:</span> {item.solution}
                    </p>
                    <p><span className="text-emerald-400/80 font-semibold">결과 및 성과:</span> {item.result}</p>
                </div>
                </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}