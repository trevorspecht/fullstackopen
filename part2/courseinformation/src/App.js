import React from "react"

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({ parts }) => {
  return (
    <p>
      total of {parts.reduce((total, next) => {
        return total + next.exercises
      }, 0)} exercises
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

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Course = ({ course }) => {

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of Web Apps',
        exercises: 6,
        id: 0
      },
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
      }
    ]
  }

  return <Course course={course} />
}

export default App