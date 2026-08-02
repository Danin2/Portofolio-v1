import React from 'react';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss your next backend project, system architecture, or technical collaboration.',
};

export default function ContactPage() {
  return <ContactClient />;
}