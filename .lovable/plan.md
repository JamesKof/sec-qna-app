

# SEC USSD App - Interactive Online Training

## Overview
A mobile-first interactive training web app that guides users through the USSD Soil Erosion Control (SEC) App for the 125 Rwanda Project. Features step-by-step lessons with interactive quizzes, progress tracking, and a completion certificate.

## Pages & Flow

### 1. Welcome / Landing Screen
- Project branding (125 Rwanda Project)
- Hero section with illustration of soil/landscape
- "Start Training" button
- Brief description of what the training covers

### 2. Interactive Training Module (Single-page with sections)
Progressive lesson flow with **11 sections**, each containing:

**Content Sections:**
- **Page 1 – Introduction**: Welcome message, training overview
- **Page 2 – Learning Objectives**: 5 bullet-point objectives with icons
- **Page 3 – Climate Change & Soil Erosion**: Educational content + Multiple Choice quiz
- **Page 4 – Social & Gender Dimensions**: True/False + Multiple Choice + Multi-Select quizzes
- **Page 5 – Why USSD Technology**: Educational content + Multiple Choice quiz
- **Page 6 – Entering Biodata**: Content about data collection + Multiple Choice quiz
- **Page 7 – Land Parcel Identification (UPI)**: True/False + Multiple Choice quizzes
- **Page 8 – Erosion Evidence**: Multi-Select quiz on erosion signs
- **Page 9 – Erosion Control Measures**: Multiple Choice quiz
- **Page 10 – Simulator Practice**: Practice task checklist
- **Page 11 – Final Check**: True/False set as final assessment

### 3. Completion / Certificate Screen
- Congratulations message
- Score summary (pass threshold: 70%)
- Option to retry if below passing score
- Shareable completion badge

## Interactive Question Types
- **Multiple Choice**: Single correct answer with radio buttons, instant feedback with ✅/❌
- **True/False**: Toggle-style answers with explanatory feedback
- **Multi-Select**: Checkbox-based, multiple correct answers with feedback
- All questions show color-coded feedback (green for correct, red for incorrect) with explanations

## Key UI/UX Features
- **Mobile-first design** with large touch targets and readable text
- **Progress bar** at the top showing completion percentage
- **Step navigation** with Previous/Next buttons
- **Section locking**: Must answer questions before advancing
- **Animated transitions** between sections
- **Illustrative icons/graphics** for each topic (soil, rain, phone, community, land parcels, erosion signs, terraces)
- **Score tracker** visible throughout
- **Responsive layout** that works on all screen sizes

## Design
- Earth-tone color palette (greens, browns, warm neutrals) reflecting the environmental/agricultural theme
- Clean card-based layout for content and questions
- Large, accessible fonts
- Iconography using Lucide icons (leaf, cloud-rain, users, smartphone, map-pin, mountain, shield-check)

## Tech Approach
- All content and questions stored as local data (no backend needed)
- React state management for progress, answers, and scoring
- Framer Motion for smooth page transitions
- Fully client-side, no authentication required

