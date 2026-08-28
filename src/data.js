// Import from comprehensive directory
import { ntaExams } from './nta-directory-data'

export const exams = ntaExams

export const ecosystem = [
  ['Ministry of Education', 'Education policy & programmes', 'https://www.education.gov.in/', 'MOE'],
  ['Digital India', 'Digital public services', 'https://www.digitalindia.gov.in/', 'DI'],
  ['DigiLocker', 'Secure document wallet', 'https://www.digilocker.gov.in/', 'DL'],
  ['JEE Main', 'Official exam portal', 'https://jeemain.nta.nic.in/', 'JEE'],
  ['NEET UG', 'Official exam portal', 'https://neet.nta.nic.in/', 'NEET'],
  ['CUET UG', 'Official exam portal', 'https://cuet.nta.nic.in/', 'CUET'],
]

export const getExam = (slugOrId) => exams.find((exam) => exam.id === slugOrId || exam.slug === slugOrId)
export const getSteps = (exam) => exam.steps || ['Profile review', 'Exam preferences', 'Documents', 'Review & payment']
