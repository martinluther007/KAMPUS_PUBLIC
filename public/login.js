// logging in
const login = async (email, password) => {
    try {
        const res = await axios({
            method:"POST",
            url:"http://127.0.0.1:3300/users/login",
            data:{
                email,
                password
            }
        })
        console.log(res);
        if(res.data.status = "success") {
            alert('logged in successfully')
            window.setTimeout(() => {
               location.assign('/') 
            }, 1500);
        }
        //console.log(res);
    } catch (error) {
        alert(error.response.data.message);
    }
}
// logging out
const logout = async() => {
    try {
        const res = await axios({
            method:"GET",
            url:"http://127.0.0.1:3300/users/logout"
        })
    
        if(res.data.status = "success") {//location.reload(true)
            alert('logged out successfully')
        }
    } catch (error) {
        console.log(error);
    }
    
}

document.querySelector('#login').addEventListener('submit',e => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email,password)
})