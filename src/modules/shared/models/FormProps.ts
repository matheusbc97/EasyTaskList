export interface FormProps<T> {
  onSubmitSuccess?: (form: T) => void;
  initialValues?: Partial<T>;
}
