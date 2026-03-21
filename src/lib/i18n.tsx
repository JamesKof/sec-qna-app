import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "rw";

const translations: Record<string, Record<Language, string>> = {
  // Welcome Screen
  "welcome.title": { en: "SEC USSD App Training", rw: "Sisitemu ya USSD yo gutanga amakuru azafasha mu kurwanya isuri" },
  "welcome.project": { en: "125 Rwanda Project", rw: "125 Rwanda Project" },
  "welcome.description": {
    en: "Learn to use the USSD Soil Erosion Control App for community-based environmental monitoring — step by step, right from your phone.",
    rw: "Iga gukoresha porogaramu ya USSD yo kugenzura no kurwanya isuri (USSD SEC App) — intambwe ku ntambwe, ukoresheje telefoni yawe.",
  },
  "welcome.start": { en: "Start Training", rw: "Tangira Amahugurwa" },
  "welcome.info": { en: "11 sections · Interactive quizzes · ~25 minutes", rw: "Igice 11 · Ibibazo bihuza · ~Iminota 25" },
  "welcome.dashboard": { en: "View Dashboard", rw: "Reba Dashboard" },
  "welcome.nameNote": {
    en: "Your full name (for certification) should include First Name (required), Middle Name (optional), Last Name (required), and District Name (required).",
    rw: "Amazina yawe azandikwa kuri SERITIFIKA agomba kuba arimo Izina rya mbere (Ni ngombwa cyane), Izina ryo hagati (Niba ntaryo ufite uryihorere), Izina ry'ababyeyi (Ni ngombwa cyane), n'Izina ry'Akarere (Ni ngombwa).",
  },
  "welcome.firstName": { en: "First Name", rw: "Izina rya Mbere" },
  "welcome.firstNamePlaceholder": { en: "Enter first name", rw: "Injiza izina rya mbere" },
  "welcome.middleName": { en: "Middle Name", rw: "Izina ryo Hagati" },
  "welcome.middleNamePlaceholder": { en: "Optional", rw: "Niba ntaryo uryihorere" },
  "welcome.lastName": { en: "Last Name", rw: "Izina ry'Ababyeyi" },
  "welcome.lastNamePlaceholder": { en: "Enter last name", rw: "Injiza izina ry'ababyeyi" },
  "welcome.district": { en: "District", rw: "Akarere" },
  "welcome.districtPlaceholder": { en: "Enter district name", rw: "Injiza izina ry'akarere" },

  // Keep legacy keys for backward compat
  "welcome.nameLabel": { en: "Your full name (for certificate)", rw: "Amazina yawe yose (ku cyemezo)" },
  "welcome.namePlaceholder": { en: "Enter your full name", rw: "Injiza amazina yawe yose" },

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

  // Training section titles
  "section.1.title": { en: "Introduction", rw: "Intangiriro" },
  "section.2.title": { en: "Learning Objectives", rw: "Intego z'Iri Somo" },
  "section.3.title": { en: "Climate Change & Soil Erosion", rw: "Imihindagurikire y'Ikirere n'Isuri" },
  "section.4.title": { en: "Social & Gender Dimensions", rw: "Imiterere n'Imibereho bya Muntu mu Kugenzura no Kurwanya Isuri" },
  "section.5.title": { en: "Why USSD Technology", rw: "Isobanurampamvu ry'Ikoranabuhanga rya USSD" },
  "section.6.title": { en: "Entering Biodata", rw: "Amakuru y'Umwirondoro" },
  "section.7.title": { en: "Land Parcel Identification (UPI)", rw: "Kumenya Kwinjiza Nimero Iranga Ubutaka (UPI)" },
  "section.8.title": { en: "Erosion Evidence", rw: "Ibimenyetso by'Isuri" },
  "section.9.title": { en: "Erosion Control Measures", rw: "Ingamba zo Kurwanya Isuri" },
  "section.10.title": { en: "Simulator Practice", rw: "Kwimenyereza Ukoresheje Igisa na SEC App" },
  "section.11.title": { en: "Final Check", rw: "Isuzuma rya Nyuma no Gusoza" },

  // Section content — updated from professional document
  "section.1.content.0": {
    en: "Welcome to the SEC App Online Training Module!",
    rw: "Murakaza neza muri iri somo ry'iyakure kuri porogaramu ikoreshwa mu gutanga amakuru azafasha mu kurwanya isuri",
  },
  "section.1.content.1": {
    en: "This interactive lesson will guide you step-by-step through the use of the USSD Soil Erosion Control (SEC) App. You will learn why soil erosion monitoring matters, how climate change influences erosion, and how to correctly report erosion evidence and control measures using a basic mobile phone.",
    rw: "Iri somo rirakuyobora, intambwe ku yindi, mu gukoresha porogaramu ya USSD yo kugenzura no kurwanya isuri (USSD SEC App). Urasobanukirwa impamvu gukurikirana isuri ari ngombwa, uko imihindagurikire y'ikirere itera isuri, n'uburyo bwo gutanga amakuru yo kugenzura no kurwanya isuri hifashishijwe telefoni isanzwe.",
  },
  "section.1.content.2": {
    en: "This lesson is self-paced. Please read each section carefully and answer the questions that follow.",
    rw: "Iri somo urikurikirana ukurikije igihe ufite. Urasabwa gusoma neza kandi witonze buri gice, mbere yo gusubiza ibibazo bizakurikiraho.",
  },
  "section.1.content.3": {
    en: "The training is part of the 125 Rwanda Project, supporting community-based environmental monitoring across Rwanda.",
    rw: "Iri somo riratangwa mu buryo bufasha abantu bose kwibonamo. Abantu bose bagomba kugira uburenganzira bungana ku nyungu zose bahabwa n'igihugu, baba abagore, abagabo, urubyiruko n'abafite ubumuga.",
  },
  "section.2.content.0": {
    en: "By the end of this lesson, you will be able to:",
    rw: "Nyuma y'iri somo, uraba ushobora:",
  },
  "section.3.content.0": {
    en: "Climate change is increasing rainfall variability and the frequency of intense storms in Rwanda. When heavy rain falls over a short period, water flows rapidly over land surfaces, washing away fertile topsoil.",
    rw: "Imihindagurikire y'ikirere iri gutera impinduka mu buryo imvura igwamo n'ubwinshi bwayo butera imyuzure ikomeye mu Rwanda. Iyo imvura nyinshi iguye mu gihe gito, amazi atemba yihuta ku butaka, agakuraho igice cy'ubutaka gihingwa (topsoil) akenshi kiba kirimo intungabihingwa.",
  },
  "section.3.content.1": {
    en: "Soil erosion reduces agricultural productivity, increases sedimentation in rivers, and contributes to land degradation. These impacts are especially severe in areas with steep slopes and intensive land use.",
    rw: "Isuri igabanya umusaruro w'ubuhinzi, ikongera ubutaka bwitekera (sediments) mu migezi n'inzuzi, kandi igateza kwangirika kw'ubutaka. Izi ngaruka zirushaho gukomera cyane cyane ahantu hahanamye n'ahantu ubutaka bukoreshwa cyane.",
  },
  "section.3.content.2": {
    en: "Community members are often the first to notice erosion. Their observations support early detection and timely response.",
    rw: "Abaturage akenshi ni bo ba mbere babona ibimenyetso by'isuri. Ibyo babona byafasha ubuyobozi gushaka ibisubizo vuba. Ingaruka z'imihindagurikire y'ikirere ntizigaragara kimwe. Izo ngaruka ntizingana ku bagore, urubyiruko, n'abatishoboye akenshi kubera ko batagira uruhare rungana ku mutungo, amakuru, n'ubushobozi mu gufata ibyemezo.",
  },
  "section.4.content.0": {
    en: "Women, men, and youth experience and observe soil erosion differently because of their daily activities.",
    rw: "Abagore, abagabo, n'urubyiruko babona isuri mu buryo butandukanye bitewe n'ibikorwa byabo bya buri munsi. Abagore bashobora kubona isuri hafi y'aho amazi aturuka cyangwa mu mirima iri hafi y'ingo, mu gihe abagabo akenshi bayibona mu mirima minini. Urubyiruko akenshi ruyibona ku mihanda cyangwa aho amatungo anyura cyangwa mu nzuri. Abafite ubumuga bashobora guhura n'imbogamizi z'inyongera mu kugenzura no gukurikirana cyangwa gutanga amakuru y'isuri.",
  },
  "section.4.content.1": {
    en: "Women may notice erosion near water sources or gardens, while men often observe erosion in larger fields. Youth frequently notice erosion along paths and grazing areas.",
    rw: "Gushyira hamwe izi ngeri zose byongera ubuziranenge bw'amakuru kandi bigatuma hafatwa ibyemezo byiza kandi bikwiriye mu kurengera ibidukikije.",
  },
  "section.4.content.2": {
    en: "Including all these perspectives improves data quality and ensures fair and effective environmental decision-making.",
    rw: "Ikurikiranabikorwa rikozwe na bose byafasha gufata ingamba zitandukanye kandi bigafasha kubonera hamwe ibisubizo by'imihindagurikire y'ikirere.",
  },
  "section.5.content.0": {
    en: "USSD technology allows users to interact with the SEC App using simple menu prompts on basic mobile phones. It does not require internet access or smartphones.",
    rw: "Ikoranabuhanga rya USSD rituma abakoresha bashobora gukoresha SEC App bakoresheje menu yoroshye kuri telefoni isanzwe. Ntisaba interineti cyangwa telefoni zigezweho.",
  },
  "section.5.content.1": {
    en: "This makes the SEC App accessible to people in remote areas, older users, and those with limited connectivity, supporting equitable participation.",
    rw: "Ibi bituma SEC App igerwaho n'abantu bari mu turere tw'icyaro, abakuze, n'abafite interineti nke, bishyigikira ubusabane bungana.",
  },
  "section.6.content.0": {
    en: "Biodata links each erosion report to a real user and location, making reports traceable and useful for planning. Accurate biodata improves reliability and supports inclusive monitoring.",
    rw: "Amakuru y'umuntu ahuza buri raporo y'isuri n'umukoresha n'aho ari, bituma raporo zikurikiranwa kandi zigafasha mu gutegura. Amakuru y'umuntu yizewe ateza imbere kwizera no gushyigikira gukurikirana guhwanye.",
  },
  "section.6.content.1": {
    en: "Fields such as gender, age range, and disability status help ensure equitable representation across social groups.",
    rw: "Ibice nk'igitsina, imyaka, n'ubumuga bifasha kwemeza ko abantu bose bahagarariye neza.",
  },
  "section.6.content.2": {
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
    en: "The first single digit is the province code; the first two digits are the district code; the second two digits are the sector code; the third two digits are the cell code; and the last set of digits are the short UPI for the parcel. Note that the short UPI may have 3 or 4 digits.",
    rw: "Imibare ya mbere ni kode y'intara; imibare ibiri ya mbere ni kode y'akarere; imibare ibiri ya kabiri ni kode y'umurenge; imibare ibiri ya gatatu ni kode y'akagari; n'imibare ya nyuma ni UPI ngufi y'umurima. Menya ko UPI ngufi ishobora kugira imibare 3 cyangwa 4.",
  },
  "section.7.content.3": {
    en: "If users forget the UPI, they can seek help from SEDOs, family members, or neighbors.",
    rw: "Niba abakoresha bibagiwe UPI, bashobora gusaba ubufasha ku ba SEDO, umuryango, cyangwa abaturanyi.",
  },
  "section.8.content.0": {
    en: "When erosion occurs on a land parcel, it can easily be observed by community members. Common signs of soil erosion include exposed roots and bare soil indicating sheet and rill erosion, shallow channels indicating small gullies, deep channels indicating big gullies, rills, collapsed river banks indicating river bank erosion, turbid water indicating transported soil from surrounding lands, and movement of land en masse indicating landslides. The SEC App focuses on observable evidence to make reporting easier and consistent.",
    rw: "Iyo isuri ibaye ku murima, abaturage bashobora kubibona byoroshye. Ibimenyetso bisanzwe by'isuri y'ubutaka birimo imizi igaragara n'ubutaka butagira ikintu bigaragaza isuri y'urupapuro n'imirongo, imirongo migufi igaragaza imyobo mito, imirongo miremire igaragaza imyobo minini, inkombe z'imigezi zatemvye zigaragaza isuri y'inkombe, amazi y'umukara agaragaza ubutaka bujyanwe n'amazi, n'ubutaka bwimuka byinshi bigaragaza inyerera. SEC App ishingira ku bimenyetso bigaragara kugira ngo gutanga raporo bibe byoroshye kandi bihwanye.",
  },
  "section.8.content.1": {
    en: "The SEC app does not report erosion severity; other government systems handle detailed analysis.",
    rw: "SEC App ntitanga raporo y'urugero rw'isuri; izindi sisitemu za leta zikora isesengura ryimbitse.",
  },
  "section.8.content.2": {
    en: "Encouraging observations from diverse community members strengthens the accuracy and inclusiveness of environmental data by incorporating localized knowledge from women, youth, and marginalized groups.",
    rw: "Gushishikariza abaturage batandukanye gutanga ibyo babona byongera ireme n'ubwuzuzanye bw'amakuru y'ibidukikije mu gufatanya ubumenyi bw'abagore, urubyiruko, n'amatsinda asigaye inyuma.",
  },
  "section.8.content.3": {
    en: "The pictures above show sheet and rill erosion (top left), large gully (top middle), landslide (top right), small gully (bottom left), turbid water (bottom middle), and river bank erosion (bottom right).",
    rw: "Amafoto hejuru agaragaza isuri y'urupapuro n'imirongo (ibumoso hejuru), umwobo munini (hagati hejuru), inyerera (iburyo hejuru), umwobo muto (ibumoso hasi), amazi y'umukara (hagati hasi), n'isuri y'inkombe y'umugezi (iburyo hasi).",
  },
  "section.9.content.0": {
    en: "Communities are able to visually identify and quantify control measures that are implemented on land parcels to reduce soil erosion. Erosion control measures include: progressive terraces which consist of filtration ditches and bunds along the contour lines to reduce runoff; radical terraces which reduce slope steepness; agroforestry which introduces special trees to stabilise the soil; vegetative strips planted aligned with the filtration ditches and bunds to stabilize the soil; mulching which covers the soil to reduce the impact of rain drops and runoff; riparian buffers which consist of vegetation planted along the river to protect the banks; and check dams built across streams to reduce water velocity.",
    rw: "Abaturage bashobora kumenya no kubara ingamba zo kurwanya isuri zashyizweho ku mirima kugira ngo bagabanye isuri y'ubutaka. Ingamba zo kurwanya isuri zirimo: amaterasi agenda mbere agizwe n'imiyoboro yo gusukura n'udusozi ku mirongo y'ubutaka kugira ngo bagabanye amazi atemba; amaterasi y'ibanze agabanya uburemere bw'umuvuduko; ubuhinzi-burorere bushyiraho ibiti bidasanzwe kugira ngo bikomeze ubutaka; imirongo y'ibimera iteranye n'imiyoboro yo gusukura kugira ngo bikomeze ubutaka; gufunika ubutaka bigabanya ingaruka z'imvura n'amazi atemba; urukingiro rw'inkombe rugizwe n'ibimera bitewe ku nkombe z'umugezi kugira ngo birinde inkombe; n'amadamu mato yubatswe ku mito kugira ngo agabanye umuvuduko w'amazi.",
  },
  "section.9.content.1": {
    en: "The pictures above show progressive terraces (top left), agroforestry (top right), radical terraces (bottom left), riparian buffer (bottom middle) and mulching (bottom right) respectively.",
    rw: "Amafoto hejuru agaragaza amaterasi agenda mbere (ibumoso hejuru), ubuhinzi-burorere (iburyo hejuru), amaterasi y'ibanze (ibumoso hasi), urukingiro rw'inkombe (hagati hasi) n'gufunika ubutaka (iburyo hasi).",
  },
  "section.9.content.2": {
    en: "Quantifying these measures improves planning and monitoring. These control measures may be quantified by count (agroforestry trees, check dams), length (progressive terraces, filtration ditches, bunds, vegetative strips and riparian buffers) and area (radical terraces, mulching).",
    rw: "Kubara izo ngamba biteza imbere gutegura no gukurikirana. Izo ngamba zo kurwanya zishobora kubarwa ku mubare (ibiti by'ubuhinzi-burorere, amadamu mato), uburebure (amaterasi agenda mbere, imiyoboro yo gusukura, udusozi, imirongo y'ibimera n'urukingiro rw'inkombe) n'ubuso (amaterasi y'ibanze, gufunika ubutaka).",
  },
  "section.9.content.3": {
    en: "After quantifying the control measures, the app will ask you to report whether you want to increase the control measures in place. This depends on whether you have observed that the existing control measures are not sufficiently preventing or slowing down soil erosion on the land parcel.",
    rw: "Nyuma yo kubara ingamba zo kurwanya, app izagusaba gutanga raporo niba ushaka kongera ingamba zo kurwanya ziriho. Ibi bishingira ku ko wabonye ko ingamba zo kurwanya ziriho zitarahagije mu guhagarika cyangwa gutinda isuri y'ubutaka ku murima.",
  },
  "section.9.content.4": {
    en: "The SEC App guides users through structured data entry to support accuracy. Women, youth, and vulnerable groups often play critical roles in implementing soil conservation practices. Recognizing and documenting their contributions is essential for inclusive climate adaptation planning and policy development.",
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

  // Questions — updated from document
  "q3-1.question": {
    en: "Which climate change factor most directly increases soil erosion in your area (district)?",
    rw: "Ni ikihe kintu cy'ihindagurika ry'ikirere cyongerera isuri y'ubutaka mu karere kawe?",
  },
  "q3-1.0": { en: "Higher average temperatures", rw: "Ubushyuhe burerure" },
  "q3-1.1": { en: "Increased rainfall variability and extreme storms", rw: "Imvura nyinshi idahwitse n'inkubi z'umuyaga" },
  "q3-1.2": { en: "Wind speed in cities", rw: "Umuvuduko w'umuyaga mu mujyi" },
  "q3-1.3": { en: "Longer daylight hours", rw: "Amasaha y'urumuri menshi" },
  "q3-1.correct": {
    en: "Correct! Intense and unpredictable rainfall increases runoff, which accelerates soil erosion.",
    rw: "Nibyo! Imvura nyinshi idahwitse yongerera amazi atemba, bigateza isuri y'ubutaka.",
  },
  "q3-1.incorrect": {
    en: "Incorrect. This factor does not directly cause large-scale soil erosion.",
    rw: "Sibyo. Iki kintu ntigiteza isuri y'ubutaka ku rugero runini.",
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
  "q5-1.incorrect": { en: "Incorrect. The SEC App was designed for low-connectivity environments.", rw: "Sibyo. SEC App yashyizweho ku buryo ikora ahantu hafite interineti nke." },

  "q6-1.question": { en: "Why is accurate biodata important?", rw: "Kuki amakuru y'umuntu yizewe ari ngombwa?" },
  "q6-1.0": { en: "For advertising", rw: "Ku bw'ubucuruzi" },
  "q6-1.1": { en: "For traceability and planning", rw: "Ku bw'gukurikirana no gutegura" },
  "q6-1.2": { en: "To rank users", rw: "Gushyira abakoresha mu byiciro" },
  "q6-1.3": { en: "To identify political views", rw: "Kumenya ibitekerezo bya politiki" },
  "q6-1.correct": { en: "Correct! Accurate biodata supports planning and verification.", rw: "Nibyo! Amakuru y'umuntu yizewe ashyigikira gutegura no kugenzura." },
  "q6-1.incorrect": { en: "Incorrect. Biodata is collected only for official monitoring purposes.", rw: "Sibyo. Amakuru y'umuntu akusanywa gusa ku mpamvu zemewe zo gukurikirana." },

  "q6-2.question": { en: "Biodata collected through the SEC App should be kept confidential.", rw: "Amakuru y'umuntu yakusanyijwe muri SEC App agomba kuguma ari ibanga." },
  "q6-2.0": { en: "True", rw: "Nibyo" },
  "q6-2.1": { en: "False", rw: "Sibyo" },
  "q6-2.correct": { en: "Correct! Confidentiality protects users and builds trust.", rw: "Nibyo! Ibanga ririnda abakoresha kandi ryubaka icyizere." },
  "q6-2.incorrect": { en: "Incorrect. Personal data must always be protected.", rw: "Sibyo. Amakuru bwite agomba guhora arindwa." },

  // Keep legacy q7-1 keys for any references
  "q7-1.question": { en: "What does the long UPI represent?", rw: "UPI ndende ihagarariye iki?" },
  "q7-1.0": { en: "Phone number", rw: "Nomero ya telefoni" },
  "q7-1.1": { en: "Unique land parcel identification", rw: "Kumenya umurima ku buryo bwihariye" },
  "q7-1.2": { en: "Erosion severity score", rw: "Amanota y'urugero rw'isuri" },
  "q7-1.3": { en: "District budget code", rw: "Kode y'ingengo y'imari y'akarere" },
  "q7-1.correct": { en: "Correct! The UPI uniquely identifies each land parcel.", rw: "Nibyo! UPI imenya buri murima ku buryo bwihariye." },
  "q7-1.incorrect": { en: "Incorrect. The UPI is used for geographic identification, not scoring.", rw: "Sibyo. UPI ikoreshwa mu kumenya aho ubutaka buri, ntabwo ari amanota." },

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
