import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/hi')({
    component: Hi,
});

export default function Hi() {
    return (
        <div>
            <h2>Hi components</h2>
        </div>
    );
}
