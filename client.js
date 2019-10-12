// "StAuth10065: I Filip Swierczynski , 000348007 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."

const axios = require('axios');


let fourUsers = [{
    status:"New User1",
    message:"New Message1"
},
{
    status:"New User2",
    message:"New Message2"
},
{
    status:"New User3",
    message:"New Message3"
},
{
    status:"New User4",
    message:"New Message4"
}];


let arr = [{
    status:'New Put Status 1',
    message:'New Put Status 1'
},{
    status:'New Put Status 2',
    message:'New Put Msg 2'
},
{
    status:'New Put Status 3',
    message:'New Put Msg 3'
}];

let flag = false;


function test1(){

    axios.post('http://localhost:3000/api',{
        status: "Post 1",
        message: "Message 1"
    })
    .then(res=>{
        if(res.data.message == "CREATE ENTRY SUCCESSFUL"){
            axios.post('http://localhost:3000/api',{
                status: "Post 2",
                message: "Message 2"
            })
            .then(res=>{
                if(res.data.message == "CREATE ENTRY SUCCESSFUL"){
                    axios.post('http://localhost:3000/api',{
                        status: "Post 3",
                        message: "Message 3"
                    })
                    .then(res=>{
                        if(res.data.message == "CREATE ENTRY SUCCESSFUL"){
                            axios.put('http://localhost:3000/api/1',{
                                status:'Modified #1 Status Put',
                                message:"Modified #1 Message Put"
                            })
                            .then(res=>{
                                if(res.data.message == "UPDATE ITEM SUCCESSFUL"){
                                    axios.get('http://localhost:3000/api/1')
                                    .then(res=>{
                                        console.log(res.data);
                                        axios.get("http://localhost:3000/api/2")
                                        .then(res=>{
                                            console.log(res.data);
                                            axios.get("http://localhost:3000/api/3")
                                            .then(res=>{
                                                console.log(res.data);
                                                
                                            })
                                            .catch(err=>{
                                                console.log(err);
                                                flag = true;
                                            })
                                        })
                                        .catch(err=>{
                                            console.log(err);
                                            flag = true;
                                        })
                                        
                                    })
                                    .catch(err=>{
                                        console.log(err);
                                        flag = true;
                                    })
                                }
                            })
                            .catch(err=>{
                                console.log(err);
                                flag = true;
                            })
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                        flag = true;
                    })
                }
            })
            .catch(err=>{
                console.log(err);
                flag = true;
            })
        }
    })
    .catch(err=>{
        console.log(err);
        flag = true;
    })
}

   
       
//tests1();



function test2(){
    
    
    axios.put('http://localhost:3000/api',fourUsers)
    .then(response=>{
        if(response.data.message == "REPLACE COLLECTION SUCCESSFUL"){
            axios.get('http://localhost:3000/api').
            then(response=>{
                console.log(response.data);
                axios.delete('http://localhost:3000/api/1',{
                    params: {
                        msgid: 1
                    }
                }).then(response=>{
                    if(response.data.message == "DELETE ITEM SUCCESSFUL")
                    axios.get('http://localhost:3000/api')
                    .then(response=>{
                        console.log(response.data);
                        
                    }).catch(error=>{
                        console.log(error);
                        flag = true;
                    })
                }).catch(error=>{
                    console.log(error);
                    flag = true;
                })
            })
            .catch(error=>{
                console.log(error);
                flag = true;
            })
        }
    })
    .catch(error=>{
        console.log(error.message);
        flag = true;
    })
}

function test3(){
    
    axios.delete('http://localhost:3000/api')
    .then(res=>{
        if(res.data.message == "DELETE COLLECTION SUCCESSFUL"){
            axios.get('http://localhost:3000/api')
            .then(res=>{
                console.log(res.data);
                axios.put('http://localhost:3000/api',arr)
                .then(res=>{
                    if(res.data.message == "REPLACE COLLECTION SUCCESSFUL"){
                        axios.post('http://localhost:3000/api',{
                            status:"New Post 1",
                            message: "New Post Message 1"
                        })
                        .then(res=>{
                            if(res.data.message == "CREATE ENTRY SUCCESSFUL"){
                                axios.post('http://localhost:3000/api',{
                                    status:"New Post 2",
                                    message:"New Post Message 2"
                                })
                                .then(res=>{
                                    if(res.data.message == "CREATE ENTRY SUCCESSFUL"){
                                        axios.put('http://localhost:3000/api/5',{
                                        status:"Modified item status",
                                        message:"Modified message status"
                                    })
                                    .then(res=>{
                                        if(res.data.message == "UPDATE ITEM SUCCESSFUL"){
                                            axios.delete('http://localhost:3000/api/1')
                                            .then(res=>{
                                                if(res.data.message == "DELETE ITEM SUCCESSFUL"){
                                                    axios.get('http://localhost:3000/api')
                                                    .then(res=>{
                                                        console.log(res.data);
                                                        
                                                    })
                                                    .catch(err=>{
                                                        console.log(err);
                                                        flag = true;
                                                    })
                                                }
                                                
                                            })
                                            .catch(err=>{
                                                console.log(err);
                                                flag = true;
                                            })
                                        }
                                        
                                    })
                                    .catch(err=>{
                                        console.log(err);
                                        flag = true;
                                    })
                                    }
                                    
                                    
                                })
                                .catch(err=>{
                                    console.log(err);
                                    flag = true;
                                })
                            }
                        })
                        .catch(err=>{
                            console.log(err);
                            flag = true;
                        })
                    }
                     
                        
                    
                }).catch(err=>{
                    console.log(err);  
                    flag = true; 
                })
                
            }).catch(err=>{
                console.log(err);  
                flag = true;
            })
        }
    })
    .catch(err=>{
        console.log(err);
        flag = true;
    })
}



setTimeout(()=>{
    test1();
},100);

setTimeout(()=>{
    test2();
},300);
setTimeout(()=>{
    test3();
},500);
setTimeout(()=>{
    if(!flag){
        console.log("ALL TESTS SUCCESSFUL");
        
    }
},700)
