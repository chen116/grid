import regression from 'regression'

export  function vicreg(arr) {
    let data =[]
    for (let i = 0; i < arr.length; i=i+3) {
        data.push( [arr[i],arr[i+1] ])
    }

    console.log(data);


    const result = regression.polynomial(data, { order: 4 });
    console.log(result.string);
    console.log(result.r2);
    console.log(result.points);
    const preds=[]
    for (let i = -175; i <= 175; i=i+0.01) {
        preds.push(  result.predict(i) )
    }
    return preds
    return result.points


}