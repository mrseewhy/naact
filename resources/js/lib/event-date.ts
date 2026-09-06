const fullDateFormatter = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

const monthYearFormatter = new Intl.DateTimeFormat('en-AU', {
    month: 'long',
    year: 'numeric',
});

const dayMonthFormatter = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
});

export function formatEventDateRange(startDate: string, endDate: string | null): string {
    const start = new Date(startDate);

    if (!endDate) {
        return fullDateFormatter.format(start);
    }

    const end = new Date(endDate);
    const sameDay = start.toDateString() === end.toDateString();
    const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

    if (sameDay) {
        return fullDateFormatter.format(start);
    }

    if (sameMonth) {
        return `${start.getDate()}–${end.getDate()} ${monthYearFormatter.format(end)}`;
    }

    return `${dayMonthFormatter.format(start)}–${fullDateFormatter.format(end)}`;
}

export function eventDateBadge(date: string): { day: string; month: string } {
    const value = new Date(date);

    return {
        day: new Intl.DateTimeFormat('en-AU', { day: '2-digit' }).format(value),
        month: new Intl.DateTimeFormat('en-AU', { month: 'short' }).format(value).toUpperCase(),
    };
}
