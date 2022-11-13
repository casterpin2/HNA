import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'labelfilter',
    pure: false
})
export class LabelFilterPipe implements PipeTransform {
    transform(items: any[], label: string): any {
        if (!items || !label) {
            return items;
        }
        return items.filter((item:any) => {
            let itemLabel = item && item.label.toLocaleLowerCase() || '';
            let filterLabel = label && label.toLocaleLowerCase() || '';
            return itemLabel.includes(filterLabel);
        });
    }
}