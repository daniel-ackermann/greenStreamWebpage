import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent {

    constructor() { }
    items = [{
        image: "assets/index/Was_kann_ich_tun.png",
        title: "Was kann ich tun?",
        description: "Du möchtest dein Klimawissen in Handlung umsetzen, weißt aber nicht wie? Dann höre unbedingt in den Podcast mit Harald Lesch rein!",
        link: "https://climaware.fireside.fm/haraldlesch"
    },

    {
        image: "assets/index/Gefahren_Klimawandel.png",
        title: "Gefahren durch den Klimawandel",
        description: "Was passiert, wenn wir den Klimawandel nicht stoppen? - Quarks",
        link: "https://www.youtube.com/watch?v=FoMzyF_B7Bg"
    },

    {
        image: "assets/index/Was_Klimawandel.png",
        title: "Was ist der Klimawandel?",
        description: "Das Klimawandel-FAQ vom Umweltbundesamt",
        link: "https://www.umweltbundesamt.de/themen/klima-energie/klimawandel/haeufige-fragen-klimawandel#1-was-ist-eigentlich-klima"
    }];

    klimawandel = [{
        image: "Status_Quo.png",
        title: "Status Quo des Klimawandels",
        description: "Die dritte Folge des Podcasts Climaware um die bisherigen Klima-Veränderungen laut IPCC",
        link: "https://climaware.fireside.fm/ipcc-wissen"
    },

    {
        image: "Wissenschaft_Klimawissen.png",
        title: "Klimwandel - Was die Wissenschaft wirklich weiß",
        description: "Der erste Teil der Doku zum Klimawandel von maiLab (WDR)",
        link: "https://www.youtube.com/watch?v=oJ1zm65u-ck"
    },

    {
        image: "Fakten_Klimawandel.jpg",
        title: "Fakten zum Klimawandel",
        description: "24 Fakten zum Klimawandel der Scientists for future",
        link: "https://de.scientists4future.org/ueber-uns/stellungnahme/fakten/"
    }]
    tun = [
        {
            image: "Klimawandel_tun.png",
            title: "Klimawandel - Was wir tatsächlich tun können",
            description: "Der zweite Teil der Doku zum Klimawandel von maiLab (WDR)",
            link: "https://www.youtube.com/watch?v=bCvUwnIdqBI"
        },
        {
            image: "Was_kann_ich_tun.jpg",
            title: "Was kann ich tun?",
            description: "Du möchtest dein Klimawissen in Handlung umsetzen, weißt aber nicht wie? Dann höre unbedingt in den Podcast mit Harald Lesch rein!",
            link: "https://climaware.fireside.fm/haraldlesch"
        },

        {
            image: "Umwelttipps.jpg",
            title: "Umwelttipps für den Alltag vom Umweltbundesamt",
            description: "Elektrogeräte, Essen & Trinken, Garten & Freizeit, Haushalt & Wohnen, Heizen & Bauen, Mobilität",
            link: "https://www.umweltbundesamt.de/umwelttipps-fuer-den-alltag"
        }
    ]
}