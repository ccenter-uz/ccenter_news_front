export type LangType = 'en' | 'ru' | 'uz';

export interface Multilang {
  en: string;
  ru: string;
  uz: string;
}

export interface ModalData {
  date: string;
  file_link: string;
  img_url: string;
  label: Multilang;
  text: Multilang;
  title: Multilang;
  order?: number;
}

export interface Todo extends ModalData {
  id: number;
}

export interface CreateTodoDto extends Omit<Todo, 'id'> {}
export interface UpdateTodoDto extends Partial<CreateTodoDto> {}

export interface UploadResponse {
  url: string;
  name?: string;
  Message?: string;
}
