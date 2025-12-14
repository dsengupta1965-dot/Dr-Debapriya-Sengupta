import { Module } from '../types';

export const COURSE_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Module 1: Introduction to Stores Management',
    description: 'Understanding the role of Medical Officers in Materials Management and the IR-specific context.',
    learningOutcomes: [
      'Explain principles of Stores Management in IRHS',
      'Understand why it is a command function',
      'Differentiate roles of Medical vs Stores Dept'
    ],
    sections: [
      {
        title: 'Importance of Materials Management',
        content: 'Materials Management in Indian Railways is not merely a support function but a critical command responsibility. For IRHS officers, ensuring the availability of drugs, equipment, and consumables is directly linked to patient safety and operational efficiency.',
        keyPoints: ['Right Item', 'Right Quantity', 'Right Time', 'Right Price', 'Right Source']
      },
      {
        title: 'Role of Medical Officers',
        content: 'While the Stores Department handles bulk procurement, the Medical Department (user) is responsible for technical scrutiny, demand estimation, and safe custody. The CMS/MS acts as the primary custodian of medical stores within their division.',
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Who is primarily responsible for the technical scrutiny of medical items before procurement?',
        options: ['Stores Department', 'Finance Department', 'Medical Department (User)', 'Audit Department'],
        correctAnswer: 2,
        explanation: 'The Medical Department (Indenter) is responsible for specifications and technical suitability.'
      }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Classification of Medical Stores',
    description: 'Detailed classification including Stock, Non-Stock, Emergency, and Imprest items.',
    learningOutcomes: [
      'Classify items correctly',
      'Understand Imprest stores',
      'Differentiate Consumable vs Dead Stock'
    ],
    sections: [
      {
        title: 'Stock vs Non-Stock',
        content: '**Stock Items:** Items kept in custody of Stores Depot and drawn by medical units periodically (e.g., common antibiotics, bandages).\n\n**Non-Stock Items:** Items purchased specifically for a user against a specific requisition (e.g., specialized instruments).',
      },
      {
        title: 'Imprest Stores',
        content: 'Imprest is a standing advance of essential stores to meet day-to-day requirements of a hospital/health unit. It is recouped periodically based on consumption.',
        keyPoints: ['Fixed Quantity', 'Periodic Recoupment', 'Emergency buffer']
      }
    ],
    quiz: [
      {
        id: 'q2',
        question: 'An item kept in the Stores Depot and issued periodically to the hospital is classified as:',
        options: ['Non-Stock Item', 'Stock Item', 'Emergency Purchase', 'M&P Item'],
        correctAnswer: 1,
        explanation: 'Stock items are regular consumption items stocked by the Stores Department.'
      }
    ]
  },
  {
    id: 'm3',
    title: 'Module 3: Procurement of Drugs',
    description: 'Procedures for procurement, role of agencies, and Railway Board mandates.',
    learningOutcomes: [
      'Navigate the procurement hierarchy',
      'Understand PAC cases',
      'Apply 2022 Railway Board policy'
    ],
    sections: [
      {
        title: 'Mandatory Sources',
        content: 'Procurement must primarily be routed through the Stores Department. Direct purchase powers of medical officers are limited to emergencies and low-value local purchase categories.',
      },
      {
        title: 'PAC (Proprietary Article Certificate)',
        content: 'Issued when a specific brand/make is required due to technical necessity. Requires strong justification as it limits competition.',
        keyPoints: ['Justification essential', 'Competent authority sanction', 'Not for routine preference']
      }
    ],
    quiz: [
      {
        id: 'q3',
        question: 'PAC stands for:',
        options: ['Public Accounts Committee', 'Proprietary Article Certificate', 'Purchase Authorization Card', 'Primary Audit Check'],
        correctAnswer: 1,
        explanation: 'Proprietary Article Certificate is used when buying a specific brand/make without competition.'
      }
    ]
  },
  {
    id: 'm4',
    title: 'Module 4: Machinery & Plant (M&P)',
    description: 'Planning, justification, and replacement of medical equipment.',
    learningOutcomes: [
      'Define M&P in medical context',
      'Draft justification for replacement',
      'Understand COD Life'
    ],
    sections: [
      {
        title: 'M&P Definitions',
        content: 'Items costing above a specific threshold (e.g., ₹1 Lakh, subject to revision) and having a long life are treated as M&P. They are funded under specific Plan Heads.',
      },
      {
        title: 'Replacement vs Additional',
        content: 'Replacement requires a Condemnation Certificate of the old asset. Additional accounts require justification based on workload increase or new services.',
      }
    ],
    quiz: [
      {
        id: 'q4',
        question: 'Justification for "Replacement Account" M&P primarily requires:',
        options: ['Increase in patient load', 'Condemnation of old equipment', 'Availability of new technology', 'Surplus budget'],
        correctAnswer: 1,
        explanation: 'Replacement is on a 1-to-1 basis against a condemned asset.'
      }
    ]
  },
  {
    id: 'm6',
    title: 'Module 6: Registers & Documentation',
    description: 'The core of NAIR training: Maintaining mandatory registers.',
    learningOutcomes: [
      'Identify mandatory registers',
      'Detect irregularities in entries',
      'Prepare for inspections'
    ],
    sections: [
      {
        title: 'Key Registers',
        content: '1. **Day Book of Receipt:** Records all incoming items.\n2. **Stock Register:** Ledger of receipts, issues, and balance.\n3. **Expense Register:** Daily consumption tracking.\n4. **Dead Stock Register:** For durable assets (furniture, equipment).',
      },
      {
        title: 'Common Defects',
        content: 'Avoid: Overwriting, use of whitener, missing signature of officer, lack of initial on corrections.',
        keyPoints: ['No Whitener', 'Attest corrections', 'Page numbering essential']
      }
    ],
    quiz: [
      {
        id: 'q6',
        question: 'Which register tracks durable assets like furniture and medical equipment?',
        options: ['Expense Register', 'Consumable Register', 'Dead Stock Register', 'Day Book'],
        correctAnswer: 2,
        explanation: 'Dead Stock Register is for non-consumable, durable items.'
      }
    ]
  },
  {
    id: 'm9',
    title: 'Module 9: Audit, Vigilance & Inspection',
    description: 'Handling audits, common objections, and financial propriety.',
    learningOutcomes: [
      'Handle audit queries',
      'Understand vigilance angles',
      'Ensure financial propriety'
    ],
    sections: [
      {
        title: 'Common Audit Objections',
        content: '1. Purchase without budget.\n2. Splitting of quantity to bring within power.\n3. Expiry of drugs due to poor FIFO implementation.\n4. Mismatch in physical vs book balance.',
      },
      {
        title: 'Preventive Vigilance',
        content: 'Ensuring transparency in local purchase, rotating staff dealing with stores, and regular surprise checks by the Medical Officer.',
      }
    ],
    quiz: [
      {
        id: 'q9',
        question: 'Splitting a purchase demand to bring it within lower financial powers is:',
        options: ['Good administrative practice', 'A serious financial irregularity', 'Allowed in emergencies', 'Recommended by Accounts'],
        correctAnswer: 1,
        explanation: 'Splitting demands to bypass sanctioning authority limits is a vigilance angle irregularity.'
      }
    ]
  }
];