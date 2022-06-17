import { FetchTodos, FetchTodosParams } from '@/types/Todos.types';

export async function fetchTodos(
  userID = 1,
  { limit = 5, sort = 'id', order = 'desc' }: FetchTodosParams = {},
): Promise<FetchTodos[]> {
  const queryParams = `?_limit=${limit}&_sort=${sort}&_order=${order}`;

  return fetch(`${process.env.VUE_APP_API_URL}/users/${userID}/todos/${queryParams}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Произошла ошибка при запросе');
      }
      return response.json();
    })
    .then((json) => json)
    .catch((error) => { throw error.message; });
}
export async function saveTodo() {
  console.log('save todo');
}
