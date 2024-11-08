import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/hi')({
    component: Hi,
});

export default function Hi() {
    return (
        <div>
            <h2>hi.tsx</h2>
        </div>
    );
}
