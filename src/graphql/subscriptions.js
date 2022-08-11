/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
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
export const onCreateTodoCount = /* GraphQL */ `
  subscription OnCreateTodoCount {
    onCreateTodoCount {
      userId
      todoCount
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodoCount = /* GraphQL */ `
  subscription OnUpdateTodoCount {
    onUpdateTodoCount {
      userId
      todoCount
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodoCount = /* GraphQL */ `
  subscription OnDeleteTodoCount {
    onDeleteTodoCount {
      userId
      todoCount
      id
      createdAt
      updatedAt
    }
  }
`;
