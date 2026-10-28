import React, { useState } from 'react';
import { WORLD_OVERVIEW, getImageUrl } from '../../data/loreData';
import { GothicImage } from '../GothicImage';
import {
  Compass,
  MapPin,
  Scroll,
  ShieldAlert,
  Flame,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface WorldOverviewViewProps {
  onNavigateView: (view: string) => void;
  onSelectCharacter: (charId: string) => void;
}

export const WorldOverviewView: React.FC<WorldOverviewViewProps> = ({
  onNavigateView,
  onSelectCharacter,
}) => {
  const [selectedRegionIndex, setSelectedRegionIndex] = useState(0);

  const activeRegion = WORLD_OVERVIEW.geography[selectedRegionIndex];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Banner Section */}
      <section className="relative rounded-2xl overflow-hidden border border-[#8b1524]/50 bg-[#120e16] p-6 sm:p-10 gothic-card">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={getImageUrl('s12')}
            alt="대륙 지도"
            className="w-full h-full object-cover filter blur-xs"
          />
        </div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4af37]">
            <Compass className="w-4 h-4 text-[#8b1524]" />
            <span>대륙 기록서 제1권</span>
            <span>·</span>
            <span>중세 다크 판타지 서사</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif-kr text-white leading-tight">
            아론데 대륙 전도와 <span className="text-red-500">제4대 마계 군주</span>의 부활
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 font-serif-kr leading-relaxed">
            {WORLD_OVERVIEW.summary}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigateView('lux')}
              className="px-4 py-2 text-xs font-medium text-white bg-[#8b1524] hover:bg-[#a31a2c] rounded-lg border border-[#d4af37]/40 transition-colors flex items-center gap-2 shadow-lg"
            >
              <span>룩스 기사단 및 7검 전력 열람</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateView('authority')}
              className="px-4 py-2 text-xs font-medium text-[#ffd700] bg-[#1a1420] hover:bg-[#25192d] rounded-lg border border-[#8b1524]/60 transition-colors flex items-center gap-2"
            >
              <span>군주의 3대 권능 시뮬레이터</span>
            </button>
          </div>
        </div>
      </section>

      {/* Origin & Betrayal Dossier: Meatshield Quirso & Velos Succession */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Human Guild Meatshield Betrayal */}
        <div className="p-6 rounded-xl border border-red-950/70 bg-[#120d14] gothic-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-red-400">
              [사건 기록 #001 · 배신의 전말]
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-red-950/60 border border-red-800 text-red-300">
              제6검 퀴르소
            </span>
          </div>

          <div className="flex gap-4 items-start">
            <div
              className="w-20 h-24 shrink-0 rounded overflow-hidden cursor-pointer hover:border-red-500 border border-red-900/60 transition-all"
              onClick={() => onSelectCharacter('lux-quirso')}
            >
              <GothicImage code="p12" alt="제6검 퀴르소" aspectRatio="portrait" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif-kr text-white">
                비전투 길잡이의 고기방패 희생
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                20년 전 현대 지구에서 비전투인으로 전이한 <strong className="text-white">&#123;&#123;user&#125;&#125;</strong>.
                대륙의 지형과 길을 밝혀 룩스 기사단의 진격을 도왔으나, 최후 전투에서 제6검 퀴르소(p12)에 의해 사선에 고기방패로 던져졌다.
              </p>
            </div>
          </div>

          <p className="text-xs text-neutral-300 bg-[#1a1118] p-3 rounded border border-red-900/30 leading-relaxed italic">
            "룩스 7검 전원은 비전투 길잡이의 희생을 작전 성공을 위한 당연한 전쟁 손실로 합리화했으며, 일말의 죄책감이나 배신이라는 인식조차 갖지 않았다."
          </p>

          <button
            onClick={() => onSelectCharacter('lux-quirso')}
            className="text-xs text-red-400 hover:text-red-300 underline underline-offset-4 flex items-center gap-1 font-serif-kr"
          >
            <span>제6검 퀴르소 상세 기밀문서 열람하기</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 2: 3rd Lord Velos's Final Duty */}
        <div className="p-6 rounded-xl border border-amber-950/70 bg-[#120f12] gothic-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-[#d4af37]">
              [계승 기록 #002 · 제4대 군주 부활]
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-amber-950/60 border border-amber-800 text-[#ffd700]">
              선대 군주 벨로스
            </span>
          </div>

          <div className="flex gap-4 items-start">
            <div
              className="w-20 h-24 shrink-0 rounded overflow-hidden cursor-pointer hover:border-[#d4af37] border border-amber-900/60 transition-all"
              onClick={() => onSelectCharacter('velos')}
            >
              <GothicImage code="p1" alt="벨로스" aspectRatio="portrait" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif-kr text-white">
                선대 군주 벨로스의 진혈 전수
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                룩스 기사단에 패해 죽어가던 제3대 군주 벨로스(p1)는 숨이 끊어지던 <strong className="text-white">&#123;&#123;user&#125;&#125;</strong>를 마주했다.
                벨로스는 마족 존속의 책임을 쥐어주며 자신의 진혈과 모든 권능을 양도했다.
              </p>
            </div>
          </div>

          <p className="text-xs text-neutral-300 bg-[#191512] p-3 rounded border border-amber-900/30 leading-relaxed italic">
            "인간 출신이면서 마족의 정점에 선 제4대 마계 군주. 전쟁의 참상과 상처를 품은 채, 멸망 직전의 마계를 재건하고 종족을 생존시켜야 한다."
          </p>

          <button
            onClick={() => onSelectCharacter('velos')}
            className="text-xs text-[#d4af37] hover:text-[#ffd700] underline underline-offset-4 flex items-center gap-1 font-serif-kr"
          >
            <span>선대 군주 벨로스 유언 및 능력 열람</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* Interactive Geography of Aronde Continent */}
      <section className="p-6 sm:p-8 rounded-xl border border-[#3a1926] bg-[#0f0d14] gothic-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#29131d] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-kr text-white">
              아론데 대륙 주요 권역 및 마계 지리
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              인간계 3대 강국, 완충지대 마경, 그리고 마기 농후한 마계 영토
            </p>
          </div>
          <span className="text-xs font-mono-code text-[#d4af37]">
            총 5개 주요 권역
          </span>
        </div>

        {/* Region Select Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {WORLD_OVERVIEW.geography.map((geo, index) => (
            <button
              key={geo.code}
              onClick={() => setSelectedRegionIndex(index)}
              className={`px-3 py-2 rounded-lg text-xs font-serif-kr font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                selectedRegionIndex === index
                  ? 'bg-[#8b1524] text-white border border-[#d4af37]/60 shadow-md'
                  : 'bg-[#18131e] text-neutral-400 hover:text-white border border-[#2e1522]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{geo.region.split('—')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Region Display Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4af37]">
              <span>권역 구분: {activeRegion.type}</span>
              <span>·</span>
              <span>인장 코드 [{activeRegion.code}]</span>
            </div>

            <h3 className="text-xl font-bold font-serif-kr text-white">
              {activeRegion.region}
            </h3>

            <p className="text-sm text-neutral-300 font-serif-kr leading-relaxed">
              {activeRegion.description}
            </p>

            <div className="p-4 rounded-lg bg-[#16121b] border border-[#301623] text-xs space-y-2 text-neutral-400">
              <span className="font-semibold text-[#d4af37] block">전략적 중요도 및 자원 특성:</span>
              <p>
                {activeRegion.code === 's8' &&
                  '벨하임 왕국: 기사단 본부와 인접하여 정벌군 본대의 병참 및 출격 기지 역할을 수행.'}
                {activeRegion.code === 's9' &&
                  '아르덴 제국: 고농도 마법진과 공성 병기 생산 기지. 마정석 정제 기술의 핵심을 보유.'}
                {activeRegion.code === 's10' &&
                  '세레니아 성왕국: 신성 결계로 보호받는 성역. 성기사단의 신성 마법 전개 중심지.'}
                {activeRegion.code === 's3' &&
                  '마경: 맹약이 파기된 후 피비린내 나는 격전지로 변모. 괴수와 이형 생물체의 서식지.'}
                {activeRegion.code === 's2' &&
                  '마계 수도: 제4대 군주성, 고대 마정석 광산, 마기 숲 요새가 위치한 마족 최후의 보루.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border-2 border-[#8b1524]/60 shadow-2xl">
              <GothicImage
                code={activeRegion.code}
                alt={activeRegion.region}
                aspectRatio="wide"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Demon Realm Specific Locations Bento */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif-kr text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#8b1524]" />
          <span>마계 주요 거점 및 영토 시설 (Demon Realm Strongholds)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#130f17] border border-[#351624] gothic-card space-y-2">
            <GothicImage code="s5" alt="마계 성 내부" aspectRatio="video" />
            <h4 className="text-sm font-bold font-serif-kr text-white mt-2">
              제4대 군주성 알현실 (s5)
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              벨로스의 옥좌가 놓여 있던 마계의 심장부. 군주의 3대 권능(군림, 개화, 창조)이 집중되는 권능실.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#130f17] border border-[#351624] gothic-card space-y-2">
            <GothicImage code="s4" alt="마계 제단" aspectRatio="video" />
            <h4 className="text-sm font-bold font-serif-kr text-white mt-2">
              고대 마계 제단 (s4)
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              개화와 창조의 의식을 거행하는 피의 제단. 상위 마족으로의 진화 시련과 마정석 촉매가 반응하는 장소.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#130f17] border border-[#351624] gothic-card space-y-2">
            <GothicImage code="s6" alt="마족 거주지" aspectRatio="video" />
            <h4 className="text-sm font-bold font-serif-kr text-white mt-2">
              마족 거주지 및 병영 (s6)
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              혈귀, 오크, 서큐버스, 사령족 전사들이 전열을 정비하고 농후한 마기를 호흡하는 생활 거점.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#130f17] border border-[#351624] gothic-card space-y-2">
            <GothicImage code="s7" alt="마계 숲" aspectRatio="video" />
            <h4 className="text-sm font-bold font-serif-kr text-white mt-2">
              침묵의 마기 숲 (s7)
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              적의 척후병을 삼키는 원시 마수와 야생 식생의 소굴. 천연 방어선이자 유격전의 요충지.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
