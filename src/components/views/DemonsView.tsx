import React, { useState } from 'react';
import { DEMON_RACES, SPECIAL_ENTITIES, DemonRaceLore } from '../../data/loreData';
import { GothicImage } from '../GothicImage';
import {
  Skull,
  Sparkles,
  GitBranch,
  ShieldAlert,
  ArrowRight,
  Flame,
  Swords,
  ShieldCheck,
} from 'lucide-react';
import { getRankCombatTrait } from '../../data/loreLogic';

interface DemonsViewProps {
  onNavigateView: (view: string) => void;
}

export const DemonsView: React.FC<DemonsViewProps> = ({ onNavigateView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '인간형', '사령족', '기타 마족/마수', '탈마 초월체'];

  const filteredRaces =
    selectedCategory === '전체'
      ? DEMON_RACES
      : DEMON_RACES.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4af37]">
          <Skull className="w-4 h-4 text-[#8b1524]" />
          <span>마계 기록서 제3권</span>
          <span>·</span>
          <span>마족 계통과 생태학 도감</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-kr text-white">
          마계와 마족 종족 도감
        </h1>

        <p className="text-sm text-neutral-300 font-serif-kr max-w-3xl leading-relaxed">
          마계에 서식하는 마족들은 단순한 괴물이 아닌 고유한 문명과 진화 계통을 지니고 있습니다.
          혈귀, 오크, 서큐버스, 사령족, 마수 등 각 종족은 고유한 마력 운용 방식과 전열에서의 전투 역할을 보유하고 있습니다.
        </p>
      </section>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#2d1520]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-serif-kr font-medium transition-all whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#8b1524] text-white border border-[#d4af37]/60 shadow-md'
                : 'bg-[#15111a] text-neutral-400 hover:text-white border border-[#2e1522]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Race Catalog Grid */}
      {selectedCategory !== '탈마 초월체' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaces.map((race) => (
            <div
              key={race.id}
              className="p-5 rounded-xl border border-[#351724] bg-[#120e16] gothic-card hover:border-[#8b1524] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#381624] group-hover:border-[#d4af37] shrink-0">
                    <GothicImage
                      code={race.evolutionPath[0]?.code || 'm1'}
                      alt={race.name}
                      aspectRatio="square"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono-code text-[#d4af37]">
                      {race.category}
                    </span>
                    <h3 className="text-lg font-bold font-serif-kr text-white group-hover:text-[#f3caa1]">
                      {race.name}
                    </h3>
                    <div className="flex gap-1 text-[10px] font-mono-code text-neutral-400 mt-0.5">
                      {race.defaultRanks.map((rk) => (
                        <span key={rk} className="px-1 py-0.2 rounded bg-[#1c131d]">
                          {rk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-serif-kr line-clamp-3">
                  {race.description}
                </p>

                <div className="p-2.5 rounded bg-[#17121b] border border-[#2b141f] text-xs text-neutral-400 space-y-1">
                  <span className="text-[#d4af37] font-semibold block flex items-center gap-1.5">
                    <Swords className="w-3.5 h-3.5 text-[#8b1524]" />
                    <span>전투 및 마력 특성:</span>
                  </span>
                  <p className="text-[11px] text-neutral-300 line-clamp-2">
                    {race.combatStyle}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#25131d] mt-3 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-mono-code">
                  진화 {race.evolutionPath.length}단계 수록
                </span>
                <button
                  onClick={() => onNavigateView('evolution')}
                  className="text-[#d4af37] hover:underline flex items-center gap-1"
                >
                  <span>진화 계통 열람</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Special & Transcendent Entities Roster */}
      {(selectedCategory === '전체' || selectedCategory === '탈마 초월체') && (
        <section className="space-y-4 pt-4 border-t border-[#2d1520]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-serif-kr text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span>탈마(脫魔) 초월체 및 특수 극마 개체</span>
            </h2>
            <span className="text-xs font-mono-code text-purple-400">
              최상위 금기 영역
            </span>
          </div>

          <p className="text-xs text-neutral-400 font-serif-kr">
            마족의 종족적 한계를 초월하여 세계의 법칙과 동화된 희귀 개체들입니다. 극마에서 탈마로의 진화는 역사상 손에 꼽힙니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIAL_ENTITIES.map((ent) => (
              <div
                key={ent.id}
                className="p-5 rounded-xl border border-purple-900/50 bg-[#140e1b] gothic-card space-y-3"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-purple-800 shrink-0">
                    <GothicImage code={ent.code} alt={ent.name} aspectRatio="square" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-purple-400">
                      <span>{ent.rank}</span>
                      <span>·</span>
                      <span>[{ent.code}]</span>
                    </div>
                    <h3 className="text-base font-bold font-serif-kr text-white mt-0.5">
                      {ent.name}
                    </h3>
                    <span className="text-xs text-neutral-400">{ent.category}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-serif-kr">
                  {ent.description}
                </p>

                <div className="p-2 rounded bg-[#1c1224] border border-purple-900/30 text-[11px] text-purple-200">
                  <span className="text-purple-400 font-semibold">초월 권능 특성: </span>
                  <span>{getRankCombatTrait(ent.rank)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Jump to Evolution Tree */}
      <div className="p-6 rounded-xl border border-[#8b1524]/60 bg-gradient-to-r from-[#1c0f18] to-[#120b12] gothic-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif-kr text-white">
            종족별 진화 트리와 해금 시뮬레이션
          </h3>
          <p className="text-xs text-neutral-300 font-serif-kr mt-1">
            중급에서 고위, 극마, 탈마로 이어지는 단계별 진화 조건과 군주의 지배력 소모량을 인터랙티브하게 확인하세요.
          </p>
        </div>
        <button
          onClick={() => onNavigateView('evolution')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#8b1524] hover:bg-[#a31a2c] rounded-lg border border-[#d4af37]/60 transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg shrink-0"
        >
          <GitBranch className="w-4 h-4" />
          <span>진화 계통도 바로가기</span>
        </button>
      </div>
    </div>
  );
};
