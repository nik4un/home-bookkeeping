import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'hb-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() categoryEdit = new EventEmitter<Category>();

  selectedCategoryId = 1;
  selectedCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    const { capacity, name } = form.value;
    this.selectedCategory.name = name;
    this.selectedCategory.capacity = capacity;

    this.categoriesService.updateCategory(this.selectedCategory)
      .subscribe((editedCategory: Category) => {
        this.categoryEdit.emit(editedCategory);
        this.message.text = 'Категория успешно отредактирована.';
        window.setTimeout(() => this.message.text = '', 2000);
      });
  }

  onCategoryChange() {
    this.selectedCategory = this.categories
      .find((c) => c.id === +this.selectedCategoryId);
  }
}
