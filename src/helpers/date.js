export default class {
    constructor(locale) {

        this.options = {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short'
        },
            this.dateOptions = {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZoneName: 'short'
            },
            this.timeOptions = {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short'
            },
            this.formatter = new Intl.DateTimeFormat(locale, this.options),
            this.formatterTime = new Intl.DateTimeFormat(locale, this.timeOptions),
            this.formatterTimeSecond = new Intl.DateTimeFormat(locale, { ...this.timeOptions, second: '2-digit' }),
            this.formatterDate = new Intl.DateTimeFormat(locale, this.dateOptions);
    }
    format(date) {
        return this.formatter.format(new Date(date + '+03:00'))
    }
    formatOnlyTime(date) {
        return this.formatterTime.format(new Date(date + '+03:00'))
    }
    formatOnlyTimeSecond(date) {
        return this.formatterTimeSecond.format(new Date(date + '+03:00'))
    }
    formatOnlyDate(date) {
        return this.formatterDate.format(new Date(date + '+03:00'))
    }
    formatToParts(date) { return this.formatter.formatToParts(new Date(date + '+03:00')) }
    formatWithDuration(date, duration) {
        if (!date) return ''
        const d = new Date(date + '+03:00').getTime() + (duration * 60000);
        return this.formatterTime.format(d);
    }
    timeToSeconds(date) {
        const time = this.formatterTimeSecond.format(new Date(date + '+03:00'))
        var a = time.split(':'); // split it at the colons
        const second = a[2].split(' ')[0]
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+second)
    }
    getTime(date) {
        return new Date(date + '+00:00').getTime()
    }
}