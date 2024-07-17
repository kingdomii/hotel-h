export const orderByDateAsc = (array) => {
    let j, i;
    let n = array.length;
    let temp;

    for (j = 1; j < n; j++) {
        temp = array[j];
        i = j - 1;
        let jDate = new Date(temp.checkin);
        jDate
        let iDate = new Date(array[i].checkin);
        iDate
        while ((iDate < jDate) && (i >= 0)) {
            array[i + 1] = array[i];
            i--;
            j--;
        }
        array[i + 1] = temp;
    }

    return array;
}



export const orderByDateDesc = (array) => {
    let j, i;
    let n = array.length;
    let temp;

    for (j = 1; j < n; j++) {
        temp = array[j];
        i = j - 1;
        let jDate = new Date(temp.checkin);
        jDate
        let iDate = new Date(array[i].checkin);
        iDate
        while ((iDate > jDate) && (i >= 0)) {
            array[i + 1] = array[i];
            i--;
            j--;
        }
        array[i + 1] = temp;
    }

    return array;
}