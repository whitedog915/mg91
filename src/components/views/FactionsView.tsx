import React, { useState } from 'react';
import { CHARACTERS, CharacterLore } from '../../data/loreData';
import { GothicImage } from '../GothicImage';
import {
  Landmark,
  Shield,
  Swords,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface FactionsViewProps {
  onSelectCharacter: (charId: string) => void;
  initialFactionFilter?: string;
}

export const FactionsView: React.FC<FactionsViewProps> = ({
  onSelectCharacter,
  initialFactionFilter,
}) => {
  const [selectedFaction, setSelectedFaction] = useState<string>(
    initialFactionFilter || '전체'
  );

  const factions = [
    {
      id: '전체',
      name: '전체 세력',
      code: 's12',
      summary: '아론데 대륙의 모든 참전 세력과 지휘관 총람',
    },
    {
      id: '벨하임 왕국',
      name: '벨하임 왕국 (Belheim)',
      code: 's8',
      summary: '왕도 중심의 군사 강국. 정통성과 기사도 명예를 표방하나 정벌의 주축.',
    },
    {
      id: '아르덴 제국',
      name: '아르덴 제국 (Arden)',
      code: 's9',
      summary: '군사력과 마법 연구 강대국. 마정석 독점과 실리적 이익을 목표로 함.',
    },
    {
      id: '세레니아 성왕국',
      name: '세레니아 성왕국 (Serenia)',
      code: 's10',
      summary: '성역과 신앙 중심의 종교 강국. 불경한 마족 절멸을 신성한 대의로 규정.',
    },
    {
      id: '중립/기타',
      name: '중립 및 장수급 세력',
      code: 'p5',
      summary: '용병왕, 북부 수인 부족장, 투기장 챔피언, 뒷골목 살수맹 등 독자 세력.',
    },
  ];

  const filteredCharacters =
    selectedFaction === '전체'
      ? CHARACTERS.filter((c) => c.faction !== '마계')
      : CHARACTERS.filter((c) => c.faction === selectedFaction);

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4af37]">
          <Landmark className="w-4 h-4 text-[#8b1524]" />
          <span>대륙 기록서 제2권</span>
          <span>·</span>
          <span>인간계 3대 강국과 중립 세력</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-kr text-white">
          인간계 주요 세력 및 전력 분석
        </h1>

        <p className="text-sm text-neutral-300 font-serif-kr max-w-3xl leading-relaxed">
          마계 정벌에 참전한 세력들은 단순한 선악의 이분법이 아닌, 고유한 정치적 야망, 마정석 자원 독점욕, 신앙의 대의, 그리고 생존을 위한 독자적 이해관계로 얽혀 있습니다.
        </p>
      </section>

      {/* Faction Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#2d1520]">
        {factions.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFaction(f.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-serif-kr font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
              selectedFaction === f.id
                ? 'bg-[#8b1524] text-white border border-[#d4af37]/60 shadow-md'
                : 'bg-[#15111a] text-neutral-400 hover:text-white border border-[#2e1522]'
            }`}
          >
            <span>{f.name}</span>
          </button>
        ))}
      </div>

      {/* Faction Banner Details if specific */}
      {selectedFaction !== '전체' && (
        <div className="p-5 rounded-xl border border-[#8b1524]/40 bg-[#140f17] gothic-card flex flex-col sm:flex-row items-center gap-5">
          <div className="w-full sm:w-44 shrink-0 rounded-lg overflow-hidden border border-[#8b1524]/60">
            <GothicImage
              code={factions.find((f) => f.id === selectedFaction)?.code || 's8'}
              alt={selectedFaction}
              aspectRatio="video"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-serif-kr text-white">
              {factions.find((f) => f.id === selectedFaction)?.name}
            </h3>
            <p className="text-xs text-neutral-300 font-serif-kr leading-relaxed">
              {factions.find((f) => f.id === selectedFaction)?.summary}
            </p>
            <div className="text-[11px] text-[#d4af37] font-mono-code pt-1">
              소속 주요 무장 및 지휘관: {filteredCharacters.length}명 확인됨
            </div>
          </div>
        </div>
      )}

      {/* Character Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((char) => {
          const isQuirso = char.code === 'p12';

          return (
            <div
              key={char.id}
              onClick={() => onSelectCharacter(char.id)}
              className={`p-5 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between gothic-card hover:scale-[1.01] ${
                isQuirso
                  ? 'border-red-800/80 hover:border-red-500 bg-[#160c11]'
                  : 'border-[#381825] hover:border-[#8b1524]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-16 h-20 shrink-0 rounded overflow-hidden border border-[#3b1723] group-hover:border-[#d4af37] transition-colors">
                    <GothicImage
                      code={char.code}
                      alt={char.name}
                      aspectRatio="portrait"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-[#d4af37]">
                      <span>{char.faction}</span>
                      <span>·</span>
                      <span className="text-neutral-400">{char.rank}</span>
                    </div>

                    <h3 className="text-base font-bold font-serif-kr text-white group-hover:text-[#f3caa1] truncate mt-0.5">
                      {char.name}
                    </h3>

                    <p className="text-xs text-neutral-400 font-serif-kr truncate">
                      {char.title}
                    </p>

                    {isQuirso && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-red-950 text-red-300 border border-red-800">
                        길잡이 배신 주범
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-neutral-300 line-clamp-2 italic font-serif-kr bg-[#120e15] p-2.5 rounded border border-[#2b141f]">
                  {char.quote}
                </p>

                <div className="text-xs text-neutral-400 space-y-1">
                  <div>
                    <span className="text-neutral-500">성격: </span>
                    <span className="text-neutral-300">{char.personality}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">행동 원칙: </span>
                    <span className="text-neutral-300 line-clamp-1">{char.behaviorRule}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#25131d] mt-3 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono-code text-[#d4af37]">
                  전투력 지수: {char.stats?.combatPower || '??'}
                </span>
                <span className="text-neutral-400 group-hover:text-white flex items-center gap-1 transition-colors">
                  <span>상세 기밀 문서</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
