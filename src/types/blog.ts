export interface BlogPost {
  id: number;
  name?: string;
  title: string;
  image?: string;
  description?: string;
  author?: string;
  date?: string;
  nameI18n?: Partial<Record<'pt-BR' | 'en' | 'es', string>>;
  titleI18n?: Partial<Record<'pt-BR' | 'en' | 'es', string>>;
}
