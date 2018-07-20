



export const ops=["+","-","*","/"]
export const math = require('mathjs')

function randGen(digits, n=10) {
    let result= Math.floor((Math.random() * Math.pow(n,digits))+1)
    if(result ===1) result ++;
    return result -1
}


export function simpleMath(digits=1, boxes=1) {
    let result =[];

    while(boxes > 0){
        result.push(randGen(digits));
        result.push(ops[randGen(1, 3)-1]);
        boxes--;
    }    
    result.push(randGen(digits));

    return result;
}



export function hardMath(digits, boxes) {
    
}


export function simpleWord(boxes) {
    
}

export function hardWord(boxes) {
    
}

export function calAnswer(array){
    return math.eval(array.join(" "))
}

