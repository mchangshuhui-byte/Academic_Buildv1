/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'cs4201',
    code: 'CS4201',
    title: 'Advanced Machine Learning & Neural Dynamics',
    faculty: 'Faculty of Computing',
    description: 'A deep dive into the architectures of transformer models and their applications in generative AI systems within research environments.',
    about: 'This intensive course covers the fundamental principles and advanced techniques of machine learning, focusing on deep neural network architectures. Students will engage with state-of-the-art research papers and implement large-scale models using distributed training frameworks.',
    credits: 4,
    difficulty: 'Advanced',
    semester: 'Semester 1',
    availableSeats: 42,
    totalSeats: 120,
    syllabus: [
      {
        id: 's1',
        number: '01',
        title: 'Linear Algebra & Matrix Calculus',
        description: 'Reviewing the mathematical backbone of high-dimensional optimization.'
      },
      {
        id: 's2',
        number: '02',
        title: 'Deep Feedforward Networks',
        description: 'Regularization, optimization algorithms, and backpropagation mechanics.'
      },
      {
        id: 's3',
        number: '03',
        title: 'Recurrent & Attention Mechanisms',
        description: 'Transformers and the rise of Large Language Models.'
      }
    ],
    grading: {
      assignments: 30,
      project: 20,
      exam: 50
    },
    instructor: {
      name: 'Dr. Elena Rodriguez',
      title: 'Senior Lecturer',
      group: 'AI RESEARCH GROUP',
      bio: 'Expert in stochastic optimization and natural language processing. Previously a Lead Scientist at DeepMind, her current research focuses on efficient inference in decentralized systems.',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1Mnh6lbOe6ElL79dHlMmdMsBV5rdSHTDXHsyCv5VkkjX9KwTrRnIa9wBo6cviTlDYjN__DZxjoISM9IcdkdEpLtM03F3CtxPYJpftR1xAKmHZoeODXVA1JMyZeQxMp0EUfzCKZHz2nrEpwe8Of0PhmjX_Om8PFrGXt6xVI6E6fnQpvuWWqZ0Q5WX3nmxwlurGMLglkMvkzpUyQsPK-FJLgUX7oqJdj_98rhHmJeu6m7eX2zDutHjy0JkVb_6DtJWjhoVqA-0c',
      schedule: [
        {
          type: 'Lecture',
          room: 'COM1-0201',
          timeSlot: 'Tues 10:00 - 12:00'
        },
        {
          type: 'Lab',
          room: 'COM2-0304',
          timeSlot: 'Fri 14:00 - 16:00'
        }
      ]
    },
    materials: [
      {
        title: 'Syllabus PDF',
        type: 'pdf',
        url: '#',
        action: 'download'
      },
      {
        title: 'Reading List 2024',
        type: 'link',
        url: '#',
        action: 'open'
      },
      {
        title: 'Lab Setup Guide',
        type: 'terminal',
        url: '#',
        action: 'download'
      }
    ],
    liveSession: {
      title: 'Live Q&A Preview',
      description: 'Join the upcoming pre-course orientation session to ask Dr. Elena Rodriguez anything about the module requirements.',
      time: 'Aug 14, 19:00 SGT'
    },
    prerequisites: [
      { code: 'CS2101', title: 'Python', satisfied: true },
      { code: 'MA1101', title: 'Calculus', satisfied: true },
      { code: 'CS3210', title: 'Parallel Computing', satisfied: false }
    ],
    requiresWaiver: true,
    waiverMessage: 'Requires departmental approval to waive CS3210.'
  },
  {
    id: 'cs2101',
    code: 'CS2101',
    title: 'Programming Methodology with Python',
    faculty: 'Faculty of Computing',
    description: 'Introduction to computer science concepts, structured programming, and analysis of algorithms using the Python language.',
    about: 'This foundational course introduces logic, control flow, functions, recursion, sorting algorithms, and data structures. It focuses on clean, readable programming practices and solving problems algorithmically.',
    credits: 4,
    difficulty: 'Beginner',
    semester: 'Semester 1',
    availableSeats: 88,
    totalSeats: 150,
    syllabus: [
      {
        id: 's21',
        number: '01',
        title: 'Control Flow & Statements',
        description: 'Variables, loops, and conditional logical execution.'
      },
      {
        id: 's22',
        number: '02',
        title: 'Data Structures in Python',
        description: 'Lists, tuples, dictionaries, and sets.'
      },
      {
        id: 's23',
        number: '03',
        title: 'Recursion & Dynamic Programming',
        description: 'Divide-and-conquer methodologies and memoization.'
      }
    ],
    grading: {
      assignments: 40,
      project: 10,
      exam: 50
    },
    instructor: {
      name: 'Dr. Alan Teo',
      title: 'Associate Professor',
      group: 'SYSTEMS GROUP',
      bio: 'Loves teaching computer science with interactive Jupyter notebooks. Research focuses on software testing and compilers.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      schedule: [
        {
          type: 'Lecture',
          room: 'SR1',
          timeSlot: 'Mon 10:00 - 12:00'
        },
        {
          type: 'Lab',
          room: 'PL1',
          timeSlot: 'Wed 10:00 - 12:00'
        }
      ]
    },
    materials: [
      {
        title: 'Python Syllabus',
        type: 'pdf',
        url: '#',
        action: 'download'
      },
      {
        title: 'Python Style Guide',
        type: 'link',
        url: '#',
        action: 'open'
      }
    ],
    liveSession: {
      title: 'Intro Q&A Session',
      description: 'Meet the instruction team and ask any administrative questions before lectures begin.',
      time: 'Aug 10, 10:00 SGT'
    },
    prerequisites: [],
    requiresWaiver: false
  },
  {
    id: 'ma1101',
    code: 'MA1101',
    title: 'Linear Algebra & Calculus',
    faculty: 'Faculty of Science',
    description: 'Systematic study of linear equations, matrices, vector spaces, eigenvalues, and multi-variable calculus.',
    about: 'This course provides the essential mathematical framework for computer science, graphics, optimization, and physics. Highlights include linear transformations, matrix factorizations, and gradient descent foundations.',
    credits: 4,
    difficulty: 'Intermediate',
    semester: 'Semester 1',
    availableSeats: 112,
    totalSeats: 250,
    syllabus: [
      {
        id: 'm1',
        number: '01',
        title: 'Systems of Linear Equations',
        description: 'Gaussian elimination, row operations, and matrix inverses.'
      },
      {
        id: 'm2',
        number: '02',
        title: 'Eigenvalues & Diagonalization',
        description: 'Characteristic equations, eigenspaces, and linear mappings.'
      },
      {
        id: 'm3',
        number: '03',
        title: 'Multivariable Derivatives',
        description: 'Gradients, Hessians, and foundational optimization.'
      }
    ],
    grading: {
      assignments: 20,
      project: 10,
      exam: 70
    },
    instructor: {
      name: 'Prof. Chloe Lim',
      title: 'Professor',
      group: 'MATHEMATICS DEPARTMENT',
      bio: 'Leading researcher in applied matrix analysis and high-dimensional geometry. Dedicated to teaching math through visual animations.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      schedule: [
        {
          type: 'Lecture',
          room: 'LT27',
          timeSlot: 'Wed 14:00 - 16:00'
        },
        {
          type: 'Tutorial',
          room: 'SR2',
          timeSlot: 'Thu 11:00 - 12:00'
        }
      ]
    },
    materials: [
      {
        title: 'Calculus Exercises',
        type: 'pdf',
        url: '#',
        action: 'download'
      },
      {
        title: 'Matrix Cheat Sheet',
        type: 'link',
        url: '#',
        action: 'open'
      }
    ],
    liveSession: {
      title: 'Weekly Office Hours',
      description: 'Drop by to discuss tough homework problems and exam reviews.',
      time: 'Every Fri, 10:00 SGT'
    },
    prerequisites: [],
    requiresWaiver: false
  },
  {
    id: 'cs3210',
    code: 'CS3210',
    title: 'Parallel & Distributed Computing',
    faculty: 'Faculty of Computing',
    description: 'Design and analysis of concurrent algorithms, multi-core programming, and distributed cluster synchronization architectures.',
    about: 'In this course, students will write highly-optimized parallel code utilizing OpenMP, CUDA, and MPI. It covers resource contention, memory consistency models, and network-level communication bottlenecks.',
    credits: 4,
    difficulty: 'Advanced',
    semester: 'Semester 1',
    availableSeats: 5,
    totalSeats: 80,
    syllabus: [
      {
        id: 'p1',
        number: '01',
        title: 'Threading Foundations',
        description: 'Processes, threads, race conditions, and deadlocks.'
      },
      {
        id: 'p2',
        number: '02',
        title: 'GPU Computing with CUDA',
        description: 'Memory hierarchy, grid, blocks, and kernel performance.'
      },
      {
        id: 'p3',
        number: '03',
        title: 'Distributed Clusters',
        description: 'Message passing interfaces (MPI) and actor frameworks.'
      }
    ],
    grading: {
      assignments: 40,
      project: 30,
      exam: 30
    },
    instructor: {
      name: 'Dr. Raymond Lim',
      title: 'Associate Professor',
      group: 'COMPUTER SYSTEMS GROUP',
      bio: 'Expert in extreme-scale scientific computing. Contributor to major open-source message-passing libraries.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      schedule: [
        {
          type: 'Lecture',
          room: 'COM1-0102',
          timeSlot: 'Thu 14:00 - 16:00'
        },
        {
          type: 'Lab',
          room: 'PL3',
          timeSlot: 'Fri 16:00 - 18:00'
        }
      ]
    },
    materials: [
      {
        title: 'CUDA Quickstart',
        type: 'pdf',
        url: '#',
        action: 'download'
      }
    ],
    liveSession: {
      title: 'Cluster Onboarding',
      description: 'Get your SSH keys and environment configs set up for the school distributed cluster.',
      time: 'Aug 16, 14:00 SGT'
    },
    prerequisites: [
      { code: 'CS2101', title: 'Python', satisfied: true }
    ],
    requiresWaiver: false
  }
];
