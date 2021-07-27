
//账户数据ID
let studentDataID = [];

studentDataID.push([
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    },
    {
        number: '12023020122',
        name: '徐浩',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    },
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    },
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    },
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    },
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    },
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    },
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    },
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    },
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    },
    {
        number: '12023020121',
        name: '刘伟翔',
        college: '两江人工智能学院',
        major: '软件工程',
        grade: '2020',
        clazz: '1',
        age: '19'
    }
]);

//账户学生数据
let students_data = [];

//获取账户中数据
(function getDataFromAccount() {
    const info = window.location.search;
    const ID = info.substr(4, 1);
    students_data = studentDataID[ID];
})();

//学生数据对象
window.createData = function (number, name, college, major, grade, clazz, age) {
    this.number = number;
    this.name = name;
    this.college = college;
    this.major = major;
    this.grade = grade;
    this.clazz = clazz;
    this.age = age;
};

//从学生数据中获取数据
function getData(index) {
    return students_data[index];
}

//从弹窗中获取数据
function getDataFromInput(inputBox) {
    let data = [];
    for (let i = 0; i < inputBox.length; i++) data.push(inputBox[i].value);
    return data;
}

//添加数据到学生数据中
function addData(data) {
    const oneOfData = new createData(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    students_data.push(oneOfData);
}

//修改学生数据
function changeData(data, index) {
    students_data[index] = new createData(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
}

//删除学生数据
function deleteData(indexes) {
    try {
        for (let i = 0; i < indexes.length; i++) {
            for (let j = indexes[i]; j < students_data.length - 1; j++) {
                students_data[j] = students_data[j + 1];
            }
            students_data.pop();
        }
    } catch (e) {
        return false;
    }
    return true;
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
    let errCodes = [];
    if (!matching.num(data[0])) {
        errCodes.push(0);
    }
    if (!matching.name(data[1])) {
        errCodes.push(1);
    }
    if (!matching.college(data[2])) {
        errCodes.push(2);
    }
    if (!matching.major(data[3])) {
        errCodes.push(3);
    }
    if (!matching.grade(data[4])) {
        errCodes.push(4);
    }
    if (!matching.clazz(data[5])) {
        errCodes.push(5);
    }
    if (!matching.age(data[6])) {
        errCodes.push(6);
    }
    return errCodes;
}