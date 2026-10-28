import { CHARACTERS, DEMON_RACES, HIDDEN_DEMON_LORDS, RANK_COMPARISON, WORLD_OVERVIEW } from './loreData';

export interface LordState {
  turn: number;
  date: string;
  time: string;
  location: string;
  dominance: number;
  demonCount: number;
  territory: string;
  rankCounts: {
    lower: number;
    mid: number;
    high: number;
    extreme: number;
    transcendent: number;
  };
  keyPersons: { name: string; race: string; rank: string; status: string }[];
  humanForces: string;
  recentEvent: string;
}

/**
 * Returns combat and magical traits based on demon rank
 */
export function getRankCombatTrait(rank: string): string {
  if (rank.includes('하급')) {
    return '원시적 마기 방출 / 본능적 군집 돌격 및 기아 공격';
  }
  if (rank.includes('중급')) {
    return '안정된 마기 핵 / 정예 분대 기동 및 전열 분쇄';
  }
  if (rank.includes('고위')) {
    return '고밀도 마도 전개 / 1개 군단 및 요새 방어선 통솔';
  }
  if (rank.includes('극마')) {
    return '대륙 판도를 뒤흔드는 결전 마도 / 단독 도시 파괴력';
  }
  if (rank.includes('탈마')) {
    return '세계의 물리 법칙을 왜곡하는 신화급 권능 / 불멸성';
  }
  return '인간계 표준 무력 체계';
}

/**
 * Calculates required dominance cost for Lord's authorities
 */
export function calculateDominanceCost(
  action: '군림' | '개화' | '창조',
  rank: string,
  extraDifficulty: number = 0
): number {
  let base = 20;
  if (action === '군림') {
    if (rank.includes('하급')) base = 10;
    else if (rank.includes('중급')) base = 30;
    else if (rank.includes('고위')) base = 70;
    else if (rank.includes('극마')) base = 150;
    else if (rank.includes('탈마')) base = 300;
  } else if (action === '개화') {
    if (rank.includes('하급')) base = 25;
    else if (rank.includes('중급')) base = 50;
    else if (rank.includes('고위')) base = 90;
    else if (rank.includes('극마')) base = 220;
    else if (rank.includes('탈마')) base = 500;
  } else if (action === '창조') {
    if (rank.includes('하급')) base = 20;
    else if (rank.includes('중급')) base = 45;
    else if (rank.includes('고위')) base = 110;
    else if (rank.includes('극마')) base = 280;
    else if (rank.includes('탈마')) base = 600;
  }
  return base + extraDifficulty;
}

/**
 * Checks if evolution is legally possible under the world rules
 */
export function canEvolve(
  currentRank: string,
  targetRank: string,
  availableDominance: number,
  conditionMet: boolean
): { allowed: boolean; reason: string; requiredDominance: number } {
  const cost = calculateDominanceCost('개화', targetRank);

  if (!conditionMet) {
    return {
      allowed: false,
      reason: '진화 선행 해금 조건(실제 성과 또는 시련)이 달성되지 않았습니다.',
      requiredDominance: cost,
    };
  }

  if (availableDominance < cost) {
    return {
      allowed: false,
      reason: `지배력이 부족합니다. (필요: ${cost}, 보유: ${availableDominance})`,
      requiredDominance: cost,
    };
  }

  // Legal rank progression check
  const rankOrder = ['하급', '중급', '고위', '극마', '탈마'];
  const curIdx = rankOrder.findIndex((r) => currentRank.includes(r));
  const targetIdx = rankOrder.findIndex((r) => targetRank.includes(r));

  if (curIdx === -1 || targetIdx === -1 || targetIdx <= curIdx) {
    return {
      allowed: false,
      reason: '유효한 상위 등급 진화 경로가 아닙니다.',
      requiredDominance: cost,
    };
  }

  return { allowed: true, reason: '진화 조건 충족', requiredDominance: cost };
}

/**
 * Generates formatted System Block matching the exact markdown spec in the prompt
 */
export function generateSystemLog(
  authorityName: string,
  targetName: string,
  resultOutcome: string,
  consumedDominance: number,
  remainingDominance: number
): string {
  return `> **[⚠ 시스템]**
> 군주의 권능 발현 — 「${authorityName}」
>
> **대상**: ${targetName}
> **결과**: ${resultOutcome}
> **지배력**: 소모 -${consumedDominance} (잔여: ${remainingDominance})`;
}

/**
 * Formats the mandatory Real-time Status Window code block
 */
export function generateStatusBlock(state: LordState): string {
  const keyPersonsLine = state.keyPersons
    .map((p) => `${p.name} (${p.race}·${p.rank}) [${p.status}]`)
    .join(' / ');

  return `\`\`\`info
[T-${state.turn}｜📅 ${state.date}｜🕒 ${state.time}｜📍 ${state.location}]
[👑 직위: 제4대 마계 군주｜🔮 지배력: ${state.dominance}]
[🏰 마족 세력: ${state.demonCount}명｜🗺️ 영토: ${state.territory}]
[⚔️ 마족 등급: 하급 ${state.rankCounts.lower}｜중급 ${state.rankCounts.mid}｜고위 ${state.rankCounts.high}｜극마 ${state.rankCounts.extreme}｜탈마 ${state.rankCounts.transcendent}]
[👤 주요 인물: ${keyPersonsLine}]
[🛡️ 인간 세력: ${state.humanForces}]
[📜 최근 상황: ${state.recentEvent}]
\`\`\``;
}

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: '세계관' | '인물' | '종족' | '히든마왕' | '권능' | '등급';
  code?: string;
  snippet: string;
  viewTarget: string;
}

/**
 * Global search index query
 */
export function searchArchive(query: string): SearchResultItem[] {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) return [];

  const results: SearchResultItem[] = [];
  const seenIds = new Set<string>();

  const addResult = (item: SearchResultItem) => {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      results.push(item);
    }
  };

  // 1. Search Characters First (Direct Name/Title Matches)
  for (const char of CHARACTERS) {
    if (
      char.name.toLowerCase().includes(cleanQ) ||
      char.title.toLowerCase().includes(cleanQ) ||
      char.faction.toLowerCase().includes(cleanQ) ||
      char.description.toLowerCase().includes(cleanQ) ||
      char.relationToUser.toLowerCase().includes(cleanQ)
    ) {
      addResult({
        id: `char-${char.id}`,
        title: `${char.name} (${char.rank})`,
        subtitle: `${char.faction} · ${char.title}`,
        category: '인물',
        code: char.code,
        snippet: char.quote || char.description.slice(0, 80) + '...',
        viewTarget: char.faction.includes('룩스') || char.id.startsWith('lux') ? 'lux' : 'factions',
      });
    }
  }

  // 2. Search Hidden Demon Lords
  for (const lord of HIDDEN_DEMON_LORDS) {
    if (
      lord.name.toLowerCase().includes(cleanQ) ||
      lord.sin.toLowerCase().includes(cleanQ) ||
      lord.unlockCondition.toLowerCase().includes(cleanQ) ||
      lord.personality.toLowerCase().includes(cleanQ)
    ) {
      addResult({
        id: `hidden-${lord.id}`,
        title: `${lord.name} (${lord.sin})`,
        subtitle: '극마 히든 7마왕',
        category: '히든마왕',
        code: lord.code,
        snippet: `해금 요건: ${lord.unlockCondition}`,
        viewTarget: 'hidden-lords',
      });
    }
  }

  // 3. Search World Overview
  if (
    WORLD_OVERVIEW.continent.toLowerCase().includes(cleanQ) ||
    WORLD_OVERVIEW.summary.toLowerCase().includes(cleanQ) ||
    '아론데 맹약 마정석 벨로스 전이'.includes(cleanQ)
  ) {
    results.push({
      id: 'world-main',
      title: '아론데 대륙과 경계의 맹약',
      subtitle: '대륙 역사 및 군주 전이 배경',
      category: '세계관',
      code: 's12',
      snippet: WORLD_OVERVIEW.summary.slice(0, 80) + '...',
      viewTarget: 'world',
    });
  }

  // 4. Search Geography
  for (const geo of WORLD_OVERVIEW.geography) {
    if (
      geo.region.toLowerCase().includes(cleanQ) ||
      geo.description.toLowerCase().includes(cleanQ)
    ) {
      addResult({
        id: `geo-${geo.code}`,
        title: geo.region,
        subtitle: geo.type,
        category: '세계관',
        code: geo.code,
        snippet: geo.description.slice(0, 80) + '...',
        viewTarget: 'world',
      });
    }
  }

  // 4. Search Demon Races & Evolution
  for (const race of DEMON_RACES) {
    if (
      race.name.toLowerCase().includes(cleanQ) ||
      race.description.toLowerCase().includes(cleanQ) ||
      race.category.toLowerCase().includes(cleanQ)
    ) {
      addResult({
        id: `race-${race.id}`,
        title: race.name,
        subtitle: `${race.category} · 진화 계통`,
        category: '종족',
        code: race.evolutionPath[0]?.code || 'm1',
        snippet: race.description.slice(0, 80) + '...',
        viewTarget: 'demons',
      });
    }

    for (const evo of race.evolutionPath) {
      if (
        evo.name.toLowerCase().includes(cleanQ) ||
        evo.condition.toLowerCase().includes(cleanQ)
      ) {
        addResult({
          id: `evo-${evo.code}`,
          title: `${evo.name} [${evo.stage}]`,
          subtitle: `${race.name} 진화 단계 (지배력 ${evo.dominanceRequired})`,
          category: '종족',
          code: evo.code,
          snippet: `해금 조건: ${evo.condition}`,
          viewTarget: 'evolution',
        });
      }
    }
  }

  // 5. Search Authorities
  if (
    '군림 개화 창조 권능 지배력'.includes(cleanQ) ||
    'authority domination blooming creation'.includes(cleanQ)
  ) {
    addResult({
      id: 'lord-authorities',
      title: '제4대 마계 군주의 3대 권능',
      subtitle: '군림 · 개화 · 창조 및 지배력 운용',
      category: '권능',
      code: 's1',
      snippet: '군주의 3대 권능과 지배력 시스템 규칙 및 발현 시뮬레이터',
      viewTarget: 'authority',
    });
  }

  // Sort results: title match > subtitle match > snippet match
  results.sort((a, b) => {
    const aTitleMatch = a.title.toLowerCase().includes(cleanQ);
    const bTitleMatch = b.title.toLowerCase().includes(cleanQ);
    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    return 0;
  });

  return results.slice(0, 15);
}
