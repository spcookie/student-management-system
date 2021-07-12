//学生数据
window.students_data = [
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
];
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
function getDataForAlert(index) {
    return students_data[index];
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