//弹窗构造函数
let popup = function (typeCode) {
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
    //创建弹框函数
    this.createPopup = function () {
        alert.innerHTML = form.join('');
        if (typeCode === 0) {
            alert.appendChild(submit);
            confirmClick();
        }
        alert.appendChild(cancel);
        cancel.onclick = function () {
            mask.remove();
        }
        document.body.appendChild(mask);
    }

    //弹出框确认键点击事件
    function confirmClick() {
        submit.onclick = () => {
            let data = getDataForInput(alert);
            const errCode = isCorrectData(data);
            if (errCode == null) {
                addData(data);
                mask.remove();
                window.alert('添加成功');
                changeInfo(page);
            } else {
                window.alert('输入错误');
                clearInputValue(alert, errCode);
            }
        }
    }
}

//从弹窗中获取数据
function getDataForInput(alert) {
    let labels = alert.children[1].children;
    let data = [];
    for (let i = 0; i < labels.length; i++) data.push(labels[i].children[0].value);
    return data;
}

//添加数据到学生数据中
function addData(data) {
    const oneOfData = new createData(data[0], data[1], data[2], data[3], data[4], data[5], data[6])
    students_data.push(oneOfData);
}

//校验数据合法性的方法
const matching = {
    num: function (num) {
        const pattern = /^[\d]{11}$/;
        return pattern.exec(num) != null;
    },
    name: function (name) {
        const pattern = /^[\u4e00-\u9fa5]{0,4}$/;
        return pattern.exec(name) != null;
    },
    college: function (college) {
        const pattern = /^[\u4e00-\u9fa5]+学院$/;
        return pattern.exec(college) != null;
    },
    major: function (grade) {
        const pattern = /^[\u4e00-\u9fa5]{2,}$/;
        return pattern.exec(grade) != null;
    },
    grade: function (grade) {
        return 2015 <= grade && grade <= 2022;
    },
    clazz: function (clazz) {
        return 0 < clazz && clazz < 4;
    },
    age: function (age) {
        return 17 <= age && age <= 23;
    }
}

//校验数据
function isCorrectData(data) {
    if (!matching.num(data[0])) {
        return 0;
    } else if (!matching.name(data[1])) {
        return 1;
    } else if (!matching.college(data[2])) {
        return 2;
    } else if (!matching.major(data[3])) {
        return 3;
    } else if (!matching.grade(data[4])) {
        return 4;
    } else if (!matching.clazz(data[5])) {
        return 5;
    } else if (!matching.age(data[6])) {
        return 6;
    } else {
        return null;
    }
}

//清除输入框数据
function clearInputValue(alert, index) {
    let input = alert.children[1].children[index].children[0];
    input.value = '';
}

window.addEventListener('load', () => {
    const dataOp = document.getElementById('dataOperation').children;
    dataOp[0].onclick = function () {
        new popup(0).createPopup();
    }
})