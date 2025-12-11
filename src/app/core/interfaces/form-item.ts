export interface FormItem {
  type: 'text' | 'date' | 'select' | 'tel' | 'password' | 'email';
  label?: string;
  placeholder: string;
  name: string;
  required?: boolean;
  options?: string[];  // solo para campo 'select'
}
