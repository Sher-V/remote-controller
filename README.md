# Виртуальный пульт для управления умным домом

Приложение предоставляет возможность управления и конфигурирования устройств умного дома.  

Каждое устройство имеет базовый функционал:
1. Включение/Выключение
2. Прибавить/Убавить мощность

Отдельным устройствам можно добавить следующий дополнительный функционал путем перетаскивания в поле устройства:
1. Режим(стандартный, экономичный)
2. Яркость

Для сохранения конфигурации отдельного дома нужно нажать соответствующую кнопку.  
Для отмены действия - нажать кнопку отменить.

Для запуска проекта необходимы;
1. NodeJS - v14.5.0

## Инструкция по запуску проекта
1. Из корневой папки проекта запустить mongorestore backup
2. Для запуска проекта проинсталлировать пакеты в папках frontend и backend с помощью npm install
3. Для старта сервера в папке backend - node server.js
4. Для старта фронта в папке frontend - npm start


