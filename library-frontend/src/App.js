
import { useApolloClient, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
// import { gql, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  // const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    console.log('updateCachWith', addedBook)
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)
    
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      // notify(`${addedBook.title} added`)
      window.alert(`${addedBook.title} added`)
      console.log(addedBook)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    const storageToken = localStorage.getItem('userToken')
    if (storageToken) {
      setToken(storageToken)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (token && page === 'login') {
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token
          ? <button onClick={() => setPage('login')}>login</button>
          : <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommendations')}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
        token={token}
      />

      <Login setToken={setToken}
        show={page === 'login'}
      />

    </div>
  )
}

export default App