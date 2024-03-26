import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../models/task.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taskcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taskcard.component.html',
  styleUrl: './taskcard.component.scss'
})
export class TaskcardComponent implements OnInit {
  @Input() task: Task | undefined;

  ngOnInit(): void {
      console.log('Task recieved: ', this.task);
      
  }
}
