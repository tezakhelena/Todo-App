import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Moment } from 'moment';

export interface Task {
  id: number;
  naslov: string;
  opis: string;
  rokIzvrsenja: Moment;
  datumKreiranja?: Date;
  status?: string;
  vaznostZadatka: string;
  podzadatak?: Subtask[];
}

export interface Subtask {
  id: number;
  opis: string;
  dovrseno: boolean;
}

export interface ZadaciState {
  tasks: Task[];
}

const initialState: ZadaciState = {
  tasks: [],
};

export const zadaciSlice = createSlice({
  name: 'zadaci',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ naslov: string; opis: string; rokIzvrsenja: Moment, vaznostZadatka: string, podzadatak?: Subtask[] }>) => {
      const noviZadatak: Task = {
        id: new Date().getTime(),
        naslov: action.payload.naslov,
        opis: action.payload.opis,
        rokIzvrsenja: action.payload.rokIzvrsenja,
        datumKreiranja: new Date(),
        status: "aktivno",
        vaznostZadatka: action.payload.vaznostZadatka,
        podzadatak: action.payload.podzadatak ? action.payload.podzadatak.map((podzadatak, index) => ({
          ...podzadatak,
          id: index + 1
        })) || [] : [],
      };
      state.tasks.push(noviZadatak);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const { id, naslov, opis, rokIzvrsenja, vaznostZadatka } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          naslov,
          opis,
          rokIzvrsenja,
          vaznostZadatka
        };
      }
    },
    deleteTask: (state, action: PayloadAction<number | null>) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    updateTaskStatus: (state, action: PayloadAction<{ taskId: number; status: 'aktivno' | 'dovrseno' }>) => {
      const { taskId, status } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);

      if (taskToUpdate) {
        taskToUpdate.status = status;
      }
    },
    markSubtaskCompleted: (state, action: PayloadAction<{ taskId: number; subtaskId: number }>) => {
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.taskId && task.podzadatak) {
            return {
              ...task,
              podzadatak: task.podzadatak.map(subtask => {
                if (subtask.id === action.payload.subtaskId) {
                  return {
                    ...subtask,
                    dovrseno: true,
                  };
                }
                return subtask;
              }),
            };
          }
          return task;
        }),
      };
    }
  },
});

export const { addTask, editTask, deleteTask, updateTaskStatus, markSubtaskCompleted } = zadaciSlice.actions;

export default zadaciSlice.reducer;
