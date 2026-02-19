# UI Guidelines — Yasme Travel

## Overview

Эти рекомендации обеспечивают единый стиль приложения и правильное использование темы (theme.ts).  
Фокус: мобильная версия, Soft Modern Green UI, минимализм, переиспользуемость компонентов.

---

## 1. Colors

Использовать только цвета из темы:

- Primary / Secondary
- Background / Paper / Subtle / Gradient
- Text: primary, secondary, tertiary, disabled, inverse
- Status: error, warning, success

Запрещено:

- Использовать цвета вне theme.colors
- Прописанные hex напрямую в компонентах

Пример правильного использования:
color: ${({ theme }) => theme.colors.text.primary};
background-color: ${({ theme }) => theme.colors.primary};

---

## 2. Typography

- Использовать theme.typography
- Запрещено задавать font-size и line-height вручную вне темы
- Компоненты:
  - h1–h6 — заголовки
  - body1 / body2 — тексты
- Кегль, вес и интервалы определяются только через theme

Пример:
const Title = styled.h1`  font-family: ${({ theme }) => theme.typography.fontFamily};
  ${theme.typography.h1};`;

---

## 3. Spacing

- Использовать только theme.spacing(factor)
- Фиксированные пиксели запрещены
- Пример:
  margin: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};

---

## 4. Border Radius

- Использовать только theme.borderRadius
- Примеры: sm, md, lg, full
- Компоненты должны быть скруглены согласно типу:
  - кнопки — md
  - модалки — lg
  - аватары — full

---

## 5. Shadows

- Использовать только тени из theme.shadows
- Примеры:
  - card: theme.shadows.card
  - hover: theme.shadows.cardHover
  - glow: theme.shadows.glow

---

## 6. Buttons

- Всегда использовать MUI Button или переиспользуемый shared/ui/Button
- Стиль:
  - textTransform: none
  - fontWeight: 600
  - borderRadius: theme.borderRadius.md
  - padding: theme.spacing(1.5) + theme.spacing(3)

---

## 7. Inputs / TextFields

- Использовать MUI TextField с кастомными styleOverrides
- Скругления и тени берём из темы
- Все placeholder и helperText — theme.text

---

## 8. Layout & Grid

- Mobile-first: основная вёрстка под смартфон
- Использовать flex / grid с gap из theme.spacing
- Отступы и padding — только через theme.spacing
- Запрещено: margin/padding в px напрямую

---

## 9. Colors for Status

- error / warning / success — theme.colors.error / warning / success
- Не использовать яркие или сторонние оттенки
- Все статусы должны быть визуально согласованы с основной палитрой

---

## 10. Backgrounds

- Использовать:
  - default / paper / subtle / gradient
- Gradient применять только в контейнерах или фонах экранов
- Запрещено использовать сторонние градиенты без согласования

---

## 11. Text & Links

- Ссылки и кликабельные элементы:
  - color: theme.colors.primary
  - hover: theme.colors.secondary
- Disabled / inactive: theme.colors.text.disabled
- Контрастность должна соответствовать WCAG

---

## 12. Global Components

- Все повторно используемые компоненты хранятся в shared/ui
- Запрещено дублировать код
- Компоненты должны принимать theme props и быть полностью переиспользуемыми

---

## 13. Breakpoints & Responsiveness

- Использовать только theme.breakpoints.up() / theme.breakpoints.down()
- Mobile-first
- Все размеры компонентов адаптируются по breakpoints
- Пример:
  ${({ theme }) => theme.breakpoints.up('md')} {
  padding: ${({ theme }) => theme.spacing(4)};
  }

---

## 14. Transitions

- Использовать только theme.transitions
- Пример:
  transition: all ${({ theme }) => theme.transitions.normal};
  &:hover {
  transform: translateY(-2px);
  }

---

## 15. Z-Index

- Использовать theme.zIndex
- Пример:
  - dropdown: 1000
  - modal: 1300
  - tooltip: 1500
- Не задавать z-index напрямую

---

## 16. Accessibility

- Все интерактивные элементы должны иметь focus-visible outline:
  :focus-visible {
  outline: 2px solid ${({ theme }) => theme.colors.primary};
  outline-offset: 2px;
  }
- Контраст текста/фона ≥ 4.5:1
- Scrollbar и hover состояния должны быть видимыми

---

## 17. Guidelines for Developers

- Никогда не писать фиксированные px для цветов, шрифтов, теней, отступов
- Всегда использовать theme
- Все новые компоненты должны идти в shared/ui или соответствующий слой FSD
- Перед добавлением новых цветов/теней — согласовать с дизайнером/lead dev
- Следовать Mobile-first подходу и Soft Modern Green UI

---

## 18. References

- theme.ts — основной источник правды
- shared/ui — переиспользуемые компоненты
- AGENTS.md — инструкция для Kilo Code
- docs/fsd.md — структура слоев FSD
