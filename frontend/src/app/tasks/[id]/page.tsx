import dynamic from 'next/dynamic';

const TaskDetail = dynamic(() => import('./TaskDetail'), { ssr: false });

export default function Page() {
    return <TaskDetail />;
}
