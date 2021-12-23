import dayjs from 'dayjs'

export function getDateEndOfDay(date: Date) {
    return dayjs(date).endOf('day')
}

export function getDateEndOfHour(date: Date) {
    return dayjs(date).endOf('hour')
}

export function getDateStartOfDay(date: Date) {
    return dayjs(date).startOf('day')
}

export function getDateStartOfHour(date: Date) {
    return dayjs(date).startOf('hour')
}
