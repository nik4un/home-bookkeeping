import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'hb-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
  categories: Category[] = [];
  isLoaded = false;

  constructor(
    private categoriesService: CategoriesService,
    private meta: Meta,
    private title: Title
  ) {
    title.setTitle('Запись');
    meta.addTags([
      { name: 'keywords', content: 'запись' },
      { name: 'description', content: 'Страница записей' }
    ]);
  }

  ngOnInit() {
    this.categoriesService.getCategory()
      .pipe(delay(250)) // искуственная задержка
      .subscribe((categories: any) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  onCategoryEdit(category: Category) {
    const idx = this.categories
      .findIndex((c) => c.id === category.id);
    this.categories[idx] = category;
  }
}
