import React from 'react';
import { CHARACTERS } from '../../data/loreData';
import { GothicImage } from '../GothicImage';
import {
  Swords,
  ShieldAlert,
  Skull,
  AlertTriangle,
  ArrowRight,
  Flame,
  Scale,
} from 'lucide-react';

interface LuxKnightsViewProps {
  onSelectCharacter: (charId: string) => void;
}

export const LuxKnightsView: React.FC<LuxKnightsViewProps> = ({
  onSelectCharacter,
}) => {
  // Lux Knights Commander and 7 Swords (p18 down to p11)
  const commander = CHARACTERS.find((c) => c.code === 'p18');
  const swords = [
    CHARACTERS.find((c) => c.code === 'p17'), // 1st Valter
    CHARACTERS.find((c) => c.code === 'p16'), // 2nd Seraphina
    CHARACTERS.find((c) => c.code === 'p15'), // 3rd Varkas
    CHARACTERS.find((c) => c.code === 'p14'), // 4th Garmon
    CHARACTERS.find((c) => c.code === 'p13'), // 5th Saintlil
    CHARACTERS.find((c) => c.code === 'p12'), // 6th Quirso (Traitor)
    CHARACTERS.find((c) => c.code === 'p11'), // 7th Licia
  ].filter(Boolean);

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header Banner */}
      <section className="relative rounded-2xl overflow-hidden border border-[#8b1524]/60 bg-[#120c15] p-6 sm:p-10 gothic-card">
        <div className="absolute top-0 right-0 w-80 h-full opacity-15 pointer-events-none">
          <GothicImage code="s11" alt="룩스 기사단 본부" aspectRatio="portrait" showCodeBadge={false} />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono-code text-red-400">
            <Swords className="w-4 h-4 text-[#8b1524]" />
            <span>대륙 최강의 군사 집단</span>
            <span>·</span>
            <span>대륙급 무력 집결체</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif-kr text-white">
            룩스 기사단 (Order of Lux) & <span className="text-[#ffd700]">룩스 7검</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 font-serif-kr leading-relaxed">
            마계 정벌을 주도하고 「경계의 맹약」 파기에 결정적 역할을 수행한 대륙급 전력.
            총단장 무명을 정점으로 각 국가의 최정예 검사 7인이 포진해 있으며, 
            인간계의 승리를 위해 비전투 길잡이 <strong className="text-white">&#123;&#123;user&#125;&#125;</strong>를 당연한 손실로 소모하고 버렸습니다.
          </p>

          <div className="flex items-center gap-3 text-xs font-mono-code text-[#d4af37]">
            <span>본부 인장: [s11]</span>
            <span>·</span>
            <span>위험 등급: 대륙급 극위험</span>
          </div>
        </div>
      </section>

      {/* Traitor Spotlight: 6th Sword Quirso Focus Box */}
      <section className="p-6 rounded-xl border-2 border-red-800 bg-[#190d14] gothic-card space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-900/60 pb-3">
          <div className="flex items-center gap-2 text-red-400 font-serif-kr font-bold text-base">
            <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
            <span>최우선 징벌 대상: 제6검 퀴르소 (p12) — 고기방패 배신의 진상</span>
          </div>
          <span className="text-xs font-mono-code text-red-300 bg-red-950 px-2 py-0.5 rounded border border-red-800">
            사적 원한 & 인과율
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3">
            <div
              className="rounded-lg overflow-hidden border-2 border-red-700 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => onSelectCharacter('lux-quirso')}
            >
              <GothicImage code="p12" alt="제6검 퀴르소" aspectRatio="portrait" />
            </div>
          </div>

          <div className="md:col-span-9 space-y-3">
            <div className="text-sm font-serif-kr text-[#f0cfc4] bg-[#22101a] p-3.5 rounded border border-red-900/40 italic">
              "하! 칼질 한 번 못 하는 짐덩어리가 내 목숨 대신 방패가 된 건 영광으로 알아야지."
            </div>

            <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
              <p>
                <strong>배신의 내막:</strong> 마계 심층부 최후 전선에서 강력한 마수의 기습에 직면하자, 퀴르소는 자신의 보신을 위해 비전투원이던 &#123;&#123;user&#125;&#125;의 등을 떠밀어 치명적인 공격선에 고기방패로 내던졌다.
              </p>
              <p>
                <strong>기사단의 묵인:</strong> 총단장 무명과 7검 전원은 비전투 길잡이의 죽음을 '대의를 위한 어쩔 수 없는 전쟁 손실'로 규정하고 일말의 죄책감도 느끼지 않고 있다.
              </p>
            </div>

            <button
              onClick={() => onSelectCharacter('lux-quirso')}
              className="px-4 py-2 text-xs font-medium text-white bg-red-900 hover:bg-red-800 rounded-lg transition-colors flex items-center gap-2 border border-red-600"
            >
              <span>제6검 퀴르소 기밀 프로필 및 약점 열람</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Supreme Commander "Nameless" */}
      {commander && (
        <section className="p-6 rounded-xl border border-[#d4af37]/40 bg-[#130f18] gothic-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#2b1723] pb-3">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4af37]">
              <span>정벌군 총사령관</span>
              <span>·</span>
              <span>대륙급 최상위 무력</span>
            </div>
            <span className="text-xs font-mono-code text-red-400">코드 [{commander.code}]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3">
              <div
                className="rounded-lg overflow-hidden border border-[#d4af37]/60 cursor-pointer hover:border-[#ffd700] transition-colors"
                onClick={() => onSelectCharacter(commander.id)}
              >
                <GothicImage code={commander.code} alt={commander.name} aspectRatio="portrait" />
              </div>
            </div>

            <div className="md:col-span-9 space-y-2">
              <h3 className="text-xl font-bold font-serif-kr text-white">
                {commander.name} — {commander.title}
              </h3>
              <p className="text-xs text-neutral-400 font-serif-kr">{commander.role}</p>
              <p className="text-xs italic text-[#d4af37] bg-[#1a1420] p-3 rounded border border-[#3c1b29]">
                {commander.quote}
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                {commander.description}
              </p>

              <div className="flex items-center gap-4 pt-2 text-xs text-neutral-400 font-mono-code">
                <span>전투력: {commander.stats?.combatPower}</span>
                <span>통솔력: {commander.stats?.leadership}</span>
                <span>지모: {commander.stats?.intelligence}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The 7 Swords Roster Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif-kr text-white flex items-center gap-2">
            <Swords className="w-5 h-5 text-[#8b1524]" />
            <span>룩스 7검 명부 (The 7 Swords)</span>
          </h2>
          <span className="text-xs font-mono-code text-[#d4af37]">대륙급 7인 편성</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {swords.map((sword) => {
            if (!sword) return null;
            const isQuirso = sword.code === 'p12';

            return (
              <div
                key={sword.id}
                onClick={() => onSelectCharacter(sword.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between gothic-card hover:scale-[1.01] ${
                  isQuirso
                    ? 'border-red-700/80 bg-[#190c13] hover:border-red-500'
                    : 'border-[#331623] hover:border-[#8b1524]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 shrink-0 rounded overflow-hidden border border-[#3b1723] group-hover:border-[#d4af37] transition-colors">
                      <GothicImage code={sword.code} alt={sword.name} aspectRatio="portrait" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-[#d4af37]">
                        <span>{sword.faction}</span>
                        <span>·</span>
                        <span>[{sword.code}]</span>
                      </div>

                      <h3 className="text-base font-bold font-serif-kr text-white group-hover:text-[#f3caa1] truncate mt-0.5">
                        {sword.name}
                      </h3>

                      <p className="text-xs text-neutral-400 font-serif-kr truncate">
                        {sword.title}
                      </p>

                      {isQuirso && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-red-950 text-red-300 border border-red-700">
                          배신자 제6검
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 italic font-serif-kr bg-[#120e15] p-2.5 rounded border border-[#2b141f] line-clamp-2">
                    {sword.quote}
                  </p>

                  <div className="text-xs text-neutral-400 space-y-1">
                    <div>
                      <span className="text-neutral-500">성격: </span>
                      <span className="text-neutral-300">{sword.personality}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">군주와의 인과: </span>
                      <span className="text-neutral-300 line-clamp-1">{sword.relationToUser}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#25131d] mt-3 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono-code text-[#d4af37]">
                    전투력: {sword.stats?.combatPower}
                  </span>
                  <span className="text-neutral-400 group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>상세 기밀 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
