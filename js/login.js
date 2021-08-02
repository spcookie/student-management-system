window.addEventListener('load', () => {
    //动态垂直居中
    const container = document.getElementById('container');
    let windowSize = document.documentElement.clientHeight;
    container.style.marginTop = (windowSize - 500) / 2 + 'px';
    window.onresize = () => {
        windowSize = document.documentElement.clientHeight;
        container.style.marginTop = (windowSize - 500) / 2 + 'px';
    }

    const content = document.getElementsByClassName('content')[0];
    const login = document.getElementById('login');
    const signUp = document.getElementById('signUp');
    const forms = document.getElementsByTagName('form')[0].children;
    const button = forms[3];

    change(login, signUp, 'input hidden');
    change(signUp, login, 'input hidden show');
    //登录注册转换
    function change(upButton, downButton, classNames) {
        upButton.onclick = (e) => {
            downButton.className = '';
            if (upButton.className !== 'active') {
                e.target.classList.add('active');
                if (content.style.paddingTop === '100px'
                    || content.style.paddingTop === '') {
                    content.style.paddingTop = '80px';
                    button.value = '注册';
                } else {
                    content.style.paddingTop = '100px';
                    button.value = '登录';
                }
            }
            clearInput();
            forms[2].className = classNames;
        };
    }

    //清空输入框
    function clearInput() {
        for (let i = 0; i < 3; i++) {
            forms[i].children[0].value = '';
            forms[i].className = 'input';
        }
    }
    //输入框获得光标焦点动画, 清除错误输入警告
    for (let i = 0; i < 3; i++) {
        const input = forms[i].children[0];
        input.addEventListener('focus', function () {
            forms[i].classList.add('focus');
            forms[i].children[0].className = '';
        });
        input.addEventListener('blur', function () {
            if (input.value === '') {
                forms[i].className = 'input';
            }
        });
    }

    forms[3].onclick = function () {
        if (login.className === 'active') {
            //登录
            const account = forms[0].children[0].value;
            const password = forms[1].children[0].value;
            const pattern = /^[0-9]{6}$/;
            if (!pattern.test(account)) {
                forms[0].children[0].classList.add('err');
            } else {
                const infoCode = window.loginActive(account, password);
                if (infoCode === -1) {
                    forms[1].children[0].classList.add('err');
                    return false;
                } else if (infoCode === -2) {
                    forms[0].children[0].classList.add('err');
                    return false;
                } else {
                    window.location.replace('index.html?id=' + infoCode);
                }
            }
        }
    }
});