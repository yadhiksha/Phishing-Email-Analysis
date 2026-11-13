export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'You receive an email from "PayPal Security Team <service@paypal.com.verification-center.xyz>" warning that your account is locked. What is the true destination domain?',
    context: 'Look closely at the domain structure immediately preceding the first forward slash.',
    category: 'Domain & Subdomain Analysis',
    options: [
      {
        id: 'A',
        text: 'paypal.com (The official PayPal website)',
        isCorrect: false,
        explanation: '"paypal.com" is placed as a misleading subdomain. The root domain is actually verification-center.xyz.'
      },
      {
        id: 'B',
        text: 'verification-center.xyz (An attacker-controlled rogue domain)',
        isCorrect: true,
        explanation: 'Correct! In DNS hierarchies, the authoritative domain is the combination immediately preceding the top-level domain (.xyz). Here, verification-center.xyz is the attacker host.'
      },
      {
        id: 'C',
        text: 'service.paypal.com (An authorized PayPal mail relay)',
        isCorrect: false,
        explanation: 'Incorrect. The presence of ".xyz" at the end confirms this is not an official PayPal property.'
      },
      {
        id: 'D',
        text: 'It is a legitimate sub-organization of PayPal in the XYZ region',
        isCorrect: false,
        explanation: 'Incorrect. PayPal conducts customer operations exclusively through paypal.com.'
      }
    ]
  },
  {
    id: 2,
    question: 'An email states you must update your password within 2 hours or your corporate account will be permanently erased. What psychological trigger is being exploited?',
    context: 'Notice the extreme deadline and catastrophic consequences.',
    category: 'Social Engineering Psychology',
    options: [
      {
        id: 'A',
        text: 'Curiosity and technical interest',
        isCorrect: false,
        explanation: 'Curiosity lures typically involve teasers, leaked salary lists, or gossip.'
      },
      {
        id: 'B',
        text: 'Artificial Urgency and Fear (Panic Induction)',
        isCorrect: true,
        explanation: 'Correct! Attackers use artificial time-pressure and severe consequences to force victims into acting impulsively before they have time to verify.'
      },
      {
        id: 'C',
        text: 'Deference to peer social proof',
        isCorrect: false,
        explanation: 'Social proof involves citing that "everyone else has already done this".'
      },
      {
        id: 'D',
        text: 'Reciprocity',
        isCorrect: false,
        explanation: 'Reciprocity involves giving a gift or favor first to create obligation.'
      }
    ]
  },
  {
    id: 3,
    question: 'When reporting a suspected phishing email manually to the security team, how should you forward it?',
    context: 'Consider the importance of preserving original envelope routing and authentication headers.',
    category: 'Incident Response & Evidence Preservation',
    options: [
      {
        id: 'A',
        text: 'Forward as a standard inline message so the SOC analyst can read it easily',
        isCorrect: false,
        explanation: 'Inline forwarding strips crucial headers (Received-SPF, DKIM, Return-Path), destroying forensic attribution.'
      },
      {
        id: 'B',
        text: 'Forward as an original RFC attachment (.eml or .msg format)',
        isCorrect: true,
        explanation: 'Correct! Forwarding as an attachment preserves the full original MIME headers, routing trace, and cryptographic signatures needed for automated containment.'
      },
      {
        id: 'C',
        text: 'Copy and paste the links directly into the company general chat channel',
        isCorrect: false,
        explanation: 'Never paste live malicious URLs into shared chat channels where coworkers could accidentally click them.'
      },
      {
        id: 'D',
        text: 'Take a cell phone photo of your monitor and text it to IT',
        isCorrect: false,
        explanation: 'A photo contains no machine-readable headers or URLs and cannot be ingested by SIEM or SOAR security tools.'
      }
    ]
  },
  {
    id: 4,
    question: 'You receive an unsolicited job offer offering $120/hr with no interview required, asking you to chat on Telegram. What type of scam is this?',
    context: 'High salary, zero interview, external chat redirection, check for home equipment.',
    category: 'Recruitment & Advance Fee Fraud',
    options: [
      {
        id: 'A',
        text: 'Recruitment Fraud / Fake Check & Advance Fee Scam',
        isCorrect: true,
        explanation: 'Correct! The scammer intends to send a fraudulent counterfeit check for "home office equipment" and instruct you to wire real funds back before the check bounces.'
      },
      {
        id: 'B',
        text: 'A progressive tech startup with modern agile hiring practices',
        isCorrect: false,
        explanation: 'No legitimate enterprise offers six-figure salaries without technical vetting or identity verification.'
      },
      {
        id: 'C',
        text: 'Legitimate Telegram corporate onboarding',
        isCorrect: false,
        explanation: 'Corporate HR processes operate through audited corporate email and enterprise ATS platforms.'
      },
      {
        id: 'D',
        text: 'A harmless marketing survey',
        isCorrect: false,
        explanation: 'This scam routinely leads to identity theft and substantial personal financial loss.'
      }
    ]
  },
  {
    id: 5,
    question: 'What is the "STOP" in the STOP -> VERIFY -> REPORT -> DELETE -> WARN workflow designed to accomplish?',
    context: 'Focus on immediate response behavior when an email feels urgent or off.',
    category: 'Safe Reporting Procedure',
    options: [
      {
        id: 'A',
        text: 'Shut down and unplug your computer completely',
        isCorrect: false,
        explanation: 'Unplugging the computer is unnecessary unless active ransomware execution is confirmed.'
      },
      {
        id: 'B',
        text: 'Halt all interaction, pause, and refrain from clicking links or opening files',
        isCorrect: true,
        explanation: 'Correct! Taking a conscious pause breaks the attacker\'s psychological pressure loop and prevents impulsive payload activation.'
      },
      {
        id: 'C',
        text: 'Click "Unsubscribe" to stop receiving emails from the sender',
        isCorrect: false,
        explanation: 'Clicking "Unsubscribe" in a phishing email confirms your address is active and monitored by a human victim.'
      },
      {
        id: 'D',
        text: 'Reply to the sender demanding they stop messaging you',
        isCorrect: false,
        explanation: 'Replying alerts the scammer that their message was delivered and engaged with.'
      }
    ]
  }
];
