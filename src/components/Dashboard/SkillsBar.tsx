import loadConfig from 'next/dist/server/config'
import React from 'react'
import { useStudentByIdQuery } from './StudentInfo/queries/studentById.query.generated'

const SkillsBar = () => {
  const { loading, data }  = useStudentByIdQuery({
    variables: {
      id: 1223
    }

  })
if (loading) {
  return <div>Loasding ...</div>
}

  return (
    <div>SkillsBar { data.studentById.name }</div>
  )
}

export default SkillsBar