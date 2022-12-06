import { MatPaginatorIntl } from "@angular/material/paginator";

export function PaginatorConfig(){
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.firstPageLabel = 'Początek';
    paginatorIntl.lastPageLabel = 'Koniec';
    paginatorIntl.itemsPerPageLabel = 'Rekordów na stronę';
    paginatorIntl.nextPageLabel = 'Następna strona';
    paginatorIntl.previousPageLabel = 'Poprzednia strona';
  
    return paginatorIntl;
}