export interface ComboBox {
    setValue(value: string): Promise<void>
    setText(text: string): Promise<void>
    setIndex(index: number): Promise<void>

    getText(): Promise<string>
    getValue(): Promise<string>
    getOptions(): Promise<string[]>

    // assertValue(value: string): Promise<void>
    assertText(text: string): Promise<void>

}