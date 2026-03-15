import { Server, Newspaper, Github, ExternalLink, Cpu } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    id: "cmp",
    title: "AWS Hybrid Cloud Platform",
    category: "Cloud Engineering",
    description: "Terraform과 Ansible를 활용한 인프라 자동화 플랫폼",
    longDescription: "사용자가 UI에서 선택한 인프라 사양을 분석하여 실시간으로 On-Premise 자원 + AWS 자원을 프로비저닝하는 오케스트레이션 시스템입니다.",
    tags: ["Terraform", "Ansible", "AWS", "vSphere"],
    icon: <Server className="text-blue-400 w-6 h-6" />,
    color: "blue"
  },
  {
    id: "news",
    title: "AI Agent News Curation",
    category: "Graduation Thesis",
    description: "MCP-agent 기반 지능형 뉴스 요약 시스템",
    longDescription: "사용자 맞춤 큐스 큐레이션을 제공하여 정보 과부하 문제를 해결하였습니다. LLM과 AI 에이전트를 결합했습니다.",
    tags: ["MCP-agent", "Python", "LLM", "Automation"],
    icon: <Newspaper className="text-purple-400 w-6 h-6" />,
    color: "purple"
  }
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0a0a0a] text-white font-sans">
      {/* 1. Hero Section */}
      <section className="flex flex-col items-center justify-center pt-24 pb-16 px-8 text-center">
        <div className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-emerald-400 uppercase bg-emerald-400/10 border border-emerald-400/20 rounded-full">
          Cloud & AI Automation Engineer
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent pb-2">
          KO MIN SU
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-slate-400 max-w-2xl font-light">
          인프라 오케스트레이션부터 AI 에이전트 자동화까지 <br />
          복잡한 프로세스를 효율적인 시스템으로 구축합니다.
        </p>
      </section>

      {/* 2. Projects Section */}
      <section className="max-w-6xl mx-auto px-8 py-16 w-full">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <Cpu className="text-blue-400" /> Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <Link 
              key={project.id} 
              href={`/projects/${project.id}`}
              className="group relative p-8 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300 block"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl border ${project.color === 'blue' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-purple-500/10 border-purple-500/20'}`}>
                  {project.icon}
                </div>
                <div className="flex gap-4">
                  <Github className="w-5 h-5 text-slate-500 hover:text-white transition-colors" />
                  <ExternalLink className="w-5 h-5 text-slate-500 hover:text-white transition-colors" />
                </div>
              </div>
              
              {project.category === "Graduation Thesis" && (
                <h4 className="text-xs font-bold text-purple-400 mb-1 uppercase tracking-widest">Graduation Thesis</h4>
              )}
              
              <h3 className={`text-2xl font-bold mb-3 transition-colors ${project.color === 'blue' ? 'group-hover:text-blue-400' : 'group-hover:text-purple-400'}`}>
                {project.title}
              </h3>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Footer */}
      <footer className="mt-auto py-12 text-center text-slate-600 text-sm border-t border-slate-900">
        © 2024 Ko Min Su. Built with Next.js & Vercel.
      </footer>
    </main>
  );
}