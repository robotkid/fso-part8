import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import BooksTable from './BooksTable'

const Recommendations = (props) => {
  const [genre, setGenre] = useState(null)
  const userResult = useQuery(ME)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: genre }
  })

  useEffect(() => {
    getBooks()
  }, [getBooks, genre])
  
  useEffect(() => {
    if (userResult.called && !userResult.loading) {
      const me = userResult.data.me
      setGenre(me && me.favoriteGenre)
    }
  }, [userResult])

  if (!props.show) {
    return null
  }
  if (userResult.loading || booksResult.loading || !booksResult.called) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <em>{genre}</em></p>

      <BooksTable books={books} />

    </div>
  )
}

export default Recommendations