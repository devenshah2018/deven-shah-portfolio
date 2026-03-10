'use client';

interface ConnectedProjectLinkProps {
  projectId: string;
  title: string;
}

export function ConnectedProjectLink({ projectId, title }: ConnectedProjectLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('scrollToProjectWithShine', projectId);
    window.location.href = `/#project-${projectId}`;
  };

  return (
    <a
      href={`/#project-${projectId}`}
      onClick={handleClick}
      className="group inline-block transition-colors"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#525252] group-hover:text-[#60a5fa]/90">
        Connected project
      </span>
      <span className="mt-1 block border-b border-[#404040]/30 pb-0.5 text-[15px] font-medium leading-snug text-[#d4d4d4] transition-colors group-hover:border-[#60a5fa]/50 group-hover:text-[#60a5fa]">
        {title}
      </span>
    </a>
  );
}
