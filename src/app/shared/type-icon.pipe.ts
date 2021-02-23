import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'typeIcon'
})
export class TypeIconPipe implements PipeTransform {
    transform(status: number): string {
        switch (status) {
            case 1:
                return "article";
            case 2:
                return "movie";
            case 3:
                return "menu_book";
            case 4:
                return "category";
            case 5:
                return "smartphone";
            case 6:
                return "link";
            case 7:
                return "keyboard_voice";
            default:
                return "link";
        }
    }
}
