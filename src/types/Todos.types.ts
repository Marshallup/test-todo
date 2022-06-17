export interface FetchTodosParams {
    limit?: number,
    sort?: 'id' | 'title',
    order?: 'desc' | 'asc',
}
export interface FetchTodos {
    userId: number,
    title: string,
    id: string,
    completed: boolean,
}
export interface TodoItemType extends FetchTodos {
    body?: string,
    tag?: string,
    date?: string,
}
