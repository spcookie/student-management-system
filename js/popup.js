window.addEventListener('load', () => {
    let popup = function (typeCode) {
        const mask = document.createElement('div');
        const alert = document.createElement('div');
        const type = ['新增', '修改', '查看'];
        const submit = document.createElement('button');
        const cancel = document.createElement('button');
        (function () {
            mask.appendChild(alert);
            mask.classList.add('mask');
            alert.classList.add('alert');
            submit.innerHTML = '确认';
            cancel.innerHTML = '取消';
        })();

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

        this.createPopup = function () {
            alert.innerHTML = form.join('');
            if (typeCode === 0) {
                alert.appendChild(submit);
                submit.onclick = () => {
                    window.alert('提交成功');
                }
            }
            alert.appendChild(cancel);
            cancel.onclick = function () {
                mask.remove();
            }
            document.body.appendChild(mask);
        }
    }

    const dataOp = document.getElementById('dataOperation').children;
    dataOp[0].onclick = function () {
        new popup(0).createPopup();
    }
})