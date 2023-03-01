export class CreateUserDto {
  email: string
  name: string
  avatar: string
  password: string
  is_admin?: boolean
}