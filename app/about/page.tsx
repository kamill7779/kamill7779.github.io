import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  const experiences = [
    {
      title: '后端开发实习生',
      company: '上海迅廷信息科技',
      period: '2026.01 – 2026.03',
      description: '微服务系统开发，Redis 分布式锁与限流策略，交易数据处理与监控告警.',
    },
    {
      title: '后端开发实习生',
      company: '北京中科天算科技',
      period: '2025.06 – 2025.08',
      description: '无人机通信仿真系统，Consul 服务注册与 gRPC 调用链路，可扩展信道框架设计.',
    },
  ]

  const projects = [
    {
      name: 'QForge',
      role: '核心开发',
      description: '教育题库与试卷处理平台，OCR 识别 + AI 解析，多端接入.',
      tags: ['Spring Boot', 'Vue', 'OCR', 'K3s'],
    },
    {
      name: '银河麒麟智能运维助手',
      role: '后端开发',
      description: 'AI SDK 驱动的性能监控与异常预警，WebSocket 毫秒级推送.',
      tags: ['Java', 'AI SDK', 'WebSocket'],
    },
  ]

  const skills = [
    {
      category: 'Agent & AI',
      items: ['LLM Integration', 'Prompt Engineering', 'Function Calling', 'Multi-Agent'],
    },
    {
      category: 'Languages',
      items: ['TypeScript', 'Go', 'Python', 'Java'],
    },
    { category: 'Cloud Native', items: ['Docker · K8s', 'gRPC', 'Microservices', 'Nginx'] },
    { category: 'DevOps & SRE', items: ['GitHub Actions', 'Linux', 'Monitoring', 'K3s'] },
  ]

  return (
    <main className="mx-auto max-w-7xl px-8 pt-40 pb-20">
      {/* Hero */}
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="text-on-surface-variant mb-6 block font-[family-name:var(--font-inter)] text-xs tracking-widest uppercase">
            About
          </span>
          <h1 className="text-on-surface mb-12 text-[3.5rem] leading-[1.1] font-black tracking-tighter">
            Building Agents.
            <br />
            Shipping Systems.
          </h1>
          <AuthorLayout content={mainContent}>
            <MDXLayoutRenderer code={author.body.code} />
          </AuthorLayout>
        </div>
        <div className="sticky top-40 lg:col-span-4">
          <div className="aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/static/images/avatar.png"
              width={400}
              height={400}
              alt="Kamil Liu"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Agent Development', 'Cloud Native', 'DevOps'].map((tag) => (
              <span
                key={tag}
                className="bg-surface-container-low text-on-surface-variant rounded-full px-3 py-1 font-[family-name:var(--font-inter)] text-[0.65rem] font-bold tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <section className="mt-28">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-on-surface sticky top-40 text-2xl font-black tracking-tight">
              Tech Stack
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-8">
            {skills.map((group) => (
              <div key={group.category} className="space-y-3">
                <h4 className="text-on-surface-variant font-[family-name:var(--font-inter)] text-xs font-bold tracking-wider uppercase">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="bg-surface-container-low text-on-surface rounded-md px-3 py-1.5 font-[family-name:var(--font-inter)] text-[0.7rem] tracking-wider"
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
            <h2 className="text-on-surface sticky top-40 text-2xl font-black tracking-tight">
              Experience
            </h2>
          </div>
          <div className="space-y-12 lg:col-span-8">
            {experiences.map((exp, i) => (
              <div key={i}>
                <div className="mb-2 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-on-surface text-lg font-bold">{exp.title}</h3>
                    <p className="text-on-surface-variant font-[family-name:var(--font-inter)] text-xs">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-on-surface-variant font-[family-name:var(--font-inter)] text-xs">
                    {exp.period}
                  </span>
                </div>
                <p className="text-on-surface-variant max-w-xl text-sm leading-relaxed">
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
            <h2 className="text-on-surface sticky top-40 text-2xl font-black tracking-tight">
              Projects
            </h2>
          </div>
          <div className="space-y-8 lg:col-span-8">
            {projects.map((project) => (
              <div key={project.name} className="bg-surface-container-low rounded-xl p-6">
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <h3 className="text-on-surface font-bold">{project.name}</h3>
                  <span className="bg-primary/10 text-primary shrink-0 rounded px-2 py-0.5 font-[family-name:var(--font-inter)] text-[0.6rem] font-bold">
                    {project.role}
                  </span>
                </div>
                <p className="text-on-surface-variant mb-3 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container text-on-surface-variant rounded px-2 py-0.5 font-[family-name:var(--font-inter)] text-[0.6rem] tracking-wider uppercase"
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

      {/* Connect */}
      <div className="mx-auto mt-28 max-w-2xl text-center">
        <h2 className="text-on-surface mb-8 text-3xl font-black tracking-tighter">Get in Touch</h2>
        <div className="flex justify-center gap-4">
          <a
            href={`mailto:${siteMetadata.email || '#'}`}
            className="bg-primary text-on-primary flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition-all active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              mail
            </span>{' '}
            Email
          </a>
          <a
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface-container-lowest text-on-surface hover:bg-surface-container-high flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition-all active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              terminal
            </span>{' '}
            GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
