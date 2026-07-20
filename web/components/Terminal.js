'use client';

import { useRef, useState } from 'react';

const COMMANDS = {
  help: 'Available commands: whoami, skills, contact, resume, clear, sudo',
  whoami: 'Med Seji Bouallegue - Software Engineering Student @ ESPRIT',
  skills: 'Languages: Java/Python/PHP/TypeScript/JS | Backend: Spring Boot/FastAPI/MySQL | Frontend: Angular/React',
  contact: 'Email: MohamedSeji.Bouallegue@esprit.tn | Location: Tunis, Tunisia',
  resume: 'Download it at /resume.pdf',
  sudo: 'Nice try. This incident will be reported.',
};

const INITIAL_LINES = [
  { type: 'system', text: 'Welcome to MSB-OS v1.0.0' },
  { type: 'system', text: 'Type "help" for available commands.' },
];

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(INITIAL_LINES);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  function focusInput() {
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function onKeyDown(event) {
    if (event.key !== 'Enter') return;
    const raw = value.trim();
    const key = raw.toLowerCase();
    setValue('');
    if (!raw) return;

    setLines((prev) => {
      const next = [...prev, { type: 'user', text: `guest@msb-os:~$ ${raw}` }];
      if (key === 'clear') return [];
      if (COMMANDS[key]) next.push({ type: 'system', text: COMMANDS[key] });
      else next.push({ type: 'error', text: `Command not found: ${key}` });
      return next;
    });

    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  }

  return (
    <>
      <div
        className="terminal-toggle"
        id="terminalToggle"
        role="button"
        tabIndex={0}
        onClick={() => { setOpen(true); focusInput(); }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setOpen(true); focusInput(); } }}
      >
        &gt;_
      </div>

      <div className={`terminal-window ${open ? '' : 'hidden'}`}>
        <div className="terminal-header">
          <span>guest@msb-os:~</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close terminal">x</button>
        </div>
        <div className="terminal-body" ref={bodyRef}>
          {lines.map((line, i) => (
            <div key={i} className={`line ${line.type}`}>{line.text}</div>
          ))}
          <div className="terminal-input-row">
            <span>guest@msb-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              autoComplete="off"
              spellCheck="false"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>
        </div>
      </div>
    </>
  );
}
