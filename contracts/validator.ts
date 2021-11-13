declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    /**
     * Value must be different of `compareString`
     */
    notEqualTo(compareString: string): Rule;
    /**
     * Value should be a valid format `CPF`
     */
    cpf(): Rule;
  }
}
