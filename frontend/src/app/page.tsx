// app/pages.tsx

'use client';

import Link from 'next/link';
import { useGetTasksQuery, usePartialUpdateTaskMutation } from '@/redux/services/tasks';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


export default function TaskList() {
  const { data: tasks, error, isLoading } = useGetTasksQuery();
  const [partialUpdateTask] = usePartialUpdateTaskMutation();

  const handleComplete = async (id: number, completed: boolean) => {
    await partialUpdateTask({ id, updates: { completed } });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center py-9 px-36">
      <Link href="/tasks/new"><Button variant="destructive" className="mb-4">+ Add Task</Button></Link>
        <Table className='px-10'>
          <TableCaption>A list of your tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => handleComplete(task.id, !task.completed)}
                    />
                    <Label htmlFor={`task-${task.id}`}>{task.completed ? 'Completed' : 'Not Completed'}</Label>
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/tasks/${task.id}`}>
                    <Button>Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
