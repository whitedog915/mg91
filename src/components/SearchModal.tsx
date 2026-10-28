import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CornerDownLeft, Sparkles, BookOpen, User, Flame, Crown, Shield } from 'lucide-react';
import { searchArchive, SearchResultItem } from '../data/loreLogic';
import { GothicImage } from './GothicImage';
import { CHARACTERS } from '../data/loreData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: string) => void;
  onSelectCharacter: (charId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  onSelectCharacter,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(searchArchive(''));
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const items = searchArchive(query);
    setResults(items);
  }, [query]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: '전체' },
    { id: '세계관', label: '세계관' },
    { id: '인물', label: '인물' },
    { id: '종족', label: '종족' },
    { id: '히든마왕', label: '히든마왕' },
    { id: '권능', label: '권능' },
  ];

  const filteredResults =
    selectedCategory === 'all'
      ? results
      : results.filter((r) => r.category === selectedCategory);

  const handleSelectResult = (item: SearchResultItem) => {
    if (item.category === '인물' && item.id.startsWith('char-')) {
      const charId = item.id.replace('char-', '');
      const charObj = CHARACTERS.find((c) => c.id === charId);
      if (charObj) {
        onSelectCharacter(charObj.id);
        onClose();
        return;
      }
    }
    onNavigateView(item.viewTarget);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-[#8b1524]/60 bg-[#0c0b10] text-[#ded9d0] shadow-2xl gothic-card flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#2d1620] bg-[#141118]">
          <Search className="w-5 h-5 text-[#d4af37] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="인물, 종족, 룩스 7검, 퀴르소, 히든마왕, 권능, 지명 검색..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none font-serif-kr"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono-code bg-[#201823] text-neutral-400 border border-[#3b1824] rounded">
            ESC
          </kbd>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#24141c] bg-[#100d14] overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#8b1524] text-white font-medium'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#1a141e]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-sm">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-[#8b1524] opacity-50" />
              <p>일치하는 고문서나 마계 기록을 찾을 수 없습니다.</p>
              <p className="text-xs text-neutral-600 mt-1">
                추천 검색어: 퀴르소, 발테르, 사마엘, 분노마왕, 군림, 마정석
              </p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectResult(item)}
                className="w-full text-left p-3 rounded-lg bg-[#14121a]/80 hover:bg-[#1f1622] border border-[#2b1722] hover:border-[#8b1524] transition-all flex items-start gap-3 group"
              >
                {item.code ? (
                  <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                    <GothicImage
                      code={item.code}
                      alt={item.title}
                      aspectRatio="square"
                      showCodeBadge={false}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 shrink-0 rounded bg-[#1e1521] border border-[#3f1926] flex items-center justify-center text-[#d4af37]">
                    <BookOpen className="w-5 h-5 text-[#d4af37]" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#d4af37] font-mono-code">
                      [{item.category}]
                    </span>
                    <h4 className="text-sm font-bold text-white font-serif-kr truncate group-hover:text-[#f3caa1]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-400 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                    {item.snippet}
                  </p>
                </div>

                <div className="self-center hidden sm:flex items-center text-xs text-neutral-500 group-hover:text-[#d4af37] transition-colors">
                  <CornerDownLeft className="w-4 h-4 ml-1" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[#23141c] bg-[#0e0c12] text-[11px] text-neutral-500 flex justify-between items-center">
          <span>마계 군주 공식 고문서 아카이브 검색 시스템</span>
          <span>총 {filteredResults.length}건 검색됨</span>
        </div>
      </div>
    </div>
  );
};
