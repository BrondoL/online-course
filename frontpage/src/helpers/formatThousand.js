export default (number = 0) => {
    const thousand = Intl.NumberFormat();
    return thousand.format(number);
}