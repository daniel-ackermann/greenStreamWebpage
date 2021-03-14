import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent {

    constructor() { }
    items = [
        {
            image: `https://appsterdb.ackermann.digital/assets/greenwashing2.jpg`,
            title: "Greenwashing",
            description: "Darum ist Greenwashing ein Problem und schadet uns allen!",
            link: "https://www.quarks.de/umwelt/klimawandel/darum-ist-greenwashing-ein-problem/"
        },
        {
            image: `https://appsterdb.ackermann.digital/assets/earth.jpg`,
            title: "Podcast Climaware",
            description: "Die erste Folge rund um Energiebilanz, den Treibhauseffekt und das Erdsystem!",
            link: "https://climaware.fireside.fm/klima-hintergrundwissen1?t=0"
        }
    ]
}


// @Component({selector: 'ngbd-carousel-basic', templateUrl: './carousel-basic.html'})
// export class NgbdCarouselBasic {

// }