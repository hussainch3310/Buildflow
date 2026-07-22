'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit2, Trash2, X } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('buildflow_projects');
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      const initial = [
        { name: 'BuildFlow Core', status: 'Active', builds: 142, lastDeploy: '2 hours ago' },
        { name: 'Marketing Site', status: 'Active', builds: 89, lastDeploy: '1 day ago' },
        { name: 'API Gateway v2', status: 'Paused', builds: 34, lastDeploy: '5 days ago' },
      ];
      setProjects(initial);
      localStorage.setItem('buildflow_projects', JSON.stringify(initial));
    }
    setIsLoaded(true);
  }, []);

  const saveProjects = (newProjects: any[]) => {
    setProjects(newProjects);
    localStorage.setItem('buildflow_projects', JSON.stringify(newProjects));
  };

  const handleDelete = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    saveProjects(projects.filter(p => p.name !== name));
  };

  const handleEdit = (project: any, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEditingProject(project);
  };

  const submitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    const updated = projects.map(p => p.name === editingProject.name ? editingProject : p);
    saveProjects(updated);
    setEditingProject(null);
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Project</h2>
              <button onClick={() => setEditingProject(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={submitEdit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name</label>
                <input 
                  type="text" 
                  value={editingProject.name}
                  className="w-full px-3 py-2 bg-muted border border-input rounded-md text-sm text-muted-foreground cursor-not-allowed"
                  disabled
                />
                <p className="text-xs text-muted-foreground">Project name cannot be changed.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select 
                  value={editingProject.status}
                  onChange={(e) => setEditingProject({...editingProject, status: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-muted text-muted-foreground text-sm font-medium rounded-lg hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your CI/CD pipelines and repositories.</p>
        </div>
        <Link href="/projects/new" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
          + New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => (
          <div key={p.name} className="flex items-center justify-between p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{p.name[0]}</span>
              </div>
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">Last deployed {p.lastDeploy}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="font-semibold">{p.builds}</p>
                <p className="text-muted-foreground text-xs">Builds</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                {p.status}
              </span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleEdit(p, e)}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                  title="Edit Project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDelete(p.name, e)}
                  className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <p className="text-muted-foreground">No projects found. Create one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
