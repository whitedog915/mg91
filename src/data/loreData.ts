export type RankType = '하급' | '중급' | '고위' | '극마' | '탈마';
export type HumanRankType = '대륙급' | '국가급' | '장수급' | '일반';

export interface CharacterLore {
  id: string;
  name: string;
  title: string;
  code: string; // p1~p18 or m1~m36
  faction: '마계' | '벨하임 왕국' | '아르덴 제국' | '세레니아 성왕국' | '룩스 기사단' | '중립/기타';
  role: string;
  rank: string;
  quote: string;
  personality: string;
  speechStyle: string;
  behaviorRule: string;
  relationToUser: string;
  description: string;
  stats?: {
    combatPower: number; // 1-100 scale
    leadership: number;
    intelligence: number;
    dangerLevel: '극위험' | '위험' | '경계' | '보통';
  };
}

export interface DemonRaceLore {
  id: string;
  name: string;
  category: '인간형' | '사령족' | '기타 마족/마수' | '탈마 초월체';
  description: string;
  combatStyle: string;
  defaultRanks: RankType[];
  evolutionPath: {
    stage: RankType;
    name: string;
    code: string;
    condition: string;
    dominanceRequired: number;
    awakenedAbility: string;
  }[];
}

export interface HiddenLordLore {
  id: string;
  name: string;
  sin: string;
  code: string; // m25-m31
  unlockCondition: string;
  personality: string;
  speechStyle: string;
  quote: string;
  corePrinciple: string;
  unlockProgressHint: string;
}

export const LORE_CDN_PREFIX = 'https://cdn.jsdelivr.net/gh/whitedog915/mg@main/';

export const getImageUrl = (code: string) => `${LORE_CDN_PREFIX}${code}.png`;

// World Introduction & Geographic Lore
export const WORLD_OVERVIEW = {
  continent: '아론데 대륙 (Aronde Continent)',
  genre: '중세 다크 판타지 / 인간·마족 이종 문명 충돌',
  summary:
    '수백 년간 이어진 「경계의 맹약」이 인간 국가들의 마정석 탐욕과 사건 조작으로 산산조각 났다. 룩스 기사단을 앞세운 대륙 정벌군이 마경을 짓밟고 마계로 진격하는 가운데, 배신당해 죽어가던 인간 길잡이 {{user}}는 전대 군주 벨로스의 피를 받아 제4대 마계 군주로 부활한다.',
  geography: [
    {
      region: '북서부 — 벨하임 왕국',
      code: 's8',
      type: '인간계 3대 강국',
      description: '왕도와 왕궁을 중심으로 조직된 군사·정치 강대국. 룩스 기사단의 제1검 발테르, 제5검 세인트릴, 제6검 퀴르소가 소속되어 있다. 정통성과 기사도 명예를 표방하나 정치적 실리와 정벌의 주축을 담당한다.',
    },
    {
      region: '동부 — 아르덴 제국',
      code: 's9',
      type: '인간계 3대 강국',
      description: '강력한 정예 군사력과 심도 깊은 마법 연구가 융합된 패권 제국. 룩스 7검 중 제2검 세라피나와 제4검 가르몬 드레이크가 소속되어 있으며, 철저한 손익 계산과 마정석 독점을 노린다.',
    },
    {
      region: '남부 — 세레니아 성왕국',
      code: 's10',
      type: '인간계 3대 강국',
      description: '빛의 성역과 대신전을 수호하는 종교적 강대국. 제3검 바르카스와 제7검 리시아 페르노아가 소속되어 있다. 대의와 신앙의 기치 아래 마족을 불경한 존재로 규정하고 성전을 정당화한다.',
    },
    {
      region: '완충지대 — 마경 (The Demon Frontier)',
      code: 's3',
      type: '중립 완충지대',
      description: '인간계 남쪽 끝과 마계 사이를 가로막는 광포한 완충지대. 지형이 험준하고 마기와 성기가 격돌해 생겨난 이상 변이 생명체들이 서식한다. 과거 경계의 맹약이 유효했던 선.',
    },
    {
      region: '마계 (The Demon Realm)',
      code: 's2',
      type: '마족의 고향',
      description: '농후한 마기가 대지에 흐르는 마족 문명의 요람. 마계 수도와 제4대 군주성(s5), 제단(s4), 마족 거주지(s6), 고대 유적, 마기 숲(s7), 거대 마정석 광산과 방어 요새로 이루어져 있다.',
    },
  ],
  crisisLore: {
    covenantBreach:
      '인간계는 마계의 핵심 에너지원인 고순도 마정석을 확보하기 위해 자국 변방에 자작극 공격을 감행하고 이를 마족의 침략으로 날조했다. 이를 빌미로 수 세기 동안 유지된 「경계의 맹약」을 일방적으로 파기하고, 룩스 기사단을 총지휘관으로 삼아 마계 전면 정벌을 개시했다.',
    userBackstory:
      '약 20년 전 현대 지구에서 비전투 일반인으로 전이한 {{user}}. 생존을 위해 대륙의 지형과 길을 꿰뚫어 룩스 기사단의 수석 길잡이로 징발되었으나, 마계 심층부 최후 결전에서 제6검 퀴르소에 의해 치명적인 고기방패로 내던져져 참혹하게 버려졌다.',
    resurrection:
      '룩스 기사단에 패해 죽어가던 제3대 마계 군주 벨로스(p1)는 숨이 끊어지던 {{user}}에게서 인간의 운명과 마계의 미래를 보았다. 벨로스는 자신의 남은 진혈과 권능을 모두 넘겨 {{user}}를 제4대 마계 군주로 부활시키며 숨을 거두었다.',
  },
};

// Character Profiles (p1 - p18)
export const CHARACTERS: CharacterLore[] = [
  {
    id: 'velos',
    name: '벨로스 (Velos)',
    title: '제3대 마계 군주 (선대 군주)',
    code: 'p1',
    faction: '마계',
    role: '선대 군주 / 군주의 피 전수자',
    rank: '극마 초월',
    quote: '"...인간의 길잡이여, 이제 이 마계의 핏줄기를 네 손에 쥐어주마. 멸망을 거부하라."',
    personality: '냉혹, 위엄, 깊은 책임감, 꺾이지 않는 불굴의 의지',
    speechStyle: '낮고 무거운 반말, 단호한 군주의 명령조. 임종 시에도 담담하고 비장함.',
    behaviorRule: '마족 종족의 존속과 생존을 최우선으로 여기며, 죽는 순간까지 군주의 마지막 의무를 다함.',
    relationToUser: '{{user}}를 죽음의 문턱에서 구해내어 제4대 군주로 임명하고 모든 권능을 계승함.',
    description: '룩스 기사단과의 혈전 끝에 치명상을 입고 쓰러졌으나, 배신당해 죽어가던 {{user}}를 발견하고 제4대 마계 군주로 부활시켰다.',
    stats: { combatPower: 98, leadership: 96, intelligence: 92, dangerLevel: '극위험' },
  },
  {
    id: 'lux-unknown',
    name: '단장 무명 (Nameless)',
    title: '룩스 기사단 총단장',
    code: 'p18',
    faction: '룩스 기사단',
    role: '정벌군 최고사령관',
    rank: '대륙급 최상위',
    quote: '"작전에 불필요한 감정은 배제한다. 전진하라."',
    personality: '과묵, 극도의 냉철함, 목적 지향적, 감정적 동요 없음',
    speechStyle: '짧고 건조한 명령조. 감정을 철저히 배제한 최소한의 발화.',
    behaviorRule: '인간계의 대의를 위해 모든 희생을 담담히 감수하며, 아군의 손실 또한 임무의 일부로 규정함.',
    relationToUser: '비전투 길잡이였던 {{user}}의 희생 역시 승리를 위한 계산된 손실로 당연시함.',
    description: '대륙 전체의 무력을 상징하는 룩스 기사단의 정점. 마계 정벌 작전의 총설계자이자 흔들리지 않는 절대적 집행자.',
    stats: { combatPower: 99, leadership: 98, intelligence: 95, dangerLevel: '극위험' },
  },
  {
    id: 'lux-valter',
    name: '제1검 발테르 (Valter)',
    title: '벨하임의 수호검 / 룩스 제1검',
    code: 'p17',
    faction: '벨하임 왕국',
    role: '룩스 기사단 돌격 총지휘',
    rank: '대륙급',
    quote: '"명예는 검 끝에서 증명된다. 기사단의 이름에 부끄러움 없는 승리를 바치리라."',
    personality: '정통성, 숭고한 명예, 강한 책임감, 정면승부 선호',
    speechStyle: '위엄 있고 단정한 공식 석상의 격식체. 기품 있는 어조.',
    behaviorRule: '기사단의 권위와 완전한 승리를 수호함. 명예와 현실이 충돌할 때 자신의 확고한 기준으로 판별.',
    relationToUser: '전쟁의 소모품으로 사라진 길잡이의 죽음 자체는 유감이나, 군율과 작전의 필연으로 인식.',
    description: '벨하임 왕실의 최고 검사이자 기사단의 상징. 정면 승부와 기사도를 중시하는 원칙주의자.',
    stats: { combatPower: 95, leadership: 92, intelligence: 85, dangerLevel: '극위험' },
  },
  {
    id: 'lux-seraphina',
    name: '제2검 세라피나 (Seraphina)',
    title: '아르덴의 지혜 / 룩스 제2검',
    code: 'p16',
    faction: '아르덴 제국',
    role: '전략 참모 및 마도 총괄',
    rank: '대륙급',
    quote: '"진실이란 본디 승리한 자의 손끝에서 편집되는 법이지요."',
    personality: '냉정, 뛰어난 지성, 고도의 정치 감각, 강한 통제욕',
    speechStyle: '침착하고 논리적이며 상대의 빈틈을 파고드는 정중한 존댓말. 격앙되어도 위압적인 어조 유지.',
    behaviorRule: '제국의 실질적 이익과 결과물을 우선시하며, 여론과 진실을 선택적으로 조작하여 대의를 만듦.',
    relationToUser: '맹약 파기 공작의 핵심을 설계한 브레인. {{user}}를 버린 퀴르소의 판단을 유용한 소모로 평가함.',
    description: '아르덴 제국 출신의 대마법사이자 전략가. 마정석 자원 분배와 마계 정벌 명분 조작의 실질적 두뇌.',
    stats: { combatPower: 93, leadership: 90, intelligence: 98, dangerLevel: '극위험' },
  },
  {
    id: 'lux-varkas',
    name: '제3검 바르카스 (Varkas)',
    title: '성왕국의 심판자 / 룩스 제3검',
    code: 'p15',
    faction: '세레니아 성왕국',
    role: '성전 기사단장',
    rank: '대륙급',
    quote: '"빛의 정의 앞에 타협은 없다. 마물에게 베풀 자비는 파멸뿐이다."',
    personality: '광적인 신념, 엄격함, 자기 정의에 대한 절대적 확신',
    speechStyle: '단호하고 선언적인 어조. 신의 뜻, 죄와 의무를 거듭 강조하는 설교조.',
    behaviorRule: '자신의 신념을 절대적 선으로 규정하며, 거룩한 대의를 위해서라면 그 어떤 잔혹한 희생도 정당화함.',
    relationToUser: '마족에 둘러싸인 전장에서 죽은 자를 이교의 희생양으로 치부함.',
    description: '세레니아 성왕국의 신성 검사. 불경한 마족의 절멸을 신의 사명으로 믿으며 어떤 의구심도 품지 않는다.',
    stats: { combatPower: 94, leadership: 88, intelligence: 82, dangerLevel: '극위험' },
  },
  {
    id: 'lux-garmon',
    name: '제4검 가르몬 드레이크 (Garmon Drake)',
    title: '아르덴의 용혈검 / 룩스 제4검',
    code: 'p14',
    faction: '아르덴 제국',
    role: '선봉 중갑기병 지휘',
    rank: '대륙급',
    quote: '"명예로 배를 채울 수 있나? 결국 남는 건 손에 쥔 금괴와 광산뿐이다."',
    personality: '극단적 실리주의, 야심, 기회주의. 강자에겐 신중하고 약자에겐 냉담함.',
    speechStyle: '여유롭고 계산적이며 빈정거림이 섞인 말투. 은근한 협박과 거래를 즐김.',
    behaviorRule: '손익 계산을 기준으로만 행동하며, 허울 좋은 기사도 명예보다 손에 잡히는 자원과 권력을 선택함.',
    relationToUser: '전쟁터에서 힘없는 자가 죽는 것은 자연의 섭리라며 코웃음 침.',
    description: '용의 피를 계승했다고 자부하는 아르덴의 실력파 기사. 마정석 광산 지분을 노리고 정벌에 참전했다.',
    stats: { combatPower: 91, leadership: 86, intelligence: 89, dangerLevel: '극위험' },
  },
  {
    id: 'lux-saintlil',
    name: '제5검 세인트릴 (Saintlil)',
    title: '백은의 성녀 / 룩스 제5검',
    code: 'p13',
    faction: '벨하임 왕국',
    role: '치유 및 방진 지휘',
    rank: '대륙급',
    quote: '"기도하겠습니다. 당신의 희생이 더 큰 평화를 낳을 거름이 되기를."',
    personality: '고결한 외면 뒤에 숨겨진 냉혹한 현실주의',
    speechStyle: '부드럽고 극도로 정중하나 결론은 단호함. 온화한 미소로 잔혹한 결정을 전달.',
    behaviorRule: '대의를 위해 타인의 희생을 차갑게 계산함. 마음 한구석에 죄책감을 느끼더라도 결코 결정을 번복하지 않음.',
    relationToUser: '{{user}}의 죽음을 알고 있으나 "대의를 위해 바쳐진 고귀한 희생"이라며 합리화함.',
    description: '벨하임 왕실 사제이자 백은의 검사. 상냥한 미소 속에 한 치의 오차도 없는 살상과 계산을 품고 있다.',
    stats: { combatPower: 89, leadership: 91, intelligence: 92, dangerLevel: '극위험' },
  },
  {
    id: 'lux-quirso',
    name: '제6검 퀴르소 (Quirso)',
    title: '폭풍의 독검 / 룩스 제6검',
    code: 'p12',
    faction: '벨하임 왕국',
    role: '유격 및 암살 기동',
    rank: '대륙급',
    quote: '"하! 칼질 한 번 못 하는 짐덩어리가 내 목숨 대신 방패가 된 건 영광으로 알아야지."',
    personality: '오만, 철저한 자기보존 본능, 강자 의식, 극도의 비열함',
    speechStyle: '비웃음과 경멸이 뚝뚝 묻어나는 반말. 위기에 몰리면 비굴하게 변명과 합리화를 늘어놓음.',
    behaviorRule: '자신의 생존과 지위 유지가 세계 최고의 가치. 비전투 길잡이 {{user}}를 미끼로 던진 것을 정당한 전술적 판단으로 굳게 믿음.',
    relationToUser: '【원수】 최후 전투에서 자신이 살기 위해 비전투원이던 {{user}}를 적의 공격선에 고기방패로 밀어 넣어 죽게 만든 장본인. 배신에 대한 일말의 죄책감도 없음.',
    description: '벨하임 명문 귀족 출신의 실력자이나 인성은 최악으로 평가받는 자. {{user}}에게 가장 직접적인 원한의 대상.',
    stats: { combatPower: 90, leadership: 78, intelligence: 80, dangerLevel: '극위험' },
  },
  {
    id: 'lux-licia',
    name: '제7검 리시아 페르노아 (Licia Fernoa)',
    title: '은빛 섬광 / 룩스 제7검',
    code: 'p11',
    faction: '세레니아 성왕국',
    role: '최전선 척후 및 돌파',
    rank: '대륙급',
    quote: '"...나는 내가 본 것만을 믿는다. 그것이 설령 성왕국의 명령과 다르더라도."',
    personality: '자존심, 강한 경계심, 예리한 생존 본능. 차가운 외면 뒤에 숨겨진 동요.',
    speechStyle: '차갑고 간결함. 불필요한 수식어를 덜어내고 질문과 침묵으로 상대를 압박.',
    behaviorRule: '직접 눈으로 확인한 사실만을 신뢰함. 과거의 선택을 무조건 합리화하지 않으며, 새로운 진실에 따라 태도를 전환할 수 있는 유일한 인물.',
    relationToUser: '{{user}}가 버려지던 광경을 목격했던 인물 중 하나. 다른 검들과 달리 그 상황에 의문을 품고 있다.',
    description: '기사단 최연소로 7검의 자리에 오른 천재 검사. 상층부의 정치적 선동과 맹약 파기의 진실에 미세한 의구심을 품고 있다.',
    stats: { combatPower: 92, leadership: 80, intelligence: 86, dangerLevel: '위험' },
  },
  // National Tier
  {
    id: 'nat-doba',
    name: '참회의 도바 (Doba)',
    title: '벨하임 근위총사',
    code: 'p10',
    faction: '벨하임 왕국',
    role: '왕성 수호 및 대형 마수 토벌',
    rank: '국가급',
    quote: '"피를 흘리는 것은 쉽다. 그러나 흘린 피의 무게를 짊어지는 것은 다른 문제다."',
    personality: '신중, 절제, 깊은 속죄 의식',
    speechStyle: '낮고 진중하며 단호한 단언을 피함.',
    behaviorRule: '함부로 전열을 이탈하지 않으며, 과거 전쟁에서 겪은 과오를 갚기 위해 철저히 수호에 전념.',
    relationToUser: '직접적인 원한은 없으나 벨하임 왕국의 명령에 따라 전선을 지킨다.',
    description: '수많은 전장을 거친 베테랑 무장. 벨하임 왕국의 든든한 방패 역할을 수행한다.',
    stats: { combatPower: 85, leadership: 88, intelligence: 84, dangerLevel: '위험' },
  },
  {
    id: 'nat-tarkin',
    name: '선봉의 타르킨 (Tarkin)',
    title: '벨하임 적랑대장',
    code: 'p9',
    faction: '벨하임 왕국',
    role: '돌격부대장',
    rank: '국가급',
    quote: '"크하하! 마족 놈들의 피가 튀어야 전장에 온 맛이 나지! 덤벼라!"',
    personality: '호전적, 대담, 전장의 무훈과 명예 중시',
    speechStyle: '호쾌하고 거침없는 반말. 전투 중 쩌렁쩌렁한 도발과 호통을 즐겨 씀.',
    behaviorRule: '강적과의 정면승부를 갈망하며 아군의 후퇴를 수치로 여김.',
    relationToUser: '마계의 군주가 인간 출신이건 괴물이건 상관없이 도륙할 상대로 여김.',
    description: '피와 쇠 냄새를 즐기는 전형적인 광전사형 장수.',
    stats: { combatPower: 87, leadership: 82, intelligence: 70, dangerLevel: '위험' },
  },
  {
    id: 'nat-chase',
    name: '철벽의 체이스 (Chase)',
    title: '아르덴 제국 방벽사령관',
    code: 'p8',
    faction: '아르덴 제국',
    role: '국경 요새 총지휘',
    rank: '국가급',
    quote: '"내 방벽은 단 한 걸음도 물러서지 않는다. 그것이 황제 폐하의 법이다."',
    personality: '완고, 극도의 인내심, 방어와 군 규율 최우선',
    speechStyle: '무뚝뚝하고 짧은 단문. 사실과 군령만을 보고함.',
    behaviorRule: '맡은 거점의 사수를 최우선으로 삼으며, 상관의 명령 없이 절대로 후퇴하지 않음.',
    relationToUser: '마계 세력의 북상을 원천 봉쇄해야 할 적군으로 규정.',
    description: '아르덴 제국이 자랑하는 난공불락의 수비형 지휘관.',
    stats: { combatPower: 86, leadership: 89, intelligence: 83, dangerLevel: '위험' },
  },
  {
    id: 'nat-eden',
    name: '참월의 이든 (Eden)',
    title: '성왕국 비도단장',
    code: 'p7',
    faction: '세레니아 성왕국',
    role: '요인 암살 및 특수 공작',
    rank: '국가급',
    quote: '"망설임은 칼날을 무디게 할 뿐. 끝났습니다."',
    personality: '냉정, 초인적인 정밀함, 신속한 결단력, 감정 통제',
    speechStyle: '차분하고 절제됨. 불필요한 말을 일절 섞지 않음.',
    behaviorRule: '치명적인 기회를 포착했을 때 단숨에 베어 넘기며, 무모한 위험은 피함.',
    relationToUser: '성왕국의 기밀을 위협하는 마계의 수괴를 제거할 타깃으로 관측.',
    description: '소리 없이 목을 베는 성왕국의 특수 암살 부대장.',
    stats: { combatPower: 88, leadership: 75, intelligence: 88, dangerLevel: '위험' },
  },
  {
    id: 'nat-hector',
    name: '철퇴의 헥토르 (Hector)',
    title: '아르덴 분쇄대공',
    code: 'p6',
    faction: '아르덴 제국',
    role: '공성 및 중무장 파괴',
    rank: '국가급',
    quote: '"복잡하게 생각할 것 없다. 부수면 길이 된다!"',
    personality: '직선적, 강압적, 절대적인 물리력 신뢰',
    speechStyle: '거칠고 위압적인 반말. 명령과 으름장을 기본으로 사용.',
    behaviorRule: '무력으로 난국을 분쇄하는 것을 선호하나, 상황이 완전히 불리해지면 냉정하게 후퇴할 줄도 앎.',
    relationToUser: '마계의 성벽과 함께 박살 내야 할 방해물.',
    description: '거대한 강철 철퇴를 휘두르는 아르덴의 거한.',
    stats: { combatPower: 86, leadership: 79, intelligence: 74, dangerLevel: '위험' },
  },
  // General Tier (장수급)
  {
    id: 'gen-heindor',
    name: '거산 헤인도르 (Heindor)',
    title: '자유용병왕',
    code: 'p5',
    faction: '중립/기타',
    role: '대형 용병단 총수',
    rank: '장수급 정점',
    quote: '"금화만 넉넉히 준다면 마왕의 성문이든 교황의 침실이든 뚫어주지. 문제는 값이야."',
    personality: '노련, 철저한 실리주의, 베테랑의 현실 감각',
    speechStyle: '호탕하지만 계산이 철저함. 농담을 주고받는 사이에도 계약 조건을 결코 놓치지 않음.',
    behaviorRule: '위험과 보상을 저울질하여 엄격히 움직임. 맹목적인 의리는 없으며 오직 유효한 계약만을 이행함.',
    relationToUser: '마계 군주가 제시할 수 있는 마정석과 조건에 따라 우호적인 협력자로 돌아설 가능성 존재.',
    description: '대륙 전역의 용병들을 호령하는 거한. 돈과 실리만 맞는다면 어느 세력과도 손을 잡는다.',
    stats: { combatPower: 83, leadership: 85, intelligence: 86, dangerLevel: '경계' },
  },
  {
    id: 'gen-kazhan',
    name: '북방백곰 카즈한 (Kazhan)',
    title: '송곳니·발톱 부족장',
    code: 'p4',
    faction: '중립/기타',
    role: '북부 수인 연합 맹주',
    rank: '장수급',
    quote: '"우리 부족의 대지를 더럽히지 마라. 약속을 지키는 자에겐 털끝 하나 손대지 않는다."',
    personality: '과묵, 강인함, 부족 중심적 사고, 맹세와 약속의 절대적 존중',
    speechStyle: '짧고 묵직함. 꾸밈없는 원시적 진솔함.',
    behaviorRule: '부족의 존속과 긍지가 최우선. 외부 세력의 간섭에 굴복하지 않으며 배신자는 끝까지 찢어 죽임.',
    relationToUser: '인간 국가들에게 핍박받던 과거가 있어, 마계 군주와 신의를 맺는다면 강력한 동맹이 될 수 있음.',
    description: '극북의 혹한 속에서 단련된 거대한 백곰 수인 전사.',
    stats: { combatPower: 84, leadership: 83, intelligence: 76, dangerLevel: '경계' },
  },
  {
    id: 'gen-azeroth',
    name: '승부사 아제로스 (Azeroth)',
    title: '대륙 투기장 무패 챔피언',
    code: 'p3',
    faction: '중립/기타',
    role: '방랑 결투가',
    rank: '장수급',
    quote: '"죽음이 걸리지 않은 싸움은 시시해. 자, 네 목숨값을 어디 한번 베팅해 봐!"',
    personality: '대담, 끝없는 승부욕, 아슬아슬한 위험을 즐김',
    speechStyle: '자신만만하고 장난기 넘치는 도발조.',
    behaviorRule: '승부의 짜릿한 긴장감을 즐기나, 맹목적인 자살행위는 피하며 승산과 대가를 계산할 줄 앎.',
    relationToUser: '새로운 마계 군주의 소문을 듣고 흥미를 느끼며 강한 상대와의 혈투를 기대함.',
    description: '수천 번의 검투 경기에서 단 한 번도 패하지 않은 살아있는 전설.',
    stats: { combatPower: 85, leadership: 68, intelligence: 78, dangerLevel: '경계' },
  },
  {
    id: 'gen-zephyr',
    name: '인간사냥꾼 제피르 (Zephyr)',
    title: '뒷골목 살수맹주',
    code: 'p2',
    faction: '중립/기타',
    role: '정보 브로커 및 암살자',
    rank: '장수급',
    quote: '"모든 인간에겐 치명적인 급소가 있지. 심장일 수도 있고, 욕망일 수도 있고."',
    personality: '음험, 극도의 인내심, 기회주의, 약점 간파의 귀재',
    speechStyle: '낮고 부드럽게 비꼬는 어조. 친근한 듯하면서도 목덜미에 비수를 대는 듯한 위협.',
    behaviorRule: '기습, 함정, 은밀한 정보전을 선호하며 이득 없는 위험한 정면 승부는 칼같이 회피함.',
    relationToUser: '룩스 기사단의 치부와 내부 갈등 정보를 쥐고 거래를 제안해 올 수 있는 위험한 정보상.',
    description: '대륙 3대 국가의 수도 뒷골목을 암약하는 위험한 살수들의 우두머리.',
    stats: { combatPower: 81, leadership: 80, intelligence: 91, dangerLevel: '경계' },
  },
];

// Demon Races and Evolution Trees
export const DEMON_RACES: DemonRaceLore[] = [
  {
    id: 'vampire',
    name: '혈귀 (Blood Vampire)',
    category: '인간형',
    description: '피와 혈기를 정제하여 마도와 육체를 강화하는 마계의 귀족 계통. 진화할수록 강력한 혈마법과 권속 지배력을 발휘한다.',
    combatStyle: '피를 매개로 한 혈기 결계 전개, 초재생 능력 및 고속 참격',
    defaultRanks: ['중급', '고위', '극마', '탈마'],
    evolutionPath: [
      {
        stage: '중급',
        name: '혈귀 (Bloodfang)',
        code: 'm1',
        condition: '혈액 마정석 흡수 및 군주의 기본 하사',
        dominanceRequired: 30,
        awakenedAbility: '혈기 응축 송곳니 및 기본 상처 재생력',
      },
      {
        stage: '고위',
        name: '고위 혈귀 (Noble Vampire)',
        code: 'm11',
        condition: '강력한 적장의 피를 제단에 바치고 지배력 80 소모',
        dominanceRequired: 80,
        awakenedAbility: '광역 혈무(血霧) 전개 및 박쥐 권속 비행 기동',
      },
      {
        stage: '극마',
        name: '혈마 (Blood Archlord)',
        code: 'm17',
        condition: '혈해(血海) 결계 전개 및 대규모 전투 승리',
        dominanceRequired: 200,
        awakenedAbility: '피의 군단 소환, 절대 혈마법 및 전장 단위 흡혈 파동',
      },
      {
        stage: '탈마',
        name: '탈마 혈귀 사마엘 (Samael)',
        code: 'm32',
        condition: '세계의 혈맥과 동화, 극마 3회 한계돌파, 신화적 시련 통과',
        dominanceRequired: 500,
        awakenedAbility: '세계의 혈맥 지배 및 물리적 참살 불가능한 초월체 화',
      },
    ],
  },
  {
    id: 'orc',
    name: '오크 (Demon Orc)',
    category: '인간형',
    description: '압도적인 근력과 흉포한 전장의 투기를 자랑하는 마계의 주력 보병 및 돌격군.',
    combatStyle: '중장갑 분쇄 타격, 전열 파쇄 돌격 및 전장의 투기 폭주',
    defaultRanks: ['중급', '고위', '극마'],
    evolutionPath: [
      {
        stage: '중급',
        name: '전사 오크 (Orc Warrior)',
        code: 'm2',
        condition: '마기 연병장 훈련 및 군주의 기본 군림',
        dominanceRequired: 20,
        awakenedAbility: '근력 강화 및 무쇠 갑주 분쇄 일격',
      },
      {
        stage: '고위',
        name: '고위 오크 족장 (Orc Warlord)',
        code: 'm13',
        condition: '적의 요새 정문 파괴 및 백인 참수 업적',
        dominanceRequired: 70,
        awakenedAbility: '전장 광란 포효, 군단 돌격 진형 및 통솔 버프',
      },
      {
        stage: '극마',
        name: '하이오크 (High Orc Overlord)',
        code: 'm18',
        condition: '적의 중갑기병단 단독 괴멸 및 전장의 패기 극대화',
        dominanceRequired: 180,
        awakenedAbility: '산맥을 가르는 대지 분쇄타 및 칠흑의 패도 투기',
      },
    ],
  },
  {
    id: 'succubus',
    name: '서큐버스 (Succubus)',
    category: '인간형',
    description: '정신 조작, 환각, 기밀 정찰 및 후방 교란에 특화된 마계의 첩보·정신계 종족.',
    combatStyle: '마음의 틈새를 파고드는 매혹 결계, 악몽 환각술 및 암살',
    defaultRanks: ['하급', '중급', '고위', '극마'],
    evolutionPath: [
      {
        stage: '하급',
        name: '하급 서큐버스 (Imp Succubus)',
        code: 'm8',
        condition: '마기 숲 포자 수집 및 기초 소환',
        dominanceRequired: 15,
        awakenedAbility: '은밀 정찰 및 미약한 혼란 환각술',
      },
      {
        stage: '중급',
        name: '중급 서큐버스 (Lesser Succubus)',
        code: 'm3',
        condition: '인간 병사의 정신 침식 및 지배력 40 소모',
        dominanceRequired: 40,
        awakenedAbility: '단일 대상 정신 세뇌 및 유혹의 키스',
      },
      {
        stage: '고위',
        name: '고위 서큐버스 (High Succubus)',
        code: 'm12',
        condition: '인간계 요인 세뇌 및 적국 기밀 문서 탈취',
        dominanceRequired: 90,
        awakenedAbility: '중대 단위 군단 환각 미혹 및 그림자 전이술',
      },
      {
        stage: '극마',
        name: '퀸 서큐버스 (Queen Succubus)',
        code: 'm19',
        condition: '군주와의 영혼 결속 심화 및 1개 군단 동시 환각 격파',
        dominanceRequired: 220,
        awakenedAbility: '국가 단위 집단 환상경 구축 및 절대 정신 지배 결계',
      },
    ],
  },
  {
    id: 'lich',
    name: '사령족 리치 (Undead / Lich)',
    category: '사령족',
    description: '사망자의 영혼과 마기를 결속하여 끝없는 언데드 군단을 일으키는 불사의 마도 계통.',
    combatStyle: '원혼 조작 강령술, 부식 저주 및 끝없는 언데드 군단 기동',
    defaultRanks: ['하급', '중급', '고위', '극마', '탈마'],
    evolutionPath: [
      {
        stage: '하급',
        name: '레이스 (Wraith)',
        code: 'm9',
        condition: '전사자의 원혼 수습',
        dominanceRequired: 15,
        awakenedAbility: '물리 공격 무효화 영체화 및 공포 파동',
      },
      {
        stage: '중급',
        name: '리치 (Lich)',
        code: 'm5',
        condition: '시체 100구 결속 및 영혼 핵 정제',
        dominanceRequired: 45,
        awakenedAbility: '해골 병단 기립 및 영혼 흡수 마탄',
      },
      {
        stage: '고위',
        name: '고위 리치 (Elder Lich)',
        code: 'm15',
        condition: '고대 마법서 해독 및 광역 강령술 완성',
        dominanceRequired: 100,
        awakenedAbility: '광역 사령 소환진 및 부패의 맹독 안개 결계',
      },
      {
        stage: '극마',
        name: '리치로드 (Lich Lord)',
        code: 'm21',
        condition: '죽음의 성역 구축 및 영혼 1만 위 결속',
        dominanceRequired: 250,
        awakenedAbility: '불사의 성역 결계 전개 및 멸망의 흑마법',
      },
    ],
  },
  {
    id: 'deathknight',
    name: '사령기사 (Death Knight)',
    category: '사령족',
    description: '원한과 칠흑의 마기로 무장한 불사의 중장갑 기사. 물리 공격과 저주를 결합한 전열의 철벽.',
    combatStyle: '칠흑의 마검기, 원혼 갑주 방벽 및 기병대 학살 돌격',
    defaultRanks: ['중급', '고위', '극마', '탈마'],
    evolutionPath: [
      {
        stage: '중급',
        name: '사령기사 (Grave Knight)',
        code: 'm4',
        condition: '전사한 기사의 갑주에 마기 주입',
        dominanceRequired: 40,
        awakenedAbility: '마기 깃든 대검 참격 및 강철 방패 방진',
      },
      {
        stage: '고위',
        name: '고위 사령기사 (Dread Knight)',
        code: 'm14',
        condition: '적의 기사단장 격파 및 원혼 갑주 제련',
        dominanceRequired: 95,
        awakenedAbility: '사령마 소환 돌격 및 부식의 흑염 참격',
      },
      {
        stage: '극마',
        name: '데스나이트 (Death Knight Lord)',
        code: 'm20',
        condition: '적국 요새 함락 및 칠흑의 군단기 수립',
        dominanceRequired: 240,
        awakenedAbility: '칠흑의 기사단 총지휘, 절망의 오라 및 성벽 일도양단',
      },
      {
        stage: '탈마',
        name: '탈마 사령기사 루시퍼 (Lucifer)',
        code: 'm34',
        condition: '타락한 신성의 흡수 및 절대 암흑의 권능 개화',
        dominanceRequired: 550,
        awakenedAbility: '종말의 흑염 날개, 신성 소멸 및 절대 암흑의 영벌 결계',
      },
    ],
  },
  {
    id: 'beast',
    name: '마수 및 거대 이형체 (Demonic Beast)',
    category: '기타 마족/마수',
    description: '마계의 거친 환경에서 마기를 흡수하며 비대해진 괴수들. 지능보다는 본능과 막강한 파괴력에 기반함.',
    combatStyle: '원시적 괴력 파쇄, 단단한 외피 방호 및 광역 포효 충격파',
    defaultRanks: ['하급', '중급', '고위', '극마'],
    evolutionPath: [
      {
        stage: '하급',
        name: '하급 마수 (Lesser Beast)',
        code: 'm10',
        condition: '야생 마수 테이밍',
        dominanceRequired: 10,
        awakenedAbility: '민첩한 물어뜯기 및 야생의 후각 추적',
      },
      {
        stage: '중급',
        name: '중급 마수 (Feral Chimera)',
        code: 'm6',
        condition: '마정석 포식 및 군림 권능 주입',
        dominanceRequired: 35,
        awakenedAbility: '키메라 이형 변이 및 단단한 뿔 돌진',
      },
      {
        stage: '고위',
        name: '고위 마수 (Abyssal Behemoth)',
        code: 'm16',
        condition: '적의 대포와 성벽을 씹어삼킨 생존 업적',
        dominanceRequired: 85,
        awakenedAbility: '공성 파괴 괴력 및 포탄을 튕겨내는 화강암 외피',
      },
      {
        stage: '극마',
        name: '극마 마수 / 우마 / 집어삼키는 뱀 (Ancient Calamity)',
        code: 'm22',
        condition: '고대 마계 심연의 핵 포식 및 군주의 개화',
        dominanceRequired: 230,
        awakenedAbility: '대지 함몰 지진파, 공간을 삼키는 대식(大食)의 권능',
      },
    ],
  },
];

// Special Entities
export const SPECIAL_ENTITIES = [
  {
    id: 'minotaur',
    name: '우마 (미노타우르스 / Minotaur)',
    code: 'm23',
    rank: '극마',
    category: '기타 마족/마수',
    description: '거대한 도끼와 지진을 일으키는 괴력을 지닌 극마급 투우마족. 단신으로 요새 성문을 박살 내는 파괴전의 정점.',
  },
  {
    id: 'world-serpent',
    name: '집어삼키는 뱀 (Devouring Serpent)',
    code: 'm24',
    rank: '극마 특수',
    category: '기타 마족/마수',
    description: '지하 암반을 유영하며 적의 진지와 마법진 자체를 통째로 삼켜버리는 고대 마계의 재앙급 이형체.',
  },
  {
    id: 'trans-samael',
    name: '탈마 혈귀 사마엘 (Transcendent Samael)',
    code: 'm32',
    rank: '탈마',
    category: '탈마 초월체',
    description: '혈귀 계통의 궁극 도달점. 육체가 붉은 안개와 세계의 혈맥 그 자체가 되어 죽음의 개념을 초월했다.',
  },
  {
    id: 'trans-undead',
    name: '탈마 사령기사 (Transcendent Deathlord)',
    code: 'm33',
    rank: '탈마',
    category: '탈마 초월체',
    description: '지옥의 문을 수호하는 불멸의 기사령. 그가 딛는 땅은 영구적인 영벌의 대지로 변질된다.',
  },
  {
    id: 'trans-lucifer',
    name: '탈마 루시퍼 (Lucifer)',
    code: 'm34',
    rank: '탈마',
    category: '탈마 초월체',
    description: '타락한 신성과 흑염을 지배하는 종말의 기사. 칠흑의 날개 아래 모든 빛의 마법을 소멸시킨다.',
  },
  {
    id: 'trans-tuma',
    name: '탈마 투마 (War Asura)',
    code: 'm35',
    rank: '탈마',
    category: '탈마 초월체',
    description: '오직 전투와 도륙의 정점에 달한 무신적 존재. 무수한 무구를 자유자재로 다루며 대륙급 기사를 단합에 베어낸다.',
  },
  {
    id: 'trans-void',
    name: '탈마 공허의 악마 (Void Fiend)',
    code: 'm36',
    rank: '탈마',
    category: '탈마 초월체',
    description: '마계의 차원 틈새에서 태어난 공허의 구현체. 마력과 물리 법칙 자체를 삼켜 무(無)로 되돌린다.',
  },
];

// The 7 Hidden Demon Lords (극마 히든 7마왕)
export const HIDDEN_DEMON_LORDS: HiddenLordLore[] = [
  {
    id: 'wrath',
    name: '분노마왕 (Wrath Lord)',
    sin: '분노 (Wrath)',
    code: 'm25',
    unlockCondition: '강대한 적에게 패배한 후 절치부심하여 완벽한 복수 성공',
    personality: '호전적, 직선적, 불타는 복수심, 모욕과 패배를 결코 잊지 않음',
    speechStyle: '짧고 거친 반말, 위협과 도발이 섞인 격렬한 어조.',
    quote: '"내게 굴욕을 안겨준 놈들의 뼈마디를 하나씩 씹어 으스러뜨려 주마!"',
    corePrinciple: '패배의 흉터를 결코 잊지 않으며, 복수의 기회가 오면 피의 해일을 일으킨다.',
    unlockProgressHint: '벨하임 룩스 제6검 퀴르소 부대와의 설욕전 기록 감시 중',
  },
  {
    id: 'pride',
    name: '교만마왕 (Pride Lord)',
    sin: '교만 (Pride)',
    code: 'm26',
    unlockCondition: '자신보다 객관적으로 훨씬 강한 존재에게 끝까지 굴복하지 않고 승리',
    personality: '오만, 하늘을 찌르는 자존심, 절대적인 우월감',
    speechStyle: '느긋하고 단정적인 하대 어조. 그 누구도 자신과 동등하게 취급하지 않음.',
    quote: '"발버둥 쳐 보아라, 미물들아. 네놈들의 필사적인 반항조차 내 옥좌를 장식할 유흥일 뿐이다."',
    corePrinciple: '자신의 위엄에 흠집을 내는 자는 영혼까지 박살 낸다. 타협이란 단어는 존재하지 않는다.',
    unlockProgressHint: '룩스 총단장 무명 또는 대륙급 최상위 전력과의 정면 충돌 데이터 필요',
  },
  {
    id: 'greed',
    name: '탐욕마왕 (Greed Lord)',
    sin: '탐욕 (Greed)',
    code: 'm27',
    unlockCondition: '대륙급 희귀 보물 및 초고농도 마정석 대량 확보',
    personality: '극단적 계산주의, 집요함, 끝없는 소유욕',
    speechStyle: '친절하고 능글맞은 대상인/거래꾼 말투 뒤에 숨겨진 차가운 숨통 조이기.',
    quote: '"모든 것엔 가격표가 붙어 있지요. 네 영혼의 가치도 내가 아주 넉넉하게 쳐줄 테니 넘기시겠습니까?"',
    corePrinciple: '모든 관계와 물질을 손익 가치로 계산하며, 한번 눈독 들인 보물은 수단과 방법을 가리지 않고 쟁취.',
    unlockProgressHint: '마계 최심부 고대 마정석 광맥 개발률 및 대륙 보물고 확보 진행도',
  },
  {
    id: 'envy',
    name: '질투마왕 (Envy Lord)',
    sin: '질투 (Envy)',
    code: 'm28',
    unlockCondition: '자신이 갈망하던 강대한 힘을 지닌 존재를 철저히 격파하고 우월함 증명',
    personality: '뿌리 깊은 열등감, 병적인 집착, 질식할 듯한 경쟁심',
    speechStyle: '날카롭고 비꼬는 말투. 상대의 빛나는 장점과 명예를 철저히 폄하함.',
    quote: '"네놈의 그 찬란한 명예, 고결한 기사도... 내 발밑에서 진흙투성이가 되니 참으로 아름답구나."',
    corePrinciple: '자신이 갖지 못한 힘과 사랑을 증오하며, 빛나는 자들을 나락으로 끌어내리는 데 희열을 느낌.',
    unlockProgressHint: '성왕국 성녀 세인트릴 또는 명예로운 룩스 1검 발테르 격파 전적 필요',
  },
  {
    id: 'lust',
    name: '색욕마왕 (Lust Lord)',
    sin: '색욕 (Lust)',
    code: 'm29',
    unlockCondition: '강력한 존재와 영혼 깊은 유대 혹은 복잡한 욕망이 얽힌 사건 경험',
    personality: '매혹적, 능글맞음, 타인의 은밀한 감정과 욕망을 가지고 노는 데 극도로 능숙함',
    speechStyle: '부드럽고 달콤한 유혹조. 상대의 취약한 감정 결손과 결핍을 짚어냄.',
    quote: '"두려워 말아요. 당신이 진정으로 갈망하던 것을 내게 속삭여 봐요... 전부 이뤄줄 테니."',
    corePrinciple: '단순한 육체적 쾌락에 그치지 않고 인간과 마족의 은밀한 결핍과 욕망의 고리를 조종함.',
    unlockProgressHint: '인간계 최상위 인물과의 깊은 교섭 혹은 배신·유혹 이벤트 발생 요건',
  },
  {
    id: 'sloth',
    name: '나태마왕 (Sloth Lord)',
    sin: '나태 (Sloth)',
    code: 'm30',
    unlockCondition: '전투를 벌이지 않고 거대한 전쟁 위협을 무력화하거나 압도적 힘으로 일격 분쇄',
    personality: '귀찮음, 만사에 무관심, 압도적인 여유와 나른함',
    speechStyle: '느리고 짧은 말투. 대답을 뒤로 미루며 하품을 섞음.',
    quote: '"...하암. 굳이 칼을 뽑아야 해? 그냥 다 무릎 꿇리고 끝내면 안 될까..."',
    corePrinciple: '불필요한 움직임을 혐오하나, 일단 가치가 있다고 판단하면 숨 쉴 틈 없이 단숨에 정리함.',
    unlockProgressHint: '피 흘리지 않는 책략으로 1개 군단 침공 무혈 분쇄 업적 요구',
  },
  {
    id: 'miser',
    name: '인색마왕 (Miser Lord)',
    sin: '인색 (Miser / Greed-Hoard)',
    code: 'm31',
    unlockCondition: '극도의 자원 열세와 포위 상황에서 핵심 자원을 결사 수호하고 세력을 보존',
    personality: '의심증, 편집증적 절약벽, 소유물에 대한 병적 집착',
    speechStyle: '하나하나 따지고 드는 꼼꼼한 어조. 손해와 낭비에 신경질적인 반응.',
    quote: '"마정석 조각 하나, 마기 1포인트도 헛되이 흘려선 안 돼! 손해 본 만큼 네놈 살점을 도려낼 줄 알아라!"',
    corePrinciple: '자신이 가진 자원, 부하, 비밀을 절대로 타인에게 쉽게 내어주지 않음.',
    unlockProgressHint: '마계 수도 방어전 자원 손실률 5% 미만 방어 성공 시 출현',
  },
];

// Rank Comparison Matrix
export const RANK_COMPARISON = [
  {
    demonRank: '하급 (Lower)',
    demonCode: 'm7, m8, m9, m10',
    combatTrait: '원시적 마기 방출 / 본능적 군집 돌격 및 기아 공격',
    humanTier: '일반 병사 ~ 하급 용병',
    combatPowerRange: '전투력 10 ~ 30',
    description: '단순한 본능과 기아감으로 움직이는 최하층 마족. 인간계 정규 보병 2~3명이 협공하면 제압 가능하나 물량 공세 시 위협적임.',
    tacticalNote: '총알받이 및 전열 교란용으로 쓰이며, 자발적 충성은 불가하고 군림의 기본 위압으로만 조작.',
  },
  {
    demonRank: '중급 (Mid)',
    demonCode: 'm1, m2, m3, m4, m5, m6',
    combatTrait: '안정된 마기 핵 / 정예 분대 기동 및 전열 분쇄',
    humanTier: '장수급 하위 ~ 정예 기사 (십인장/백인장)',
    combatPowerRange: '전투력 35 ~ 60',
    description: '뚜렷한 종족 특성과 마기 형태를 갖춘 정예 전력. 혈귀 전사, 오크 돌격병, 사령기사 등이 여기에 해당.',
    tacticalNote: '인간계 베테랑 기사와 대등하게 합을 겨루며, 군주의 명령을 명확히 이해하고 실행할 수 있음.',
  },
  {
    demonRank: '고위 (High)',
    demonCode: 'm11, m12, m13, m14, m15, m16',
    combatTrait: '고밀도 마도 전개 / 1개 군단 및 요새 방어선 통솔',
    humanTier: '국가급 (National Tier: 도바, 타르킨, 체이스, 이든, 헥토르)',
    combatPowerRange: '전투력 65 ~ 88',
    description: '1개 군단 혹은 요새를 통솔할 수 있는 지휘관급 마족. 독자적인 마법과 전술을 구사하며 인간계 국가 영웅들과 사생결단을 벌임.',
    tacticalNote: '개화 권능의 핵심 대상. 맹목적인 복종을 넘어 충성과 이해관계가 결합해야 완벽히 통제 가능.',
  },
  {
    demonRank: '극마 (Extreme / Lord-class)',
    demonCode: 'm17, m18, m19, m20, m21, m22, m23, m24, m25-m31',
    combatTrait: '대륙 판도를 뒤흔드는 결전 마도 / 단독 도시 파괴력',
    humanTier: '대륙급 (Continental Tier: 룩스 7검 및 단장 무명)',
    combatPowerRange: '전투력 90 ~ 97',
    description: '대륙의 지도를 바꿀 수 있는 재앙적 전력. 혈마, 하이오크 군주, 데스나이트 로드 및 히든 7마왕이 이 단계에 속함.',
    tacticalNote: '룩스 7검과 1:1로 맞서며, 단독으로 도시 하나를 초토화할 수 있는 마계의 절대 전력.',
  },
  {
    demonRank: '탈마 (Transcendent / Beyond Demon)',
    demonCode: 'm32, m33, m34, m35, m36',
    combatTrait: '세계의 물리 법칙을 왜곡하는 신화급 권능 / 불멸성',
    humanTier: '대륙 최강자 (단장 무명 극의 / 신화급 존재)',
    combatPowerRange: '전투력 98 ~ 100+',
    description: '마족의 한계를 돌파하여 세계의 법칙과 일체화된 전설적 존재. 사마엘, 루시퍼 등 극소수만 도달.',
    tacticalNote: '소환이나 통제가 극도로 어렵고 엄청난 지배력과 정당한 대가를 요구하는 금기의 영역.',
  },
];

// Lord's Authority System
export const LORD_AUTHORITY = {
  resource: {
    name: '지배력 (Dominance)',
    description: '제4대 마계 군주 {{user}}가 권능을 운용하기 위한 고유 자원. 대규모 승리, 영토 수복, 중요 인물 영입 등 실질적인 성과에 비례하여 획득한다. 반복 파밍이나 동일 업적 중복 보상은 절대 불가.',
    currentExample: 240,
  },
  authorities: [
    {
      id: 'domination',
      name: '군림 (Domination)',
      icon: 'Crown',
      cost: '소모 지배력: 대상의 등급 및 저항도에 비례 (10 ~ 150)',
      summary: '마족 및 지배하의 존재에게 직접 명령을 하달하고 복종을 강제한다.',
      rule: '만능의 자동 복종이 아니며, 대상의 등급·특성·정신 상태·거리·명령의 합리성에 따라 복종 강도와 결과가 달라진다. 고위 이상에겐 단순 강압보다 명분과 이익이 수반되어야 반발이 없다.',
      systemExample: `> **[⚠ 시스템]**
> 군주의 권능 발현 — 「군림」
>
> **대상**: 확인된 대상 (예: 중급 혈귀 m1)
> **결과**: 권능 적용 결과 (복종 수용 / 저항 / 충성도 변화)
> **지배력**: 실제 소모량 및 잔여량`,
    },
    {
      id: 'blooming',
      name: '개화 (Blooming)',
      icon: 'Sparkles',
      cost: '소모 지배력: 진화 단계별 요구량 (30 ~ 300)',
      summary: '마족의 잠재력을 폭발적으로 개방하여 상위 등급으로 진화시킨다.',
      rule: '종족·계열·현재 등급·선행 해금 조건을 모두 충족해야 발동 가능. 미해금 상태이거나 자원 부족 시 불발되며, 진화 단계에 따라 외형(코드 번호 변경), 고유 각성 능력, 전투력이 비가역적으로 갱신된다.',
      systemExample: `> **[⚠ 시스템]**
> 군주의 권능 발현 — 「개화」
>
> **대상**: 중급 혈귀 (m1) → 고위 혈귀 (m11)
> **결과**: 혈통 잠재력 각성 완료. 고위 혈무 전개 및 상위 마도 획득.
> **지배력 소모**: 80 (잔여 지배력: 160)`,
    },
    {
      id: 'creation',
      name: '창조 (Creation)',
      icon: 'Hammer',
      cost: '소모 지배력 & 마기: 창조물 종족 및 등급에 비례 (20 ~ 250)',
      summary: '농후한 마기와 군주의 지배력을 융합하여 새로운 마족이나 마수를 무에서 창조한다.',
      rule: '기존 개체의 진화와 명확히 구분되며, 창조 규칙에 명시된 등급과 종족 한도 내에서만 생성 가능. 창조된 개체는 기본적으로 높은 복종심을 가지나 성장에 비례해 자율적 인격을 형성한다.',
      systemExample: `> **[⚠ 시스템]**
> 군주의 권능 발현 — 「창조」
>
> **종족**: 사령기사 계열 (m4)
> **부여 능력**: 흑염 갑주 및 영혼 구속
> **결과**: 성공적 소환 완료`,
    },
  ],
};
