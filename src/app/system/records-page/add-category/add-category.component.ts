import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'hb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements  OnInit, OnDestroy {

  message: Message;
  sub1: Subscription;

  @Output() categoryAdd = new EventEmitter<Category>();


  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
  }

  onSubmit(form: NgForm) {
    const { name, capacity } = form.value;
    const category = new Category(name, capacity);

    this.sub1 = this.categoriesService.addCategory(category)
      .subscribe((newCategory: Category) => {
        this.categoryAdd.emit(newCategory);
        form.reset();
        form.form.patchValue({ capacity: 1 });
        this.message.text = 'Категория успешно добавлена.';
        window.setTimeout(() => this.message.text = '', 2000);
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
