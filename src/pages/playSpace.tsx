import Accordion from 'components/Accordion'
import React from 'react'

export default function playSpace() {
  const accordionItems = [
    {
      title: 'Software Developer',
      content: 'Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.'
    },
    {
      title: 'Game Developer',
      content: 'Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.'
    },
    {
      title: 'Database Administrator or Programmer',
      content: 'Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.'
    },
    {
      title: 'Information Systems Manager',
      content: 'Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.'
    },
    {
      title: 'Web Systems Developer',
      content: 'Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.'
    },
    {
      title: 'Network Administrator or Engineer',
      content: 'Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.'
    },
  ]

  return (
    <div className="container">
      <Accordion items={accordionItems} />
    </div>
  )
}
