import { Test, TestingModule } from '@nestjs/testing';
import { SignupService } from './signup.service';
import { UsersService } from '@/users/users.service';
import { MutationsService } from '@app/mutations';
import { InsertUserDto } from '@/users/dto/insert-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('SignupService', () => {
  let service: SignupService;
  let usersService: jest.Mocked<UsersService>;
  let mutationsService: jest.Mocked<MutationsService>;

  const mockInsertUserDto: InsertUserDto = {
    email: 'newuser@example.com',
    firstname: 'Jane',
    surname: 'Smith',
    timezone: 'America/Los_Angeles',
    password: undefined,
  };

  const mockCreatedUser = {
    id: 'user-id-1',
    ref_id: 'user-ref-1',
    email: 'newuser@example.com',
    firstname: 'Jane',
    surname: 'Smith',
    timezone: 'America/Los_Angeles',
    avatar: undefined,
    password: undefined,
  };

  beforeEach(async () => {
    usersService = {
      insert_user: jest.fn(),
    } as any;

    mutationsService = {
      execute: jest.fn(),
      getRepo: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignupService,
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: MutationsService,
          useValue: mutationsService,
        },
      ],
    }).compile();

    service = module.get<SignupService>(SignupService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup_user', () => {
    it('should successfully sign up a user', async () => {
      usersService.insert_user = jest.fn().mockResolvedValue(mockCreatedUser);

      const result = await service.signup_user(mockInsertUserDto);

      expect(usersService.insert_user).toHaveBeenCalledWith(mockInsertUserDto);
      expect(usersService.insert_user).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCreatedUser);
    });

    it('should throw BadRequestException when email is already registered', async () => {
      usersService.insert_user = jest
        .fn()
        .mockRejectedValue(new BadRequestException('email already registered'));

      await expect(service.signup_user(mockInsertUserDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.signup_user(mockInsertUserDto)).rejects.toThrow(
        'email already registered',
      );
      expect(usersService.insert_user).toHaveBeenCalledWith(mockInsertUserDto);
    });

    it('should throw BadRequestException for invalid DTO', async () => {
      const invalidDto = { email: 'invalid-email' } as InsertUserDto;
      usersService.insert_user = jest
        .fn()
        .mockRejectedValue(new BadRequestException(['email must be an email']));

      await expect(service.signup_user(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(usersService.insert_user).toHaveBeenCalledWith(invalidDto);
    });

    it('should propagate other errors from UsersService', async () => {
      const error = new Error('Database connection failed');
      usersService.insert_user = jest.fn().mockRejectedValue(error);

      await expect(service.signup_user(mockInsertUserDto)).rejects.toThrow(
        'Database connection failed',
      );
    });

    it('should handle different user data correctly', async () => {
      const differentUserDto: InsertUserDto = {
        email: 'another@example.com',
        firstname: 'Bob',
        surname: 'Johnson',
        timezone: 'Europe/London',
        password: undefined,
      };
      const differentCreatedUser = {
        ...mockCreatedUser,
        ...differentUserDto,
        id: 'user-id-2',
        ref_id: 'user-ref-2',
      };

      usersService.insert_user = jest
        .fn()
        .mockResolvedValue(differentCreatedUser);

      const result = await service.signup_user(differentUserDto);

      expect(usersService.insert_user).toHaveBeenCalledWith(differentUserDto);
      expect(result).toEqual(differentCreatedUser);
    });
  });
});
