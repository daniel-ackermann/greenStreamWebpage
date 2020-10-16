import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/typings';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: Item[], searchText: string): any[] {

        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();

        return items.filter((it:Item) => {
            return it.title.toLocaleLowerCase().includes(searchText) || it.description.toLocaleLowerCase().includes(searchText);
        });
    }
}