'use client'
import styles from '@/style/pp.module.css'
import { text } from 'stream/consumers'

const CLASS_NAME = [
  'MSE803 Data Analytics',
  'MSE804 Blockchain and decentralised digital identity',
  'MSE805: Cloud Security',
  'MSE806 Intelligent Transportation Systems',
  'MSE907 Industry-based Capstone Research Project'
]
export default function Bb() {
  const URLS = [
   
    {
      // url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8981_1&content_id=_1265829_1&mode=reset',
      url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8809_1&content_id=_1203589_1&mode=reset',
      text: 'Assignments-Info',
      children: [
        {
          url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8981_1&content_id=_1265848_1',
          text: CLASS_NAME[0],
        },
        {
          url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8981_1&content_id=_1265853_1',
          text: CLASS_NAME[1],
        },
        {
          url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8981_1&content_id=_1265857_1',
          text: CLASS_NAME[2],
        },
        {
          url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8981_1&content_id=_1265862_1',
          text: CLASS_NAME[3],
        },
        {
          url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8981_1&content_id=_1265866_1',
          text: CLASS_NAME[4]
        }
      ],
    },
    {
      url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8972_1&content_id=_1265136_1&mode=reset',
      text: 'Submission-Assignments',
      children: [
        {
          url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8972_1&content_id=_1265099_1',
          text: CLASS_NAME[0],
        },
        {
          url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8972_1&content_id=_1265104_1',
          text: CLASS_NAME[1],
        },
        {
          url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8972_1&content_id=_1265109_1',
          text: CLASS_NAME[2],
        },
        {
          url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8972_1&content_id=_1265114_1',
          text: CLASS_NAME[3],
        },
        {
          url: 'https://blackboard.up.education/webapps/blackboard/content/listContent.jsp?course_id=_8972_1&content_id=_1265128_1',
          text: CLASS_NAME[4]
        }
      ],
    },
    {
      url: 'https://blackboard.up.education/ultra/courses/_8972_1/cl/outline?legacyUrl=~2Fwebapps~2Fgradebook~2Fdo~2Fstudent~2FviewGrades%3Fcourse_id%3D_8972_1%26callback%3Dcourse',
      text: 'Marks',
    },
  ]
  return (
    <div className="flex flex-col justify-between  box-border gap-10 p-20">
      {URLS.map((i, index) => {
        return (
          <div className={styles.item} key={index}>
            <a
              href={i.url}
              target="_blank"
              className="row-span-5 min-w-300 p-80 border-solid border border-indigo-600 rounded hover:bg-sky-700 hover:text-white">
              {i.text}
            </a>
            {i.children?.map(j => {
              return (
                j.url && (
                  <a
                    className="p-10 border-solid border border-indigo-600 rounded flex items-center hover:bg-sky-700 hover:text-white"
                    href={j.url}
                    target="_blank"
                    key={j.url}>
                    {j.text}
                  </a>
                )
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
