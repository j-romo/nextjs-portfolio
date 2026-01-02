import GitHubContributions from 'app/components/github-contributions'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Joaquin Romo
      </h1>
      <p className="mb-4">
        {`Senior Technical Writer specializing in developer documentation, documentation portals, and API references. I combine deep technical knowledge with clear communication to create content that helps developers build better, faster.`}
      </p>
      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
        {`My expertise spans building and migrating documentation websites, creating technical content for engineering audiences, and experimenting with AI-assisted writing workflows. I believe great documentation is code—it should be tested, versioned, and continuously improved.`}
      </p>

      {/* Resume Section */}
      <div id="resume" className="my-8 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">Resume</h2>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
        >
          <ArrowIcon />
          <span>Download my CV (PDF)</span>
        </a>
      </div>

      {/* Projects Section */}
      <div id="projects" className="my-8 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">Featured Projects</h2>
        <div className="flex flex-col gap-4">
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all">
            <a
              href="https://devportals.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2"
            >
              <ArrowIcon />
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">DevPortals.tech</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  My experience building, documenting, revamping, and migrating developer portals and documentation websites. 
                  Features case studies on modern docs architecture, content strategy, and developer experience patterns using Astro Docs and Vercel.
                </p>
              </div>
            </a>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all">
            <a
              href="https://peanutbutterandjelly.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2"
            >
              <ArrowIcon />
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">PeanutButterAndJelly.ai</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  My creative outlet exploring AI experiments in technical writing and development. 
                  Built with Astro and Sanity CMS, featuring articles on AI-assisted documentation workflows, prompt engineering for technical content, and automation experiments.
                </p>
              </div>
            </a>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all">
            <div className="flex items-start gap-2">
              <ArrowIcon />
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Next.js Portfolio</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  This portfolio site itself! Built with Next.js 14, TypeScript, and Tailwind CSS. 
                  Features MDX blog posts, RSS feed, and optimized for performance with Vercel Analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Activity Section */}
      <div id="github" className="my-8 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">GitHub Activity</h2>
        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          Contributions across personal and work accounts, aggregated using GitHub's GraphQL API.
          This implementation demonstrates server-side data fetching, API integration, and TypeScript type safety.
        </p>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
          <GitHubContributions 
            accounts={[
              { 
                username: 'j-romo', 
                token: process.env.GITHUB_TOKEN_PERSONAL 
              },
              { 
                username: 'jromo-mdb', 
                token: process.env.GITHUB_TOKEN_WORK 
              }
            ]} 
            days={365}
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all">
            <a
              href="https://github.com/j-romo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2"
            >
              <ArrowIcon />
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Personal GitHub: j-romo</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  My personal GitHub profile showcasing my projects, contributions, and open source work.
                </p>
              </div>
            </a>
          </div>
        
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all">
            <a
              href="https://github.com/jromo-mdb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2"
            >
              <ArrowIcon />
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Work GitHub: jromo-mdb</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  My MongoDB work GitHub profile showcasing my projects, contributions, and open source work to the documentation for MongoDB Atlas.
                </p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
