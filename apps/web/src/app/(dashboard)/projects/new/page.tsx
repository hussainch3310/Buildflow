'use client';
import Link from 'next/link';

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground mt-1">Create a new CI/CD pipeline or repository project.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="projectName">Project Name</label>
            <input 
              id="projectName"
              type="text" 
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. My Awesome App"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="repositoryUrl">Repository URL</label>
            <input 
              id="repositoryUrl"
              type="url" 
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="framework">Framework</label>
            <select 
              id="framework"
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="nextjs">Next.js</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="express">Express</option>
              <option value="nestjs">NestJS</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button 
              type="button" 
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
              onClick={() => {
                // Future functionality to handle form submission
                alert('Project creation functionality coming soon!');
              }}
            >
              Create Project
            </button>
            <Link 
              href="/projects" 
              className="px-4 py-2 bg-muted text-muted-foreground text-sm font-medium rounded-lg hover:bg-accent transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
