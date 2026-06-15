export type Category =
  | '카페'
  | '음식점'
  | '이자카이'
  | '쇼핑'
  | '관광명소'
  | '공원'
  | '사찰'
  | '미술관/박물관'
  | '벼룩시장'
  | '공항';

export type Area =
  | '신주쿠'
  | '시부야'
  | '하라주쿠·오모테산도'
  | '기치조지·시모키타자와'
  | '아사쿠사·우에노'
  | '이케부쿠로'
  | '긴자·츠키지·하치초보리'
  | '미나토·롯폰기·미드타운'
  | '신바시·시오도메'
  | '오카치마치'
  | '가마쿠라·쇼난'
  | '기타';

export interface Place {
  id: string;
  name: string;
  nameKo?: string;
  area: Area;
  category: Category;
  subcategory: string;
  rating: number;
  reviewCount: number;
  priceRange?: string;
  note?: string;
  tags: string[];
  isCustom?: boolean;
}

export const places: Place[] = [
  // ─── 신주쿠 ────────────────────────────────────────────────
  { id: 'shinjuku-gyoen', name: '신주쿠 교엔', area: '신주쿠', category: '공원', subcategory: '정원', rating: 4.6, reviewCount: 45102, tags: ['공원', '벚꽃', '정원'] },
  { id: 'aubergine', name: 'Aubergine', area: '신주쿠', category: '음식점', subcategory: '테이크아웃 전문 레스토랑', rating: 4.1, reviewCount: 408, priceRange: '¥1,000~2,000', note: '테이크아웃해서 신주쿠 교엔', tags: ['테이크아웃', '피크닉'] },
  { id: 'gacha-gacha-shinjuku', name: 'Gacha Gacha no Mori Shinjuku', area: '신주쿠', category: '쇼핑', subcategory: '장난감 가게', rating: 4.0, reviewCount: 119, tags: ['가챠', '장난감', '쇼핑'] },
  { id: 'jinmapadubu-shinjuku', name: '진마파두부 신주쿠서던테라스점', area: '신주쿠', category: '음식점', subcategory: '북경 요리', rating: 4.0, reviewCount: 329, priceRange: '¥1,000~2,000', tags: ['중식', '마파두부'] },
  { id: 'sukiyaki-hokuto-shinjuku', name: '스키야키 호쿠토 신주쿠', area: '신주쿠', category: '음식점', subcategory: '스키야키', rating: 4.6, reviewCount: 886, priceRange: '¥1,000~2,000', tags: ['스키야키', '일식', '냄비요리'] },
  { id: 'cafe-lumiere', name: '카페 뤼미에르', area: '신주쿠', category: '카페', subcategory: '카페', rating: 4.3, reviewCount: 581, priceRange: '¥1,000~2,000', tags: ['카페', '분위기'] },
  { id: 'ryumon-coffee-stand', name: 'Ryumon coffee stand', area: '신주쿠', category: '카페', subcategory: '커피숍', rating: 4.4, reviewCount: 454, priceRange: '¥1~1,000', tags: ['커피', '스탠드', '테이크아웃'] },

  // ─── 시부야 ────────────────────────────────────────────────
  { id: 'parco-shibuya', name: '파르코 시부야', area: '시부야', category: '쇼핑', subcategory: '쇼핑몰', rating: 4.3, reviewCount: 7992, tags: ['쇼핑몰', '팝업', '문화'] },
  { id: 'freaks-store-shibuya', name: "FREAK'S STORE Shibuya", area: '시부야', category: '쇼핑', subcategory: '의류점', rating: 4.1, reviewCount: 428, tags: ['의류', '빈티지', '캐주얼'] },
  { id: 'hokkaido-soup-curry-shibuya', name: '홋카이도 수프카레 스아게 시부야', area: '시부야', category: '음식점', subcategory: '일본 카레', rating: 4.6, reviewCount: 3391, priceRange: '¥1,000~2,000', tags: ['카레', '홋카이도', '수프카레'] },
  { id: 'kens-coffee-shop', name: "Ken's Coffee Shop", area: '시부야', category: '카페', subcategory: '커피숍', rating: 4.6, reviewCount: 397, priceRange: '¥1,000~2,000', tags: ['커피', '레트로', '명커피'] },

  // ─── 하라주쿠·오모테산도 ──────────────────────────────────
  { id: 'kiddy-land-harajuku', name: '키디랜드 하라주쿠점', area: '하라주쿠·오모테산도', category: '쇼핑', subcategory: '장난감 가게', rating: 4.3, reviewCount: 5423, tags: ['장난감', '캐릭터', '선물'] },
  { id: 'human-made-harajuku', name: '휴먼 메이드 하라주쿠', area: '하라주쿠·오모테산도', category: '쇼핑', subcategory: '의류점', rating: 3.3, reviewCount: 238, tags: ['의류', '스트릿', '나이고'] },
  { id: 'number-sugar-omotesando', name: '넘버슈가 오모테산도점', area: '하라주쿠·오모테산도', category: '카페', subcategory: '패스트리', rating: 4.3, reviewCount: 1439, tags: ['캐러멜', '디저트', '선물'] },
  { id: 'niko-and-tokyo', name: 'niko and … TOKYO', area: '하라주쿠·오모테산도', category: '쇼핑', subcategory: '의류점', rating: 4.3, reviewCount: 1015, tags: ['의류', '라이프스타일', '잡화'] },
  { id: 'camelback-sandwich', name: '카멜백 샌드위치 & 에스프레소', area: '하라주쿠·오모테산도', category: '카페', subcategory: '커피숍', rating: 3.9, reviewCount: 1064, priceRange: '¥1,000~2,000', tags: ['샌드위치', '에그샌드', '커피'] },

  // ─── 기치조지·시모키타자와 ───────────────────────────────
  { id: 'inokashira-park', name: '이노카시라 공원', area: '기치조지·시모키타자와', category: '공원', subcategory: '공원', rating: 4.4, reviewCount: 13554, tags: ['공원', '벚꽃', '보트', '산책'] },
  { id: 'kichijoji-satou', name: '키치조지 사토우', area: '기치조지·시모키타자와', category: '쇼핑', subcategory: '정육점', rating: 4.2, reviewCount: 1901, tags: ['멘치카츠', '정육점', '줄서는곳'] },
  { id: 'part-of-nature', name: 'PART OF NATURE', area: '기치조지·시모키타자와', category: '쇼핑', subcategory: '선물 가게', rating: 4.9, reviewCount: 9, tags: ['선물', '잡화', '독특한가게'] },
  { id: 'honkbooks', name: '그本や honkbooks', area: '기치조지·시모키타자와', category: '쇼핑', subcategory: '중고 서점', rating: 4.4, reviewCount: 54, tags: ['책', '중고서점', '구경'] },
  { id: 'bole-coffee-ice-cream', name: 'Bole COFFEE & ICE CREAM', area: '기치조지·시모키타자와', category: '카페', subcategory: '아이스크림', rating: 4.5, reviewCount: 134, tags: ['아이스크림', '커피', '공원근처'] },
  { id: 'isshinryu-coffee', name: '一進流珈琲屋', area: '기치조지·시모키타자와', category: '카페', subcategory: '커피숍', rating: 4.7, reviewCount: 67, priceRange: '¥1~1,000', tags: ['커피', '고품질', '조용한'] },
  { id: 'hiroki-shimokitazawa', name: '히로키 시모키타자와점', area: '기치조지·시모키타자와', category: '음식점', subcategory: '오코노미야키', rating: 4.2, reviewCount: 759, priceRange: '¥2,000~3,000', tags: ['오코노미야키', '히로시마식', '철판구이'] },

  // ─── 아사쿠사·우에노 ──────────────────────────────────────
  { id: 'asakusa-gyukatsu', name: '아사쿠사 규카츠', area: '아사쿠사·우에노', category: '음식점', subcategory: '돈까스 가게', rating: 4.8, reviewCount: 13129, priceRange: '¥2,000~3,000', tags: ['규카츠', '소고기', '인기맛집'] },
  { id: 'tokyo-national-museum', name: '도쿄 국립박물관', area: '아사쿠사·우에노', category: '미술관/박물관', subcategory: '국립박물관', rating: 4.5, reviewCount: 30494, tags: ['박물관', '역사', '문화'] },
  { id: 'ueno-forest-museum', name: '우에노의 숲 미술관', area: '아사쿠사·우에노', category: '미술관/박물관', subcategory: '미술관', rating: 4.1, reviewCount: 5905, tags: ['미술관', '전시', '문화'] },
  { id: 'yuria-pemuperu', name: 'Yuria Pemuperu', area: '아사쿠사·우에노', category: '카페', subcategory: '커피숍', rating: 3.9, reviewCount: 556, priceRange: '¥1,000~2,000', tags: ['카페', '레트로'] },

  // ─── 이케부쿠로 ───────────────────────────────────────────
  { id: 'sunshine-city', name: '선샤인시티', area: '이케부쿠로', category: '쇼핑', subcategory: '쇼핑몰', rating: 4.1, reviewCount: 34534, tags: ['쇼핑몰', '수족관', '전망대'] },
  { id: 'moma-design-store-ikebukuro', name: 'MoMA Design Store Ikebukuro Loft', area: '이케부쿠로', category: '쇼핑', subcategory: '잡화점', rating: 2.8, reviewCount: 12, tags: ['디자인', '잡화', '기념품'] },
  { id: 'milky-way-cafe', name: 'Milky Way Cafe', area: '이케부쿠로', category: '카페', subcategory: '카페', rating: 3.9, reviewCount: 860, priceRange: '¥1,000~2,000', tags: ['카페', '분위기'] },

  // ─── 긴자·츠키지·하치초보리 ─────────────────────────────
  { id: 'muji-ginza', name: '무인양품 긴자', area: '긴자·츠키지·하치초보리', category: '쇼핑', subcategory: '잡화점', rating: 4.3, reviewCount: 6013, tags: ['무인양품', '잡화', '의류', '식품'] },
  { id: 'tsukiji-tama-sushi', name: 'Tsukiji Tama Sushi Sasashigure', area: '긴자·츠키지·하치초보리', category: '음식점', subcategory: '초밥', rating: 4.4, reviewCount: 674, priceRange: '¥2,000~7,000', tags: ['스시', '츠키지', '해산물'] },
  { id: 'oedo-antique-market', name: 'Oedo Antique Market', area: '긴자·츠키지·하치초보리', category: '벼룩시장', subcategory: '벼룩시장', rating: 3.7, reviewCount: 104, tags: ['앤티크', '벼룩시장', '빈티지'] },
  { id: 'robatakatete-hatchobori', name: 'Robatakatete Hatchoborihanare', area: '긴자·츠키지·하치초보리', category: '이자카이', subcategory: '이자카이', rating: 4.0, reviewCount: 317, priceRange: '¥1,000~6,000', tags: ['이자카이', '꼬치', '로바타야키'] },
  { id: 'coffee-lambre', name: "Coffee L'ambre", area: '긴자·츠키지·하치초보리', category: '카페', subcategory: '커피숍', rating: 3.8, reviewCount: 1047, priceRange: '¥1,000~2,000', tags: ['커피', '레트로', '노포'] },

  // ─── 미나토·롯폰기·미드타운 ──────────────────────────────
  { id: 'tsujihan-midtown', name: '츠지한 도쿄 미드타운점', area: '미나토·롯폰기·미드타운', category: '음식점', subcategory: '해산물 덮밥', rating: 4.2, reviewCount: 638, priceRange: '¥1,000~2,000', tags: ['카이센동', '해산물', '줄서는곳'] },
  { id: 'gashapon-bandai-midtown', name: 'Gashapon Bandai Official Shop', area: '미나토·롯폰기·미드타운', category: '쇼핑', subcategory: '장난감 가게', rating: 3.9, reviewCount: 70, tags: ['가챠', '반다이', '피규어'] },
  { id: 'shumoku-cafe', name: 'SHUMOKU CAFE', area: '미나토·롯폰기·미드타운', category: '카페', subcategory: '카페', rating: 4.4, reviewCount: 77, priceRange: '¥1~1,000', tags: ['카페', '미술관카페', '조용한'] },

  // ─── 신바시·시오도메 ──────────────────────────────────────
  { id: 'sushi-tooden-shinbashi', name: 'Sushi Tooden Ninoya Shinbashishi', area: '신바시·시오도메', category: '이자카이', subcategory: '이자카이', rating: 4.8, reviewCount: 609, priceRange: '¥3,000~7,000', tags: ['스시', '이자카이', '고급'] },
  { id: 'matsubaraaan', name: '마츠바라안', area: '신바시·시오도메', category: '음식점', subcategory: '소바 전문점', rating: 4.3, reviewCount: 1579, priceRange: '¥2,000~6,000', tags: ['소바', '일식', '노포'] },

  // ─── 오카치마치 ───────────────────────────────────────────
  { id: 'aona-beef-cutlet', name: 'Beef Cutlet 아오나 오카치마치점', area: '오카치마치', category: '음식점', subcategory: '일식당', rating: 4.2, reviewCount: 2098, priceRange: '¥2,000~3,000', tags: ['규카츠', '소고기', '카츠레츠'] },
  { id: 'tokyo-city-flea-market', name: 'Tokyo City Flea Market', area: '오카치마치', category: '벼룩시장', subcategory: '벼룩시장', rating: 4.3, reviewCount: 591, note: '토요일 9:00~14:30', tags: ['벼룩시장', '앤티크', '주말한정'] },

  // ─── 가마쿠라·쇼난 ───────────────────────────────────────
  { id: 'hokokuji', name: '호코쿠지', area: '가마쿠라·쇼난', category: '사찰', subcategory: '불교사찰', rating: 4.4, reviewCount: 5413, tags: ['대나무숲', '사찰', '정원', '말차'] },
  { id: 'jojuin', name: '조주인', area: '가마쿠라·쇼난', category: '사찰', subcategory: '불교사찰', rating: 4.2, reviewCount: 885, note: '계단 길 바다뷰', tags: ['사찰', '바다뷰', '계단'] },
  { id: 'hasedera', name: '하세데라', area: '가마쿠라·쇼난', category: '사찰', subcategory: '불교사찰', rating: 4.5, reviewCount: 16623, note: '수국명소', tags: ['사찰', '수국', '바다뷰', '관음상'] },
  { id: 'komachi-dori', name: 'Komachi-dori Shopping Street', area: '가마쿠라·쇼난', category: '관광명소', subcategory: '관광 명소', rating: 4.4, reviewCount: 234, tags: ['쇼핑거리', '먹거리', '관광'] },
  { id: 'kannon-coffee-kamakura', name: '카논커피 카마쿠라', area: '가마쿠라·쇼난', category: '카페', subcategory: '카페', rating: 4.2, reviewCount: 543, priceRange: '¥1~1,000', tags: ['커피', '분위기', '테이크아웃'] },
  { id: 'cafe-yukinosita', name: 'cafe YUKINOSITA', area: '가마쿠라·쇼난', category: '카페', subcategory: '카페', rating: 4.6, reviewCount: 81, priceRange: '¥1,000~2,000', tags: ['카페', '디저트', '조용한'] },
  { id: 'yacchi-and-moon', name: 'Yacchi & Moon', area: '가마쿠라·쇼난', category: '쇼핑', subcategory: '도자기 상점', rating: 4.5, reviewCount: 58, tags: ['도자기', '공예', '기념품'] },
  { id: 'sakanosita', name: '사카노시타', area: '가마쿠라·쇼난', category: '카페', subcategory: '카페', rating: 4.4, reviewCount: 131, priceRange: '¥1,000~2,000', tags: ['카페', '분위기', '바다근처'] },
  { id: 'shonan-beach-park', name: '쇼난 해안공원', area: '가마쿠라·쇼난', category: '공원', subcategory: '공원', rating: 4.3, reviewCount: 6826, tags: ['해변', '공원', '후지산뷰', '서핑'] },

  // ─── 기타 ─────────────────────────────────────────────────
  { id: 'sylvanian-families', name: 'Sylvanian Families Morino Ouchi', area: '기타', category: '쇼핑', subcategory: '장난감 가게', rating: 3.4, reviewCount: 51, tags: ['실바니안', '장난감', '어린이'] },
  { id: 'baise', name: 'Baise', area: '기타', category: '쇼핑', subcategory: '생활용품점', rating: 3.9, reviewCount: 136, tags: ['생활용품', '잡화'] },
  { id: 'fu-wa-ri', name: 'FU WA RI', area: '기타', category: '쇼핑', subcategory: '주방용품점', rating: 4.3, reviewCount: 224, tags: ['주방용품', '그릇', '잡화'] },
  { id: 'shapu', name: '사푸', area: '기타', category: '음식점', subcategory: '음식점', rating: 4.2, reviewCount: 136, priceRange: '¥1,000~4,000', tags: ['음식점'] },
  { id: 'bishin-shuka', name: 'Bishin Shuka', area: '기타', category: '음식점', subcategory: '북경 요리', rating: 4.0, reviewCount: 316, priceRange: '¥1,000~3,000', tags: ['중식', '북경요리'] },
  { id: 'doma-bldg', name: 'Doma bldg', area: '기타', category: '쇼핑', subcategory: '중고 의류 상점', rating: 4.2, reviewCount: 5, tags: ['중고의류', '빈티지'] },
  { id: 'kasiki', name: 'kasiki', area: '기타', category: '카페', subcategory: '아이스크림', rating: 4.3, reviewCount: 192, tags: ['아이스크림', '디저트'] },
  { id: 'chidori', name: 'Chidori', area: '기타', category: '쇼핑', subcategory: '도자기 상점', rating: 4.4, reviewCount: 92, tags: ['도자기', '공예'] },
  { id: 'sundries', name: 'Sundries', area: '기타', category: '쇼핑', subcategory: '골동품점', rating: 5.0, reviewCount: 2, tags: ['골동품', '앤티크'] },
  { id: 'yogashi-lemon-pie', name: '요가시 레몬파이', area: '기타', category: '카페', subcategory: '패스트리', rating: 4.4, reviewCount: 581, tags: ['레몬파이', '디저트', '베이커리'] },
  { id: 'matilda-coffee', name: 'Matilda Coffee & Vegan bakes', area: '기타', category: '카페', subcategory: '커피숍', rating: 4.9, reviewCount: 27, priceRange: '¥1,000~2,000', tags: ['커피', '비건', '베이커리'] },
  { id: 'mushinan', name: 'Mushinan', area: '기타', category: '카페', subcategory: '일본 디저트 전문', rating: 4.4, reviewCount: 758, tags: ['화과자', '일본디저트', '말차'] },
  { id: 'loft', name: 'Loft', area: '기타', category: '쇼핑', subcategory: '잡화점', rating: 3.9, reviewCount: 2489, tags: ['잡화', '문구', '생활용품'] },
  { id: 'yoridokoro', name: '요리도코로', area: '기타', category: '음식점', subcategory: '일식당', rating: 4.2, reviewCount: 1630, priceRange: '¥1,000~2,000', note: '열차뷰 자리는 예약제', tags: ['일식', '열차뷰', '예약'] },
  { id: 'moma-design-store', name: '모마 디자인 스토어', area: '기타', category: '쇼핑', subcategory: '잡화점', rating: 4.2, reviewCount: 552, tags: ['디자인', '잡화', '기념품'] },
  { id: 'narita-airport', name: '나리타 국제 공항', area: '기타', category: '공항', subcategory: '국제 공항', rating: 4.3, reviewCount: 31944, tags: ['공항', '나리타'] },

  // ─── 추가 장소 ────────────────────────────────────────────
  { id: 'after-all-coffee', name: '에프터올커피', area: '시부야', category: '카페', subcategory: '커피숍', rating: 4.7, reviewCount: 499, priceRange: '¥1,000~2,000', tags: ['커피', '카페', '시부야'] },
  { id: 'yakiniku-horuichi-shibuya', name: '야키니쿠 호루이치 시부야점', area: '시부야', category: '이자카이', subcategory: '곱창구이 전문점', rating: 4.4, reviewCount: 280, priceRange: '¥4,000~8,000', tags: ['야키니쿠', '곱창', '이자카이'] },
  { id: 'little-nap-coffee', name: '리틀 냅 커피 스탠드', area: '기타', category: '카페', subcategory: '커피 노점', rating: 4.5, reviewCount: 1131, priceRange: '¥1~1,000', tags: ['커피', '테이크아웃', '요요기'] },
  { id: 'tsujihan-nihonbashi', name: '츠지한 니혼바시 본점', area: '긴자·츠키지·하치초보리', category: '음식점', subcategory: '해산물 돈부리', rating: 4.4, reviewCount: 5210, priceRange: '¥2,000~3,000', tags: ['카이센동', '해산물', '니혼바시'] },
  { id: 'artizon-museum', name: '아티존 미술관', area: '긴자·츠키지·하치초보리', category: '미술관/박물관', subcategory: '미술관', rating: 4.5, reviewCount: 3200, tags: ['미술관', '니혼바시', '구경'] },
];

export const areaConfig: Record<Area, { label: string; color: string; emoji: string }> = {
  '신주쿠':                   { label: '신주쿠',              color: '#185FA5', emoji: '🏙' },
  '시부야':                   { label: '시부야',              color: '#993556', emoji: '🛍' },
  '하라주쿠·오모테산도':      { label: '하라주쿠·오모테산도', color: '#3B6D11', emoji: '🌸' },
  '기치조지·시모키타자와':    { label: '기치조지·시모키타자와', color: '#854F0B', emoji: '🎨' },
  '아사쿠사·우에노':          { label: '아사쿠사·우에노',      color: '#0F6E56', emoji: '🏯' },
  '이케부쿠로':               { label: '이케부쿠로',           color: '#534AB7', emoji: '🏢' },
  '긴자·츠키지·하치초보리':   { label: '긴자·츠키지',         color: '#993C1D', emoji: '🐟' },
  '미나토·롯폰기·미드타운':   { label: '미나토·롯폰기',        color: '#5F5E5A', emoji: '🎭' },
  '신바시·시오도메':          { label: '신바시·시오도메',      color: '#185FA5', emoji: '🚉' },
  '오카치마치':               { label: '오카치마치',           color: '#3B6D11', emoji: '🛒' },
  '가마쿠라·쇼난':            { label: '가마쿠라·쇼난',        color: '#854F0B', emoji: '🏄' },
  '기타':                     { label: '기타',                 color: '#A32D2D', emoji: '📍' },
};

export const categoryEmoji: Record<Category, string> = {
  '카페': '☕',
  '음식점': '🍽',
  '이자카이': '🍶',
  '쇼핑': '🛍',
  '관광명소': '📸',
  '공원': '🌿',
  '사찰': '⛩',
  '미술관/박물관': '🎨',
  '벼룩시장': '🏷',
  '공항': '✈️',
};

export const areas = Object.keys(areaConfig) as Area[];
export const categories = [...new Set(places.map((p) => p.category))] as Category[];

export const placesByArea: Record<Area, Place[]> = places.reduce(
  (acc, place) => {
    if (!acc[place.area]) acc[place.area] = [];
    acc[place.area].push(place);
    return acc;
  },
  {} as Record<Area, Place[]>,
);
