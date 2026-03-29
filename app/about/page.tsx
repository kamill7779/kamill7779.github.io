import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'

import Link from 'next/link'

import { formatDate } from 'pliny/utils/formatDate'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  const experiences = [
    {
      title: '后端开发实习生',
      company: '上海迅廷信息科技',
      period: '2026.01 — 2026.03',
      description:
        '参与微服务系统开发与优化，涵盖交易接口、监控告警、稳定性保障。 开发并优化外部接口适配模块，结合 Redis 分布式锁与限流策略，设计交易数据处理与存储流程, 为监控系统新增延迟监控与告警功能.',
    },
    {
      title: '后端开发实习生',
      company: '北京中科天算科技',
      period: '2025.06 — 2025.08',
      description:
        '无人机通信仿真系统开发, 主导跨语言集成方案设计, 完成 Consul 服务注册配置与 gRPC 跨服务调用链路开发, 设计可拓展信道框架,支持多类型抗干扰算法拓展.',
    },
  ]

  const projects = [
    {
      name: 'QForge',
      role: '全栈开发',
      period: '2025.11 — 2026.02',
      description:
        '面向教育场景的综合性题库与试卷处理平台,支持 Web、桌面端和小程序多端接入,集成 OCR 识别、AI 解析与微服务架构.',
      tags: ['Spring Boot', 'Nacos', 'Docker', 'K3s', 'Vue', 'OCR'],
    },
    {
      name: '银河麒麟系统智能运维助手',
      role: '后端开发',
      period: '2025.05 — 2026.06',
      description:
        '针对国产操作系统运维需求,应用 AI SDK 开发性能监控、日志分析、异常预警智能工具, 基于分布式数据采集与 WebSocket 推送实现毫秒级预警.',
      tags: ['Java', 'Spring', 'AI SDK', 'WebSocket'],
    },
  ]

  const skills = [
    { category: 'Backend', items: ['Java · Spring Boot', 'Go', 'MySQL · Redis', 'gRPC · Consul'] },
    { category: 'Frontend', items: ['React', 'Vue', 'Tailwind CSS', 'Electron'] },
    { category: 'DevOps', items: ['Docker · K3s', 'GitHub Actions', 'Nginx', 'Linux'] },
    { category: 'Intelligence', items: ['OCR', 'AI SDK', 'LLM Integration'] },
  ]

  return (
    <main className="mx-auto max-w-7xl px-8 pt-40 pb-20">
      {/* Hero */}
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="text-secondary mb-6 block font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
            Biography
          </span>
          <h1 className="text-primary mb-12 text-[3.5rem] leading-[1.1] font-black tracking-tighter">
            Building systems with
            <br />
            editorial precision.
          </h1>
          <AuthorLayout content={mainContent}>
            <MDXLayoutRenderer code={author.body.code} />
          </AuthorLayout>
        </div>
        <div className="sticky top-40 lg:col-span-4">
          <div className="bg-surface-container-high aspect-square overflow-hidden rounded-xl">
            <div className="flex h-full w-full items-center justify-center">
              <span className="material-symbols-outlined text-outline-variant text-[8rem]">
                person
              </span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {['Full Stack', 'Systems Design', 'DevOps'].map((tag) => (
              <span
                key={tag}
                className="border-outline-variant/20 text-on-surface-variant rounded-md border px-3 py-1 font-[family-name:var(--font-manrope)] text-[0.7rem] font-bold tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <section className="mt-32">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-primary sticky top-40 text-2xl font-black tracking-tight">
              Tech Stack
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-8">
            {skills.map((group) => (
              <div key={group.category} className="space-y-3">
                <h4 className="text-secondary font-[family-name:var(--font-manrope)] text-xs font-bold tracking-wider uppercase">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="bg-surface-container-low text-on-surface rounded-md px-3 py-1.5 font-[family-name:var(--font-manrope)] text-[0.7rem] tracking-wider"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mt-24">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-primary sticky top-40 text-2xl font-black tracking-tight">
              Experience
            </h2>
          </div>
          <div className="space-y-16 lg:col-span-8">
            {experiences.map((exp, i) => (
              <div key={i} className="group relative">
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="text-on-surface text-xl font-bold">{exp.title}</h3>
                  <span className="text-secondary font-[family-name:var(--font-manrope)] text-sm">
                    {exp.period}
                  </span>
                </div>
                <p className="text-on-surface-variant max-w-xl leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mt-24">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-primary sticky top-40 text-2xl font-black tracking-tight">
              Projects
            </h2>
          </div>
          <div className="space-y-12 lg:col-span-8">
            {projects.map((project) => (
              <div key={project.name} className="bg-surface-container-low rounded-xl p-6">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-on-surface text-lg font-bold">{project.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-secondary font-[family-name:var(--font-manrope)] text-xs">
                      {project.period}
                    </span>
                    <span className="bg-primary/10 text-primary rounded px-2 py-0.5 font-[family-name:var(--font-manrope)] text-[0.65rem] font-bold">
                      {project.role}
                    </span>
                  </div>
                </div>
                <p className="text-on-surface-variant mb-3 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container text-on-surface-variant rounded px-2 py-0.5 font-[family-name:var(--font-manrope)] text-[0.6rem] tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect CTA */}
      <div className="bg-surface-container-low border-outline-variant/10 mx-auto mt-32 max-w-4xl rounded-xl border p-12 text-center">
        <span className="text-secondary mb-6 block font-[family-name:var(--font-manrope)] text-[0.7rem] font-black tracking-[0.2em] uppercase">
          Connectivity
        </span>
        <h2 className="text-primary mb-12 text-3xl font-black tracking-tighter">
          Start a Conversation
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${siteMetadata.email || '#'}`}
            className="bg-primary text-on-primary flex items-center gap-3 rounded-md px-8 py-4 font-bold transition-all active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              mail
            </span>{' '}
            Email Me
          </a>
          <a
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface-container-lowest text-on-surface hover:bg-surface-container-high flex items-center gap-3 rounded-md px-8 py-4 font-bold transition-all active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              terminal
            </span>{' '}
            GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
