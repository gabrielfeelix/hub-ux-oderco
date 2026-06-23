import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import svgPaths from '@/imports/svg-tpjual6yx';

// Helper
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative shrink-0 w-[148px] h-[40px]", className)} data-name="Logo Signa">
      <svg className="block size-full" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 148 39.5985">
        <g id="Logo Signa">
          <g id="Group">
            <path d={svgPaths.p2d08800} fill="currentColor" id="Vector" />
            <path d={svgPaths.p2f0f8380} fill="currentColor" id="Vector_2" />
          </g>
          <g id="Group_2">
            <path d={svgPaths.p32f29000} fill="currentColor" id="Vector_3" />
            <path d={svgPaths.p1f0217c0} fill="currentColor" id="Vector_4" />
            <path d={svgPaths.p2763ad00} fill="currentColor" id="Vector_5" />
            <path d={svgPaths.p15d27980} fill="currentColor" id="Vector_6" />
          </g>
          <path d={svgPaths.p1a078000} fill="currentColor" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}
