import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "rw";

const translations: Record<string, Record<Language, string>> = {
  // Welcome Screen
  "welcome.title": { en: "SEC USSD App Training", rw: "Amahugurwa ya SEC USSD App" },
  "welcome.project": { en: "125 Rwanda Project", rw: "Umushinga wa 125 Rwanda" },
  "welcome.description": {
    en: "Learn to use the USSD Soil Erosion Control App for community-based environmental monitoring — step by step, right from your phone.",
    rw: "Iga gukoresha USSD Soil Erosion Control App mu gukurikirana ibidukikije mu muryango — intambwe ku ntambwe, ukoresheje telefoni yawe.",
  },
  "welcome.start": { en: "Start Training", rw: "Tangira Amahugurwa" },
  "welcome.info": { en: "11 sections · Interactive quizzes · ~25 minutes", rw: "Igice 11 · Ibibazo bihuza · ~Iminota 25" },
  "welcome.dashboard": { en: "View Dashboard", rw: "Reba Dashboard" },

  // Progress Header
  "progress.section": { en: "Section", rw: "Igice" },
  "progress.of": { en: "of", rw: "muri" },

  // Navigation
  "nav.previous": { en: "Previous", rw: "Ibibanza" },
  "nav.next": { en: "Next", rw: "Ibikurikira" },
  "nav.finish": { en: "Finish", rw: "Rangiza" },
  "nav.answerAll": { en: "Answer all questions to continue", rw: "Subiza ibibazo byose kugira ngo ukomeze" },

  // Quiz
  "quiz.multipleChoice": { en: "Multiple Choice", rw: "Hitamo Igisubizo" },
  "quiz.trueFalse": { en: "True / False", rw: "Nibyo / Sibyo" },
  "quiz.selectAll": { en: "Select All", rw: "Hitamo Byose" },
  "quiz.checkAnswer": { en: "Check Answer", rw: "Reba Igisubizo" },
  "quiz.tryAgain": { en: "Not quite right. You have one more attempt — try again!", rw: "Ntibyakunze neza. Ufite undi mushinga — ongera ugerageze!" },
  "quiz.retryButton": { en: "Try Again", rw: "Ongera Ugerageze" },
  "quiz.currentQuestion": { en: "Current Question", rw: "Ikibazo Uriho" },

  // Practice
  "practice.title": { en: "Practice Tasks", rw: "Imyitozo" },

  // Completion
  "completion.congrats": { en: "Congratulations!", rw: "Birarangiye neza!" },
  "completion.keepLearning": { en: "Keep Learning!", rw: "Komeza Kwiga!" },
  "completion.passMessage": {
    en: "You have successfully completed the SEC App Online Training.",
    rw: "Warangije neza amahugurwa ya SEC App.",
  },
  "completion.failMessage": {
    en: "You need {score}% to pass. Review the material and try again.",
    rw: "Ukeneye {score}% kugira ngo utsinde. Subiramo wongere ugerageze.",
  },
  "completion.outOf": { en: "out of", rw: "muri" },
  "completion.correct": { en: "correct", rw: "byizewe" },
  "completion.passed": { en: "Passed", rw: "Watsinze" },
  "completion.belowPassing": { en: "Below passing score", rw: "Munsi y'amanota asabwa" },
  "completion.readyMessage": {
    en: "🎓 You are now ready to use the SEC App simulator or live USSD system to support inclusive soil erosion monitoring under the 125 Rwanda Project.",
    rw: "🎓 Ubu witeguye gukoresha SEC App simulator cyangwa sisitemu ya USSD mu gushyigikira gukurikirana isuri y'ubutaka mu mushinga wa 125 Rwanda.",
  },
  "completion.launchSimulator": { en: "Launch SEC App Simulator", rw: "Fungura SEC App Simulator" },
  "completion.retake": { en: "Retake Training", rw: "Subiramo Amahugurwa" },
  "completion.tryAgain": { en: "Try Again", rw: "Ongera Ugerageze" },

  // Language toggle
  "lang.switch": { en: "Kinyarwanda", rw: "English" },
  "welcome.nameLabel": { en: "Your full name (for certificate)", rw: "Amazina yawe yose (ku cyemezo)" },
  "welcome.namePlaceholder": { en: "Enter your full name", rw: "Injiza amazina yawe yose" },

  // Training section titles
  "section.1.title": { en: "Introduction", rw: "Intangiriro" },
  "section.2.title": { en: "Learning Objectives", rw: "Intego z'Amahugurwa" },
  "section.3.title": { en: "Climate Change & Soil Erosion", rw: "Ihindagurika ry'Ikirere n'Isuri y'Ubutaka" },
  "section.4.title": { en: "Social & Gender Dimensions", rw: "Uburinganire n'Imibereho" },
  "section.5.title": { en: "Why USSD Technology", rw: "Impamvu Ikoranabuhanga rya USSD" },
  "section.6.title": { en: "Entering Biodata", rw: "Kwinjiza Amakuru y'Umuntu" },
  "section.7.title": { en: "Land Parcel Identification (UPI)", rw: "Kumenya Umurima (UPI)" },
  "section.8.title": { en: "Erosion Evidence", rw: "Ibimenyetso by'Isuri" },
  "section.9.title": { en: "Erosion Control Measures", rw: "Ingamba zo Kurwanya Isuri" },
  "section.10.title": { en: "Simulator Practice", rw: "Kwimenyereza kuri Simulator" },
  "section.11.title": { en: "Final Check", rw: "Isuzuma Nyuma" },

  // Section content
  "section.1.content.0": {
    en: "Welcome to the SEC App Online Training Module!",
    rw: "Murakaza neza mu mahugurwa ya SEC App!",
  },
  "section.1.content.1": {
    en: "This interactive lesson will guide you step-by-step through the use of the USSD Soil Erosion Control (SEC) App.",
    rw: "Iri somo rihuza rizakuyobora intambwe ku ntambwe mu gukoresha USSD Soil Erosion Control (SEC) App.",
  },
  "section.1.content.2": {
    en: "You will learn why soil erosion monitoring matters, how the app works, and how to enter data accurately using your mobile phone.",
    rw: "Uziga impamvu gukurikirana isuri y'ubutaka ari ngombwa, uko app ikora, n'uko winjiza amakuru neza ukoresheje telefoni yawe.",
  },
  "section.1.content.3": {
    en: "The training is part of the 125 Rwanda Project, supporting community-based environmental monitoring across Rwanda.",
    rw: "Amahugurwa ni igice cy'umushinga wa 125 Rwanda, ushyigikira gukurikirana ibidukikije mu baturage mu Rwanda hose.",
  },
  "section.2.content.0": {
    en: "By the end of this lesson, you will be able to:",
    rw: "Nyuma y'iri somo, uzashobora:",
  },
  "section.3.content.0": {
    en: "Climate change is increasing rainfall variability and the frequency of intense storms in Rwanda. When heavy rain falls over a short period, water flows rapidly over land surfaces, washing away fertile topsoil.",
    rw: "Ihindagurika ry'ikirere rirongeye imvura zidahwitse n'imvura nyinshi mu Rwanda. Iyo imvura nyinshi iguye mu gihe gito, amazi atemba cyane ku butaka, ajyana ubutaka bwera.",
  },
  "section.3.content.1": {
    en: "Soil erosion reduces agricultural productivity, increases sedimentation in rivers, and contributes to land degradation. These impacts are especially severe in areas with steep slopes and intensive land use.",
    rw: "Isuri y'ubutaka igabanya umusaruro w'ubuhinzi, yongerera ibyondo mu mito, kandi iteza imbere isenyuka ry'ubutaka. Ibi bitera ingaruka zikomeye cyane mu turere dufite imisozi miremire.",
  },
  "section.3.content.2": {
    en: "Community members are often the first to notice erosion. Their observations support early detection and timely response.",
    rw: "Abaturage ni bo basanzwe babona isuri mbere. Ibyo babona bifasha kumenya hakiri kare no gufata ingamba ku gihe.",
  },
  "section.4.content.0": {
    en: "Women, men, and youth experience and observe soil erosion differently because of their daily activities.",
    rw: "Abagore, abagabo, n'urubyiruko babona isuri y'ubutaka mu buryo butandukanye kubera ibikorwa byabo bya buri munsi.",
  },
  "section.4.content.1": {
    en: "Women may notice erosion near water sources or gardens, while men often observe erosion in larger fields. Youth frequently notice erosion along paths and grazing areas.",
    rw: "Abagore bashobora kubona isuri hafi y'amazi cyangwa imirima, mu gihe abagabo babona isuri mu mirima minini. Urubyiruko rubona isuri ku nzira n'ahantu horagishwa.",
  },
  "section.4.content.2": {
    en: "Including all these perspectives improves data quality and ensures fair and effective environmental decision-making.",
    rw: "Guhuza ibitekerezo byose biteza imbere ireme ry'amakuru kandi bigatuma imyanzuro ku bidukikije ari myiza.",
  },
  "section.5.content.0": {
    en: "USSD technology allows users to interact with the SEC App using simple menu prompts on basic mobile phones.",
    rw: "Ikoranabuhanga rya USSD rituma abakoresha bashobora gukoresha SEC App bakoresheje menu yoroshye kuri telefoni isanzwe.",
  },
  "section.5.content.1": {
    en: "It does not require internet access or smartphones, making the SEC App accessible to people in remote areas, older users, and those with limited connectivity.",
    rw: "Ntisaba interineti cyangwa telefoni zigezweho, bituma SEC App igerwaho n'abantu bari mu turere tw'icyaro, abakuze, n'abafite interineti nke.",
  },
  "section.5.content.2": {
    en: "This supports equitable participation in soil erosion monitoring.",
    rw: "Ibi bishyigikira ubusabane bungana mu gukurikirana isuri y'ubutaka.",
  },
  "section.6.content.0": {
    en: "Biodata links each erosion report to a real user and location, making reports traceable and useful for planning.",
    rw: "Amakuru y'umuntu ahuza buri raporo y'isuri n'umukoresha n'aho ari, bituma raporo zikurikiranwa kandi zigafasha mu gutegura.",
  },
  "section.6.content.1": {
    en: "Accurate biodata improves reliability and supports inclusive monitoring.",
    rw: "Amakuru y'umuntu yizewe ateza imbere kwizera no gushyigikira gukurikirana guhwanye.",
  },
  "section.6.content.2": {
    en: "Fields such as gender, age range, and disability status help ensure equitable representation across social groups.",
    rw: "Ibice nk'igitsina, imyaka, n'ubumuga bifasha kwemeza ko abantu bose bahagarariye neza.",
  },
  "section.6.content.3": {
    en: "All personal information must be handled ethically and kept confidential.",
    rw: "Amakuru yose bwite agomba gufatwa neza kandi agakomeza kuba ibanga.",
  },
  "section.7.content.0": {
    en: "Each land parcel in Rwanda has a Unique Parcel ID (UPI) based on administrative hierarchy.",
    rw: "Buri murima mu Rwanda ufite Nomero y'Umurima (UPI) ishingiye ku buyobozi.",
  },
  "section.7.content.1": {
    en: "Correct parcel identification ensures erosion reports are linked to the correct location.",
    rw: "Kumenya umurima neza byemeza ko raporo z'isuri zihuza n'ahantu hakwiriye.",
  },
  "section.7.content.2": {
    en: "If users forget the UPI, they can seek help from SEDOs, family members, or neighbors.",
    rw: "Niba abakoresha bibagiwe UPI, bashobora gusaba ubufasha ku ba SEDO, umuryango, cyangwa abaturanyi.",
  },
  "section.8.content.0": {
    en: "Common signs of erosion include gullies, rills, exposed roots, sediment deposits, and bare soil.",
    rw: "Ibimenyetso bisanzwe by'isuri birimo imigezi, imirongo, imizi igaragara, ibyondo, n'ubutaka butagira ikintu.",
  },
  "section.8.content.1": {
    en: "The SEC App focuses on observable evidence to make reporting easier and consistent.",
    rw: "SEC App ishingira ku bimenyetso bigaragara kugira ngo gutanga raporo bibe byoroshye kandi bihwanye.",
  },
  "section.8.content.2": {
    en: "The app does not measure erosion severity; other government systems handle detailed analysis.",
    rw: "App ntipima urugero rw'isuri; izindi sisitemu za leta zikora isesengura ryimbitse.",
  },
  "section.9.content.0": {
    en: "Erosion control measures such as terraces, agroforestry, and vegetation cover reduce runoff and stabilize soil.",
    rw: "Ingamba zo kurwanya isuri nk'amaterasi, ubuhinzi-burorere, n'ibimera bigabanya amazi atemba kandi bikomeza ubutaka.",
  },
  "section.9.content.1": {
    en: "Quantifying these measures improves planning and monitoring.",
    rw: "Kubara izo ngamba biteza imbere gutegura no gukurikirana.",
  },
  "section.9.content.2": {
    en: "The SEC App guides users through structured data entry to support accuracy.",
    rw: "SEC App iyobora abakoresha mu kwinjiza amakuru yubahirije uburyo kugira ngo hafashwe neza.",
  },
  "section.10.content.0": {
    en: "Before live deployment, users should practice using the SEC App simulator.",
    rw: "Mbere yo gukoresha by'ukuri, abakoresha bagomba kwimenyereza bakoresheje SEC App simulator.",
  },
  "section.10.content.1": {
    en: "This reduces errors and builds confidence in using the system.",
    rw: "Ibi bigabanya amakosa kandi bigatuma wizera sisitemu.",
  },
  "section.11.content.0": {
    en: "Let's review what you've learned! Answer these final questions to complete the training.",
    rw: "Reka dusubiremo ibyo wize! Subiza ibibazo bya nyuma kugira ngo urangize amahugurwa.",
  },

  // Learning objectives
  "objective.0": {
    en: "Explain how climate change contributes to soil erosion in Rwanda",
    rw: "Sobanura uko ihindagurika ry'ikirere riteza imbere isuri y'ubutaka mu Rwanda",
  },
  "objective.1": {
    en: "Describe the importance of community-based monitoring",
    rw: "Sobanura akamaro ko gukurikirana ibidukikije mu baturage",
  },
  "objective.2": {
    en: "Use the USSD SEC App to enter biodata, land parcels, erosion evidence, and control measures",
    rw: "Koresha USSD SEC App kwinjiza amakuru y'umuntu, imirima, ibimenyetso by'isuri, n'ingamba zo kurwanya",
  },
  "objective.3": {
    en: "Apply gender equality and social inclusion principles",
    rw: "Gushyira mu bikorwa uburinganire n'ubusabane",
  },
  "objective.4": {
    en: "Practice reporting using a simulator before live deployment",
    rw: "Kwimenyereza gutanga raporo ukoresheje simulator mbere yo gukoresha by'ukuri",
  },

  // Practice tasks
  "practice.0": { en: "Enter biodata", rw: "Injiza amakuru y'umuntu" },
  "practice.1": { en: "Enter a land parcel (UPI)", rw: "Injiza umurima (UPI)" },
  "practice.2": { en: "Report erosion evidence", rw: "Tanga raporo y'ibimenyetso by'isuri" },
  "practice.3": { en: "Record erosion control measures", rw: "Andika ingamba zo kurwanya isuri" },

  // Questions
  "q3-1.question": {
    en: "Which climate change factor most directly increases soil erosion in Rwanda?",
    rw: "Ni ikihe kintu cy'ihindagurika ry'ikirere cyongerera isuri y'ubutaka mu Rwanda?",
  },
  "q3-1.0": { en: "Rising temperatures", rw: "Ubushyuhe burerure" },
  "q3-1.1": { en: "Intense and unpredictable rainfall", rw: "Imvura nyinshi idahwitse" },
  "q3-1.2": { en: "Decreased humidity", rw: "Ubukonje buke" },
  "q3-1.3": { en: "Longer dry seasons", rw: "Ibihe by'amapfa birebire" },
  "q3-1.correct": {
    en: "Correct! Intense and unpredictable rainfall increases runoff, which accelerates soil erosion.",
    rw: "Nibyo! Imvura nyinshi idahwitse yongerera amazi atemba, bigateza isuri y'ubutaka.",
  },
  "q3-1.incorrect": {
    en: "Incorrect. This factor does not directly cause large-scale soil erosion. Intense rainfall is the primary driver.",
    rw: "Sibyo. Iki kintu ntigiteza isuri y'ubutaka ku rugero runini. Imvura nyinshi ni yo mpamvu y'ibanze.",
  },

  "q4-1.question": { en: "Community participation helps detect soil erosion early.", rw: "Uruhare rw'abaturage rufasha kumenya isuri y'ubutaka hakiri kare." },
  "q4-1.0": { en: "True", rw: "Nibyo" },
  "q4-1.1": { en: "False", rw: "Sibyo" },
  "q4-1.correct": { en: "Correct! Community members often observe erosion before it becomes severe.", rw: "Nibyo! Abaturage basanzwe babona isuri mbere y'uko ikomeye." },
  "q4-1.incorrect": { en: "Incorrect. Community monitoring is essential for early detection.", rw: "Sibyo. Gukurikirana kw'abaturage ni ngombwa mu kumenya hakiri kare." },

  "q4-2.question": { en: "Why is inclusive monitoring important?", rw: "Kuki gukurikirana guhwanye ari ngombwa?" },
  "q4-2.0": { en: "It reduces reporting time", rw: "Bigabanya igihe cyo gutanga raporo" },
  "q4-2.1": { en: "It captures knowledge from all community members", rw: "Bifata ubumenyi bw'abaturage bose" },
  "q4-2.2": { en: "It replaces technical surveys", rw: "Bisimbuza ubushakashatsi bwa tekiniki" },
  "q4-2.3": { en: "It limits participation", rw: "Bigabanya uruhare" },
  "q4-2.correct": { en: "Correct! Inclusive monitoring ensures all relevant knowledge is captured.", rw: "Nibyo! Gukurikirana guhwanye byemeza ko ubumenyi bwose bukenewe bufashwe." },
  "q4-2.incorrect": { en: "Incorrect. Inclusion strengthens, not limits, environmental monitoring.", rw: "Sibyo. Ubusabane bukomeza, ntibugabanya, gukurikirana ibidukikije." },

  "q4-3.question": { en: "Who may observe erosion in different locations? (Select all that apply)", rw: "Ni nde ushobora kubona isuri mu hantu hatandukanye? (Hitamo byose bikwiriye)" },
  "q4-3.0": { en: "Women", rw: "Abagore" },
  "q4-3.1": { en: "Men", rw: "Abagabo" },
  "q4-3.2": { en: "Youth", rw: "Urubyiruko" },
  "q4-3.3": { en: "Only landowners", rw: "Abanyabutaka gusa" },
  "q4-3.correct": { en: "Correct! Different groups observe erosion in different places.", rw: "Nibyo! Amatsinda atandukanye abona isuri mu hantu hatandukanye." },
  "q4-3.incorrect": { en: "Incorrect. Erosion observations are not limited to landowners — women, men, and youth all contribute.", rw: "Sibyo. Kubona isuri ntibigenewe abanyabutaka gusa — abagore, abagabo, n'urubyiruko bose batanga uruhare." },

  "q5-1.question": { en: "What is one key advantage of the USSD SEC App?", rw: "Ni iki kimwe cyiza cya USSD SEC App?" },
  "q5-1.0": { en: "Requires a smartphone", rw: "Isaba telefoni igezweho" },
  "q5-1.1": { en: "Requires internet", rw: "Isaba interineti" },
  "q5-1.2": { en: "Works on basic phones without internet", rw: "Ikora kuri telefoni isanzwe nta interineti" },
  "q5-1.3": { en: "Only works in offices", rw: "Ikora mu biro gusa" },
  "q5-1.correct": { en: "Correct! USSD works on basic phones and does not require internet.", rw: "Nibyo! USSD ikora kuri telefoni isanzwe kandi ntisaba interineti." },
  "q5-1.incorrect": { en: "Incorrect. The SEC App was designed for low-connectivity environments using basic phones.", rw: "Sibyo. SEC App yashyizweho ku buryo ikora ahantu hafite interineti nke ukoresheje telefoni isanzwe." },

  "q6-1.question": { en: "Why is accurate biodata important?", rw: "Kuki amakuru y'umuntu yizewe ari ngombwa?" },
  "q6-1.0": { en: "It makes reports longer", rw: "Bituma raporo ziba ndende" },
  "q6-1.1": { en: "It links reports to real users and supports planning", rw: "Bihuza raporo n'abakoresha b'ukuri kandi bishyigikira gutegura" },
  "q6-1.2": { en: "It is optional and not needed", rw: "Ni ibyo guhitamo kandi ntibikenewe" },
  "q6-1.3": { en: "It replaces field visits", rw: "Bisimbuza gusura ahantu" },
  "q6-1.correct": { en: "Correct! Accurate biodata ensures reports are traceable and useful for planning.", rw: "Nibyo! Amakuru y'umuntu yizewe yemeza ko raporo zikurikiranwa kandi zigafasha mu gutegura." },
  "q6-1.incorrect": { en: "Incorrect. Biodata is essential for linking reports to real users and locations.", rw: "Sibyo. Amakuru y'umuntu ni ngombwa mu guhuza raporo n'abakoresha n'aho bari." },

  "q7-1.question": { en: "Biodata collected through the SEC App should be kept confidential.", rw: "Amakuru y'umuntu yakusanyijwe muri SEC App agomba kuguma ari ibanga." },
  "q7-1.0": { en: "True", rw: "Nibyo" },
  "q7-1.1": { en: "False", rw: "Sibyo" },
  "q7-1.correct": { en: "Correct! Confidentiality protects users and builds trust.", rw: "Nibyo! Ibanga ririnda abakoresha kandi ryubaka icyizere." },
  "q7-1.incorrect": { en: "Incorrect. Personal data must always be protected.", rw: "Sibyo. Amakuru bwite agomba guhora arindwa." },

  "q7-2.question": { en: "What does the long UPI represent?", rw: "UPI ndende ihagarariye iki?" },
  "q7-2.0": { en: "Phone number", rw: "Nomero ya telefoni" },
  "q7-2.1": { en: "Unique land parcel identification", rw: "Kumenya umurima ku buryo bwihariye" },
  "q7-2.2": { en: "Erosion severity score", rw: "Amanota y'urugero rw'isuri" },
  "q7-2.3": { en: "District budget code", rw: "Kode y'ingengo y'imari y'akarere" },
  "q7-2.correct": { en: "Correct! The UPI uniquely identifies each land parcel.", rw: "Nibyo! UPI imenya buri murima ku buryo bwihariye." },
  "q7-2.incorrect": { en: "Incorrect. The UPI is used for geographic identification, not scoring.", rw: "Sibyo. UPI ikoreshwa mu kumenya aho ubutaka buri, ntabwo ari amanota." },

  "q8-1.question": { en: "Which are signs of soil erosion? (Select all that apply)", rw: "Ni ibihe bimenyetso by'isuri y'ubutaka? (Hitamo byose bikwiriye)" },
  "q8-1.0": { en: "Gullies", rw: "Imigezi" },
  "q8-1.1": { en: "Exposed roots", rw: "Imizi igaragara" },
  "q8-1.2": { en: "Bare soil", rw: "Ubutaka butagira ikintu" },
  "q8-1.3": { en: "Healthy crops", rw: "Ibihingwa byiza" },
  "q8-1.correct": { en: "Correct! These are visible signs of erosion.", rw: "Nibyo! Ibi ni ibimenyetso bigaragara by'isuri." },
  "q8-1.incorrect": { en: "Incorrect. Healthy crops do not indicate erosion.", rw: "Sibyo. Ibihingwa byiza ntibigaragaza isuri." },

  "q9-1.question": { en: "Which is an erosion control measure?", rw: "Ni iyihe ngamba yo kurwanya isuri?" },
  "q9-1.0": { en: "Gullies", rw: "Imigezi" },
  "q9-1.1": { en: "Terraces", rw: "Amaterasi" },
  "q9-1.2": { en: "Sediment deposits", rw: "Ibyondo" },
  "q9-1.3": { en: "Bare soil", rw: "Ubutaka butagira ikintu" },
  "q9-1.correct": { en: "Correct! Terraces are used to control erosion.", rw: "Nibyo! Amaterasi akoreshwa mu kurwanya isuri." },
  "q9-1.incorrect": { en: "Incorrect. These are signs of erosion, not control measures.", rw: "Sibyo. Ibi ni ibimenyetso by'isuri, ntabwo ari ingamba zo kurwanya." },

  "q11-1.question": { en: "USSD works without internet.", rw: "USSD ikora nta interineti." },
  "q11-1.0": { en: "True", rw: "Nibyo" },
  "q11-1.1": { en: "False", rw: "Sibyo" },
  "q11-1.correct": { en: "Correct! USSD technology does not require internet access.", rw: "Nibyo! Ikoranabuhanga rya USSD ntrisaba interineti." },
  "q11-1.incorrect": { en: "Incorrect. USSD is designed to work without internet connectivity.", rw: "Sibyo. USSD yashyizweho ku buryo ikora nta interineti." },

  "q11-2.question": { en: "Accurate biodata supports planning.", rw: "Amakuru y'umuntu yizewe ashyigikira gutegura." },
  "q11-2.0": { en: "True", rw: "Nibyo" },
  "q11-2.1": { en: "False", rw: "Sibyo" },
  "q11-2.correct": { en: "Correct! Accurate biodata makes reports useful for planning.", rw: "Nibyo! Amakuru y'umuntu yizewe atuma raporo zifasha mu gutegura." },
  "q11-2.incorrect": { en: "Incorrect. Biodata is essential for effective planning.", rw: "Sibyo. Amakuru y'umuntu ni ngombwa mu gutegura neza." },

  "q11-3.question": { en: "Community monitoring supports early detection.", rw: "Gukurikirana kw'abaturage gushyigikira kumenya hakiri kare." },
  "q11-3.0": { en: "True", rw: "Nibyo" },
  "q11-3.1": { en: "False", rw: "Sibyo" },
  "q11-3.correct": { en: "Correct! Communities are often the first to notice erosion.", rw: "Nibyo! Abaturage ni bo basanzwe babona isuri mbere." },
  "q11-3.incorrect": { en: "Incorrect. Community monitoring is key to early detection.", rw: "Sibyo. Gukurikirana kw'abaturage ni ngombwa mu kumenya hakiri kare." },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string, params?: Record<string, string>) => {
    let text = translations[key]?.[lang] || translations[key]?.en || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
