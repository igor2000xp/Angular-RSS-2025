Подробный бриф-документ: Элементы ng-template и ng-container, и Переменные в Angular шаблонах
Этот документ представляет собой обзор ключевых концепций и практического применения элементов ng-template и ng-container, а также работы с переменными в шаблонах Angular, основываясь на предоставленных документационных материалах и русскоязычном туториале.

1. ng-template: Шаблонные фрагменты
   ng-template – это элемент Angular, предназначенный для объявления "шаблонного фрагмента" – секции контента, которую можно рендерить динамически или программно. Он вдохновлен нативным элементом <span style="color:rgb(255, 0, 0)">template</span>.

Определение и назначение: "<span style="color:rgb(255, 0, 0)">ng-template</span> element lets you declare a template fragment – a section of content that you can dynamically or programmatically render." По умолчанию контент внутри <span style="color:rgb(255, 0, 0)">ng-template</span> не отображается на странице.
Как подтверждает русскоязычный источник: "в официальной документации ангуляр сказано что данный элемент определяет шаблон который не отображается по умолчанию". Он "просто хранит внутри себя разметку и ждёт когда мы явно или косвенно сообщим ангуляр о том что мы хотим его использовать в шаблоне компонента".
Создание шаблонного фрагмента: Вы можете создать шаблонный фрагмент внутри любого шаблона компонента с помощью элемента <span style="color:rgb(255, 0, 0)">ng-template</span>:

```TypeScript
<p>This is a normal element</p>

<ng-template>
  <p>This is a template fragment</p>
</ng-template>
```

При рендеринге содержание <span style="color:rgb(255, 0, 0)">ng-template</span> не отображается.
Связывание контекста: Шаблонные фрагменты могут содержать привязки с динамическими выражениями, которые оцениваются относительно компонента, в котором фрагмент объявлен. Например:
<span style="color:rgb(255, 0, 0)">ng-template</span>You've selected {{count}} items.</ng-template>
Получение ссылки на шаблонный фрагмент (TemplateRef):
Через шаблонную ссылочную переменную: "You can add a template reference variable to an <span style="color:rgb(255, 0, 0)">ng-template</span> element to reference that template fragment in other parts of the same template file:"

```TypeScript
<ng-template #myFragment>
  <p>This is a template fragment</p>
</ng-template>
```

Через запросы (Queries): Используя @ViewChild (или @ViewChildren) для запроса TemplateRef объекта.
Для одного фрагмента:

```TypeScript
@ViewChild(TemplateRef) myFragment: TemplateRef<unknown> | undefined;

```

Для нескольких фрагментов (по имени):

```TypeScript
@ViewChild('fragmentOne', {read: TemplateRef}) fragmentOne: TemplateRef<unknown> | undefined;

```

Через инъекцию: Директива может инъецировать TemplateRef, если она применяется непосредственно к элементу <span style="color:rgb(255, 0, 0)">ng-template</span>.

```TypeScript
@Directive({ selector: '[myDirective]' })
export class MyDirective { private fragment = inject(TemplateRef); }

```

Рендеринг шаблонного фрагмента: После получения ссылки на TemplateRef фрагмента, его можно отрендерить двумя способами:
С помощью NgTemplateOutlet: Директива NgTemplateOutlet из @angular/common принимает TemplateRef и рендерит фрагмент как соседний элемент к элементу с аутлетом. Обычно используется с <span style="color:rgb(255, 0, 0)">ng-container</span>.

```TypeScript
<ng-template #myFragment>
  <p>This is a fragment</p>
</ng-template>
<ng-container *ngTemplateOutlet="myFragment"></ng-container>
```

"outl отвечает за отображение содержимого переданного в неё элемента NG template через шаблонную переменную".
С помощью ViewContainerRef: ViewContainerRef позволяет динамически рендерить шаблонный фрагмент, используя метод createEmbeddedView. Рендеринг фрагмента добавляет его в DOM как следующий соседний элемент компонента или директивы, инъецировавшей ViewContainerRef.

```TypeScript
this.viewContainer.createEmbeddedView(this.fragment());
```

Передача параметров при рендеринге: Можно объявлять параметры с помощью let- атрибутов внутри <span style="color:rgb(255, 0, 0)">ng-template</span> и передавать объект контекста при рендеринге.
С NgTemplateOutlet:

```TypeScript
[ngTemplateOutletContext]="{topping: 'onion'}"
```

С ViewContainerRef:

```TypeScript
this.viewContainer.createEmbeddedView(this.myFragment, {topping: 'onion'});
```

Русскоязычный источник объясняет let- синтаксис и ключ $implicit: "для ключа доллар implicit мы писали просто item а с другими ключами объекта добавляли ещё и значение после знака равно Дело в том что ключ дор implicit является именем по умолчанию". 2. ng-container: Группировка элементов без создания DOM-узлов
<span style="color:rgb(255, 0, 0)">ng-container</span> – это специальный элемент Angular, который позволяет группировать несколько элементов или помечать местоположение в шаблоне, не создавая при этом реального элемента в DOM.

Назначение: "<span style="color:rgb(255, 0, 0)">ng-container</span> is a special element in Angular that groups multiple elements together or marks a location in a template without rendering a real element in the DOM."
"здесь важным для нас является то что этот элемент не создаёт новые элементы в дом дереве". Он "это своего рода имитация обёртки которая в итоговой разметке никак не изменяет дом дерева".
Применение директив: Вы можете применять директивы к <span style="color:rgb(255, 0, 0)">ng-container</span> для добавления поведения или конфигурации к части шаблона. Однако Angular игнорирует все привязки атрибутов и слушатели событий, применяемые к <span style="color:rgb(255, 0, 0)">ng-container</span>, включая те, которые применяются через директивы.
Использование для динамического контента:
Рендеринг компонентов: NgComponentOutlet может динамически рендерить компонент в местоположении <span style="color:rgb(255, 0, 0)">ng-container</span>.

```TypeScript
<ng-container [ngComponentOutlet]="profileComponent()" />

```

Рендеринг шаблонных фрагментов: NgTemplateOutlet может динамически рендерить шаблонный фрагмент в местоположении <span style="color:rgb(255, 0, 0)">ng-container</span>.

```TypeScript
<ng-container [ngTemplateOutlet]="profileTemplate()" />

```

Использование со структурными директивами: ngIf и ngFor часто применяются к <span style="color:rgb(255, 0, 0)">ng-container</span> для условного рендеринга или повторения элементов без добавления лишних DOM-оберток.

```TypeScript
<ng-container \*ngIf="permissions == 'admin'">

  <h1>Admin Dashboard</h1>
  <admin-infographic></admin-infographic>
</ng-container>

```

Использование для инъекции: Применение директивы к <span style="color:rgb(255, 0, 0)">ng-container</span> позволяет дочерним элементам инъецировать эту директиву или то, что она предоставляет. Это полезно для декларативного предоставления значений определенной части шаблона.

```TypeScript
<ng-container theme="dark">
  <profile-pic />
  <user-bio />
</ng-container>

```

3. Переменные в шаблонах Angular
   Angular поддерживает два типа объявления переменных в шаблонах: локальные шаблонные переменные с @let и шаблонные ссылочные переменные.

3.1. Локальные шаблонные переменные с @let
Синтаксис @let в Angular позволяет определять локальную переменную и переиспользовать ее в рамках шаблона, аналогично синтаксису let в JavaScript.

Использование: Use @let to declare a variable whose value is based on the result of a template expression. Angular automatically keeps the variable's value up-to-date with the given expression, similar to bindings.

```TypeScript
@let name = user.name;
@let greeting = 'Hello, ' + name;
```

Каждый блок @let может объявлять только одну переменную.
Присваиваемость: В отличие от let в JavaScript, @let не может быть переприсвоен после объявления. Однако Angular автоматически обновляет значение переменной.
Область видимости (Scope): The @let declarations are scoped to the current view and its descendants. Новые представления создаются на границах компонентов и там, где шаблон может содержать динамический контент (например, блоки управления потоком, @defer, структурные директивы). Объявления @let не "поднимаются" (not hoisted) и не могут быть доступны родительским или соседним представлениям.
Полный синтаксис: @let ключевое слово, за которым следует имя переменной, знак =, Angular-выражение (многострочное), и завершается символом ;.
3.2. Шаблонные ссылочные переменные (#)
Шаблонные ссылочные переменные позволяют объявлять переменную, которая ссылается на значение элемента в вашем шаблоне.

На что могут ссылаться:
DOM-элемент в шаблоне (включая пользовательские элементы).
Экземпляр компонента или директивы Angular.
TemplateRef из ng-template.
Объявление: Добавьте атрибут, начинающийся с символа #, за которым следует имя переменной.

```TypeScript
<input #taskInput placeholder="Enter task name">
```

Присвоение значений: Angular присваивает значение шаблонным переменным на основе элемента, на котором переменная объявлена:
На компоненте Angular: переменная ссылается на экземпляр компонента (<my-datepicker #startDate />).
На <span style="color:rgb(255, 0, 0)">ng-template</span>: переменная ссылается на экземпляр TemplateRef (<ng-template #myFragment />).
На любом другом отображаемом элементе: переменная ссылается на экземпляр HTMLElement (<input #taskInput />).
Ссылки на директивы Angular: Если директива имеет свойство exportAs, вы можете присвоить переменной экземпляр директивы, указав имя exportAs.

```TypeScript
<section dropZone #firstZone="dropZone">...</section>
```

Использование с запросами (Queries): Шаблонные переменные можно использовать для "пометки" элемента для запросов компонентов и директив (@ViewChild, @ViewChildren).

```TypeScript
<input #description value="Original description">
// В компоненте:
@ViewChild('description') input: ElementRef | undefined;

```

4. Структурные директивы
   Структурная директива – это любая директива, которая:

Инъецирует TemplateRef.
Инъецирует ViewContainerRef и программно рендерит инъецированный TemplateRef.
Упрощенный синтаксис (_): Angular поддерживает специальный удобный синтаксис для структурных директив. Если вы применяете директиву к элементу и добавляете префикс _ к селектору директивы, Angular интерпретирует весь элемент и его содержимое как шаблонный фрагмент.

```TypeScript
<section *myDirective>
  <p>This is a fragment</p>
</section>
<!-- Это эквивалентно: -->
<ng-template myDirective>
  <section>
    <p>This is a fragment</p>
  </section>
</ng-template>

```

Типичное использование: Разработчики обычно используют структурные директивы для условного рендеринга фрагментов или рендеринга фрагментов несколько раз (например, ngIf, ngFor). 5. Общие рекомендации и выводы
ng-template и ng-container часто используются вместе для создания гибких и оптимизированных шаблонов. ng-template позволяет определить переиспользуемые блоки HTML, которые не рендерятся по умолчанию, а ng-container предоставляет "невидимый" элемент для применения директив (*ngIf, *ngFor, \*ngTemplateOutlet) без добавления лишних узлов в DOM.
Русскоязычный источник подчеркивает, что ng-template особенно полезен для "повторяющиеся места с одинаковой разметкой но с разными данными", позволяя "создать один такой образец разметки... и подключать его в нужных вам местах". Это "сокращает использование одинакового кода и делает его более читабельный".
Переменные в шаблонах, будь то локальные @let или шаблонные #, предоставляют мощные инструменты для управления данными и ссылками на элементы внутри шаблона, повышая его читаемость и удобство. @let особенно полезен для кэширования результатов сложных выражений или асинхронных данных, делая шаблон более понятным и производительным.
Понимание того, как Angular работает с этими элементами и переменными, является фундаментальным для эффективной разработки сложных пользовательских интерфейсов.
