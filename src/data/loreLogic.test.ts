import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getRankCombatTrait,
  calculateDominanceCost,
  canEvolve,
  generateSystemLog,
  generateStatusBlock,
  searchArchive,
  LordState,
} from './loreLogic';

test('getRankCombatTrait correctly reflects rank combat traits', () => {
  const lowerTrait = getRankCombatTrait('하급');
  assert.match(lowerTrait, /원시적 마기 방출/);

  const midTrait = getRankCombatTrait('중급');
  assert.match(midTrait, /안정된 마기 핵/);

  const highTrait = getRankCombatTrait('고위');
  assert.match(highTrait, /고밀도 마도/);

  const extremeTrait = getRankCombatTrait('극마');
  assert.match(extremeTrait, /대륙 판도를 뒤흔드는/);

  const transTrait = getRankCombatTrait('탈마');
  assert.match(transTrait, /신화급 권능/);
});
test('calculateDominanceCost returns proper progressive costs', () => {
  const domLower = calculateDominanceCost('군림', '하급');
  const domExtreme = calculateDominanceCost('군림', '극마');
  assert.ok(domExtreme > domLower, 'Extreme rank command must cost more than lower rank');

  const bloomHigh = calculateDominanceCost('개화', '고위');
  assert.equal(bloomHigh, 90);

  const creationMid = calculateDominanceCost('창조', '중급');
  assert.equal(creationMid, 45);
});

test('canEvolve validates conditions, dominance and legal progression', () => {
  // Condition not met
  const failCondition = canEvolve('중급', '고위', 200, false);
  assert.equal(failCondition.allowed, false);
  assert.match(failCondition.reason, /선행 해금 조건/);

  // Lack of dominance
  const failDominance = canEvolve('중급', '고위', 30, true);
  assert.equal(failDominance.allowed, false);
  assert.match(failDominance.reason, /지배력이 부족/);

  // Downward or illegal rank
  const failDowngrade = canEvolve('고위', '하급', 300, true);
  assert.equal(failDowngrade.allowed, false);
  assert.match(failDowngrade.reason, /유효한 상위 등급/);

  // Valid evolution
  const success = canEvolve('중급', '고위', 150, true);
  assert.equal(success.allowed, true);
});

test('generateSystemLog matches requested markdown format', () => {
  const log = generateSystemLog('군림', '중급 혈귀 m1', '복종 수용', 30, 210);
  assert.ok(log.includes('> **[⚠ 시스템]**'));
  assert.ok(log.includes('> 군주의 권능 발현 — 「군림」'));
  assert.ok(log.includes('**대상**: 중급 혈귀 m1'));
  assert.ok(log.includes('**결과**: 복종 수용'));
  assert.ok(log.includes('**지배력**: 소모 -30 (잔여: 210)'));
});

test('generateStatusBlock formats the state accurately in info code block', () => {
  const testState: LordState = {
    turn: 14,
    date: '제국력 492년 10월 28일',
    time: '칠흑의 심야',
    location: '마계 수도 제4대 군주성 알현실',
    dominance: 240,
    demonCount: 1420,
    territory: '수도 인근 및 마기 숲 초입',
    rankCounts: {
      lower: 850,
      mid: 420,
      high: 140,
      extreme: 9,
      transcendent: 1,
    },
    keyPersons: [
      { name: '고위 혈귀 카르밀라', race: '혈귀', rank: '고위', status: '충성 맹세' },
    ],
    humanForces: '룩스 기사단 제6검 퀴르소 부대 남진 관측',
    recentEvent: '제3대 군주 벨로스의 유지를 이어받아 즉위식 거행',
  };

  const block = generateStatusBlock(testState);
  assert.ok(block.startsWith('```info'));
  assert.ok(block.endsWith('```'));
  assert.ok(block.includes('[T-14｜📅 제국력 492년 10월 28일'));
  assert.ok(block.includes('[👑 직위: 제4대 마계 군주｜🔮 지배력: 240]'));
  assert.ok(block.includes('하급 850｜중급 420｜고위 140｜극마 9｜탈마 1'));
});

test('searchArchive searches across characters, regions, and demon lords', () => {
  const quirsoResults = searchArchive('퀴르소');
  assert.ok(quirsoResults.length > 0);
  assert.equal(quirsoResults[0].code, 'p12');

  const wrathResults = searchArchive('분노');
  assert.ok(wrathResults.length > 0);
  assert.equal(wrathResults[0].code, 'm25');

  const emptyResults = searchArchive('xyzunknownquery77');
  assert.equal(emptyResults.length, 0);
});
