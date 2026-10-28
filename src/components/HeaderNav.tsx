import React from 'react';
import { Menu, Search, Sparkles } from 'lucide-react';

interface HeaderNavProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onSelectView: (viewId: string) => void;
  activeView: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenMobileMenu,
  onOpenSearch,
  onSelectView,
  activeView,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 bg-[#0a090e]/95 backdrop-blur-md border-b border-[#2d1520]">
      {/* Zone 1: Single text element wordmark + Mobile Hamburger */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 text-neutral-400 hover:text-white rounded-md bg-[#16121b] border border-[#3b1725]"
          aria-label="사이드바 메뉴 열기"
        >
          <Menu className="w-5 h-5 text-[#d4af37]" />
        </button>

        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectView('world');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-white font-serif-kr whitespace-nowrap shrink-0 hover:text-[#d4af37] transition-colors"
        >
          마계 군주가 되었다
        </a>
      </div>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-neutral-300 font-serif-kr">
        <button
          onClick={() => onSelectView('world')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'world' ? 'text-[#d4af37] font-semibold underline underline-offset-8' : ''
          }`}
        >
          대륙 전도
        </button>
        <button
          onClick={() => onSelectView('lux')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'lux' ? 'text-[#d4af37] font-semibold underline underline-offset-8' : ''
          }`}
        >
          룩스 7검
        </button>
        <button
          onClick={() => onSelectView('demons')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'demons' ? 'text-[#d4af37] font-semibold underline underline-offset-8' : ''
          }`}
        >
          마족 도감
        </button>
        <button
          onClick={() => onSelectView('evolution')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'evolution' ? 'text-[#d4af37] font-semibold underline underline-offset-8' : ''
          }`}
        >
          진화 계통도
        </button>
        <button
          onClick={() => onSelectView('hidden-lords')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'hidden-lords' ? 'text-[#d4af37] font-semibold underline underline-offset-8' : ''
          }`}
        >
          히든 7마왕
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenSearch}
          className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#8b1524] hover:bg-[#a61c2e] border border-[#d4af37]/40 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-md hover:shadow-red-950/50"
        >
          <Search className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>통합 검색</span>
        </button>
      </div>
    </header>
  );
};
