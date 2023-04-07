

export function checkEmpty(val){
    return val.trim().length !== 0;
}


export function checkLength(value , n){
        
        return value && value.trim().length <= n;
}
