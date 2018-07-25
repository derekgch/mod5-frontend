



export const ops=["+","-","*","/"]
export const math = require('mathjs')

function randGen(digits, n=10) {
    let result= Math.floor((Math.random() * Math.pow(n,digits))+1)
    if(result ===1) result ++;
    return result -1
}

export function getDigits(n) {
    let digits = 0;
    if(typeof(n) === "number"){
        digits = n.toString().length;
    }
    return digits;
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



export function multiplyMath(digits, boxes) {
    let result =[];

    while(boxes > 0){
        result.push(randGen(digits));
        result.push(ops[randGen(1, 4)-1]);
        boxes--;
    }    
    result.push(randGen(digits));
    return result;
}

export function hardMath(digits, boxes) {
    let result =[];

    while(boxes > 0){
        result.push(randGen(digits));
        result.push(ops[randGen(1, 5)-1]);
        boxes--;
    }    
    result.push(randGen(digits));
    return result;
}


export function swapVowels(word, userLeter) {
    let result = word.slice(0);
    let copyOfLetter = userLeter.slice(0);
    for (let index = 0; index < result.length; index++) {
         if(result[index] === "_"){
            result = result.substr(0, index) + copyOfLetter.shift() + result.substr(index+1)
         }        
    }
    return result;
}

export function hardWord(boxes) {
    
}

export function calAnswer(array){
    return math.eval(array.join(" "))
}

export function swapOP(array, ops){
    let result =[];
    let copyOfOp = ops.slice(0)
    
    array.forEach(e => {
        if(typeof(e) !=="number")
            result.push(copyOfOp.shift())
        else
            result.push(e)
    })

    return result;
}

