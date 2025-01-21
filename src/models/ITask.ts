export interface Task {
  id: string;
  title: string;
  dueDate: string;
  description: string;
  priority: string;
  completed: boolean;
  createdAT: string;
}

//ändra interface så att completed är med ->
//ändra skapandet i modala så att completed är inkluderat ->
//ändra mongoose.schema så att completed är inkluderat ->
