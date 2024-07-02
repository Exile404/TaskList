import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskCreate {
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tasklist-backend-2y5j.onrender.com' }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Task' as const, id })),
              { type: 'Task' as const, id: 'LIST' },
            ]
          : [{ type: 'Task' as const, id: 'LIST' }],
    }),
    getTask: builder.query<Task, number>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: 'Task' as const, id }],
    }),
    createTask: builder.mutation<Task, TaskCreate>({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: [{ type: 'Task' as const, id: 'LIST' }],
    }),
    updateTask: builder.mutation<Task, { id: number; updates: TaskUpdate }>({
      query: ({ id, updates }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Task' as const, id }],
    }),
    partialUpdateTask: builder.mutation<Task, { id: number; updates: TaskUpdate }>({
      query: ({ id, updates }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Task' as const, id }],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Task' as const, id }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  usePartialUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
