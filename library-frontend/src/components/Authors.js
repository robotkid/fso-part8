
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { SET_BIRTHYEAR, ALL_AUTHORS } from '../queries'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const submit = (event) => {
    event.preventDefault()
    setBirthyear({ variables: { name, birthyear: parseInt(year) } })
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token &&
        <>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              name
          {/* <input value={name} onChange={(e) => {setName(e.target.value)}} /> */}
              <select required value={name} onChange={(e) => { setName(e.target.value) }}>
                <option></option>
                {authors.map(a =>
                  <option key={a.name}>{a.name}</option>
                )}
              </select>
            </div>
            <div>
              born
          <input type='number' value={year} onChange={(e) => { setYear(e.target.value) }} />
            </div>
            <button>update author</button>
          </form>
        </>
      }

    </div>
  )
}

export default Authors
