/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "../types";

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Brand
    brand_name: "IMALI NgesiZulu",
    brand_subtitle: "Your strategic partner in the global markets",
    
    // Roles & Switching
    role_admin: "Administrator",
    role_instructor: "Lead Instructor",
    role_student: "Executive Student",
    switch_role: "Switch Active Role",
    user_status: "Global Access Active",
    
    // Navigation
    nav_dashboard: "Academy Dashboard",
    nav_courses: "Imali Courses",
    nav_classroom: "Virtual Classroom",
    nav_chat: "Academic Lounge",
    nav_analytics: "Executive Analytics",
    nav_admin: "Academy Admin",
    nav_blueprints: "Imali News Room",
    nav_drive: "Google Drive Sync",

    // General Actions
    btn_translate: "Translate to Zulu",
    btn_translate_back: "Translate to English",
    btn_view: "View Details",
    btn_start: "Begin Course",
    btn_continue: "Resume Learning",
    btn_submit: "Submit Assessment",
    btn_download: "Download Premium Resource",
    btn_claim_cert: "Claim Program Certificate",
    btn_verify: "Verify Certificate",
    btn_close: "Close Panel",
    btn_save: "Apply Parameters",
    btn_add_user: "Register Academy Scholar",
    btn_add_course: "Create Academy Course",
    
    // Quick Metrics
    metric_progress: "Your Progress",
    metric_enrolled: "Active Enrollments",
    metric_completed: "Completed Pathways",
    metric_average_score: "Average Score",
    metric_attendance: "Lecture Attendance",
    metric_engagement: "Engagement Factor",
    metric_completion_rate: "Completion Success Rate",
    metric_active_students: "Global Scholars",
    
    // Course Screen
    course_materials: "Course Resources & Materials",
    course_modules: "Syllabus Curriculum",
    course_instructor: "Lead Instructor",
    duration: "Pathway Duration",
    difficulty: "Executive Tier",
    lessons_completed: "Lessons Mastered",
    quiz_title: "Pathway Verification Quiz",
    quiz_passed: "Assessment Cleared",
    quiz_failed: "Re-evaluation Recommended",
    quiz_submit_success: "Your answers are processed.",
    
    // Virtual Classroom
    classroom_title: "IMALI Ngesizulu Live Room",
    classroom_subtitle: "Real-Time Executive Interactive Video feed",
    classroom_whiteboard: "Interactive Shared Analysis Canvas",
    classroom_participants: "Interactive Scholars List",
    classroom_join: "Open Classroom Feed",
    classroom_leave: "Disconnect Feed",
    classroom_active: "LECTURE LIVE IN SESSION",
    classroom_inactive: "WAITING FOR LEAD PROFESSOR",
    
    // Academic Lounge / Chat
    chat_title: "Academic Discussion & Peer Forum",
    chat_welcome: "You are connected to high-level secure academy communications. Ask questions below, or speak with our AI Academic Advisor.",
    chat_placeholder: "Formulate your academic inquiry here...",
    chat_btn_send: "Transmit Message",
    chat_btn_ai_tutor: "Engage AI Academic Advisor",
    chat_ai_thinking: "Gemini AI Synthesizing Academic Perspective...",
    
    // Certs
    cert_title: "IMALI Ngesizulu Financial Qualification Certificate",
    cert_greeting: "THIS IS TO OFFICIALLY VERIFY AND CERTIFY THAT",
    cert_credential_id: "Academy Credential Verification ID",
    cert_authorized: "Authorized by IMALI Ngesizulu Board of Academics",
    cert_has_completed: "has successfully mastered the executive path and demonstrated absolute understanding of",
    cert_congrats: "Inspirational Achievement! Your digital credentials are valid on all international records.",
    cert_view_your: "Open Digital Certificate",

    // Admin & Analytics Layout
    admin_title: "Academy Administration System Console",
    admin_users_tab: "Manage Academy Scholars",
    admin_courses_tab: "Curriculum Repository",
    admin_certs_tab: "Program Certificate Verification",
    admin_settings_tab: "Language & System Rules",
    admin_ai_insights: "AI Strategic System Diagnostics",
    admin_generate_report_btn: "Execute AI Strategic Audit",
    admin_ai_report_loading: "Gemini is auditing global academy database...",
    admin_ai_insights_title: "Synthesized Operations Intelligence Report",
    
    // Blueprints
    blueprints_title: "Global Financial Radio Room",
    blueprints_desc: "Tune in to real-time premium news streams, corporate audio feeds (BBC, Bloomberg) or relax with deep-focus study rhythms.",
    
    // Newly Added for Total Translation Coverage
    new_scholar: "New Scholar",
    interactive_lecture_suite: "Interactive Live Lecture Suite",
    detected_location_label: "DETECTED LOCATION:",
    your_local_time_label: "YOUR LOCAL TIME:",
    role_label_colon: "Role:",
    role_student_abbr: "STUDENT",
    role_instructor_abbr: "INSTR",
    role_admin_abbr: "ADMIN",
    active_session_label: "Active Session:",
    workspace_security_label: "WORKSPACE SECURITY",
    private_session_label: "100% Private Session",
    clubhouse_forum_title: "IMALI Audio Suite Forum",
    clubhouse_forum_desc: "A zero-database drop-in audio space. Complete peer-to-peer lessons, choose among 6 custom class durations (30 min - 3 hrs), and download the class audio archive immediately upon session conclusion.",
    select_forum_topic: "Select Your Academic Forum Class Topic",
    choose_session_ranges: "Choose from exactly 6 distinct audio session ranges from 30 minutes to 3 hours max.",
    fill_profile_details: "Fill Up Your Profile Details",
    profile_instructions: "Each student and speaker before joining must ensure their professional details are non-blank. Modify them on the fly below:",
    your_display_name_label: "Your Display Name",
    type_your_name_placeholder: "Type your name...",
    your_biography_focus_label: "Your Biography Focus",
    focus_area_placeholder: "Focus area...",
    profile_verified_label: "PROFILE VERIFIED:",
    profile_ready_local: "✓ READY (SAVED LOCALLY)",
    enter_auth_passcode_title: "Enter Authorization Passcode",
    auth_passcode_desc: "This live forum requires the active authorization session passcode. Please enter the code offered by your Instructor or Admin:",
    placeholder_passcode: "e.g. FOREX101",
    admin_gate_enforcement: "🛡️ Administrative Gate Enforcement: The active passcode is fully restricted. It is not listed on this screen. You must contact your instructor or administrator directly to obtain the active code of the hour.",
    host_instructors_tip: "💡 Host/Instructors can configure and view the active passcode securely under their personal profile or dispatch panels.",
    join_live_audio: "Join Live Audio Session",
    financial_clocks_label: "Financial Clocks",
    certified_private_session_label: "Certified Private Local Session Active",
    financial_education_secure_title: "Your Financial Education remains Securely Yours",
    hour_session_suffix: "Hour Session",
    hours_session_suffix: "Hours Session",
    min_session_suffix: "Min Session"
  },
  
  zu: {
    // Brand
    brand_name: "IMALI NgesiZulu",
    brand_subtitle: "Uzakwethu wamasu ezimakethe zomhlaba wonke",
    
    // Roles & Switching
    role_admin: "Umlawuli Wendlela",
    role_instructor: "Uthisha Omkhulu",
    role_student: "Umfundi Ongumphathi",
    switch_role: "Shintsha Indima Esebenzayo",
    user_status: "Ukufinyelela Emhlabeni Wonke Kuyasebenza",
    
    // Navigation
    nav_dashboard: "Ideshibhodi Yekhambali",
    nav_courses: "Izifundo Ezivelele",
    nav_classroom: "Ikilasi Elibonakalayo",
    nav_chat: "Igumbi Lezemfundo",
    nav_analytics: "Izibalo Zababusi",
    nav_admin: "Umlawuli We-Academy",
    nav_blueprints: "Igumbi Ledaba Lomsakazo",
    nav_drive: "Ezokugcina ku-Drive",

    // General Actions
    btn_translate: "Humusha ngesiZulu",
    btn_translate_back: "Humusha ngesiNgisi",
    btn_view: "Buka Imininingwane",
    btn_start: "Qala Isifundo",
    btn_continue: "Hubela Phambili",
    btn_submit: "Thumela Ukuhlola",
    btn_download: "Landa Insiza Evelile",
    btn_claim_cert: "Thola Isitifiketi Se-Imperial",
    btn_verify: "Qinisekisa Isitifiketi",
    btn_close: "Vala Isiphanyeko",
    btn_save: "Sebenzisa Imininingwane",
    btn_add_user: "Gunyaza Umsebenzisi",
    btn_add_course: "Sungula Isifundo",
    
    // Quick Metrics
    metric_progress: "Inqubekelaphambili Yakho",
    metric_enrolled: "Izifundo Ozifundayo",
    metric_completed: "Izindlela Eziqediwe",
    metric_average_score: "Isilinganiso Semiphumela",
    metric_attendance: "Ukuba khona Emakilasini",
    metric_engagement: "Amazinga Okubamba iqhaza",
    metric_completion_rate: "Inani lokuQeda Izaziso",
    metric_active_students: "Izazi Zomhlaba Wonke",
    
    // Course Screen
    course_materials: "Izinqolobane Nezinto Zasebukhosini",
    course_modules: "Uhlelo Lwezifundo Lekhambali",
    course_instructor: "Isazi Sezemfundo Esihloniphekile",
    duration: "Isikhathi Sesifundo",
    difficulty: "Izinginga Abaphathi",
    lessons_completed: "Izifundo Ozazi kahle",
    quiz_title: "Imibuzo Yokuqinisekisa Isifundo",
    quiz_passed: "Ukuphumelela Ukuhlola kusele",
    quiz_failed: "Kunconywa ukuhlola kabusha",
    quiz_submit_success: "Izimpendulo zakho zicutshunguliwe.",
    
    // Virtual Classroom
    classroom_title: "Igumbi Lokufundela Eliqondile le-IMALI Ngesizulu",
    classroom_subtitle: "Ukusakazwa kwe-Video nokuxhumana isikhathi sangempela",
    classroom_whiteboard: "Ibhodi Lokubambisana Elibonakalayo ye-Quantum",
    classroom_participants: "Uhlu Lwezazi Ezikhona eMfundweni",
    classroom_join: "Ngena eSakazweni Sekilasi",
    classroom_leave: "Nqamula Ukuxhumana Sekilasi",
    classroom_active: "ISIFUNDO SISAKAZWA MANJE ISIKHATHI SANGEMPELA",
    classroom_inactive: "KULINDELWE USOLWAZI OMKHULU",
    
    // Academic Lounge / Chat
    chat_title: "Ingqungquthela Yezemfundo Nemiyalezo",
    chat_welcome: "Uxhumeke nezokuxhumana eziphephile zekhambali lezinga eliphezulu. Buza imibuzo ngezansi, noma ukhulume noMeluleki Wezemfundo we-AI.",
    chat_placeholder: "Bhala umbuzo wakho wezemfundo lapha...",
    chat_btn_send: "Thumela Umlayezo",
    chat_btn_ai_tutor: "Khulumisana noMeluleki we-AI",
    chat_ai_thinking: "I-Gemini AI Ibumba Imicabango Yezezifundo...",
    
    // Certs
    cert_title: "Isitifiketi Sokuhlonishwa se-IMALI Ngesizulu",
    cert_greeting: "LOKHU KUKUQINISEKISA NOKUKUTHIYAZA NGOKUSEMTHETHWENI UKUTHI",
    cert_credential_id: "I-ID Credential Credential Chain key",
    cert_authorized: "Gunyazwe yiBhodi Labezemfundo lase-IMALI Ngesizulu",
    cert_has_completed: "uphumelele kahle kakhulu endleleni yabaPhathi futhi wakhombisa ukuqonda okubanzi kwe-",
    cert_congrats: "Impumelelo Enhle Kakhulu Eyisikhuthazo! Imibhalo yakho yedijithali evikelekile iyasebenza kuwo wonke amazinga omhlaba.",
    cert_view_your: "Buka Isitifiketi Sedijithali",

    // Admin & Analytics Layout
    admin_title: "Isikhumulo sokuphatha se-Academy",
    admin_users_tab: "Phatha Izazi Zekhambali",
    admin_courses_tab: "Izinto Zemfundo ezikhona",
    admin_certs_tab: "Ukuqinisekiswa Kwesitifiketi Ledjini",
    admin_settings_tab: "Ulimi Nomithetho Yohlelo",
    admin_ai_insights: "Ukuhlolwa Kwezinhlelo Ezihlakaniphile ze-AI",
    admin_generate_report_btn: "Qala Ukuhlola Ngesu elihlakaniphile le-AI",
    admin_ai_report_loading: "I-Gemini icwaninga ingqalasizinda yedatha yekhambali...",
    admin_ai_insights_title: "Umbiko Ophelele Wezobuhlakani Bemisebenzi",
    
    // Blueprints
    blueprints_title: "Igumbi Lomsakazo Wezomnotho nemicabango",
    blueprints_desc: "Lalela iziteshi ezibukhoma ze-Bloomberg, i-BBC World Service, ne-CNBC noma uphumule ngomculo ojulile we-jazz ne-chillout ukhulise ulwazi.",
    
    // Newly Added for Total Translation Coverage
    new_scholar: "Umfundi Omusha",
    interactive_lecture_suite: "Igumbi Lezinkulumo Ezibukhoma Ezisebenzisanayo",
    detected_location_label: "INDAWO ETHOLAKELE:",
    your_local_time_label: "ISIKHATHI SAKHO SASEKHAYA:",
    role_label_colon: "Indima:",
    role_student_abbr: "UMFUNDI",
    role_instructor_abbr: "UTHISHA",
    role_admin_abbr: "ADMIN",
    active_session_label: "Iseshini Esebenzayo:",
    workspace_security_label: "UKUPHEPHA KWE-WORKSPACE",
    private_session_label: "100% Iseshini Eyimfihlo",
    clubhouse_forum_title: "Inkundla Yezwi ye-IMALI",
    clubhouse_forum_desc: "Indawo yomsindo engenayo datha. Qedela izifundo phakathi kwababili, khetha phakathi kwezikhathi eziyisithupha zezifundo ezenziwe ngokwezifiso (imizuzu engama-30 kuya emahoreni ama-3), bese ulanda ingobo yomlando yomsindo wekilasi ngokushesha ngemuva kokuphela kweseshini.",
    select_forum_topic: "Khetha Isihloko Sekilasi Senkundla Yezemfundo",
    choose_session_ranges: "Khetha phakathi kwezikhathi eziyisithupha zomsindo ezihlukene kusukela emizuzwini engama-30 kuya emahoreni ama-3 max.",
    fill_profile_details: "Gcwalisa Imininingwane Yakho Yephrofayili",
    profile_instructions: "Umfundi ngamunye kanye nesikhulumi ngaphambi kokuhlanganyela kumele baqinisekise ukuthi imininingwane yabo yobungcweti ayinalutho. Shintsha lapha ngezansi:",
    your_display_name_label: "Igama Lakho Eliboniswayo",
    type_your_name_placeholder: "Bhala igama lakho...",
    your_biography_focus_label: "Ukugxila Kwe-Biografi Yakho",
    focus_area_placeholder: "Indawo yokugxila...",
    profile_verified_label: "IPHROFAYILI IQINISEKISWE:",
    profile_ready_local: "✓ LULUNGILE (LULONDOLOZWE KASEKHAYA)",
    enter_auth_passcode_title: "Faka Iphasikhodi Yokugunyaza",
    auth_passcode_desc: "Le nkundla ebukhoma idinga iphasikhodi yeseshini yokugunyaza esebenzayo. Sicela ufake ikhodi enikezwe uMfundisi wakho noma uMlawuli:",
    placeholder_passcode: "isib. FOREX101",
    admin_gate_enforcement: "🛡️ Ukuqinisekiswa Kwesango Lomlawuli: Iphasikhodi esebenzayo ivinjelwe ngokuphelele. Ayiveli kulesi sikrini. Kumele uxhumane nomfundisi noma nomlawuli yakho ngqo ukuze uthole ikhodi esebenzayo yale hora.",
    host_instructors_tip: "💡 Abaphathi/Abafundisi bangamisa futhi babuke iphasikhodi esebenzayo ngokuphepha ngaphansi kwephrofayili yabo noma amaphaneli okuthumela.",
    join_live_audio: "Ngena Iseshini Yomsindo Ebukhoma",
    financial_clocks_label: "Amawashi Wezezimali",
    certified_private_session_label: "Iseshini Yasekhaya Eyimfihlo Eqinisekisiwe Isebenza Manje",
    financial_education_secure_title: "Imfundo Yakho Yezezimali Ihlala Iyakho Ngokuphephile",
    hour_session_suffix: "Iseshini Yehora",
    hours_session_suffix: "Iseshini Yamahora",
    min_session_suffix: "Iseshini Yemizuzu"
  }
};

export const translateText = (key: TranslationKey, lang: Language): string => {
  return translations[lang][key] || translations["en"][key] || String(key);
};
