export interface IStoreState {
    todos: Todo[];
    visibilityFilter: VisibilityFilters;
}

export enum VisibilityFilters {
    SHOW_ALL= 'SHOW_ALL',
    SHOW_COMPLETED = 'SHOW_COMPLETED',
    SHOW_ACTIVE = 'SHOW_ACTIVE'
}

export class Todo {
    public completed: boolean;
    public id: number;
    public text: string;
    constructor(completed: boolean, id: number, text: string) {
        this.completed = completed;
        this.id = id;
        this.text = text;
    }
}