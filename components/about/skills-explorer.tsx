'use client';

import { useCallback, useState } from 'react';
import { SKILL_MAPPINGS } from '@/database/content-registry';
import { SkillModal } from './skill-modal';
import { SkillsBrowser } from './skills-browser';

export function SkillsExplorer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const selectSkill = useCallback((skill: string) => {
    setSelectedSkill(skill);
    setModalOpen(true);
  }, []);
  return (
    <>
      <SkillsBrowser onSelect={selectSkill} />
      <SkillModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        skillName={selectedSkill}
        skillMappings={SKILL_MAPPINGS}
      />
    </>
  );
}
