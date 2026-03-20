export type QuestionType = 'multiple-choice' | 'true-false' | 'multi-select';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswers: number[]; // indices of correct options
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface TrainingSection {
  id: number;
  title: string;
  icon: string; // lucide icon name
  content: string[];
  image?: string;
  questions: QuizQuestion[];
  practiceTasks?: string[];
}

export const trainingSections: TrainingSection[] = [
  {
    id: 1,
    title: "Introduction",
    icon: "book-open",
    content: [
      "Welcome to the SEC App Online Training Module!",
      "This interactive lesson will guide you step-by-step through the use of the USSD Soil Erosion Control (SEC) App. You will learn why soil erosion monitoring matters, how climate change influences erosion, and how to correctly report erosion evidence and control measures using a basic mobile phone.",
      "This lesson is self-paced. Please read each section carefully and answer the questions that follow.",
      "The training is part of the 125 Rwanda Project, supporting community-based environmental monitoring across Rwanda."
    ],
    questions: []
  },
  {
    id: 2,
    title: "Learning Objectives",
    icon: "target",
    content: [
      "By the end of this lesson, you will be able to:"
    ],
    questions: []
  },
  {
    id: 3,
    title: "Climate Change & Soil Erosion",
    icon: "cloud-rain",
    content: [
      "Climate change is increasing rainfall variability and the frequency of intense storms in Rwanda. When heavy rain falls over a short period, water flows rapidly over land surfaces, washing away fertile topsoil.",
      "Soil erosion reduces agricultural productivity, increases sedimentation in rivers, and contributes to land degradation. These impacts are especially severe in areas with steep slopes and intensive land use.",
      "Community members are often the first to notice erosion. Their observations support early detection and timely response."
    ],
    questions: [
      {
        id: "q3-1",
        type: "multiple-choice",
        question: "Which climate change factor most directly increases soil erosion in your area (district)?",
        options: [
          "Higher average temperatures",
          "Increased rainfall variability and extreme storms",
          "Wind speed in cities",
          "Longer daylight hours"
        ],
        correctAnswers: [1],
        feedbackCorrect: "Correct! Intense and unpredictable rainfall increases runoff, which accelerates soil erosion.",
        feedbackIncorrect: "Incorrect. This factor does not directly cause large-scale soil erosion."
      }
    ]
  },
  {
    id: 4,
    title: "Social & Gender Dimensions",
    icon: "users",
    content: [
      "Women, men, and youth experience and observe soil erosion differently because of their daily activities.",
      "Women may notice erosion near water sources or gardens, while men often observe erosion in larger fields. Youth frequently notice erosion along paths and grazing areas.",
      "Including all these perspectives improves data quality and ensures fair and effective environmental decision-making."
    ],
    questions: [
      {
        id: "q4-1",
        type: "true-false",
        question: "Community participation helps detect soil erosion early.",
        options: ["True", "False"],
        correctAnswers: [0],
        feedbackCorrect: "Correct! Community members often observe erosion before it becomes severe.",
        feedbackIncorrect: "Incorrect. Community monitoring is essential for early detection."
      },
      {
        id: "q4-2",
        type: "multiple-choice",
        question: "Why is inclusive monitoring important?",
        options: [
          "It reduces reporting time",
          "It captures knowledge from all community members",
          "It replaces technical surveys",
          "It limits participation"
        ],
        correctAnswers: [1],
        feedbackCorrect: "Correct! Inclusive monitoring ensures all relevant knowledge is captured.",
        feedbackIncorrect: "Incorrect. Inclusion strengthens, not limits, environmental monitoring."
      },
      {
        id: "q4-3",
        type: "multi-select",
        question: "Who may observe erosion in different locations? (Select all that apply)",
        options: ["Women", "Men", "Youth", "Only landowners"],
        correctAnswers: [0, 1, 2],
        feedbackCorrect: "Correct! Different groups observe erosion in different places.",
        feedbackIncorrect: "Incorrect. Erosion observations are not limited to landowners — women, men, and youth all contribute."
      }
    ]
  },
  {
    id: 5,
    title: "Why USSD Technology",
    icon: "smartphone",
    content: [
      "USSD technology allows users to interact with the SEC App using simple menu prompts on basic mobile phones. It does not require internet access or smartphones.",
      "This makes the SEC App accessible to people in remote areas, older users, and those with limited connectivity, supporting equitable participation."
    ],
    questions: [
      {
        id: "q5-1",
        type: "multiple-choice",
        question: "What is one key advantage of the USSD SEC App?",
        options: [
          "Requires a smartphone",
          "Requires internet",
          "Works on basic phones without internet",
          "Only works in offices"
        ],
        correctAnswers: [2],
        feedbackCorrect: "Correct! USSD works on basic phones and does not require internet.",
        feedbackIncorrect: "Incorrect. The SEC App was designed for low-connectivity environments."
      }
    ]
  },
  {
    id: 6,
    title: "Entering Biodata",
    icon: "user-check",
    content: [
      "Biodata links each erosion report to a real user and location, making reports traceable and useful for planning. Accurate biodata improves reliability and supports inclusive monitoring.",
      "Fields such as gender, age range, and disability status help ensure equitable representation across social groups.",
      "All personal information must be handled ethically and kept confidential."
    ],
    questions: [
      {
        id: "q6-1",
        type: "multiple-choice",
        question: "Why is accurate biodata important?",
        options: [
          "For advertising",
          "For traceability and planning",
          "To rank users",
          "To identify political views"
        ],
        correctAnswers: [1],
        feedbackCorrect: "Correct! Accurate biodata supports planning and verification.",
        feedbackIncorrect: "Incorrect. Biodata is collected only for official monitoring purposes."
      },
      {
        id: "q6-2",
        type: "true-false",
        question: "Biodata collected through the SEC App should be kept confidential.",
        options: ["True", "False"],
        correctAnswers: [0],
        feedbackCorrect: "Correct! Confidentiality protects users and builds trust.",
        feedbackIncorrect: "Incorrect. Personal data must always be protected."
      }
    ]
  },
  {
    id: 7,
    title: "Land Parcel Identification (UPI)",
    icon: "map-pin",
    content: [
      "Each land parcel in Rwanda has a Unique Parcel ID (UPI) based on administrative hierarchy.",
      "Correct parcel identification ensures erosion reports are linked to the correct location.",
      "The first single digit is the province code; the first two digits are the district code; the second two digits are the sector code; the third two digits are the cell code; and the last set of digits are the short UPI for the parcel. Note that the short UPI may have 3 or 4 digits.",
      "If users forget the UPI, they can seek help from SEDOs, family members, or neighbors."
    ],
    questions: [
      {
        id: "q7-1",
        type: "multiple-choice",
        question: "What does the long UPI represent?",
        options: [
          "Phone number",
          "Unique land parcel identification",
          "Erosion severity score",
          "District budget code"
        ],
        correctAnswers: [1],
        feedbackCorrect: "Correct! The UPI uniquely identifies each land parcel.",
        feedbackIncorrect: "Incorrect. The UPI is used for geographic identification, not scoring."
      }
    ]
  },
  {
    id: 8,
    title: "Erosion Evidence",
    icon: "mountain",
    content: [
      "When erosion occurs on a land parcel, it can easily be observed by community members. Common signs of soil erosion include exposed roots and bare soil indicating sheet and rill erosion, shallow channels indicating small gullies, deep channels indicating big gullies, rills, collapsed river banks indicating river bank erosion, turbid water indicating transported soil from surrounding lands, and movement of land en masse indicating landslides. The SEC App focuses on observable evidence to make reporting easier and consistent.",
      "The SEC app does not report erosion severity; other government systems handle detailed analysis.",
      "Encouraging observations from diverse community members strengthens the accuracy and inclusiveness of environmental data by incorporating localized knowledge from women, youth, and marginalized groups.",
      "The pictures above show sheet and rill erosion (top left), large gully (top middle), landslide (top right), small gully (bottom left), turbid water (bottom middle), and river bank erosion (bottom right)."
    ],
    questions: [
      {
        id: "q8-1",
        type: "multi-select",
        question: "Which are signs of soil erosion? (Select all that apply)",
        options: ["Gullies", "Exposed roots", "Bare soil", "Healthy crops"],
        correctAnswers: [0, 1, 2],
        feedbackCorrect: "Correct! These are visible signs of erosion.",
        feedbackIncorrect: "Incorrect. Healthy crops do not indicate erosion."
      }
    ]
  },
  {
    id: 9,
    title: "Erosion Control Measures",
    icon: "shield-check",
    content: [
      "Communities are able to visually identify and quantify control measures that are implemented on land parcels to reduce soil erosion. Erosion control measures include: progressive terraces which consist of filtration ditches and bunds along the contour lines to reduce runoff; radical terraces which reduce slope steepness; agroforestry which introduces special trees to stabilise the soil; vegetative strips planted aligned with the filtration ditches and bunds to stabilize the soil; mulching which covers the soil to reduce the impact of rain drops and runoff; riparian buffers which consist of vegetation planted along the river to protect the banks; and check dams built across streams to reduce water velocity.",
      "The pictures above show progressive terraces (top left), agroforestry (top right), radical terraces (bottom left), riparian buffer (bottom middle) and mulching (bottom right) respectively.",
      "Quantifying these measures improves planning and monitoring. These control measures may be quantified by count (agroforestry trees, check dams), length (progressive terraces, filtration ditches, bunds, vegetative strips and riparian buffers) and area (radical terraces, mulching).",
      "After quantifying the control measures, the app will ask you to report whether you want to increase the control measures in place. This depends on whether you have observed that the existing control measures are not sufficiently preventing or slowing down soil erosion on the land parcel.",
      "The SEC App guides users through structured data entry to support accuracy. Women, youth, and vulnerable groups often play critical roles in implementing soil conservation practices. Recognizing and documenting their contributions is essential for inclusive climate adaptation planning and policy development."
    ],
    questions: [
      {
        id: "q9-1",
        type: "multiple-choice",
        question: "Which is an erosion control measure?",
        options: ["Gullies", "Terraces", "Sediment deposits", "Bare soil"],
        correctAnswers: [1],
        feedbackCorrect: "Correct! Terraces are used to control erosion.",
        feedbackIncorrect: "Incorrect. These are signs of erosion, not control measures."
      }
    ]
  },
  {
    id: 10,
    title: "Simulator Practice",
    icon: "monitor-smartphone",
    content: [
      "Before live deployment, users should practice using the SEC App simulator.",
      "This reduces errors and builds confidence in using the system."
    ],
    practiceTasks: [
      "Enter biodata",
      "Enter a land parcel (UPI)",
      "Report erosion evidence",
      "Record erosion control measures"
    ],
    questions: []
  },
  {
    id: 11,
    title: "Final Check",
    icon: "check-circle",
    content: [
      "Let's review what you've learned! Answer these final questions to complete the training."
    ],
    questions: [
      {
        id: "q11-1",
        type: "true-false",
        question: "USSD works without internet.",
        options: ["True", "False"],
        correctAnswers: [0],
        feedbackCorrect: "Correct! USSD technology does not require internet access.",
        feedbackIncorrect: "Incorrect. USSD is designed to work without internet connectivity."
      },
      {
        id: "q11-2",
        type: "true-false",
        question: "Accurate biodata supports planning.",
        options: ["True", "False"],
        correctAnswers: [0],
        feedbackCorrect: "Correct! Accurate biodata makes reports useful for planning.",
        feedbackIncorrect: "Incorrect. Biodata is essential for effective planning."
      },
      {
        id: "q11-3",
        type: "true-false",
        question: "Community monitoring supports early detection.",
        options: ["True", "False"],
        correctAnswers: [0],
        feedbackCorrect: "Correct! Communities are often the first to notice erosion.",
        feedbackIncorrect: "Incorrect. Community monitoring is key to early detection."
      }
    ]
  }
];

export const learningObjectives = [
  { text: "Explain how climate change contributes to soil erosion in Rwanda", icon: "cloud-rain" },
  { text: "Describe the importance of community-based monitoring", icon: "users" },
  { text: "Use the USSD SEC App to enter biodata, land parcels, erosion evidence, and control measures", icon: "smartphone" },
  { text: "Apply gender equality and social inclusion principles", icon: "heart-handshake" },
  { text: "Practice reporting using a simulator before live deployment", icon: "monitor-smartphone" }
];

export const PASSING_SCORE = 70;
