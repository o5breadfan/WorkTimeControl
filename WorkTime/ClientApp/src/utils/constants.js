export const RoleType = {
    Admin: { id: 1, name: "Администратор" },
    Employee: { id: 2, name: "Сотрудник" },
    HeadOfDepartment: { id: 3, name: "Руководитель" },
    Director: { id: 4, name: "Директор" },
    TechnicalDirector: { id: 5, name: "Технический директор" }
}

export const RequestType = {
    PaidVacation: { id: 1, name: "Основной оплачиваемый отпуск" },
    LeaveWithoutPay: { id: 2, name: "Отпуск без сохранения заработной платы" },
    MaternityLeave: { id: 3, name: "Декретный отпуск" },
    ParentalLeave: { id: 4, name: "Отпуск по уходу за ребенком" },
    TimeOffOfVacation: { id: 5, name: "Выходной в счет отпуска" },
    TimeOffOfWorkingOut: { id: 6, name: "Выходной в счет отработки" },
    TimeOffOfRecycling: { id: 7, name: "Выходной в счет переработки" },
    TimeOffOf: { id: 8, name: "Отгул" }
}