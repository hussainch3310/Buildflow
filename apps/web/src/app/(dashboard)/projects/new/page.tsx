'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [repo, setRepo] = useState('');
  const [framework, setFramework] = useState('nextjs');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject = {
      name,
      status: 'Active',
      builds: 0,
      lastDeploy: 'Just now',
      repositoryUrl: repo,
      framework
    };

    const existingStr = localStorage.getItem('buildflow_projects');
    const existing = existingStr ? JSON.parse(existingStr) : [
      { name: 'BuildFlow Core', status: 'Active', builds: 142, lastDeploy: '2 hours ago' },
      { name: 'Marketing Site', status: 'Active', builds: 89, lastDeploy: '1 day ago' },
      { name: 'API Gateway v2', status: 'Paused', builds: 34, lastDeploy: '5 days ago' },
    ];

    localStorage.setItem('buildflow_projects', JSON.stringify([...existing, newProject]));
    
    router.push('/projects');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground mt-1">Create a new CI/CD pipeline or repository project.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="projectName">Project Name</label>
            <input 
              id="projectName"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="framework">Framework</label>
            <select 
              id="framework"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
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
              type="submit" 
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
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
