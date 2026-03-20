'use client';

import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Download, Mail, Github, Linkedin, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { LINKS } from '@/lib/content-registry';
import { CONTACT_CARD_SHINE_EVENT } from '@/components/contact/contact-section';

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-[#141414] pt-20 pb-2">
      <div className="container relative z-10 mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <div className="relative z-20 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
          {/* Left: Name, tagline, CTA */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <h1 className="text-6xl font-semibold tracking-tight text-[#f5f5f0]">
                Deven Shah
              </h1>
              <p className="mt-3 text-base text-[#a3a3a3] sm:text-md">
                AI Researcher & M.S. Computer Science Candidate
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <p className="max-w-xl text-base leading-[1.8] text-[#d4d4d4] sm:text-xl">
                Shaping the next generation of intelligent technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 flex flex-col gap-4"
            >
            <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="rounded-md border border-[#525252]/50 bg-[#f5f5f0] px-6 py-2.5 text-sm font-medium text-[#141414] transition-colors hover:bg-[#e8e8e3]"
              onClick={() => {
                window.dispatchEvent(new Event(CONTACT_CARD_SHINE_EVENT));
              }}
            >
              <Activity className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-md border border-[#525252]/40 px-6 py-2.5 text-sm font-medium text-[#f5f5f0] transition-colors hover:border-[#737373] hover:bg-[#262626]"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Resume.pdf';
                link.download = 'Deven_Shah_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Résumé
            </Button>
            </div>
            <div className="flex items-center gap-2">
              <Link href={LINKS.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="lg" className="p-3 text-[#a3a3a3] transition-colors hover:text-[#f5f5f0] hover:bg-[#262626]">
                  <Github className="h-6 w-6" />
                </Button>
              </Link>
              <Link href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="lg" className="p-3 text-[#a3a3a3] transition-colors hover:text-[#f5f5f0] hover:bg-[#262626]">
                  <Linkedin className="h-6 w-6" />
                </Button>
              </Link>
              <Link href={`mailto:${LINKS.email}`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="lg" className="p-3 text-[#a3a3a3] transition-colors hover:text-[#f5f5f0] hover:bg-[#262626]">
                  <Mail className="h-6 w-6" />
                </Button>
              </Link>
              <Link href={LINKS.x} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="lg" className="p-3 text-[#a3a3a3] transition-colors hover:text-[#f5f5f0] hover:bg-[#262626]">
                  <FontAwesomeIcon icon={faXTwitter} className="h-6 w-6" />
                </Button>
              </Link>
            </div>
          </motion.div>
          </div>

          {/* Right: Profile photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <Image
              src="/profile.jpg"
              alt="Deven Shah"
              width={400}
              height={400}
              className="h-48 w-48 rounded-full object-cover object-top sm:h-56 sm:w-56 lg:h-64 lg:w-64"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
