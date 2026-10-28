import React, { useState } from 'react';
import { DEMON_RACES, DemonRaceLore } from '../../data/loreData';
import { GothicImage } from '../GothicImage';
import {
  GitBranch,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { canEvolve, calculateDominanceCost } from '../../data/loreLogic';

interface EvolutionTreeViewProps {
  currentDominance: number;
  onConsumeDominance: (amount: number, reason: string) => void;
}

export const EvolutionTreeView: React.FC<EvolutionTreeViewProps> = ({
  currentDominance,
  onConsumeDominance,
}) => {
  const [selectedRaceId, setSelectedRaceId] = useState<string>('vampire');
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [simulationMessage, setSimulationMessage] = useState<string | null>(null);

  const currentRace =
    DEMON_RACES.find((r) => r.id === selectedRaceId) || DEMON_RACES[0];
  const activeNode = currentRace.evolutionPath[selectedNodeIndex];

  const handleTestEvolution = (targetIdx: number) => {
    if (targetIdx === 0) {
      setSimulationMessage('기본 해금 단계입니다. 추가 개화가 필요하지 않습니다.');
      return;
    }

    const prevNode = currentRace.evolutionPath[targetIdx - 1];
    const targetNode = currentRace.evolutionPath[targetIdx];

    const check = canEvolve(
      prevNode.stage,
      targetNode.stage,
      currentDominance,
      true // Assume condition verified for simulator preview
    );

    if (check.allowed) {
      onConsumeDominance(
        targetNode.dominanceRequired,
        `개화 권능 발현: [${currentRace.name}] ${prevNode.name} → ${targetNode.name}`
      );
      setSimulationMessage(
        `> **[⚠ 시스템]** 군주의 권능 발현 — 「개화」 성공! 대상: ${targetNode.name} (${targetNode.stage}). 지배력 -${targetNode.dominanceRequired} 소모 완료.`
      );
    } else {
      setSimulationMessage(`⚠ 개화 불가: ${check.reason}`);
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4af37]">
          <GitBranch className="w-4 h-4 text-[#8b1524]" />
          <span>마계 기록서 제5권</span>
          <span>·</span>
          <span>종족별 상위 진화 계통도</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-kr text-white">
          종족별 진화 방법과 인터랙티브 진화 트리
        </h1>

        <p className="text-sm text-neutral-300 font-serif-kr max-w-3xl leading-relaxed">
          마계의 마족은 군주의 고유 권능 「개화」와 엄격한 시련 조건을 통해 상위 형태로 도약합니다.
          진화할 때마다 외형 인장, 전투력, 그리고 고유 각성 능력이 영구적으로 갱신됩니다.
        </p>
      </section>

      {/* Race Selector Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#2d1520]">
        {DEMON_RACES.map((race) => (
          <button
            key={race.id}
            onClick={() => {
              setSelectedRaceId(race.id);
              setSelectedNodeIndex(0);
              setSimulationMessage(null);
            }}
            className={`px-4 py-2.5 rounded-lg text-xs font-serif-kr font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
              selectedRaceId === race.id
                ? 'bg-[#8b1524] text-white border border-[#d4af37]/60 shadow-lg'
                : 'bg-[#15111a] text-neutral-400 hover:text-white border border-[#2e1522]'
            }`}
          >
            <span>{race.name}</span>
            <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded bg-black/40">
              {race.evolutionPath.length}단계
            </span>
          </button>
        ))}
      </div>

      {/* Evolution Tree Visual Flow */}
      <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#8b1524]/50 bg-[#100d14] gothic-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#29131d] pb-4">
          <div>
            <span className="text-xs font-mono-code text-[#d4af37]">
              {currentRace.category} 계통도
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-kr text-white mt-0.5">
              {currentRace.name} 진화 흐름
            </h2>
          </div>
          <div className="text-xs font-mono-code text-neutral-400 flex items-center gap-2">
            <span>보유 지배력:</span>
            <span className="text-[#ffd700] font-bold">🔮 {currentDominance} PT</span>
          </div>
        </div>

        {/* Linear Stepped Graph Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {currentRace.evolutionPath.map((step, idx) => {
            const isSelected = selectedNodeIndex === idx;
            const canAfford = currentDominance >= step.dominanceRequired;

            return (
              <div
                key={step.code}
                onClick={() => {
                  setSelectedNodeIndex(idx);
                  setSimulationMessage(null);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative gothic-card flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#d4af37] bg-gradient-to-b from-[#28131e] to-[#140e16] shadow-xl ring-2 ring-[#d4af37]/40'
                    : 'border-[#331623] hover:border-[#8b1524] bg-[#141018]'
                }`}
              >
                {/* Node Step Index Marker */}
                <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                  <span className="px-2 py-0.5 rounded bg-black/60 text-[#d4af37] border border-[#3f1927]">
                    0{idx + 1}단계 [{step.stage}]
                  </span>
                  <span className="text-neutral-400">[{step.code}]</span>
                </div>

                {/* Node Image Avatar */}
                <div className="my-2 rounded-lg overflow-hidden border border-[#3b1724]">
                  <GothicImage code={step.code} alt={step.name} aspectRatio="square" />
                </div>

                <div className="space-y-1.5 mt-2">
                  <h4 className="text-sm font-bold font-serif-kr text-white truncate">
                    {step.name}
                  </h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-2">
                    {step.condition}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#26131e] mt-3 flex items-center justify-between text-xs">
                  <span className="font-mono-code text-[#ffd700] text-[11px]">
                    🔮 {step.dominanceRequired} PT
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono-code ${
                      canAfford ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'
                    }`}
                  >
                    {canAfford ? '지배력 충족' : '지배력 부족'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Detailed Specification */}
        {activeNode && (
          <div className="p-5 rounded-xl bg-[#16111a] border border-[#3d1928] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2b1420] pb-3">
              <div>
                <span className="text-xs font-mono-code text-[#d4af37]">
                  선택된 진화 노드 상세 명세
                </span>
                <h3 className="text-lg font-bold font-serif-kr text-white">
                  {activeNode.name} — 계위: {activeNode.stage} [코드 {activeNode.code}]
                </h3>
              </div>

              {selectedNodeIndex > 0 && (
                <button
                  onClick={() => handleTestEvolution(selectedNodeIndex)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#8b1524] hover:bg-[#a61c2e] rounded-lg border border-[#d4af37]/60 transition-colors shadow-md flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>이 단계로 「개화」 권능 발현 시뮬레이션</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded bg-[#100d14] border border-[#2b141f] space-y-1">
                <span className="text-[#d4af37] font-semibold block">필요 진화 선행 조건:</span>
                <p className="text-neutral-300 leading-relaxed">{activeNode.condition}</p>
              </div>

              <div className="p-3 rounded bg-[#100d14] border border-[#2b141f] space-y-1">
                <span className="text-[#d4af37] font-semibold block">진화 후 각성 고유 능력:</span>
                <p className="text-neutral-300 leading-relaxed">{activeNode.awakenedAbility}</p>
              </div>
            </div>

            {simulationMessage && (
              <div className="p-3.5 rounded bg-[#1a0f18] border border-red-900/60 text-xs font-mono-code text-[#ffd700] leading-relaxed">
                {simulationMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
