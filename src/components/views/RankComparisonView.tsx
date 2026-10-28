import React, { useState } from 'react';
import { RANK_COMPARISON } from '../../data/loreData';
import { Award, Swords, Skull, Shield, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

export const RankComparisonView: React.FC = () => {
  const [selectedRankIndex, setSelectedRankIndex] = useState(0);

  const activeRank = RANK_COMPARISON[selectedRankIndex];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4af37]">
          <Award className="w-4 h-4 text-[#8b1524]" />
          <span>마계 기록서 제4권</span>
          <span>·</span>
          <span>계위(Rank) 및 전투력 상대 평가</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-kr text-white">
          마족 등급 및 인간계 전투력 등급 비교표
        </h1>

        <p className="text-sm text-neutral-300 font-serif-kr max-w-3xl leading-relaxed">
          마족의 5단계 계위(하급·중급·고위·극마·탈마)와 인간계의 전력 체계(일반병·장수급·국가급·대륙급)를 1:1로 대조한 공식 분석 기록서입니다.
          각 등급별 마력 특성과 전술적 위협도를 확인할 수 있습니다.
        </p>
      </section>

      {/* Interactive Rank Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {RANK_COMPARISON.map((item, idx) => (
          <button
            key={item.demonRank}
            onClick={() => setSelectedRankIndex(idx)}
            className={`p-3.5 rounded-xl border text-left transition-all gothic-card ${
              selectedRankIndex === idx
                ? 'border-[#d4af37] bg-gradient-to-b from-[#2a141e] to-[#140e16] shadow-lg ring-1 ring-[#d4af37]/50'
                : 'border-[#301622] hover:border-[#8b1524] bg-[#120e16]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono-code text-[#d4af37]">
              <span>계위 0{idx + 1}</span>
              <span className="text-[10px] text-neutral-500">{item.combatPowerRange}</span>
            </div>
            <h3 className="text-sm font-bold font-serif-kr text-white mt-1">
              {item.demonRank}
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
              vs {item.humanTier}
            </p>
          </button>
        ))}
      </div>

      {/* Selected Rank Deep Dive Card */}
      <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#8b1524]/60 bg-[#120d15] gothic-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2b1522] pb-4">
          <div>
            <span className="text-xs font-mono-code text-[#d4af37]">
              심층 대조 분석표 (Comparative Dossier)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-kr text-white mt-0.5">
              {activeRank.demonRank} 계위
            </h2>
          </div>
          <div className="px-3 py-1 rounded bg-[#201017] border border-[#481928] text-xs font-mono-code text-[#ffd700]">
            추정 전투력 환산: {activeRank.combatPowerRange}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Demon Side */}
          <div className="p-5 rounded-xl bg-[#16101a] border border-[#371927] space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold font-serif-kr text-sm">
              <Skull className="w-4 h-4 text-[#8b1524]" />
              <span>마족 계위 사양 ({activeRank.demonRank})</span>
            </div>

            <div className="text-xs space-y-2">
              <div>
                <span className="text-[#d4af37] font-semibold">해당 개체 코드: </span>
                <span className="font-mono-code text-neutral-300">{activeRank.demonCode}</span>
              </div>
              <div>
                <span className="text-[#d4af37] font-semibold">마력 특성 및 통솔 규모: </span>
                <span className="text-neutral-200">{activeRank.combatTrait}</span>
              </div>
              <div>
                <span className="text-[#d4af37] font-semibold">상세 생태: </span>
                <p className="text-neutral-300 mt-1 leading-relaxed">{activeRank.description}</p>
              </div>
            </div>
          </div>

          {/* Human Side */}
          <div className="p-5 rounded-xl bg-[#16101a] border border-[#371927] space-y-3">
            <div className="flex items-center gap-2 text-[#ffd700] font-bold font-serif-kr text-sm">
              <Swords className="w-4 h-4 text-[#8b1524]" />
              <span>인간계 대응 등급 ({activeRank.humanTier})</span>
            </div>

            <div className="text-xs space-y-2">
              <div>
                <span className="text-[#d4af37] font-semibold">대응 계위: </span>
                <span className="text-neutral-200">{activeRank.humanTier}</span>
              </div>
              <div>
                <span className="text-[#d4af37] font-semibold">전술적 주의사항: </span>
                <p className="text-neutral-300 mt-1 leading-relaxed">{activeRank.tacticalNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Table Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif-kr text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#8b1524]" />
          <span>전체 계위 총괄 대조 매트릭스</span>
        </h2>

        <div className="overflow-x-auto rounded-xl border border-[#301622] bg-[#0e0c12]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18121d] text-[#d4af37] font-serif-kr border-b border-[#2b1521]">
              <tr>
                <th className="p-3.5 font-bold">마족 등급</th>
                <th className="p-3.5 font-bold">인간계 대응 등급</th>
                <th className="p-3.5 font-bold">마력 특성 및 통솔 규모</th>
                <th className="p-3.5 font-bold">전투력 환산</th>
                <th className="p-3.5 font-bold">대표 개체 및 인물</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24131d] text-neutral-300">
              {RANK_COMPARISON.map((row) => (
                <tr key={row.demonRank} className="hover:bg-[#15101a] transition-colors">
                  <td className="p-3.5 font-bold text-white font-serif-kr whitespace-nowrap">
                    {row.demonRank}
                  </td>
                  <td className="p-3.5 font-semibold text-[#ffd700] whitespace-nowrap">
                    {row.humanTier}
                  </td>
                  <td className="p-3.5 text-neutral-300">
                    {row.combatTrait}
                  </td>
                  <td className="p-3.5 font-mono-code text-red-400 whitespace-nowrap">
                    {row.combatPowerRange}
                  </td>
                  <td className="p-3.5 text-neutral-400 font-mono-code">
                    [{row.demonCode}]
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
