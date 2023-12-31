
const автоперевезення = [
    { номер_автобази: 1, номер_машини: "А123", дата_перевезення: "2023-10-27", код_вантажу: 1, вартість_перевезення: 200 },
    { номер_автобази: 2, номер_машини: "Б456", дата_перевезення: "2023-10-28", код_вантажу: 2, вартість_перевезення: 300 },
];

const вантаж = [
    { код: 1, назва: "Вугілля" },
    { код: 2, назва: "Нафта" },
];

function знайтиНазвиВантажів(номерМашини, поточнийРік) {
    const результат = [];
    for (const перевезення of автоперевезення) {
        if (перевезення.номер_машини === номерМашини) {
            const рікПеревезення = new Date(перевезення.дата_перевезення).getFullYear();
            if (рікПеревезення === поточнийРік) {
                const кодВантажу = перевезення.код_вантажу;
                const назва = вантаж.find(item => item.код === кодВантажу).назва;
                результат.push(назва);
            }
        }
    }
    return результат;
}

function знайтиПеревезенняВантажів() {
    const результат = [];
    for (const вантажЕлемент of вантаж) {
        const кодВантажу = вантажЕлемент.код;
        const вартість = автоперевезення
            .filter(перевезення => перевезення.код_вантажу === кодВантажу)
            .reduce((сума, перевезення) => сума + перевезення.вартість_перевезення, 0);
        const назва = вантажЕлемент.назва;
        результат.push({ назва, сумарна_вартість: вартість });
    }
    return результат;
}

function знайтиМашинуЗаДень(назваВантажу, дата) {
    let найбільшаКількістьПеревезень = 0;
    let номерМашини = null;
    for (const перевезення of автоперевезення) {
        if (перевезення.дата_перевезення === дата && вантаж.find(item => item.код === перевезення.код_вантажу).назва === назваВантажу) {
            const кількістьПеревезень = автоперевезення.filter(item => item.номер_машини === перевезення.номер_машини).length;
            if (кількістьПеревезень > найбільшаКількістьПеревезень) {
                найбільшаКількістьПеревезень = кількістьПеревезень;
                номерМашини = перевезення.номер_машини;
            }
        }
    }
    return номерМашини;
}

// Приклади використання функцій
console.log("a) Назви вантажів, перевезених у поточному році машиною з номером 'А123':", знайтиНазвиВантажів("А123", 2023));
console.log("b) Інформація про перевезення всіх вантажів:", знайтиПеревезенняВантажів());
console.log("c) Номер машини, яка виконала найбільшу кількість перевезень вантажу 'Вугілля' за 2023-10-27:", знайтиМашинуЗаДень("Вугілля", "2023-10-27"));
