import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass, NgIf],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent {
  count = signal<number>(1);

  taskArray = [
    { taskName: 'Developing', isCompleted: false, isReadOnly: true },
  ];

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['newTask'].value,
      isCompleted: false,
      isReadOnly: true,
    });

    this.updateCount();
    form.reset();
  }

  updateCount() {
    let arrayLength = this.taskArray.length;
    this.count.update((value) => (value = arrayLength));
  }

  onDelete(index: number) {
    console.log(index);
    this.taskArray.splice(index, 1);

    this.updateCount();
  }

  onEdit(index: number) {
    this.taskArray[index].isReadOnly = false;
  }

  onSave(index: number, newTaskName: string) {
    this.taskArray[index].taskName = newTaskName;
    this.taskArray[index].isReadOnly = true;
  }

  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    console.log(this.taskArray);
  }
}
