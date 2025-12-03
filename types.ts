export interface Letter {
  id: string;
  letterCode: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Unspecified';
  schoolYear: string;
  requestSummary: string;
  fullTranscription: string;
  categories: ('Brinquedo' | 'Roupa' | 'Calçado' | 'Material Escolar' | 'Outros')[];
  status: 'available' | 'adopted';
}

export interface FilterState {
  search: string;
  category: string;
  ageRange: string;
}