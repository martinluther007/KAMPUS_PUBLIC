
document.querySelector('.updateData').addEventListener('submit',e => {
    e.preventDefault();
    const form = new FormData();

    form.append('email',document.getElementById('email').value)
    form.append('firstName',document.getElementById('firstName').value)
    form.append('lastName',document.getElementById('lastName').value)
    form.append('email',document.getElementById('email').value)
    form.append('photo',document.getElementById('email').files[0])

    await updateSettings(form,'data' );

    document.getElementById('email').value = ''
    document.getElementById('firstName').value = ''
    document.getElementById('lastName').value = ''
});

document.querySelector('.updatePassword').addEventListener('submit',async e => {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    await updateSettings({currentPassword,password, passwordConfirm},'password');

    document.getElementById('currentPassword').value = ''
    document.getElementById('password').value = ''
    document.getElementById('passwordConfirm').value = ''
});

// type is either password or data
const updateSettings = async(data,type) => {
    try {
        const url = type === 'password'?'http://127.0.0.1:3300/users/updateMyPassword':'http://127.0.0.1:3300/users/updateMe'
        const res = await axios({
            method:"PATCH",
            url,
            data
        }) 
        console.log(res);
        if(res.data.status = "success") {
            alert(`${type.toUppercase()} updated successfully`)
        }
    } catch (error) {
        console.log(error);
    }
}

