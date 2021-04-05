import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BooksTable from './BooksTable'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    result.refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre])

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks
  if (genre) {
    books = books.filter(b => b.genres.includes(genre))
  }

  let allGenres = []
  books.forEach(b => {
    b.genres && allGenres.push(...b.genres)
  })
  allGenres = [...new Set(allGenres)]

  return (
    <div>
      <h2>books</h2>

      {genre &&
        <div>
          in genre <em>{genre}</em>
        </div>
      }

      <BooksTable books={books} />

      <div>
        {
          allGenres.map(g =>
            <button key={g} onClick={() => setGenre(g)}>{g}</button>
          )
        }
        < button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books