import React from 'react';
import { motion } from 'framer-motion';

/**
 * Subtle India-inspired background with glowing location pins and connecting lines.
 * Designed to feel ambient, warm, and non-distracting.
 */
export const IndiaBackdrop = () => {
  // Major fashion hub nodes (normalized percentages for responsive SVG positioning)
  const nodes = [
    { id: 'jaipur', cx: '32%', cy: '35%', label: 'Jaipur' },
    { id: 'lucknow', cx: '48%', cy: '32%', label: 'Lucknow' },
    { id: 'varanasi', cx: '56%', cy: '38%', label: 'Varanasi' },
    { id: 'kolkata', cx: '70%', cy: '48%', label: 'Kolkata' },
    { id: 'hyderabad', cx: '45%', cy: '62%', label: 'Hyderabad' },
    { id: 'kochi', cx: '38%', cy: '82%', label: 'Kochi' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft Gradient Radial Backdrop */}
      <div className="absolute inset-0 bg-radial-gradient from-rose-100/30 via-background to-background" />

      {/* SVG Connecting Lines & Animated Nodes */}
      <svg className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C2185B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8E24AA" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Faint Constellation Lines */}
        <line x1="32%" y1="35%" x2="48%" y2="32%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="48%" y1="32%" x2="56%" y2="38%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="56%" y1="38%" x2="70%" y2="48%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="48%" y1="32%" x2="45%" y2="62%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="45%" y1="62%" x2="38%" y2="82%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Floating Glowing Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex items-center justify-center"
          style={{ left: node.cx, top: node.cy }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Outer Ring */}
          <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            {/* Core Glowing Dot */}
            <div className="w-2 h-2 rounded-full bg-primary/60" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default IndiaBackdrop;
