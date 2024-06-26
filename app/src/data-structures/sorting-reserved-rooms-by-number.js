export const orderByNumberAsc = (reserves) => {
    let swapped = true;
    for (let i = 0; i < reserves.length - 1 && swapped; i++) {
        swapped = false;
        for (let j = 0; j < reserves.length - i - 1; j++) {
            if (reserves[j].number > reserves[j + 1].number) {
                const temp = reserves[j];
                reserves[j] = reserves[j + 1];
                reserves[j + 1] = temp;
                swapped = true;
            }
        }
    }
    return reserves;
}


export const orderByNumberDesc = (reserves) => {
    let swapped = true;
    for (let i = 0; i < reserves.length - 1 && swapped; i++) {
        swapped = false;
        for (let j = 0; j < reserves.length - i - 1; j++) {
            if (reserves[j].number < reserves[j + 1].number) {
                const temp = reserves[j];
                reserves[j] = reserves[j + 1];
                reserves[j + 1] = temp;
                swapped = true;
            }
        }
    }
    return reserves;
}