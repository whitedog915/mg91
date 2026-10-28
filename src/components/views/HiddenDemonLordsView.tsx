import React, { useState } from 'react';
import { HIDDEN_DEMON_LORDS, HiddenLordLore } from '../../data/loreData';
import { GothicImage } from '../GothicImage';
import {
  Flame,
  Lock,
  Unlock,
  AlertTriangle,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const HiddenDemonLordsView: React.FC = () => {
  const [unsealedLords, setUnsealedLords] = useState<Record<string, boolean>>({
    wrath: true, // Show wrath as preview
  });

  const toggleSeal = (lordId: string) => {
    setUnsealedLords((prev) => ({
      ...prev,
      [lordId]: !prev[lordId],
    }));
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4af37]">
          <Flame className="w-4 h-4 text-[#8b1524]" />
          <span>마계 금서 제7권</span>
          <span>·</span>
          <span>칠죄종(Seven Sins) 히든 극마 개체</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-kr text-white">
          극마 히든 7마왕 (The 7 Hidden Demon Lords)
        </h1>

        <p className="text-sm text-neutral-300 font-serif-kr max-w-3xl leading-relaxed">
          일반 극마와 명확히 구분되는 독립된 칠대 마왕들입니다.
          세계관 지침에 따라 <strong>발생 조건·위치·능력·진행도는 사전 공개되지 않으며</strong>, 오직 실질적인 군주의 성과와 서사적 계기를 통해서만 출현 상태가 해금됩니다.
        </p>
      </section>

      {/* Rules Notice */}
      <section className="p-5 rounded-xl border border-red-900/60 bg-[#160d14] gothic-card space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold font-serif-kr text-red-400">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
          <span>히든 7마왕 출현 및 복속 절대 규정</span>
        </div>
        <ul className="text-xs text-neutral-300 space-y-1 font-serif-kr list-disc list-inside">
          <li><strong>해금 ≠ 자동 소환·복속:</strong> 해금 조건이 충족되더라도 자동으로 복종하지 않으며, 독자적인 사건과 위계 협상을 거쳐야 합니다.</li>
          <li><strong>반복 파밍 불가:</strong> 동일한 사건이나 반복 전투로 편법 출현시키는 것은 엄격히 금지됩니다.</li>
          <li><strong>독자적 목적 보유:</strong> 7마왕 각자는 자신만의 신념과 욕망으로 움직이며, 군주의 명령이라도 이해관계가 맞지 않으면 거부할 수 있습니다.</li>
        </ul>
      </section>

      {/* 7 Demon Lords Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HIDDEN_DEMON_LORDS.map((lord) => {
          const isUnsealed = unsealedLords[lord.id];

          return (
            <div
              key={lord.id}
              className={`p-5 rounded-xl border transition-all gothic-card flex flex-col justify-between ${
                isUnsealed
                  ? 'border-[#8b1524] bg-[#140e17] shadow-xl'
                  : 'border-[#301622] bg-[#0f0d14]'
              }`}
            >
              <div className="space-y-4">
                {/* Header tag */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code text-[#d4af37]">
                    {lord.sin}
                  </span>
                  <button
                    onClick={() => toggleSeal(lord.id)}
                    className="flex items-center gap-1 text-[11px] font-mono-code text-neutral-400 hover:text-white px-2 py-0.5 rounded bg-[#1f131f] border border-[#3b1726]"
                  >
                    {isUnsealed ? (
                      <>
                        <EyeOff className="w-3 h-3 text-red-400" />
                        <span>봉인 숨기기</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3 text-[#d4af37]" />
                        <span>기밀 해제</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Avatar and Title */}
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#3f1929] shrink-0 relative">
                    <GothicImage code={lord.code} alt={lord.name} aspectRatio="square" />
                    {!isUnsealed && (
                      <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center text-[#d4af37]">
                        <Lock className="w-6 h-6 text-[#d4af37]" />
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-mono-code text-red-400">
                      [{lord.code}] 극마 히든
                    </span>
                    <h3 className="text-base font-bold font-serif-kr text-white mt-0.5">
                      {lord.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-serif-kr">
                      {isUnsealed ? lord.personality.split(',')[0] : '봉인된 진명'}
                    </p>
                  </div>
                </div>

                {isUnsealed ? (
                  <div className="space-y-3 animate-fadeIn text-xs">
                    {/* Quote */}
                    <div className="p-3 rounded bg-[#1d1119] border-l-2 border-[#8b1524] italic font-serif-kr text-[#f0cfc4] leading-relaxed">
                      {lord.quote}
                    </div>

                    {/* Unlock Condition */}
                    <div className="p-2.5 rounded bg-[#17111b] border border-[#2e1522] space-y-1">
                      <span className="text-[#d4af37] font-semibold block">
                        🔑 출현 해금 필요 성과:
                      </span>
                      <p className="text-neutral-300 leading-relaxed">
                        {lord.unlockCondition}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-1 text-neutral-400">
                      <div>
                        <span className="text-neutral-500">성격 성향: </span>
                        <span className="text-neutral-300">{lord.personality}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500">말투: </span>
                        <span className="text-neutral-300">{lord.speechStyle}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500">행동 원칙: </span>
                        <span className="text-neutral-300">{lord.corePrinciple}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-neutral-500 space-y-2 border border-dashed border-[#2d1522] rounded-lg">
                    <Lock className="w-5 h-5 mx-auto text-neutral-600" />
                    <p>기밀 봉인 상태입니다.</p>
                    <p className="text-[11px] text-neutral-600">
                      우측 상단 '기밀 해제'를 누르면 해금 조건과 진언을 확인할 수 있습니다.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Progress Hint */}
              <div className="pt-3 border-t border-[#26131e] mt-4 flex items-center justify-between text-[11px] font-mono-code text-neutral-400">
                <span>진행 감시:</span>
                <span className="text-[#d4af37] truncate ml-2 max-w-[180px]">
                  {isUnsealed ? lord.unlockProgressHint : '미확인 조건'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
