const emojiMap = {
  // Emojis
  hello: "👋",
  how: "🤔",
  head_shaking_horizontally: "🙂↔️",
  head_shaking_vertically: "🙂↕️",
  melting: "🫠",
  holding_back_tears: "🥺",
  salute: "🫡",
  smirk: "😏",
  frustated: "😖",
  celebrate: "🥳",
  nerd: "🤓",
  surprised: "😱",
  satisfied: "😌",
  chill: "😌",
  chills: "😌",
  confused: "😵",
  searching: "🧐",
  finding: "🧐",
  thinking: "🤔",
  think: "🤔",
  lied: "😋",
  prank: "🤪",
  smirk_cat: "😼",
  blushed: "☺️",
  blush: "😳",
  angry: "😠",
  too_angry: "😡",
  sad_news: "😥😥",
  sad: "😔",
  depressed: "😓",
  sleepy: "😪",
  hungry: "🤤",
  feel_like_vomiting: "🤮",
  disgusting: "🤮",
  too_cold: "🥶",
  cautious: "😷",
  too_shy: "🫣",
  sick: "🤒",
  too_funny: "🤣",
  funny: "😂",
  laugh: "😄",
  smile: "😃",
  happy: "😄",
  laughing: "😆",
  smiley: "😁",
  playing_prank: "😝",
  too_hot: "🥵",
  sending_love: "😘",
  tired: "🥱",
  sleeping: "😴",
  cowboy: "🤠",
  recovering: "🤕",
  greedy: "🤑",
  smiling: "😊",
  captivating: "😍",
  grinning: "😀",
  slightly_smiling: "🙂",
  upside_down: "🙃",
  winking: "😉",
  kissing: "😗",
  kissing_with_smiling_eyes: "😙",
  kissing_with_closed_eyes: "😚",
  sticking_out_tongue: "😛",
  squinting_with_tongue: "😝",
  winking_with_tongue: "😜",
  face_with_raised_eyebrow: "🤨",
  smiling_with_sunglasses: "😎",
  disguised: "🥸",
  star_struck: "🤩",
  smirking: "😏",
  unamused: "😒",
  disappointed: "😞",
  pouting: "😔",
  slightly_frowning: "😕",
  frowning: "☹️",
  persevering: "😣",
  confounded: "😖",
  weary: "😫",
  weary_with_tears: "😩",
  pleading: "🥺",
  crying: "😢",
  loudly_crying: "😭",
  exploding: "🤯",
  fearful: "😨",
  in_fear: "😨",
  anxious_with_sweat: "😰",
  sad_but_relieved: "😥",
  hugging: "🤗",
  shush: "🤫",
  lying: "🤥",
  neutral: "😐",
  expressionless: "😑",
  grimacing: "😬",
  hushed: "😯",
  frowning_with_open_mouth: "😦",
  anguished: "😧",
  astonished: "😮",
  flushed: "😳",
  dizzy: "😵‍💫",
  zipper_mouth: "🤐",
  woozy: "🥴",
  nauseated: "🤢",
  vomiting: "🤮",
  sneezing: "🤧",
  hug: "🫂",
  shit: "💩",
  kiss: "💋",
  strong: "💪",
  strength: "🦾",
  baby: "👶",
  being_loved: "🥰",
  great: "👍",
  thumbsup: "👍",
  thumbsdown: "👎",
  bye: "👋🏽",
  thanks: "🙏",

  // Heart Emoji
  love: "❤️",
  heart: "❤️",
  red_heart: "❤️",
  orange_heart: "🧡",
  yellow_heart: "💛",
  green_heart: "💚",
  blue_heart: "💙",
  purple_heart: "💜",
  black_heart: "🖤",
  white_heart: "🤍",
  brown_heart: "🤎",
  broken_heart: "💔",
  heart_on_fire: "❤️‍🔥",
  mending_heart: "❤️‍🩹",
  healing: "❤️‍🩹",
  heavy_heart_exclamation: "❣️",
  two_hearts: "💕",
  revolving_hearts: "💞",
  couples: "💞",
  heart_with_arrow: "💓",
  growing_heart: "💗",
  heart_with_ribbon: "💝",

  // Symbols
  heart_decoration: "💟",
  peace_symbol: "☮️",
  latin_cross: "✝️",
  star_and_crescent: "☪️",
  om: "🕉️",
  star_of_david: "🔯",
  wheel_of_dharma: "☸️",
  menorah: "🕎",
  yin_yang: "☯️",
  orthodox_cross: "☦️",
  place_of_worship: "🛐",
  ophiuchus: "⛎",
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
  information: "ℹ️",
  atom_symbol: "⚛️",
  input_symbol_for_numbers: "🔢",
  radioactive: "☢️",
  biohazard: "☣️",
  vibration_mode: "📳",
  Japanese_reserved_for_use: "🈶",
  free_of_charge: "🈚",
  circled_ideograph_accept: "🈸",
  squared_cjk_unified_ideograph_70b1: "㊗️",
  squared_cjk_unified_ideograph_6e80: "㊙️",
  circled_ideograph_advantage: "🈷️",
  eight_pointed_black_star: "✴️",
  VS: "🆚",
  circled_ideograph_have: "💮",
  circled_ideograph_month: "🈐",
  squared_cjk_unified_ideograph_7533: "🈴",
  squared_cjk_unified_ideograph_55b6: "🈵",
  squared_cjk_unified_ideograph_6709: "🈹",
  uppercase_a: "🅰️",
  uppercase_b: "🅱️",
  ab_button: "🆎",
  cl_button: "🆑",
  o_button: "🅾️",
  help: "🆘",
  cross_mark: "❌",
  cross_mark_button: "❎",
  octagonal_sign: "⛔",
  red_circle: "📛",
  prohibited: "🚫",
  hundred_points: "💯",
  anger: "💢",
  hot_springs: "♨️",
  no_pedestrians: "🚷",
  no_bicycles: "🚳",
  non_potable_water: "🚱",
  under_eighteen: "🔞",
  no_mobile_phones: "📵",
  no_smoking: "🚭",
  heavy_exclamation_mark: "❗",
  exclamation_question_mark: "❕",
  double_exclamation_mark: "‼️",
  question_mark: "❓",
  white_question_mark: "❔",
  sunset_over_mountains: "🔅",
  sunrise_over_mountains: "🔆",
  warning: "⚠️",
  children_crossing: "🚸",
  trident: "🔱",
  fleur_de_lis: "⚜️",
  japanese_symbol_for_beginners: "🔰",
  medical_symbol: "⚕️",
  recycling_symbol_for_generic_materials: "♻️",
  white_heavy_check_mark: "✅",
  squared_cjk_unified_ideograph_5408: "🈯",
  chart_increasing_with_yen: "💹",
  sparkles: "❇️",
  part_alternation_mark: "〽️",
  asterisk: "✳️",
  diamond_shape_with_a_dot_inside: "💠",
  cyclone: "🌀",
  zzz: "💤",
  automated_teller_machine: "🏧",
  water_closet: "🚾",
  wheelchair: "♿",
  parking: "🅿️",
  custom_orthodox_cross: "🛗",
  squared_cjk_unified_ideograph_65b0: "🈳",
  squared_cjk_unified_ideograph_200d: "🈂️",
  squared_cjk_unified_ideograph_6307: "🈯",
  squared_cjk_unified_ideograph_7121: "🈚",
  squared_cjk_unified_ideograph_6708: "🈷️",
  squared_cjk_unified_ideograph_5272: "🈹",
  squared_cjk_unified_ideograph_7a7a: "🈳",
  male_sign: "🚹",
  female_sign: "🚺",
  baby_symbol: "🚼",
  restroom: "🚻",
  double_vertical_bar: "⏸️",
  black_square_for_stop: "⏹️",
  black_circle_for_record: "⏺️",
  eject_button: "⏏️",
  cinema: "🎦",
  signal_strength: "📶",
  japanese_here_button: "🈁",
  input_symbol_for_symbols: "🔣",
  input_symbol_for_letters: "🔤",
  input_symbol_for_latin_small_letters: "🔡",
  input_symbol_for_latin_capital_letters: "🔠",
  cool_button: "🆖",
  free: "🆓",
  NG_button: "🆖",
  top_arrow: "🆙",
  circulation_button: "🆒",
  circled_M: "Ⓜ️",
  new: "🆕",
  free_button: "🆓",
  zero: "0️⃣",
  one: "1️⃣",
  two: "2️⃣",
  three: "3️⃣",
  four: "4️⃣",
  five: "5️⃣",
  six: "6️⃣",
  seven: "7️⃣",
  eight: "8️⃣",
  nine: "9️⃣",
  ten: "🔟",
  keycap_number_sign: "#️⃣",
  keycap_asterisk: "*️⃣",
  play: "▶️",
  fast_forward: "⏩",
  next_track: "⏭️",
  play_or_pause: "⏯️",
  reverse: "◀️",
  fast_reverse: "⏪",
  fast_up: "⏫",
  down_arrow: "🔽",
  up_arrow: "🔼",
  northeast_arrow: "↗️",
  right_arrow: "➡️",
  shuffle_tracks: "🔀",
  repeat: "🔁",
  repeat_single: "🔂",
  circled_forward: "🔄",
  southeast_arrow: "↘️",
  southwest_arrow: "↙️",
  left_arrow: "⬅️",
  northwest_arrow: "↖️",
  up_down_arrow: "↕️",
  left_right_arrow: "↔️",
  left_arrow_curving_left: "↩️",
  right_arrow_curving_right: "↪️",
  right_arrow_curving_up: "⤴️",
  right_arrow_curving_down: "⤵️",
  clockwise_circle_arrows: "🔃",
  plus: "➕",
  minus: "➖",
  division: "➗",
  transgender_sign: "⚧️",
  multiplication: "✖️",
  brown_square: "🟰",
  infinity: "♾️",
  dollars: "💲",
  wavy_dash: "〰️",
  currency_exchange: "💱",
  copyright: "©️",
  registered: "®️",
  trademark: "™️",
  eye_in_speech_bubble: "👁️‍🗨️",
  end_arrow: "🔚",
  back_arrow: "🔙",
  on_arrow: "🔛",
  soon_arrow: "🔜",
  curly_loop: "➰",
  double_curly_loop: "➿",
  check_mark: "✔️",
  ballot_box_with_check: "☑️",
  radio_button: "🔘",
  orange_circle: "🟠",
  yellow_circle: "🟡",
  green_circle: "🟢",
  blue_circle: "🔵",
  purple_circle: "🟣",
  black_circle: "⚫",
  white_circle: "⚪",
  brown_circle: "🟤",
  red_triangle_pointed_up: "🔺",
  red_triangle_pointed_down: "🔻",
  small_orange_diamond: "🔸",
  small_blue_diamond: "🔹",
  black_small_square: "▪️",
  white_small_square: "▫️",
  large_orange_diamond: "🔶",
  large_blue_diamond: "🔷",
  white_square: "◻️",
  black_square: "◼️",
  small_white_square: "◽",
  small_black_square: "◾",
  red_square: "🟥",
  orange_square: "🟧",
  yellow_square: "🟨",
  green_square: "🟩",
  blue_square: "🟦",
  purple_square: "🟪",
  black_large_square: "⬛",
  white_large_square: "⬜",
  speech_balloon: "💬",
  thought_balloon: "💭",
  left_speech_bubble: "🗨️",
  right_anger_bubble: "🗯️",
  spade_suit: "♠️",
  club_suit: "♣️",
  heart_suit: "♥️",
  diamond_suit: "♦️",
  playing_card: "🃏",
  flower_playing_cards: "🎴",
  mahjong_red_dragon: "🀄",

  // Time
  one_o_clock: "🕐",
  two_o_clock: "🕑",
  three_o_clock: "🕒",
  four_o_clock: "🕓",
  five_o_clock: "🕔",
  six_o_clock: "🕕",
  seven_o_clock: "🕖",
  eight_o_clock: "🕗",
  nine_o_clock: "🕘",
  ten_o_clock: "🕙",
  eleven_o_clock: "🕚",
  twelve_o_clock: "🕛",
  one_thirty: "🕜",
  two_thirty: "🕝",
  three_thirty: "🕞",
  four_thirty: "🕟",
  five_thirty: "🕠",
  six_thirty: "🕡",
  seven_thirty: "🕢",
  eight_thirty: "🕣",
  nine_thirty: "🕤",
  ten_thirty: "🕥",
  eleven_thirty: "🕦",
  twelve_thirty: "🕧",
  clock: "⏰",
  watch: "⌚",
  mantelpiece: "🕰️",
  wallclock: "🕰️",
  hourglass: "⌛",
  alarmclock: "⏰",
  stopwatch: "⏱️",
  timer: "⏲️",
  calendar: "📅",
  spiralcalendar: "🗓️",

  // Flags
  checkered_flag: "🏁",
  triangular_flag: "🚩",
  crossed_flags: "🎌",
  black_flag: "🏴",
  white_flag: "🏳️",
  lgbtq: "🏳️‍🌈",
  transgender: "🏳️‍⚧️",
  pirate_flag: "🏴‍☠️",

  // Countries
  ascension_island: "🇦🇨",
  andorra: "🇦🇩",
  united_arab_emirates: "🇦🇪",
  afghanistan: "🇦🇫",
  antigua_barbuda: "🇦🇬",
  anguilla: "🇦🇮",
  albania: "🇦🇱",
  armenia: "🇦🇲",
  angola: "🇦🇴",
  antarctica: "🇦🇶",
  argentina: "🇦🇷",
  american_samoa: "🇦🇸",
  austria: "🇦🇹",
  australia: "🇦🇺",
  aruba: "🇦🇼",
  aland_islands: "🇦🇽",
  azerbaijan: "🇦🇿",
  bosnia_herzegovina: "🇧🇦",
  barbados: "🇧🇧",
  bangladesh: "🇧🇩",
  belgium: "🇧🇪",
  burkina_faso: "🇧🇫",
  bulgaria: "🇧🇬",
  bahrain: "🇧🇭",
  burundi: "🇧🇮",
  benin: "🇧🇯",
  saint_barthelemy: "🇧🇱",
  bermuda: "🇧🇲",
  brunei: "🇧🇳",
  bolivia: "🇧🇴",
  caribbean_netherlands: "🇧🇶",
  brazil: "🇧🇷",
  bahamas: "🇧🇸",
  bhutan: "🇧🇹",
  bouvet_island: "🇧🇻",
  botswana: "🇧🇼",
  belarus: "🇧🇾",
  belize: "🇧🇿",
  canada: "🇨🇦",
  cocos_islands: "🇨🇨",
  congo_kinshasa: "🇨🇩",
  central_african_republic: "🇨🇫",
  congo_brazzaville: "🇨🇬",
  switzerland: "🇨🇭",
  cote_divoire: "🇨🇮",
  cook_islands: "🇨🇰",
  chile: "🇨🇱",
  cameroon: "🇨🇲",
  china: "🇨🇳",
  colombia: "🇨🇴",
  clipperton_island: "🇨🇵",
  costa_rica: "🇨🇷",
  cuba: "🇨🇺",
  cape_verde: "🇨🇻",
  curacao: "🇨🇼",
  christmas_island: "🇨🇽",
  cyprus: "🇨🇾",
  czechia: "🇨🇿",
  germany: "🇩🇪",
  diego_garcia: "🇩🇬",
  djibouti: "🇩🇯",
  denmark: "🇩🇰",
  dominica: "🇩🇲",
  dominican_republic: "🇩🇴",
  algeria: "🇩🇿",
  ceuta_melilla: "🇪🇦",
  ecuador: "🇪🇨",
  estonia: "🇪🇪",
  egypt: "🇪🇬",
  western_sahara: "🇪🇭",
  eritrea: "🇪🇷",
  spain: "🇪🇸",
  ethiopia: "🇪🇹",
  european_union: "🇪🇺",
  finland: "🇫🇮",
  fiji: "🇫🇯",
  falkland_islands: "🇫🇰",
  micronesia: "🇫🇲",
  faroe_islands: "🇫🇴",
  france: "🇫🇷",
  gabon: "🇬🇦",
  united_kingdom: "🇬🇧",
  grenada: "🇬🇩",
  georgia: "🇬🇪",
  french_guiana: "🇬🇫",
  guernsey: "🇬🇬",
  ghana: "🇬🇭",
  gibraltar: "🇬🇮",
  greenland: "🇬🇱",
  gambia: "🇬🇲",
  guinea: "🇬🇳",
  guadeloupe: "🇬🇵",
  equatorial_guinea: "🇬🇶",
  greece: "🇬🇷",
   south_georgia_south_sandwich_islands: "🇬🇸",
  guatemala: "🇬🇹",
  guam: "🇬🇺",
  guinea_bissau: "🇬🇼",
  guyana: "🇬🇾",
  hong_kong_sar_china: "🇭🇰",
  heard_mcdonald_islands: "🇭🇲",
  honduras: "🇭🇳",
  croatia: "🇭🇷",
  haiti: "🇭🇹",
  hungary: "🇭🇺",
  indonesia: "🇮🇨",
  ireland: "🇮🇪",
  israel: "🇮🇱",
  isle_of_man: "🇮🇲",
  india: "🇮🇳",
  british_indian_ocean_territory: "🇮🇴",
  iraq: "🇮🇶",
  iran: "🇮🇷",
  iceland: "🇮🇸",
  italy: "🇮🇹",
  jersey: "🇯🇪",
  jamaica: "🇯🇲",
  jordan: "🇯🇴",
  japan: "🇯🇵",
  kenya: "🇰🇪",
  kyrgyzstan: "🇰🇬",
  cambodia: "🇰🇭",
  kiribati: "🇰🇮",
  comoros: "🇰🇲",
  saint_kitts_nevis: "🇰🇳",
  north_korea: "🇰🇵",
  south_korea: "🇰🇷",
  kuwait: "🇰🇼",
  cayman_islands: "🇰🇾",
  kazakhstan: "🇰🇿",
  laos: "🇱🇦",
  lebanon: "🇱🇧",
  saint_lucia: "🇱🇨",
  liechtenstein: "🇱🇮",
  sri_lanka: "🇱🇰",
  liberia: "🇱🇷",
  lesotho: "🇱🇸",
  lithuania: "🇱🇹",
  luxembourg: "🇱🇺",
  latvia: "🇱🇻",
  libya: "🇱🇾",
  morocco: "🇲🇦",
  monaco: "🇲🇨",
  moldova: "🇲🇩",
  montenegro: "🇲🇪",
  saint_martin: "🇲🇫",
  madagascar: "🇲🇬",
  marshall_islands: "🇲🇭",
  macedonia: "🇲🇰",
  mali: "🇲🇱",
  myanmar: "🇲🇲",
  mongolia: "🇲🇳",
  macao_sar_china: "🇲🇴",
  northern_mariana_islands: "🇲🇵",
  martinique: "🇲🇶",
  mauritania: "🇲🇷",
  montserrat: "🇲🇸",
  malta: "🇲🇹",
  mauritius: "🇲🇺",
  maldives: "🇲🇻",
  malawi: "🇲🇼",
  mexico: "🇲🇽",
  malaysia: "🇲🇾",
  mozambique: "🇲🇿",
  namibia: "🇳🇦",
  new_caledonia: "🇳🇨",
  niger: "🇳🇪",
  norfolk_island: "🇳🇫",
  nigeria: "🇳🇬",
  nicaragua: "🇳🇮",
  netherlands: "🇳🇱",
  norway: "🇳🇴",
  nepal: "🇳🇵",
  nauru: "🇳🇷",
  niue: "🇳🇺",
  new_zealand: "🇳🇿",
  oman: "🇴🇲",
  panama: "🇵🇦",
  peru: "🇵🇪",
  french_polynesia: "🇵🇫",
  papua_new_guinea: "🇵🇬",
  philippines: "🇵🇭",
  pakistan: "🇵🇰",
  poland: "🇵🇱",
  pitcairn_islands: "🇵🇳",
  puerto_rico: "🇵🇷",
  palestinian_territories: "🇵🇸",
  portugal: "🇵🇹",
  palau: "🇵🇼",
  paraguay: "🇵🇾",
  qatar: "🇶🇦",
  reunion: "🇷🇪",
  romania: "🇷🇴",
  serbia: "🇷🇸",
  russia: "🇷🇺",
  rwanda: "🇷🇼",
  saudi_arabia: "🇸🇦",
  solomon_islands: "🇸🇧",
  seychelles: "🇸🇨",
  sudan: "🇸🇩",
  sweden: "🇸🇪",
  singapore: "🇸🇬",
  saint_helena: "🇸🇭",
  slovenia: "🇸🇮",
  svalbard_jan_mayen: "🇸🇯",
  slovakia: "🇸🇰",
  sierra_leone: "🇸🇱",
  san_marino: "🇸🇲",
  senegal: "🇸🇳",
  somalia: "🇸🇴",
  suriname: "🇸🇷",
  south_sudan: "🇸🇸",
  sao_tome_principe: "🇸🇹",
  el_salvador: "🇸🇻",
  sint_maarten: "🇸🇽",
  syria: "🇸🇾",
  eswatini: "🇸🇿",
  tristan_da_cunha: "🇹🇦",
  turks_caicos_islands: "🇹🇨",
  chad: "🇹🇩",
  french_southern_territories: "🇹🇫",
  togo: "🇹🇬",
  thailand: "🇹🇭",
  tajikistan: "🇹🇯",
  tokelau: "🇹🇰",
  timor_leste: "🇹🇱",
  turkmenistan: "🇹🇲",
  tunisia: "🇹🇳",
  tonga: "🇹🇴",
  turkey: "🇹🇷",
  trinidad_tobago: "🇹🇹",
  tuvalu: "🇹🇻",
  taiwan: "🇹🇼",
  tanzania: "🇹🇿",
  ukraine: "🇺🇦",
  uganda: "🇺🇬",
  us_outlying_islands: "🇺🇲",
  united_states: "🇺🇸",
  uruguay: "🇺🇾",
  uzbekistan: "🇺🇿",
  vatican_city: "🇻🇦",
  st_vincent_grenadines: "🇻🇨",
  venezuela: "🇻🇪",
  british_virgin_islands: "🇻🇬",
  us_virgin_islands: "🇻🇮",
  vietnam: "🇻🇳",
  vanuatu: "🇻🇺",
  wallis_futuna: "🇼🇫",
  samoa: "🇼🇸",
  kosovo: "🇽🇰",
  yemen: "🇾🇪",
  mayotte: "🇾🇹",
  south_africa: "🇿🇦",
  zambia: "🇿🇲",
  zimbabwe: "🇿🇼",

  // Sports
  ticket: "🎫",
  military_medal: "🎖️",
  reminder_ribbon: "🎗️",
  trophy: "🏆",
  medal: "🏅",
  first_place: "🥇",
  second_place: "🥈",
  third_place: "🥉",
  soccer_ball: "⚽",
  volleyball: "🏐",
  ping_pong: "🏓",
  badminton: "🏸",
  ice_hockey: "🏒",
  field_hockey: "🏑",
  bowling: "🎳",
  basketball: "🏀",
  football: "⚽",
  baseball: "⚾",
  golf: "⛳",
  tennis: "🎾",
  fencer: "🤺",
  skater: "⛸️",
  ice_hockey_player: "🏒",
  running_shirt_with_sash: "🎽",
  rugby_football: "🏉",
  fishing: "🎣",
  swim: "🏊",
  run: "🏃",
  walk: "🚶",
  bike: "🚴",
  train: "🚂",
  bus: "🚌",
  ship: "🚢",
  mountainbike: "🚵",
  ski: "⛷️",
  flying_disc: "🥏",
  diving_mask: "🤿",
  martial_arts_uniform: "🥋",
  running_shoe: "👟",

  // Places
  globe_with_meridians: "🌐",
  world_map: "🗺️",
  compass: "🧭",
  mountain: "⛰️",
  island: "🏝️",
  volcano: "🌋",
  desert: "🏜️",
  city: "🏙️",
  palace: "🏰",
  stadium: "🏟️",
  classical_building: "🏛️",
  building_construction: "🏗️",
  house: "🏠",
  office: "🏢",
  hospital: "🏥",
  school: "🏫",
  bank: "🏦",
  postoffice: "🏣",
  store: "🏬",
  factory: "🏭",
  hotel: "🏨",
  church: "⛪",
  mosque: "🕌",
  synagogue: "🕍",
  castle: "🏰",
  temple: "🛕",
  fountain: "⛲",
  bridge: "🌉",
  statue: "🗽",
  tent: "⛺",
  beach: "🏖️",
  park: "🏞️",
  circus_tent: "🎪",
  carousel_horse: "🎠",
  ferris_wheel: "🎡",
  roller_coaster: "🎢",
  
  // People
  male_teacher: "👨‍🏫",
  female_teacher: "👩‍🏫",
  scientist: "👩‍🔬",
  engineer: "👨‍🔧",
  artist: "👩‍🎨",
  chef: "👨‍🍳",
  farmer: "👨‍🌾",
  judge: "👩‍⚖️",
  pilot: "👩‍✈️",
  firefighter: "👩‍🚒",
  doctor: "👨‍⚕️",
  nurse: "👩‍⚕️",
  police_officer: "👮‍♂️",
  detective: "🕵️‍♂️",
  guard: "💂‍♂️",
  construction_worker: "👷‍♂️",
  prince: "🤴",
  princess: "👸",
  elf: "🧝‍♂️",
  genie: "🧞‍♂️",
  mermaid: "🧜‍♀️",
  fairy: "🧚‍♀️",
  vampire: "🧛‍♀️",
  angel: "👼",
  robot: "🤖",
  alien_monster: "👾",
  zombie: "🧟‍♂️",
  superhero: "🦸‍♂️",
  supervillain: "🦹‍♂️",
  magician: "🎩",
  magic_wand: "🪄",
  skier: "⛷️",
  snowboarder: "🏂",
  surfer: "🏄‍♀️",
  swimmer: "🏊‍♂️",
  lifeguard: "🏊‍♀️",
  weight_lifter: "🏋️‍♂️",
  yoga: "🧘‍♂️",
  cyclist: "🚴‍♂️",
  runner: "🏃‍♀️",
  climber: "🧗‍♂️",
  skateboarder: "🛹",
  golfer: "🏌️‍♂️",
  horse_racing: "🏇",
  mountain_bicyclist: "🚵‍♂️",
  water_polo: "🤽‍♀️",
  handball: "🤾‍♂️",
  vacation: "⛱️",
  
  // Weather
  rainy: "🌧️",
  sunny: "☀️",
  cloudy: "☁️",
  snowy: "❄️",
  thunderstorm: "🌩️",
  foggy: "🌫️",
  windy: "🌬️",
  cold: "❄️",
  hot: "🔥",

  // Plants and Trees
  palm_tree: "🌴",
  cactus: "🌵",
  tree: "🌳",
  flower: "💐",
  grass: "🌿",
  deciduous_tree: "🌳",
  maple_leaf: "🍁",
  seedling: "🌱",
  herb: "🌿",

  // Animals
  cat: "🐱",
  dog: "🐶",
  lion: "🦁",
  tiger: "🐯",
  horse: "🐴",
  dolphin: "🐬",
  elephant: "🐘",
  monkey: "🐵",
  zebra: "🦓",
  gorilla: "🦍",
  raccoon: "🦝",
  fox: "🦊",
  wolf: "🐺",
  giraffe: "🦒",
  cow: "🐮",
  moose: "🫎",
  panda: "🐼",
  rabbit: "🐰",
  frog: "🐸",
  mice: "🐭",
  hamster: "🐹",
  boar: "🐗",
  bear: "🐻",
  polar_bear: "🐻‍❄️",
  pig: "🐷",
  octopus: "🐙",
  koala: "🐨",
  sloth: "🦥",
  bison: "🦬",
  ox: "🐂",
  lobster: "🦞",
  rhinocerous: "🦏",
  hippopotamus: "🦛",
  leopard: "🐆",
  deer: "🦌",
  orangutan: "🦧",
  dragon: "🐲",
  shrimp: "🍤",
  donkey: "🫏",
  unicorn: "🦄",
  crab: "🦀",
  squid: "🦑",
  oyster: "🦪",
  clam: "🐚",
  llama: "🦙",
  chipmunk: "🐿️",
  beaver: "🦫",
  lizard: "🦎",
  crocodile: "🐊",
  mammoth: "🦣",
  badger: "🦡",
  skunk: "🦨",
  kangaroo: "🦘",
  goat: "🐐",
  fish: "🐟",
  whale: "🐋",
  otter: "🦦",
  seal: "🦭",
  tortoise: "🐢",
  turtle: "🐢",
  snake: "🐍",
  hedgehog: "🦔",
  shark: "🦈",
  sauropod: "🦕",
  t_rex: "🦖",
  tropical_fish: "🐠",
  blowfish: "🐡",
  jellyfish: "🪼",
  coral: "🪸",
  spiral_shell: "🐚",

  // Birds
  duck: "🦆",
  rooster: "🐓",
  peacock: "🦚",
  phoenix: "🐦‍🔥",
  flamingo: "🦩",
  dove: "🕊️",
  goose: "🪿",
  crow: "🐦‍⬛",
  parrot: "🦜",
  swan: "🦢",
  turkey_bird: "🦃",
  eagle: "🦅",
  penguin: "🐧",
  bat: "🦇",
  hen: "🐔",
  chicken: "🐔",
  owl: "🦉",
  baby_chick: "🐤",
  dodo: "🦤",
  bird: "🐦",

  // Insects
  butterfly: "🦋",
  snail: "🐌",
  bug: "🐛",
  caterpillar: "🐛",
  cricket: "🦗",
  cockroach: "🪳",
  honeybee: "🐝",
  earthworm: "🪱",
  housefly: "🪰",
  mosquito: "🦟",
  beetle: "🪲",
  lady_beetle: "🐞",
  ant: "🐜",
  spider: "🕷️",
  scorpion: "🦂",
  microbe: "🦠",

  // Flowers
  tulip: "🌷",
  hyacinth: "🪻",
  wilted_flower: "🥀",
  rosette: "🏵️",
  rose: "🌹",
  hibiscus: "🌺",
  sunflower: "🌻",
  blossom: "🌼",
  cherry_blossom: "🌸",
  bouquet: "💐",
  daisy: "🌼",

  // Fruits
  apple: "🍎",
  banana: "🍌",
  corn: "🌽",
  green_apple: "🍏",
  lime: "🍋‍🟩",
  strawberry: "🍓",
  tangerine: "🍊",
  watermelon: "🍉",
  pineapple: "🍍",
  lemon: "🍋",
  mango: "🥭",
  pear: "🍐",
  orange: "🍊",
  kiwi: "🥝",
  coconut: "🥥",
  avocado: "🥑",
  eggplant: "🍆",
  grapes: "🍇",
  cherries: "🍒",
  peach: "🍑",
  melon: "🍈",
  pomegranate: "🍑",
  blueberries: "🫐",

  // Vegetables and nuts
  salad: "🥗",
  hot_pepper: "🌶️",
  bell_pepper: "🫑",
  carrot: "🥕",
  cucumber: "🥒",
  broccoli: "🥦",
  potato: "🥔",
  pea_pod: "🫛",
  leafy_green: "🥬",
  garlic: "🧄",
  onion: "🧅",
  ginger: "🫚",
  tomato: "🍅",
  olive: "🫒",
  brinjal: "🍆",
  beans: "🫘",
  capsicum: "🫑",
  chestnut: "🌰",
  mushroom: "🍄",
  brown_mushroom: "🍄‍🟫",
  peanuts: "🥜",
  pumpkin: "🎃",
  sweet_potato: "🥔",

  // Foods
  honey_pot: "🍯",
  cheese: "🧀",
  hamburger: "🍔",
  fries: "🍟",
  hotdog: "🌭️",
  sandwich: "🥪",
  taco: "🌮",
  burrito: "🌯",
  spaghetti: "🍝",
  fortune_cookie: "🥠",
  fried_shrimp: "🍤",
  sushi: "🍣",
  bento: "🍱",
  canned_food: "🥫",
  curry: "🍛",
  stew: "🍲",
  soup: "🍲",
  rice: "🍚",
  rice_cracker: "🍘",
  rice_ball: "🍙",
  cooked_rice: "🍚",
  curry_rice: "🍛",
  steaming_bowl: "🍜",
  roasted_sweet_potato: "🍠",
  oden: "🍢",
  dango: "🍡",
  shaved_ice: "🍧",
  ramen: "🍜",
  dumpling: "🥟",
  donut: "🍩",
  chocolate: "🍫",
  baby_bottle: "🍼",
  lollipop: "🍭",
  popcorn: "🍿",
  noodles: "🍜",
  icecream: "🍦",
  bread: "🍞",
  pancake: "🥞",
  cupcake: "🧁",
  pie: "🥧",
  butter: "🧈",
  baguette_bread: "🥖",
  croissant: "🥐",
  pretzel: "🥨",
  cheese_wedge: "🧀",
  meat_on_bone: "🍖",
  poultry_leg: "🍗",
  bacon: "🥓",
  egg: "🍳",

  // Drinks
  tea: "🍵",
  teacup: "🍵",
  hot_beverage: "☕",
  teapot: "🫖",
  coffee: "🍵",
  tumbler: "🥃",
  milk: "🥛",
  glass_of_milk: "🥛",
  feeding_bottle: "🍼",
  beverage_box: "🧃",
  pouring: "🫗",
  smoothie: "🥤",
  bubble_tea: "🧋",
  beer: "🍺",
  wine: "🍷",
  cocktail: "🍹",
  juice: "🥤",
  sake: "🍶",
  wine_glass: "🍷",
  tropical_drink: "🍹",
  beers: "🍻",
  clinking_glasses: "🥂",
  tumbler_glass: "🥃",
  cup_with_straw: "🥤",
  bottle_with_popping_cork: "🍾",
  
  // Birthday
  birthday: "🎂",
  happy_birthday: "🥳",
  gift: "🎁",
  tada: "🎉",
  party_popper: "🎉",
  sparkler: "🎇",
  balloon: "🎈",
  fireworks: "🎆",
  confetti: "🎊",
  movie: "🎬",
  camera: "📷",
  letter: "💌",
  email: "✉️",

  // Office & Stationery
  pushpin: "📌",
  round_pushpin: "📍",
  paperclip: "📎",
  linked_paperclips: "🖇️",
  straight_ruler: "📏",
  triangular_ruler: "📐",
  scissors: "✂️",
  stapler: "📎📏",
  staples: "🔩",
  paper_shredder: "🗑️🖇️",
  hole_puncher: "🛠️📄",
  tape: "🧻",
  rubber_stamp: "📬",
  desk_lamp: "💡📖",
  envelope: "✉️",
  incoming_envelope: "📨",
  package: "📦",
  bookmark: "🔖",
  trash_can: "🗑️",
  mailboxclosed: "📪",
  mailboxwithmail: "📬",
  mailboxwithno_mail: "📭",
  wastebasket: "🗑️",
  electric_plug: "🔌",
  file_cabinet: "🗄️",
  ribbon: "🎀",
  key: "🔑",
  lock: "🔒",
  unlock: "🔓",
  bell: "🔔",
  candle: "🕯️",
  izakaya_lantern: "🏮",
  diya_lamp: "🪔",
  lightbulb: "💡",
  flashlight: "🔦",
  game: "🎮",
  art: "🎨",
  mobilephoneoff: "📴",
  vibrationmode: "📳",
  film: "🎞️",
  clapperboard: "🎬",
  projector: "📽️",
  click: "📸",
  glue: "🧤",
  pencil: "✏️",
  crayon: "🖍️",
  paintbrush: "🖌️",
  pen: "🖊️",
  fountain_pen: "🖋️",
  ballpoint_pen: "🖊️",
  highlighter: "🖍️✨",
  mechanical_pencil: "✏️🛠️",
  whiteboard_marker: "🖍️🟩",
  notebook_with_pen: "📒🖊️",
  // Meeting & Collaboration
  whiteboard: "📋🖍️",
  conference_call: "📱🎥",
  presentation: "📊",
  bar_chart: "📊📉",
  clipboard_with_list: "📋📝",
  post_it_notes: "🗒️📌",
  paper_envelope: "✉️📑",
  project_file: "📁✨",

  // Electronics
  desktop: "🖥️",
  laptop: "💻",
  tablet: "📱💾",
  smartphone: "📱",
  charger: "🔌📱",
  pager: "📟",
  faxmachine: "📠",
  usb: "🔌🖥️",
  hard_drive: "💽",
  memory_card: "💾",
  cellphone: "📱",
  telephone: "☎️",
  battery: "🔋",
  keyboard: "⌨️",
  printer: "🖨️",
  mouse: "🖱️",
  trackball: "🖲️",
  computerdisk: "💽",
  floppydisk: "💾",
  opticaldisk: "💿",
  cd: "💿",
  dvd: "📀",
  video_camera: "📹",
  videocassette: "📼",
  television: "📺",
  radio: "📻",
  studio_microphone: "🎙️",
  level_slider: "🎚️",
  control_knobs: "🎛️",
  drawing_board: "🖌️🖼️",

  // Space
  shooting_star: "🌠",
  night_with_stars: "🌃",
  sunrise: "🌅",
  sunset: "🌇",
  cloud: "☁️",
  sun: "☀️",
  moon: "🌕",
  full_moon: "🌕",
  waning_gibbous_moon: "🌖",
  last_quarter_moon: "🌗",
  waning_crescent_moon: "🌘",
  crescent_moon: "🌙",
  new_moon: "🌑",
  waxing_crescent_moon: "🌒",
  first_quarter_moon: "🌓",
  waxing_gibbous_moon: "🌔",
  star: "⭐",
  comet: "☄️",
  telescope: "🔭",
  microscope: "🔬",
  satellite: "🛰️",
  rocket: "🚀",
  satellite_antenna: "📡",
  alien: "👽",
  flying_saucer: "🛸",
  astronaut: "🧑‍🚀",
  earth_americas: "🌎",
  earth_asia: "🌏",
  earth_africa: "🌍",
  ringed_planet: "🪐",
  meteor: "☄️",
  space_suit: "👨‍🚀",
  flag_on_moon: "🏁",
  orbit: "🔄",
  black_hole: "⬛",
  nebula: "🌀",
  observatory: "🏠🔭",
  spaceship: "🛬🚀",
  constellation: "✨🔭",
  galaxy_swirl: "🌀🌌",
  lunar_rover: "🚗🔭",
  solar_panel: "🔋🌞",
  asteroid: "🌑🌕",
  eclipse: "🌞🌙",
  lunar_eclipse: "🌘🌞",
  solar_eclipse: "🌑☀️",
  space_shuttle: "🚀🛬",
  space_station: "🏢🛰️",
  aurora: "🌌✨",
  supernova: "💥🌟",
  pulsar: "✨🔄",
  quasar: "💫🔭",
  gravitational_wave: "〰️🔭",
  red_giant: "🔴⭐",
  white_dwarf: "⚪⭐",
  neutron_star: "🟣⭐",
  mission_patch: "🎖️🚀",
  control_center: "🏢📡",
  spacewalk: "🧑‍🚀✨",
  space_food: "🥤🍱",
  oxygen_tank: "🔵⛽",
  space_flag: "🚩🌕",
  communication_satellite: "🛰️📡",
  space_probe: "🛰️🛠️",
  launch_pad: "🛫🚀",
  orbit_symbol: "⭕🚀",
  planet_ring: "🔵🪐",
  star_cluster: "✨✨✨",
  alien_world: "🛸🌎",
  time_dilation: "⏳🔭",
  binary_star: "🌟🌟",
  exoplanet: "🪐✨",
  dwarf_planet: "🌑🔵",
  gas_giant: "🌕🌀",
  asteroid_belt: "🪐💫",
  interstellar_ship: "🚀✨",
  cryo_chamber: "❄️🛏️",
  space_beacon: "🔦🌌",
  terraforming_machine: "🔄🌍",
  space_colony: "🏙️🪐",
  deep_space_telescope: "🔭🌌",
  solar_sail: "🌞🛶",
  asteroid_mining_ship: "⛏️🚀",
  wormhole: "🌀✨",
  black_hole_horizon: "⬛🌀",
  time_warp: "⏳🔄",
  dark_energy: "⚫✨",
  antimatter: "⚛️⚡",
  cosmic_ray: "☄️✨",
  intergalactic_dust: "🌌🌫️",
  stellar_nursery: "✨🌕",
  gravity_assist: "🔄🚀",
  exobiology_lab: "🧪🌌",
  space_particle_detector: "🔬✨",
  star_chart: "📜🌟",
  cosmic_radiation: "☢️🌌",
  quantum_computer: "💻⚛️",
  alien_language: "🔤👽",
  galactic_trade_hub: "🛍️✨",
  space_cantina: "🍻🪐",
  alien_artifact: "📜👾",
  futuristic_weapon: "🔫✨",
  zero_gravity_sports: "⚽🌌",
  space_music: "🎵✨",
  celestial_dragon: "🐉🌌",
  space_phoenix: "🔥✨",
  nebula_wizard: "🧙‍♂️🌀",
  cosmic_knight: "⚔️✨",
  virtual_universe: "🌐🎮",
  simulation_control: "🖥️⚛️",
  digital_galaxy: "💾✨",
  cosmic_library: "📚🌌",
  galactic_map: "🗺️✨",
  parallel_universe: "🪞🌌",
  solar_flare: "☀️🔥",
  
  // Sound
  speaker: "🔊",
  loudspeaker: "📢",
  postalhorn: "📯",
  megaphone: "📣",
  mutedspeaker: "🔇",
  speakerlowvolume: "🔈",
  speakermediumvolume: "🔉",
  speakerhighvolume: "🔊",
  mute: "🔇",
  musicalnotes: "🎵",
  musicalscore: "🎼",
  microphone: "🎤",
  headphones: "🎧",
  record: "🎵",

  // Musical Instruments
  headphone: "🎧",
  saxophone: "🎷",
  trumpet: "🎺",
  violin: "🎻",
  drum: "🥁",
  guitar: "🎸",
  accordion: "🪗",
  postal_horn: "📯",
  maracas: "🪇",
  flute: "🪈",
  banjo: "🪕",
  long_drum: "🪘",
  musical_keyboard: "🎹",
  xylophone: "🎼",
  tambourine: "🪘",
  clapper: "🛎️",

  // Notebooks and Documents
  notebook: "📓",
  spiral_notebook: "🗒️",
  ledger: "📒",
  books: "📚",
  open_book: "📖",
  green_book: "📗",
  blue_book: "📘",
  orange_book: "📙",
  closed_book: "📕",
  red_book: "📕",
  white_paper: "📄",
  memo: "📝",
  sticky_note: "📝",
  newspaper: "📰",
  tornpaper: "📄",
  clipboard: "📋",
  scroll: "📜",
  document: "📄",
  folder: "📁",
  open_folder: "📂",
  card_index_dividers: "🗂️",
  cardfilebox: "🗃️",
  card_index: "📇",
  pagecurl: "📃",
  spiral_notepad: "🗒️",
  pagefacingup: "📄",
  newspapercurl: "📰",
  bookmarktabs: "📑",
  barchart: "📊",
  increasing: "📈",
  decreasing: "📉",
  bullish: "📈",
  bearish: "📉",
  graphtwoaxes: "📈",
  label: "🏷️",
  money_with_wings: "💸",
  gem_stone: "💎",
  wallet: "👛",
  money_bag: "💰",
  yenbanknote: "💴",
  dollasign: "💵",
  eurobanknote: "💶",
  poundbanknote: "💷",
  credit_card: "💳",
  coin: "🪙",
  crystal_ball: "🔮",
  receipt: "🧾",
  checkmark: "✔️",
  xmark: "❌",
  ballotboxwithcheck: "☑️",
  ballotboxwithx: "🗳️",

  // Tools
  screwdriver: "🪛",
  magnifying_glass: "🔍",
  pick: "⛏️",
  hammer: "🔨",
  axe: "🪓",
  broken_chain: "💥⛓️",
  dagger: "🗡️",
  knife: "🔪",
  kitchen_knife: "🔪",
  pistol: "🔫",
  water_pistol: "🔫",
  bowandarrow: "🏹",
  shield: "🛡️",
  carpentrysaw: "🪚",
  wrench: "🔧",
  nutandbolt: "🔩",
  gear: "⚙️",
  balance_scale: "⚖️",
  link: "🔗",
  chains: "⛓️",
  gun: "🔫",
  hammerandpick: "⚒️",
  tools: "🛠️",
  hammerandwrench: "🛠️",
  ammunition: "🧨",
  fireextinguisher: "🧯",
  toolbox: "🧰",
  whitecane: "🦯",
  
  // Bathroom
  bathroom: "🛀",
  toilet: "🚽",
  shower: "🚿",
  bathtub: "🛁",
  razor: "🪒",
  lotionbottle: "🧴",
  safetyrazor: "🪒",
  shampoo: "🧴",
  toothbrush: "🪥",
  toothpaste: "🦷",
  soap: "🧼",
  sponge: "🧽",
  toilet_paper: "🧻",
  laundry: "🧺",
  showerhead: "🚿",
  tap_water: "🚰",
  sanitizer: "🧴",
  bucket: "🪣",
  tissuebox: "📦",
};

export default emojiMap;