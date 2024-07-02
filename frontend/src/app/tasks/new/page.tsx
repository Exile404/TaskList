'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateTaskMutation } from '@/redux/services/tasks';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { closeAddTaskDialog } from '@/redux/reducer/uiSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from "@/components/ui/textarea";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

export default function AddTaskForm() {
  const [createTask] = useCreateTaskMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      completed: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await createTask(data);
      form.reset();
      dispatch(closeAddTaskDialog());
      toast({
        title: 'Task added successfully!',
      });
      router.push('/'); // Redirect to the desired page
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: 'Error adding task',
        description: 'There was an error while adding the task. Please try again.',
      });
    }
  };

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
                    <Input placeholder="Enter task title" {...field} />
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
                    <Textarea placeholder="Enter task description" {...field} />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Task</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
