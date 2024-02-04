import { UserService } from '@app/services/quiz.service';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';

@Service()
export class UserController {
    router: Router;

    constructor(private readonly userService: UserService) {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        // Retrieve all users
        this.router.get('/allUsers', async (req: Request, res: Response) => {
            try {
                const users = await this.userService.retrieveAllUsers();
                res.json(users);
            } catch (error) {
                const errorMessage = {
                    title: 'Error',
                    body: error.message || 'Internal Server Error',
                };
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
            }
        });

        // Retrieve a user by email
        this.router.post('/getUser', async (req: Request, res: Response) => {
            const userEmail = req.body.email;
            try {
                const user = await this.userService.getUserByEmail(userEmail);
                if (user) {
                    res.json(user);
                } else {
                    res.status(StatusCodes.NOT_FOUND).json({
                        title: 'Error',
                        body: 'User not found',
                    });
                }
            } catch (error) {
                const errorMessage = {
                    title: 'Error',
                    body: error.message || 'Internal Server Error',
                };
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
            }
        });

        // Modify a user
        this.router.put('/', async (req: Request, res: Response) => {
            const userEmail = req.body.email;
            const updatedUserData = req.body.newPlace;
            try {
                const updatedUser = await this.userService.modifyUser(userEmail, updatedUserData);
                res.json(updatedUser);
            } catch (error) {
                const errorMessage = {
                    title: 'Error',
                    body: error.message || 'Internal Server Error',
                };
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
            }
        });

        // Add a user
        this.router.post('/create', async (req: Request, res: Response) => {
            const userData = req.body;
            try {
                const user = await this.userService.addUser(userData);
                res.json(user);
            } catch (error) {
                const errorMessage = {
                    title: 'Error',
                    body: error.message || 'Internal Server Error',
                };
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
            }
        });
    }
}
