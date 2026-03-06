# Тестовое задание

## Рекомендации

Таймер в расписаниях настроен так, чтобы данные с WB API забирались каждый час, а Google Sheets обновлялся спустя 2 минуты, рекомендуется понизить частоту таймера, для более комфортного тестирования:

Для src\schedulers\wb.scheduler.ts - `*/1 * * * *`

Для src\schedulers\googleSheets.scheduler.ts - `*/2 * * * *`

## Требования

Docker и Docker Compose
Node.js (для локального запуска, если не через Docker)
Аккаунт Google с сервисным ключом для доступа к Google Sheets
Доступ к API Wildberries (WB_API_TOKEN)
Создать сервисный аккаунт в Google Cloud и скачать JSON ключ.

## Запуск

Создайте .env в корне проекта и укажите переменные окружения:
примеры есть в example.env

Поместите google-credentials.json в проект и укажите путь через переменные окружения
Создайте таблицу Google Sheets.
Назовите лист stocks_coefs.
Добавьте сервисный email (из JSON файла Google credentials) в редакторы таблицы.
Получите spreadsheet_id таблицы.

### Seed или ручное добавление id

Вариант 1: Раскомментируйте seed в src/postgres/seeds/spreadsheets.js и вставьте нужный spreadsheet_id.
Вариант 2: После запуска сервиса добавьте spreadsheet_id напрямую в таблицу spreadsheets в PostgreSQL.

PS: С наилучшими пожеланиями, Наместников Максим!
TG: @DdayMax
