import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
}) => {
  return (
    <section id={id} className={`section-padding ${className}`}>
      <div className="container-custom">
        {children}
      </div>
    </section>
  );
};

export default Section;