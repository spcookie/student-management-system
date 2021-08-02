//输入框弹窗
window.popup = function (typeCode) {
    const mask = document.createElement('div');
    const alert = document.createElement('div');
    const type = ['新增', '修改', '查看'];
    const submit = document.createElement('button');
    const cancel = document.createElement('button');
    //添加弹窗、按钮
    (function () {
        mask.appendChild(alert);
        mask.classList.add('mask');
        alert.classList.add('alert');
        submit.innerHTML = '确认';
        cancel.innerHTML = '取消';
    })();
    //信息输入框
    const form = [
        '        <h3>' + type[typeCode] + '学生信息</h3>\n' +
        '        <div>\n' +
        '            <label>\n' +
        '                学号:\n' +
        '                <input type="number" name="学号">\n' +
        '            </label>\n' +
        '            <label>\n' +
        '                姓名:\n' +
        '                <input type="text" name="姓名">\n' +
        '            </label>\n' +
        '            <label>\n' +
        '                学院:\n' +
        '                <input type="text" name="学院">\n' +
        '            </label>\n' +
        '            <label>\n' +
        '                专业:\n' +
        '                <input type="text" name="专业">\n' +
        '            </label>\n' +
        '            <label>\n' +
        '                年级:\n' +
        '                <input type="number" name="年级">\n' +
        '            </label>\n' +
        '            <label>\n' +
        '                班级:\n' +
        '                <input type="number" name="班级">\n' +
        '            </label>\n' +
        '            <label>\n' +
        '                年龄:\n' +
        '                <input type="number" name="年龄">\n' +
        '            </label>\n' +
        '        </div>'
    ];

    //获取输入框
    function getInputBox() {
        let inputBox = [];
        let labels = alert.children[1].children;
        for (let i = 0; i < labels.length; i++) {
            inputBox[i] = labels[i].children[0]
        }
        return inputBox;
    }

    //将数据添加到查看、修改框中
    function addDataToAlert(data, inputBox) {
        inputBox[0].value = data.number;
        inputBox[1].value = data.name;
        inputBox[2].value = data.college;
        inputBox[3].value = data.major;
        inputBox[4].value = data.grade;
        inputBox[5].value = data.clazz;
        inputBox[6].value = data.age;
    }

    //输入框不可更改
    function freezeInput() {
        let inputBox = getInputBox();
        for (let i = 0; i < inputBox.length; i++) {
            inputBox[i].disabled = true;
        }
    }

    //清除输入框数据, 错误的红框提示
    function clearInputValue(input, indexes) {
        for (let i = 0; i < indexes.length; i++) {
            input[indexes[i]].value = '';
            input[indexes[i]].classList.add('errInput');
        }
        clearErr(input, indexes);
    }

    //输入框获取焦点后清除errInput样式
    function clearErr(input, indexes) {
        for (let i = 0; i < indexes.length; i++) {
            if (input[indexes[i]].className === 'errInput') {
                input[indexes[i]].addEventListener('focus', function clear() {
                    input[indexes[i]].className = '';
                    this.removeEventListener('focus', clear);
                });
            }
        }
    }

    //创建弹框函数
    this.createPopup = function () {
        alert.innerHTML = form.join('');
        alert.appendChild(cancel);
        cancelClick();
        switch (typeCode) {
            case 0:
                alert.appendChild(submit);
                confirmClick(0);
                break;
            case 1:
                getInputBox()[0].disabled = true;
                addDataToAlert(getData(arguments[0]), getInputBox());
                alert.appendChild(submit);
                confirmClick(1, arguments[0]);
                break;
            case 2:
                addDataToAlert(getData(arguments[0]), getInputBox());
                freezeInput();
                break;
        }
        document.getElementById('main').appendChild(mask);
    }

    //弹出框确认键点击事件
    function confirmClick(typeCode, index) {
        submit.onclick = () => {
            let data = getDataFromInput(getInputBox());
            let errCodes;
            if (typeCode === 0) {
                errCodes = isCorrectData(data);
                if (errCodes.length === 0) {
                    addData(data);
                    changeInfo(page);
                    mask.remove();
                } else {
                    clearInputValue(getInputBox(), errCodes);
                }
            } else if (typeCode === 1) {
                errCodes = isCorrectData(data, false);
                if (errCodes.length === 0) {
                    changeData(data, index);
                    changeInfo(page);
                    mask.remove();
                } else {
                    clearInputValue(getInputBox(), errCodes);
                }
            }
        }
    }

    //弹出框取消键点击事件
    function cancelClick() {
        cancel.onclick = function () {
            mask.remove();
        }
    }
}

//删除按钮操作确认弹窗
window.inquiry = function (promptInformation) {
    const mask = document.createElement('div');
    const win = document.createElement('div');
    const massage = document.createElement('div')
    const confirm = document.createElement('button');
    const cancel = document.createElement('button');

    (function () {
        confirm.innerText = '确认';
        cancel.innerText = '取消';
        massage.innerText = promptInformation;
        mask.classList.add('mask');
        win.classList.add('win');
        massage.classList.add('mag');
        win.append(massage, cancel, confirm);
        mask.append(win);
        document.getElementById('main').appendChild(mask);
    })();

    this.confirmEvent = function (event) {
        confirm.addEventListener('click', event);
        confirm.addEventListener('click', () => {
            mask.remove();
        });
    }

    cancel.onclick = () => {
        mask.remove();
    };
}