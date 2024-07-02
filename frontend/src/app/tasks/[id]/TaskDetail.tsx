'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useGetTaskQuery, useDeleteTaskMutation, useUpdateTaskMutation } from '@/redux/services/tasks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea"



import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Navbar from '@/components/Navbar';

const FormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  completed: z.boolean(),
});

type FormData = z.infer<typeof FormSchema>;

export default function TaskDetail() {
  const router = useRouter();
  const { id } = useParams();  // Use useParams to get the route parameters
  const { data: task, error, isLoading } = useGetTaskQuery(Number(id));
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      completed: false,
    },
  });

  useEffect(() => {
    if (task) {
      form.setValue('title', task.title);
      form.setValue('description', task.description);
      form.setValue('completed', task.completed);
    }
  }, [task, form.setValue]);

  const handleDelete = async () => {
    await deleteTask(Number(id));
    router.push('/');
  };

  const onSubmit = async (data: FormData) => {
    await updateTask({ id: Number(id), updates: data });
    router.push('/');
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading task</p>;

  return (
    <div>
      <Navbar />
      <div className="space-y-6 py-6 px-11">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="completed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Completed</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="completed-switch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="completed-switch">Completed</Label>
                  </div>
                </FormControl>
                <FormDescription>
                  Mark as completed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Task</Button>
        </form>
      </Form>
      <Button onClick={handleDelete} variant='destructive'>Delete Task</Button>
    </div>
    </div>
  );
}
