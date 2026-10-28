import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HeaderNav } from './components/HeaderNav';
import { SearchModal } from './components/SearchModal';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { WorldOverviewView } from './components/views/WorldOverviewView';
import { FactionsView } from './components/views/FactionsView';
import { LuxKnightsView } from './components/views/LuxKnightsView';
import { DemonsView } from './components/views/DemonsView';
import { RankComparisonView } from './components/views/RankComparisonView';
import { EvolutionTreeView } from './components/views/EvolutionTreeView';
import { AuthorityGrimoireView } from './components/views/AuthorityGrimoireView';
import { HiddenDemonLordsView } from './components/views/HiddenDemonLordsView';
import { CHARACTERS } from './data/loreData';
import { Crown, Sparkles, ScrollText, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('world');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [factionFilter, setFactionFilter] = useState<string>('전체');
  const [dominance, setDominance] = useState<number>(240);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectCharacter = (charId: string) => {
    setSelectedCharacterId(charId);
  };

  const selectedCharacter = CHARACTERS.find((c) => c.id === selectedCharacterId) || null;

  const handleSelectFactionFromModal = (faction: string) => {
    setFactionFilter(faction);
    setActiveView('factions');
  };

  const handleConsumeDominance = (amount: number, reason: string) => {
    setDominance((prev) => Math.max(0, prev - amount));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08070a] text-[#ded9d0] flex flex-col font-serif-kr selection:bg-[#8b1524] selection:text-white grimoire-texture">
      {/* Left Sidebar */}
      <Sidebar
        activeView={activeView}
        onSelectView={(viewId) => {
          setActiveView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
        dominance={dominance}
      />

      {/* Main Content Area (shifted on desktop for sidebar width) */}
      <div className="lg:pl-80 flex-1 flex flex-col min-w-0">
        {/* Top Header conforming to the 3-zone contract */}
        <HeaderNav
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onSelectView={(viewId) => {
            setActiveView(viewId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          activeView={activeView}
        />

        {/* Content Body Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          {activeView === 'world' && (
            <WorldOverviewView
              onNavigateView={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCharacter={handleSelectCharacter}
            />
          )}

          {activeView === 'factions' && (
            <FactionsView
              onSelectCharacter={handleSelectCharacter}
              initialFactionFilter={factionFilter}
            />
          )}

          {activeView === 'lux' && (
            <LuxKnightsView onSelectCharacter={handleSelectCharacter} />
          )}

          {activeView === 'demons' && (
            <DemonsView
              onNavigateView={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeView === 'ranks' && <RankComparisonView />}

          {activeView === 'evolution' && (
            <EvolutionTreeView
              currentDominance={dominance}
              onConsumeDominance={handleConsumeDominance}
            />
          )}

          {activeView === 'authority' && (
            <AuthorityGrimoireView
              dominance={dominance}
              onSetDominance={setDominance}
            />
          )}

          {activeView === 'hidden-lords' && <HiddenDemonLordsView />}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#25121b] bg-[#09080c] py-8 px-4 sm:px-8 text-xs text-neutral-500 font-serif-kr">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <Crown className="w-4 h-4 text-[#8b1524]" />
              <span className="font-semibold text-neutral-300">
                《마계 군주가 되었다》 공식 세계관 고문서 아카이브
              </span>
            </div>
            <div className="text-center sm:text-right space-y-0.5 text-[11px]">
              <p>아론데 대륙력 · 제4대 마계 군주 옥좌 편찬 기록서</p>
              <p className="text-neutral-600 font-mono-code">
                Dominance Engine v4.0 · Demon Realm Records
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateView={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCharacter={handleSelectCharacter}
      />

      {/* Character Dossier Modal */}
      <CharacterDetailModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacterId(null)}
        onSelectFaction={handleSelectFactionFromModal}
      />

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-2.5 rounded-full bg-[#8b1524] text-white border border-[#d4af37]/60 shadow-xl hover:bg-[#a61c2e] transition-all hover:scale-110"
          aria-label="맨 위로 스크롤"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
