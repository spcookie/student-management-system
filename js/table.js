//学生数据
const students_data = [
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '1',
        age: '19'
    },

    {
        number: '12023020122',
        name: '咸小鱼',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '1',
        age: '19'
    },

    {
        number: '12023020121',
        name: '张三',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '2',
        age: '19'
    },

    {
        number: '12023020121',
        name: '李四',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '1',
        age: '19'
    },

    {
        number: '12023020121',
        name: '小玉',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '2',
        age: '19'
    },

    {
        number: '12023020121',
        name: '王富贵',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '1',
        age: '20'
    },

    {
        number: '12023020121',
        name: '颜如玉',
        college: '两江人工智能学院',
        grade: '2021',
        clazz: '3',
        age: '22'
    },

    {
        number: '12023020121',
        name: '动力小子',
        college: '两江人工智能学院',
        grade: '2021',
        clazz: '4',
        age: '19'
    },

    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '1',
        age: '19'
    },

    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '1',
        age: '19'
    },

    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '1',
        age: '19'
    },

    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '1',
        age: '19'
    },

    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '1',
        age: '19'
    },

    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        grade: '2020',
        clazz: '1',
        age: '19'
    },

    {
        number: '12023020121',
        name: '颜如玉',
        college: '两江人工智能学院',
        grade: '2021',
        clazz: '3',
        age: '22'
    },

    {
        number: '12023020121',
        name: '颜如玉',
        college: '两江人工智能学院',
        grade: '2021',
        clazz: '3',
        age: '22'
    },

    {
        number: '12023020121',
        name: '颜如玉',
        college: '两江人工智能学院',
        grade: '2021',
        clazz: '3',
        age: '22'
    }
];

window.addEventListener('load', () => {
    //获取表格tbody
    const tbody = document.querySelector('tbody');
    //全选按钮
    const allCheck = document.getElementById('allCheck');
    //选择按钮
    let checkButton;

    //向表格中添加信息函数
    function changeInfo(page) {
        //清除全选按钮被选中状态
        allCheck.checked = false;
        let tRow = [];
        let length = count(page);
        let index = (page - 1) * 10;
        //添加信息
        for (let i = index; i < index + length; i++) {
            tRow.push('<tr>\n' +
                '                    <td><input type="checkbox" class="checkButton"></td>\n' +
                '                    <td>' + (i + 1) + '</td>\n' +
                '                    <td>' + students_data[i].number + '</td>\n' +
                '                    <td>' + students_data[i].name + '</td>\n' +
                '                    <td>' + students_data[i].college + '</td>\n' +
                '                    <td>' + students_data[i].grade + '</td>\n' +
                '                    <td>' + students_data[i].clazz + '</td>\n' +
                '                    <td>' + students_data[i].age + '</td>\n' +
                '                    <td>9</td>\n' +
                '                    <td colspan="2"><button>查看</button><button>修改</button></td>\n' +
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
        numOfInfo(page, length);
    }

    //计算一页信息的条数
    function count(page) {
        let num = (students_data.length - --page * 10);
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
    changeInfo(1);
    //全选按钮绑定事件
    allCheck.addEventListener('click', () => {
        for (let i = 0; i < checkButton.length; i++) {
            checkButton[i].checked = allCheck.checked;
        }
    })
    //获取两个翻页按钮
    const turnPage = document.querySelector('#turnPage').children;
    //页数
    let page = 1;
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
