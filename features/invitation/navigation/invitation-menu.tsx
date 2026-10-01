'use client';

import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './invitation-menu.module.css';
import { scrollToSection } from '../lib/scroll-to-section';

const sections = [
  { id: 'opening', label: 'The Wedding of' },
  { id: 'couple', label: 'Mempelai' },
  { id: 'journey', label: 'Journey of Love' },
  { id: 'schedule', label: 'Save the Date' },
  { id: 'moments', label: 'Our Moment' },
  { id: 'rsvp', label: 'Konfirmasi Kehadiran' },
  { id: 'wishes', label: 'Wishes' },
  { id: 'gift', label: 'Wedding Gift' },
] as const;

export function InvitationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('opening');
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const marker = window.innerHeight * 0.3;
      let current = '';
      for (const section of document.querySelectorAll<HTMLElement>(
        'section[id]',
      )) {
        if (section.getBoundingClientRect().top <= marker) current = section.id;
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const navigateToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    setIsOpen(false);
    setActiveSection(id);
    if (window.location.hash !== `#${id}`)
      window.history.pushState(null, '', `#${id}`);
    scrollToSection(id);
  };

  return (
    <div
      className={styles.menu}
      ref={menuRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setIsOpen(false);
      }}
    >
      <button
        aria-controls="invitation-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Tutup menu undangan' : 'Buka menu undangan'}
        className={styles.trigger}
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        <span className={styles.hamburger} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <nav
        aria-label="Navigasi undangan"
        className={styles.panel}
        hidden={!isOpen}
        id="invitation-navigation"
      >
        <ol className={styles.links}>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                aria-current={
                  activeSection === section.id ? 'location' : undefined
                }
                href={`#${section.id}`}
                onClick={(event) => navigateToSection(event, section.id)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
