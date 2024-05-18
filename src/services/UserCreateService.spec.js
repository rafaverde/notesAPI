const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")

describe("User Create Service", () => {
  let userRepository = null
  let userCreateService = null

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepository)
  })

  it("should create a user", async () => {
    const user = {
      name: "User Test",
      email: "test@email.com",
      password: "123456",
    }

    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty("id")
  })

  it("should not create user with an already existing email", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user@email.com",
      password: "123456",
    }
    const user2 = {
      name: "User Test 2",
      email: "user@email.com",
      password: "654321",
    }

    await userCreateService.execute(user1)

    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("Este email já está em uso.")
    )
  })
})
