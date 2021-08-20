export default {
    getNotes : ()=>{
        return fetch('/user/notes')
                .then(response => {
                    if (response.status !== 401){
                        return response.json().then(data => data);
                    }else
                        return { message:{msgBody:"UnAuthorized", msgError:true }};
                });
    },
    postNote : note=>{
        return fetch('/user/note',{
            method:"post",
            body:JSON.stringify(note),
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            }
        }).then(response=>{
                if(response.status !== 401)
                    return response.json().then(data => data);
                else
                    return { message: { msgBody: "UnAuthorized", msgError: true } };

        })
    },
    deleteNote: (id) => {
        return fetch('/user/delete/'+ id,{
            method: "delete"
        })
            .then(response => {
                if (response.status !== 401) {
                    return response.json().then(data => data);
                } else
                    return { message: { msgBody: "UnAuthorized", msgError: true } };
            });
    }
}