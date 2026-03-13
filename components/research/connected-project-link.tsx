'use client';

import { Paperclip } from 'lucide-react';

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
      className="group inline-flex items-center gap-2 text-[#737373] transition-colors duration-150"
    >
      <Paperclip className="h-3.5 w-3.5 shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
      <span className="text-sm font-medium transition-colors group-hover:text-[#f5f5f0]">
        {title}
      </span>
    </a>
  );
}
