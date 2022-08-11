/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      user
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTodoCount = /* GraphQL */ `
  query GetTodoCount($id: ID!) {
    getTodoCount(id: $id) {
      userId
      todoCount
      id
      createdAt
      updatedAt
    }
  }
`;
export const listTodoCounts = /* GraphQL */ `
  query ListTodoCounts(
    $filter: ModelTodoCountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodoCounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        userId
        todoCount
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
