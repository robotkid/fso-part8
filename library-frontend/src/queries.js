import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query booksByGenreAuthor($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title
    author {
      name
    }
    published
    genres
    id
  }
}
`

export const SET_BIRTHYEAR = gql`
mutation setBirthyear($name: String!, $birthyear: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $birthyear
  ) {
    name
    born
    bookCount
    id
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
      born
    }
    published
    genres
    id
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`