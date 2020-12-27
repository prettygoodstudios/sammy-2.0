

export const insertionSort = (arr, comparator) => {
    for(let index = 1; index < arr.length; index++){
        let pos = index;
        let result = comparator(arr[pos-1], arr[pos]);
        while(result > 0){
            const temp = arr[pos-1];
            arr[pos-1] = arr[pos];
            arr[pos] = temp;
            pos--;
            if(pos === 0){
                break;
            }
            result = comparator(arr[pos-1], arr[pos]);
        }
    }   
}

