import type { FlashMessages } from '@/types';
import type { route as routeFn } from 'ziggy-js';

declare module '@inertiajs/core' {
    interface PageProps {
        appUrl: string;
        logoAccepted: boolean;
        flash: FlashMessages;
    }
}

declare global {
    const route: typeof routeFn;
}
