export const credit_calc = (sum) => {
    let conf = window.calc;
    let P = conf.percent; //годовая процентная ставка
    let M = P/100/12; //месячная процентная ставка
    let N = conf.term_months; //кол-во месяцев процентных периодов
    let first = sum * (conf.first_pay_percent/100); //сумма первоначального взноса

    let pay = M / (1 - Math.pow(1 + M, -N));

    return (sum - first) * pay;
}