import { JsonController, Get, Put, Post, Param, Body, HttpCode, NotFoundError } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {

  @Get('/users/:id')
  getUser(
    @Param('id') id: number
  ): User {
    return User.findOne[id]
  }

  @Get('/users')
  async allUsers() {
    const users = await User.find()
    return { users }
  }

  @Put('/users/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() update: Partial<User>
  ) {
    const user = await User.findOne(id)
    if (!user) throw new NotFoundError('Cannot find user')

    return User.merge(user, update).save()
  }

  @Post('/users')
  @HttpCode(201)
  createUser(
    @Body() user: User
  ) {
    return user.save()
  }
}