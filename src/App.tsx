import { useEffect, useMemo, useState } from 'react';
import { resumeData } from './data/resume';

const copyFallback = (value: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = value;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } finally {
    document.body.removeChild(textArea);
  }

  return copied;
};

type ThemeMode = 'light' | 'dark';

function App() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [theme, setTheme] = useState<ThemeMode>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  const [toast, setToast] = useState('');

  const visibleProjects = useMemo(() => {
    if (!selectedSkill) {
      return resumeData.projects;
    }

    return resumeData.projects.filter((project) => project.techStack.includes(selectedSkill));
  }, [selectedSkill]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    localStorage.setItem('theme', nextTheme);
  };

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(`${label}已复制`);
      return;
    } catch {
      const copied = copyFallback(text);
      setToast(copied ? `${label}已复制` : `复制${label}失败`);
    }
  };

  const handleSkillFilter = (skill: string) => {
    setSelectedSkill((current) => (current === skill ? null : skill));
  };

  const toggleProjectDetail = (projectId: string) => {
    setExpandedProjects((current) => ({
      ...current,
      [projectId]: !current[projectId]
    }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-20 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute right-0 top-72 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto max-w-6xl px-4 pb-3 pt-6 sm:px-6 lg:px-8">
        <div className="surface flex items-center justify-between px-4 py-3 sm:px-6">
          <p className="text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-200">
            Resume / Frontend Single Page
          </p>
          <button
            type="button"
            className="btn-main"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
          >
            {theme === 'dark' ? '亮色模式' : '暗色模式'}
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 sm:px-6 lg:px-8">
        <section className="surface grid gap-6 p-6 md:grid-cols-[1.35fr_1fr] md:p-8" aria-labelledby="hero-title">
          <div className="animate-fade-up" style={{ animationDelay: '80ms' }}>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300">
              Candidate Profile
            </p>
            <h1 id="hero-title" className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              {resumeData.name}
            </h1>
            <p className="mt-4 text-base font-medium text-slate-700 dark:text-slate-200 sm:text-lg">
              {resumeData.direction}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {resumeData.city} | {resumeData.status}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-main"
                onClick={() => copyText(resumeData.phone, '电话')}
                aria-label="复制电话号码"
              >
                复制电话
              </button>
              <button
                type="button"
                className="btn-main"
                onClick={() => copyText(resumeData.email, '邮箱')}
                aria-label="复制邮箱地址"
              >
                复制邮箱
              </button>
            </div>
          </div>

          <aside className="animate-fade-up surface flex flex-col gap-3 border-dashed p-5" style={{ animationDelay: '160ms' }}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
              联系方式
            </h2>
            <a
              href={`tel:${resumeData.phone}`}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:text-sky-300"
              aria-label="拨打电话"
            >
              电话：{resumeData.phone}
            </a>
            <a
              href={`mailto:${resumeData.email}`}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:text-sky-300"
              aria-label="发送邮件"
            >
              邮箱：{resumeData.email}
            </a>
          </aside>
        </section>

        <section className="surface p-6 md:p-8" aria-labelledby="metrics-title">
          <h2 id="metrics-title" className="text-xl font-bold sm:text-2xl">
            亮点指标
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {resumeData.metrics.map((metric, index) => (
              <article
                key={metric.label}
                className="animate-fade-up rounded-xl border border-slate-200/90 bg-slate-50/90 p-4 dark:border-slate-700 dark:bg-slate-800/85"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <p className="font-mono text-2xl font-bold text-sky-600 dark:text-sky-300">{metric.value}</p>
                <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-100">{metric.label}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{metric.caption}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="surface p-6 md:p-8" aria-labelledby="skills-title">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="skills-title" className="text-xl font-bold sm:text-2xl">
              技能栈
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
              {selectedSkill ? `当前筛选：${selectedSkill}` : '点击技能标签可筛选项目'}
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {resumeData.skillGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/70"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-300">
                  {group.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const active = selectedSkill === skill;

                    return (
                      <button
                        type="button"
                        key={skill}
                        className={`chip ${active ? 'chip-active' : ''}`}
                        onClick={() => handleSkillFilter(skill)}
                        aria-pressed={active}
                        aria-label={`按技能筛选项目：${skill}`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="surface p-6 md:p-8" aria-labelledby="projects-title">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="projects-title" className="text-xl font-bold sm:text-2xl">
              项目经历
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">当前展示 {visibleProjects.length} 个项目</p>
          </div>

          {visibleProjects.length === 0 && (
            <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              当前筛选技能暂无匹配项目，请点击同一标签取消筛选。
            </p>
          )}

          <div className="mt-5 grid gap-4">
            {visibleProjects.map((project, index) => {
              const expanded = Boolean(expandedProjects[project.id]);
              const points = expanded
                ? project.architecturePoints
                : project.architecturePoints.slice(0, Math.min(2, project.architecturePoints.length));

              return (
                <article
                  key={project.id}
                  className="animate-fade-up rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-slate-700 dark:bg-slate-900/70"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{project.title}</h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{project.period}</p>
                    </div>
                    <span className="rounded-full border border-sky-400/70 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-400/70 dark:bg-sky-400/20 dark:text-sky-200">
                      {project.role}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{project.background}</p>
                  {project.outcome && (
                    <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{project.outcome}</p>
                  )}

                  <div className="mt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-300">
                      技术栈
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.techStack.map((skill) => {
                        const active = selectedSkill === skill;

                        return (
                          <button
                            key={skill}
                            type="button"
                            className={`chip ${active ? 'chip-active' : ''}`}
                            onClick={() => handleSkillFilter(skill)}
                            aria-label={`按技能筛选项目：${skill}`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-300">
                      架构要点
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                      {points.map((point) => (
                        <li key={point} className="rounded-lg border border-slate-200/80 bg-slate-50/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/80">
                          {point}
                        </li>
                      ))}
                    </ul>
                    {project.architecturePoints.length > 2 && (
                      <button
                        type="button"
                        className="btn-main mt-3"
                        onClick={() => toggleProjectDetail(project.id)}
                        aria-expanded={expanded}
                        aria-label={expanded ? '收起项目更多细节' : '展开项目更多细节'}
                      >
                        {expanded ? '收起细节' : '更多细节'}
                      </button>
                    )}
                  </div>

                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-300">
                        量化结果
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.metrics.map((metric) => (
                          <span key={metric} className="chip">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2" aria-label="教育经历与荣誉证书">
          <article className="surface p-6 md:p-8" aria-labelledby="education-title">
            <h2 id="education-title" className="text-xl font-bold sm:text-2xl">
              教育经历
            </h2>
            <div className="mt-4 space-y-3">
              {resumeData.education.map((item) => (
                <div
                  key={`${item.school}-${item.period}`}
                  className="rounded-xl border border-slate-200 bg-slate-50/90 p-4 dark:border-slate-700 dark:bg-slate-800/80"
                >
                  <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{item.school}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {item.major} | {item.degree}
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">{item.period}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface p-6 md:p-8" aria-labelledby="honors-title">
            <h2 id="honors-title" className="text-xl font-bold sm:text-2xl">
              荣誉证书
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {resumeData.honors.map((honor) => (
                <li
                  key={honor}
                  className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/80"
                >
                  {honor}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>

      <footer className="relative z-10 mx-auto mb-8 flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} 胡力文 · 单页个人简历
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-main cursor-not-allowed opacity-70" disabled aria-label="下载PDF（占位）">
            下载PDF（占位）
          </button>
          <button
            type="button"
            className="btn-main"
            onClick={() => copyText(resumeData.email, '邮箱')}
            aria-label="复制邮箱地址"
          >
            复制邮箱
          </button>
        </div>
      </footer>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-20 animate-toast-in rounded-xl border border-slate-300 bg-white/95 px-4 py-2 text-sm font-semibold text-slate-700 shadow-soft dark:border-slate-600 dark:bg-slate-800/95 dark:text-slate-100"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
