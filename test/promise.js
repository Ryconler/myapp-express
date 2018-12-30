function runAsync1(){
    var p=new Promise(function (resolve,reject) {
        setTimeout(function () {
            console.log("do sth1")
            resolve(1)
        },1000)
    })
    return p
}
function runAsync2(){
    var p=new Promise(function (resolve,reject) {
        setTimeout(function () {
            console.log("do sth2")
            resolve(2)
        },1000)
    })
    return p
}
function runAsync3(){
    var p=new Promise(function (resolve,reject) {
        setTimeout(function () {
            console.log("do sth3")
            resolve(3)
        },1000)
    })
    return p
}


// runAsync1()
//     .then(function(data){
//         console.log(data);
//         return runAsync2();
//     })
//     .then(function(data){
//         console.log(data);
//         return runAsync3();
//     })
//     .then(function(data){
//         console.log(data);
//     });

Promise
    .all([runAsync1(),runAsync2(),runAsync3()])
    .then(function (value) {
        console.log(value)
    })