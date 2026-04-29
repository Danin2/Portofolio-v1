import { Certificate } from '@/types/project';

export const certificates: Certificate[] = [
  {
    id: 'c1',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'Dec 2023',
    credentialId: 'AWS-ASA-12345',
    credentialUrl: 'https://aws.amazon.com/verification',
    image: '/certificates/aws-sa.jpg',
    tags: ['Cloud', 'Architecture', 'AWS'],
  },
  {
    id: 'c2',
    title: 'Meta Back-End Developer Professional Certificate',
    issuer: 'Meta',
    date: 'Oct 2023',
    credentialId: 'META-BE-67890',
    credentialUrl: 'https://coursera.org/verify',
    image: '/certificates/meta-backend.jpg',
    tags: ['Node.js', 'Python', 'Django', 'API'],
  },
  {
    id: 'c3',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google',
    date: 'Aug 2023',
    credentialId: 'GOOG-DA-54321',
    credentialUrl: 'https://coursera.org/verify',
    image: '/certificates/google-data.jpg',
    tags: ['Data', 'SQL', 'Tableau', 'Python'],
  },
  {
    id: 'c4',
    title: 'Node.js Developer Certificate (OpenJS)',
    issuer: 'OpenJS Foundation',
    date: 'June 2023',
    credentialId: 'OJS-ND-112233',
    credentialUrl: 'https://certification.openjsf.org/verify',
    image: '/certificates/nodejs-cert.jpg',
    tags: ['Node.js', 'V8', 'Performance'],
  },
];
