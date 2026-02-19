# Component Guidelines — Yasme Travel

## Overview

Этот документ описывает правила и рекомендации для разработки компонентов в проекте Yasme Travel.  
Фокус: согласованная структура компонентов по слоям FSD, переиспользуемость, соблюдение theme и mobile-first подхода.

---

## 1. Component Layers

### 1.1 shared/ui

- Переиспользуемые базовые компоненты (Button, Input, Modal, Card и т.д.)
- Обязательное использование theme для всех стилей
- Не хранить локальное состояние, кроме внутренних UI-эффектов
- Запрещено дублировать компоненты из features, widgets или pages

### 1.2 features/\*/ui

- Компоненты, специфичные для фичи
- Внутреннее состояние допускается (локальный UI state)
- Переиспользовать shared/ui компоненты для построения UI
- Не использовать theme напрямую в других слоях (кроме shared/ui)

### 1.3 widgets/\*/ui

- Композиция из нескольких features или shared компонентов
- Компоненты должны быть максимально self-contained и переиспользуемыми
- State хранится в features или Redux, внутри widget только локальные UI state

### 1.4 pages/\*/ui

- Компоненты страниц, объединяющие widgets и features
- Запрещено дублировать shared или feature компоненты
- Layout страницы должен использовать theme.spacing и breakpoints

---

## 2. Naming Conventions

- Папки и файлы: `kebab-case`
- Компоненты: `PascalCase`
- Props boolean: `isActive`, `hasError`
- Функции внутри компонента: camelCase
- Event handlers: `onClick`, `onChange`, `onSubmit`

---

## 3. Props & Theme Usage

- Все цвета, размеры, шрифты, borderRadius, shadows — только через theme
- Запрещено использовать px напрямую
- Все компоненты должны принимать theme через styled-components или MUI props
- Не использовать магические значения (числа, цвета, отступы) вне theme

---

## 4. State Management

- Локальный UI state допустим только для элементов управления внутри компонента
- Глобальный или feature state — через Redux slice или feature model
- Widget/page могут только подключаться к Redux или feature state, не хранить отдельный глобальный state

---

## 5. Layout & Spacing

- Использовать flex/grid с gap и padding через theme.spacing
- Не писать margin/padding в px напрямую
- Mobile-first: компоненты должны корректно масштабироваться на xs/sm

---

## 6. Shadows & Border Radius

- Все тени — только theme.shadows
- Скругления — theme.borderRadius
- Не создавать кастомные тени или border-radius вне theme

---

## 7. Accessibility

- Все интерактивные элементы должны иметь focus-visible outline
- Кнопки, инпуты, модалки должны быть доступными для клавиатуры
- Контрастность текста ≥ 4.5:1

---

## 8. Reusability & Composition

- Компоненты должны быть максимально переиспользуемыми
- В features использовать shared/ui
- Widgets строятся из features и shared/ui
- Pages строятся из widgets и features
- Не дублировать логику и UI между слоями

---

## 9. Testing Considerations

- Компоненты должны быть легко тестируемыми
- Не держать side-effects внутри UI-компонентов
- Props и callback должны быть явными и типизированными

---

## 10. References

- theme.ts — источник всех цветов, размеров, шрифтов
- docs/fsd.md — слои FSD
- docs/ui-guidelines.md — общие правила UI
- shared/ui — базовые компоненты
