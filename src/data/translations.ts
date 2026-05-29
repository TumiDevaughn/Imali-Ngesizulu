/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "../types";

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Brand
    brand_name: "Elite Courses",
    brand_subtitle: "EXECUTIVE FINANCIAL & TECHNICAL LMS",
    
    // Roles & Switching
    role_admin: "Administrator",
    role_instructor: "Lead Instructor",
    role_student: "Executive Student",
    switch_role: "Switch Active Role",
    user_status: "Global Access Active",
    
    // Navigation
    nav_dashboard: "Academy Dashboard",
    nav_courses: "Elite Courses",
    nav_classroom: "Virtual Classroom",
    nav_chat: "Academic Lounge",
    nav_analytics: "Executive Analytics",
    nav_admin: "Syndicate Admin",
    nav_blueprints: "Radio News Room",

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
    blueprints_desc: "Tune in to real-time premium news streams, corporate audio feeds (BBC, Bloomberg) or relax with deep-focus study rhythms."
  },
  
  zu: {
    // Brand
    brand_name: "Elite Courses",
    brand_subtitle: "IKHAMBALI ELIPHEZULU LEZEZIMALI NOKUPHATHA YEZIFUNDO",
    
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
    nav_admin: "Umlawuli we-Syndicate",
    nav_blueprints: "Igumbi Ledaba Lomsakazo",

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
    admin_title: "Isikhumulo sokuphatha se-Syndicate",
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
    blueprints_desc: "Lalela iziteshi ezibukhoma ze-Bloomberg, i-BBC World Service, ne-CNBC noma uphumule ngomculo ojulile we-jazz ne-chillout ukhulise ulwazi."
  }
};

export const translateText = (key: TranslationKey, lang: Language): string => {
  return translations[lang][key] || translations["en"][key] || String(key);
};
