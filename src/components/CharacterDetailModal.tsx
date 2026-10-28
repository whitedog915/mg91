import React, { useEffect } from 'react';
import { CharacterLore } from '../data/loreData';
import { GothicImage } from './GothicImage';
import { X, Shield, Swords, Compass, Skull, ScrollText, AlertTriangle } from 'lucide-react';

interface CharacterDetailModalProps {
  character: CharacterLore | null;
  onClose: () => void;
  onSelectFaction?: (faction: string) => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  character,
  onClose,
  onSelectFaction,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!character) return null;

  const isQuirso = character.code === 'p12';
  const isVelos = character.code === 'p1';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-[#8b1524]/60 bg-[#0e0c12] text-[#ded9d0] shadow-2xl p-6 sm:p-8 gothic-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-md bg-[#1a141c] border border-[#3d1822] transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          {/* Portrait Column */}
          <div className="sm:col-span-5 flex flex-col items-center">
            <div className="w-full relative">
              <GothicImage
                code={character.code}
                alt={character.name}
                aspectRatio="portrait"
                className="w-full shadow-lg border-2 border-[#8b1524]/40"
              />
              {character.stats?.dangerLevel && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-red-900 text-xs font-mono-code text-red-400">
                  위험도: {character.stats.dangerLevel}
                </div>
              )}
            </div>

            {/* Quick Combat Stat Bar */}
            {character.stats && (
              <div className="w-full mt-4 p-3 rounded bg-[#151219] border border-[#2e1720] text-xs space-y-2">
                <div className="flex justify-between items-center text-neutral-400">
                  <span>추정 전투력 지수</span>
                  <span className="font-mono-code text-[#d4af37] font-bold">
                    {character.stats.combatPower} / 100
                  </span>
                </div>
                <div className="w-full bg-[#25151c] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#8b1524] to-[#d4af37] h-full"
                    style={{ width: `${character.stats.combatPower}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400 pt-1">
                  <span>통솔: {character.stats.leadership}</span>
                  <span>지모: {character.stats.intelligence}</span>
                </div>
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="sm:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#d4af37] font-mono-code mb-1">
                <span>{character.faction}</span>
                <span>·</span>
                <span>{character.rank}</span>
                <span>·</span>
                <span className="text-red-400">[{character.code}]</span>
              </div>
              <h2 className="text-2xl font-bold font-serif-kr text-white tracking-wide">
                {character.name}
              </h2>
              <p className="text-sm text-neutral-400 font-serif-kr mt-0.5">
                {character.title} · {character.role}
              </p>
            </div>

            {/* Quote Box */}
            <div className="p-3.5 rounded bg-[#1a1117] border-l-2 border-[#8b1524] text-sm italic font-serif-kr text-[#f0cfc4] leading-relaxed">
              {character.quote}
            </div>

            {/* Relation to User (Special Alert if Quirso / Velos) */}
            <div
              className={`p-3.5 rounded text-xs space-y-1.5 ${
                isQuirso
                  ? 'bg-red-950/40 border border-red-800/80 text-red-200'
                  : isVelos
                  ? 'bg-amber-950/40 border border-amber-800/80 text-amber-200'
                  : 'bg-[#141219] border border-[#341823] text-neutral-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold font-serif-kr text-sm">
                {isQuirso ? (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                ) : (
                  <ScrollText className="w-4 h-4 text-[#d4af37]" />
                )}
                <span>제4대 마계 군주와의 인과 관계</span>
              </div>
              <p className="leading-relaxed">{character.relationToUser}</p>
            </div>

            {/* Description */}
            <div className="text-xs text-neutral-300 leading-relaxed space-y-1">
              <span className="font-semibold text-neutral-200 block">인물 상세 개요</span>
              <p>{character.description}</p>
            </div>

            {/* Personality & Principles */}
            <div className="grid grid-cols-1 gap-2 pt-2 border-t border-[#2d1822] text-xs">
              <div>
                <span className="text-[#d4af37] font-semibold">성격 성향: </span>
                <span className="text-neutral-300">{character.personality}</span>
              </div>
              <div>
                <span className="text-[#d4af37] font-semibold">말투 및 어조: </span>
                <span className="text-neutral-300">{character.speechStyle}</span>
              </div>
              <div>
                <span className="text-[#d4af37] font-semibold">행동 및 판단 원칙: </span>
                <span className="text-neutral-300">{character.behaviorRule}</span>
              </div>
            </div>

            {/* Faction Filter shortcut */}
            {onSelectFaction && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectFaction(character.faction);
                    onClose();
                  }}
                  className="text-xs text-[#d4af37] hover:text-white underline underline-offset-4 transition-colors"
                >
                  「{character.faction}」 관련 기록 전체 모아보기 →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
