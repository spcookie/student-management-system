window.addEventListener('load', () => {
    //动态垂直居中
    const container = document.getElementById('container');
    let windowSize = document.documentElement.clientHeight;
    container.style.marginTop = (windowSize - 570) / 2 + 'px';
    window.onresize = () => {
        windowSize = document.documentElement.clientHeight;
        container.style.marginTop = (windowSize - 570) / 2 + 'px';
    }

    //获取新增、删除按钮
    const dataOp = document.getElementById('dataOperation').children;
    //新增按钮绑定事件
    dataOp[0].onclick = () => {
        new popup(0).createPopup();
    }
    //删除按钮绑定事件
    dataOp[1].onclick = () => {
        if (students_data.length !== 0) {
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
                deleteInquiry = new inquiry('确认删除第1行?');
                dataIndexes[0] = (page - 1) * stripOfPage;
            }
            deleteInquiry.confirmEvent(() => {
                deleteData(dataIndexes);
                changeInfo(pageDecrease(page));
            });
        } else {
            wringAlert('表格中没有数据');
        }
    }

    //删除元素表格为空时跳转页面
    function pageDecrease(page) {
        if (countOfPage(page) === 0) {
            return --page;
        }
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
    let checkButton = document.getElementsByClassName('checkButton');

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
                '<td><input type="checkbox" class="checkButton"></td>\n' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + data.number + '</td>' +
                '<td>' + data.name + '</td>' +
                '<td>' + data.college + '</td>' +
                '<td>' + data.major + '</td>' +
                '<td>' + data.grade + '</td>' +
                '<td>' + data.clazz + '</td>' +
                '<td>' + data.age + '</td>' +
                '<td colspan="2"><button class="view">查看</button><button class="modify">修改</button></td>' +
                '</tr>');
        }
        //补全表格
        for (let i = 0; i < stripOfPage - length; i++) {
            tRow.push('<tr>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td colspan="2"></td>' +
                '</tr>');
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

    //排序
    let tdButton = document.getElementsByTagName('thead')[0].children[0].children[2].children[0];
    tdButton.addEventListener('click', function up() {
        students_data = students_data.sort((a, b) => {
            return a.number - b.number;
        });
        changeInfo(page);
        this.removeEventListener('click', up);
        this.addEventListener('click', function down() {
            window.students_data = students_data.sort((a, b) => {
                return b.number - a.number;
            });
            changeInfo(page);
            this.removeEventListener('click', down);
            this.addEventListener('click', up);
        });
    })

    //修改查看按钮绑定事件
    function viewAndModifyEvent() {
        //查看、修改按钮
        const view = document.getElementsByClassName('view');
        const modify = document.getElementsByClassName('modify');
        const count = view.length;
        for (let i = 0; i < count; i++) {
            view[i].onclick = () => {
                let dataIndex = (page - 1) * stripOfPage + i;
                new popup(2).createPopup(dataIndex);
            };
            modify[i].onclick = () => {
                let dataIndex = (page - 1) * stripOfPage + i;
                new popup(1).createPopup(dataIndex);
            };
        }
    }

    //获取两个翻页按钮
    const turnPage = document.querySelector('#turnPage').children;
    //翻页键点击波纹效果
    for (let i = 0; i < 2; i++) {
        turnPage[i].addEventListener('click', (e) => {
            let bg = turnPage[i].children[0];
            if (bg.className === '') {
                bg.style.top = e.offsetY + 'px';
                bg.style.left = e.offsetX + 'px';
                bg.classList.add('wave');
                setTimeout(() => {
                    bg.className = '';
                }, 500);
            }
        });
    }

    //向上翻页
    (function pageUp() {
        turnPage[0].addEventListener('click', () => {
            if (page === 1) {
                wringAlert('已是第一页!');
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
                wringAlert('已是最后一页!');
            } else {
                page++;
                changeInfo(page);
            }
        })
    })();

    const main = document.getElementById('main');
    //翻页弹窗
    function wringAlert(massage) {
        //判断main中的元素个数->4表示弹窗不存在
        if (main.children.length === 4) {
            const pageWring = document.createElement('div');
            pageWring.classList.add('wring');
            pageWring.innerHTML = massage;
            main.appendChild(pageWring);
            setTimeout(() => {
                main.removeChild(pageWring);
            }, 800);
        }
    }

    //第一次添加信息
    changeInfo(page);
});
