const days = [
    { id: 1, val: 'monday' },
    { id: 2, val: 'tuesday' },
    { id: 3, val: 'wednesday' },
    { id: 4, val: 'thursday' },
    { id: 5, val: 'friday' },
    { id: 6, val: 'saturday' },
    { id: 7, val: 'sunday' },
]

export function findActiveDay(index) {
    return days.find(day => day.id === index) || { id: -1, val: 'unknown' }
}