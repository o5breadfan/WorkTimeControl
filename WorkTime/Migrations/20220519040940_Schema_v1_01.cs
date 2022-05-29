using Microsoft.EntityFrameworkCore.Migrations;

namespace WorkTime.Migrations
{
    public partial class Schema_v1_01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [dbo].[Role] ([Name]) VALUES (N'Администратор')" +
                                 "INSERT INTO [dbo].[Role] ([Name]) VALUES (N'Сотрудник')" +
                                 "INSERT INTO [dbo].[Role] ([Name]) VALUES (N'Руководитель')" +
                                 "INSERT INTO [dbo].[Role] ([Name]) VALUES (N'Директор')" +
                                 "INSERT INTO [dbo].[Role] ([Name]) VALUES (N'Технический директор')"+

                                 "INSERT INTO [dbo].[RequestType] ([Name]) VALUES (N'Основной оплачиваемый отпуск')" +
                                 "INSERT INTO [dbo].[RequestType] ([Name]) VALUES (N'Отпуск без сохранения заработной платы')" +
                                 "INSERT INTO [dbo].[RequestType] ([Name]) VALUES (N'Декретный отпуск')" +
                                 "INSERT INTO [dbo].[RequestType] ([Name]) VALUES (N'Отпуск по уходу за ребенком')" +
                                 "INSERT INTO [dbo].[RequestType] ([Name]) VALUES (N'Выходной в счет отпуска')" +
                                 "INSERT INTO [dbo].[RequestType] ([Name]) VALUES (N'Выходной в счет отработки')" +
                                 "INSERT INTO [dbo].[RequestType] ([Name]) VALUES (N'Выходной в счет переработки')" +
                                 "INSERT INTO [dbo].[RequestType] ([Name]) VALUES (N'Отгул')" +

                                 "INSERT INTO [dbo].[RequestStatus] ([Name]) VALUES (N'Новая')" +
                                 "INSERT INTO [dbo].[RequestStatus] ([Name]) VALUES (N'Отправлена на согласование')" +
                                 "INSERT INTO [dbo].[RequestStatus] ([Name]) VALUES (N'Отправлена на утверждение')" +
                                 "INSERT INTO [dbo].[RequestStatus] ([Name]) VALUES (N'Утверждена')" +
                                 "INSERT INTO [dbo].[RequestStatus] ([Name]) VALUES (N'Не согласована')" +
                                 "INSERT INTO [dbo].[RequestStatus] ([Name]) VALUES (N'Не утверждена')" +
                                 "INSERT INTO [dbo].[RequestStatus] ([Name]) VALUES (N'Отозвана')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
