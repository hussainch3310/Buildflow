export default function ProjectsPage() {
  const projects = [
    { name: 'BuildFlow Core', status: 'Active', builds: 142, lastDeploy: '2 hours ago' },
    { name: 'Marketing Site', status: 'Active', builds: 89, lastDeploy: '1 day ago' },
    { name: 'API Gateway v2', status: 'Paused', builds: 34, lastDeploy: '5 days ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your CI/CD pipelines and repositories.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => (
          <div key={p.name} className="flex items-center justify-between p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors cursor-pointer">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
