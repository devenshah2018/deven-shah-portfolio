'use client';

import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t border-[#404040]/30 bg-[#141414]">
      <div className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-between gap-6 md:flex-row'>
          <div className='text-center md:text-left'>
            <h3 className="mb-2 text-lg font-semibold text-[#f5f5f0]">Deven Shah</h3>
            <p className="text-sm text-[#a3a3a3]">
              AI Researcher & M.S. Computer Science Candidate 
            </p>
          </div>

        </div>

        <Separator className='my-6' />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-[#a3a3a3] md:flex-row">
          <p>© 2026 Deven Shah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
