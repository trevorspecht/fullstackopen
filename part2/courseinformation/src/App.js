import React from "react"

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        total of {parts.reduce((total, next) => {
          return total + next.exercises
        }, 0)} exercises
      </strong>
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <p>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </p>   
  )
}

const Title = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Header = () => {
  return <h1>Web development curriculum</h1>
}

const Course = ({ course }) => {

  return (
    <>
      <Title name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div id='courses'>
      <Header />
      {courses.map(course => <Course course={course} />)}
    </div>
  )
}

export default App