const students_data = [{number: '12023020121', name: '刘伟翔', college: '两江人工智能学院', grade: '2020', age: '19'},
    {number: '12023020121', name: '刘伟翔', college: '两江人工智能学院', grade: '2020', age: '19'},
    {number: '12023020121', name: '刘伟翔', college: '两江人工智能学院', grade: '2020', age: '19'},
    {number: '12023020121', name: '刘伟翔', college: '两江人工智能学院', grade: '2020', age: '19'},
    {number: '12023020121', name: '刘伟翔', college: '两江人工智能学院', grade: '2020', age: '19'},
    {number: '12023020121', name: '刘伟翔', college: '两江人工智能学院', grade: '2020', age: '19'},
    {number: '12023020121', name: '刘伟翔', college: '两江人工智能学院', grade: '2020', age: '19'},
    {number: '12023020121', name: '刘伟翔', college: '两江人工智能学院', grade: '2020', age: '19'},
    {number: '12023020121', name: '刘伟翔', college: '两江人工智能学院', grade: '2020', age: '19'},
    {number: '12023020121', name: '刘伟翔', college: '两江人工智能学院', grade: '2020', age: '19'}
]

window.addEventListener('load', () => {
    const tbody = document.querySelector('tbody');
    let tRow = [];
    for (let i = 0; i < 10; i++) {
        tRow.push('<tr>\n' +
            '                    <td><button>'+ 'button' +'</button></td>\n' +
            '                    <td>'+ (i + 1) +'</td>\n' +
            '                    <td>'+ students_data[i].number +'</td>\n' +
            '                    <td>'+ students_data[i].name +'</td>\n' +
            '                    <td>'+ students_data[i].college +'</td>\n' +
            '                    <td>'+ students_data[i].grade +'</td>\n' +
            '                    <td>'+ students_data[i].age +'</td>\n' +
            '                    <td>'+ students_data[i].name +'</td>\n' +
            '                    <td>9</td>\n' +
            '                    <td colspan="2"><button>查看</button><button>修改</button></td>\n' +
            '                </tr>');
        tbody.innerHTML += tRow[i];
    }

})
