import React from 'react';
import {
  Compass,
  Landmark,
  Swords,
  Skull,
  Award,
  GitBranch,
  Crown,
  Flame,
  Search,
  X,
  BookOpen,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export interface NavSectionItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  badge?: string;
  description: string;
}

export const NAV_SECTIONS: NavSectionItem[] = [
  {
    id: 'world',
    label: '세계관 및 아론데 대륙',
    shortLabel: '세계관·대륙',
    icon: Compass,
    badge: '대륙 전도',
    description: '3대 국가, 완충지대 마경, 맹약 파기와 군주 부활 배경',
  },
  {
    id: 'factions',
    label: '인간계 국가와 세력',
    shortLabel: '인간계 세력',
    icon: Landmark,
    description: '벨하임 왕국, 아르덴 제국, 세레니아 성왕국 및 중립 세력',
  },
  {
    id: 'lux',
    label: '룩스 기사단 및 룩스 7검',
    shortLabel: '룩스 7검',
    icon: Swords,
    badge: '정벌군 핵심',
    description: '총단장 무명, 제1검~제7검 및 퀴르소의 고기방패 배신 전모',
  },
  {
    id: 'demons',
    label: '마계와 종족 도감',
    shortLabel: '마계·종족',
    icon: Skull,
    description: '혈귀, 오크, 서큐버스, 사령족, 마수 및 종족별 전투 특성',
  },
  {
    id: 'ranks',
    label: '마족 등급 vs 인간계 전투력',
    shortLabel: '등급 비교표',
    icon: Award,
    description: '하급~탈마 vs 대륙급~장수급 계위별 상세 비교 분석',
  },
  {
    id: 'evolution',
    label: '종족별 진화 트리',
    shortLabel: '진화 계통도',
    icon: GitBranch,
    badge: '인터랙티브',
    description: '종족별 상위 진화 경로, 해금 조건 및 요구 지배력',
  },
  {
    id: 'authority',
    label: '마계 군주 권능 및 시스템',
    shortLabel: '군주 권능실',
    icon: Crown,
    badge: '시뮬레이터',
    description: '군림·개화·창조 3대 권능 발현 및 실시간 상태창 생성',
  },
  {
    id: 'hidden-lords',
    label: '극마 히든 7마왕',
    shortLabel: '히든 7마왕',
    icon: Flame,
    badge: '비공개 특수',
    description: '분노, 교만, 탐욕, 질투, 색욕, 나태, 인색의 칠대 마왕',
  },
];

interface SidebarProps {
  activeView: string;
  onSelectView: (viewId: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenSearch: () => void;
  dominance: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
  onOpenSearch,
  dominance,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 lg:w-80 bg-[#09080c] border-r border-[#2d141e] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[#29131c] bg-[#110e16]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8b1524] to-[#420a14] border border-[#d4af37]/60 flex items-center justify-center shadow-md">
                <Crown className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h1 className="text-base font-bold font-serif-kr text-white tracking-wider">
                  마계 군주가 되었다
                </h1>
                <p className="text-[11px] font-mono-code text-[#d4af37]/80">
                  공식 세계관 아카이브
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-neutral-400 hover:text-white rounded-md bg-[#1a141e]"
              aria-label="메뉴 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Trigger */}
          <button
            onClick={() => {
              onOpenSearch();
              onCloseMobile();
            }}
            className="w-full mt-4 px-3 py-2 rounded-lg bg-[#18131d] border border-[#3b1926] hover:border-[#8b1524] text-xs text-neutral-400 hover:text-white flex items-center justify-between transition-colors group"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span>세계관·인물·권능 검색</span>
            </span>
            <kbd className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-[#241724] border border-[#3f1929] text-neutral-400">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-mono-code text-neutral-500 uppercase tracking-widest">
            기록서 열람 목록 (Chapters)
          </div>

          {NAV_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeView === section.id;

            return (
              <button
                key={section.id}
                onClick={() => {
                  onSelectView(section.id);
                  onCloseMobile();
                }}
                className={`w-full text-left px-3.5 py-3 rounded-lg transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2a1017] to-[#180e14] border border-[#8b1524] text-white shadow-lg'
                    : 'text-neutral-300 hover:bg-[#15111a] hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#8b1524] text-[#ffd700]'
                        : 'bg-[#18131d] text-neutral-400 group-hover:text-[#d4af37] group-hover:bg-[#201524]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold font-serif-kr truncate">
                        {section.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                      {section.description}
                    </p>
                  </div>
                </div>

                {section.badge ? (
                  <span
                    className={`text-[10px] font-mono-code px-1.5 py-0.5 rounded shrink-0 ml-1.5 ${
                      isActive
                        ? 'bg-[#d4af37]/20 text-[#ffd700] border border-[#d4af37]/40'
                        : 'bg-[#21141e] text-neutral-400 border border-[#3b1928]'
                    }`}
                  >
                    {section.badge}
                  </span>
                ) : (
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive
                        ? 'text-[#d4af37] translate-x-0.5'
                        : 'text-neutral-600 group-hover:text-neutral-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Demon Lord Status Footer */}
        <div className="p-4 border-t border-[#29131c] bg-[#0d0b11] text-xs">
          <div className="p-3 rounded-lg bg-[#141018] border border-[#381724] space-y-2">
            <div className="flex items-center justify-between text-[#d4af37] font-serif-kr font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" />
                <span>제4대 마계 군주</span>
              </span>
              <span className="text-[11px] font-mono-code text-red-400">{'{{user}}'}</span>
            </div>

            <div className="flex justify-between items-center text-neutral-400 text-[11px] pt-1 border-t border-[#2a131e]">
              <span>보유 지배력</span>
              <span className="font-mono-code text-[#ffd700] font-bold">
                🔮 {dominance} PT
              </span>
            </div>
            <div className="flex justify-between items-center text-neutral-400 text-[11px]">
              <span>마계 수도 상황</span>
              <span className="text-neutral-300">방어 결계 복구 중</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
