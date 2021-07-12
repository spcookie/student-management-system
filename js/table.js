window.addEventListener('load', () => {
    //获取新增、删除按钮
    const dataOp = document.getElementById('dataOperation').children;
    //新增按钮绑定事件
    dataOp[0].onclick = () => {
        new popup(0).createPopup();
    }
    //删除按钮绑定事件
    dataOp[1].onclick = () => {
        let buttonIndexes = checkedButton();
        let dataIndexes = [];
        let deleteInquiry;
        if (buttonIndexes.length !== 0) {
            for (let i = 0; i < buttonIndexes.length; i++) {
                dataIndexes[i] = (page - 1) * stripOfPage + buttonIndexes[i]++;
            }
            let tipsIndex = buttonIndexes.join(',');
            deleteInquiry = new inquiry('确认删除第' + tipsIndex + '行？');
        } else {
            deleteInquiry = new inquiry('确认删除第1行？');
            dataIndexes[0] = (page - 1) * stripOfPage;
        }
        deleteInquiry.confirmEvent(() => {
            console.log(dataIndexes);
            deleteData(dataIndexes) ? window.alert('删除成功') : window.alert('删除失败');
            changeInfo(page);
        });
    }
    //页数
    window.page = 1;
    //每页的条数
    window.stripOfPage = 10;
    //获取表格tbody
    const tbody = document.querySelector('tbody');
    //全选按钮
    const allCheck = document.getElementById('allCheck');
    //选择按钮
    let checkButton;

    //获取'被选中的按钮'下标
    function checkedButton() {
        let index = [];
        for (let i = 0; i < checkButton.length; i++) {
            if (checkButton[i].checked) {
                index.push(i);
            }
        }
        return index;
    }

    //向表格中添加、修改信息、修改按钮事件函数
    window.changeInfo = function (page) {
        //清除全选按钮被选中状态
        allCheck.checked = false;
        let tRow = [];
        let length = countOfPage(page);
        let index = (page - 1) * stripOfPage;
        //添加信息
        for (let i = index; i < index + length; i++) {
            let data = getData(i);
            tRow.push('<tr>\n' +
                '                    <td><input type="checkbox" class="checkButton"></td>\n' +
                '                    <td>' + (i + 1) + '</td>\n' +
                '                    <td>' + data.number + '</td>\n' +
                '                    <td>' + data.name + '</td>\n' +
                '                    <td>' + data.college + '</td>\n' +
                '                    <td>' + data.major + '</td>\n' +
                '                    <td>' + data.grade + '</td>\n' +
                '                    <td>' + data.clazz + '</td>\n' +
                '                    <td>' + data.age + '</td>\n' +
                '                    <td colspan="2"><button class="view">查看</button><button class="modify">修改</button></td>\n' +
                '                </tr>');
        }
        //补全表格
        for (let i = 0; i < stripOfPage - length; i++) {
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
        //其他选择按钮
        checkButtonEvent()
        //修改查看按钮
        viewAndModifyEvent();
        //修改信息条数
        numOfInfo(page, length);
    }

    //计算一页信息的条数
    function countOfPage(page) {
        let num = (students_data.length - (page - 1) * stripOfPage);
        return num >= stripOfPage ? stripOfPage : num;
    }

    //修改信息条数
    const information = document.getElementById('information');
    let numbers = information.children;

    function numOfInfo(page, length) {
        numbers[0].innerText = page;
        numbers[1].innerText = students_data.length;
        numbers[2].innerText = length;
    }

    //全选按钮绑定事件
    allCheck.addEventListener('click', () => {
        for (let i = 0; i < checkButton.length; i++) {
            checkButton[i].checked = allCheck.checked;
        }
    })

    //其他选择按钮绑定事件
    function checkButtonEvent() {
        //获取选择按钮
        checkButton = document.getElementsByClassName('checkButton');
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
    }

    //修改查看按钮绑定事件
    function viewAndModifyEvent() {
        //查看、修改按钮
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
    }

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
            if (page * stripOfPage >= students_data.length) {
                alert('已经是最后一页');
            } else {
                page++;
                changeInfo(page);
            }
        })
    })();

    //第一次添加信息
    changeInfo(page);
});
