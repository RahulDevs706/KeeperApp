


export default {
    login: user => {
        return fetch('/user/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Access-Control-Allow-Origin':'http://localhost:3000'   ,         
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated: false, user: { username: "", role: "" } };
        })
    },
    register: user => {
        return fetch('/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },
    logout: () => {
        return fetch('/user/logout',{
            'Access-Control-Allow-Origin': 'http://localhost:3000',

        })
            .then(res => res.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/user/authenticated',{
            'Access-Control-Allow-Origin': 'http://localhost:3000',

        })
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated: false, user: { username: "", fullName:"" } };
            });
    }

}
