import { User } from "../../../../domain/user/models/User";
import { UserResponse } from "../dtos/UserResponse";

export class UserMapper {
    static toResponseDTO(user: User): UserResponse {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
  }
  