import { UserEntity } from "../../../src/domain";

describe("UserEntity", () => {
  it("should create an instance of UserEntity with correct properties", () => {
    const userId = 1;
    const userName = "John Doe";

    const user = new UserEntity(userId, userName);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.id).toBe(userId);
    expect(user.name).toBe(userName);
  });

  // it('should throw an error if no parameters are provided', () => {
  //     // Aquí puedes decidir cómo manejar esto, por ejemplo, lanzando un error
  //     expect(() => new UserEntity(undefined, undefined)).toThrow();
  // });

  it("should have the correct types for properties", () => {
    const user = new UserEntity(1, "Jane Doe");

    expect(typeof user.id).toBe("number");
    expect(typeof user.name).toBe("string");
  });
});
