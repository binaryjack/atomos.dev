export const getSystemDateSeparator = () => {
    const formattedDate = new Intl.DateTimeFormat('default').format(new Date())
    const separator = formattedDate.replace(/\d/g, '').trim()[0]
    return separator
}
