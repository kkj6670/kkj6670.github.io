---
    title: unknown at rule @tailwind vscode 세팅
    date: 2022-01-09 14:23
    tag: ["private repository"]
---

vscode에서 tailwind 데코레이션을 아래와같이 사용할때 경고문구가 나와 따로 설정이 필요하다.
```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;
```

root폴더에 .vscode폴더를 만들고 아래 파일을 추가한다.
root폴더/.vscode/css_custom_data.json
```jsx
{
  "atDirectives": [
    {
      "name": "@tailwind",
      "description": "Use the @tailwind directive to insert Tailwind’s `base`, `components`, `utilities`, and `screens` styles into your CSS.",
      "references": [
        {
          "name": "Tailwind’s “Functions & Directives” documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives/#tailwind"
        }
      ]
    }
  ]
}
```

vscode setting.json 아래항목 추가
```jsx
{
  "css.customData": [".vscode/css_custom_data.json"]
}
```