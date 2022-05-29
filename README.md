# WorkTime
Многопользовательское web-приложение учёта рабочего времени, планирования отпусков, отгулов и удалённой работы. 
Основной целью приложения является автоматизация указанных процессов и как следствие:
*	Упрощение работы делопроизводителя.
*	Возможность сотрудникам видеть и планировать свои рабочие и выходные дни, отгулы и отработки, отпуск и удаленную работу.
*	Возможность руководству компании согласовывать и утверждать заявки на изменение планового рабочего графика и отпусков сотрудников, получать по ним актуальную информацию.

# Technologies

### Backend
* ASP.NET Core

### Frontend
* ReactJS
* React-router
* Kendo UI React

# Project Structure
* WorkTime
  * AutoMapper - Настройки маппинга 
  * ClientApp - Клиентское приложение
    * src/components - Основные страницы
    * src/services - Реализация REST API
  * Data - Доменные модели
  * Controllers - API
  * Services - слой бизнес-логики