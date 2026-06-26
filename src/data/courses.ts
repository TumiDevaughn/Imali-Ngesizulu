/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course } from "../types";

const staticCoursesData: Course[] = [
  {
    id: "elite_onedrive_video_masterclass",
    title_en: "IMALI Elite Strategy 1: Market Masterclass & Live Execution Guide",
    title_zu: "I-IMALI Elite Strategy 1: Market Masterclass ne-Live Execution Guide",
    category_en: "Elite Algorithmic Trading",
    category_zu: "Ukuhweba Okuphezulu we-Algorithmic",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "24 Hours",
    duration_zu: "Amahora angu-24",
    description_en: "An exclusive masterclass featuring our premier technical video training. Gain institutional-level access to advanced execution blueprints, live-session order block strategies, and mathematical hedging models developed for serious retail traders.",
    description_zu: "I-masterclass ekhethekile efaka phakathi ukuqeqeshwa kwethu kwevidiyo yezobuchwepheshe ebalulekile. Thola ukufinyelela ezingeni lesikhungo ezinhlelweni zokusebenza ezithuthukile, amasu emiklomelo yezikhathi ezibukhoma, namamodeli okuvimbela ingozi (hedging) abhalelwe abahwebi abazimisele.",
    thumbnail: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_mod_1",
        title_en: "Module 1: Professional Video Mentorship & Live Execution Workspace",
        title_zu: "Isifundo 1: Ividiyo Yomhlahlandlela ne-Live Execution Workspace",
        lessons: [
          {
            id: "elite_onedrive_lesson_1",
            title_en: "Class 1: Master Class Video - Advanced Market Structure & High-Precision Order Flows",
            title_zu: "Isigaba 1: Ividiyo ye-Master Class - Advanced Market Structure ne-High-Precision Order Flows",
            duration: "45 Mins",
            videoUrl: "https://jumpshare.com/embed/Hu2WvNRnmJPY6OUaRH42",
            imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to this exclusive, premier video masterclass of IMALI NgesiZulu Academy. This video unveils high-precision algorithmic order delivery mechanics. You will learn to decode structural shifts, trade in alignment with interbank liquidity flows, identify high-volume order blocks, and mitigate common trading drawdowns. Watch the high-definition video directly below to digest every nuance of this elite strategy.",
            content_zu: "Siyakwamukela kule vando yevidiyo yodumo ekhethekile ye-IMALI NgesiZulu Academy. Le vidiyo iveza imithetho enembile yokulethwa kwentengo emakethe. Uzofunda ukuhlaziya isakhiwo semakethe (structure shifts), ukuhweba ngokuhambisana nengcebo yemali yamabhange (market liquidity flows), ukuthola ama-order blocks anomthamo omkhulu, kanye nokunciphisa ukulahlekelwa okungadingeki. Hororisa le vidiyo efakwe ngezansi ukuze ufunde wonke umthetho kuleli zinga eliphezulu.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Market_Structure_Video_Syllabus.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Market_Structure_Syllabus.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE MARKET STRUCTURE & ORDER FLOW CODES
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. LIQUIDITY PURGING IN HIGHER TIMEFRAMES
- Always identify the Daily, 4-Hour, and 1-Hour swing highs and lows.
- Banks hunt liquidity outside these extreme limits to fill their size orders.
- A true reversal begins only after a clear wick sweep occurs.

2. QUANTIFYING DRAWDOWN MANAGEMENT
- Limit your risk to exactly 1% per position entry.
- Settle your stop losses 2 pips beyond the candle wick sweep peak.
- Settle profit targets at the opposing structural liquidity pool.

3. HIGH-PRECISION MATRIX EXECUTION
- Maintain a minimum 1:3 risk-to-reward ratio.
- Move stop loss to break-even once price clears 1:1 risk-to-reward distance.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: ISAKHIWO SEMAKETHE NE-ORDER FLOW
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. UKUSHANELWA KWAMA-ORDERS (LIQUIDITY PURGING)
- Thola imingcele ye-Daily, 4-Hour, ne-1-Hour phezulu neziphansi.
- Amabhange emali adlala phesheya kwemingcele emikhulu ukuqoqa imali.
- Inqubo ishintsha kahle emva komugqa othi sweep (wick sweep).

2. UKUGADWA KWE-DRAWDOWN NEMALI
- Ungalokothi ubeke ingozi engaphezu kuka 1% we-balance kwi-trade ngayinye.
- Beka i-Stop Loss phesheya komisila kude no-2 pips we-peak.
- Thatha inzuzo yakho kwi-liquidity pool evulekileyo ngaphesheya.

3. AMASU ENCOMO NGEZIBALO (HIGH-PRECISION MATRIX)
- Gcina isilinganiso sensebenzo yesikhala: 1:3 risk-to-reward ratio.
- Hambisa i-stop loss iye kwi-entry (break-even) uma intengo ifinyelela u-1:1.`
              }
            ],
            quiz: {
              id: "elite_onedrive_quiz_1",
              title_en: "VVIP Elite Order Flow Evaluation",
              title_zu: "Ukuhlaziywa Kwe-Order Flow ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_q1",
                  question_en: "What is the primary key to low-drawdown entries outlined in the masterclass video?",
                  question_zu: "Yini imfungulo eyinhloko yokungena ngaphansi kwe-drawdown encane ekhonjiswe kule vidiyo?",
                  options_en: [
                    "Wait for a high-timeframe wick sweep of liquidity, and look for structure shifts next on lower timeframes",
                    "Enter market immediately at New York open with maximum lot sizing variables",
                    "Follow public telegram channel indicators without calculating risk-to-reward balance",
                    "Configure automated servers to trade index baskets on random intervals"
                  ],
                  options_zu: [
                    "Linda ukushanelwa kwama-orders (wick sweep) kwi-high timeframe, bese ulanda i-structure shift kwi-timeframe emizuzwini emihlanu",
                    "Faka i-trade ngqo emakethe ngesikhathi se-New York ovulekileyo usebenzisa lot sizing enkulu kabi",
                    "Landela ama-signals eziteshi ze-Telegram mahhala ngaphandle kokubala ingozi ne-reward",
                    "Setha amarobhothi wokuhweba izinkampani ezahlukene ngezikhathi ezingahlelekile"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_hedging_masterclass",
    title_en: "IMALI Elite Strategy 2: Institutional Hedging & USD Correlation Masterclass",
    title_zu: "I-IMALI Elite Strategy 2: Institutional Hedging ne-USD Correlation Masterclass",
    category_en: "Elite Portfolio Management",
    category_zu: "Ukugadwa Kwephothifoliyo Okuphezulu",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "30 Hours",
    duration_zu: "Amahora angu-30",
    description_en: "The second instalment of our premier video elite mentorship. Unlock the precision behind intermarket correlation analysis (DXY vs S&P500), high-probability institutional hedging architectures, and advanced risk matrix algorithms.",
    description_zu: "Incenye yesibili yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Vula ulwazi lokuhlaziya kokuhlangana kwezimakethe (DXY ne-S&P500), izinhlelo zokuvikela ingozi emabhange (hedging), kanye nemithetho ethuthukisiwe yama-risk algorithms.",
    thumbnail: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_hedging_mod_1",
        title_en: "Module 1: Advanced Hedging Architectures & Live USD Matrices",
        title_zu: "Isifundo 1: Izinhlelo Zika-Hedging Ezithuthukile ne-USD Correlation",
        lessons: [
          {
            id: "elite_onedrive_lesson_2",
            title_en: "Class 2: Master Class Video - Advanced Hedging Systems & USD Correlation Matrices",
            title_zu: "Isigaba 2: Ividiyo ye-Master Class - Advanced Hedging Systems ne-USD Correlation Matrices",
            duration: "52 Mins",
            videoUrl: "https://jumpshare.com/embed/lb7vjcQSMyRSuzAJhoAP",
            imageUrl: "https://images.unsplash.com/photo-1621504450181-5d38686cfdcd?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 2 of our IMALI Elite sequence. In this video, we dive deep into professional intermarket hedging systems and USD correlation matrices. Discover how the US Dollar Index (DXY) dictates global asset directions, how to structure multi-layered hedges during high-impact news releases, and how to execute risk-mitigated strategies under institutional guidance. Watch the high-definition video directly below to study these elite mechanisms.",
            content_zu: "Siyakwamukela esigabeni sesibili se IMALI Elite sequence yethu. Kule vidiyo, singena ngokushona kumasu we-hedging wezakhiwo eziphezulu zemali kanye ne-correlation matrices ezimakethe zomhlaba. Thola ukuthi i-US Dollar Index (DXY) iyala kanjani ukunyakaza kwempahla, uzofunda ukwakha ama-hedges ngesikhathi sezindaba ezinkulu zezimali (news releases), kanye nendlela yokuhweba ngaphansi kwemigomo we-hedging emabhange. Bukela le vidiyo efakwe ngezansi ukuze uthole ulwazi oluphelele.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Hedging_USD_Correlation.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Hedging_Correlation.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE USD CORRELATION & INSTITUTIONAL HEDGING
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. INTERMARKET USD DXY CORRELATION
- The US Dollar Index (DXY) is inversely correlated to EURUSD, GBPUSD, and Gold (XAUUSD).
- S&P500 and high-beta equities generally drift opposite to a spiking DXY.
- Confirm DXY structural shift BEFORE placing high-volume major currency pairs.

2. INSTITUTIONAL HEDGING ALGORITHMS
- True hedging relies on delta-neutral exposure instead of doubling down on bad trades.
- Corcommitant hedging leverages negative correlation: long EURUSD/short GBPUSD in specific spreads.
- Maintain a strict 0.5% risk spread allocation on correlated basket trades.

3. NEWS LIQUIDITY INJECTIONS
- High-impact events like NFP and FOMC produce artificial wick sweep expansions.
- Wait exactly 15 minutes after the release to identify the true institutional bias.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: UKUVILOMELA INDLELA YE-HEDGING ne-USD CORRELATION
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. INDLELA YOKUHLANGANISA YE_USD DXY (CORRELATION)
- I-US Dollar Index (DXY) inokuhlangana okuphambene ne-EURUSD, GBPUSD, negolide (XAUUSD).
- I-S&P500 namasheya amakhulu kunyakaza ngendlela ephambene uma i-DXY inyuka phezulu.
- Qinisekisa i-structural shift ku-DXY NGAPHAMBI kokuthi uvule ama-trades amakhulu.

2. AMASU EMALI WE-HEDGING (ALGORITHMS)
- I-Hedging yeqiniso isebenza nge-delta-neutral exposure hhayi ngokwandisa ama-trades alahlekelwayo.
- Sebenzisa i-negative correlation: long EURUSD/short GBPUSD ngezilinganiso ezithize.
- Gcina umthetho wengozi owu-0.5% kuphela kwi-correlated basket trade ngayinye.

3. UKUGELEZA KWEMALI NGESIKHATHI SEZINDABA (NEWS)
- Izindaba ezinkulu njenge-NFP ne-FOMC ziletha ukushanelwa okukhulu kokulingana (wick sweep).
- Linda amaminithi angu-15 ngemva kwesindaba ukuze ubone umzila ophelele wamabhange.`
              }
            ],
            quiz: {
              id: "elite_onedrive_hedging_quiz_1",
              title_en: "VVIP Elite Hedging & US Dollar Index Matrix",
              title_zu: "Ukihlolwa Kwe-Hedging ne-USD Index Context",
              questions: [
                {
                  id: "elite_onedrive_hedging_q1",
                  question_en: "If the US Dollar Index (DXY) clears institutional liquidity on high timeframes and reverses downwards, what expectation does this create for the EURUSD pair?",
                  question_zu: "Uma i-US Dollar Index (DXY) ishanela i-liquidity ephezulu bese yehla, yikuphi okulindelekile kwi-EURUSD pair?",
                  options_en: [
                    "EURUSD is highly likely to break out and reverse upwards due to strong inverse correlation",
                    "EURUSD will flash-crash immediately following the exact vector shift of USD",
                    "EURUSD will enter an indefinite zero-liquidity horizontal consolidation pattern",
                    "EURUSD is completely unaffected by changes in the US Dollar Index parameters"
                  ],
                  options_zu: [
                    "I-EURUSD kungenzeka kakhulu ukuthi inyuke iye phezulu ngenxa yokuhlangana okuphambene (inverse correlation)",
                    "I-EURUSD izowa masinyane ilandele impendulo efanayo ne-USD unomphela",
                    "I-EURUSD izongena ekuhlanganisweni okuphansi okungenawo umnyakazo ohlangothini zombili",
                    "I-EURUSD ayithinteki neze ngezinguquko ezitholakala kwi-US Dollar Index"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_orderflow_masterclass",
    title_en: "IMALI Elite Strategy 3: Institutional Order Flow & Footprint Blueprint",
    title_zu: "I-IMALI Elite Strategy 3: Institutional Order Flow ne-Footprint Blueprint",
    category_en: "Elite Technical Analysis",
    category_zu: "Ukuhlaziywa Kwezobuchwepheshe Okuphezulu",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "35 Hours",
    duration_zu: "Amahora angu-35",
    description_en: "The third instalment of our premier video elite mentorship. Master the art of reading Footprint Charts, Order Books (DOM), and tracking the real-time aggressive buying and selling pressure of global interbank algorithms.",
    description_zu: "Incenye yesithathu yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ukufinyelela ekuhlaziyeni amandla e-Footprint Charts, Order Books (DOM), kanye nezindlela zokulandelela amabhange nokuqondisa ama-orders ngqo.",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_orderflow_mod_1",
        title_en: "Module 1: Order Flow Footprints & Depth of Market Tracing",
        title_zu: "Isifundo 1: Ama-Footprint Charts kanye ne-Depth of Market Tracing",
        lessons: [
          {
            id: "elite_onedrive_lesson_3",
            title_en: "Class 3: Master Class Video - Order Flow Footprints & Volumetric Delta Delivery",
            title_zu: "Isigaba 3: Ividiyo ye-Master Class - Order Flow Footprints ne-Volumetric Delta Delivery",
            duration: "58 Mins",
            videoUrl: "https://jumpshare.com/embed/RZQS8utSJrktvVOcECdO",
            imageUrl: "https://images.unsplash.com/photo-1638274553228-69cdbe509449?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 3 of our IMALI Elite sequences. In this video instruction, we focus on Order Flow Footprints and Volumetric Delta Delivery mechanics. Master how to track aggressive market buyers and sellers, identify stacked imbalances within daily price nodes, and interpret cumulative delta signals to execute positions with microscopic drawdown. Watch the high-definition video directly below to digest every nuance of this elite strategy.",
            content_zu: "Siyakwamukela esigabeni sesithathu se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngokujulile ngokunyakaza kwe-Order Flow Footprints kanye nama-delta limits okulethwa kwentengo emakethe. Uzofunda ukulandelela abathengisi nabathengi abanolaka (aggressive orders), ukuthola i-imbalance emakethe, kanye nokuqinisekisa i-cumulative delta turns elawulwa amabhange amakhulu. Hororisa le vidiyo efakwe ngezansi ukuze ujule.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Order_Flow_Domination.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Order_Flow_Domination.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE ORDER FLOW footprint & VOLUME DELTA CODES
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. UNDERSTANDING VOLUMETRIC FOOTPRINT CHARTS
- Standard candlestick charts only show Open, High, Low, and Close prices of assets.
- Footprint charts show exact buyers and sellers inside every single price node.
- Imbalances occur when buy volume exceeds sell volume diagonally by 300% or more.

2. CUMULATIVE DELTA SHIFTS
- Delta represents the absolute difference between aggressive buying and selling volume.
- A rising cumulative delta with falling prices signals latent institutional absorption.
- Wait for a positive delta spike at key support points before entering long positions.

3. EXECUTING DIAGONAL BID/ASK IMBALANCES
- Stacked buying imbalances serve as strong support block levels during retraces.
- Position stop losses 1 tick beyond the final volume imbalance candle structure.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: ISAKHIWO SE-ORDER FLOW NE-VOLUME DELTA
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. UKUQONDA AMA-FOOTPRINT CHARTS (VOLUMETRIC)
- Amashadi avamile akhombisa kuphela intengo yenhloko evulekileyo neziphansi.
- Ama-footprint khombisa isilinganiso esinembile sabathengi nabathengisi endaweni ngayinye.
- I-imbalance yenzeka uma abathengi benga ngaphezu kwabathengisi ngoku-300% phezu komugqa odayonali.

2. CUMULATIVE DELTA SHIFTS
- I-Delta umele umehluko phakathi kwama-orders athenga nafaka inkuthalo namathengisayo.
- Ukunyuka kwe-delta ngenkathi intengo yehla kukhombisa ukumuncwa (absorption) kwama-orders wamabhange.
- Linda isibani se-positive delta phezulu kwe-support ngaphambi kokuthenga.

3. ENGINGENAYO KWI-DIAGONAL IMBALANCES
- Amaseli we-stacked buy imbalances asebenza njenge-support eqinile kwi-retrace.
- Beka i-Stop loss 1 tick phesheya kwendawo emaphakathi ne-volume imbalance block.`
              }
            ],
            quiz: {
              id: "elite_onedrive_orderflow_quiz_1",
              title_en: "VVIP Elite Order Flow Volumetrics Evaluation",
              title_zu: "Ukuhlaziywa Kwe-Order Flow Volumetrics ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_orderflow_q1",
                  question_en: "What does a diagonal ask-side footprint imbalance of 400% indicate at a major resistance structure?",
                  question_zu: "Yini ekhonjiswa yi-diagonal ask imbalance ewu-400% phezulu kwesakhiwo se-resistance?",
                  options_en: [
                    "High aggressive buying pressure breaking or testing the ceiling barrier",
                    "A massive collection of passive sell limits waiting to absorb normal prices",
                    "A direct network drop warning from global liquidity provider servers",
                    "A completely balanced market waiting for a high-impact interest rate announcement"
                  ],
                  options_zu: [
                    "Ukushaywa phezulu ngabathengi abanolaka abazama ukugqobhoza i-resistance block",
                    "Izinkulungwane zokulinda ezimileyo (limit orders) ezifuna ukumunca intengo ejwayelekile",
                    "Ukunqamuka kokuxhumana phakathi kwama-interbank liquidity servers amakhulu",
                    "Imakethe elingene kahle balindele ukukhishwa kwe-interest rate nezindaba zezimali"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_psychology_masterclass",
    title_en: "IMALI Elite Strategy 4: High-Performance Risk Mathematics & Trader Psychology Masterclass",
    title_zu: "I-IMALI Elite Strategy 4: High-Performance Risk Mathematics ne-Trader Psychology Masterclass",
    category_en: "Elite Risk & Psychology Management",
    category_zu: "Ukulawulwa Kwengozi Nomqondo Okuphezulu",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "40 Hours",
    duration_zu: "Amahora angu-40",
    description_en: "The fourth instalment of our premier video elite mentorship. Bridge the gap between system performance and execution mindset. Master fractional Kelly criterion stake calculators, maximum drawdown immunization formulas, and high-performance cognitive state management.",
    description_zu: "Incenye yesine yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Xhumanisa ukusebenza kohlelo nengqondo nomoya wokuhweba. Thola ulwazi lwe Kelly criterion calculators, amafomula okuvikela i-drawdown, kanye nokuphathwa komqondo ophakeme ngesikhathi sokuhweba.",
    thumbnail: "https://images.unsplash.com/photo-1621504450181-5d38686cfdcd?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_psychology_mod_1",
        title_en: "Module 1: Advanced Risk Engineering & Stress Immunization Frameworks",
        title_zu: "Isifundo 1: Izibalo Zengozi ne-Stress Immunization Frameworks",
        lessons: [
          {
            id: "elite_onedrive_lesson_4",
            title_en: "Class 4: Master Class Video - Advanced Risk Mathematics & Cognitive Psychology Codes",
            title_zu: "Isigaba 4: Ividiyo ye-Master Class - Advanced Risk Mathematics ne-Cognitive Psychology Codes",
            duration: "61 Mins",
            videoUrl: "https://jumpshare.com/embed/7Mkv5YNgNkVsxXWca4a6",
            imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 4 of our IMALI Elite sequences. This masterclass video is dedicated to advanced risk mathematics and high-performance execution psychology. Discover how to control drawdown with mathematical precision, implement Kelly Criterion positioning matrices, and eliminate cognitive biases during live-market stressors. Direct your attention to the full-length video below to absorb these professional-grade risk immunization frameworks.",
            content_zu: "Siyakwamukela esigabeni sesine se IMALI Elite sequence yethu. Kule vidiyo, sigxila kakhulu ezibalweni zengozi ezithuthukile kanye nengqondo ekahle yokuhweba (trading psychology). Shintsha indlela osebenzisa ngayo ilot sizing, thola ukuthi unganciphisa kanjani i-drawdown nge Kelly Criterion formulas, futhi uqede ukwesaba nemizwa emakethe. Bukela le vidiyo efakwe ngezansi ukuze uthole ulwazi oluphelele lokuqeqeshwa kwethu.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Risk_Mathematics_Psychology.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Risk_Mathematics_Psychology.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE RISK ENG & EXECUTION NEUROPSYCHOLOGY
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. MATHEMATICAL DRAWDOWN IMMUNIZATION
- The primary cause of trader ruin is consecutive series losses paired with linear staking.
- Employ fractional positioning sizes based on verified Win-Loss probabilities.
- Never exceed 1.5% maximum total risk across all active correlated trading baskets.

2. FRACTIONAL KELLY STAKING MATRIX
- Kelly sizing calculates the optimum trade size based on historical system edge.
- Formula: K% = W - [(1 - W) / R], where W = Win rate percentage, R = Risk-to-reward ratio.
- Use a conservative 'Half-Kelly' multiplier (0.5 * K%) to smooth capital equity growth.

3. COGNITIVE CALIBRATION DURING LIVE STRESSORS
- Market stress triggers primitive fight-or-flight centers in the amygdala, bypassing rationale.
- Prevent reactive trading by automating exact price entry and invalidation triggers.
- Take immediate 15-minute screen-breaks following consecutive high-volume target hits or losses.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: IZIBALO ZENGOZI NOMQONDO OKUPHEZULU
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. UKUZIVIKELA KWI-DRAWDOWN EMALINI (IMMUNIZATION)
- Isizathu esikhulu esenza abahwebi bafele emakethe ukulandelelana kokulahlekelwa ne-linear stakes.
- Sebenzisa ama-fractional sizes emali ahlaziywe ngamathuba we-Win-Loss (probabilities).
- Ungalokothi weqe u-1.5% wengozi isiyonke kuyo yonke imisebenzi efanayo evulekileyo.

2. KELLY CRITERION FORMULA (STAKING)
- Isibalo sika Kelly sithola ifomula elilungile le-lot size ngoklandela umlando wesistimu yakho.
- Ifomula: K% = W - [(1 - W) / R], lapho u-W = Inzuzo rate %, kanti u-R = Risk-to-reward ratio.
- Sebenzisa i-Half-Kelly multiplier (0.5 * K%) ukuze ukhulise imali yakho kahle ngaphandle kwemingcele.

3. UKULAWULWA KOMQONDO NEZIVIVINYO (PSYCHOLOGY)
- Ukwesaba kulethwa triggers kwengqondo phansi kwengcindezi (fight-or-flight), engasizi nakancane.
- Gwema lokhu ngokubeka phansi (automating) amazinga lapho ufaka khona ama-trades kanye ne-Stop Loss eqondileyo.
- Thatha amaminithi angu-15 ngaphandle kwekhompyutha yakho ngemva kokuphumelela noma ukulahlekelwa ama-trades.`
              }
            ],
            quiz: {
              id: "elite_onedrive_psychology_quiz_1",
              title_en: "VVIP Elite Risk Math & Psychology Evaluation",
              title_zu: "Ukuhlaziywa Kwezibalo Zengozi ne-Psychology ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_psychology_q1",
                  question_en: "According to the Fractional Kelly Criterion guidelines, why is employing a 'Half-Kelly' ratio preferred over full sizing arrays?",
                  question_zu: "Ngokomgomo we-Fractional Kelly Criterion, kungani isilinganiso esiwu-'Half-Kelly' sikhethwa ngaphezu kwesilinganiso esifull?",
                  options_en: [
                    "It dramatically smooths down capital fluctuations and volatility, protecting long-term equity growth from high drawdowns",
                    "It increases the cumulative trading volume automatically, bypassing raw margin limitations during New York sessions",
                    "It disables the stop loss parameters directly on backend brokerage systems during high-impact news spikes",
                    "It doubles the probability of consecutive winning strikes across all global algorithmic assets"
                  ],
                  options_zu: [
                    "Sehlisa ukuguquguquka kwemali (equity volatility), vikela ukukhula kwemali ngesikhathi semingcele emikhulu ye-drawdown",
                    "Sinyusa ama-orders volume ngokuzenzakalelayo, seqa imingcele yama margins phakathi kwe New York sessions",
                    "Sicisha umsebenzi we-Stop Loss kubathengisi (brokers) ngesikhathi kukhona izindaba ezinkulu zezimali",
                    "Siphinda kabili amathuba wokuphumelela kulandelelana kuyo oyedwa impahla emakethe yomhlaba"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_liquidity_masterclass",
    title_en: "IMALI Elite Strategy 5: Institutional Liquidity Sweeps & High-Probability Execution Secrets",
    title_zu: "I-IMALI Elite Strategy 5: Institutional Liquidity Sweeps ne-High-Probability Execution Secrets",
    category_en: "Elite Liquidity & Execution",
    category_zu: "Ukusetshenziswa Kwemali ne-Liquidity Okuphezulu",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "42 Hours",
    duration_zu: "Amahora angu-42",
    description_en: "The fifth instalment of our premier video elite mentorship. Learn the mechanical codes of interbank liquidity pools. Master high-probability stop-hunt sweeps, fair value gap entries, and precision institutional mitigations using our proprietary execution blueprint.",
    description_zu: "Incenye yesihlanu yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ukufinyelela ekuhlaziyeni amandla we-Liquidity Pools, ama-stop hunt sweeps, kanye nezikhungo zentengo zama-Fair Value Gaps (FVG) anekhwalithi ephezulu.",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_liquidity_mod_1",
        title_en: "Module 1: Advanced Liquidity Sourcing & Precision Entry Protocols",
        title_zu: "Isifundo 1: Advanced Liquidity Sourcing ne-Precision Entry Protocols",
        lessons: [
          {
            id: "elite_onedrive_lesson_5",
            title_en: "Class 5: Master Class Video - Institutional Liquidity Pools & Stop-Hunt Mechanics",
            title_zu: "Isigaba 5: Ividiyo ye-Master Class - Institutional Liquidity Pools ne-Stop-Hunt Mechanics",
            duration: "64 Mins",
            videoUrl: "https://jumpshare.com/embed/jTCJMAzZX24BrJro1xat",
            imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 5 of our IMALI Elite sequences. This masterclass video is dedicated to explaining Institutional Liquidity Sourcing and Liquidity Sweep structures. Learn how the interbank algorithm locates retail stop-losses (liquidity pools), triggers high-probability sweeps, and structures clean mitigations off Fair Value Gaps (FVG). Be sure to watch the interactive, high-definition video lesson directly below to master these execution secrets.",
            content_zu: "Siyakwamukela esigabeni sesihlanu se IMALI Elite sequence yethu. Kule vidiyo, sigxila kakhulu ekuzingeleni i-Liquidity Pools emakethe (Stop-Hunts). Uzofunda ukuthi amabhange anyakazisa kanjani intengo ukuze anqamule ama-retail traders ezindaweni ezibalulekile, nendlela yoksebenzisa ama-Fair Value Gaps (FVG) ukuthola ama-trades anembile anekhwalithi ephezulu. Bukela le vidiyo ehamba phambili efakwe ngezansi.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Liquidity_Sourcing.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Liquidity_Sourcing.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE LIQUIDITY SOURCING & SWEEP BLUEPRINT
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. LIQUIDITY POOL METRICS
- Interbank algorithms require massive counterparty liquidity to fill substantial orders.
- This liquidity resides in concentrated buy stop and sell stop boundaries (old highs/lows).
- Retail support-resistance setups act as perfect engineering ground to trap liquidity pools.

2. MECHANICAL STOP-HUNT SWEEPS
- A stop-hunt sweep is a rapid, temporary price breach behind a significant trend level.
- Sweeps are characterized by dynamic long wicks leaving behind zero actual body closes.
- Once a sweep concludes, the pricing engine swiftly reverses to hunt opposite boundaries.

3. COGNITIVE DISPLACEMENT & FVG ENTRY
- Wait for a clear Market Structure Shift (MSS) following a liquidity capture.
- Execute limit entry positions of 1:3 RR directly off optimal 50% equilibrium Fair Value Gaps.
- Place protective stop losses 1.5 pips beyond the ultimate swing extreme of the sweep candle.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: LIQUIDITY POOLS NE-STOP-HUNT BLUEPRINT
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. INDAWO YE-LIQUIDITY POOLS (IZIBALO)
- Izinhlelo zamabhange (algorithms) zidinga imali eqinile ukuze zifake ama-orders amakhulu.
- Le mali ihlala kakhulu ngaphansi noma ngenhla kwezigaba ezibalulekile (old highs / lows).
- Ukuxhumana kwe-retail kusetshenziswa njengezindawo zokusungula noma zokudweba isicupho sombhalo entengweni.

2. I-STOP-HUNT SWEEP MECHANICALS
- I-stop-hunt sweep ingukulandelelwa okusheshayo kwe-orders ngale kwaleyo migomo.
- Ikhonjiswa ngemisila emide (long wicks) ngaphandle kokuvaleka komzimba wentengo (candle body structures).
- I-sweep isuka phezulu iye phansi, bese imakethe ishintsha ngejubane elikhulu.

3. DISPLACEMENT ENTRANCE (FVG)
- Linda ukuthi kuvele i-Market Structure Shift (MSS) ngenhla/ngaphansi kwe-displacement candle.
- Faka ama-trade akho ngqo phezulu kwe-Fair Value Gap (FVG) elinganiselwa ku-50% standard entries.
- Beka i-protective stop loss ngendlela ekahle ngemuva kwendawo yokugcina yaleyo sweep candle.`
              }
            ],
            quiz: {
              id: "elite_onedrive_liquidity_quiz_1",
              title_en: "VVIP Elite Liquidity & Execution Evaluation",
              title_zu: "Ukuhlaziywa Kwe-Liquidity Pools ne-Execution ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_liquidity_q1",
                  question_en: "What distinct mechanical signature separates an institutional liquidity sweep from a genuine breakout close?",
                  question_zu: "Yimuphi umahluko obonakalayo ohlukanisa i-liquidity sweep yamabhange ne-genuine breakout?",
                  options_en: [
                    "A sweep shows rapid entry with long rejection wicks, whereas a breakout secures solid candle body closes beyond the level",
                    "A sweep automatically triggers high-impact economic news releases on global financial servers within minutes",
                    "A sweep deactivates all active pending stop-loss and take-profit ratios on MT4 and MT5 brokers worldwide",
                    "A sweep occurs only during low-volume Asian trading sessions with zero volatility and minimal directional spread"
                  ],
                  options_zu: [
                    "I-sweep ikhombisa ukunyakaza okusheshayo ngemisila emide (rejection wicks), kanti i-breakout ivala ngomzimba egcwele phesheya kwe-level",
                    "I-sweep ikhipha ngokuzenzakalelayo izindaba ezinkulu zezimali emakethe kumaseva womhlaba jikelele",
                    "I-sweep icisha yonke imingcele yokuphatha ingozi (stop-loss / take-profit) kuzo zonke izikhungo zabathengisi",
                    "I-sweep eyenzeka kuphela phakathi kweseshoni yase-Asia lapho kungekho mnyakazo ne-volatility emakethe"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_reversal_masterclass",
    title_en: "IMALI Elite Strategy 6: Algorithmic Reversals & Institutional Fair Value Gaps",
    title_zu: "I-IMALI Elite Strategy 6: Algorithmic Reversals ne-Institutional Fair Value Gaps",
    category_en: "Elite Trend Reversals",
    category_zu: "Ukushintsha Kwekhethelo Emakethe",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "44 Hours",
    duration_zu: "Amahora angu-44",
    description_en: "The sixth instalment of our premier video elite mentorship. Master the structural shifts of market cycles. Decode fair value gaps (FVG), liquidity vacuums, and learn to capture explosive trend reversals with microscopic risk.",
    description_zu: "Incenye yesithupha yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ukufinyelela ekuhlaziyeni ushintsho lwesakhiwo semakethe (MSS), ama-Fair Value Gaps (FVG) anekhwalithi, kanye nendlela yokbamba izitayela ezintsha emakethe.",
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_reversal_mod_1",
        title_en: "Module 1: Advanced Reversal Cycles & Fair Value Gap Mechanics",
        title_zu: "Isifundo 1: Advanced Reversal Cycles ne-Fair Value Gap Mechanics",
        lessons: [
          {
            id: "elite_onedrive_lesson_6",
            title_en: "Class 6: Master Class Video - Algorithmic Market Structure Shifts & FVG Validation",
            title_zu: "Isigaba 6: Ividiyo ye-Master Class - Algorithmic Market Structure Shifts ne-FVG Validation",
            duration: "68 Mins",
            videoUrl: "https://jumpshare.com/embed/GuEcIcshbMZjdg4qt3Rc",
            imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 6 of our IMALI Elite sequences. This masterclass video is dedicated to mastering Algorithmic Trend Reversals and validating Fair Value Gaps (FVGs). Gain elite comprehension on how institutional algorithms engineered displacement, validated imbalances, and executed precision entries at key structural pivot zones. Direct your attention to the full-length video below to absorb these professional-grade trend capture frameworks.",
            content_zu: "Siyakwamukela esigabeni sesithupha se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngezindlela zokushintsha kwesakhiwo semakethe (Market Structure Shift) nokuqinisekisa ama-Fair Value Gaps (FVG). Funda ukuthi amabhange adala kanjani i-displacement, athole ama-imbalances phezulu kwe-liquidity, futhi wenze izithengiselane ezinembile. Bukela le vidiyo efakwe ngezansi ukuze uthole ulwazi oluphelele.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Reversal_Framework.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-reversal_Framework.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE REVERSAL SYSTEM & AUTOMATED IMPORT CORRELATOR
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. MARKET STRUCTURE SHIFTS (MSS)
- True reversal is signaled only after a high-probability sweep of high-timeframe liquidity.
- Watch for displacement: an aggressive, large-bodied candle breaking structural support/resistance.
- Confirm volume using cumulative delta indicators pointing towards the new trade direction.

2. FAIR VALUE GAP (FVG) IMPLICATIONS
- An FVG is a 3-candle structural imbalance where price did not trade on the opposing side.
- High-probability setups recur when price retraces exactly to the 50% equilibrium level of the FVG.
- Avoid low-volume ranges; instead target high-volume imbalance structures for limit entry.

3. COGNITIVE DISCIPLINE IN REVERSAL SEQUENCES
- Trend reversals often trigger high cognitive friction as traders try to pick exact tops.
- Execute with hard invalidation stops located 1.5 pips beyond the displacement range extreme.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: REVERSAL SYSTEM NEYAKHELO YETHEMPO ENTENGWENI
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. MARKET STRUCTURE SHIFTS (MSS)
- Ushintsho oluyiqiniso lukhonjiswa kuphela ngemuva kokuthathwa kwe-high-timeframe liquidity.
- Linda ukuthi kuvele i-displacement: inkanyezi egcwele ngomzimba odabula amazinga wokugcina wentengo.
- Qinisekisa i-volume emakethe usebenzisa amandla we-delta dynamic kulowo mnyakazo omuhle.

2. MA-FAIR VALUE GAPS (FVG) METRICS
- I-FVG lizinga lezakhiwo lamakhandlela amathathu lapho intengo ingahambanga khona ngendlela efanele.
- Izithengiselane zekhwalithi zenzeka lapho intengo ihlehlela emuva phezulu ku-50% equilibrium ye-FVG.
- Gwema izindawo lapho ingekho i-volume key; landela kuphela ama-imbalances anombhalo emakethe.

3. UKUQONDISA INQUBO ENGQONDWENI (DISCIPLINE)
- Ukushintsha kwe-trends kuvame ukuletha ukwesaba ngoba abahwebi bazama ukubala i-top nemizwa.
- Beka i-protective stop loss esiqinile esingama pips angu-1.5 ngale kwaleyo displacement high.`
              }
            ],
            quiz: {
              id: "elite_onedrive_reversal_quiz_1",
              title_en: "VVIP Elite Reversals & FVG Validation Quiz",
              title_zu: "Ukuhlolwa Kwezibalo Zokusethwa noku-Reversal ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_reversal_q1",
                  question_en: "Which structural component marks high-probability algorithmic displacement after a liquidity run?",
                  question_zu: "Yisiphi isakhiwo esikhombisa displacement eqinile emakethe ngemva kokuthathwa kwe-liquidity?",
                  options_en: [
                    "A powerful displacement candle leaving a valid Fair Value Gap (FVG) and structural split",
                    "A slow consolidation pattern occurring within the slow end of New York sessions",
                    "A simple support line rejection without clearing any resting retail market orders",
                    "A sudden terminal disconnect popup warning that forces manual trade cancellation"
                  ],
                  options_zu: [
                    "Inhlansi egcwele ye-displacement candle eshiye i-Fair Value Gap (FVG) ne-break of structure",
                    "Ukushelela kancane kwentengo ngemuva kokuphela kwe-New York session sikhathi sonke",
                    "Isiphephelo sentengo phezulu komugqa we-support ngaphandle kokususa ama-stops emakethe",
                    "Iphutha lokuxhumana kwesikhashana phezulu kwe-platform ye-terminal kwi-PC yakho"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_supplydemand_masterclass",
    title_en: "IMALI Elite Strategy 7: Institutional Supply & Demand Matrix & Invalidation Protocols",
    title_zu: "I-IMALI Elite Strategy 7: Institutional Supply & Demand Matrix ne-Invalidation Protocols",
    category_en: "Elite Supply & Demand",
    category_zu: "Ukuphakelwa Nokufunwa Kwemakethe Okuphezulu",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "46 Hours",
    duration_zu: "Amahora angu-46",
    description_en: "The seventh instalment of our premier video elite mentorship. Unlock the hidden footprints of institutional block towers. Master premium-discount liquidity matrices, refined supply/demand mitigation zones, and invalidation protocols.",
    description_zu: "Incenye yesikhombisa yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ukufinyelela ekuhlaziyeni ama-Order Blocks wamabhange endaweni ye-Supply kanye ne-Demand, kanye nezinyathelo zoku Vikela Ingozi.",
    thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_supplydemand_mod_1",
        title_en: "Module 1: Supply/Demand Arrays & Precision Verification Rules",
        title_zu: "Isifundo 1: Supply/Demand Arrays ne-Precision Verification Rules",
        lessons: [
          {
            id: "elite_onedrive_lesson_7",
            title_en: "Class 7: Master Class Video - Institutional Supply/Demand Optimization & Order Blocks",
            title_zu: "Isigaba 7: Ividiyo ye-Master Class - Institutional Supply/Demand Optimization ne-Order Blocks",
            duration: "70 Mins",
            videoUrl: "https://jumpshare.com/embed/JqVkZojBi5HUgnoj2zQX",
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 7 of our IMALI Elite sequences. This masterclass video is dedicated to explaining Institutional Supply & Demand and Order Block refinement. Learn how the interbank algorithm maps major institutional buying and selling zones, refines them down to low-timeframe points of interest (POI), and structures precision entries with standard invalidation safeguards. Direct your attention to the full-length video below to study these elite mechanisms.",
            content_zu: "Siyakwamukela esigabeni sesikhombisa se IMALI Elite sequence yethu. Kule vidiyo, sigxila kakhulu ekungeneni kwentengo ezindaweni zama-Order Blocks we-Supply kanye ne-Demand. Uzofunda ukuthi amabhange adweba kanjani amazinga abalulekile, indlela yokulungisa lama-levels usebenzisa ama-lower timeframes (POI), kanye nezindlela ezikahle zokuvikela imali yakho uma imakethe ishintsha indlela. Bukela le vidiyo efakwe ngezansi ukuze uthole ulwazi oluphelele.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Supply_Demand_Matrix.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Supply_Demand_Matrix.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE SUPPLY & DEMAND MATRIX & ORDER BLOCKS
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. REFINED ORDER BLOCKS
- An institutional order block is the final candle before an aggressive displacement move.
- We refine these zones on lower timeframes to locate the exact point of imbalance origin.
- Always wait for price to return and mitigate the block before executing pending orders.

2. SUPPLY & DEMAND ZONE RULES
- High-probability zones are born exclusively from strong displacement leaving behind FVGs.
- A zone without a supporting Fair Value Gap has a much higher probability of being swept.
- Ensure the zones reside in premium territory for sells, or discount territory for buys.

3. INVALIDATION PROTOCOLS
- Structural invalidation occurs when a candle secures a solid close body beyond the zone limits.
- Set hard invalidation SL safety buffers precisely 1.5 - 2 pips beyond the outer block wick.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: SUPPLY & DEMAND MATRIX NAMA-ORDER BLOCKS
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. AMA-ORDER BLOCKS REFINED
- I-Order block yamabhange ikhandlela lokugcina ngaphambi kokuba kuvele umnyakazo wentengo onamandla (displacement).
- Sibheka lama-zones kuma-lower timeframes ukuze sithole kahle lapho umnyakazo uqale khona.
- Linda njalo ukuthi intengo ibuyele endaweni yaleyo block (mitigation) ngaphambi kokungena.

2. SUPPLY & DEMAND ZONE RULES
- Izindawo zekhwalithi zizalwa kuphela ngumnyakazo onamandla oshiya ama-Fair Value Gaps (FVG).
- I-zone engenayo i-Fair Value Gap isengcupheni enkulu yokuthi ifakwe i-liquidity sweep.
- Qinisekisa ukuthi i-supply block isendaweni ye-premium, kanti i-demand isendaweni ye-discount.

3. UKUVIKELA INGOZI OKUQINILE (INVALIDATION)
- Umthetho wentengo uthi i-zone ayisasebenzi uma ikhandlela livala ngomzimba ogcwele phesheya kwayo.
- Beka i-protective stop loss sikhathi sonke phakathi kwama pips angu-1.5 kuye ku-2 ngale kwaleyo wick.`
              }
            ],
            quiz: {
              id: "elite_onedrive_supplydemand_quiz_1",
              title_en: "VVIP Elite Supply/Demand Matrix Qualification",
              title_zu: "Ukuhlolwa Kwezibalo ze-Supply ne-Demand ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_supplydemand_q1",
                  question_en: "Which condition must be met to validate an institutional Supply or Demand block as high-probability?",
                  question_zu: "Yisiphi isimo okufanele sifezwe ukuze i-Supply noma i-Demand block yamabhange ibe ngekhwalithi ephezulu?",
                  options_en: [
                    "It must originate from strong displacement that leaves behind clear Fair Value Gaps (FVGs)",
                    "It must be located precisely in equilibrium during the peak Asian trading timeline",
                    "It must trigger immediate slippage alerts and terminal disconnect loops on all live platforms",
                    "It must be traded only with maximum uncalculated leverage during a weekend market halt"
                  ],
                  options_zu: [
                    "Kufanele iqalwe ngumnyakazo onamandla (displacement) oshiya izikhala zama-Fair Value Gaps (FVGs)",
                    "Kufanele ibe semgqeni we-equilibrium ngesikhathi se-Asian trading session sonke",
                    "Kufanele idale amaphutha emishinini wokuhweba kanye nama-terminal loops kuwo wonke amapulatifomu",
                    "Kufanele ihwetshwe kuphela ngama-lot sizes amakhulu kakhulu ngesikhathi imakethe ivaliwe ngempelasonto"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_amd_masterclass",
    title_en: "IMALI Elite Strategy 8: AMD (Accumulation, Manipulation, Distribution) Matrix & Time-Price Theory",
    title_zu: "I-IMALI Elite Strategy 8: AMD (Accumulation, Manipulation, Distribution) Matrix ne-Time-Price Theory",
    category_en: "Elite AMD & Timing",
    category_zu: "Isikhathi ne-AMD Emakethe",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "48 Hours",
    duration_zu: "Amahora angu-48",
    description_en: "The eighth instalment of our premier video elite mentorship. Unlock the algorithmic power of 3: Accumulation, Manipulation, and Distribution (AMD). Master premium daily session boundaries, time-price delivery matrices, and learn to capture high-probability institutional expansions.",
    description_zu: "Incenye yesishiyagalombili yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ukufinyelela ekuhlaziyeni i-Accumulation, Manipulation, ne-Distribution (AMD) endaweni ye-Power of 3, kanye ne-Time-Price Theory emakethe.",
    thumbnail: "https://images.unsplash.com/photo-1638274553228-69cdbe509449?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_amd_mod_1",
        title_en: "Module 1: AMD Cycles, Power of 3 & Time-Price Theory",
        title_zu: "Isifundo 1: AMD Cycles, Power of 3 ne-Time-Price Theory",
        lessons: [
          {
            id: "elite_onedrive_lesson_8",
            title_en: "Class 8: Master Class Video - Algorithmic AMD Power of 3 & Time-Price Delivery Cycles",
            title_zu: "Isigaba 8: Ividiyo ye-Master Class - Algorithmic AMD Power of 3 ne-Time-Price Delivery Cycles",
            duration: "72 Mins",
            videoUrl: "https://jumpshare.com/embed/g6f6Ud4HQVJmlj1Evang",
            imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 8 of our IMALI Elite sequences. This masterclass video is dedicated to explaining AMD (Accumulation, Manipulation, Distribution) Power of 3 and Time-Price theory. Learn how the interbank algorithm accumulates orders during low-volume sessions, manipulates retail sentiment by sweeping liquidity pools, and then distributes price explosively towards the true daily targets. Direct your attention to the full-length video below to study these institutional cycles.",
            content_zu: "Siyakwamukela esigabeni sesishiyagalombili se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngezindlela ze-Accumulation, Manipulation, ne-Distribution (AMD) kanye ne-Time-Price Theory emakethe we-Power of 3. Uzofunda ukuthi i-algorithm ibeka kanjani ama-orders ngesikhathi se-Asian range, isuse kanjani abahwebi ngokushanela ama-liquidity pools ngesikhathi somzuzu we-London Open, bese isabalalisa intengo ngamandla ngesikhathi se-New York session. Bukela le vidiyo efakwe ngezansi ukuze uthole ulwazi oluphelele.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_AMD_Power_Of_3.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-AMD_Power_Of_3.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE AMD POWER OF 3 & TIME-PRICE THEORY
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. ACCUMULATION MECHANICS (A)
- Typically occurs during the Asian session.
- Institutional algorithm accumulates orders within a tight, low-volume consolidation range.
- Avoid placing orders inside this range; instead, map the high and low boundaries.

2. MANIPULATION MECHANICS (M)
- Occurs during London Open or early New York.
- Price is driven aggressively above or below the accumulation range to sweep liquidity.
- This creates the daily wick (high or low of the day) and traps breakout traders.

3. DISTRIBUTION MECHANICS (D)
- Occurs as the algorithm distributes price towards the opposite objective.
- This represents the major daily expansion leg.
- Look for entries on lower timeframe structure shifts inside the manipulation run.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: AMD POWER OF 3 NE-TIME-PRICE THEORY
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. ACCUMULATION MECHANICS (A)
- Ivamise ukwenzeka ngesikhathi se-Asian session.
- I-algorithm ibeka imikhawulo eqinile nemincane ye-volume phakathi kwe-consolidation range.
- Gwema ukufaka izithengiselane ngaphansi kwale zone; dweba amazinga wayo we-high and low.

2. MANIPULATION MECHANICS (M)
- Kwenzeka ngesikhathi se-London Open noma ekuqaleni kwe-New York.
- Intengo ikhushulwa ngamandla ngaphezulu noma ngaphansi kwe-accumulation range ukuqoqa imali.
- Lokhu kudala indawo yomsila wekhandlela (high noma low of the day) bese kuvibeza abahwebi bezitayela.

3. DISTRIBUTION MECHANICS (D)
- Kwenzeka lapho i-algorithm isabalalisa intengo ibuyela ngakolunye uhlangothi olubalulekile.
- Lona ngumnyakazo omkhulu wentengo womhla lowo obizwa nge-expansion leg.
- Bheka ukungena (entries) kuma-lower timeframes lapho kuvela khona ushintsho lwendlela.`
              }
            ],
            quiz: {
              id: "elite_onedrive_amd_quiz_1",
              title_en: "VVIP Elite AMD & Time-Price Qualification Quiz",
              title_zu: "Ukuhlolwa Kwezibalo ze-AMD ne-Time-Price ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_amd_q1",
                  question_en: "What is the primary role of the Manipulation phase in the institutional Power of 3 (AMD) cycle?",
                  question_zu: "Inhloso enkulu yesigaba se-Manipulation kwi-Power of 3 (AMD) algorithm yini?",
                  options_en: [
                    "To sweep liquidity and trap retail traders before starting the true daily expansion trend",
                    "To consolidate volume horizontally inside a boring range for the entire week",
                    "To trigger hardware error alerts and disconnect the internet gateway on MetaTrader",
                    "To distribute partial profits to retail buyers during a low-volume weekend session"
                  ],
                  options_zu: [
                    "Ukushanela i-liquidity kanye nokubamba abahwebi bendabuko ngaphambi kokuqala uhambo lokugcina entengweni",
                    "Ukubeka intengo endaweni eyodwa kancane isonto lonke ngaphandle kokunyakaza",
                    "Ukudala amaphutha ohlelo lokuxhumana noma ukunqamula i-internet yakho kwi-PC",
                    "Ukukhokha imali amabhonasi kubathengisi ngesikhathi imakethe ivaliwe ngempelasonto"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_inducement_masterclass",
    title_en: "IMALI Elite Strategy 9: Algorithmic Inducements & VVIP Liquidity Sweeps",
    title_zu: "I-IMALI Elite Strategy 9: Algorithmic Inducements ne-VVIP Liquidity Sweeps",
    category_en: "Elite Inducements",
    category_zu: "Ukususwa Kwemali nethuba Eliphezulu",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "50 Hours",
    duration_zu: "Amahora angu-50",
    description_en: "The ninth instalment of our premier video elite mentorship. Decipher high-probability algorithmic inducement mechanisms. Learn to identify retail trap configurations, structure entry triggers inside interbank sweep zones, and execute with precision.",
    description_zu: "Incenye yesishiyagalombili neyodwa yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ukufinyelela ekuhlaziyeni ama-Algorithmic Inducements kanye nezindlela zokushanela i-liquidity phezulu kwe-VVIP setup.",
    thumbnail: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_inducement_mod_1",
        title_en: "Module 1: Inducement Structures & VVIP Execution Protocols",
        title_zu: "Isifundo 1: Inducement Structures ne-VVIP Execution Protocols",
        lessons: [
          {
            id: "elite_onedrive_lesson_9",
            title_en: "Class 9: Master Class Video - Algorithmic Inducements & Precision Sweep Execution",
            title_zu: "Isigaba 9: Ividiyo ye-Master Class - Algorithmic Inducements ne-Precision Sweep Execution",
            duration: "74 Mins",
            videoUrl: "https://jumpshare.com/embed/rGrhXXlqJwXXuE9d5od7",
            imageUrl: "https://images.unsplash.com/photo-1631248055158-edec7a3c072b?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 9 of our IMALI Elite sequences. This masterclass video is dedicated to mastering Algorithmic Inducements and Liquidity Sweeps. Gain elite comprehension on how institutional algorithms engineer inducement highs and lows, lure premature traders into subpar setups, and execute sudden sweeps. Direct your attention to the full-length video below to study these highly accurate trading frameworks.",
            content_zu: "Siyakwamukela esigabeni sesishiyagalombili nanye se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngezindlela zokushanela i-liquidity kanye nama-Algorithmic Inducements emakethe. Uzofunda ukuthi i-algorithm idala kanjani izinhlangothi ezidukisayo (inducements), indlela amabhange anyakazisa ngayo intengo ukushaqisa abathengisi, kanye nendlela yokubamba izithengiselane phezulu kwama-sweep areas. Bukela le vidiyo efakwe ngezansi ukuze uthole ulwazi oluphelele.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Inducements_Framework.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Inducements_Framework.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE ALGORITHMIC INDUCEMENTS & LIQUIDITY SWEEPS
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. ALGORITHMIC INDUCEMENTS
- An inducement is a structural high or low engineered to lure premature breakout of reversal traders.
- Institutional algorithms trigger retail limit orders at minor swing points before reversing the intent.
- Do not trade early at minor structure points; instead, identify the true liquidity sweep objective.

2. RETAIL TRAP CONFIGURATIONS
- Double tops and bottoms are classical retailer magnets used by banks to build massive liquidity pools.
- Banks often trigger retail orders by slightly crossing these areas, then sweeping the stop losses.
- Wait for a clear sweep wick rejection and structural shift before formulating entry.

3. ENTRY AND CAPITAL PROTECTION
- Enter strictly after structural invalidation on a lower timeframe following the sweep extreme.
- Guard entries with static safety stop loss placement 1.5 - 2 pips beyond the sweep wick extreme.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: ALGORITHMIC INDUCEMENTS NAMA-LIQUIDITY SWEEPS
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. ALGORITHMIC INDUCEMENTS
- I-inducement represents isakhiwo semakethe esidukisayo esidonsela abahwebi ukuba bangene sikhathi sonke.
- I-algorithm yamabhange amakhulu ivuselela ama-buy/sell stops kuma-minor swing points ngaphambi kokushintsha.
- Gwema izithengiselane kuma-minor level; lindela njalo amazinga womhla we-liquidity sweep enkulu.

2. RETAIL TRAP CONFIGURATIONS
- Ama-double tops ne-bottoms ayimigomo ebonakalayo yamabhange ukuqoqa i-pool enkulu ye-liquidity.
- Amabhange anyakazisa intengo kancane ngale kwaleyo migqa, ashanele ama-Stop Loss abantu abaningi.
- Linda njalo ukuthi kuvele i-wick sweep rejection evulekile kanye ne-break of structure.

3. UKUNGENA NEYOKUVIKELA IMALI
- Ngena kuphela emva kokuthi kube ne-structure shift yethu kuma-lower timeframes ngaphansi komnyakazo we-sweep.
- Beka stop loss esiqinile phakathi kwama pips angu-1.5 kuye ku-2 ngaphezu noma ngaphansi kwe-wick egobile.`
              }
            ],
            quiz: {
              id: "elite_onedrive_inducement_quiz_1",
              title_en: "VVIP Elite Inducement & Liquidity Sweeps Qualification Quiz",
              title_zu: "Ukuhlolwa Kwezibalo ze-Inducement ne-Liquidity Sweeps ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_inducement_q1",
                  question_en: "What is the primary characteristic of an institutional inducement?",
                  question_zu: "Yisiphi isici esiyinhloko se-inducement emakethe yamabhange?",
                  options_en: [
                    "A structural high or low engineered specifically to trap premature breakout or trend-reversal traders",
                    "A long consolidation range extending across multiple days with zero institutional trading volume",
                    "A sudden platform connection loss trigger that closes active customer positions automatically",
                    "A simple support line that holds perfectly without any liquidity sweep occurring"
                  ],
                  options_zu: [
                    "Isakhiwo se-high noma i-low esidaliwe ukuze kubanjwe abahwebi abangena kancane emakethe we-breakout noma i-trend shift",
                    "Indawo yokuhamba emaceleni isikhathi eside sezinsuku ezimbalwa engenalo unyakazo we-volume",
                    "Iphutha kuxhumano lwenethiwekhi elivala izithengiselane ezivuliwe ngokuzenzakalelayo",
                    "Umugqa we-support elula ebambe intengo kahle ngaphandle kokunyakazisa ama-stop loss"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_macro_masterclass",
    title_en: "IMALI Elite Strategy 10: Institutional Market Maker Models & VVIP Daily Bias Protocols",
    title_zu: "I-IMALI Elite Strategy 10: Institutional Market Maker Models ne-VVIP Daily Bias Protocols",
    category_en: "Elite Market Maker Models",
    category_zu: "Amamodeli Okuhweba Ambhange Okuphezulu",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "52 Hours",
    duration_zu: "Amahora angu-52",
    description_en: "The tenth instalment of our premier video elite mentorship. Master the structural layouts of Market Maker Buy and Sell Models (MMBM/MMSM). Learn to synthesize macro liquidity runs, identify consolidated profiles, and master the institutional daily bias setup with surgical precision.",
    description_zu: "Incenye yeshumi yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ukufinyelela egobolondweni le-Market Maker Buy & Sell Models (MMBM/MMSM) kanye nendlela yokuthola i-Daily Bias ekuhwebeni kwakho.",
    thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_macro_mod_1",
        title_en: "Module 1: Market Maker Models & Daily Bias Frameworks",
        title_zu: "Isifundo 1: Market Maker Models ne-Daily Bias Frameworks",
        lessons: [
          {
            id: "elite_onedrive_lesson_10",
            title_en: "Class 10: Master Class Video - Institutional Market Maker Models & VVIP Daily Bias Protocols",
            title_zu: "Isigaba 10: Ividiyo ye-Master Class - Institutional Market Maker Models ne-VVIP Daily Bias Protocols",
            duration: "76 Mins",
            videoUrl: "https://jumpshare.com/embed/Ftqc5hGVfNsakfUDP7dE",
            imageUrl: "https://images.unsplash.com/photo-1590283620387-122e17e4d2d4?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 10 of our IMALI Elite sequences. This landmark masterclass video is dedicated to explaining the sophisticated Market Maker Buy/Sell Models (MMBM/MMSM) and institutional daily bias delivery protocols. Explore the key phases of displacement, consolidation, engineering of liquidity, smart money reversals, and final distribution to resting pools. Direct your attention to the full-length video below to study these highly accurate frameworks.",
            content_zu: "Siyakwamukela esigabeni seshumi se IMALI Elite sequence yethu. Kule vidiyo, sigxila kakhulu ekufundeni amazinga we-Market Maker Buy and Sell Models (MMBM/MMSM) ne-Daily Bias ka-VVIP. Uzofunda ukuthi amabhange amakhulu adweba kanjani amazinga, indlela yokulandela umkhondo wentengo, kanye nendlela efanele yokuthola amazinga e-daily bias avikelekile. Bukela le vidiyo efakwe ngezansi ukuze uthole ulwazi oluphelele.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Market_Maker_Models.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Market_Maker_Models.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE MARKET MAKER MODELS & DAILY BIAS PROTOCOLS
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. MARKET MAKER MODELS (MMBM / MMSM)
- These models map the complete algorithmic cycle of price from inception to distribution.
- Buy Model: Price transitions from a consolidation high down to a smart money reversal (SMR), then climbs back up through low-timeframe displacement.
- Sell Model: Price climbs to a smart money reversal, then descends back through consolidated sell zones to sweep major lows.

2. INSTITUTIONAL DAILY BIAS
- Determined by analyzing macro candle setups (Daily/Weekly) to establish the next day's directional pull.
- High-probability daily bias targets the nearest major liquidity pool or unmitigated Fair Value Gap.
- Never trade against the macro daily bias unless a clean structural shift occurs at high-timeframe key levels.

3. RISK & INTEGRATION
- Align lower timeframe entries directly with the macro Daily/Weekly trend directions.
- Keep protective stop losses bounded at 1.5 - 2 pips beyond the smart money reversal structural extrema.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: MARKET MAKER MODELS NAMA-DAILY BIAS PROTOCOLS
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. AMAMODELI AMABHANGE (MMBM / MMSM)
- Lama-models akhombisa umjikelezo ophelele we-algorithm wentengo kusukela ekuqaleni kuya ekugcineni.
- Buy Model: Intengo isuka phezulu iye phansi lapho kutholakala i-Smart Money Reversal (SMR), bese ikhuphuka futhi ishintsha isimo.
- Sell Model: Intengo ikhuphukela phezulu kakhulu lapho kutholakala umnyakazo we-SMR, bese yehla ngamandla ukuqoqa ama-resting lows.

2. INSTITUTIONAL DAILY BIAS
- Leli thuba litholakala ngokuhlaziya amakhandlela amakhulu (Daily / Weekly) ukuze sithole uhlangothi olulandelayo lwentengo.
- Intengo ye-daily bias ishesha lula iye ngakwi-liquidity pool eseduze noma i-Fair Value Gap engakavalwa.
- Ungalokothi uhwebe uphikisana ne-daily bias enkulu ngaphandle kokuthi kuvele ushintsho lwesakhiwo (MSS).

3. UKUVIKELA NEZINGA LOKUNGENA
- Qondanisa izindlela zakho zokungena kuma-lower timeframes njalo nohlangothi lwethrendi enkulu ye-Daily/Weekly.
- Beka i-protective stop loss phakathi kwama pips angu-1.5 kuye ku-2 ngale kwendawo yeqophelo le-Smart Money Reversal (SMR).`
              }
            ],
            quiz: {
              id: "elite_onedrive_macro_quiz_1",
              title_en: "VVIP Elite Market Maker Models & Daily Bias Qualification Quiz",
              title_zu: "Ukuhlolwa Kwezibalo ze-Market Maker Models ne-Daily Bias ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_macro_q1",
                  question_en: "What marks the turning point of a Market Maker Buy or Sell Model?",
                  question_zu: "Yini ekhombisa ushintsho olubalulekile (turning point) kwi-Market Maker Buy noma Sell Model?",
                  options_en: [
                    "The completion of a Smart Money Reversal (SMR) at a high-timeframe key liquidity level",
                    "A horizontal consolidation boundary extending over the entire weekend holiday",
                    "A dynamic indicator crossing line that forces immediate software exit codes on terminals",
                    "A simple support line rejection that requires using maximum uncalculated market leverage"
                  ],
                  options_zu: [
                    "Ukuphothulwa kwe-Smart Money Reversal (SMR) endaweni ebalulekile yendlalifa ye-high-timeframe liquidity",
                    "Isimo lapho intengo ihamba emaceleni isonto lonke ngesikhathi imakethe ivaliwe",
                    "Ulayini wento yokubala ophoqa ukuthi uhlelo lokuhweba luvaleke ngokuzenzakalelayo kwi-PC",
                    "Ukungasabeli kwentengo emugqeni we-support obala odinga ukuhweba ngama-orders amaningi kakhulu"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_funding_masterclass",
    title_en: "IMALI Elite Strategy 11: Institutional Funding Loops & Liquidity Delivery Matrices",
    title_zu: "I-IMALI Elite Strategy 11: Institutional Funding Loops ne-Liquidity Delivery Matrices",
    category_en: "Elite Funding & Liquidity Delivery",
    category_zu: "Ukutholwa Kwezimali ne-Liquidity Emakethe",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "54 Hours",
    duration_zu: "Amahora angu-54",
    description_en: "The eleventh instalment of our premier video elite mentorship. Demystify the interbank algorithmic funding cycles, credit injection windows, and the complex liquidity delivery matrices. Master the top-tier execution setups backed by pure global macro flows.",
    description_zu: "Incenye yeshumi nakanye yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ukufinyelela egobolondweni le-Institutional Funding Loops kanye nezinqubo ze-Liquidity Delivery Matrices.",
    thumbnail: "https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_funding_mod_1",
        title_en: "Module 1: Funding Cycles & Algorithmic Matrices",
        title_zu: "Isifundo 1: Funding Cycles ne-Algorithmic Matrices",
        lessons: [
          {
            id: "elite_onedrive_lesson_11",
            title_en: "Class 11: Master Class Video - Institutional Funding Loops & Liquidity Delivery Matrices",
            title_zu: "Isigaba 11: Ividiyo ye-Master Class - Institutional Funding Loops ne-Liquidity Delivery Matrices",
            duration: "78 Mins",
            videoUrl: "https://jumpshare.com/embed/RMViu74TtMXYYd1U4ESD",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 11 of our IMALI Elite sequences. This advanced masterclass video investigates the core mechanisms behind institutional funding loops and the interbank electronic pricing algorithm's liquidity delivery matrices. Learn how international central banks balance credit, inject macro liquidity, and how delivery windows govern the intra-day sweeps. Direct your attention to the full-length video below to study these highly precise matrices.",
            content_zu: "Siyakwamukela esigabeni seshumi nakanye se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngokujulile ngezindlela zokusebenza ze-Institutional Funding Loops kanye ne-Liquidity Delivery Matrices ye-algorithm yamabhange amakhulu. Uzofunda ukuthi amabhange adala kanjani intengo, indlela yokulandela isikhathi esifanele se-delivery windows, kanye nokuvikeleka ekuhwebeni phezulu kwalama-flows. Bukela le vidiyo efakwe ngezansi ukuze uthole ulwazi oluphelele.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Funding_Loops_Matrix.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Funding_Loops_Matrix.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: INSTITUTIONAL FUNDING LOOPS & LIQUIDITY MATRICES
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. ALGORITHMIC FUNDING LOOPS
- Funding loops correspond to the specific price injection routines used by the interbank delivery network.
- Credit injections by liquidity providers establish major macro trend baselines.
- Look to alignment with primary funding direction during peak volatility sessions (London & New York).

2. LIQUIDITY DELIVERY MATRICES (LDM)
- Governed by precise time and price triggers rather than lagging indicators.
- The interbank engine seeks high-volume pools of resting orders to execute without extreme slippage.
- Identify multi-month highs/lows where massive corporate liquidity matrices reside.

3. STRATEGY ALIGNMENT
- Always look for confirmation on lower timeframe structures inside these institutional matrices.
- Place static safety stop loss orders strictly 1.5 - 2 pips beyond the sweep extrema, preventing unnecessary losses.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: INSTITUTIONAL FUNDING LOOPS NAMA-LIQUIDITY MATRICES
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. ALGORITHMIC FUNDING LOOPS
- I-funding loops imelela amazinga we-algorithm lapho amabhange amakhulu efaka khona imali emakethe.
- Lokhu kufaka kufaka phakathi imijikelezo ebalulekile eyenza izitayela ezinkulu (trends) kwintengo.
- Qondanisa njalo izithengiselane zakho nohlangothi lwale-funding ngaphansi kwe-London ne-New York sessions.

2. LIQUIDITY DELIVERY MATRICES (LDM)
- Lawulwa yisikhathi nentengo esiqondile kunokusebenzisa izinto zokubala (lagging indicators).
- Uhlelo lubheka izindawo eziqukethe imali eningi (resting stop orders) ukuze lusebenze ngaphandle kokulahlekelwa yintengo (slippage).
- Dweba amazinga wobubanzi be-high nezikhathi zomnyakazo we-multi-month.

3. UKUVIKELA NEZINGA LOKUNGENA
- Lindela njalo ukuthi kuvele i-lower timeframe structural confirmation ngaphakathi kwalezi zindawo ezibalulekile.
- Qaphela stop loss esimisiwe phezulu kwama pips angu-1.5 kuye ku-2 ngale kwaleyo wick ye-sweep, ukuvikela imali yakho.`
              }
            ],
            quiz: {
              id: "elite_onedrive_funding_quiz_1",
              title_en: "VVIP Elite Funding Loops & Liquidity Matrices Qualification Quiz",
              title_zu: "Ukuhlolwa Kwezibalo ze-Funding Loops ne-Liquidity Matrices ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_funding_q1",
                  question_en: "What is the primary driving force behind the Liquidity Delivery Matrix (LDM)?",
                  question_zu: "Yini enyakazisa kakhulu ama-Liquidity Delivery Matrices (LDM) emakethe yamabhange?",
                  options_en: [
                    "Symmetric time-price delivery cycles seeking resting institutional order pools",
                    "A lagging moving average crossing line on low timeframe retail setups",
                    "Random chat group recommendations that gather retail buyer volume",
                    "A technical platform crash that closes client connections unexpectedly"
                  ],
                  options_zu: [
                    "Imijikelezo yesikhathi nentengo (time-price cycles) eqondiswe kwi-resting institutional liquidity",
                    "Ulayini wama-moving averages ohamba kancane kwi-timeframe yabathengisi",
                    "Izincomo ezisuka emaqenjini okuxoxa ohlelweni lokuxhumana kwi-smartphone",
                    "Ukuphazamiseka kobuchwepheshe obuku-browser obuvala ukuxhumana phezulu kwekhibhodi"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_confluence_masterclass",
    title_en: "IMALI Elite Strategy 12: Relative Strength Index (RSI) High-Precision Trading Indicator",
    title_zu: "I-IMALI Elite Strategy 12: Ukusetshenziswa kwe-RSI Indicator ne-High-Precision Trading",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "45 Hours",
    duration_zu: "Amahora angu-45",
    description_en: "The twelfth instalment of our premier video elite mentorship. Deep dive into the Relative Strength Index (RSI) indicator setup, configuring Period 14 and levels 70/30. Learn how to identify true overbought levels above 75 for low-drawdown sell executions, and oversold levels below 20 for precise buy setups, directly based on our latest master class video.",
    description_zu: "Incenye yeshumi nambili yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ukufinyelela egobolondweni le-Relative Strength Index (RSI), uhlele i-Period 14 ne-Levels 70/30. Uzofunda ukuthenga lapho i-RSI ingaphansi kuka-20 (oversold) nokuthengisa lapho i-RSI ingaphezu kuka-75 (overbought).",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_confluence_mod_1",
        title_en: "Module 1: RSI Indicators & High-Precision Execution",
        title_zu: "Isifundo 1: Ama-RSI Indicators ne-High-Precision Entries",
        lessons: [
          {
            id: "elite_onedrive_lesson_12",
            title_en: "Class 12: Master Class Video - RSI Indicator Strategy, Period 14 & Overbought/Oversold Level Mechanics",
            title_zu: "Isigaba 12: Ividiyo ye-Master Class - Relative Strength Index (RSI), Period 14 ne-Overbought/Oversold levels",
            duration: "65 Mins",
            videoUrl: "https://jumpshare.com/embed/3pK9ZZUfYszxU2kpH96Z",
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 12 of our IMALI Elite sequences. In this master class, we focus on the Relative Strength Index (RSI) indicator as demonstrated in the lecture recording. You will learn how to add the RSI indicator on MT4 or MT5 platforms, leaving the period at the default of 14. We analyze the critical level boundaries of 70 (Overbought) and 30 (Oversold). Learn to execute high-precision sells when RSI climbs above 75, and buy positions when RSI dips below 20. Watch the high-fidelity video below and use the interactive RSI graphs to study these core market rules.",
            content_zu: "Siyakwamukela esigabeni seshumi nambili se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngokujulile ngokusebenzisa i-indicator ebizwa nge-RSI (Relative Strength Index). Uzofunda ukuyifaka ku-MT4 noma ku-MT5, usebenzise i-default period engu-14 kanye nama-level angu-70 no-30. Sifunda ukungena ku-Sell uma i-RSI iku-75 nangaphezulu, naku-Buy uma i-RSI iku-20 nangaphansi. Bukela le vidiyo efakwe ngezansi ukuze ujule.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_RSI_Trading_Syllabus.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-RSI_Trading_Syllabus.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: RELATIVE STRENGTH INDEX (RSI) INDICATOR MECHANICS
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. UNDERSTANDING THE RSI INDICATOR
- RSI stands for Relative Strength Index. It is an oscillator that measures the speed and change of price movements.
- It oscillates between 0 and 100 to show the strength or weakness of the current market momentum.
- The standard, default Period for calculation is 14 (representing the last 14 candlesticks on the selected timeframe).

2. KEY RSI BOUNDARIES AND TRADING RULES
- Overbought Level (70): When the RSI crosses above 70, the asset is considered overbought, suggesting a potential downward reversal.
- Oversold Level (30): When the RSI crosses below 30, the asset is considered oversold, suggesting a potential upward reversal.
- VVIP High-Precision Execution Rules (from Lesson Video):
  * Look for a Sell Position when the RSI climbs past 75 (extreme overbought).
  * Look for a Buy Position when the RSI drops below 20 (extreme oversold).
  * Always cross-reference with candlestick rejection shapes (wick sweeps) on the main chart before executing.

3. STRATEGIC POSITION MANAGEMENT
- Place your protective stop-loss 1.5 to 2 pips beyond the high/low candlestick wick that triggered the RSI extreme.
- Maintain strict risk rules: never risk more than 1% of your total balance on any single execution.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: RELATIVE STRENGTH INDEX (RSI) INDICATOR
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. UKUQONDA I-RSI INDICATOR
- I-RSI imele i-Relative Strength Index. Umshini wokukala amandla emakethe kanye nejubane lokuhamba kwentengo.
- Ihamba phakathi kuka 0 no 100 ikhombisa ukuthi imakethe inamandla kangakanani kuleso sikhathi na.
- Isikhathi sokubala (Period) sishiywa ku-14 okuyi-default.

2. IMITHETHO KANYE NAMALEVELS OKUHWEBA NGE-RSI
- Overbought Level (70): Uma i-RSI idlula u-70, kusho ukuthi intengo inyuke kakhulu, kungenzeka iqale ukwehla maduzane.
- Oversold Level (30): Uma i-RSI yehla ngaphansi kuka-30, kusho ukuthi intengo yehle kakhulu, kungenzeka iqale ukunyuka.
- Imithetho ye-VVIP ye-High-Precision Entries (efundiswe kuvidiyo):
  * Bheka i-Sell Position uma i-RSI iku-75 nangaphezulu (extreme overbought).
  * Bheka i-Buy Position uma i-RSI iku-20 nangaphansi (extreme oversold).
  * Qondanisa njalo namakhandlela anemizila emide (wick sweeps) eshadini elikhulu ngaphambi kokuvula i-trade.

3. UKUPHATHWA KWEZINZUZO NEMARGIN
- Sula stop loss sakho sibe phakathi kuka 1.5 no 2 pips phesheya kwensika kabi (wick sweep) eyabangela i-RSI extreme.
- Hlonipha ingozi: ungalokothi ufake ingozi engaphezu kuka 1% we-capital balance yakho.`
              }
            ],
            quiz: {
              id: "elite_onedrive_confluence_quiz_1",
              title_en: "VVIP RSI Indicator Assessment Quiz",
              title_zu: "Ukuhlolwa Kwezibalo ne-Execution ye-RSI Indicator ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_confluence_q1",
                  question_en: "What is the full meaning of the RSI indicator and its default calculation period?",
                  question_zu: "Lisho ukuthini igama elithi RSI emakethe ye-trading, futhi isebenza nge-default period emingaki?",
                  options_en: [
                    "Relative Strength Index with default period 14",
                    "Retail Selling Index with period 21",
                    "Risk Strength Indicator with period 7",
                    "Rapid Stochastic Index with period 50"
                  ],
                  options_zu: [
                    "Relative Strength Index ene-default period engu-14",
                    "Retail Selling Index ene-period engu-21",
                    "Risk Strength Indicator ene-period engu-7",
                    "Rapid Stochastic Index ene-period engu-50"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_mt4_masterclass",
    title_en: "IMALI Elite Strategy 13: MetaTrader 4 (MT4) Platform Mastery & Workspace Customization",
    title_zu: "I-IMALI Elite Strategy 13: Ukusetshenziswa kwe-MetaTrader 4 (MT4) ne-Workspace Customization",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "45 Hours",
    duration_zu: "Amahora angu-45",
    description_en: "The thirteenth instalment of our premier video elite mentorship. Complete guide to navigating the MetaTrader 4 desktop terminal, saving customized template profiles, adding standard and custom technical indicators, and masterfully deploying pending orders.",
    description_zu: "Incenye yeshumi nantathu yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ulwazi oluphelele lokusebenzisa i-MetaTrader 4 desktop terminal, ukuhlela i-workspace nemibala yamashadi, ukufaka ama-indicators, kanye nokuphatha ama-pending orders.",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_mt4_mod_1",
        title_en: "Module 1: MetaTrader 4 Desktop Platform Setup",
        title_zu: "Isifundo 1: Ukulungisa i-MetaTrader 4 Platform",
        lessons: [
          {
            id: "elite_onedrive_lesson_13",
            title_en: "Class 13: Master Class Video - MetaTrader 4 (MT4) Terminal Setup, Layouts & Technical Customization",
            title_zu: "Isigaba 13: Ividiyo ye-Master Class - Ukulungisa i-MT4 Layouts, Amashadi, nama-Technical Tools",
            duration: "60 Mins",
            videoUrl: "https://jumpshare.com/embed/3viCyM0duwg3VLKhCZHV",
            imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 13 of our IMALI Elite sequences. In this master class, we focus on the MetaTrader 4 (MT4) platform as demonstrated in the lecture recording. You will learn how to navigate the Market Watch, Navigator, and Terminal panes, customize chart colors, load template files, and apply technical indicators. We also study critical order mechanics including instant market execution, Buy/Sell Limits, and Buy/Sell Stops to elevate your execution speed.",
            content_zu: "Siyakwamukela esigabeni seshumi nantathu se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngokujulile ngokusebenzisa i-platform ye-MetaTrader 4 (MT4). Uzofunda ukuhlela i-Market Watch, i-Navigator pane, namashadi akho ngokuphelele. Sifunda futhi izinhlobo ezehlukene zama-orders afana ne-Market Execution, Buy/Sell Limit, kuye ku-Buy/Sell Stop ukuze ukwazi ukuvula ama-trades ngokushesha nangobunyoningco.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_MT4_Platform_Syllabus.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-MT4_Platform_Syllabus.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: METATRADER 4 (MT4) PLATFORM MASTER CLASS
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. OVERVIEW OF METATRADER 4 (MT4)
- MT4 is the industry-standard trading platform for retail forex traders, praised for its speed and reliability.
- Key Interface Components:
  * Market Watch: Lists real-time bid/ask prices for selected currency pairs.
  * Navigator: Quick access to trading accounts, custom indicators, templates, and EAs.
  * Terminal: Bottom panel displaying active trades, account balance, history, and exposure.

2. CHART CUSTOMIZATION & INDICATOR DEPLOYMENT
- Customize candlestick colors by pressing F8 to bring up the Chart Properties window.
- Save chart profiles as Templates (.tpl) to easily apply your preferred RSI, moving averages, or custom layout to any new chart.
- Drag and drop indicators from the Navigator window directly onto the active chart.

3. EXECUTION TYPES & PENDING ORDERS
- Instant Execution: Enters the market immediately at the best available price.
- Buy Limit: Place below current market price, anticipating an upward reversal after hitting the level.
- Sell Limit: Place above current market price, anticipating a downward reversal after hitting the level.
- Buy Stop: Place above current market price, anticipating price will continue climbing after breaking out.
- Sell Stop: Place below current market price, anticipating price will continue dropping after breaking out.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: METATRADER 4 (MT4) PLATFORM MASTER CLASS
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. SIFUNDA NGE-METATRADER 4 (MT4)
- I-MT4 iyipulatifomu yokuhweba edume kakhulu emhlabeni jikelele kubahwebi bama-currency.
- Izinto Eziyinhloko kwi-Interface:
  * Market Watch: Ikhombisa intengo yangempela (Bid/Ask) yama-currency pairs.
  * Navigator: Ukuthola ama-trading accounts akho, izinto zokubala (indicators), nama-templates.
  * Terminal: Iwindi elingezansi elikhombisa ama-trades avuliwe, i-balance, ne-history.

2. UKUHLELA AMASHADI NOKUFAKA AMA-INDICATORS
- Shintsha imibala yamakhandlela ngokucindezela u-F8 kukhibhodi yakho ukuze uvule iwindi le-Properties.
- Gcina i-layout yakho njenge-Template (.tpl) ukuze ukwazi ukuyifaka kalula kunoma yiliphi elinye ishadi elisha.
- Hudula ama-indicators kusuka kwi-Navigator uwafake ngqo eshadini elisebenzayo.

3. IZINHLOBO ZAMA-ORDERS KWI-MT4
- Market Execution: Ukungena emakethe khona manje ngentengo ekhona.
- Buy Limit: Ifakwa ngaphansi kwentengo yamanje, ilindele ukuthi intengo inyuke emva kokuyithinta.
- Sell Limit: Ifakwa phezulu kwentengo yamanje, ilindele ukuthi intengo yehle emva kokuyithinta.
- Buy Stop: Ifakwa phezulu kwentengo yamanje, ilindele ukuthi intengo iqhubeke nokunyuka.
- Sell Stop: Ifakwa ngaphansi kwentengo yamanje, ilindele ukuthi intengo iqhubeke nokwehla.`
              }
            ],
            quiz: {
              id: "elite_onedrive_mt4_quiz_1",
              title_en: "VVIP MT4 Platform Assessment Quiz",
              title_zu: "Ukuhlolwa Kokusetshenziswa Kwe-MetaTrader 4 (MT4) ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_mt4_q1",
                  question_en: "Which pending order type is placed BELOW the current market price anticipating an upward price reversal?",
                  question_zu: "Yiluphi uhlobo lwe-pending order olufakwa NGAPHANSI kwentengo yamanje ngenhloso yokuthi intengo azonyuka emva kokuyithinta?",
                  options_en: [
                    "Buy Limit",
                    "Buy Stop",
                    "Sell Limit",
                    "Sell Stop"
                  ],
                  options_zu: [
                    "Buy Limit",
                    "Buy Stop",
                    "Sell Limit",
                    "Sell Stop"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_mt5_masterclass",
    title_en: "IMALI Elite Strategy 14: MetaTrader 5 (MT5) Next-Gen Platform Mastery & Advanced Features",
    title_zu: "I-IMALI Elite Strategy 14: Ukusetshenziswa kwe-MetaTrader 5 (MT5) ne-Advanced Features",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "45 Hours",
    duration_zu: "Amahora angu-45",
    description_en: "The fourteenth instalment of our premier video elite mentorship. Comprehensive analysis of the MetaTrader 5 platform features, including advanced multi-timeframe navigation, built-in Economic Calendar, Depth of Market (DOM) analysis, and Netting vs Hedging accounts.",
    description_zu: "Incenye yeshumi nane yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ulwazi lokusebenzisa i-MetaTrader 5 (MT5) platform, okufaka phakathi ama-timeframes amasha, i-Depth of Market (DOM), ne-Economic Calendar ekhethekile.",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_mt5_mod_1",
        title_en: "Module 1: MetaTrader 5 Advanced Capabilities",
        title_zu: "Isifundo 1: Amandla Thuthukile we-MetaTrader 5",
        lessons: [
          {
            id: "elite_onedrive_lesson_14",
            title_en: "Class 14: Master Class Video - MetaTrader 5 (MT5) Multi-Timeframe Charts, Hedging vs Netting & DOM Mechanics",
            title_zu: "Isigaba 14: Ividiyo ye-Master Class - Ukusebenzisa i-MT5 Advanced Features, Hedging ne-DOM Mechanics",
            duration: "65 Mins",
            videoUrl: "https://jumpshare.com/embed/bisjSnbSVbjPzGKqEf4m",
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 14 of our IMALI Elite sequences. This master class focuses on the advanced MetaTrader 5 (MT5) platform. You will discover the powerful upgrades from MT4 to MT5, including 21 timeframes, a built-in economic calendar, and the advanced Depth of Market (DOM) tool. Learn the critical distinction between Hedging and Netting account modes, how to run multiple positions in the same asset simultaneously, and configure automated alerts. Watch the detailed video below to master MT5.",
            content_zu: "Siyakwamukela esigabeni seshumi nane se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngokujulile nge-platform entsha ne-advanced ye-MetaTrader 5 (MT5). Uzothola izinto ezintsha ezikuyi-MT5 ezingekho kwi-MT4, njengama-timeframes angu-21, i-Economic Calendar eyakhelwe ngaphakathi, ne-Depth of Market (DOM). Funda ngokuhlukana kwe-Hedging ne-Netting accounts ukuze ukwazi ukuhweba njenge-professional. Bukela le vidiyo efakwe ngezansi.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_MT5_Platform_Syllabus.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-MT5_Platform_Syllabus.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: METATRADER 5 (MT5) PLATFORM MASTER CLASS
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. METATRADER 5 (MT5) PLATFORM EVOLUTION
- MT5 is designed as a multi-asset trading platform, supporting forex, stocks, futures, and indices natively.
- Major upgrades from MT4:
  * Timeframes: Expanded from 9 to 21 distinct timeframe views for precision multi-timeframe analysis.
  * Built-in Economic Calendar: Displays high-impact macro news releases directly inside the terminal.
  * MQL5 Language: Enhanced execution speed and strategy backtesting efficiency.

2. NETTING VS HEDGING ACCOUNT MODES
- Netting Mode (Standard for stock markets): Merges all positions in a single financial instrument. If you buy 1 lot and buy another 1 lot, it merges into a single position of 2 lots.
- Hedging Mode (Standard for forex markets): Allows multiple independent positions in the same instrument, including opposite directions (Buy and Sell at the same time). Essential for complex execution strategies.

3. DEPTH OF MARKET (DOM) ANALYSIS
- DOM displays real-time buy and sell orders at different price levels close to current market quotes.
- Provides insights into liquidity density, revealing major institution support/resistance boundaries before price action occurs.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: METATRADER 5 (MT5) PLATFORM MASTER CLASS
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. UKUTHUTHUKA KWE-METATRADER 5 (MT5)
- I-MT5 yakhelwe ukuhweba ama-assets ahlukahlukene afana nama-forex, amasheya (stocks), nama-futures.
- Izinto ezintsha nezibalulekile kwi-MT5:
  * Timeframes: Inyusiwe isuka ku-9 yaya ku-21 timeframes ezahlukene ukuze ungenise ngokuphelele.
  * Economic Calendar: Ikhombisa izindaba zezimali ezizayo ngaphakathi kwi-terminal yakho.
  * MQL5: I-programming language enikeza isivinini phezulu kune-MT4.

2. UKUHLUKANA KWE-NETTING NE-HEDGING ACCOUNTS
- Netting Mode: Ihlanganisa wonke ama-positions endaweni eyodwa. Uma uthenga i-1 lot uphinde uthenge enye i-1 lot, kuhlanganiswa kube yi-2 lots.
- Hedging Mode: Ikuvumela ukuthi uvule ama-trades amaningi azimele ku-currency pair eyodwa, ngisho ama-trades ahlukene (Buy no-Sell ngesikhathi esisodwa). Kubalulekile ekulawuleni ingozi.

3. DEPTH OF MARKET (DOM) ANALYSIS
- I-DOM ikhombisa umthamo wama-orders (Buy and Sell orders) asendaweni eseduze nentengo yamanje.
- Ikusiza ukuba ubone izindawo lapho amabhange amakhulu efake khona imali eningi ngaphambi kokuthi intengo ifike khona.`
              }
            ],
            quiz: {
              id: "elite_onedrive_mt5_quiz_1",
              title_en: "VVIP MT5 Platform Assessment Quiz",
              title_zu: "Ukuhlolwa Kokusetshenziswa Kwe-MetaTrader 5 (MT5) ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_mt5_q1",
                  question_en: "What is the key advantage of the Hedging Mode over the Netting Mode in MetaTrader 5?",
                  question_zu: "Yini inzuzo enkulu ye-Hedging Mode uma iqhathaniswa ne-Netting Mode kwi-MetaTrader 5?",
                  options_en: [
                    "It allows holding multiple separate and opposite positions in the same currency pair",
                    "It automatically places trades for you without risk settings",
                    "It combines all orders into a single average price point",
                    "It closes all your positions instantly when you lose connection"
                  ],
                  options_zu: [
                    "Ikuvumela ukuba uvule ama-positions amaningi azimele kuhlanganise no-Buy no-Sell ngesikhathi esisodwa",
                    "Ikuvulela ama-trades ngokwayo ngaphandle kokuhlela i-risk",
                    "Ihlanganisa wonke ama-orders endaweni eyodwa phezulu kwe-average price",
                    "Ivala wonke ama-trades ngesikhathi esisodwa uma uphelelwa yi-internet"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_mt5_adv_masterclass",
    title_en: "IMALI Elite Strategy 15: MetaTrader 5 (MT5) Advanced Multi-Asset Execution",
    title_zu: "I-IMALI Elite Strategy 15: Ukusebenzisa i-MT5 Advanced Multi-Asset Execution",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "45 Hours",
    duration_zu: "Amahora angu-45",
    description_en: "The fifteenth instalment of our premier video elite mentorship. Advanced study of MT5 order execution models, multi-timeframe correlation matrices, and custom indicators for expert traders.",
    description_zu: "Incenye yeshumi nesihlanu yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Ukuhlaziya amasu okuhweba athuthukile we-MT5, i-multi-timeframe analysis, nokuphathwa kwama-orders ahlukene.",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_mt5_adv_mod_1",
        title_en: "Module 1: Advanced MT5 Asset Control",
        title_zu: "Isifundo 1: Amasu Athuthukile we-MT5",
        lessons: [
          {
            id: "elite_onedrive_lesson_15",
            title_en: "Class 15: Master Class Video - MetaTrader 5 (MT5) Advanced Order Types, Options & Settings",
            title_zu: "Isigaba 15: Ividiyo ye-Master Class - Ukusebenzisa i-MT5 Advanced Orders nama-Settings Thuthukile",
            duration: "65 Mins",
            videoUrl: "https://jumpshare.com/embed/XvUDGqEA6ChFAImlKvVh",
            imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 15 of our IMALI Elite sequences. In this master class, we delve into advanced order execution strategies on MetaTrader 5. You will learn to use specialized pending orders, configure multi-asset profiles, utilize the built-in economic calendar alerts, and implement precise tracking methods for high-frequency trading setups.",
            content_zu: "Siyakwamukela esigabeni seshumi nesihlanu se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngezindlela ezithuthukile zokuphatha ama-orders ku-MetaTrader 5 (MT5). Uzofunda ukusebenzisa ama-specialized pending orders, ukuhlela ama-multi-asset profiles, nokusebenzisa i-Economic Calendar ukubeka ama-alerts alungile ngaphambi kwezindaba.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_MT5_Advanced_Syllabus.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-MT5_Advanced_Syllabus.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: METATRADER 5 (MT5) ADVANCED LEVEL
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. HIGH-SPEED EXECUTION IN MT5
- How MT5 processes multiple orders concurrently compared to MT4's single-thread model.
- Setting up custom trade volumes and hotkeys for rapid position execution.

2. MULTI-ASSET CORRELATION
- Monitoring indices (US30, NAS100) alongside major USD currency pairs to establish direction confluence.
- Configuring your workspace profile to track related assets seamlessly.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: METATRADER 5 (MT5) ADVANCED LEVEL
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. UKUSHESHA KWEMITHETHO KU-MT5
- Indlela i-MT5 ekwazi ngayo ukuhlela ama-orders amaningi ngesikhathi esisodwa.
- Ukulungisa ama-hotkeys namavolumu athize (lot sizes) ukuvula ama-trades ngokushesha okukhulu.

2. UKUHLANGANA KWAMA-ASSETS (CORRELATION)
- Ukuhlola ama-indices (US30, NAS100) kanye nama-USD currency pairs ukuze uthole isiqiniseko somgwaqo wentengo.`
              }
            ],
            quiz: {
              id: "elite_onedrive_mt5_adv_quiz_1",
              title_en: "VVIP MT5 Advanced Assessment Quiz",
              title_zu: "Ukuhlolwa Kokusetshenziswa Okuthuthukile Kwe-MT5 ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_mt5_adv_q1",
                  question_en: "Which feature of MT5 allows you to trade different assets under a single unified environment with advanced speed?",
                  question_zu: "Yikuphi okukhethekile ku-MT5 okukuvumela ukuthi uhwebe ama-assets ahlukene ngesivinini esiphezulu?",
                  options_en: [
                    "Multi-threaded execution engine",
                    "Netting integration only",
                    "Historical data limits",
                    "Basic alert system"
                  ],
                  options_zu: [
                    "I-Multi-threaded execution engine",
                    "Ukuhambisana kwe-Netting kuphela",
                    "Ukulinganiselwa kwedatha yomlando",
                    "I-Basic alert system"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_mt5_indicators_masterclass",
    title_en: "IMALI Elite Strategy 16: MT5 Technical Indicators & Custom Template Integration",
    title_zu: "I-IMALI Elite Strategy 16: Ukufaka Ama-Indicators Nama-Templates ku-MT5",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "45 Hours",
    duration_zu: "Amahora angu-45",
    description_en: "The sixteenth instalment of our premier video elite mentorship. Master the setup of customized technical indicators, oscillators, and Fibonacci retracements to save standard template profiles.",
    description_zu: "Incenye yeshumi nesithupha yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Thola ulwazi lokufaka amashadi ama-indicators ahlukene afana ne-RSI, Moving Averages, ne-Fibonacci, bese uwagcina njengama-templates.",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_mt5_ind_mod_1",
        title_en: "Module 1: MT5 Custom Styling & Settings",
        title_zu: "Isifundo 1: Ukuhlela Amashadi nama-Indicators ku-MT5",
        lessons: [
          {
            id: "elite_onedrive_lesson_16",
            title_en: "Class 16: Master Class Video - MT5 Custom Technical Indicators, Color Schemes & Workspace Layouts",
            title_zu: "Isigaba 16: Ividiyo ye-Master Class - Custom Indicators, Imibala Yama-Charts, ne-Layout Layouts",
            duration: "60 Mins",
            videoUrl: "https://jumpshare.com/embed/gFfZOOvmpbt9KzdGz4M2",
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 16 of our IMALI Elite sequences. In this master class, we focus on custom styles and layouts. You will learn how to design eye-safe chart layouts, load complex multi-layer indicators, draw institutional Fibonacci lines, and organize multiple windows concurrently for dynamic confluence.",
            content_zu: "Siyakwamukela esigabeni seshumi nesithupha se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngokuhlela nokuhlunga amashadi akho kwi-MT5. Uzofunda ukushintsha imibala yamlengiso, ukufaka ama-indicators phezulu kwelinye ishadi, nokusebenzisa ama-tools afana ne-Fibonacci ukuze uthole ama-reversal points.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_MT5_Styling_Guide.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-MT5_Styling_Guide.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: MT5 TEMPLATE & INDICATOR OPTIMIZATION
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. VISUAL WORKSPACE SETUP
- Using properties window (F8) to customize gridlines, candlesticks, and background contrast.
- Saving default templates so every new asset window automatically opens with identical settings.

2. FIBONACCI RETRACEMENT PROPERTIES
- Configuring custom institutional levels like 50%, 61.8%, and 78.6% (Optimal Trade Entry - OTE) inside MT5.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: MT5 TEMPLATE & INDICATOR OPTIMIZATION
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. UKULUNGISELELA ISAKHIWO SE-WORKSPACE
- Ukusebenzisa iwindi lamasethingi (F8) ukulungisa amagridi, amakhandlela, nombala we-background.
- Ukugcina isakhiwo njenge-Default Template ukuze wonke amashadi amasha avuleke ngendlela efanayo.

2. FIBONACCI RETRACEMENT SETTINGS
- Ukufaka ama-levels abalulekile wamabhange anjengo 50%, 61.8%, kanye no 78.6% (Optimal Trade Entry) ku-MT5 tool.`
              }
            ],
            quiz: {
              id: "elite_onedrive_mt5_ind_quiz_1",
              title_en: "VVIP MT5 Indicator Assessment Quiz",
              title_zu: "Ukuhlolwa Kwama-Indicators ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_mt5_ind_q1",
                  question_en: "Which shortcut key opens the Chart Properties window in MetaTrader platforms?",
                  question_zu: "Yisiphi isinqamuleli sekhibhodi (shortcut key) esivula iwindi le-Properties leshadi?",
                  options_en: [
                    "F8",
                    "F9",
                    "F10",
                    "F12"
                  ],
                  options_zu: [
                    "F8",
                    "F9",
                    "F10",
                    "F12"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_mt5_mobile_masterclass",
    title_en: "IMALI Elite Strategy 17: MetaTrader 5 (MT5) Mobile Trading App Optimization",
    title_zu: "I-IMALI Elite Strategy 17: Ukusebenzisa i-MT5 Mobile Application ku-Phone",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "45 Hours",
    duration_zu: "Amahora angu-45",
    description_en: "The seventeenth instalment of our premier video elite mentorship. Complete guide to configuring MetaTrader 5 on Android or iOS devices, setting up instant mobile push alerts, and executing trades from anywhere.",
    description_zu: "Incenye yeshumi nesikhombisa yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Funda ukulungisa nokuphatha i-MT5 kwisimo seselula (mobile phone) yakho, ukusetha ama-notification alerts, nama-execution ohambeni.",
    thumbnail: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_mt5_mob_mod_1",
        title_en: "Module 1: Mobile Interface Execution",
        title_zu: "Isifundo 1: Ukusebenzisa i-MT5 ku-Phone",
        lessons: [
          {
            id: "elite_onedrive_lesson_17",
            title_en: "Class 17: Master Class Video - MT5 Mobile Interface, Real-time Charts & Execution on Android/iOS",
            title_zu: "Isigaba 17: Ividiyo ye-Master Class - MT5 Mobile App, Amashadi, ne-Execution yeselula",
            duration: "65 Mins",
            videoUrl: "https://jumpshare.com/embed/F3iE05MDtq3VL6bB52zA",
            imageUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 17 of our IMALI Elite sequences. This master class walks you through using MT5 on your phone. You will learn how to add your broker account, modify crosshair tools, view candlestick details, place and adjust Stop Loss and Take Profit levels, and receive crucial push alerts directly from your desktop MT5 platform to your mobile device.",
            content_zu: "Siyakwamukela esigabeni seshumi nesikhombisa se IMALI Elite sequence yethu. Kule vidiyo, sikhombisa igxathu negxathu lokusebenzisa i-MT5 application kuselula yakho (Android noma iOS). Uzofunda ukufaka i-broker account yakho, ukusebenzisa i-crosshair tool, ukusetha nokushintsha i-Stop Loss kanye ne-Take Profit, kanye nokuthola ama-alert notifications.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_MT5_Mobile_Guide.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-MT5_Mobile_Guide.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: MT5 MOBILE APP SETUPS & NOTIFICATIONS
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. BROKER SYNCHRONIZATION
- Searching for broker servers under the 'New Account' page.
- Logging in securely using your Master password and choosing the Demo/Real server environment.

2. PUSH NOTIFICATION ALERTS
- Locating your MetaQuotes ID inside your mobile MT5 app settings.
- Registering this ID on your desktop terminal to forward price and order status triggers instantly to your phone.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: MT5 MOBILE APP SETUPS & NOTIFICATIONS
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. UKUHLANGANISA I-BROKER ACCOUNTS
- Ukufuna ama-server ommeleli (broker) wakho ekhasini elithi 'New Account'.
- Ukungena usebenzisa i-password yakho kanye nokukhetha i-Demo noma i-Live server efanele.

2. PUSH NOTIFICATION ALERTS
- Ukuthola i-MetaQuotes ID yakho kumasethingi we-app yakho yeselula.
- Ukufaka le ID kwikhompuyutha yakho ukuze ithumele ama-alerts entengo kumakhalekhukhwini wakho.`
              }
            ],
            quiz: {
              id: "elite_onedrive_mt5_mob_quiz_1",
              title_en: "VVIP MT5 Mobile Assessment Quiz",
              title_zu: "Ukuhlolwa Kokusetshenziswa Kwe-MT5 Mobile ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_mt5_mob_q1",
                  question_en: "What unique ID is required to forward price alerts from a desktop platform to your MT5 mobile application?",
                  question_zu: "Iyiphi i-ID ekhethekile edingekayo ukuze ithumele ama-price alerts kusuka kukhompyutha kuya kwisicelo sakho seselula (mobile application)?",
                  options_en: [
                    "MetaQuotes ID",
                    "Broker Account ID",
                    "IP Address ID",
                    "Terminal License ID"
                  ],
                  options_zu: [
                    "MetaQuotes ID",
                    "Broker Account ID",
                    "IP Address ID",
                    "Terminal License ID"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_mt5_execution_masterclass",
    title_en: "IMALI Elite Strategy 18: MT5 Execution Mechanics, Market Orders & Slippage Management",
    title_zu: "I-IMALI Elite Strategy 18: Izindlela zoku-Executa, Order Flow ne-Slippage kwi-MT5",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "45 Hours",
    duration_zu: "Amahora angu-45",
    description_en: "The eighteenth instalment of our premier video elite mentorship. Demystifying execution speeds, spreads, depth of market liqudity, and navigating slippage during high-volatility news events.",
    description_zu: "Incenye yeshumi nesishiyagalombili yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Izindlela ezithuthukile zokuphatha ukungena emakethe, ukubala i-spread, nokuphatha isimo se-slippage uma kunezindaba ezinkulu.",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_mt5_exec_mod_1",
        title_en: "Module 1: Execution & Liquidity Speeds",
        title_zu: "Isifundo 1: Isivinini ne-Liquidity Emakethe",
        lessons: [
          {
            id: "elite_onedrive_lesson_18",
            title_en: "Class 18: Master Class Video - MT5 High-Speed Market Entry, Spread Analysis & Trade Management",
            title_zu: "Isigaba 18: Ividiyo ye-Master Class - Market Entry, Ukuhlaziya i-Spread, nokuPhathwa kwe-Trade ku-MT5",
            duration: "65 Mins",
            videoUrl: "https://jumpshare.com/embed/JlSXVNYoM1p57kY2UZID",
            imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 18 of our IMALI Elite sequences. In this master class, we analyze order filling policies inside MT5. You will learn about Fill or Kill (FOK), Immediate or Cancel (IOC), and how spreads widen during market transitions. We cover how to manage stop-loss slippage and utilize high-speed VPS hosting to ensure instantaneous execution.",
            content_zu: "Siyakwamukela esigabeni seshumi nesishiyagalombili se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngezindlela amabhange agcwalisa ngazo ama-orders ethu (order filling policies). Uzofunda nge-Fill or Kill (FOK), i-Immediate or Cancel (IOC), nendlela i-spread eshintsha ngayo uma emakethe kunomnyakazo omkhulu noma uma kuvulwa amaseshini amasha.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_MT5_Execution_Manual.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-MT5_Execution_Manual.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ORDER FILLING POLICIES & VPS METRICS
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. MT5 ORDER FILLING POLICIES
- Fill or Kill (FOK): The order can be executed only in the specified volume. If not available, it is cancelled.
- Immediate or Cancel (IOC): Allows partial fills. The remaining unfulfilled volume is cancelled immediately.

2. VIRTUAL PRIVATE SERVER (VPS) ADVANTAGES
- Minimizing ping latencies between your MT5 platform and the broker's liquidity servers to sub-millisecond ranges to prevent slippage.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: ORDER FILLING POLICIES & VPS METRICS
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. IZINDLELA ZOKUGCWALISA AMA-ORDERS (MT5 FILLING POLICIES)
- Fill or Kill (FOK): Uhlobo loku-execute oluvula kuphela uma usayizi owufunayo ukhona wonke, uma kungenjalo i-order liyavalwa.
- Immediate or Cancel (IOC): Ivumela ukuthi i-order livulwe ngalowo thamo okhonayo emakethe njengamanje, bese ezinye ezisele zikhanselwe khona lapho.

2. INZUZO YOKUSEBENZISA I-VPS (VIRTUAL PRIVATE SERVER)
- Ukunciphisa i-latency (isikhathi sentambo phakathi kwakho ne-broker) ukuze i-Stop Loss ne-Market Order kungabi ne-slippage.`
              }
            ],
            quiz: {
              id: "elite_onedrive_mt5_exec_quiz_1",
              title_en: "VVIP MT5 Execution Assessment Quiz",
              title_zu: "Ukuhlolwa Kokusetshenziswa ne-Execution ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_mt5_exec_q1",
                  question_en: "What filling policy executes an order only in the specified volume, otherwise cancels it completely?",
                  question_zu: "Iyiphi i-filling policy egcwalisa i-order kuphela uma usayizi ogcwele ukhona, kungenjalo ikhansela i-order lonke?",
                  options_en: [
                    "Fill or Kill (FOK)",
                    "Immediate or Cancel (IOC)",
                    "Return / Pass",
                    "Market Maker Only"
                  ],
                  options_zu: [
                    "Fill or Kill (FOK)",
                    "Immediate or Cancel (IOC)",
                    "Return / Pass",
                    "Market Maker Only"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_risk_mgt_masterclass",
    title_en: "IMALI Elite Strategy 19: Advanced Risk Management, Position Sizing & Margin Calculations",
    title_zu: "I-IMALI Elite Strategy 19: Ukulawulwa Kwe-Risk, Ukubala Usayizi we-Lot, ne-Margin kwi-MT4/MT5",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "45 Hours",
    duration_zu: "Amahora angu-45",
    description_en: "The nineteenth instalment of our premier video elite mentorship. Comprehensive mathematical breakdowns of leverage, free margin, equity management, and using position sizing calculators to maintain flawless risk discipline.",
    description_zu: "Incenye yeshumi nesishiyagalolunye yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Ukubala ngokomthetho wezibalo ngesimo se-leverage, margin, size ye-lot, nendlela yokuvikela i-trading capital.",
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_risk_mod_1",
        title_en: "Module 1: Professional Capital Protection",
        title_zu: "Isifundo 1: Ukuvikela Izimali Njenge-Professional",
        lessons: [
          {
            id: "elite_onedrive_lesson_19",
            title_en: "Class 19: Master Class Video - Position Sizing Strategies, Stop Loss Placement & Drawdown Rules",
            title_zu: "Isigaba 19: Ividiyo ye-Master Class - Position Sizing, Ukubeka i-Stop Loss, nemithetho ye-Drawdown",
            duration: "65 Mins",
            videoUrl: "https://jumpshare.com/embed/lBVeZTXTdPHMxrwMqXmb",
            imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 19 of our IMALI Elite sequences. In this master class, we study the core mathematical pillars of professional trading: leverage, margin requirements, free margin boundaries, and drawdown prevention. Learn how to size your lots based on precise percentage rules (e.g. 1-2% maximum risk per trade) and use custom calculators to manage capital.",
            content_zu: "Siyakwamukela esigabeni seshumi nesishiyagalolunye se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngokubala i-risk ne-margin. Uzofunda ukusebenzisa i-position sizing ukuthola ukuthi iyiphi i-lot size efanele i-account yakho, nendlela yokubeka i-Stop Loss ukuze ungalandeli imizwa yakho (risk management rules).",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Risk_Formula_Sheet.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Risk_Formula_Sheet.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: PROFESSIONAL RISK MATHEMATICS
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. THE POSITION SIZING FORMULA
- Lot Size = (Account Balance * Risk Percentage) / (Stop Loss in Pips * Pip Value)
- Keep risk constant (1% or 2% maximum) on every trade to survive statistical variance.

2. MARGIN CALL & STOP OUT MECHANICS
- Margin Level = (Equity / Used Margin) * 100
- Stop Out occurs when Margin Level dips below broker's threshold (typically 30% - 50%), forcing liquidations.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: PROFESSIONAL RISK MATHEMATICS
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. IFOMULA YOKUBALA USAYIZI WE-LOT (POSITION SIZING)
- Usayizi we-Lot = (Capital * Usayizi we-Risk) / (Isikhala se-Stop Loss * Pip Value)
- Vikela i-capital yakho ngokuthatha i-risk engu 1% noma 2% kuphela nge-trade eyodwa.

2. MARGIN CALL KANYE NE-STOP OUT
- Margin Level = (Equity / Used Margin) * 100
- I-Stop Out yenzeka uma imali yakho isiphelele kakhulu size sifike emgqeni wommeleli wakho (broker stop out line).`
              }
            ],
            quiz: {
              id: "elite_onedrive_risk_quiz_1",
              title_en: "VVIP Risk Management Assessment Quiz",
              title_zu: "Ukuhlolwa Kokulawulwa kwe-Risk ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_risk_q1",
                  question_en: "What is the industry-standard maximum recommended risk percentage per trade for retail traders?",
                  question_zu: "Iyiphi i-percentage ye-risk enconyelwayo njalo uma uvula i-trade eyodwa ukuze ugcine i-account yakho iphephile?",
                  options_en: [
                    "1% to 2%",
                    "5% to 10%",
                    "20% to 30%",
                    "50% or more"
                  ],
                  options_zu: [
                    "1% kuye ku-2%",
                    "5% kuye ku-10%",
                    "20% kuye ku-30%",
                    "50% nangaphezulu"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_onedrive_trading_psychology_masterclass",
    title_en: "IMALI Elite Strategy 20: Elite Trading Psychology, Discipline & Professional Account Scaling",
    title_zu: "I-IMALI Elite Strategy 20: Trading Psychology ePhakeme, Ukuzilungisa, nokuKhulisa i-Account",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    difficulty_en: "VVIP Elite to Expert",
    difficulty_zu: "Izinga Eliphezulu le-VVIP",
    duration_en: "45 Hours",
    duration_zu: "Amahora angu-45",
    description_en: "The twentieth instalment of our premier video elite mentorship. Mastering mental frameworks, eliminating FOMO (Fear Of Missing Out), neutralizing greed/fear, and creating a scalable trading business model.",
    description_zu: "Incenye yamashumi amabili nembano yohlelo lokuqeqesha ngezifundo zevidiyo eziphezulu. Ukulawula imizwa nomqondo emakethe, ukugwema i-FOMO (Fear of Missing Out), nendlela yokukhulisa i-trading business lakho.",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_onedrive_psych_mod_1",
        title_en: "Module 1: Mental Mastery & Strategy Execution",
        title_zu: "Isifundo 1: Ukulawula Umqondo Nemizwa Yokuhweba",
        lessons: [
          {
            id: "elite_onedrive_lesson_20",
            title_en: "Class 20: Master Class Video - Emotional Control, Overtrading Elimination & Elite Trader Mindset",
            title_zu: "Isigaba 20: Ividiyo ye-Master Class - Ukulawula Imizwa, Ukugwema i-Overtrading, noMoya we-Elite Trader",
            duration: "65 Mins",
            videoUrl: "https://jumpshare.com/embed/SVwq4chiZNmXsdDLkNT0",
            imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to class 20 of our IMALI Elite sequences. In this crowning master class, we analyze the physiological challenges of active trading. You will discover how greed and fear operate in real-time execution settings, explore strategies to eliminate FOMO and overtrading, and study how professional fund managers scale accounts while maintaining absolute consistency.",
            content_zu: "Siyakwamukela esigabeni samashumi amabili se IMALI Elite sequence yethu. Kule vidiyo, sikhuluma ngenkinga enkulu edla abahwebi: Umqondo nemicabango kwi-Trading. Uzofunda ukuthi ukwesaba nomhobholo (fear and greed) kushintsha kanjani imiphumela yakho, nendlela yokugcina umqondo ozolile njalo.",
            resources: [
              {
                name_en: "IMALI-NGESIZULU_Elite_Trading_Psychology_Guide.pdf",
                name_zu: "IMALI-NGESIZULU_Incwadi_Ye-Trading_Psychology_Guide.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU ACADEMY - PRIVATE CURRICULUM NOTES
   LESSON NOTES: ELITE TRADER COGNITIVE DISCIPLINE
   VIDEO COMPANION REFERENCE MATERIAL
==================================================================

1. OVERCOMING COGNITIVE BIASES IN TRADING
- Recency Bias: Overemphasizing the results of your most recent trades, causing you to deviate from rules.
- Loss Aversion: Holding onto losing trades past your stop loss in hopes they will reverse.

2. BUILDING A TRADING ROUTINE
- Establish static pre-market checklists.
- Log every single trade in a physical or digital journal to create clear feedback loops for optimization.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU ACADEMY - AMALUNGO OKUFUNDA AYISISEKELO
   AMAN COMODITY AMALUNGO: ELITE TRADER COGNITIVE DISCIPLINE
   IMINININGWANE YEVIDIYO NOMHLAHLANDLELA WOMGWAQO
==================================================================

1. UKULAWULA IMICABANGO ENGALUNGILE
- Recency Bias: Ukuthatha imiphumela yama-trades akho asanda kwenzeka njengomthetho, okukwenza uphule imithetho yakho.
- Loss Aversion: Ukubamba i-trade elahlekelayo ngale kwe-Stop Loss yakho ngethemba lokuthi lizobuya.

2. UKWAKHA I-TRADING JOURNAL
- Bhala phansi njalo ama-trades akho ukuze ubuke amaphutha akho bese uwashintsha ngendlela efanele.`
              }
            ],
            quiz: {
              id: "elite_onedrive_psych_quiz_1",
              title_en: "VVIP Trading Psychology Assessment Quiz",
              title_zu: "Ukuhlolwa kwe-Psychology Yokuhweba ka-VVIP Elite",
              questions: [
                {
                  id: "elite_onedrive_psych_q1",
                  question_en: "What psychological bias refers to holding losing positions past your stop loss in the false hope of price recovery?",
                  question_zu: "Yikuphi ukukhubazeka komqondo okubangela ukuthi umhwebi abambe i-trade elahlekelayo kude kakhulu ngethemba lokuthi intengo izobuya?",
                  options_en: [
                    "Loss Aversion Bias",
                    "Recency Bias",
                    "Confirmation Bias",
                    "Gambler's Fallacy"
                  ],
                  options_zu: [
                    "Loss Aversion Bias",
                    "Recency Bias",
                    "Confirmation Bias",
                    "Gambler's Fallacy"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "pa_elite_candlestick_physics_mastery",
    title_en: "The Master Guide to Institutional Candlestick Physics & Liquidity Analysis",
    title_zu: "Incwadi Engezamabhange Emakethe Nomthetho Wentengo Wamakhandlela",
    category_en: "Candlesticks & Technical Analysis",
    category_zu: "Ukuhlelwa Kwamakhandlela Nomthetho Wentengo",
    difficulty_en: "Advanced to Expert",
    difficulty_zu: "Izinga Eliphezulu",
    duration_en: "18 Hours",
    duration_zu: "Amahora angu-18",
    description_en: "Master the physics of Open, High, Low, and Close (OHLC). Learn key strategies to decode candle wicks, identify multi-timeframe liquidity sweep zones, and execute with minimum drawdown.",
    description_zu: "Funda imisila nokuvaleka kwamakhandlela emakethe (OHLC). Thola indlela amabhange anyakazisa ngayo intengo ukushaqisa abathengisi basebenzisa ama-order books.",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 4.98,
    studentsCount: 0,
    modules: [
      {
        id: "pa_mod_candlestick_1",
        title_en: "Module 1: Candlestick Mechanics & Liquidity Hunt Identification",
        title_zu: "Isifundo 1: Imisila Yezimakethe Nomthetho Wentengo",
        lessons: [
          {
            id: "pa_lesson_candlestick_1",
            title_en: "Class 1: Decoding Candle Wicks, Liquidity Purges, & Entry Formulations",
            title_zu: "Isigaba 1: Imisila Yezimakethe, Ukusheshiswa nokuvaleka kwentengo",
            duration: "1 Hour 45 Mins",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            imageUrl: "https://images.unsplash.com/photo-1590283657385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
            content_en: "In this comprehensive session, we dissect candlestick physics. Standard retail books teach you to sell a double top or buy a double bottom immediately. In contrast, institutional algorithms hunt these exact retail clusters to capture resting liquidity. We explain how a massive wick sweep traps breakout traders and clears trailing stop losses, paving the way for low-drawdown entries at established Fair Value Gaps.",
            content_zu: "Kulesi sigaba esinzulu, sihlola physics yekhandlela. Izincwadi eziningi zokuhweba zifundisa ukuthi i-double top iyindawo evikelekile. Kodwa amabhange amakhulu ashayela lezo zindawo ukususa bonke abathengisi basebenzisa amakhandlela anemisila emide (rejection wicks). Gada isinyathelo ngesinyathelo indlela yokufaka i-trade kwi-Fair Value Gap evulekileyo.",
            resources: [
              {
                name_en: "ELITE-EDU_Institutional_Candlestick_Wick_Physics_Manual.pdf",
                name_zu: "Incwadi_Ye-Mechanics_Yemakethe_Nomisila_Yamakhandlela.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   ELITE COURSES FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: THE SYSTEMIC PHYSICS OF INSTITUTIONAL CANDLESTICKS (OHLC)
   LICENSED FOR THE STUDENTS OF ELITE COURSES ACADEMY
==================================================================

1. THE OHLC AUCTION PRINCIPLE
- OPEN: The point where the session's trading limit begins.
- HIGH & LOW: Extreme boundary targets where resting retail orders accumulate.
- CLOSE: The confirmed terminal value.

2. SHIFTING FORMULA: EXTREME CANDLE WICKS
When a candlestick pierces past a clean Daily High or Low and leaves a long wick comprising over 70% of the candle range, it signals an institutional liquidity sweep. 
Major banks intentionally create this spike to consume resting pending orders (buy stops/sell stops) and trigger retail stop-losses. This injection of capital fuel provides the required counterparty liquidity for major banking orders before price direction is aggressively reversed.

3. STRATEGICAL GUIDELINE
- Never buy immediately upon a resistance break.
- Wait for the wick sweep on the 4-Hour chart.
- Transition to the 5-Minute timeframe to confirm a Break of Structure.
- Plot your limit entry inside the newly created 15-Minute Fair Value Gap.
- Anchor your Stop Loss cushion exactly 2 pips beyond the sweep peak.`,
                pdfContent_zu: `==================================================================
   ELITE COURSES FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: ULWAZI OMUNYE WAMAKHANDLELA OKUHLAZIYA EMTSETFOMBILI
   IMITHETHO EBHALELWE ABANTWANA BE-ELITE COURSES ACADEMY
==================================================================

1. SAKHIWO SE-OHLC (Open-High-Low-Close)
- OPEN: Isiqalo sentengo kulelo rhafu we-session.
- HIGH & LOW: Imingcele lapho kulindwe khona imali eningi labahwebi.
- CLOSE: Isiphetho noqiniseko lokugcina lwentengo.

2. UMTHETHO WOMSILA OMUDE (WICK SWEEPS)
Lapho ikhandlela lidlula kakhulu ulayini wentengo (Daily High kungenjalo Low) bese lishiya umsila ongaphezu kuka 70% waso sonke isidumbu, kusuke kushanelwe imali (liquidity sweep).
Amabhange amakhulu ashayela lezi zindawo ukuqoqa ama-buy stops noma ama-sell stops ukuvula izikhundla zawo ezinkulu ngaphambi kokushintsha imakethe ngamandla.

3. INDLELA YOKULANDELA
- Musa ukuthenga ngqo uma intengo idlula ulayini.
- Linda imisila kwi-4-Hour chart kuqala.
- Shintshela kwi-5-Minute chart ukuqinisekisa indlela.
- Beka i-limit order yakho phakathi kwe-Fair Value Gap kwi-15-Minute chart.
- Misa i-Stop Loss yakho phesheya kwaleyo ndawo ukugwema drawdown.`
              }
            ],
            quiz: {
              id: "pa_candlestick_quiz_1",
              title_en: "Institutional Candlestick Mechanics & Wick Sweeps",
              title_zu: "Ukuhlaziywa Kwekhandlela Nomthetho Wentengo",
              questions: [
                {
                  id: "pa_q_candlestick_1",
                  question_en: "What does a long upper candle wick piercing a major key Daily High indicate?",
                  question_zu: "Kusho ukuthini uma ikhandlela linomsila omude phezulu okungena phesheya kuka Daily High?",
                  options_en: [
                    "A liquidity sweep where bank orders absorbed retail breakout buys and reversed price",
                    "A technical server error inside the MT5 terminal connectivity suite",
                    "A sign that you should immediately open a maximum lot buy trade with a broker-bonus",
                    "An indication that supply has been completely deleted from interbank books indefinitely"
                  ],
                  options_zu: [
                    "Ukushanelwa kwama-orders (liquidity sweep) lapho amabhange eqoqela khona imali ebuyisele intengo phansi",
                    "Umsila lowo uchaza ukuthi kunesiphazamiso kuseva ye-MT5 terminal",
                    "Uphawu lokuthi kumele uvule i-order enkulu yokuthenga usebenzisa ibonasi yama-broker",
                    "Kusho ukuthi wonke amatshali-mali ashiye emakethe kuze kube nini nini"
                  ],
                  correctAnswerIndex: 0
                },
                {
                  id: "pa_q_candlestick_2",
                  question_en: "What minimum candle wick-to-body ratio is considered indicating strong institutional rejection?",
                  question_zu: "Yisiphi isilinganiso esincane somsila wekhandlela (wick-to-body ratio) esikhombisa ukwenqaba kwemakethe?",
                  options_en: [
                    "Greater than 70% relative to the total candlestick range",
                    "Exactly 10% indicating tight horizontal consolidation",
                    "50% but only when trading minor currency indices in the Far East",
                    "Around 5% indicating high momentum trend expansion parameters"
                  ],
                  options_zu: [
                    "Ngaphezu kuka-70% wesidumbu nengxenye yonke yekhandlela",
                    "Isilinganiso sika-10% esikhombisa ukuthi intengo imile endaweni eyodwa",
                    "Isilinganiso sika-50% kuphela uma uhweba izinhlamvu zezimali ezincane",
                    "Esingaba ngu-5% esitshengisa ukuthi imakethe inomnyakazo osheshayo"
                  ],
                  correctAnswerIndex: 0
                },
                {
                  id: "pa_q_candlestick_3",
                  question_en: "Why is it highly recommended to shift to a lower execution timeframe (like 5m) after a high-timeframe sweep?",
                  question_zu: "Kungani kunconywa kakhulu ukushintshela kwi-timeframe encane (fana ne-5m) ngemuva kokuvela kuka-sweep phezulu?",
                  options_en: [
                    "To confirm a displacement breaks structure (MSS) and identify elegant entry gaps",
                    "To generate a higher volume of transaction fees for broker rebates",
                    "To change the color theme of the chart dashboard faster",
                    "To program an automated trading bot dynamically using central servers"
                  ],
                  options_zu: [
                    "Ukuze uqinisekise ushintsho lomgqa wentengo (MSS) uthole i-Fair Value Gap ekahle",
                    "Ukuze unikeze i-broker yakho imali eningi yama-spreads nemali eyengeziwe",
                    "Ukuze ushintshe imibala yethemba leshadi lomehluko ngokushesha",
                    "Ukuze uhlele i-robot yokuhweba isebenze yodwa kwiseva"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "elite_forex_elite_pathway",
    title_en: "The Master Trader Pathway: Beginner-to-Expert Institutional Strategy",
    title_zu: "Ukuphumela Kwezohwebo: Isinyathelo Ngesinyathelo Kusukela Kwabaqalayo kuye Kubachwepheshe",
    category_en: "Core Currency & Multi-Asset Systems",
    category_zu: "Izinhlelo Zezimali Semakethe",
    difficulty_en: "Beginner to Professional",
    difficulty_zu: "Osaqala kuye kuNgcweti",
    duration_en: "40 Hours",
    duration_zu: "Amahora angu-40",
    description_en: "A comprehensive, realistic, and highly detailed masterclass. Learn mechanics without indicators, master institutional order books, manage risk like an investment bank, and establish realistic yield targets.",
    description_zu: "I-masterclass ephelele, enembile nene-maths. Funda ama-mechanics, lula ukufunda amashadi, lawula ubungozi, futhi uhlale kude nokukhohliswa mayelana ne-forex.",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    instructorName: "Thabiso Khumalo & Sarah Mthembu",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "elite_m1",
        title_en: "Module 1: Market Mechanics & Interbank Price Delivery (Foundations)",
        title_zu: "Isifundo 1: I-Mechanics Yemakethe Nemali Ehanjiswayo (Izisekelo)",
        lessons: [
          {
            id: "elite_l1",
            title_en: "Class 1: Market Participants, Spreads, Liquidity Pools & Order Books",
            title_zu: "Isigaba 1: Abadlali Bemakethe, Ama-Spreads, Nomthetho Wentengo",
            duration: "1 Hour 15 Mins",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 1. Trading involves serious financial risk; therefore, we build our foundations on structural truth rather than internet hype. In this class, we explain exactly what happens when you enter a buy or sell request on EURUSD or GBPUSD. You are not buying physical paper. You are interacting with global liquidity providers (commercial banks like JPMorgan, HSBC, and Deutsche Bank). Learn about bid-ask differentials, electronic communication networks (ECNs), why retail brokerage market-makers run spreads to consume stop losses, and how order matching engines execute transactions step-by-step.",
            content_zu: "Siyakwamukela kwiSifundo 1. Ukuhweba kubandakanya ubungozi obukhulu bezezimali. Kulesi sigaba, sichaza kahle ukuthi kukhona ntoni uma uchofoza inkinobho yokuthenga noma yokuthengisa ku-GBPUSD noma i-EURUSD. Ufunda ngokwahlukana kwamanani okuthenga nokuthengisa (spreads), amanethiwekhi edatha ye-ECN, nezinjini zokufanisa ezihlanganisa abahwebi.",
            resources: [
              {
                name_en: "IMALI-EDU_Market_Mechanics_and_Brokers_Manual.pdf",
                name_zu: "Incwadi_Ye-Mechanics_Yemakethe_Nokukhetha_i_Broker.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: MARKET PARTICIPANTS, ORDER BOOKS & THE BROKER SCAPE
==================================================================

1. THE LIQUIDITY CONTEXT
Retail traders make up less than 6% of daily forex transaction volume. The remaining 94% is managed by Tier-1 commercial banks, central banks, hedge funds, and mega-corporations.
When you enter a trade of 0.10 lots, you are buying 10,000 units of currency. This order goes through:
- A Liquidity Network (ECN / STP)
- An Order Matching Engine
- Direct Market Makers

2. HOW SPREAD WORKS
The 'Spread' is the difference between the Bid price (the price you can sell at) and the Ask price (the price you can buy at).
- Ask Price - Bid Price = Spread.
In times of major news announcements, liquidity is removed from the book, causing spreads to expand instantly.

3. THE RETAIL TRAP: B-BOOK BROKERS
A B-Book broker does not transmit your order to the interbank market; instead, they take the opposite side of your trade. Since 90% of retail traders lose money within 90 days, B-Booking is extremely profitable for bad brokers. They utilize spread expansion and technical slippage to force stop-out reactions.
Your Action Plan: Select only regulated A-Book brokers aligned with institutional execution.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: ABADLALI BEMAKETHE, UHLELO LWAMA-ORDER BOOKS & NEZOBROKER
==================================================================

1. UMSEBENZI WE-LIQUIDITY
Abahwebi abancane (retail traders) benza ngaphansi kuka-6% wokuhweba kwansuku zonke. U-94% osele ulawulwa amabhange amakhulu (Tier-1), ama-hedge funds, kanye nezinkampani ezinkulu.
Uma ufaka oda ka-0.10 lots, uthenga amayunithi angu-10,000 wemali.

2. INDLELA OKUSEBENZA NGAYO I-SPREAD
I-Spread ngumehluko phakathi kwentengo ye-Bid (entengwini ongazithengela ngayo) nentengo ye-Ask (oyithengayo).
- Intengo Ye-Ask - Intengo Ye-Bid = Spread.
Ngezikhathi zezindaba ezibalulekile, i-liquidity iyasuswa emgqeni, okwenza i-spread sikhule ngokuphazima kweso.

3. IBhuku Lesibili (B-Book Brokers)
Lama-broker awathumeli i-order yakho emakethe yangempela; kunalokho, adlala nawe aphikisane nawe ohwebeni. Ngoba u-90% wabahwebi ulahlekelwa yimali ezinsukwini ezingu-90 zokuqala, lokhu kubakhokhela kakhulu ama-broker amabi.`
              }
            ],
            quiz: {
              id: "elite_q1",
              title_en: "Interbank Mechanics & Spread Operations",
              title_zu: "Ukuhlolwa kwe-Mechanics nemigqa ye-Spread",
              questions: [
                {
                  id: "sov_q1_q1",
                  question_en: "Why do B-Book brokers often benefit from retail traders losing accounts?",
                  question_zu: "Kungani ama-broker we-B-Book ezuza kakhulu uma abahwebi bengahwebi kahle balahlekelwe imali?",
                  options_en: [
                    "They act as the counterparty, meaning the client's loss is the broker's direct profit",
                    "They charge high administrative fees on student accounts with low spreads",
                    "They receive physical gold shipments directly from central banks to store in vaults",
                    "They are funded exclusively by AI systems in developers' server networks"
                  ],
                  options_zu: [
                    "Ubambisene nabo uhlangothi oluphambene, okusho ukuthi ukulahlekelwa kwakho kuyinzuzo eqondile kwi-broker",
                    "Bakhokhisa imali eningi yokuphatha kuma-akhawunti anama-spreads aphansi",
                    "Bathola izinto zegolide ezicwengekileyo ngqo emabhange amakhulu we-central",
                    "Baxhaswa kuphela amashini e-AI emithonjeni yemishini yabathuthukisi"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          },
          {
            id: "elite_l2",
            title_en: "Class 2: Candlestick Physics & OHLC Physics (Not Card Patterns)",
            title_zu: "Isigaba 2: Ukuhlaziywa Kwekhandlela Ngokwemakethe (I-OHLC)",
            duration: "55 Mins",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            imageUrl: "https://images.unsplash.com/photo-1590283657385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 2. In this class, we move away from memorizing patterns with childish names like 'three black crows' or 'morning stars'. Instead, we analyze candlesticks through market pressure physics: Open, High, Low, Close (OHLC). We break down how candle bodies show structural consensus and candle wicks indicate rapid liquidity sweeps and price rejection points. Learn how to identify when institutional orders are absorbing supply or purging selling pressure at key structural margins.",
            content_zu: "Siyakwamukela kwiSifundo 2. Sishiya phansi ukubamba ngekhanda amagama ezinto angenasisekelo afana nokuthi 'izinyoni ezintathu'. Kunalokho, sihlazulula amakhandlela ngamandla entengo yangempela: O-H-L-C. Funda ukubona lapho izikhungo ezinkulu zamabhange ziqoqa khona ama-orders entengo kulayini womngcele.",
            resources: [
              {
                name_en: "IMALI-EDU_Master_Candlestick_OHLC_Guide.pdf",
                name_zu: "Ibhuku_Lokuhlaziya_Ukuvaleka_Kwekhandlela_OHLC.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: THE PHYSICS OF MARKET PRICE CONCRETE CANDLES (OHLC)
==================================================================

1. THE OHLC ANATOMY
Every candle represents a specific window of auction history:
- OPEN: The opening transaction of the period.
- HIGH: The maximum transaction level hit by high buying pressure.
- LOW: The minimum transaction level hit by selling pressure.
- CLOSE: The final settlement price before the next cycle starts.

2. QUANTIFIED CANDLE WICK INTERPRETATION
Do not read candles mechanically. Analyze them based on LIQUIDITY:
A massive upper wick on EURUSD or GBPUSD indicates that prices were pushed up to sweep resting take-profit/buy stop orders, then immediately met massive institutional selling orders, driving prices back down.
- Wick-to-Body Ratio > 70% shows real dynamic exhaustion / institutional rejection.
- Wide Range Candles with minute wicks show strong structural momentum indicating institutional urgency.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: ULWAZI NGEMAKETHE NOKUHLAZIYA IKHANDLELA (OHLC)
==================================================================

1. SAKHIWO SE-OHLC (Open-High-Low-Close)
Ikhandlela ngalinye limela umlando wentengo ngesikhathi esithile:
- KUVILE: Intengo yokuqala yenkipha yesikhathi.
- PHEZULU: Intengo ephezulu efundelwe ukuthengwa kwayo.
- PHANSI: Intengo ephansi ekhethelwe ukuthengiswa kwayo.
- VALIWE: Intengo yokuvalwa kokugcina kwaleso sikhathi.

2. INDLELA YOKUFUNDA IMISILA (WICKS)
Umsila omude phezulu ukhombisa ukuthi intengo ikhuphukile yashunyayelwa ukususa ama-stop-loss, kodwa mabeza abahwebi abakhulu (institutions) bashaya ngama-orders amakhulu okuthengisa, baphinda bayehlisela phansi futh.`
              }
            ],
            quiz: {
              id: "elite_q2",
              title_en: "OHLC Auction & Candle Wick Rejection Check",
              title_zu: "Ukuhlolwa Kwedatha Yamakhandlela ne-OHLC",
              questions: [
                {
                  id: "sov_q2_q1",
                  question_en: "What does a candle with a dynamic 80% upper wick (long tail on top) and small body near the bottom signal in an uptrend?",
                  question_zu: "Yini ikhandlela elinomsele ongu-80% phezulu nendikimba encane kakhulu phansi eliyikhombisayo?",
                  options_en: [
                    "Institutional rejection of higher prices, implying supply absorbed and seller control",
                    "Immediate continuation of rapid retail upward momentum with zero risk",
                    "A direct network drop between local hosting brokers and data servers",
                    "A mandatory requirement to purchase custom visual moving averages"
                  ],
                  options_zu: [
                    "Ukunqatshwa kwamabhange amanani aphezulu, okusho ukuthi umthengisi usesandleni sokuphatha",
                    "Ukuhamba phezulu okulula kwayo yonke imakethe ngaphandle kokubeka ubungozi obukhulu",
                    "Ukunqanyulwa kwe-network okuqondile phakathi kwe-broker nezinsiza ye-datha",
                    "Isidingo esiphoqelekile sokuthenga amashadi ne-moving average"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      },
      {
        id: "elite_m2",
        title_en: "Module 2: Strategic Core Formations & Dynamic Supply/Demand Systems (Intermediate)",
        title_zu: "Isifundo 2: Uhlelo Lolwazi Olujulile Nomhlahlandlela wentengo (Amaphetheni)",
        lessons: [
          {
            id: "elite_l3",
            title_en: "Class 3: Finding Footprints: Order Blocks & Fair Value Gaps",
            title_zu: "Isigaba 3: Footprints: Ama-Order Blocks Nomgodi We-Fair Value Gaps",
            duration: "1 Hour 40 Mins",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 3. Institutional market makers leave clear footprints when deploying massive capital. They do this because they cannot hide their major purchase orders. Learn how to locate 'Order Blocks' - the exact candle that marks the final institutional push before a massive structural break of structure. We also study 'Fair Value Gaps' (FVGs), which are structural imbalance holes created by rapid market displacement. We outline step-by-step how to map these institutional levels on your charts and wait patiently for confirmations rather than guessing or chasing wild breakouts.",
            content_zu: "Siyakwamukela kwiSifundo 3. Kulobu buchwepheshe bamazinga, sifunda ukubona izinyawo zakwamabhange (Order Blocks ne-Fair Value Gaps). Abahwebi abakhulu kabakwazi ukufihla yonke imisebenzi yabo, bahlala bashiye izikhala ezivulekile (imbalance). Funda ukungena ohwebeni ngezindlela eziphezulu ngeqile zokuqapha imali.",
            resources: [
              {
                name_en: "IMALI-EDU_Order_Block_and_Imbalance_Playbook.pdf",
                name_zu: "Umtapo_Ulwazi_I-Order_Block_ne_Imbalance.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: THE ORDER BLOCK & FAIR VALUE GAP (FVG) MECHANICS
==================================================================

1. THE ORDER BLOCK DEFINITION
An Elite Bearish Order Block is the consecutive buying candlestick sequence that sweeps liquidity highs immediately prior to a violent, institutional impulse expansion downwards.
- The highest point of this block represents institutional short resistance.
- The lowest point is the primary validation mark of the block.

2. FAIR VALUE GAPS (FVG) / LIQUIDITY IMBALANCES
An FVG occurs inside a 3-candle sequence where Candle 1 High and Candle 3 Low fail to touch each other, leaving a massive empty space in the middle (Candle 2).
- This gaps act as price magnets. Price must revisit the gap to rebalance physical orders.
- Entry Model: Wait for premium displacement to sweep highs, then buy or sell on a clean re-test of the 50% equilibrium line of the FVG.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: ULWAZI OLUPHEZULU NGAMA-ORDER BLOCKS LE-FAIR VALUE GAP
==================================================================

1. INKOMBANDLELA YE-ORDER BLOCK
I-Order Block iyikhandlela lokugcina lombala obomvu noma oluhlaza ngaphambi kokuba imakethe isuke ngamandla iye phezulu noma phansi ngezinyawo zemali enkulu yamabhange.
- Sisebenzusa le ndawo ukulinda intengo ukuthi ibuyele ukuze singene kahle esifundweni sokuhweba ngobuhlakaniphile.

2. UKUBAKHO KWE-FAIR VALUE GAP (FVG)
Lokhu kwenzeka uma kunekhandlela elikhulu lasendleleni lapho imisila yekhandlela lokuqala nelesithathu ingahlangani, ishiye umgodi (imbalance). Imakethe ivame ukubuya izovala le ndawo.`
              }
            ],
            quiz: {
              id: "elite_q3",
              title_en: "Order Block & Imbalance Validation Review",
              title_zu: "Ukuhlolwa Kwezincwadi Zokuhlola Ubungozi be-Imbalance",
              questions: [
                {
                  id: "sov_q3_q1",
                  question_en: "What defines a true institutional Fair Value Gap (FVG)?",
                  question_zu: "Yini echaza i-Fair Value Gap (FVG) yangempela yamabhange?",
                  options_en: [
                    "A 3-candle sequence where the High of Candle 1 does not overlap the Low of Candle 3, leaving an imbalance in Candle 2",
                    "A pattern where two moving averages cross each other precisely during trading sessions",
                    "An automatic order sent by a retail broker to shut down a user's terminal",
                    "A simple layout of three candlesticks of identical height and color in a row"
                  ],
                  options_zu: [
                    "Umgcibelo wamakhandlela amathathu lapho umsila kaphansi kowokuqala noka phezulu kowesithathu ungahlangani",
                    "Iphethini lapho ama-moving average amabili adlulana khona phakathi komlilo wokuhwebelana",
                    "Umyalezo othunyelwa yi-broker yakho ecela ukuthi unikeze b-book fees zakho",
                    "Iphethini elula lapho amakhandlela amathathu anemibala nokuphakama okufanayo egobela phansi"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          },
          {
            id: "elite_l4",
            title_en: "Class 4: Multi-Asset Correlative Markets: Gold, FTSE Indices & Correlations",
            title_zu: "Isigaba 4: Ukuxhumana Kwezimali Emakethe: Igolide, I-FTSE Level ne-Gold",
            duration: "1 Hour 10 Mins",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 4. No asset exists in a vacuum. A master FX trader does not look only at a single currency pair chart like GBP/USD. To survive professionally, you must understand intermarket correlates. For example, the FTSE index reflects London equity performance, which has highly correlated flow patterns to the British Pound (GBP). Likewise, US Bond Yields track interest rate policy, which directly dictates USD strength, moving Gold inversely. We cover step-by-step how to review daily correlate structures to predict directional flows accurately and trade with higher statistical models.",
            content_zu: "Siyakwamukela kwiSifundo 4. Akukho mali ehamba yodwa. Ukuze uphumelele, kufanele wazi kabanzi ngokuzwelana kwezinhlobo zezimakethe (GBPUSD, FTSE, Igolide, ne-Dollar). Sifunda lapha izeluleko zokubuka zonke izinto ngaphambi kokuthatha isinqumo semali.",
            resources: [
              {
                name_en: "IMALI-EDU_Multi_Asset_Intermarket_Correlation_Manual.pdf",
                name_zu: "Uhlelo_Lokulawula_Ukuthambekela_Zezimakethe_Correlation.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: MULTI-ASSET CORRELATING FLOW MATRIX
==================================================================

1. THE THREE CORE GLOBAL METRICS
Trading effectively requires monitoring three major flows:
- THE US DOLLAR INDEX (DXY): The global reserve index. A rising DXY exerts automatic downward gravity pressure on EURUSD, GBPUSD, and Gold.
- US 10-YEAR TREASURY YIELDS (US10Y): Tracking yield changes. As yields expand, capital moves to interest-bearing assets, hurting non-interest assets like Gold.
- CORE EQUITIES INDICES (FTSE, S&P500): Indicator of risk appetite. Falling indices display high 'Risk-Off' attitudes where capital runs to bonds and the US Dollar.

2. FOREX / EQUITIES TRADING RULE
When trading the British Pound (GBP), observe the FTSE and overnight London session indices. If UK index flow displays institutional distribution, GBP currency is highly susceptible to macro seller runs. Align your pairs of trading with major market sentiments.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: ULWAZI LWEZIMAKETHE EZIXHANYALANAYO (CORRELATIONS)
==================================================================

1. IZINTO EZINTATHU EZIPHEZULU OKUMELE UZIBHEKE
Ukuze uhwebe kahle, hlola lezi zinto zansuku zonke:
- I-US DOLLAR INDEX (DXY): Uma i-DXY ikhuphuka, imvamisa izinhlobo zezimali ezifana ne-GBPUSD ne-EURUSD ziyawa phansi, negolide liyawa na.
- I-UK FTSE INDEX ne-S&P500: Lezi zikhombisa uma abatshalimali bafisa ukungena ezincombeni zobungozi (Risk-on) noma amabhange ethatha izimali azisindise kulayini wezincomo zokuhluthwa kwemali (Risk-off).`
              }
            ],
            quiz: {
              id: "elite_q4",
              title_en: "Correlations & Global Macro Review",
              title_zu: "Ukuhlolwa Kokuzwelana Nezinhlobo Zezimali zomhlaba",
              questions: [
                {
                  id: "sov_q4_q1",
                  question_en: "If US Treasury yields (US10Y) rise sharply, what is the typical inverse statistical impact on Gold prices?",
                  question_zu: "Uma usizo lomthetho lwe-Treasury yaseMelika (US10Y) lukhuphuka kakhulu, kwenzekani kuvamile entengweni yegolide?",
                  options_en: [
                    "Gold tends to fall because capital transfers to interest-bearing dollar-linked assets",
                    "Gold rises exponentially because investors lose faith in paper markets",
                    "The FTSE index immediately shuts down for scheduled holiday reviews",
                    "The local broker cancels the spread values and disables client accounts"
                  ],
                  options_zu: [
                    "Igolide lithambekela ekugobeleni phansi ngoba izimali zisuswa ziyiswa kumadola thola isithelo sentshisekelo",
                    "Igolide likhuphuka kakhulu ngoba abantu balahlekelwa ukwethemba amaphepha emakethe",
                    "I-index ye-FTSE ivalwa ngokushesha ngenxa yamaholide omshini ezohwebo",
                    "I-broker isusa izintengo ze-spread sikhawule i-akhawunti yakho ngaso leso sikhathi"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      },
      {
        id: "elite_m3",
        title_en: "Module 3: Precision Position Sizing, Trading Mathematics & Safety Standards (Professional)",
        title_zu: "Isifundo 3: Isifundo Sezinamba: Ukulawula Ingozi Nezibalo Jamabhange",
        lessons: [
          {
            id: "elite_l5",
            title_en: "Class 5: The Math of Capital Preservation: 1% Risk Rule, Compounding, and Outcomes",
            title_zu: "Isigaba 5: Izibalo zika 1% Wengozi: Indlela Enembile Yokuvikela Imali Yakho Ebonakalayo",
            duration: "1 Hour 50 Mins",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 5. Trading is entirely a game of probabilities. To be complete and strictly realistic: we must state that most retail traders fail due to poor risk practices, over-leverage, and looking for immediate millions. To master this profession, you must understand position sizing mathematics. You must never risk more than 1% of your total account equity on any individual trade. We present the compound growth curve math, drawdowns recovery dynamics, and calculate the strict risk-to-reward ratio (must hit a minimum of 1:2 R:R ratio to survive). Elite professional traders do not double accounts in a day; they master consistent 3% to 5% monthly compounding yields with minimal Drawdowns. Learn to treat trading as an absolute business rather than a slot machine.",
            content_zu: "Siyakwamukela kwiSifundo 5. Ukuhweba kuwumdlalo wezibalo namathuba. Ukuvikeleka kwengcebo yakho kulele kwisinqumo sika 1% kuphela ubungozi kumhwebo ngamunye. Izazi ezinkulu azifuni u-100% ngosuku; zithola u-3% kuye ku-5% ngenyanga onenhlonipho enembile futhi ovikelekile ebungozini bomlilo wezimali.",
            resources: [
              {
                name_en: "IMALI-EDU_Professional_Risk_Matrix_math_Calculations.pdf",
                name_zu: "Iphepha_Lokubala_Ubukhulu_Bengcuphe_leMaths.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: CLASSICAL POSITION SIZING & PROBABILITY MATHEMATICS
==================================================================

1. THE MATHEMATICAL RISK OUTCOME PREFERENCE
Your position size must calculate Stop Loss size in pips relative to your target dollar amount.
Formula:
- Position Size (Lots) = (Account Balance * Risk %) / (Stop Loss in Pips * Pip Value of pair)
- Maximum Risk limit per trade: 1% of Equity.

2. THE DRAWDOWN MATHEMATICAL RECOVERY TRAP
When you lose capital, the returns needed to return to break-even grow exponentially:
- Lose 10% of Capital -> Need 11% return to return.
- Lose 25% of Capital -> Need 33% return to return.
- Lose 50% of Capital -> Need 100% return to return.
- Lose 90% of Capital -> Need 900% return to break-even.
Conclusion: Capital safety is of absolute paramount importance. Once you damage your account size via high leverage, your recovery becomes mathematically unsustainable.

Your Strategy: Target a minimum Risk-to-Reward (R:R) ratio of 1:2 (example: risk $10 to capture $20). With a 40% win rate, you will remain highly profitable.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: TIMETSHEKISO NEZIBALO ZOKUVIKELA ENGCEBHENI (1% RISK)
==================================================================

1. ISIBALO SESIZI SESIKHUNDLA (POSITION SIZING MATRIX)
Ngeke uvele ukhethe usayizi (lot size) ngendlela yokungaqondi:
- Usayizi we-Lot = (I-Mali Yonke * Amaphesenti Wengozi ka 1%) / (Stop Loss nge-Pips * I-Pip Value yaPair)

2. I-DRAWDOWNS EXPONENT OVERVIEW
Uma ulahlekelwa yi-capital yakho, ukubuyela emuva kuqala ngomzamo ochoma kakhulu:
- Ulishe u-10% -> Udinga imbuyiselo ka-11% ukubuyisela.
- Ulishe u-50% -> Udinga u-100% we-return ukubuyisela imali obuqale ngayo.
Yingakho kumele ungalokothi ugubhele phezulu ungaphezu kuka-1% wengozi! Gcina umgomo wokugcina imali iphephile.`
              }
            ],
            quiz: {
              id: "elite_q5",
              title_en: "Compounding Growth & Risk Matrix Assessment",
              title_zu: "Ukuhlolwa Kwezibalo Zokubamba Ubungozi Bemakethe",
              questions: [
                {
                  id: "sov_q5_q1",
                  question_en: "If you lose 50% of your account capital, what percentage rate of return do you mathematically need just to break even?",
                  question_zu: "Uma ulahlekelwa ngu-50% we-akhawunti yakho, ulinganiselwa kwisiphi isithunywa sayo ukuze ubonakale ubuyele emgqeni wokuqala?",
                  options_en: [
                    "100% return on the remaining capital balance",
                    "50% return to recover exactly what was lost",
                    "A simple 10% system gain inside high-volume sessions",
                    "No return is required; B-Book systems automatically reimburse clients in regulated networks"
                  ],
                  options_zu: [
                    "u-100% we-return emalini osele nayo",
                    "u-50% we-return ucinge lokho okulibalekile",
                    "u-10% we-return ezinkankeni zemakethe ezinkulu zansuku zonke",
                    "Alukho usizo oludingekayo; ama-broker abuyisela imali mahhala emshinini"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      },
      {
        id: "elite_m4",
        title_en: "Module 4: Professional Trade Verification, Confluences & Session Liquidity (Advanced)",
        title_zu: "Isifundo 4: Ukuhlolwa Ohlangothini Lomhlaba: Izikhathi ze-Liquidity nama-Kill Zones (Kuthuthukile)",
        lessons: [
          {
            id: "elite_l6",
            title_en: "Class 6: The London Open & New York Kill Zones (Session Times & Asia Sweep)",
            title_zu: "Isigaba 6: Amasikhathi Omsebenzi: I-London Open ne-New York Kill Zones",
            duration: "1 Hour 30 Mins",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            imageUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 6. Time is just as critical as price. Institutional trading does not occur randomly throughout the day. It is highly concentrated inside specific intervals known as 'Kill Zones'. We explore the London Kill Zone (06:00 - 09:00 UTC) and the New York Kill Zone (12:00 - 15:00 UTC). We analyze why the Asian Trading Range (overnight sessions) routinely acts as a liquidity pool. Standard retail buy-stops and sell-stops are placed just outside the Asian high and low boundaries. Amnhlaba banks purposely sweep these stops during the London Open before launching the true trend of the day. Learn to identify the sweep and trade in harmony with smart money.",
            content_zu: "Siyakwamukela kwiSifundo 6. Isikhathi sibaluleke kakhulu njengentengo. Imisebenzi yabaphathi bemali yenzeka ngezikhathi ezithile ezibizwa ngokuthi 'i-Kill Zones'. Sifunda kulesi sigaba nge-London Open (06:00 - 09:00 UTC) kanye ne-New York Open (12:00 - 15:00 UTC). Sihlaziya indlela amabhange asusa ngayo ama-stop-loss abahwebi abancane phezulu naphansi kwebanga lase-Asia ngaphambi kokuqondisa intengo yangempela yekhwalithi.",
            resources: [
              {
                name_en: "IMALI-EDU_Session_Timetables_and_Kill_Zones_Strategy.pdf",
                name_zu: "Ibhuku_Lamasikhathi_Omsebenzi_ne_Kill_Zones.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: INSTITUTIONAL TIME CHRONOMETRICS & KILL ZONES
==================================================================

1. THE THREE CORE LIQUIDITY WINDOWS
Do not look at the market all-day. Trade only inside these high-volume volatility zones:
- ASIAN RANGE: 22:00 - 06:00 UTC. Low volatility consolidation. Establishes the liquidity parameters of the day.
- LONDON KILL ZONE: 06:00 - 09:00 UTC. High volume volatility expansion. Frequently sweeps Asian highs or lows to gather orders.
- NEW YORK KILL ZONE: 12:00 - 15:00 UTC. High-volume period driven by major US fundamental releases.

2. THE ASIAN SWEEP STRATEGY MODEL
Steps to verify:
- Map the maximum high and lowest low of the Asian trading range.
- Wait for London open at 06:00 UTC.
- Look for a rapid, high-momentum surge that sweeps the Asian High or Asian Low by 5 to 15 pips.
- Wait for a rapid reversal candlestick showing institutional rejection, indicating the sweep was a trap to take resting stop losses (liquidity run).
- Execute only after price returns inside the Asian range with a clear structural marker.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: AMASIKHATHI ALAWULEKAYO (KILL ZONES)
==================================================================

1. IZINDAWO EZINTATHU ZOMHLABA ZEZIKHATHI
Misa ukuhlala usuku lonke phambi kwamashadi. Hweba kuphela kulezi zindawo ezinamandla amakhulu:
- ASIAN RANGE: 22:00 - 06:00 UTC. Isikhathi lapho imakethe ilala khona, yenza ibanga elincane lokuqoqa izizathu.
- LONDON KILL ZONE: 06:00 - 09:00 UTC. Isikhathi sokuvulwa kwe-London lapho kufikela ama-orders amakhulu avame ukushanela (sweep) imingcele yase-Asia.
- NEW YORK KILL ZONE: 12:00 - 15:00 UTC. Isikhathi samaholide eMelika nezindaba zemicimbi yezomnotho.`
              }
            ],
            quiz: {
              id: "elite_q6",
              title_en: "Session Liquidity & Kill Zone Operations",
              title_zu: "Ukuhlolwa Kwezikhathi Zensimbi ne-Kill Zones",
              questions: [
                {
                  id: "sov_q6_q1",
                  question_en: "What occurs typically during the London Open at 06:00 UTC regarding the Asian Trading Range?",
                  question_zu: "Yini evame ukwenzeka ekuvulweni kwe-London ngo 06:00 UTC maqondana nebanga lezohwebo lase-Asia?",
                  options_en: [
                    "Institutional price sweeps the high or low of the Asian range to grab resting retail stops as liquidity",
                    "The global Forex currency network completely deactivates due to bank holiday processing",
                    "All retail brokers automatically remove spreads and implement fixed 1.0 lot mandates",
                    "Financial developers are forced to restart their local Node servers on alternative ports"
                  ],
                  options_zu: [
                    "Izikhungo zamabhange zishanela (sweep) phezulu noma phansi kwebanga lase-Asia ukuze ziqoqe imali yama-stops",
                    "Wonke amanethiwekhi emakethe ye-Forex ayama kwasikhathi ngenxa yamaholide omshini ezohwebo",
                    "Ama-broker asusa zonke izintengo ze-spread anikeze umfundi amakhodi wokuhweba mahhala",
                    "Abathuthukisi baphoqeleka ukuthi bavule kabusha amaseva wabo kwi-port ehlukile"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          },
          {
            id: "elite_l7",
            title_en: "Class 7: Top-Down Market Structure Mapping (HTF Bias to LTF Entry)",
            title_zu: "Isigaba 7: Top-Down Analysis: Ukuhlaziya Kusukela Elangeni Kuye Kumizuzu Emibili",
            duration: "1 Hour 45 Mins",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 7. A major trap for retail traders is trading on low timeframes (like the 1-minute or 5-minute charts) without knowing the big picture trend (the High Timeframe, or HTF, bias). In this class, we teach the absolute gold standard of market analysis: Top-Down Multi-Timeframe Analysis. We start on the Daily chart to determine which direction mega-investors are pushing price. We then move down to the 4-Hour (H4) and 1-Hour (H1) charts to locate high-probability Order Blocks and Fair Value Gaps. Finally, we execute trades on the 5-minute or 15-minute chart ONLY when those lower timeframes shift structure (using a Change of Character, or CHoCH) in alignment with our master HTF bias. Learn to design high-probability, low-risk trade setups systematically.",
            content_zu: "Siyakwamukela kwiSifundo 7. Ubuciko obukhulu bokuhweba bulele ekwazini ukuthi iyaphi imakethe jikelele (HTF) ngaphambi kokungena kulezo zindawo ezincane (LTF). Sakha umdwebo kulayini we-Daily ne-4-Hour (H4) ukuthola uhlangothi olufanele lamabhange, bese sijika silinda ku-15-minute noma ku-5-minute ukubona uphawu lokushintsha komkhondo wentengo (CHoCH) ngaphambi kokuthatha isinqumo sokungena.",
            resources: [
              {
                name_en: "IMALI-EDU_Top_Down_Analysis_Execution_Grid.pdf",
                name_zu: "Uhlelo_Lokuhlaziya_Kusuka_Phezulu_Kuye_Phansi.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: TOP-DOWN MARKET STRUCTURE & MULTI-TIMEFRAME ALIGNMENT
==================================================================

1. THE MULTI-TIMEFRAME HIERARCHY
To ensure pristine trade quality, map structures across these distinct timeframes:
- DAILY TIMEFRAME (D1): Directs the Institutional Market Bias. Tells us if the institution is in accumulation, manipulation, or distribution phases.
- 4-HOUR / 1-HOUR TIMEFRAME (H4/H1): Identifies key pools of supply & demand, high-quality Order Blocks, and unmitigated Fair Value Gaps.
- 15-MINUTE / 5-MINUTE TIMEFRAME (M15/M5): Displays local market cycles. Serves exclusively as our exact tactical execution zone.

2. TRANSITIONAL STRUCTURE MARKS
- BOS (Break of Structure): Price breaks the previous swing point in alignment with the master trend, confirming continuation.
- CHOCH (Change of Character): The first structural swing point failure indicating a major reversal shift in trend direction.
Rule: Do not take positions on lower-timeframe BOS unless local trend shifts are fully supported by an unmitigated HTF institutional level.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: UKUHLAZULULA AMASHADI Phezulu Nokulalela kuka-CHoCH
==================================================================

1. IZINHLAKA ZENKOMBANDLELA
Vikela imali yakho ngokuhlola amashadi ngale ndlela ehlelekileyo:
- ISHADI LOSUKU (Daily): Likunika indlela eyinhloko okuhamba kuyo amabhange amakhulu (Institutional Bias).
- ISHADI LAMAHORA AMANE (4-Hour): Libonisa lapho ama-Order Blocks angathintwanga nemigodi (FVGs) ekhona.
- AMAMIZUZU AWU-15 (15-Min): Zone lapho ugada khona uphawu lo kuguquka wentengo kwashesha (CHoCH) ukuze ungene ohwebeni.`
              }
            ],
            quiz: {
              id: "elite_q7",
              title_en: "Top-Down Analysis & Structural Reversals",
              title_zu: "Ukuhlolwa Kokusuka Phezulu Kuye Phansi ne-Structural Bias",
              questions: [
                {
                  id: "sov_q7_q1",
                  question_en: "What is the difference between a Break of Structure (BOS) and a Change of Character (CHoCH)?",
                  question_zu: "Yini umehluko phakathi kwe-Break of Structure (BOS) ne-Change of Character (CHoCH)?",
                  options_en: [
                    "BOS represents trend continuation, while CHoCH represents the first major structural signal of trend reversal",
                    "BOS is only utilized by retail indicator scripts, while CHoCH is exclusive to institutional B-Book engines",
                    "There is no difference; they are childish branding names used to mislead retail traders",
                    "BOS is restricted to USD currencies, while CHoCH is used only on London FTSE equities and Gold"
                  ],
                  options_zu: [
                    "I-BOS imele ukuqhubeka komkhondo (trend), kanti i-CHoCH imele uphawu lokuqala olukhulu lokujika komkhondo lowo",
                    "I-BOS isetshenziswa ama-scripts kuphela kanti i-CHoCH yenzelwe izinhlelo zezikhungo ze-B-Book",
                    "Akukho mehluko; amagama angenasisekelo asetshenziswa ukukhohlisa abahwebi",
                    "I-BOS isebenza kumadola kuphela kanti i-CHoCH isebenza emishinini ye-FTSE negolide labaseLondon"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      },
      {
        id: "elite_m5",
        title_en: "Module 5: Mindset Calibration & The Psychology of Peak Performance (Mastery)",
        title_zu: "Isifundo 5: Ukulawula Inqondo Nemicabango Yokuhweba Ngengqondo Eqinile (I-Psychology)",
        lessons: [
          {
            id: "elite_l8",
            title_en: "Class 8: Overcoming Retail Cognitive Biases (Greed, FOMO, Revenge Trading)",
            title_zu: "Isigaba 8: Ikhwalithi Yemicabango: Indlela Yokulwanyulwa kwe-Greed, FOMO ne-Revenge",
            duration: "1 Hour 10 Mins",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 8. You can have the best trading strategy in the world, but if your mindset is uncalibrated, you will mathematically destroy your trading account balance. The human mind is naturally wired for survival in physical environments, but these evolutionary instincts work completely against us in financial markets. We explore 'Greed' (placing massive slot-machine sizes to double accounts), 'FOMO' (Fear of Missing Out, chasing running prices after a move has already completed), and 'Revenge Trading' (violently entering trades to win back money lost). We cover step-by-step how to construct a rigid trading plan, treat losses as routine operating costs, and remain completely cold and emotional-free during execution.",
            content_zu: "Siyakwamukela kwiSifundo 8. Ungaba neqhinga elihle kakhulu emhlabeni, kodwa uma ingqondo yakho ingenandlela ehlelekileyo yokugada imicabango yakho, uzolahlekelwa yimali yakho yonke. Sifunda kulesi sigaba ngezincomo zempilo nengqondo egada i-Greed, ukwesaba ukushiyeka (FOMO), kanye nokuziphindiselela (Revenge Trading). Funda ukubona ukulahlekelwa njengento evamile yebhizinisi.",
            resources: [
              {
                name_en: "IMALI-EDU_Mindset_Calibration_and_Trader_Logs_Blueprint.pdf",
                name_zu: "Uhlelo_Lokulawula_Ingqondo_Nemizwa_ku-Forex.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: PERFORMANCE COGNITIVE BIAS CALIBRATION
==================================================================

1. THE PSYCHOLOGICAL REALITY OF LOSSES
In professional trading, loss is a standard cost of doing business, just like monthly rent in a physical shop.
- Weak Traders: View a lost trade as a personal failure or an error. They react with immediate Revenge Trading to 'win back' money.
- Elite Traders: Accept loss as a simple statistical event. They know their 40% win rate with 1:2 R:R mathematically ensures long-term wealth.

2. ELIMINATING EMOTIONAL SURGES (FOMO & GREED)
Your Execution Protocol:
- If a high-impact setup of EURUSD or GBPUSD leaves without you, do NOT chase it. Let it go. The market will always present another setup tomorrow.
- Never manually override or expand your Stop Loss once a trade is active.
- Keep a pristine daily journal documenting: Entry reasons, Risk used, emotional state, and outcome compliance.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: IZINGCONCE ZENGQONDO NOKUQAPHA IMICEBISO (TRADER BLUEPRINT)
==================================================================

1. UKWAMUKELA UKULAHLEKELWA NGENDLELA EFANELEKO
Ukunqotshwa emhlabeni wezohwebo kumele kubonakale njenge-cost ejwayelekile yebhizinisi, kufana nebilling ka electricity esitolo sakho.
- Abahwebi abafuna imali kalula: Bephendula ngokuthukuthela nokuziphindiselela okubenza balahlekelwe kakhulu.
- Abahwebi bezikhungo eziqinileyo: Balandela imithetho kuphela bathole u-3% ngenyanga phezulu kwazo zonke iziphithiphithi.

2. UKUVIKELA IMICABANGO EMIYALELO (FOMO)
- Uma intengo ifika isihambile ku-GBPUSD, ungagijimi ngemva kwayo. Linda enye indawo efanele kusasa. Imakethe ivulwa nsuku zonke.`
              }
            ],
            quiz: {
              id: "elite_q8",
              title_en: "Trader Psychology & Bias Review",
              title_zu: "Ukuhlolwa Kwezengqondo Nokugada Imicabango Ku-Forex",
              questions: [
                {
                  id: "sov_q8_q1",
                  question_en: "How should a professional elite trader perceive a losing trade?",
                  question_zu: "Umfundi ohwebayo ngendlela efanele kumele akubone kanjani ukulahlekelwa emhlabeni we-Forex?",
                  options_en: [
                    "As a simple, neutral statistical event representing a normal cost of doing business",
                    "As a personal failure that must be corrected immediately by tripling the position size",
                    "As a technical glitch caused by the brokerage data server network system",
                    "As a direct command from standard indicators to immediately buy in the opposite direction"
                  ],
                  options_zu: [
                    "Njengento elula yenombolo engenandaba nemicabango (statistical cost) ehambisana nebhizinisi",
                    "Njengokuhluleka okukhulu okumele kulungiswe ngokukhulisa ama-lots size ngokuphazima kweso",
                    "Njengesiphambeko sobuchwepheshe esivela kumaseva we-broker yakho",
                    "Njengesinyathelo esiphoqelekile sokuthi ungene ohwebeni oluphambene nakho"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          },
          {
            id: "elite_l9",
            title_en: "Class 9: Setting Realistic Annual Benchmarks & The Master Income Blueprint",
            title_zu: "Isigaba 9: Izinkozo Zenzuzo Enembile: Ukubeka Imigomo Ka-Compounding Yansuku Zonke Nomnyaka",
            duration: "1 Hour 15 Mins",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 9. To become a master trader in financial markets, you must think and operate like an investment fund manager, not a retail gambler. The internet is flooded with fake gurus claiming they double their accounts every week with zero risk. This is a absolute lie aimed at misleading beginners into losing their capital to B-Book retail market makers. In this class, we walk step-by-step through the realistic metrics of elite trading: targeting 3% to 6% monthly growth with a maximum drawdown limit of 5%. We introduce prop firm funding structures, demonstrating how to secure $100,000+ in managed capital safely once you master risk metrics, and how to build an independent, legally compliant financial business.",
            content_zu: "Siyakwamukela kwiSifundo 9. Ukuze ukwazi ukuthuthuka kahle, kulesi sigaba sichitha wonke amanga asequmbile ezinkundleni zokuxhumana aphathelane nokuthi ungavula i-akhawunti ka-R1000 uyenze uphephe kahle ube usozigidi ngenyanga eyodwa. Sifunda izibalo zendlela amabhange nabasebenzi bezinhlangano ezinkulu abazenza ngazo (3% kuye ku-6% ngenyanga onohlonipho lobungozi). Funda ngokusebenzisa amabhizinisi we-Prop Firms anikeza abahwebi ama-akhawunti amakhulu.",
            resources: [
              {
                name_en: "IMALI-EDU_Compounding_Pro_Forma_and_Prop_Firm_Playbook.pdf",
                name_zu: "Ibhuku_Lezibalo_Zokukhulisa_Imali_Nezinkundla_zeProp_Firms.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: THE EXCECUTIVE COMPOUND BLUEPRINT & PROP FUNDS
==================================================================

1. THE EXTREME REALITY OF COMPOUND INTEREST
If you grow a $10,000 account, look at how mathematical compounding delivers wealth over time (retaining simple 4% average monthly yields):
- Year 1 End: $16,010
- Year 2 End: $25,633
- Year 3 End: $41,039
- Year 5 End: $105,196
High leverage is never necessary. Consistent performance is key.

2. PROP FIRM CAPITAL INTEGRATION
Rather than risking your initial family savings, master your strategy, then submit your performance to regulated funding firms (Prop Firms like FTMO, FundedNext, etc.).
- Passing Criteria: Demonstrate solid risk preservation with a maximum 5% daily loss limit and target 8-10% gain within conservative parameters.
- Reward: Gain profit splits of up to 80% on $100,000+ managed funds without risking your personal capital.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: UHLELO LOKUKHULISA IMALI (COMPOUND STATS) NE-PROP FIRMS
==================================================================

1. IZIBALO ZESITHELO SE-COMPOUNDING
Uma unemali engu-R10,000 ukhula nayo ngokuzethemba uzola:
- Inyanga ka 12 (u-4% Monthly average): R16,010.
- Imigudu yakho iqala ukuba nesisindo ngendlela yesikhathi ngaphandle kokubeka umndeni wakho ebungozini bomlilo.

2. I-PROP FIRM SYSTEM ANALYSIS
Kunokuthi ubeke imali yempilo yakho engozini, lulama umgudu wemfundo kule-academy bese ufaka izicelo ku-Prop Firms ukuze uthole amashumi ayizinkulungwane zedola eziyizimali zokuhweba amabhange.`
              }
            ],
            quiz: {
              id: "elite_q9",
              title_en: "Compounding Logic & Capital Scaling",
              title_zu: "Ukuhlolwa Kwendlela Ye-Compounding Nezinkomo zika-Prop Firms",
              questions: [
                {
                  id: "sov_q9_q1",
                  question_en: "What is a major advantage of utilizing regulated Prop Firms (institutional funding platforms) to trade?",
                  question_zu: "Yisiphi isisizakala esikhulu sokusebenzisa amabhantshi we-Prop Firms ohlelweni lwakho lwasemhlabeni Forex?",
                  options_en: [
                    "They allow you to trade with up to $100,000+ of managed institutional capital, removing the risk of losing your own personal savings",
                    "They guarantee 100% winning trades without enforcing any stop loss or position sizing rules",
                    "They provide direct gold coins shipped to your home address on passing theoretical courses",
                    "They automatically configure process.env.GEMINI_API_KEY inside your server's metadata parameters"
                  ],
                  options_zu: [
                    "Bakunika ithuba lokuhweba ngemali engaphezu kuka-$100,000+ ngaphandle kokubeka engozini imali yakho yasekhaya",
                    "Baqinisekisa u-100% we-winning trades ngaphandle kokuphoqa imithetho yama-stop-loss",
                    "Bathumela izinto zegolide ezindlini zabafundi ngezinkathi zamaholide e-London",
                    "Bafaka amakhodi e-API yakwaGemini ezinhlelweni amaseva akho ngaphandle kokuba ubhale amakhodi"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      },
      {
        id: "elite_m6",
        title_en: "Module 6: Final Master Evaluation & Practical Live Sandbox Sim (Mastery)",
        title_zu: "Isifundo 6: Ukuhlolwa Kwokugcina Kokuhweba Nesinyathelo Senyathelo (Final Certification Path)",
        lessons: [
          {
            id: "elite_l10",
            title_en: "Class 10: Step-by-Step Practical Blueprint: Executing Your First Safe Trade",
            title_zu: "Isigaba 10: Isinyathelo Ngesinyathelo sokuNgene: Indlela Enembile Yokuthatha Umhwebo Wokuqala",
            duration: "2 Hours 10 Mins",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 10, the climax of the Elite Pathway. In this final class, we consolidate everything we have covered into a simple, beautiful, step-by-step physical trading checklist. Do not open a live trading block until every single criteria in this checklist is verified. We cover: 1. Discerning the High Timeframe (Daily/H4) structural trend. 2. Locating unmitigated institutional Order Blocks or Fair Value Gaps inside premium/discount zones. 3. Waiting patiently for the session clock (London Open or New York Kill Zones). 4. Observing a lower-timeframe shift (CHoCH) on the 15-minute chart. 5. Applying the 1% risk lot size math based on Stop Loss size. 6. Setting and forgetting the trade, allowing probabilities to execute.",
            content_zu: "Siyakwamukela kwiSifundo 10. Kulesi sigaba sokugcina, sihlanganisa zonke izifundo esifunde ngazo sizenze uhlu olulula olubanzi lokugada izici zohwebo (Checklist) ngaphambi kokuthinta insimbi yokuhweba. Sihlola: Umkhondo omkhulu, isikhathi se-kill zone, uphawu lwe-CHoCH emizuzwini eyi-15, ukubala ubukhulu bengcuphe ngesibalo sika 1% stop loss size, kanye nokulinda amaphesenti namathuba asebenze ngaphandle kokuthatha imizwa eceleni.",
            resources: [
              {
                name_en: "IMALI-EDU_The_Master_Syllabus_Step-by-Step_Checklist.pdf",
                name_zu: "Uhlu_Lwesinyathelo_Ngesinyathelo_Lwesitifiketi.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: THE ELITE TRADER STEP-BY-STEP CHECKLIST
==================================================================

To protect your capital, adhere strictly to this professional master protocol before clicking 'BUY' or 'SELL':

STEP 1: D1/H4 TREND MAPPING (HTF BIAS)
- Is the Daily trend trending upwards (making consecutive Higher Highs & Higher Lows) or downwards? Identify if price has mitigated an HTF Order Block recently.

STEP 2: LOCATE STRUCTURAL IMBALANCES & KEY ZONE
- Is price inside an unmitigated High-Timeframe Fair Value Gap? Always prefer to execute trades inside 'Discount' zones (lower 50% section of the swing range) for buy setups, or 'Premium' zones (upper 50%) for sell setups.

STEP 3: THE TICKING CLOCK CHECK (TIME CONFLUENCE)
- Is the current local UTC time inside London Kill Zone (06:00 - 09:00 UTC) or NY Kill Zone (12:00 - 15:00 UTC)? If the local time is outside these zones, shut down the terminal and walk away.

STEP 4: LOWER TIMEFRAME CONFIRMATION (CHoCH)
- On the M15/M5 chart, has price swept the local swing highs/lows and executed a clear Change of Character (reversing local direction with powerful displacement)?

STEP 5: CHOOSE POSITION SCALE METHOD (1% MATH LIMIT)
- Open your Risk Preservation Calculator. Input the stop loss size in pips (derived from structural levels). Choose exactly 1.0% maximum risk. Calculate lot size.

STEP 6: SECURE INSTRUCTIONS (SET & FORGET)
- Enter the orders with structural protective Stop Loss and profit target levels in place. Turn off your monitor. Let the dynamic interbank probability play out and accept whichever outcome occurs with objective calm maturity.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: UHLU LWESINYATHELO NGESINYATHELO LOMHWEBI (CHECKLIST)
==================================================================

Silinde isitifiketi sakho! Ngaphambi kokuthatha isinqumo sokuhweba, phatha lolu hlu uhlole izinto ngezinto ezithinta ubungozi:

ISINYATHELO 1: UHLOBO LOMKHONDO (HTF BIAS)
- Ngabe isikhathi sika Daily no 4-Hour sikhomba phezulu noma phansi? Thola lapho amabhange eqondisa entengo khona.

ISINYATHELO 2: EZOMUGODI NEZOKUQAPHA (FVG & DISCOUNT)
- Linda intengo ukuthi ingene kulayini othembekile (Discount Zone) ngokuthenga ezigabeni zentengo ephansi kakhulu ehambisana ne-imbalance.

ISINYATHELO 3: ISIKHATHI SAMABHANGE (KILL ZONES)
- Ngabe usesikhathini sikayini se-London (06:00 - 09:00 UTC) noma New York (12:00 - 15:00 UTC)? Uma ungaphandle kwalelihora, vala ishadi lowo hambe uphumule.

ISINYATHELO 4: I-CHoCH (M15/M5 REVERSAL)
- Kwi-15 minutes charts, ngabe kukhona uphawu lo kuguquka wentengo kwashesha (Change of Character)?

ISINYATHELO 5: BALA INGOZI KAMANGA (1% LOT SIZE)
- Bala isiphoqelelo sika 1% maximum risk lot size ngokuthatha i-stop loss sika pair yakho ngaphambi kokucindezela inkinobho.`
              }
            ],
            quiz: {
              id: "elite_q10",
              title_en: "Elite Master Checklist Validation Quiz",
              title_zu: "Ukuhlolwa Kokugcina ngezibalo nomgudu weSitifiketi",
              questions: [
                {
                  id: "sov_q10_q1",
                  question_en: "Which step is crucial before executing *any* institutional position on GBP/USD or EUR/USD?",
                  question_zu: "Yisiphi isinyathelo esibaluleke kakhulu ngaphambi kokuthatha i-order ye-Forex emakethe?",
                  options_en: [
                    "Perform multi-timeframe mapping, check kill zone session clocks, and calculate stop-loss limits under a strict 1% risk size protocol",
                    "Verify if three indicator ribbons are showing identical purple neon colors on a 1-minute chart snapshot",
                    "Contact unregulated online signal channels to buy premium short-term alerts with leverage",
                    "Run a local CLI command continuously to override any browser frame permission constraints"
                  ],
                  options_zu: [
                    "Yenza ukuhlaziya kusuka phezulu kuye phansi, hlola ama-kill zone, bese ubala usayizi we-lot ngaphansi kwe-rule ka-1%",
                    "Bheka ukuthi imigqa emithathu ye-indicator ikukhombisa umbala ophambene kulayini we-neon",
                    "Thola izinhlelo zemiyalezo ezibizwa ngokuthi 'signals' ukuze uthenge amacebo angenasisekelo sezindaba",
                    "Sebenzisa umyalo ohlangothini lwesiteshi sakho ukushintsha i-port yenjini yabasebenzisi be-app"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "trader_mindset_psychology",
    title_en: "The Elite Mindset: Cognitive Bias & Peak Performance Psychology",
    title_zu: "Umqondo Wobuchwepheshe: Ukulawulwa Kwemizwa Nenqubo Yokuhweba",
    category_en: "Executive Mental Performance",
    category_zu: "Izinga Lempilo Nengqondo",
    difficulty_en: "Beginner to Expert",
    difficulty_zu: "Osaqala kuye kuNgcweti",
    duration_en: "12 Hours",
    duration_zu: "Amahora angu-12",
    description_en: "Unpack the psychology that separates professional fund managers from struggling retail accounts. Audit cognitive biases, construct emotional resilience rules, and execute with absolute discipline under drawdown conditions.",
    description_zu: "Hlaziya imizwa eyenza abahwebi abancane balahlekelwe imali ngenkathi izikhungo ezinkulu kakhulu zizuza profit. Funda ukulawula ukwesaba, ukugula ngenxa ye-drawdown, nendlela yokuthobela imithetho.",
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
    instructorName: "Thabiso Khumalo & Jean-Louis Cele",
    rating: 4.9,
    studentsCount: 0,
    modules: [
      {
        id: "psych_m1",
        title_en: "Module 1: Combating Cognitive Biases, FOMO & Loss Aversion",
        title_zu: "Isifundo 1: Ukulawula Ukwesaba, i-FOMO Nemizwa Yokulahlekelwa Imali",
        lessons: [
          {
            id: "psych_l1",
            title_en: "Class 1: Overcoming FOMO (Fear Of Missing Out) & Loss Aversion Bias",
            title_zu: "Isigaba 1: Uhlelo lokunqoba i-FOMO (Fear Of Missing Out) Nokwesaba Ukulahlekelwa",
            duration: "1 Hour 15 Mins",
            videoUrl: "#",
            imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 1. In this lesson, we study the biological and psychological factors that lead to retail account destruction. When retail traders see a green candle shooting up fast, their brain stimulates dopamine, triggering a severe urge to buy (FOMO). This leads to buying at the absolute peak of the market auction range, immediately before institutional algorithms execute a price correction. We construct strict, objective rules (mental filters) to filter out emotion. You will learn to recognize when your heart rate changes, when you suffer from FOMO, and how to stay entirely detached from individual trade outcomes.",
            content_zu: "Siyakwamukela kwiSifundo 1 saMamodulo we-Psychology. Lapha, sihlola imizwa eyenza abahwebi bagijimele ukuthenga uma bebona intengo ikhuphuka kakhulu (FOMO), okukugcina ngokuthi uthenge endaweni embi kakhulu lapho amabhange esezothengisa khona. Sifunda ukuzivikela emizweni yokwesaba nokufuna ukuphindisela imali uma ulahlekelwe (revenge trading).",
            resources: [
              {
                name_en: "IMALI-EDU_Professional_Emotional_Logbook_Template.pdf",
                name_zu: "Ibhuku_Lokulawula_Imizwa_Kamhwebi_Osemthethweni.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: EMOTIONAL DIARY & EXECUTIVE MENTAL PROTOCOLS
==================================================================

1. THE RULES OF SYSTEMATIC ENGAGEMENT
To operate like a professional fund manager, you must treat trading as a pure business. Never touch the terminal without a structured checklist:
- RULE 1: If I miss an entry, the trade is dead. I do not chase. Chasing prices increases drawdown risk.
- RULE 2: No revenge trading. If I hit two consecutive losses, I close the MT4 platform immediately for 24 hours.
- RULE 3: I do not trade when emotionally unstable or physically fatigued.

2. LOGICAL METRIC JOURNALING
Before opening any coordinate, log:
- The technical reason for the entry (liquidity sweep or Mitigation block).
- Current physiological state (calm, elevated, anxious, relaxed).
- Calculated stop loss size ensuring max risk remains below 1%.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: IDAYARI YEMIZWA NOKUZIBAMBA EMOTIONAL CHECKLIST
==================================================================

1. IMITHETHO NGOKOBUHLAKANI BOKUHWEBA
Ukuze uhwebe njengongcweti ozinzile ezikhungweni ezinkulu, thobela le miyalelo ngokunamandla:
- UMTHETHO 1: Uma ngiphuthwe indawo yokungena (entry), umhwebo lowo uphelile. Angizisusi emoyeni ngiwulandele.
- UMTHETHO 2: Uma ngithola ukulahlekelwa okubili kulandelana (2 losses), ngivala masinyane i-MT4 amahora angu-24.
- UMTHETHO 3: Angihwebi uma ngizwa ukukhathala kwekhanda noma umuzwa wokufuna ukuphindisela.`
              }
            ],
            quiz: {
              id: "psych_q1",
              title_en: "Cognitive Bias & Sizing Review",
              title_zu: "Ukuhlolwa Kokulawula Imizwa ne-FOMO",
              questions: [
                {
                  id: "psych_q1_q1",
                  question_en: "What should a professional trader do under strict capital preservation rules after hitting two consecutive losses during a single session?",
                  question_zu: "Yini okumele yenziwe umhwebi oqeqeshiwe ngaphansi kwemithetho yokuvikela imali yakho uma ehlangabezane namaloss amabili ngokulandelana phakathi nosuku?",
                  options_en: [
                    "Close the MT4 execution platform immediately and step away from the charts for 24 hours",
                    "Increase leverage to 10x and open larger trades to win the lost funds back instantly",
                    "Delete all current stop losses to allow the market more space to fluctuate",
                    "Change the platform settings to connect directly with an unregulated B-Book forum"
                  ],
                  options_zu: [
                    "Vala i-MT4 execution platform ngaso leso sikhathi bese uyasuka ku-computer amahora angu-24",
                    "Khulisa i-leverage iye ku-10x bese uvula ama-orders amaningi amakhulu ukuze ubuyise imali masinyane",
                    "Susa yonke imingcele yama-Stop Loss ukuze unikeze intengo ithuba elikhulu lokujikeleza",
                    "Shintsha uhlelo lwakho uxhumane ne-broker engalawulwa ngaphansi kwe-B-Book"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          },
          {
            id: "psych_l2",
            title_en: "Class 2: Constructing Your Professional Trading Plan & Hard Discipline Rules",
            title_zu: "Isigaba 2: Ukwakha Uhlelo Lobuchwepheshe Nemithetho Eqinile Yokuhweba",
            duration: "1 Hour 05 Mins",
            videoUrl: "#",
            imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 2. A strategy is worthless without execution consistency. We show you how to write an airtight, personalized Trading Plan. This includes identifying your active market sessions (London or New York open), daily profit targets, maximum drawdown limits, and logging procedures. We expose why having a written physical plan keeps your conscious mind out of panic state and in executive flow state, forcing you to execute setups purely as statistical probability models rather than emotional gambling events.",
            content_zu: "Siyakwamukela kwiSifundo 2. Uhlelo lokuhweba ngaphandle kwemithetho lufana nemoto engenamabhuleki. Kule klasi, sakha 'Professional Trading Plan' yakho ebhaliwe phansi. Ufunda ukumisa uhlelo lwezinsuku zonke, ukugada amahora we-London ne-New York session, nokuzibophezela kuyinketho yemishini yakho.",
            resources: [
              {
                name_en: "IMALI-EDU_Ultimate_Written_Professional_Plan_Framework.pdf",
                name_zu: "Umtapo_Lokwakha_Trading_Plan_Evikelekile.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: THE PROFESSIONAL OPERATIONAL PLAN CONSTRUCT
==================================================================

1. THE MASTER FORMAT OF TRADING PLANS
Your business plan must dictate every single variable before the trading day begins:
- FOCUS TIME: London Open (7:00 AM - 11:00 AM UTC) & New York Open (12:00 PM - 4:00 PM UTC). These hours contain maximum central bank volume.
- DAILY MAX DRAWDOWN: If my account equity drops by 2% on any single day, my risk engine is fully disabled. I submit to structural halts.
- EXECUTION STANDARD: Confirm Liquidity Sweep + Mitigation Block before touching order panels. Any trade entered without structural reasons is a critical penalty.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: IFOMETHI YESOBHOLO TRADING BUSINESS PLAN
==================================================================

1. ISAKHIWO SE-TRADING PLAN EMTHETHWENI
Uhlelo lwakho kumele lube nazo zonke ezemikhakha:
- I-SESSION: Uhwebelana kuphela nge-London session noma NY session (izikhathi lapho amabhange amakhulu evula uhla lwawo).
- ISILINGANISO SELOSS (2% max per day): Uma ulahlekelwa u-2% wentengo yakho ngosuku olulodwa, vala uhlelo ngokushesha ukuvimbela ingozi ebizwa ngokuthi drawdown cascade.`
              }
            ],
            quiz: {
              id: "psych_q2",
              title_en: "Elite Trading Plan Structure Check",
              title_zu: "Ukuhlolwa Kwezinhlelo ze-Trading Plan",
              questions: [
                {
                  id: "psych_q2_q1",
                  question_en: "Why is restricting your trade execution windows strictly to London and New York session opens beneficial?",
                  question_zu: "Kungani kubalulekile ukuthi ukhawulele amahora akho okuhweba kuphela nge London ne New York session open?",
                  options_en: [
                    "These hours host maximum liquidity and central bank algorithmic volume, yielding clean trends",
                    "Unregulated brokers pay a special commission bonus to B-Book traders during these sessions",
                    "All server nodes automatic ports are fully disabled during Asian sessions",
                    "It allows you to bypass the rules of leverage completely without any Margin Level drawdown"
                  ],
                  options_zu: [
                    "Lezi zikhathi inazo i-liquidity enkulu kakhulu kanye ne-volume yamabhange amakhulu we-Central banks",
                    "Ama-broker angenasimilo anikela amabhonasi ahlukile kumhwebi ohlangabezana nabo",
                    "Wonke amaseva we-MT4 ayavalwa ngesikhathi se-Asian sessions ngenkani",
                    "Ikugcina ekubeni udlule emithethweni ye-leverage ngaphandle kwemingcele ye-Margin level"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "learning_mt4_mastery",
    title_en: "MetaTrader 4 (MT4) Mastery: Practical Platform & Interface Navigation",
    title_zu: "Ukuchwepheshe ku-MetaTrader 4 (MT4): Uhlelo Nomhlahlandlela wentengo",
    category_en: "Execution Platforms & Toolsets",
    category_zu: "Izincomo Zokuhweba neMishini",
    difficulty_en: "Beginner to Intermediate",
    difficulty_zu: "Osaqala kuye kuMaphakathi",
    duration_en: "15 Hours",
    duration_zu: "Amahora angu-15",
    description_en: "A comprehensive hands-on program on how to navigate MT4/MT5 platforms, customize charts, understand bid/ask spreads, manage orders, and analyze margin requirements securely.",
    description_zu: "Uhlelo oluphelele lokufunda ukusebenzisa i-MT4 ne-MT5, ukulungisa amashadi, ukuqonda i-bid/ask spreads, ukulawula i-margin nokuvikela imali yakho ngaphandle kwama-broker amabi.",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    instructorName: "Sipho Ndlovu & Thabiso Khumalo",
    rating: 4.9,
    studentsCount: 0,
    modules: [
      {
        id: "mt4_m1",
        title_en: "Module 1: MT4 Layout, Custom Charts & Navigation",
        title_zu: "Isifundo 1: Ukuhlelwa, Amashadi, nokuZulazula ku-MT4",
        lessons: [
          {
            id: "mt4_l1",
            title_en: "Class 1: Navigating the Graphical User Interface & Market Watch",
            title_zu: "Isigaba 1: Uhlelo Lolwazi lwe-Interface ne-Market Watch",
            duration: "1 Hour 05 Mins",
            videoUrl: "https://www.youtube.com/watch?v=SgK5M20eYhE",
            imageUrl: "https://images.unsplash.com/photo-1590283657385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 1. In this hands-on lesson, we do a thorough teardown of the MetaTrader 4 desktop interface. We cover the main four sections of the screen: the Market Watch window (where bid-ask prices for EURUSD and other symbols tick live), the Navigator pane (hosting your active accounts, indicators, and scripts), the Chart Workspace (where auction history is plotted), and the Terminal/Toolbox bar at the bottom. This bottom bar is where you trace your balance, equity, margin, free margin, and active trade drawdowns. Standard retail systems omit warnings on execution slippage, but we map out exactly how price ticks travel to the server nodes.",
            content_zu: "Siyakwamukela kwiSifundo 1. Kulesi sigaba sokuqala, sihlola kabanzi uhlelo lohlelo lwe-MetaTrader 4 (MT4). Sibheka izingxenye ezine eziyinhloko: i-Market Watch (lapho kubonakala khona amanani entengo e-EURUSD nabanye ticking live), i-Navigator (lapho kuphephile khona amakhodi ne-scripts), i-Chart Workspace (lapho ubona khona umlando wentengo), ne-Terminal Toolbox phansi kakhulu lapho uhlola khona i-Balance lakho, equity, ne-Margin yakho.",
            resources: [
              {
                name_en: "IMALI-EDU_MT4_Graphical_Interface_Map.pdf",
                name_zu: "Ibalazwe_Lolwazi_le-Interface_MT4.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: METATRADER 4 LOGICAL GRAPHICAL INTERFACE
==================================================================

1. THE FOUR ESSENTIAL WINDOWS
- MARKET WATCH (Ctrl+M): The main list of financial products. Displays live Bid (sell) and Ask (buy) price changes.
- NAVIGATOR (Ctrl+N): Helps you switch accounts, find indicators, and run quantitative scripts easily.
- CHART WINDOW: The visual display of price over time.
- TERMINAL/TOOLBOX (Ctrl+T): The account control room. Displays current balance, equity, margin, margin level %, and active trades.

2. REAL TRADING WARNINGS
- Slippage: The difference between your expected price and the actual execution price. This occurs during peak news volatility.
- Server Nodes: Your broker's server network. Always select brokers with nodes physically close to main liquidity execution spots (like London and NY servers) to minimize latency-related execution gaps.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: UMHLALANDLELA WE-INTERFACE YE-METATRADER 4
==================================================================

1. IZINDAWO EZINE EZIBALULEKILEYO KWI-MT4
- MARKET WATCH (Ctrl+M): Uhlu lwazo zonke izinhlobo zezinhlelo zethu (EURUSD, GBPUSD). Likubonisa intengo ye-Bid (okuthengisa) ne-Ask (okuthenga) ngaleso sikhathi.
- NAVIGATOR (Ctrl+N): Ikhabethe elikusiza ukuba ushintshe ama-akhawunti ohwebo noma ufake ama-scripts.
- TERMINAL/TOOLBOX (Ctrl+T): Igumbi elikhulu lokulawula. Libonisa i-Balance kuku, Equity, ne-Margin onayo ngenkathi uhweba, kanye nomashuni wengozi yakho (margin level %).`
              }
            ],
            quiz: {
              id: "mt4_q1",
              title_en: "MT4 Window Navigation Analysis",
              title_zu: "Ukuhlolwa Kokuzulazula Kwamawindi e-MT4",
              questions: [
                {
                  id: "mt4_q1_q1",
                  question_en: "Where in the MT4 interface do you find your current account balance, equity, and active trades?",
                  question_zu: "Iphi ingxenye kwi-MT4 interface lapho uthola khona ama-Balance akho, equity, nezikhundla ozihwebayo (active trades) njengamanje?",
                  options_en: [
                    "In the Terminal/Toolbox panel at the bottom of the screen",
                    "Inside the corporate B-Book newsletter system",
                    "In the Indicators tab under the Navigator panel",
                    "Behind the local system administrator port network options"
                  ],
                  options_zu: [
                    "Kwipanel ye-Terminal/Toolbox phansi kweshadi lakho",
                    "Ngaphakathi kwencwadi yezindaba ngebhuku le-B-Book",
                    "Kwitabh ye-Indicators ngaphansi kwe-Navigator",
                    "Ngemuva kwezincomo ze-port network zomlawuli wesayithi"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          },
          {
            id: "mt4_l2",
            title_en: "Class 2: Customizing Charts, Candlestick Templates & Grid Controls",
            title_zu: "Isigaba 2: Ukulungisa Amashadi, ama-Candlestick Templates nemingcele we-Grid",
            duration: "55 Mins",
            videoUrl: "https://www.youtube.com/watch?v=v9ZscUuofR0",
            imageUrl: "https://images.unsplash.com/photo-1590283657385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 2. In this class, we move away from default MT4 chart settings (like the green-on-black neon grid that creates massive visual fatigue). We learn step-by-step how to configure custom, highly professional chart properties (F8 panel). We design a clean premium theme (Off-white canvas, dark charcoal bearish candles, clear gold bullish candles). We explore how to manage gridlines, period separators, zoom configurations, and save your setup as a default workspace template (.tpl), ensuring you spend your screen hours looking at clean, visually balanced auction environments rather than cluttered indicators.",
            content_zu: "Siyakwamukela kwiSifundo 2. Kulesi sigaba somsebenzi, sisusa amandla amabi we-neon grids ku-MT4 (evame ukudala ukukhathala kwamehlo) bese sifaka uhlelo oluhle lweshadi (F8). Sanelisa isithombe somsebenzisi nge-off-white background, amakhandlela obomvu (abheke phansi), namakhandlela asagolide (abheke phezulu). Ufunda nendlela yokugcina le plan (saves template) ukuze zonke izifundo zakho zivulege ngale ndlela enhle kune-clutter yemishini emibi.",
            resources: [
              {
                name_en: "IMALI-EDU_Professional_Chart_Formatting_Blueprint.pdf",
                name_zu: "Umhlahlandlela_Lokuhlelwa_Kwamashadi_Amahle.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: PREMIUM CHARTS CONFIGURATIONS (F8 SETTINGS)
==================================================================

1. THE GOLDEN CLASS SETUP RULES
A cluttered chart reflects a cluttered trading mind. Set up your charts to display only clean price action.
Steps to apply:
- Press F8: Opens Chart Properties.
- Under Common Tab: Check "Show OHLC", uncheck "Show Grid". Grid lines add massive visual noise.
- Under Colors Tab:
  * Background: Slate or Soft Light White.
  * Foreground (labels): Deep Charcoal or Black.
  * Bullish Candle (Bar Up & bull candle): Gold (#D4AF37)
  * Bearish Candle (Bar Down & bear candle): Deep Black or Charcoal Grey.

2. THE TEMPLATE BLUEPRINT
Once complete, right-click on the chart workspace, navigate to "Template", select "Save Template...", and name it "default.tpl". 
Every new financial chart you open will now launch with your exact luxury, eye-safe gold & slate design automatically.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: INDLELA EKHESTHILE YOKULETHA ISITHOMBE SEShadi
==================================================================

1. IMITHETHO YEKHWALITHI YEShadi
Ishadi eligcwele izinto eziningi lidala isiphithiphithi engqondweni yomfundi.
Inqubo yefomethi enhle:
- Cindezela u-F8: Lokhu kuvula ifasitela lamakhanda (Properties).
- Kumathebhu e-Common: Susa umaka ku-Show Grid. Imigqa eminingi (grid) idala umthelela omubi emehlweni.
- Kumathebhu e-Colors: Sethela Bull candle kumbala oyiGolid (#D4AF37) kanti i-Bear candle isethele kumbala oMnyama noma uSlate onsundu.
- Londoloza isifanekiso: Qhafaza kwesokudla ku-Template, qhafaza u-Save Template bese uyibiza ngokuthi default.tpl.`
              }
            ],
            quiz: {
              id: "mt4_q2",
              title_en: "Chart Template & Layout Properties Check",
              title_zu: "Ukuhlolwa Kwezakhi Zamashadi we-Template",
              questions: [
                {
                  id: "mt4_q2_q1",
                  question_en: "Which configuration key displays the chart properties window inside MT4 platforms?",
                  question_zu: "Iyiphi inkinobho kwi-keyboard yakho ekuvulela i-properties window (ukulungisa amashadi) ku-MT4?",
                  options_en: [
                    "F8 key on your keyboard",
                    "F1 key for system help",
                    "Ctrl+Alt+Delete to force refresh node parameters",
                    "The automatic B-Book chat connection toggle link"
                  ],
                  options_zu: [
                    "Inkinobho ka-F8",
                    "Inkinobho ka-F1",
                    "Inkinobho ka-Ctrl+Alt+Delete ukulungisa amaprosesa",
                    "Inkinobho ehambelana nama-B-Book chat links"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      },
      {
        id: "mt4_m2",
        title_en: "Module 2: Practical Order Executions & Money Metrics",
        title_zu: "Isifundo 2: Uhlelo lokuvula ama-orders nokuLawulwa kwemali",
        lessons: [
          {
            id: "mt4_l3",
            title_en: "Class 3: How to Place Trades: Market Orders vs. Limit & Stop Orders",
            title_zu: "Isigaba 3: Uyenza kanjani i-Trade: Imali ebonakalayo ne-Limit Orders vs Stop Orders",
            duration: "1 Hour 15 Mins",
            videoUrl: "https://www.youtube.com/watch?v=kYpIid_jpxE",
            imageUrl: "https://images.unsplash.com/photo-1642390091310-1ecf37332152?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 3. This is the heart of execution mastery. Placing orders incorrectly is a primary cause of accidental capital destruction. We analyze the four main order types step-by-step: 1. Market Execution (entering a trade instantly at the current ask or bid rate). 2. Buy Limit & Sell Limit orders (passive orders waiting to buy lower or sell higher than current prices, in harmony with institutional mitigation pools). 3. Buy Stop & Sell Stop orders (orders waiting to buy higher or sell lower than current prices, typically swept by banks during liquidity grabs). We outline exactly how to input Stop Loss (your ultimate capital shield) and Take Profit levels inside the MT4 prompt panel securely.",
            content_zu: "Siyakwamukela kwiSifundo 3. Lokhu kuyinhliziyo yokuthatha ama-orders emakethe. Ukufaka ama-orders ngendlela engalungile idala ukuthi ulahlekelwe yimali yakho ngengozi engenangozi. Kule klasi, sihlaziya izindlela ezine eziyinhloko: 1. Market Execution (ukuthatha umhwebo ngaso leso sikhathi). 2. Buy Limit & Sell Limit orders (ama-orders alinda ukuthenga uma intengo yehle macinge noma ukuthengisa uma inyuke phezulu). 3. Buy Stop & Sell Stop (ama-orders alinda intengo ngale kwendawo ethile). Sifunda nendlela yokufaka i-Stop Loss (isihlangu semali yakho yonke) ne-Take Profit ngendlela eqondile.",
            resources: [
              {
                name_en: "IMALI-EDU_Market_And_Pending_Orders_Reference_Sheet.pdf",
                name_zu: "Iphepha_Lokuhlola_Izinhlobo_Zezinketho_Zama-Orders.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: THE MATRIX OF TRADING ORDERS (STANDARD EXECUTIONS)
==================================================================

1. MARKET EXECUTION DIRECT ENTRY
- BUY ORDER: Places trade immediately at the live ASK price. Open positions enter a negative spread drawdown instantly (normal auction friction).
- SELL ORDER: Places trade immediately at the live BID price.

2. PENDING EXECUTIONS (THE INSTITUTIONAL STANDARD)
- BUY LIMIT: An order placed below current market price. Used when waiting for price to decline into an institutional Bullish Order Block.
- SELL LIMIT: An order placed above current market price. Used when waiting for price to mitigate a Bearish FVG.
- BUY STOP: An order placed above current price, activated as price rises past it.
- SELL STOP: An order placed below current price, activated as price drops past it. (Commonly swept as liquidity).

Rule: Never enter active trades on market executions without first calculating stop loss sizes relative to your 1% account risk limit.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: ULWAZI NGOKUFAKA AMA-TRADE NAMA-PENDING ORDERS
==================================================================

1. MARKET EXECUTION (UKUTHATHA UMHWEBO NGANGOKUNGETHEMBEKA)
- Lapho uthenga (BUY), trade ivuleka ngamanani we-Ask. Lapho uthengisa (SELL), ivuleka ngamanani we-Bid.

2. PENDING ORDERS (INDLELA YE-ELITE TRADERS)
- BUY LIMIT: Oda elibekwa ngaphansi kwentengo emakethe njengamanje. Linda intengo yehle iye kwi-Bullish Order Block ngaphambi kokukhuphuka.
- SELL LIMIT: Oda elibekwa ngaphezu kwentengo emakethe njengamanje. Linda intengo ikhuphuke iye kwi-Bearish imbalance (FVG) ngaphambi kokwehla.`
              }
            ],
            quiz: {
              id: "mt4_q3",
              title_en: "Order Execution Types Assessment",
              title_zu: "Ukuhlolwa Kwezinhlobo Zokuthengiselana Ngama-Orders",
              questions: [
                {
                  id: "mt4_q3_q1",
                  question_en: "Which type of pending order is placed below the current market price, waiting for a price drop into an institutional demand block?",
                  question_zu: "Yiluphi uhlobo lwe-order elibekwa ngaphansi kwentengo yemakethe, elilinda ukuthi intengo yehle phezulu kulandela uhlelo lwama-Order Blocks?",
                  options_en: [
                    "Buy Limit order",
                    "Buy Stop order",
                    "Market Sell execution option",
                    "High Leverage B-Book automation index"
                  ],
                  options_zu: [
                    "I-Buy Limit order",
                    "I-Buy Stop order",
                    "I-Market Sell execution order",
                    "Uhlobo lwemishini ye-B-Book ebizayo"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          },
          {
            id: "mt4_l4",
            title_en: "Class 4: Platform Leverage, Free Margin & Drawdown Math Protection",
            title_zu: "Isigaba 4: Ukulawula Amandla we-Leverage, i-Free Margin, nendlela Yezibalo ze-Drawdown",
            duration: "1 Hour 10 Mins",
            videoUrl: "https://www.youtube.com/watch?v=mK9A4vE_n8Y",
            imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 4. Here we analyze the core math that governs your account terminal statistics. Retail brokers often advertise 1:500 leverage as a gift; we expose why leverage is actually a double-edged sword designed to sweep novice accounts. Learn how to calculate: 1. Balance (total cash). 2. Equity (cash value plus or minus floating trade profits/losses). 3. Margin (the collateral locked by the broker per position size). 4. Margin Level % (the index of your account safety). Standard brokers automatically trigger a margin call or a stop-out (liquidation of all coordinates) when Margin Level % drops below 50% or 30%. Master our strict security buffers to keep your margin level above 1000% at all times.",
            content_zu: "Siyakwamukela kwiSifundo 4. Lapha sitshuza sititilika ezibalweni ezilawula i-akhawunti yakho. Ama-broker amaningi asusa emoyeni i-1:500 leverage bethi isipho, kodwa sikukhombisa lapha ukuthi i-leverage iyingozi ephezulu ekhahla ama-akhawunti alabo abangafundanga. Funda ngezibalo ze: Balance, Equity (iGugu likapeti lilonke lapho ohwebeni lunamandla), i-Margin (imali broker ayivimbayo u-oda), ne-Margin Level % (isala sokuphepha we-akhawunti yakho). Uma usebenzisa i-margin level engaphansi kuka-50%, broker uzokuvala ngama-forcing-out orders (Margin Call). Sizwa indlela yokugcina i-margin level ifudumele ngaphezu kuka-1000% njalo njalo.",
            resources: [
              {
                name_en: "IMALI-EDU_Margin_And_Account_Health_Protection_Math.pdf",
                name_zu: "Izibalo_Zempilo_Nemishini_Yezokuphepha_we_Account.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: ACCOUNT MARGIN MATHEMATICS & STOP-OUT CONTROLS
==================================================================

1. THE EQUATION RATIOS
Maintain precise awareness of your terminal status figures:
- Balance = Initial Deposit + Settled Position Profits/Losses.
- Equity = Balance + Floating Profits - Floating Losses.
- Margin = (Contract Size * Lot Size) / Leverage.
- Free Margin = Equity - Margin.
- Margin Level Percentage = (Equity / Margin) * 100.

2. TRIGGER POINTS FOR TERMINAL SHUTDOWN
- Margin Call: Occurs typically when Margin Level % drops below 100%. Represents a critical warning.
- Stop Out: Occurs when Margin Level % touches 50% or 30%. The MT4 matching broker engine automatically terminates your largest losing position to release collateral, preventing balance from entering negative zone.

Professional Safeguard: Standard risk-to-equity sizing restricts floating lot indices to ensure your Margin Level % is consistently structured above 1000% at all times.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: TIMETSHEKISO ZEZIBALO NE-STOP OUT SYSTEM
==================================================================

1. AMAFOMULA EZINKOLO KUPHEPHA
Gcina i-Akhawunti yakho iphephile ngalezi zinto:
- Margin: Uhlobo lwesibopho sezimali (collateral) esigcinwa i-broker kulo mhlaba ohweba kulo.
- Margin Level % = (Equity / Margin) * 100.

2. IBALAZWE LE-MARGIN CALL NE-STOP OUT
- Margin Call level: Uma i-margin level ifika ku-100%, uthola isixwayiso sokuthi ungena engozini enkulu.
- Stop-Out level: Uma yehla ifika ku-50% noma u-30%, injini yama-orders ye-broker izovukela i-trade yakho, iyivale ngenkani ungafuni phezulu ukuze ivikele i-akhawunti yakho ekubeni yize.`
              }
            ],
            quiz: {
              id: "mt4_q4",
              title_en: "Leverage & Margin Mathematics Assessment",
              title_zu: "Ukuhlolwa Kwezibalo Zokusetshenziswa Kwe-Margin ne-Leverage",
              questions: [
                {
                  id: "mt4_q4_q1",
                  question_en: "Which accounting figure represents your account balance plus or minus all current floating trade profits or losses in real time?",
                  question_zu: "Yisiphi isibalo sezezimali esibonisa i-Balance lakho lifakwe noma lisuswe inzuzo noma ukulahlekelwa kwezinhlelo ozivulile ngaleso sikhathi?",
                  options_en: [
                    "Account Equity",
                    "Required Margin Deposit",
                    "Initial B-Book Broker Balance",
                    "Central Node Volume Ratio"
                  ],
                  options_zu: [
                    "I-Equity ye-Akhawunti lakho",
                    "I-Margin Locked yomsebenzisi",
                    "Ibhalansi yomshini we-B-Book ekuqaleni",
                    "Amaprosesa we-Central Node"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "learning_price_action_dynamics",
    title_en: "Price Action Dynamics: Liquidity Sweeps & Structural Alignment",
    title_zu: "I-Price Action: Ukushaneleka kwe-Liquidity Noshintsho Lwentengo",
    category_en: "Core Currency & Multi-Asset Systems",
    category_zu: "Izinhlelo Zezimali Semakethe",
    difficulty_en: "Intermediate to Advanced",
    difficulty_zu: "Kuthuthukile kuye kuNgcweti",
    duration_en: "18 Hours",
    duration_zu: "Amahora angu-18",
    description_en: "Master deep chart reading without indicators. Spot institutional footprints, map order flows, and execute with precision during high-probability liquidity sweeps.",
    description_zu: "Funda ukuhlaziya amashadi ngaphandle kwezinkomba zomshini. Bona lapho amabhange ethatha imali (liquidity sweeps), landela u-BOS no-CHoCH ngendlela enembile.",
    thumbnail: "https://images.unsplash.com/photo-1590283657385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    instructorName: "Sarah Mthembu & Thabiso Khumalo",
    rating: 5.0,
    studentsCount: 0,
    modules: [
      {
        id: "pa_m1",
        title_en: "Module 1: Liquidity Mechanics & Session Footprints",
        title_zu: "Isifundo 1: Imisebenzi ye-Liquidity nemikhondo Yezikhathi",
        lessons: [
          {
            id: "pa_l1",
            title_en: "Class 1: Mapping Institutional Pools & Support/Resistance Liquidity Sweeps",
            title_zu: "Isigaba 1: Ibalazwe Le-Liquidity Pools, Ukushaneleka kwe-S&R",
            duration: "1 Hour 15 Mins",
            videoUrl: "https://www.youtube.com/watch?v=ZzE0gG8O13k",
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 1. In this lesson, we study pure market liquidity. Modern algorithms do not respect standard retail trends. Most retail courses teach that double bottoms and double tops are safe zones of support and resistance. We expose why these levels are actually the juiciest targets (liquidity pools) for major bank algorithms. Underneath every double bottom lie millions of retail sell-stops (stops from buyers). Above every double top lie buy-stops (stops from sellers). Institutional algorithms purposely push price past these exact margins to absorb this resting liquidity (referred to as a liquidity sweep) before launching a massive move in the opposite direction. Learn how to spot this activity and trade safely in harmony with smart money.",
            content_zu: "Siyakwamukela kwiSifundo 1. Kulesi sikhathi, sihlola i-Liquidity emakethe. Imishini yamabhange (algorithms) ayihloniphi amaphetheni alula wabahwebi abancane. Izincwadi eziningi zokuhweba zifundisa ukuthi i-double bottom ne-double top iyizindawo ezivikelekile (support and resistance). Sikubonisa lapha ukuthi lezi zindawo yizona ziboniso ezithandwa kakhulu amabhange amakhulu ukushanela (sweeps) yonke imali lama-stop loss ngaphambi kokuthatha imakethe iye kolunye uhlangothi. Funda ukulinda lapho kususiwe imali phezulu noma phansi ngaphambi kokungena.",
            resources: [
              {
                name_en: "IMALI-EDU_Liquidity_Pools_Sweeps_Blueprint.pdf",
                name_zu: "Uhlelo_Lokulawulwa_Kwe-Liquidity_Sweeps.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: INSTITUTIONAL LIQUIDITY MAPPING & ALGORITHMIC SWEEPS
==================================================================

1. THE LOGICAL STRUCTURE OF POOLS
Liquidity is the fuel of the financial markets. Central banks and Tier-1 market makers need massive counterpart volume to fill their large purchase blocks.
- Buy-Side Liquidity (BSL): Located above previous structural swing highs, equal double tops, or equal daily highs. Hosts buy stops from retail short sellers and buy stops from breakout buyers.
- Sell-Side Liquidity (SSL): Located below previous structural swing lows, equal double bottoms, or equal daily lows. Hosts sell stops from retail buyers and sell stop-market breakout orders.

2. SWEEP RECOGNITION PATTERN
Do not trade support/resistance directly. Wait for:
- Price to violently break below a major Support Level.
- A rapid, automatic reaction back inside the range, creating a long lower wick on the candlestick.
- This wick confirms that institutional algorithms simply swept retail sell-stops to build buy orders.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: UFUTHO LWEMAKETHE NOKUSHANELELWA KWE-LIQUIDITY POOLS
==================================================================

1. INDLELA OKUSEBENZA NGAYO I-LIQUIDITY POOLS
Imali enkulu yamabhange (Tier-1) idinga ama-orders abahwebi abancane ukuze ivule (fill) izifundo zayo ezinkulu.
- Buy-Side Liquidity (BSL): Imali elinde ngendlela yama-Stop Loss ngaphezu kwamashalofu aphezulu (equal highs, resistance).
- Sell-Side Liquidity (SSL): Imali elinde ngendlela yama-Stop Loss ngaphansi kwamashalofu aphansi (equal bottoms, support).
- Ungalokothi udlale kulezi ndawo ngqo. Linda amabhange asuse abahwebi ba retail ku SSL noma BSL (Liquidity Sweep) ngaphambi kokuhambisana nabo.`
              }
            ],
            quiz: {
              id: "pa_q1",
              title_en: "Support, Resistance & Liquidity Sweeps Check",
              title_zu: "Ukuhlolwa Kwe-Liquidity ne-Support & Resistance",
              questions: [
                {
                  id: "pa_q1_q1",
                  question_en: "What visual signal confirms that institutional algorithms have executed a liquidity sweep below a double bottom support level?",
                  question_zu: "Yiluphi uphawu oluguqukayo olubonisa ukuthi amabhange anyuse imakethe ngokususa (sweep) abantu kwi-double bottom support?",
                  options_en: [
                    "A rapid breakthrough followed by a clean, swift reversal candle leaving a long lower wick",
                    "A mandatory requirement to shut down terminal ports for maintenance",
                    "A simple horizontal grid pattern of identical candle sizes in blue and red",
                    "The automatic removal of spreads by a B-Book brokerage system"
                  ],
                  options_zu: [
                    "Ukuhamba ngokushesha bese kuguquka ikhandlela elishiya umsila omude ngaphansi (long lower wick)",
                    "Isidingo sokuthi uvale amaseva emakethe ngenxa yokulimala kwedatha",
                    "Iphethini yamakhandlela alula anombala obomvu noluhlaza asuka ohlangothini olufanayo",
                    "Ukususwa kwama-spread kwasikhathi ne-broker yakho"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "learning_macro_economics",
    title_en: "Fundamental Economic Matrix: Central Banks & Global News Flows",
    title_zu: "Uhlelo Lolwazi Lwomnotho: Amabhange Emhlaba noMthelela Wezindaba",
    category_en: "Core Currency & Multi-Asset Systems",
    category_zu: "Izinhlelo Zezimali Semakethe",
    difficulty_en: "Intermediate to Advanced",
    difficulty_zu: "Kuthuthukile kuye kuNgcweti",
    duration_en: "12 Hours",
    duration_zu: "Amahora angu-12",
    description_en: "Understand the financial gravity that dictates price trend movements. Master how interest rate policy, CPI inflation statistics, and high-impact reports shape Forex flows.",
    description_zu: "Qonda amandla amakhulu omnotho womhlaba (fundamentals). Funda indlela isinqumo sentela yamabhange (interest rates), i-inflation (CPI), ne-NFP reports emisa ngayo intengo yezimali.",
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
    instructorName: "Thabiso Khumalo & Sarah Mthembu",
    rating: 4.8,
    studentsCount: 0,
    modules: [
      {
        id: "macro_m1",
        title_en: "Module 1: Economic Fundamentals & Central Bank Interventions",
        title_zu: "Isifundo 1: Izisekelo Zomnotho nezincomo ze-Central Bank",
        lessons: [
          {
            id: "macro_l1",
            title_en: "Class 1: Interest Rate Policies, Inflation Dynamics (CPI) & US Bond Yields",
            title_zu: "Isigaba 1: Izincomo Zenani Lentela (Interest Rates), i-CPI noMthelela we-US Yields",
            duration: "1 Hour 10 Mins",
            videoUrl: "https://www.youtube.com/watch?v=mK9A4vE_n8Y",
            imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 1. In this fundamental training, we explain what makes a currency appreciate or depreciate over macro cycles. Technical analysis shows entries, but economic fundamentals dictate the overall trend. Learn about the 'Central Bank Hierarchy' (specifically the US Federal Reserve, Bank of England, and South African Reserve Bank). We break down why rising Consumer Price Index (CPI) inflation forces central banks to raise interest rates, which draws huge international سرمایہ (capital) into bonds and Treasury Yields, automatically strengthening the local currency. We map out how US Treasury yields directly control Gold flows and EURUSD trends.",
            content_zu: "Siyakwamukela kwiSifundo 1. Kulesi sifundo sezomnotho, sichaza imithombo yangempela eyenza izinhlobo zezimali zonke zenyuke noma ziwe emhlabeni. Izinhlangano zemishini yamashadi zikhombisa indawo yokungena (technical analysis), kodwa isizathu sezomnotho (fundamentals) yisona esiphoqa imakethe ukuthi iye phezulu noma phansi phakathi nenyanga. Funda ngeqhawe lezinqumo zika-Federal Reserve (US Fed), ne-SARB yaseNingizimu Afrika, noMthelela we-CPI (Consumer Price Index) elandelwayo ekufuneni i-Interest rates ezinzile.",
            resources: [
              {
                name_en: "IMALI-EDU_Fundamentals_And_Central_Banks_Glossary.pdf",
                name_zu: "Isichazamazwi_Zezomnotho_ne-Federal_Reserve.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: CLASSICAL MONETARY ECONOMIC MATRICES
==================================================================

1. INTEREST RATE POLICIES
Interest rates are the yield of a currency. If a country raises its overnight lending rate, international funds deposit capital there to capture higher returns, causing demand for that currency to skyrocket.
- US Federal Reserve (Fed): The primary driver of global dollar liquidity.
- CPI (Consumer Price Index): Measures consumer-level inflation. Higher CPI implies rising costs. The Federal Reserve reacts by raising interest rates to suppress spending.

2. BONDS AND DOLLAR INDEX CONVERSION
As US Treasuries yield rates increase, it draws international liquidity pool structures out of Gold and equities back into US Dollars, inducing downward gravity on GBPUSD and EURUSD. Align your trades with monthly bank bias.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: ULWAZI NGAMABHANGE OMNOTHO NOMHLABA (INTEREST RATES)
==================================================================

1. IMITHETHO YENANI LENTELA (INTEREST RATES)
Inani lentela liwu-yield wemali. Amabhange amakhulu alawula:
- US Fed (Federal Reserve): Idrayiva enkulu yedola (USD) emhlabeni jikelele.
- CPI (Consumer Price Index): Isilinganiso se-inflation. Uma i-CPI inyuke kakhulu, i-Fed inyusa inani lentela (interest rates) ukuze ilawule ezomnotho. Lokho kuvame ukwenza i-Dollar lenyuke kakhulu libe namandla.`
              }
            ],
            quiz: {
              id: "macro_q1",
              title_en: "Central Bank Monetary Policy Review",
              title_zu: "Ukuhlolwa Kwezomnotho Namabhange Emhlaba",
              questions: [
                {
                  id: "macro_q1_q1",
                  question_en: "What is the typical impact on a local currency when its central bank raises interest rates to combat rising CPI inflation?",
                  question_zu: "Kwenzekani kuvamile kumanani entengo yemali lapho i-Central Bank ye nani isanda inani lentela (interest rates) ukuze ifake i-inflation phansi?",
                  options_en: [
                    "The currency tends to appreciate as high yields draw in global سرمایہ (capital)",
                    "The currency instantly goes to zero due to B-book brokerage interventions",
                    "The local FTSE index completely deactivates due to structural port failure",
                    "There is no impact; currency values are controlled only by retail dashboard indicators"
                  ],
                  options_zu: [
                    "Imali leyo iyakhula inyuke amandla (appreciates) ngenxa yokuthi abatshalimali bafaka capital ukuzozuza yields ephezulu",
                    "Imali iyawa iye zero ngenxa yesiphambeko soma broker we-B-book",
                    "I-FTSE index iyavalwa ngenxa yokulimala kwasemgqeni womshini",
                    "Akunalutho olwenzekayo; intengo ilawulwa ama-indicators alula kuphela eshadini"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "learning_risk_mathematics",
    title_en: "Capital Preservation: Risk Management & Advanced Lot Sizing Mathematics",
    title_zu: "Ukubalwa Kwengozi Nezibalo: Indlela Yokulawula Nosayizi Wezimali",
    category_en: "Advanced Risk Mathematics",
    category_zu: "Izibalo Zokugada Ingozi",
    difficulty_en: "Intermediate to Advanced",
    difficulty_zu: "Kuthuthukile kuye kuNgcweti",
    duration_en: "12 Hours",
    duration_zu: "Amahora angu-12",
    description_en: "Understand the mathematical principles of capital preservation. Master leverage ratios, trade risk mathematical formulas, compound interest accounts, and tactical lot sizing scripts.",
    description_zu: "Funda izibalo ezisetshenziswa amabhange ukunqoba drawdown nemingcele yokulahlekelwa. Hlaziya amandla e-leverage uqonde ne-Risk to Reward ratio ehlelekileyo.",
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
    instructorName: "Sarah Mthembu & Sipho Ndlovu",
    rating: 4.95,
    studentsCount: 0,
    modules: [
      {
        id: "risk_m1",
        title_en: "Module 1: The Mathematics of Drawdown Recovery & Portfolio Sizing",
        title_zu: "Isifundo 1: Izibalo zokubuyisa i-Loss (Drawdown Math) noSayizi weSikhundla",
        lessons: [
          {
            id: "risk_l1",
            title_en: "Class 1: Why drawdown requires exponential gains to recover",
            title_zu: "Isigaba 1: Kungani i-Loss idinga inzuzo enkulu kakhulu ukuyilungisa",
            duration: "1 Hour 10 Mins",
            videoUrl: "#",
            imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to Class 1. Drawing down your capital degrades your recovery capacity exponentially. For example, a 10% loss requires an 11.1% gain to break even. A 50% loss requires a 100% gain to break even. A 90% loss requires a massive 900% gain just to get back to your starting balance! We break down this harsh mathematical reality and provide the exact formula for safe position sizing. Our standards restrict your risk to a maximum of 1% of your account equity per trade, ensuring that even a streak of 10 consecutive losses leaves you with 90% of your starting capital.",
            content_zu: "Siyakwamukela kwiSifundo 1. Kulesi sikhathi sezibalo, sitshengisa ukuthi i-drawdown isebenza kanjani. Uma ulahlekelwe 10% we-akhawunti yakho, udinga 11.1% ukubuyela emuva. Uma ulahlekelwe 50%, udinga 100% (ukuphinda kabili okuseleko) ukuze uthole imali yakho emuva! Sifaka amafomula enza ubufakazi balokhu ukuze ugweme ukufaka osayizi abakhulu (oversizing) abangabhubhisa u-100% wcapital yakho.",
            resources: [
              {
                name_en: "IMALI-EDU_Drawdown_Mathematics_Spreadsheet.pdf",
                name_zu: "Iphepha_Lokuhlola_Izibalo_Ze-Drawdown_Nemingcele.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: DRAWDOWN RECOVERY GEOMETRICAL FORMULA
==================================================================

1. THE EXPONENTIAL GRAVITY
The math of losing money is asymmetrical. Review the index:
- 10% loss -> 11.1% gain required to recover.
- 20% loss -> 25.0% gain required to recover.
- 30% loss -> 42.8% gain required to recover.
- 50% loss -> 100.0% gain required to recover.
- 90% loss -> 900.0% gain required to recover.

2. POSITION SIZING ALGORITHM
Calculate your standard lot size using this math formula:
Lot size = (Account Balance * Risk % multiplier) / (Stop Loss in pips * Pip Value of Asset).
Keep Risk % strictly restricted to 0.005 or 0.01 (0.5% or 1.0%). Never exceed this limit.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: TIMETSHEKISO ZEZIBALO NE DRAWDOWN RECOVERY
==================================================================

1. IZIBALO ZOMTHETHO WE-DRAWDOWN
Kunzima kakhulu ukubuyisa imali uma ulahlekelwe yingxenye enkulu:
- Unwebise 10% loss -> Udinga 11.1% gain ukubuyisa.
- Unwebise 30% loss -> Udinga 42.8% gain ukubuyisa.
- Unwebise 50% loss -> Udinga 100% gain ukubuyisa.
- Ungaphuthelwa ile fomula yokubala osayizi: Lot Size = (Balance * Risk%) / (Stop Loss in Pips * Pip Value).`
              }
            ],
            quiz: {
              id: "risk_q1",
              title_en: "Drawdown & Capital Math Assessment",
              title_zu: "Ukuhlolwa Kwezibalo ze-Drawdown ne-Account Management",
              questions: [
                {
                  id: "risk_q1_q1",
                  question_en: "If a retail account suffers a 50% financial drawdown of its trading equity, what percentage gain is required just to break even and return to the starting balance?",
                  question_zu: "Uma i-akhawunti yakho ilahlekelwa 50% wentengo yayo eyimali, udinga return percentage engakanani ukubuyisa leyo mali kuphela usele kwi-balance yokuqala?",
                  options_en: [
                    "A 100% gain is mathematically required to break even",
                    "A 50% gain is sufficient to recover the funds",
                    "A 10% automated B-Book commission bonus covers the gap",
                    "No gain is required; MT4 networks automatically reset floating accounts"
                  ],
                  options_zu: [
                    "Kudingeka inzuzo engu-100% (100% gain) ukubuyela emuva",
                    "Inzuzo engu-50% yanele ukubuyisa leyo mali",
                    "I-bonasi ye-B-Book engu-10% ihlanganisa wonke lowo mhosha",
                    "Ayikho inzuzo edingekayo; iseva ihlanganyela ama-active pips"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "learning_advanced_orderflow",
    title_en: "Institutional Order Flow: Market Depth & Volume Frameworks",
    title_zu: "Ukusetshenziswa kwe-Order Flow: Imithombo Yomthamo Wentengo namabhange",
    category_en: "Advanced Orderflow Dynamics",
    category_zu: "Ukuhlaziya Advanced Orderflow yamaBhange",
    difficulty_en: "Expert / Institutional",
    difficulty_zu: "Kuthuthukile kuye kuNgcweti",
    duration_en: "16 Hours",
    duration_zu: "Amahora angu-16",
    description_en: "Step out of charts and into actual market execution mechanics. Master market depth, order matching engines, institutional volume profile shapes, and delta analysis.",
    description_zu: "Hamba ngale kwemishini yemifanekiso yakudala. Thola indlela intengo efaniswa ngayo ku-limit order books, ukusetshenziswa kwe-Volume Profile ne-Institutional Delta analysis.",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    instructorName: "Jean-Louis Cele & Thabiso Khumalo",
    rating: 4.97,
    studentsCount: 0,
    modules: [
      {
        id: "orderflow_m1",
        title_en: "Module 1: Order Matching Engines & Volume Profiling Structures",
        title_zu: "Isifundo 1: Imishini yama-Order Matching kwi-Institutional Orderbook nomthamo",
        lessons: [
          {
            id: "orderflow_l1",
            title_en: "Class 1: How matching engines pair buyers and sellers inside the Order Book",
            title_zu: "Isigaba 1: Indlela le-Matching Engine edibanisa ngayo abathengi nabathengisi",
            duration: "1 Hour 20 Mins",
            videoUrl: "#",
            imageUrl: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=800&auto=format&fit=crop",
            content_en: "Welcome to our final institutional class. Every price tick on your chart is a direct result of two orders matching. Inside the matching engine of Tier-1 banks, passive Limit Orders are stacked in the Order Book, waiting to be consumed. On the other side, aggressive Market Orders are executed instantly, eating into those passive orders. We explore how horizontal volume nodes (Volume Profile) pinpoint where major institutional blocks were mitigated and where heavy buying and selling transpired, allowing execution entries with minuscule drawdowns.",
            content_zu: "Siyakwamukela kwiSifundo 1 seqophelo eliphezulu lohlelo lomthamo wamanani. Njalo lapho intengo ihamba (tick), lokho kuwumphumela wokuhlangana kwe-order yokuthenga neyokuthengisa. Sihlola amasu wokubamba iDatha kwi-Volume Profile ezingeni lamabhange amakhulu aseMelika (Wall Street clusters), nokuthi ifunwa kanjani i-Point of Control (POC) lapho amabhange anyakazise intengo phezulu.",
            resources: [
              {
                name_en: "IMALI-EDU_Advanced_Orderflow_And_POC_Teardown.pdf",
                name_zu: "Uhlelo_Lokulawula_Ama-Orderflow_POC_yamaBhange.pdf",
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK: THE MECHANICS OF ORDER BOOK EXECUTION ENTRIES
==================================================================

1. THE PRINCIPLES OF AUCTION MARKET THEORY
- Market Orders: Direct executions at the best available Price. These orders drive the current price auction up or down.
- Limit Orders: Passive orders waiting at specific price thresholds (Order Blocks & mitigation pools).
- Point of Control (POC): The specific price level where the highest volume was matched over an auction cycle, typically representing strong institutional fair pricing.

2. ORDER MATCHING ALGORITHM
Every aggressive buy matches a passive sell limit at the ask price. Every aggressive sell matches a passive buy limit at the bid price. Work in alignment with institutional resting orders.`,
                pdfContent_zu: `==================================================================
   IMALI NGESIZULU FINANCIAL EDUCATIONAL SYSTEM
   INCWADI: ULWAZI NGOKUFAKA AMA-TRADE NGE_ORDERBOOK NENKQUBO POC
==================================================================

1. IMITHETHO YOMTHAMO WEMAKETHE
- Point of Control (POC): Intengo lapho amabhange adlale khona umthamo omkhulu wezimali. Lena yindawo ephephile ukulinda kuyo intengo ukuba ibuye ngaphambi kokuhweba.
- Limit Orders: Kushiwo ama-orders alindile (passive orders) amabhange abeka kuyo intengo eyenzelwe ukuphindiselwa phezulu noma phansi.`
              }
            ],
            quiz: {
              id: "orderflow_q1",
              title_en: "Order Book & Point of Control Review",
              title_zu: "Ukuhlolwa Kokusetshenziswa Kwe-Orderbook ne-Volume POC",
              questions: [
                {
                  id: "orderflow_q1_q1",
                  question_en: "What does the Point of Control (POC) represent in a volume profile distribution analysis?",
                  question_zu: "Yini emelelwa iPoint of Control (POC) kwi-Volume Profile ngenkathi uhlaziya umthamo wamasheya emakethe?",
                  options_en: [
                    "The price level with the highest transaction volume over a specific time cycle",
                    "The highest position drawdown ever recorded during a session",
                    "The margin required to open a 1:500 leverage execution order",
                    "A specific system configuration port setting required to open MT4 accounts"
                  ],
                  options_zu: [
                    "Intengo evulelwe kuyo umthamo omkhulu wezimali zokuhweba kuleso sikhathi",
                    "Izinga eliphakeme kakhulu le-drawdown kwesikhathi somhwebo we-account",
                    "Inani lemali elidingeka ukuzobamba i-leverage ka 1:500 kwi-terminal",
                    "Uhlobo lwakho lohlelo lwe-port configuration ku-MT4"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  }
];

// PROGRAMMATIC COURSE GENERATOR FOR "ELITE COURSES" (TO SCALE UP TO 35 COURSES FOR COMPREHENSIVE CURRICULUM ARCHITECTURE)
const templatesList = [
  {
    title_en: "Candlestick Pattern Mastery: Identifying Trend Reversals",
    title_zu: "Ukufundwa Kwamakhandlela: Ukuqonda Izinguquko Nentengo",
    category_en: "Candlesticks & Market Sentiment",
    category_zu: "Ukuhlaziya Amakhandlela Emakethe",
    difficulty_en: "Beginner to Intermediate",
    difficulty_zu: "Osaqala kuye Phakathi",
    duration_en: "12 Hours",
    duration_zu: "Amahora angu-12",
    description_en: "Learn to identify high-probability candlestick patterns like Pin Bars, Engulfing wicks, and Morning Stars with extreme structural precision.",
    description_zu: "Funda zonke izinhlobo zama-patterns amakhandlela emakethe. Thola isizathu sokuthi kungani amabhange evula izikhundla kulezi zindawo.",
    instructor: "Thabiso Khumalo",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    lessonTitleEn: "Candlestick Sentiment & Wick Sweep Identification",
    lessonTitleZu: "I-Candlestick Sentiment kanye nokuhlambalaza kwe-Wick Sweeps",
    lessonContentEn: "Candlesticks are not mere rectangles. Each candle represents an institutional battle between supply and demand. By studying candlestick wicks, we identify liquidity sweeps where major banks grab retail stop losses before turning the market direction. Look for rejection peaks on the 4-Hour timeframe near key daily key zones.",
    lessonContentZu: "Amakhandlela emakethe awafani nama-rectangles alula. Kule isigaba, thina silinda ukukhula kwamaphethelo e-wick lapho amabhange edlala khona ngomthamo omkhulu. Thola izimpawu zokwenqatshwa kwentengo phezulu noma phansi ngezikhathi ezithize zosuku.",
    qAnswerEn: "A liquidity sweep where market resting blocks are purged.",
    qAnswerZu: "Ukuhlanzwa kwentengo lapho amabhange eqeda khona ama-orders okusaba."
  },
  {
    title_en: "Chart Structure Masterclass: Channeling Support & Resistance",
    title_zu: "Ijometri Yamashadi: Ama-Flags neziteshi Wentengo Enembile",
    category_en: "Chart Reading & Geometry",
    category_zu: "Ukuhlelwa Kwamashadi Nemizila",
    difficulty_en: "Intermediate",
    difficulty_zu: "Izinga Eliphakathi",
    duration_en: "14 Hours",
    duration_zu: "Amahora angu-14",
    description_en: "Map out the blueprint of structural price geometry. Learn to locate double bottoms, head & shoulders patterns, and horizontal support corridors.",
    description_zu: "Funda indlela yokubhala nokuhlaziya amashadi amakhulu namancane. Qonda ukuthi amabhange adlala kanjani uma wonke umuntu ebuka into eyodwa.",
    instructor: "Sarah Mthembu",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    lessonTitleEn: "Multi-Timeframe Structure & Breakout Integrity",
    lessonTitleZu: "Ukwakheka kwama-Timeframe amaningi nama-Breakouts amasha",
    lessonContentEn: "A chart pattern is only valid when placed in proper market context. A bullish flag forming at a weekly premium level has a high probability of failure. Conversely, a breakout at discount support offers tight stop loss placements. Analyze structures starting from the Daily chart downwards.",
    lessonContentZu: "Uhlobo lwamashadi luba nempumelelo kuphela uma ulubeka endaweni efanele. Gada ukugcwala kwentengo phezulu noma phansi ohlelweni lwakho lokuhweba ngezikhathi zansuku zonke.",
    qAnswerEn: "Aligning Daily trends with 15-minute execution entries.",
    qAnswerZu: "Ukuhlanganisa imizila yezikhathi zansuku zonke namanyathelo we-15 minutes."
  },
  {
    title_en: "Technical Indicators Paradigm: RSI Divergence & Trend Lines",
    title_zu: "Izinkomba Zobuchwepheshe: Ukuhlanganisa i-RSI ne-Moving Averages",
    category_en: "Technical Analysis Foundations",
    category_zu: "Ukuhlaziya Ngezibalo Nemininingwane",
    difficulty_en: "Beginner",
    difficulty_zu: "Osaqala",
    duration_en: "16 Hours",
    duration_zu: "Amahora angu-16",
    description_en: "Discover how to decode technical indicators correctly without falling into the common trap of chart over-cluttering.",
    description_zu: "Gwema ukufaka izinkomba eziningi ezididayo. Funda indlela eyiyo nesebenzayo yokufaka ama-moving averages ne-RSI ukubamba umnyakazo.",
    instructor: "Sipho Ndlovu",
    thumbnail: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=800&auto=format&fit=crop",
    lessonTitleEn: "Momentum Divergence & Standard Deviation Bands",
    lessonTitleZu: "I-RSI Divergence nezindlela zokubala Momentum",
    lessonContentEn: "RSI is primarily utilized to identify shifts in momentum. When price sets a higher high but the RSI establishes a lower high, it indicates bearish divergence—a warning that buying pressure is depleting. Use this parameter solely at established supply corridors.",
    lessonContentZu: "Inkomba ye-RSI isebenziswa ukubona igazi elisha emakethe kanti futhi sitshengisa ukuthi amandla entengo ayaphela uma kukhona i-divergence phakathi kwentengo nenkomba.",
    qAnswerEn: "Price and RSI making opposite high/low parameters.",
    qAnswerZu: "Intengo ne-RSI kwenza imigqa ehlukene phakathi phezulu noma phansi."
  },
  {
    title_en: "MT5 Professional Terminals: Configuration & Setup Algorithms",
    title_zu: "Ukufundwa kuka-MT5: Uhlelo Lolwazi Nobuchwepheshe",
    category_en: "MT4 / MT5 Platforms & Execution",
    category_zu: "Amapulatifomu Ohwebo Nobuchwepheshe",
    difficulty_en: "Beginner",
    difficulty_zu: "Osaqala",
    duration_en: "8 Hours",
    duration_zu: "Amahora angu-8",
    description_en: "Program your execution platform to perfection. Run diagnostic reviews on pending orders, leverage settings, and margin parameters.",
    description_zu: "Funda konke mayelana neseva ye-MT5 kwi-mobile nakwi-computer. Thola indlela yokubala ama-lot nokufunda amashadi e-terminal.",
    instructor: "Thabiso Khumalo",
    thumbnail: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop",
    lessonTitleEn: "Order Routing, Slippage Control & Multi-Terminal Setup",
    lessonTitleZu: "Ukuhlelwa kwama-Orders (Market vs Limit) nokubala ama-Lots",
    lessonContentEn: "MetaTrader platforms route orders via specific broker servers. Learn how to configure terminal templates, set instant execution warnings, and manage multiple sub-accounts without computational latency. Master the absolute distinction between instant execution and pending limit thresholds.",
    lessonContentZu: "Uhlelo we-MT5 lukunika amandla wokulawula ama-orders lula. Funda ukubeka ama-buy limit na-sell limit ezindaweni lapho ungadingi khona ukulinda usuku lonke.",
    qAnswerEn: "Pending Limit Orders target resting price pools with zero slippage.",
    qAnswerZu: "Ama-Limit Orders abekwa ezindaweni ezikhethekile ukunciphisa i-slippage."
  },
  {
    title_en: "Macro Interest Rate Differentials: Central Bank Policies",
    title_zu: "Izisekelo Zomnotho Onemthelela Enzuzweni: AmaBhange Amakhulu",
    category_en: "Macro Economic Fundamentals",
    category_zu: "Ezomnotho Nezemakethe",
    difficulty_en: "Advanced",
    difficulty_zu: "Izinga Elikhulu",
    duration_en: "18 Hours",
    duration_zu: "Amahora angu-18",
    description_en: "Analyze the core mechanics behind currency valuations. Learn how Central Bank announcements directly fuel interbank liquidity gaps.",
    description_zu: "Hlaziya amaphepha omnotho we-GDP, i-CPI nezilinganiso zenzuzo yamabhange amakhulu emhlabeni. Sebenzisa lokhu ulungele umnyakazo wentengo.",
    instructor: "Jean-Louis Cele",
    thumbnail: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=800&auto=format&fit=crop",
    lessonTitleEn: "The Yield Curve Paradox & Interest Arbitrage Flow",
    lessonTitleZu: "I-Yield Curves kanye nokuhluka Kezomnotho Emhlabeni",
    lessonContentEn: "Interest rates are the lifeblood of currency values. If a central bank hikes interest rates, international yield-seeking capital flows into that currency, driving up demand. Learn how to trade the interest rate differentials without taking directional speculative risks.",
    lessonContentZu: "Ukuphakama kwezilinganiso zenzuzo (interest rates) kwandisa inzuzo wemali yakwezo hwebo. Thola ukuthi amabhange adlala kanjani ngalezozindaba ezishisayo.",
    qAnswerEn: "Money flows toward the currency holding higher real yield returns.",
    qAnswerZu: "Imali ihamba kakhulu iye kwimali enemba yezinga lenzuzo ephakeme."
  },
  {
    title_en: "Advanced Orderflow Footprints: Mastering Volume Clustering",
    title_zu: "Ukusetshenziswa Kwe-Order Book: Uhlelo Lomthamo Wolwazi",
    category_en: "Order Flow Depth",
    category_zu: "Ukuhlaziya Advanced Orderflow yamaBhange",
    difficulty_en: "Expert",
    difficulty_zu: "Izinga Elikhulu Ne-Expert",
    duration_en: "24 Hours",
    duration_zu: "Amahora angu-24",
    description_en: "Bypass standard chart candlesticks. Dive into bid-ask order books to observe active algorithmic orders and resting institutional supply blocks.",
    description_zu: "Hamba ngale kwemishini yemifanekiso yakudala. Thola indlela intengo efaniswa ngayo ku-limit order books, ukusetshenziswa kwe-Volume Profile ne-Institutional Delta analysis.",
    instructor: "Jean-Louis Cele",
    thumbnail: "https://images.unsplash.com/photo-1638274553228-69cdbe509449?q=80&w=800&auto=format&fit=crop",
    lessonTitleEn: "The Depth-of-Market (DOM) Bid-Ask Cluster Analysis",
    lessonTitleZu: "Ukuhlaziya i-Depth of Market (DOM) kanye noUmthamo POC",
    lessonContentEn: "Inside the Depth of Market, you see passive resting orders waiting to be swept. When high-volume aggressive buyers consume passive sell limit blocks at the Ask, price goes up. Learn how order book balance forecasts immediate intraday shifts with 1-pip precision.",
    lessonContentZu: "Kwi-Depth of Market sitshengisa ama-order e-passive alinde emugqeni. Lapho uhweba kwi-POC thola imigqa efanele amaphuzu amakhulu wokuhlasela wentengo.",
    qAnswerEn: "Depth of Market displays resting passive buy/sell orders at current ticks.",
    qAnswerZu: "I-DOM itshengisa ama-order alindile phezulu noma phansi entengo yamanje."
  },
  {
    title_en: "The Trading Plan Matrix: Structuring Professional Guardrails",
    title_zu: "Uhlelo Lokubhala Umhlahlandlela: Imithetho Yesikhundla",
    category_en: "Trading Psychology & Guidelines",
    category_zu: "Uqondo Nezempilo Yabahwebi",
    difficulty_en: "Intermediate",
    difficulty_zu: "Izinga Eliphakathi",
    duration_en: "10 Hours",
    duration_zu: "Amahora angu-10",
    description_en: "Create a rigorous, rules-based business plan for execution. Guard yourself from impulsive over-exposure and technical burnout.",
    description_zu: "Vimbela ukulahlekelwa yimali ngenxa yokuthukuthela noma ukusaba emaketheni. Gcina ingqondo izinzile futhi ulandele imithetho njalo.",
    instructor: "Sarah Mthembu",
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
    lessonTitleEn: "Execution Checklists & Post-Session Performance Diagnostic Reviews",
    lessonTitleZu: "Ukubhalisa Imiphumela Yokuhweba (Trading Journal Guidelines)",
    lessonContentEn: "A professional trader has strict criteria before opening an MT5 chart. This class provides a 5-variable checklist: session timing alignment, structural key support clearance, liquidity sweep verification, risk-to-reward boundary clearance, and psychological baseline checks.",
    lessonContentZu: "Umhwebi oqeqeshiwe unemithetho emihlanu akayiphuli neze. Kulesi sikhathi sizokuxhasa ngohlaka lokubhala yonke imikhuba nemiphumela yakho.",
    qAnswerEn: "A strict pre-execution matrix that preserves capital during high drawdown.",
    qAnswerZu: "Umthetho wokugada ikhombisa i-capital phambi kwanoma yisiphi isinqumo."
  },
  {
    title_en: "Multi-Timeframe Structure Confluence: Hour-to-Minute Entries",
    title_zu: "Ukuhlangana Kwe-Structure Sezikhathi: Ukuhlaziya Confluence",
    category_en: "Technical Analysis Foundations",
    category_zu: "Ukuhlaziya Ngezibalo Nemininingwane",
    difficulty_en: "Intermediate to Advanced",
    difficulty_zu: "Phakathi kuye Phambili",
    duration_en: "16 Hours",
    duration_zu: "Amahora angu-16",
    description_en: "Formulate trades that align the Weekly flow with the 5-Minute Entry candle. Achieve low-drawdown entries with high risk-to-reward dynamics.",
    description_zu: "Funda ukuthi ungahlangana kanjani namashadi amakhulu ngezikhathi ze-4H ne-1D, bese ufaka i-trade kwi-15M nembile kakhulu.",
    instructor: "Thabiso Khumalo",
    thumbnail: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop",
    lessonTitleEn: "Fractal Market Geometry & The Correlation Catalyst Breakdown",
    lessonTitleZu: "I-Fractal Price Geometry kanye nemigqa ye-Intraday Cycles",
    lessonContentEn: "Trading markets are fractal; the same structure seen on a weekly chart replicates on a 5-minute timeframe. Learn how to define institutional boundaries on high frames and refine execution trigger signals to a narrow structural peak, improving efficiency.",
    lessonContentZu: "Amashadi wonke afana no-fractal geometry, okusiza ukuthi sithole ama-pattern afanayo kusukela kumasonto kuye emizuzwini emihlanu.",
    qAnswerEn: "High-probability entries aligned with high timeframe structural trends.",
    qAnswerZu: "Ukungena emakethe kwi-timeframe encane kuhambisane nemigqa emikhulu."
  },
  {
    title_en: "Stock Indices Breakdown: High Velocity of NAS100 & US30",
    title_zu: "Ukuhweba Ngamasheya Amakhulu: Imodeli we-NAS100 ne-US30",
    category_en: "Chart Reading & Geometry",
    category_zu: "Ukuhlelwa Kwamashadi Nemizila",
    difficulty_en: "Advanced",
    difficulty_zu: "Izinga Eliphezulu",
    duration_en: "15 Hours",
    duration_zu: "Amahora angu-15",
    description_en: "Master index volatility behavior. Learn structural differences when trading commercial baskets like NAS100 and US30 compared to FX.",
    description_zu: "Qonda ukugcwala kwentengo (volatility) yezinkampani ezinkulu zaseMelika ezifana ne-NASDAQ ne-Dow Jones ukuze uvikele ubu-capital.",
    instructor: "Jean-Louis Cele",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    lessonTitleEn: "Intraday Sessions, New York Open Momentum & Basket Rebalancing",
    lessonTitleZu: "I-New York Session Dynamics nama-Index Rebalancing Cycles",
    lessonContentEn: "Stock index baskets like NAS100 have specific session behavior. The highest volatility sweeps occur in the first hour of the New York trading session. Learn structural gap fill zones and corporate rebalancing intervals without emotional or technical drawdown factors.",
    lessonContentZu: "Izimakethe zezinkampani ezifana no-US30 zinyakaza kakhulu ngezikhathi we-New York Open. Funda ukuvikela i-account kulezizikhathi ngezibalo.",
    qAnswerEn: "New York open session creates high institutional volume sweeps.",
    qAnswerZu: "Ukuvuleka kweseshoni yaseNew York kuletha umthamo ozinzile wezimali."
  },
  {
    title_en: "Risk-to-Reward optimization: Designing 1:5 Execution Matrix",
    title_zu: "Izibalo Zokuhweba Ngengatsho: I-Risk to Reward Guidelines",
    category_en: "Advanced Risk Mathematics",
    category_zu: "Izibalo Zokugada Ingozi",
    difficulty_en: "Advanced",
    difficulty_zu: "Izinga Eliphezulu",
    duration_en: "12 Hours",
    duration_zu: "Amahora angu-12",
    description_en: "Construct custom trading equations where a single win recovers up to five consecutive minor structural stop-out losses cleanly.",
    description_zu: "Funda izibalo ezisetshenziswa amabhange ukunqoba drawdown nemingcele yokulahlekelwa. Hlaziya amandla e-leverage uqonde ne-Risk to Reward ratio.",
    instructor: "Sipho Ndlovu",
    thumbnail: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop",
    lessonTitleEn: "The Asymmetric Mathematical Portfolio Advantage Engine",
    lessonTitleZu: "Izibalo ze-Risk-to-Reward dynamic kanye no-Stop Loss Buffer",
    lessonContentEn: "A trader with a 33% win rate can remain highly profitable by maintaining a minimum risk-to-reward ratio of 1:3 or greater. Learn to hold winning trades to key target boundaries while actively positioning stop loss markers to break-even to eliminate liability.",
    lessonContentZu: "Inhloso kule isigaba ukuthola amasethi akhipha imali ephindwe kahlanu kunaleyo obekwe engcupheni, okuqinisekisa inzuzo ezinzile.",
    qAnswerEn: "Maintaining asymmetric equations where gains exceed losses.",
    qAnswerZu: "Ukugcina izibalo lapho inzuzo ingaphezu kokulahlekelwa kakhulu."
  }
];

// GENERATE EXPLOITS TO COVER 20 - 50+ COURSES (WE WEAVE MULTIPLE DYNAMIC PATHWAYS FOR EXTRA DEPTH)
const generatedCourses: Course[] = [];

// Create 28 courses dynamically using templates and permutations of topics
for (let i = 1; i <= 28; i++) {
  const template = templatesList[(i - 1) % templatesList.length];
  const courseId = `gen_course_${i}`;
  const indexStr = i < 10 ? `0${i}` : `${i}`;
  
  // Custom variations per iteration to avoid exact duplicates and give real flavor
  const difficultyLevels = [
    { en: "Foundation to Mastery", zu: "Izisekelo kuye kuNgcweti" },
    { en: "Intermediate Level Core", zu: "Izinga eliphakathi" },
    { en: "Professional Core Curriculum", zu: "Uhlelo lwabaQeqeshiwe" },
    { en: "Elite / Specialized", zu: "Izinga eliphakeme kakhulu" }
  ];
  const selectedDiff = difficultyLevels[i % difficultyLevels.length];
  
  const ratingVal = parseFloat((4.8 + (i % 3) * 0.08 + (i % 2) * 0.04).toFixed(2));
  const studentCountVal = 0;
  
  generatedCourses.push({
    id: courseId,
    title_en: `Academy Unit ${indexStr}: ${template.title_en} (${selectedDiff.en})`,
    title_zu: `Isiqephu ${indexStr}: ${template.title_zu} (${selectedDiff.zu})`,
    category_en: template.category_en,
    category_zu: template.category_zu,
    difficulty_en: selectedDiff.en,
    difficulty_zu: selectedDiff.zu,
    duration_en: template.duration_en,
    duration_zu: template.duration_zu,
    description_en: `${template.description_en} This accredited educational unit represents premium curriculum standard v3.2.`,
    description_zu: `${template.description_zu} Leli thuba elifundiswayo limelwe amazinga aphezulu we-curriculum yezezimali nengqondo.`,
    thumbnail: template.thumbnail,
    instructorName: template.instructor,
    rating: ratingVal > 5.0 ? 5.0 : ratingVal,
    studentsCount: studentCountVal,
    modules: [
      {
        id: `gen_mod_${courseId}_1`,
        title_en: "Section A: Core Technical Framework",
        title_zu: "Ingxenye A: Izisekelo Nebamba Lozazi",
        lessons: [
          {
            id: `gen_lesson_${courseId}_1`,
            title_en: `Class 1: ${template.lessonTitleEn} (Technical Diagnostics)`,
            title_zu: `Isigaba 1: ${template.lessonTitleZu} (Amazinga Wezebalo)`,
            duration: "1 Hour 10 Mins",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            imageUrl: template.thumbnail,
            content_en: template.lessonContentEn,
            content_zu: template.lessonContentZu,
            resources: [
              {
                name_en: `ELITE-EDU_${courseId}_Standard_Manual.pdf`,
                name_zu: `ELITE-EDU_${courseId}_Incwadi_Yezifundo.pdf`,
                type: "pdf",
                url: "#",
                pdfContent_en: `==================================================================
   ELITE COURSES FINANCIAL EDUCATIONAL SYSTEM
   HANDBOOK REFERENCE CODE: ${courseId.toUpperCase()}
   TOPIC: ${template.title_en.toUpperCase()}
==================================================================

1. THE SYSTEMIC BASELINE
This module provides the advanced conceptual framework for analyzing the price chart. To succeed, the student must apply quantitative risk guidelines and separate portfolio growth from daily emotional swings.

2. EXECUTION PRINCIPLES
- Restrict lot sizing dynamically based on margin free limits.
- Set Stop Loss markers immediately upon trade placement inside the MT5 client terminal.
- Never chase high-impact news releases without statistical backtesting buffers.`,
                pdfContent_zu: `==================================================================
   ELITE COURSES FINANCIAL EDUCATIONAL SYSTEM
   UHLAKA LWEZITHEMBISO NEZIFUNDO REFERENCE: ${courseId.toUpperCase()}
   TOPIC: ${template.title_zu.toUpperCase()}
==================================================================

1. IMITHETHO EBALULEKILEYO
Leli qembu lezifundo likunika ulwazi olunzulu mayelana nezibalo zomthamo womhlaba jikelele. Vikela ama-capital yakho ngezibalo ezaziwayo ezingeni lamabhange amakhulu.

2. ISINYATHELO EZIBALULEKILEYO
- Misa i-stop loss sikhathi sonke lapho uvula i-trade lula ku-terminal.
- Sebenza ngo sayizi ongamahlula (0.01 kuye ku 0.10 lots max) ukuvimbela redrawdown engadingeki ya-account.`
              }
            ],
            quiz: {
              id: `gen_quiz_${courseId}_1`,
              title_en: "Core Technical Concepts evaluation",
              title_zu: "Ukuhlaziywa kanye noKuhlolwa kweSifundo",
              questions: [
                {
                  id: `gen_q_${courseId}_q1`,
                  question_en: `What is the primary objective of this ${template.category_en} educational lesson?`,
                  question_zu: `Yini inhloso enkulu yalesi sifundo se-${template.category_zu}?`,
                  options_en: [
                    template.qAnswerEn,
                    "To locate daily leverage codes and broker bonus structures",
                    "To connect external robotic servers to trigger automatic trades in MT5",
                    "To copy professional signals from social networks and hope for easy wins"
                  ],
                  options_zu: [
                    template.qAnswerZu,
                    "Ukuthola ama-broker abeka amabonasi amaningi entengo",
                    "Ukufaka amarobhothi azodlala ngokuzenzakalelayo kwi-terminal",
                    "Ukukopisha ama-signals alula ezinkundleni zokuxhumana"
                  ],
                  correctAnswerIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  });
}

const courses21to33Raw = [
  {
    id: "elite_onedrive_c21_masterclass",
    num: 21,
    title_en: "IMALI Elite Strategy 21: Advanced Candlestick Liquidity - Wick Sweeps & Rejection Blocks",
    title_zu: "I-IMALI Elite Strategy 21: Ukuhlungwa Kwamakhandlela - Wick Sweeps nama-Rejection Blocks",
    desc_en: "Demystifying the mechanics of wick sweeps, hunting resting liquidity pools, and executing trades off rejection blocks.",
    desc_zu: "Uhlaka oluphelele lokufunda ukuhlanzwa kwentengo emsileni wekhandlela nokungena emakethe kwi-rejection block.",
    video: "https://jumpshare.com/embed/eFGOtEFCgzQHW9QgaSnG",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 21: Master Class Video - Wick Sweeps, Rejection Blocks & Order Fills",
    lesson_zu: "Isigaba 21: Ividiyo ye-Master Class - Wick Sweeps, Rejection Blocks & Order Fills",
    content_en: "Welcome to class 21 of our IMALI Elite sequences. In this master class, we analyze the physical structure of candlestick wicks. You will learn to recognize when a wick sweep indicates genuine reversal versus when it is a trap, how to draw high-probability rejection blocks on MT5, and how to place limit entries at the 50% threshold of the block.",
    content_zu: "Siyakwamukela esigabeni samashumi amabili nanye se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngokuhlunga amakhandlela emakethe. Uzofunda ukuthi umbila wentengo uphelelaphi, nokuthi ungawabona kanjani ama-wick sweeps.",
    pdf_en: "1. WICK SWEEP MECHANICS: A liquidity purge where rest orders are cleared.\n2. REJECTION BLOCK: Drawing zone from the high/low of the candle to the close.",
    pdf_zu: "1. IZIBALO ZEKHANDLELA: Indlela amabhange anyakazisa ngayo intengo.\n2. REJECTION BLOCK: Ukudweba umugqa phakathi kwendawo ephezulu nokuvaleka kwekhandlela.",
    q_en: "What structural element forms when a high-timeframe candle wick sweeps liquidity and immediately closes back inside the range?",
    q_zu: "Yini eyenzekayo uma ikhandlela lishaqisa liquidity bese livalela ngaphakathi kwe-range ngokushesha?",
    ans_en: "Liquidity Sweep / Rejection Block",
    ans_zu: "Liquidity Sweep / Rejection Block"
  },
  {
    id: "elite_onedrive_c22_masterclass",
    num: 22,
    title_en: "IMALI Elite Strategy 22: Institutional Market Structure Shift (MSS) vs. CHoCH",
    title_zu: "I-IMALI Elite Strategy 22: Ukuguquka Kwe-Structure (MSS) ne-CHoCH",
    desc_en: "Learn the mechanical difference between a minor Change of Character (CHoCH) and a major Market Structure Shift (MSS) for high-probability reversals.",
    desc_zu: "Funda umehluko phakathi kwe-Change of Character (CHoCH) encane kanye ne-Market Structure Shift (MSS) enkulu.",
    video: "https://jumpshare.com/embed/1TnU1upIWGW1SjDawgpM",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 22: Master Class Video - MSS vs. CHoCH Mechanics & Displacement Identification",
    lesson_zu: "Isigaba 22: Ividiyo ye-Master Class - MSS vs. CHoCH & displacement analysis",
    content_en: "Welcome to class 22 of our IMALI Elite sequences. Here we analyze structure shifts. You will learn to recognize true displacement (strong institutional selling or buying candles) which validates an MSS, compared to slow, choppy price movements which represent a trap or simple CHoCH.",
    content_zu: "Siyakwamukela esigabeni samashumi amabili nambili se IMALI Elite sequence yethu. Kule vidiyo, thina sifunda ngokuhlunga imigqa ye-market structure. Uzofunda umehluko phakathi kwe-displacement yangempela no-slow movement.",
    pdf_en: "1. DISPLACEMENT: Large candles indicating institutional involvement.\n2. MSS vs CHoCH: CHoCH occurs first, MSS confirms shift of trend on high timeframes.",
    pdf_zu: "1. DISPLACEMENT: Amakhandlela amakhulu asitshengisa amandla wamabhange.\n2. MSS vs CHoCH: I-CHoCH yenzeka kuqala, i-MSS iqinisekisa ukuphela komgila we-HTF.",
    q_en: "What key feature validates a true Market Structure Shift (MSS) compared to a minor trend pullback?",
    q_zu: "Yini eqinisekisa i-Market Structure Shift (MSS) yangempela kunomnyakazo omncane entengweni?",
    ans_en: "Displacement (strong impulsive candles)",
    ans_zu: "Displacement (strong impulsive candles)"
  },
  {
    id: "elite_onedrive_c23_masterclass",
    num: 23,
    title_en: "IMALI Elite Strategy 23: Order Block Refinement - Volume Imbalances & Mitigation Blocks",
    title_zu: "I-IMALI Elite Strategy 23: Uhlelo lwe-Order Blocks - Volume Imbalances ne-Mitigation",
    desc_en: "Mastering order block refinement down to the 1-minute chart, understanding volume imbalances, and capitalizing on mitigation blocks.",
    desc_zu: "Ukuhlunga ama-order blocks kwi-timeframe encane, ukubamba ama-volume imbalances, kanye nokuphathwa kwama-mitigation blocks.",
    video: "https://jumpshare.com/embed/5q7ij7uSrYnZzEHz0yVa",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 23: Master Class Video - Order Block Refinement, Mitigation Blocks & Volume Imbalances",
    lesson_zu: "Isigaba 23: Ividiyo ye-Master Class - Ukuhlunga Order Blocks & Mitigation Blocks",
    content_en: "Welcome to class 23 of our IMALI Elite sequences. In this master class, we study how to refine daily and 4H order blocks down to the 15-minute and 5-minute charts for tight stop losses. You will also learn to identify volume imbalances (gaps between candlestick bodies) and trade mitigation blocks.",
    content_zu: "Siyakwamukela esigabeni samashumi amabili nantathu se IMALI Elite sequence yethu. Kule vidiyo, sikhombisa ukuhlunga amabhlogo amakhulu (order blocks) uwayise kwisikhathi semizuzu.",
    pdf_en: "1. ORDER BLOCK REFINEMENT: Shifting down from 4H to 15M/5M.\n2. MITIGATION BLOCK: A failed order block where price breaks through and then retests.",
    pdf_zu: "1. UKUHLUNGA ORDER BLOCK: Ukushintsha ukusuka kwi-4H uye kwi-15M.\n2. MITIGATION BLOCK: I-order block ehlulekile lapho intengo idlula khona bese iyayihlola futhi.",
    q_en: "What is a mitigation block in institutional price delivery model?",
    q_zu: "Yini i-Mitigation Block ku-Price Delivery yezikhundla zamabhange?",
    ans_en: "A failed order block that price breaks and subsequently retests",
    ans_zu: "A failed order block that price breaks and subsequently retests"
  },
  {
    id: "elite_onedrive_c24_masterclass",
    num: 24,
    title_en: "IMALI Elite Strategy 24: Advanced Fair Value Gaps (FVG) - BPR & Reclaimed Gaps",
    title_zu: "I-IMALI Elite Strategy 24: Uhlelo lwama-FVG - Balanced Price Ranges (BPR)",
    desc_en: "Deconstructing advanced liquidity imbalances, mapping Balanced Price Ranges (BPR), and identifying high-probability entry targets.",
    desc_zu: "Ukuhlaziya izikhala zamanani (Fair Value Gaps), i-BPR, nokubamba i-reclaimed gap ngezikhathi zezikhundla zamabhange.",
    video: "https://jumpshare.com/embed/ebjM08ir6fi7RtijLlZo",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 24: Master Class Video - Fair Value Gaps, Balanced Price Ranges & Reclaimed Imbalances",
    lesson_zu: "Isigaba 24: Ividiyo ye-Master Class - FVG, Balanced Price Ranges & Reclaimed Gaps",
    content_en: "Welcome to class 24 of our IMALI Elite sequences. This class goes deep into liquidity voids. You will learn about standard FVGs, and how to identify Balanced Price Ranges (BPR)—where price leaves a gap on both sides of structural runs.",
    content_zu: "Siyakwamukela esigabeni samashumi amabili nane se IMALI Elite sequence yethu. Kule vidiyo, thina sifunda ngezikhala zamanani ezibizwa ngokuthi ama-Fair Value Gaps kanye no Balanced Price Ranges.",
    pdf_en: "1. BALANCED PRICE RANGE (BPR): A zone where double FVGs overlap from opposing directions.\n2. RECLAIMED GAP: An imbalance that was previously filled and acts as resistance/support.",
    pdf_zu: "1. BALANCED PRICE RANGE: Lapho kukhona khona ama-FVG amabili overlapping.\n2. RECLAIMED GAP: Isikhala esake sagcwaliswa esesisebenza njengomgoqo omusha.",
    q_en: "What occurs when two Fair Value Gaps from opposing buy and sell runs overlap on your MT5 chart?",
    q_zu: "Yini eyenzekayo uma ama-Fair Value Gaps amabili ahlukene ehlangana eshadini lakho?",
    ans_en: "Balanced Price Range (BPR)",
    ans_zu: "Balanced Price Range (BPR)"
  },
  {
    id: "elite_onedrive_c25_masterclass",
    num: 25,
    title_en: "IMALI Elite Strategy 25: Multi-Timeframe Structural Mapping - HTF Directional Bias",
    title_zu: "I-IMALI Elite Strategy 25: Ukuhlelwa kwama-Timeframe - HTF Directional Bias",
    desc_en: "Achieve complete structural alignment from Weekly, Daily, and 4-Hour charts down to lower-timeframe entry execution candles.",
    desc_zu: "Ukuhlanganisa izikhathi ezinkulu (Weekly, Daily, 4-Hour) ukuze uthole umgwaqo entengo owuyena, bese usebenzisa izikhathi ezincane.",
    video: "https://jumpshare.com/embed/BP9i8UI7xBk3A96EH1SS",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 25: Master Class Video - Top-Down Mapping, HTF Bias & Intraday Structure Integration",
    lesson_zu: "Isigaba 25: Ividiyo ye-Master Class - Top-Down Analysis, HTF Bias & Execution",
    content_en: "Welcome to class 25 of our IMALI Elite sequences. In this master class, we analyze top-down market structure. You will learn how to map weekly swings, define the daily direction, establish key 4H trading ranges, and then execute precise entries on the 15-minute chart.",
    content_zu: "Siyakwamukela esigabeni samashumi amabili nesihlanu se IMALI Elite sequence yethu. Kule vidiyo, sikhombisa igxathu negxathu lokuhlaziya amashadi amakhulu (Weekly/Daily).",
    pdf_en: "1. DIRECTIONAL BIAS: Higher timeframe establishes trend order.\n2. REFINEMENT: Entering on M15 near Daily order blocks reduces stop-loss distance.",
    pdf_zu: "1. DIRECTIONAL BIAS: Izikhathi ezinkulu zikunika indlela nesiqiniseko.\n2. REFINEMENT: Ukungena emakethe kwi-timeframe ye-15M kunciphisa ubungozi bendaba.",
    q_en: "Why is the higher timeframe (Weekly/Daily) trend crucial for retail day traders?",
    q_zu: "Kungani kubalulekile ukuhlaziya izikhathi ezinkulu (HTF) phambi kokungena kwi-timeframe encane?",
    ans_en: "It establishes the true directional bias and prevents trading against institutional flow",
    ans_zu: "It establishes the true directional bias and prevents trading against institutional flow"
  },
  {
    id: "elite_onedrive_c26_masterclass",
    num: 26,
    title_en: "IMALI Elite Strategy 26: Session Liquidity - London & New York Open Sweeps",
    title_zu: "I-IMALI Elite Strategy 26: Session Liquidity - London Open ne-New York Sweeps",
    desc_en: "Demystifying intraday cycle timings, identifying Judastry Open swings, and executing high-volume open range breakouts.",
    desc_zu: "Ukubamba ama-open range sweeps, ama-Judas Swings, ne-intraday timing phezulu kokuqala kweseshoni ye-London ne-New York.",
    video: "https://jumpshare.com/embed/B5Q1YfxRDSwf16PnrpVA",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 26: Master Class Video - Session Open Mechanics, Judas Swings & Kill Zones",
    lesson_zu: "Isigaba 26: Ividiyo ye-Master Class - Judas Swings, London & NY Open Kill Zones",
    content_en: "Welcome to class 26 of our IMALI Elite sequences. In this master class, we study session mechanics. You will learn how the Asian Session range is swept during the London Open, and how to identify the classic Judas Swing.",
    content_zu: "Siyakwamukela esigabeni samashumi amabili nesithupha se IMALI Elite sequence yethu. Kule vidiyo, sikhuluma nge-Session Liquidity. Uzofunda ngokuhlanzwa kwe-Asian session range, nama-Judas Swings.",
    pdf_en: "1. JUDAS SWING: False expansion that hunts stop losses near session highs/lows before reversing.\n2. KILL ZONES: London (07:00-10:00 GMT), New York (12:00-15:00 GMT).",
    pdf_zu: "1. JUDAS SWING: Ukuguquka kokukhwabanisa kwentengo okushaqisa abathengisi.\n2. KILL ZONES: I-London open kanye ne-New York open yizikhathi zokusetshenziswa.",
    q_en: "What is a 'Judas Swing' in institutional trading frameworks?",
    q_zu: "Yini i-Judas Swing ohlelweni lokuhweba lwamabhange?",
    ans_en: "A false directional expansion at session open designed to trap liquidity before reversing",
    ans_zu: "A false directional expansion at session open designed to trap liquidity before reversing"
  },
  {
    id: "elite_onedrive_c27_masterclass",
    num: 27,
    title_en: "IMALI Elite Strategy 27: Stock Indices Dynamics - High-Velocity NAS100 & US30",
    title_zu: "I-IMALI Elite Strategy 27: Uhlelo lwama-Stock Indices - I-NAS100 ne-US30",
    desc_en: "Mastering index trading dynamics, understanding basket correlations, and capturing high-speed moves at the New York open.",
    desc_zu: "Ukuhweba i-NAS100 ne-US30, ukuqonda umehluko kwi-currency trading, kanye ne-execution esheshayo phezulu kokuqala kwe-NY open.",
    video: "https://jumpshare.com/embed/ckrQe2Um1HQ4AXTWfMmQ",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 27: Master Class Video - NAS100, US30 & New York Session Open Velocity Mechanics",
    lesson_zu: "Isigaba 27: Ividiyo ye-Master Class - NAS100, US30 & New York open mechanics",
    content_en: "Welcome to class 27 of our IMALI Elite sequences. In this master class, we break down NAS100 and US30 dynamics. You will learn to navigate the high volatility at the New York stock market open.",
    content_zu: "Siyakwamukela esigabeni samashumi amabili nesikhombisa se IMALI Elite sequence yethu. Kule vidiyo, thina sifunda ngokuhweba ama-Stock Indices anjengo NAS100 ne-US30 ngesikhathi se-New York open.",
    pdf_en: "1. INDICES VOLATILITY: High-frequency movements requiring fast decisions.\n2. NY OPEN: Volatility spikes at 14:30 GMT (SAST/CAT adjusted).",
    pdf_zu: "1. VOLATILITY: Ukugcwala kwentengo yezinkampani ezidinga izibalo eziqinile.\n2. NY OPEN: Ukuvuleka emakethe we-NASDAQ ne-Dow Jones ngezikhathi we-NY open.",
    q_en: "At what time does the highest volatility spike occur on US Indices like NAS100 and US30?",
    q_zu: "Yisiphi isikhathi lapho kunomnyakazo omkhulu emakethe ye-NASDAQ (NAS100) kanye ne-Dow Jones (US30)?",
    ans_en: "New York Stock Exchange Open (14:30 GMT / 16:30 SAST)",
    ans_zu: "New York Stock Exchange Open (14:30 GMT / 16:30 SAST)"
  },
  {
    id: "elite_onedrive_c28_masterclass",
    num: 28,
    title_en: "IMALI Elite Strategy 28: Macro Fundamental Analysis - Central Banks & CPI Events",
    title_zu: "I-IMALI Elite Strategy 28: Ezomnotho Nemakethe - CPI ne-Interest Rates",
    desc_en: "Learn how macro news events (CPI, FOMC, NFP) drive interbank order books and how to position yourself without taking speculative risks.",
    desc_zu: "Ukuhlaziya amaphepha omnotho we-GDP, i-CPI, ne-FOMC nezilinganiso zenzuzo yamabhange amakhulu emhlabeni.",
    video: "https://jumpshare.com/embed/XAdAoxtHbBmtNNDGrEsA",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 28: Master Class Video - Central Bank Interest Policies, CPI Inflation & High-Impact News Trades",
    lesson_zu: "Isigaba 28: Ividiyo ye-Master Class - GDP, CPI, FOMC & High-impact news setups",
    content_en: "Welcome to class 28 of our IMALI Elite sequences. In this master class, we analyze macroeconomics. You will learn to read CPI inflation figures, interpret Federal Reserve interest rate policy differentials, and understand news releases.",
    content_zu: "Siyakwamukela esigabeni samashumi amabili nesishiyagalombili se IMALI Elite sequence yethu. Kule vidiyo, thina sifunda ngokuzula amaphepha omnotho njengo CPI, NFP, kanye ne-FOMC.",
    pdf_en: "1. CPI INFLATION: Directly affects central bank interest rate decisions.\n2. INTEREST DIFFERENTIALS: Capital flows to currencies with higher yield returns.",
    pdf_zu: "1. CPI INFLATION: Thinta amandla entengo neziqu ze-interest rates.\n2. YIELD DIFFERENTIALS: Imali ihamba kakhulu iye kwimali enemba yezinga lenzuzo.",
    q_en: "Which economic event directly measures inflation and acts as a primary driver of central bank interest rate changes?",
    q_zu: "Yiliphi iphepha lokuvezwa komnotho elihlola ukwehla noma ukukhula kwamandla emali (inflation)?",
    ans_en: "Consumer Price Index (CPI)",
    ans_zu: "Consumer Price Index (CPI)"
  },
  {
    id: "elite_onedrive_c29_masterclass",
    num: 29,
    title_en: "IMALI Elite Strategy 29: Institutional Footprints - Volume Profile Point of Control (POC)",
    title_zu: "I-IMALI Elite Strategy 29: Umthamo POC - Volume Profile Point of Control (POC)",
    desc_en: "Identify key accumulation and distribution clusters using Volume Profile, locating high volume nodes, and trading the POC.",
    desc_zu: "Ukobona izindawo zokunqwabelanisa (accumulation clusters) usebenzisa i-Volume Profile, nokuphatha isimo sentengo kwi-POC.",
    video: "https://jumpshare.com/embed/YwjvEGo9WqXNAVTMFRHh",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 29: Master Class Video - Volume Profile, High-Volume Nodes & Point of Control (POC) Trading",
    lesson_zu: "Isigaba 29: Ividiyo ye-Master Class - Volume Profile, POC, & High-volume nodes",
    content_en: "Welcome to class 29 of our IMALI Elite sequences. In this master class, we analyze institutional volume distribution. You will learn how to read horizontal volume profiles on MT5 and locate the Point of Control (POC).",
    content_zu: "Siyakwamukela esigabeni samashumi amabili nesishiyagalolunye se IMALI Elite sequence yethu. Kule vidiyo, sifunda ngokuhlunga i-Volume Profile kwi-chart.",
    pdf_en: "1. POINT OF CONTROL (POC): The price level with the highest traded volume inside that session.\n2. VALUE AREA (VA): The range where 70% of volume occurred.",
    pdf_zu: "1. POINT OF CONTROL (POC): Intengo lapho okudlale khona umthamo omkhulu wemali.\n2. VALUE AREA: Indawo lapho okugcwele khona u-70% wazo zonke izikhundla.",
    q_en: "What does the 'Point of Control' (POC) represent inside a Volume Profile configuration?",
    q_zu: "Yini i-Point of Control (POC) kwi-Volume Profile setup?",
    ans_en: "The price level with the highest amount of executed volume inside that specific session",
    ans_zu: "The price level with the highest amount of executed volume inside that specific session"
  },
  {
    id: "elite_onedrive_c30_masterclass",
    num: 30,
    title_en: "IMALI Elite Strategy 30: Risk Management - Asymmetric 1:5 RR Execution Matrix",
    title_zu: "I-IMALI Elite Strategy 30: Uhlelo we-Risk Management - 1:5 Risk-to-Reward Ratio",
    desc_en: "Perfecting the mathematics of capital preservation, stop-loss placement buffers, and structuring high-probability asymmetric outcomes.",
    desc_zu: "Izibalo zokuhweba ngemiphumela emikhulu (1:5 risk to reward) ne-Stop Loss Buffer ukuze wonge i-capital.",
    video: "https://jumpshare.com/embed/PCXaaGXiAJ3NFaX7LmXK",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 30: Master Class Video - Asymmetric Risk-to-Reward (1:5), Sizing Matrix & Portfolio Math",
    lesson_zu: "Isigaba 30: Ividiyo ye-Master Class - 1:5 Risk-to-Reward, position sizing formulas",
    content_en: "Welcome to class 30 of our IMALI Elite sequences. In this master class, we study asymmetric portfolio math. You will learn how to design trade setups where a single win recovers five consecutive small losses.",
    content_zu: "Siyakwamukela esigabeni samashumi amathathu se IMALI Elite sequence yethu. Kule vidiyo, thina sifunda ngokubala i-Risk-to-Reward. Inhloso ukuthi njalo uma uwina uthole u-1:5.",
    pdf_en: "1. ASYMMETRIC OUTCOME: Ensuring win values greatly exceed loss values.\n2. WIN RATE vs RR: With 1:5 RR, you only need a 20% win rate to remain profitable.",
    pdf_zu: "1. RISK TO REWARD: Ukugcina izibalo lapho inzuzo ingaphezu kokulahlekelwa kakhulu.\n2. WIN RATE vs RR: Ngama-matrix we-1:5, udinga i-win rate engu-20% kuphela ukuze unqobe.",
    q_en: "If a trader utilizes a consistent 1:5 Risk-to-Reward ratio, what minimum win rate is mathematically required to break even?",
    q_zu: "Uma usebenzisa i-matrix ye-1:5 Risk to Reward, iyiphi i-win rate encane edingekayo ukuze ungalahlekelwa?",
    ans_en: "Approximately 16.7%",
    ans_zu: "Approximately 16.7%"
  },
  {
    id: "elite_onedrive_c31_masterclass",
    num: 31,
    title_en: "IMALI Elite Strategy 31: Account Scaling - Managing Prop Firm Drawdown Rules",
    title_zu: "I-IMALI Elite Strategy 31: Khulisa i-Account - Ukugwema i-Drawdown kwi-Prop Firm",
    desc_en: "Comprehensive guide to passing prop firm evaluations, structuring risk per trade, and managing daily/maximum drawdown rules.",
    desc_zu: "Umhlahlandlela ophelele wokudlula ama-prop firm evaluations, ukugwema i-drawdown limits, kanye nokukhulisa ama-accounts emakhulu.",
    video: "https://jumpshare.com/embed/iKFktWchjvBRYPyxVyIS",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 31: Master Class Video - Prop Firm Evaluations, Daily & Max Drawdown Defense Strategies",
    lesson_zu: "Isigaba 31: Ividiyo ye-Master Class - Prop Firm evaluations, Daily & Max Drawdown parameters",
    content_en: "Welcome to class 31 of our IMALI Elite sequences. In this master class, we analyze prop firms. You will learn how daily drawdown is calculated and how to manage leverage settings.",
    content_zu: "Siyakwamukela esigabeni samashumi amathathu nanye se IMALI Elite sequence yethu. Kule vidiyo, thina sifunda ngokuzula ama-rules we-Prop Firm.",
    pdf_en: "1. DAILY DRAWDOWN: Must never exceed 5% on equity or balance.\n2. SCALING PLAN: Increasing risk slightly after establishing buffer.",
    pdf_zu: "1. DAILY DRAWDOWN: Akumele udlule u-5% ngokwe-equity noma balance.\n2. SCALING PLAN: Ukukhulisa lot size kancane kancane uma usunebhafa yenzuzo.",
    q_en: "What is the most critical calculation rule to defend when trading a funded prop firm account?",
    q_zu: "Yimuphi umthetho we-Prop Firm obaluleke kakhulu ongamelanga uwuphule nakanye?",
    ans_en: "Daily Drawdown Limit (typically 5%)",
    ans_zu: "Daily Drawdown Limit (typically 5%)"
  },
  {
    id: "elite_onedrive_c32_masterclass",
    num: 32,
    title_en: "IMALI Elite Strategy 32: Trading Psychology - Combating Emotional Biases",
    title_zu: "I-IMALI Elite Strategy 32: Uhlelo we-Psychology - Ukulawula Inzondo noMhobholo",
    desc_en: "Mastering mental frameworks, eliminating revenge trading, neutralizing fear, and building systematic trading routines.",
    desc_zu: "Ukulawula imizwa nemikhuba emibi emakethe, ukugwema i-overtrading, nendlela yokugcina umqondo ozolile.",
    video: "https://jumpshare.com/embed/MqUPmqDOBINNdSI3gM7k",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 32: Master Class Video - Cognitive Biases, Revenge Trading & Maintaining the Flow",
    lesson_zu: "Isigaba 32: Ividiyo ye-Master Class - Cognitive biases, Revenge trading mitigation",
    content_en: "Welcome to class 32 of our IMALI Elite sequences. In this master class, we analyze how cognitive biases impair retail execution.",
    content_zu: "Siyakwamukela esigabeni samashumi amathathu nambili se IMALI Elite sequence yethu. Kule vidiyo, sikhuluma ngenkinga enkulu edla abahwebi: imizwa nemikhuba yokuhweba engalungile.",
    pdf_en: "1. REVENGE TRADING: Attempting to 'win back' money after a loss.\n2. ROUTINE BUFFER: Closing trading platform immediately after hit loss limits.",
    pdf_zu: "1. REVENGE TRADING: Ukuzama 'ukubuyisa imali' ngemuva kokulahlekelwa.\n2. TRADING PLAN RULES: Ukucisha i-platform uma ufinyelele kwi-loss limit yosuku.",
    q_en: "What psychological state causes a trader to open large impulsive positions immediately after a loss?",
    q_zu: "Yisiphi isimo somqondo esenza umhwebi avule ama-trades amakhulu ngemva kokulahlekelwa yimali?",
    ans_en: "Revenge Trading / Emotional Bias",
    ans_zu: "Revenge Trading / Emotional Bias"
  },
  {
    id: "elite_onedrive_c33_masterclass",
    num: 33,
    title_en: "IMALI Elite Strategy 33: The Final Elite Confluence - Synthesizing the Playbook",
    title_zu: "I-IMALI Elite Strategy 33: Uhlelo Oluphelele lwe-Confluence",
    desc_en: "Merging all macro fundamentals, intraday cycles, structural shifts, and risk parameters into a single master trading business plan.",
    desc_zu: "Ukuhlanganisa zonke izikhawu (macro fundamentals, intraday, liquidity) ukwakha umhlahlandlela ongu-master block wokuhweba njengebhange.",
    video: "https://jumpshare.com/embed/mkRgQqObLqYIiUXSUVlW",
    category_en: "Elite Technical Confluence",
    category_zu: "Ukuhlanganisa Isakhiwo Se-Confluence",
    lesson_en: "Class 33: Master Class Video - The Complete Confluence Checklist & Synthesizing the IMALI Playbook",
    lesson_zu: "Isigaba 33: Ividiyo ye-Master Class - Complete Confluence & Synthesizing",
    content_en: "Welcome to class 33 of our IMALI Elite sequences. In this crowning master class, we synthesize the entire curriculum.",
    content_zu: "Siyakwamukela esigabeni samashumi amathathu nantathu se IMALI Elite sequence yethu. Kule vidiyo, thina sifunda ngokuhlanganisa amasu ethu onke (structure, liquidity, sessions, ne-risk math).",
    pdf_en: "1. MASTER CONFLUENCE: Daily bias + 15M structure shift + FVG mitigation + 1:5 risk model.\n2. BUSINESS RULES: Maintain discipline, log trades, and scale positions.",
    pdf_zu: "1. CONFLUENCE: I-Daily bias + 15M structure shift + FVG mitigation + 1:5 Risk matrix.\n2. BUSINESS RULES: Gcina ukuzilungisa njalo, bhala phansi isenzo sakho, ukhule kancane.",
    q_en: "What is the key core discipline of the final IMALI Master Playbook?",
    q_zu: "Yini inhloso enkulu yomhlahlandlela ongu-Master Playbook we-IMALI?",
    ans_en: "Synthesizing structure, liquidity sweeps, and sessions with asymmetric risk management rules",
    ans_zu: "Synthesizing structure, liquidity sweeps, and sessions with asymmetric risk management rules"
  }
];

export const dynamicCourses21to33: Course[] = courses21to33Raw.map(raw => ({
  id: raw.id,
  title_en: raw.title_en,
  title_zu: raw.title_zu,
  category_en: raw.category_en,
  category_zu: raw.category_zu,
  difficulty_en: "VVIP Elite to Expert",
  difficulty_zu: "Izinga Eliphezulu le-VVIP",
  duration_en: "45 Hours",
  duration_zu: "Amahora angu-45",
  description_en: raw.desc_en,
  description_zu: raw.desc_zu,
  thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
  instructorName: "Jean-Louis Cele & Thabiso Khumalo",
  rating: 5.0,
  studentsCount: 0,
  modules: [
    {
      id: `${raw.id}_mod_1`,
      title_en: `Module 1: Advanced Execution (Strategy ${raw.num})`,
      title_zu: `Isifundo 1: Izibalo zika-VVIP (Strategy ${raw.num})`,
      lessons: [
        {
          id: `elite_onedrive_lesson_${raw.num}`,
          title_en: raw.lesson_en,
          title_zu: raw.lesson_zu,
          duration: "65 Mins",
          videoUrl: raw.video,
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
          content_en: raw.content_en,
          content_zu: raw.content_zu,
          resources: [
            {
              name_en: `IMALI-NGESIZULU_Elite_Strategy_${raw.num}_Manual.pdf`,
              name_zu: `IMALI-NGESIZULU_Incwadi_Ye-Strategy_${raw.num}.pdf`,
              type: "pdf",
              url: "#",
              pdfContent_en: raw.pdf_en,
              pdfContent_zu: raw.pdf_zu
            }
          ],
          quiz: {
            id: `${raw.id}_quiz_1`,
            title_en: `VVIP Strategy ${raw.num} Assessment Quiz`,
            title_zu: `Ukuhlolwa kuka-VVIP Strategy ${raw.num}`,
            questions: [
              {
                id: `${raw.id}_q1`,
                question_en: raw.q_en,
                question_zu: raw.q_zu,
                options_en: [
                  raw.ans_en,
                  "Option B: Standard SMA moving average crossovers",
                  "Option C: High speed robotic EA auto trading",
                  "Option D: Social media signal copy trading"
                ],
                options_zu: [
                  raw.ans_zu,
                  "Option B: Izinkomba ze-moving average ezejwayelekile",
                  "Option C: Ukuhweba kwamarobhothi ngokuzenzakalelayo",
                  "Option D: Ukukopisha ama-signals ezinkundleni zokuxhumana"
                ],
                correctAnswerIndex: 0
              }
            ]
          }
        }
      ]
    }
  ]
}));

const allowedIds = [
  "elite_onedrive_video_masterclass",
  "elite_onedrive_hedging_masterclass",
  "elite_onedrive_orderflow_masterclass",
  "elite_onedrive_psychology_masterclass",
  "elite_onedrive_liquidity_masterclass",
  "elite_onedrive_reversal_masterclass",
  "elite_onedrive_supplydemand_masterclass",
  "elite_onedrive_amd_masterclass",
  "elite_onedrive_inducement_masterclass",
  "elite_onedrive_macro_masterclass",
  "elite_onedrive_funding_masterclass",
  "elite_onedrive_confluence_masterclass",
  "elite_onedrive_mt4_masterclass",
  "elite_onedrive_mt5_masterclass",
  "elite_onedrive_mt5_adv_masterclass",
  "elite_onedrive_mt5_indicators_masterclass",
  "elite_onedrive_mt5_mobile_masterclass",
  "elite_onedrive_mt5_execution_masterclass",
  "elite_onedrive_risk_mgt_masterclass",
  "elite_onedrive_trading_psychology_masterclass",
  "elite_onedrive_c21_masterclass",
  "elite_onedrive_c22_masterclass",
  "elite_onedrive_c23_masterclass",
  "elite_onedrive_c24_masterclass",
  "elite_onedrive_c25_masterclass",
  "elite_onedrive_c26_masterclass",
  "elite_onedrive_c27_masterclass",
  "elite_onedrive_c28_masterclass",
  "elite_onedrive_c29_masterclass",
  "elite_onedrive_c30_masterclass",
  "elite_onedrive_c31_masterclass",
  "elite_onedrive_c32_masterclass",
  "elite_onedrive_c33_masterclass"
];

export const coursesData: Course[] = [
  ...staticCoursesData,
  ...dynamicCourses21to33
].filter(c => allowedIds.includes(c.id));



