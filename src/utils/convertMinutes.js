export function convertMinutes(minutes) {
    
    // Calculate the number of days
    const days = Math.floor(minutes / 1440);

    // Calculate the number of hours
    const hours = Math.floor((minutes % 1440) / 60);

    // Calculate the number of minutes
    const remainingMinutes = minutes % 60;
    if (days > 0)
        return {
            t: "remainDayHourMin",
            obj: { days, hours, minutes: Math.ceil(remainingMinutes) },
        };
    if (hours > 0)
        return { t: "remainHourMin", obj: { hours, minutes: Math.ceil(remainingMinutes) } };
    if (remainingMinutes >= 0)
        return { t: "remainMin", obj: { minutes: Math.ceil(remainingMinutes) } };
    return { t: "", obj: {} };
}

