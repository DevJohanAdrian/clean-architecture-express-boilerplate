export class UpdateUserDto{
    private constructor(
        public readonly id:number,
        public readonly name: string
    ){}
}