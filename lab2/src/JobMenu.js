import React from "react";

class JobSelect extends React.Component {
    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(e) {
        this.props.parentSelectHandler(e.target.value)
    }

    render() {
        return (
            <select defaultValue="HTML" onChange={this.onSelect}>
                <option value="HTML">Senior Full-stack HTML developer</option>
                <option value="JS">Джаваскриптизёр</option>
                <option value="PY">Укротитель Pythona</option>
                <option value="PHP">PHP разработчик</option>
                <option value="SWFT">Swift (что-то на богатом)</option>
            </select>
        );
    }
}

class JobLinks extends React.Component {
    constructor(props) {
        super(props);
        this.links = new Map([['HTML', [{ name: "Уроки гоши дударя по HTML", link: "https://www.youtube.com/playlist?list=PLqCDJtmqCyUXLH8iib9OjEiDQnwoVE2Es" },
        { name: "Руководстко по HTML 5 и CSS 3", link: "https://metanit.com/web/html5/" },
        { name: "Базовая структура HTML-документа с объяснением каждой строчки", link: "https://habr.com/ru/company/macloud/blog/555082/" },
        { name: "Работа в компании макдональдс", link: "https://rabota.by/employer/960561" },
        { name: "Полное руководство по Flexbox", link: "https://habr.com/ru/post/467049/" },
        { name: "Интерактивные курсы по HTML", link: "https://htmlacademy.ru/" },
        { name: "Гений вёрстки, отец русского джаваскрипта", link: "https://vk.com/id137490796" }]],
        ['JS', [{ name: "Руководство по JavaScript", link: "https://metanit.com/web/javascript/" },
        { name: "Асинхронность в JS", link: "https://habr.com/ru/company/wrike/blog/302896/" },
        { name: "Замыкания в JS", link: "https://habr.com/ru/company/ruvds/blog/424967/" },
        { name: "npm для простых смертных", link: "https://habr.com/ru/post/243335/" },
        { name: "Загрузить node.js", link: "https://nodejs.org/en/" },
        { name: "Руководство по Node.js", link: "https://metanit.com/web/nodejs/" },
        { name: "Руководство по MySQL", link: "https://metanit.com/sql/mysql/" }]],
        ['PY', [{ name: "Кто такой программист на Python", link: "https://ru.wikipedia.org/wiki/%D0%9E%D0%BF%D1%83%D1%89%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9" },
        { name: "Кто такие опущенные?", link: "https://pikabu.ru/story/zapiski_bloggera_za_zaborom_1_kto_takie_opushchennyie_za_chto_mogut_opustit_7872834" },
        { name: "Как жить если ты гей?", link: "https://parniplus.com/lgbt-movement/prinyat-orientatsiyu/" },
        { name: "Почему надо мной все издеваются?", link: "https://ru.wikihow.com/%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%82%D1%8C-%D1%82%D1%80%D0%B0%D0%B2%D0%BB%D1%8E-%D0%B8%D0%BB%D0%B8-%D0%B1%D1%83%D0%BB%D0%BB%D0%B8%D0%BD%D0%B3" },
        { name: "Разборки Python разработчиков", link: "https://www.youtube.com/watch?v=jQIr-AyWRts" }]],
        ['PHP', [{ name: "Как выглядит программист на PHP", link: "https://memepedia.ru/gigachad/" },
        { name: "Руководстко по HTML 5 и CSS 3", link: "https://metanit.com/web/html5/" },
        { name: "Гений вёрстки, отец русского джаваскрипта", link: "https://vk.com/id137490796" },
        { name: "Руководство по PHP ", link: "https://metanit.com/php/tutorial/" },
        { name: "Руководство по MySQL", link: "https://metanit.com/sql/mysql/" },
        { name: "PHP и MySql", link: "https://metanit.com/php/mysql/" },
        { name: "", link: "" }]],
        ['SWFT', [{ name: "Купить макбук", link: "https://catalog.onliner.by/notebook/apple" },
        { name: "Если нет денег на макбук и вы не очень умный", link: "https://odobrim.by/" },
        { name: "Хакинтош", link: "https://habr.com/ru/post/318448/" },
        { name: "Руководство по языку программирования Swift", link: "https://metanit.com/swift/tutorial/" },
        { name: "Кафе для вас и вашего макбука", link: "https://vse-kursy.by/read/104-kafe-gde-mozhno-rabotat-i-uchitsya-v-minske.html" },
        { name: "Вакансии iOS разработчиков", link: "https://rabota.by/vacancies/ios-razrabotchik-swift" },
        { name: "Документация по SWIFT", link: "https://www.swift.org/" }]]]);
    }

    links;

    render() {

        let list = [];
        let selectedLnk = this.links.get(this.props.selected);
        var i = 0;
        selectedLnk.forEach((element) => {
            list[i] = <div><a href={element.link}>{element.name}</a></div>;
            i++;
        });
        return list;
    }
}

class JobMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedJob: "HTML" };
        this.selectionChanged = this.selectionChanged.bind(this);
    }

    selectionChanged(e) {
        this.setState({ selectedJob: e });
    }

    render() {
        return (
            <React.Fragment>
                <JobSelect parentSelectHandler={this.selectionChanged} />
                <JobLinks selected={this.state.selectedJob} />
            </React.Fragment>);
    }
}

export default JobMenu;