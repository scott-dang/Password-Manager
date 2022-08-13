function processThings(message)
{
    return new Promise((resolve, reject) => {
        if (message === 'HI THERE') {
            resolve(message)
        }
        else
            reject(message)
    })
}

processThings('HI THERE').then((result) => {
    message = result  + ' has succeeded x1'
    console.log(message)
    return message
}).then((result) => {
    new_message = result.slice(0,result.length - 1) + '2' 
    console.log(new_message)
}).catch((result) => {
    console.log(result + ' has failed')
})