window.addEventListener('load', () => {
    //获取新增、删除按钮
    const dataOp = document.getElementById('dataOperation').children;
    //新增按钮绑定事件
    dataOp[0].onclick = function () {
        new popup(0).createPopup();
    }



    //获取表格tbody
    const tbody = document.querySelector('tbody');
    //全选按钮
    const allCheck = document.getElementById('allCheck');
    //选择按钮
    let checkButton;

    //向表格中添加、修改信息函数
    window.changeInfo = function (page) {
        //清除全选按钮被选中状态
        allCheck.checked = false;
        let tRow = [];
        let length = countOfPage(page);
        let index = (page - 1) * 10;
        //添加信息
        for (let i = index; i < index + length; i++) {
            tRow.push('<tr>\n' +
                '                    <td><input type="checkbox" class="checkButton"></td>\n' +
                '                    <td>' + (i + 1) + '</td>\n' +
                '                    <td>' + students_data[i].number + '</td>\n' +
                '                    <td>' + students_data[i].name + '</td>\n' +
                '                    <td>' + students_data[i].college + '</td>\n' +
                '                    <td>' + students_data[i].major + '</td>\n' +
                '                    <td>' + students_data[i].grade + '</td>\n' +
                '                    <td>' + students_data[i].clazz + '</td>\n' +
                '                    <td>' + students_data[i].age + '</td>\n' +
                '                    <td colspan="2"><button class="view">查看</button><button class="modify">修改</button></td>\n' +
                '                </tr>');
        }
        //补全表格
        for (let i = 0; i < 10 - length; i++) {
            tRow.push('<tr>\n' +
                '                    <td></td>\n' +
                '                    <td></td>\n' +
                '                    <td></td>\n' +
                '                    <td></td>\n' +
                '                    <td></td>\n' +
                '                    <td></td>\n' +
                '                    <td></td>\n' +
                '                    <td></td>\n' +
                '                    <td></td>\n' +
                '                    <td colspan="2"></td>\n' +
                '                </tr>');
        }
        tbody.innerHTML = tRow.join('');
        //获取选择按钮
        checkButton = document.querySelectorAll('.checkButton');
        //选择按钮绑定事件
        for (let i = 0; i < checkButton.length; i++) {
            checkButton[i].addEventListener('click', function () {
                if (this.checked) {
                    let j = 0;
                    for (; j < checkButton.length; j++) {
                        if (!checkButton[j].checked) break;
                    }
                    if (j === checkButton.length) allCheck.checked = true;
                } else {
                    allCheck.checked = false;
                }
            })
        }

        //查看、修改按钮事件
        const view = document.getElementsByClassName('view');
        const modify = document.getElementsByClassName('modify');
        for (let i = 0; i < length; i++) {
            view[i].onclick = () => {
                let dataIndex = page - 1 + i;
                new popup(2).createPopup(dataIndex);
            };
            modify[i].onclick = () => {
                let dataIndex = page - 1 + i;
                new popup(1).createPopup(dataIndex);
            };
        }
        //修改信息条数
        numOfInfo(page, length);
    }

    //页数
    window.page = 1;

    //计算一页信息的条数
    function countOfPage(page) {
        let num = (students_data.length - (page - 1) * 10);
        return num >= 10 ? 10 : num;
    }

    //修改信息条数
    const information = document.getElementById('information');
    let numbers = information.children;
    function numOfInfo(page, length) {
        numbers[0].innerText = page;
        numbers[1].innerText = students_data.length;
        numbers[2].innerText = length;
    }

    //第一次添加信息
    changeInfo(page);

    //全选按钮绑定事件
    allCheck.addEventListener('click', () => {
        for (let i = 0; i < checkButton.length; i++) {
            checkButton[i].checked = allCheck.checked;
        }
    })

    //获取两个翻页按钮
    const turnPage = document.querySelector('#turnPage').children;
    //向上翻页
    (function pageUp() {
        turnPage[0].addEventListener('click', () => {
            if (page === 1) {
                alert('已经是第一页');
            } else {
                page--;
                changeInfo(page);
            }
        })
    })();
    //向下翻页
    (function pageDown() {
        turnPage[1].addEventListener('click', () => {
            if (page * 10 >= students_data.length) {
                alert('已经是最后一页');
            } else {
                page++;
                changeInfo(page);
            }
        })
    })();
});
