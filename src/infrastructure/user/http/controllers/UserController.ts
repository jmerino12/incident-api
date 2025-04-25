import { injectable, inject } from "inversify";
import { Request, Response } from 'express';
import { CreateUser } from "../../../../application/user/usecases/CreateUser";
import { GetAllUser } from "../../../../application/user/usecases/GetAllUser";
import { GetUserById } from "../../../../application/user/usecases/GetUserById";
import { UpdateUser } from "../../../../application/user/usecases/UpdateUser";
import { DeleteUser } from "../../../../application/user/usecases/DeleteUser";
import { CreateUserRequest } from "../dtos/CreateUserRequest";
import { UserResponse } from "../dtos/UserResponse";
import { UserMapper } from "../mappers/UserMapper";

@injectable()
export class UserController {
    constructor(
        @inject(CreateUser) private createUser: CreateUser,
        @inject(GetAllUser) private getAllUser: GetAllUser,
        @inject(GetUserById) private getUserById: GetUserById,
        @inject(UpdateUser) private updateUser: UpdateUser,
        @inject(DeleteUser) private deleteUser: DeleteUser,
    ) { }
    async create(req: Request, res: Response) {
        const data: CreateUserRequest = {
            identification: req.body.identification,
            name: req.body.name,
            email: req.body.email,
        };
        const user = await this.createUser.execute(data);

        const response: UserResponse = UserMapper.toResponseDTO(user);

        res.status(201).json(response);
    }

    async getAll(req: Request, res: Response) {
        const users = await this.getAllUser.execute();

        const response: UserResponse[] = users.map(user => UserMapper.toResponseDTO(user));

        res.status(200).json(response);

    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await this.updateUser.execute({ id, name, email });

        const response: UserResponse = UserMapper.toResponseDTO(user);

        res.json(response);

    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        await this.deleteUser.execute(id);
        res.status(204).send();

    }

    async getById(req: Request, res: Response) {
         const { id } = req.params;
     
         const user = await this.getUserById.execute(id);
         
         const response = UserMapper.toResponseDTO(user);
         
         res.status(200).json(response);

    }
}
