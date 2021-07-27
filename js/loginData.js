//账号密码数据
let account_data = [
    {
        name: '咸小鱼',
        id: 0,
        account: '123456',
        password: '123456'
    }
];

window.loginActive = function (account, password) {
    for (let i = 0; i < account_data.length; i++) {
        if (account_data[i].account === account) {
            if (account_data[i].password === password) {
                //登录成功
                return account_data[i].id;
            } else {
                //密码错误
                return -1;
            }
        }
    }
    //账号不存在
    return -2;
}