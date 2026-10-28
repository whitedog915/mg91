import React, { useState } from 'react';
import { LORD_AUTHORITY } from '../../data/loreData';
import { GothicImage } from '../GothicImage';
import {
  Crown,
  Sparkles,
  Hammer,
  ScrollText,
  Play,
  RotateCcw,
  Copy,
  Check,
  AlertTriangle,
  Flame,
  Shield,
} from 'lucide-react';
import {
  generateSystemLog,
  generateStatusBlock,
  calculateDominanceCost,
  LordState,
} from '../../data/loreLogic';

interface AuthorityGrimoireViewProps {
  dominance: number;
  onSetDominance: (val: number) => void;
}

export const AuthorityGrimoireView: React.FC<AuthorityGrimoireViewProps> = ({
  dominance,
  onSetDominance,
}) => {
  const [selectedAuthority, setSelectedAuthority] = useState<string>('군림');
  const [targetName, setTargetName] = useState<string>('중급 혈귀 전사 (m1)');
  const [targetRank, setTargetRank] = useState<string>('중급');
  const [mentalState, setMentalState] = useState<string>('경계 상태 (복종 의문)');
  const [systemLogs, setSystemLogs] = useState<string[]>([
    generateSystemLog(
      '즉위',
      '제4대 마계 군주 {{user}}',
      '선대 군주 벨로스의 진혈과 권능을 정식 계승함',
      0,
      dominance
    ),
  ]);
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  // Live Lord Status State matching the exact template in the prompt
  const [lordState, setLordState] = useState<LordState>({
    turn: 1,
    date: '제국력 492년 10월 28일',
    time: '칠흑의 심야',
    location: '마계 수도 제4대 군주성 알현실',
    dominance: dominance,
    demonCount: 1420,
    territory: '마계 수도 인근 및 마기 숲 초입',
    rankCounts: {
      lower: 850,
      mid: 420,
      high: 140,
      extreme: 9,
      transcendent: 1,
    },
    keyPersons: [
      { name: '선대 벨로스', race: '군주', rank: '극마 초월', status: '임종 후 계승' },
      { name: '고위 혈귀 카르밀라', race: '혈귀', rank: '고위', status: '충성 맹세' },
    ],
    humanForces: '룩스 기사단 제6검 퀴르소 부대 남진 중',
    recentEvent: '제3대 군주 벨로스의 유언에 따라 제4대 마계 군주로 즉위',
  });

  const handleActivateAuthority = () => {
    const cost = calculateDominanceCost(
      selectedAuthority as any,
      targetRank,
      0
    );

    if (dominance < cost) {
      alert(`지배력이 부족합니다! (필요: ${cost}, 현재: ${dominance})`);
      return;
    }

    const nextDom = dominance - cost;
    onSetDominance(nextDom);

    let resultOutcome = '';
    if (selectedAuthority === '군림') {
      resultOutcome = `대상 [${targetName}]에게 군주의 위압 강림. 저항을 억누르고 복종 서약 획득.`;
    } else if (selectedAuthority === '개화') {
      resultOutcome = `대상 [${targetName}]의 혈통 잠재력 각성. 다음 상위 등급으로 진화 성공.`;
    } else if (selectedAuthority === '창조') {
      resultOutcome = `마기와 지배력의 융합으로 새로운 [${targetName}] 개체 소환 및 영혼 각인 완료.`;
    }

    const newLog = generateSystemLog(
      selectedAuthority,
      `${targetName} [${targetRank}]`,
      resultOutcome,
      cost,
      nextDom
    );

    setSystemLogs([newLog, ...systemLogs]);

    // Update real-time state
    setLordState((prev) => ({
      ...prev,
      turn: prev.turn + 1,
      dominance: nextDom,
      demonCount: selectedAuthority === '창조' ? prev.demonCount + 1 : prev.demonCount,
      recentEvent: `권능 「${selectedAuthority}」 발현 성공 (대상: ${targetName})`,
    }));
  };

  const handleCopyStatusBlock = () => {
    const text = generateStatusBlock({ ...lordState, dominance });
    navigator.clipboard.writeText(text);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4af37]">
          <Crown className="w-4 h-4 text-[#8b1524]" />
          <span>마계 기록서 제6권</span>
          <span>·</span>
          <span>군주의 3대 권능 & 실시간 상태창</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-kr text-white">
          마계 군주 권능 및 시스템 시뮬레이터
        </h1>

        <p className="text-sm text-neutral-300 font-serif-kr max-w-3xl leading-relaxed">
          제4대 마계 군주 <strong className="text-white">&#123;&#123;user&#125;&#125;</strong>는
          선대 군주 벨로스로부터 계승받은 3대 권능(군림·개화·창조)과 고유 자원 <strong className="text-[#ffd700]">지배력</strong>을 운용합니다.
          권능은 만능이 아니며, 대상의 등급과 정당한 성과에 따라서만 발현됩니다.
        </p>
      </section>

      {/* 3 Main Authorities Dossier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LORD_AUTHORITY.authorities.map((auth) => (
          <div
            key={auth.id}
            onClick={() => setSelectedAuthority(auth.name)}
            className={`p-5 rounded-xl border transition-all cursor-pointer gothic-card flex flex-col justify-between ${
              selectedAuthority === auth.name
                ? 'border-[#d4af37] bg-gradient-to-b from-[#2a131e] to-[#120c15] shadow-xl ring-2 ring-[#d4af37]/40'
                : 'border-[#301623] hover:border-[#8b1524] bg-[#110e16]'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-[#d4af37]">
                  제{auth.id === 'domination' ? '1' : auth.id === 'blooming' ? '2' : '3'} 권능
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-[#1f121d] text-neutral-300">
                  {auth.cost.split(':')[0]}
                </span>
              </div>

              <h3 className="text-lg font-bold font-serif-kr text-white">
                「{auth.name}」
              </h3>

              <p className="text-xs text-neutral-300 font-serif-kr leading-relaxed">
                {auth.summary}
              </p>

              <div className="p-2.5 rounded bg-[#18111b] border border-[#2c1420] text-[11px] text-neutral-400 mt-2">
                <span className="text-red-400 font-semibold block">운용 규칙:</span>
                {auth.rule}
              </div>
            </div>

            <div className="pt-3 border-t border-[#26131d] mt-3 flex items-center justify-between text-xs">
              <span className="text-xs text-[#ffd700] font-mono-code">
                {auth.cost.split(':')[1]}
              </span>
              <span className="text-neutral-400">선택하기 →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Simulator Interactive Console */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Controller Panel */}
        <div className="lg:col-span-6 p-6 rounded-2xl border-2 border-[#8b1524]/60 bg-[#120d15] gothic-card space-y-5">
          <div className="flex items-center justify-between border-b border-[#29131d] pb-3">
            <h3 className="text-lg font-bold font-serif-kr text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span>권능 발현 콘솔 (Authority Console)</span>
            </h3>
            <span className="text-xs font-mono-code text-[#ffd700]">
              잔여 지배력: 🔮 {dominance} PT
            </span>
          </div>

          <div className="space-y-4 text-xs font-serif-kr">
            {/* Selected Authority */}
            <div>
              <label className="text-neutral-400 font-semibold block mb-1.5">
                발현할 군주의 권능 선택:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['군림', '개화', '창조'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedAuthority(mode)}
                    className={`py-2 rounded-lg border font-bold text-xs transition-colors ${
                      selectedAuthority === mode
                        ? 'bg-[#8b1524] text-white border-[#d4af37]'
                        : 'bg-[#18121c] text-neutral-400 border-[#2d1522] hover:text-white'
                    }`}
                  >
                    「{mode}」
                  </button>
                ))}
              </div>
            </div>

            {/* Target Name */}
            <div>
              <label className="text-neutral-400 font-semibold block mb-1.5">
                대상 지정:
              </label>
              <input
                type="text"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#18111b] border border-[#301622] text-white focus:outline-none focus:border-[#d4af37]"
                placeholder="예: 중급 혈귀 전사 m1, 고위 리치 m15 등"
              />
            </div>

            {/* Target Rank */}
            <div>
              <label className="text-neutral-400 font-semibold block mb-1.5">
                대상 계위(Rank):
              </label>
              <select
                value={targetRank}
                onChange={(e) => setTargetRank(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#18111b] border border-[#301622] text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="하급">하급 (Lower) — 소모량 최소</option>
                <option value="중급">중급 (Mid) — 전열 정예</option>
                <option value="고위">고위 (High) — 지휘관급</option>
                <option value="극마">극마 (Extreme) — 군주급 결전 전력</option>
                <option value="탈마">탈마 (Transcendent) — 초월적 금기</option>
              </select>
            </div>

            {/* Expected Dominance cost */}
            <div className="p-3 rounded bg-[#19111b] border border-[#361726] flex justify-between items-center text-xs">
              <span className="text-neutral-400">발현 시 예상 소모 지배력:</span>
              <span className="font-mono-code text-[#ffd700] font-bold text-sm">
                -{calculateDominanceCost(selectedAuthority as any, targetRank)} PT
              </span>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleActivateAuthority}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#8b1524] to-[#6b0f1b] hover:from-[#a61c2e] hover:to-[#851322] border border-[#d4af37]/60 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-current text-[#ffd700]" />
              <span>권능 「{selectedAuthority}」 발현하기</span>
            </button>
          </div>
        </div>

        {/* Right Output: Real-time System Log History */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl border-2 border-[#8b1524]/60 bg-[#0d0b10] gothic-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#29131d] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono-code text-red-400">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>[⚠ 시스템] 발현 로그 기록 (System Output)</span>
              </div>
              <span className="text-[11px] text-neutral-500 font-mono-code">
                마크다운 인용블록 규격
              </span>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-3 font-mono-code text-xs">
              {systemLogs.map((log, index) => (
                <pre
                  key={index}
                  className="p-3.5 rounded bg-[#160f18] border border-red-900/40 text-[#f0cfc4] whitespace-pre-wrap leading-relaxed shadow-sm"
                >
                  {log}
                </pre>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Status Window Code Block Section (info block) */}
      <section className="p-6 sm:p-8 rounded-2xl border-2 border-[#d4af37]/40 bg-[#0e0c12] gothic-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#29131d] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4af37]">
              <ScrollText className="w-4 h-4 text-[#8b1524]" />
              <span>공식 상태창 규격 (Status Window)</span>
            </div>
            <h3 className="text-xl font-bold font-serif-kr text-white mt-1">
              제4대 마계 군주 실시간 현황 코드블록
            </h3>
          </div>

          <button
            onClick={handleCopyStatusBlock}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1e1523] hover:bg-[#2b1932] border border-[#3f1929] hover:border-[#d4af37] rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            {copiedStatus ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#d4af37]" />
                <span>상태창 텍스트 복사</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-neutral-400 font-serif-kr">
          지침에 규정된 최하단 필수 출력용 <code>info</code> 코드블록 포맷입니다. 권능 발현 및 턴 경과에 따라 동적으로 동기화됩니다.
        </p>

        <div className="relative">
          <pre className="p-4 sm:p-6 rounded-xl bg-[#08070a] border border-[#2b1420] text-emerald-400 font-mono-code text-xs sm:text-sm overflow-x-auto leading-relaxed shadow-inner">
            {generateStatusBlock({ ...lordState, dominance })}
          </pre>
        </div>
      </section>
    </div>
  );
};
