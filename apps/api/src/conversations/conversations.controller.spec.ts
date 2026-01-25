import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/messages/create-message.dto';
import { InsertConversationDto } from './dto/insert-conversation.dto';
import { ExitConversationDto } from './dto/leave-conversation.dto';
import { JoinConversationDto } from './dto/join-conversation.dto';

describe('ConversationsController', () => {
  let controller: ConversationsController;
  let conversationsService: jest.Mocked<ConversationsService>;

  const mockMessage = {
    id: 'msg-id-1',
    ref_id: 'msg-ref-1',
    conversation_id: 'conv-id-1',
    created_by: 'user-id-1',
    text: 'Hello world',
    read_by: [{ id: 'user-id-1', read_at: new Date() }],
    media: [],
  };

  const mockConversation = {
    id: 'conv-id-1',
    ref_id: 'conv-ref-1',
    created_by: 'user-id-1',
    members: ['user-id-1', 'user-id-2'],
    ongoing_participants: ['user-id-1', 'user-id-2'],
  };

  beforeEach(async () => {
    const mockConversationsService = {
      insert_message: jest.fn(),
      insert_conversation: jest.fn(),
      exit_conversation_by_ref: jest.fn(),
      join_conversation_by_ref_id: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationsController],
      providers: [
        {
          provide: ConversationsService,
          useValue: mockConversationsService,
        },
      ],
    }).compile();

    controller = module.get<ConversationsController>(ConversationsController);
    conversationsService = module.get(ConversationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('insert_message', () => {
    const createMessageDto: CreateMessageDto = {
      conversation_id: 'conv-ref-1',
      created_by: 'user-ref-1',
      text: 'Test message',
      read_by: [],
      media: [],
      ref_id: '',
      index: 0,
    };

    it('should successfully insert a message', async () => {
      conversationsService.insert_message = jest
        .fn()
        .mockResolvedValue(mockMessage);

      const result = await controller.insert_message(createMessageDto);

      expect(conversationsService.insert_message).toHaveBeenCalledWith(
        createMessageDto,
      );
      expect(conversationsService.insert_message).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockMessage);
    });

    it('should throw BadRequestException for invalid DTO', async () => {
      const invalidDto = { text: '' } as CreateMessageDto;
      conversationsService.insert_message = jest
        .fn()
        .mockRejectedValue(
          new BadRequestException(['text should not be empty']),
        );

      await expect(controller.insert_message(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(conversationsService.insert_message).toHaveBeenCalledWith(
        invalidDto,
      );
    });

    it('should throw NotFoundException if conversation not found', async () => {
      conversationsService.insert_message = jest
        .fn()
        .mockRejectedValue(new NotFoundException('cannot find conversation'));

      await expect(controller.insert_message(createMessageDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(controller.insert_message(createMessageDto)).rejects.toThrow(
        'cannot find conversation',
      );
    });

    it('should propagate errors from service', async () => {
      const error = new Error('Database connection failed');
      conversationsService.insert_message = jest.fn().mockRejectedValue(error);

      await expect(controller.insert_message(createMessageDto)).rejects.toThrow(
        'Database connection failed',
      );
    });
  });

  describe('insert_converersation', () => {
    const insertConversationDto: InsertConversationDto = {
      created_by: 'user-ref-1',
      members: ['user-ref-1', 'user-ref-2'],
    };

    it('should successfully insert a conversation', async () => {
      conversationsService.insert_conversation = jest
        .fn()
        .mockResolvedValue(mockConversation);

      const result = await controller.insert_converersation(
        insertConversationDto,
      );

      expect(conversationsService.insert_conversation).toHaveBeenCalledWith(
        insertConversationDto,
      );
      expect(conversationsService.insert_conversation).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockConversation);
    });

    it('should throw BadRequestException for invalid DTO', async () => {
      const invalidDto = { created_by: '' } as InsertConversationDto;
      conversationsService.insert_conversation = jest
        .fn()
        .mockRejectedValue(
          new BadRequestException(['created_by should not be empty']),
        );

      await expect(
        controller.insert_converersation(invalidDto),
      ).rejects.toThrow(BadRequestException);
      expect(conversationsService.insert_conversation).toHaveBeenCalledWith(
        invalidDto,
      );
    });

    it('should throw NotFoundException if user not found', async () => {
      conversationsService.insert_conversation = jest
        .fn()
        .mockRejectedValue(new NotFoundException('user not found'));

      await expect(
        controller.insert_converersation(insertConversationDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        controller.insert_converersation(insertConversationDto),
      ).rejects.toThrow('user not found');
    });

    it('should handle different conversation data correctly', async () => {
      const differentDto: InsertConversationDto = {
        created_by: 'user-ref-2',
        members: ['user-ref-2', 'user-ref-3', 'user-ref-4'],
      };
      const differentConversation = {
        ...mockConversation,
        id: 'conv-id-2',
        ref_id: 'conv-ref-2',
        members: ['user-id-2', 'user-id-3', 'user-id-4'],
      };

      conversationsService.insert_conversation = jest
        .fn()
        .mockResolvedValue(differentConversation);

      const result = await controller.insert_converersation(differentDto);

      expect(conversationsService.insert_conversation).toHaveBeenCalledWith(
        differentDto,
      );
      expect(result).toEqual(differentConversation);
    });
  });

  describe('exit_conversation', () => {
    const exitConversationDto: ExitConversationDto = {
      ref_id: 'conv-ref-1',
      user_ref: 'user-ref-1',
    };

    it('should successfully exit a conversation', async () => {
      const updatedConversation = {
        ...mockConversation,
        ongoing_participants: ['user-id-2'],
      };

      conversationsService.exit_conversation_by_ref = jest
        .fn()
        .mockResolvedValue(updatedConversation);

      const result = await controller.exit_conversation(exitConversationDto);

      expect(
        conversationsService.exit_conversation_by_ref,
      ).toHaveBeenCalledWith(exitConversationDto);
      expect(
        conversationsService.exit_conversation_by_ref,
      ).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedConversation);
    });

    it('should throw BadRequestException for invalid DTO', async () => {
      const invalidDto = { ref_id: '' } as ExitConversationDto;
      conversationsService.exit_conversation_by_ref = jest
        .fn()
        .mockRejectedValue(
          new BadRequestException(['ref_id should not be empty']),
        );

      await expect(controller.exit_conversation(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(
        conversationsService.exit_conversation_by_ref,
      ).toHaveBeenCalledWith(invalidDto);
    });

    it('should throw NotFoundException if conversation not found', async () => {
      conversationsService.exit_conversation_by_ref = jest
        .fn()
        .mockRejectedValue(new NotFoundException('cannot find conversation'));

      await expect(
        controller.exit_conversation(exitConversationDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        controller.exit_conversation(exitConversationDto),
      ).rejects.toThrow('cannot find conversation');
    });

    it('should throw NotFoundException if user not found', async () => {
      conversationsService.exit_conversation_by_ref = jest
        .fn()
        .mockRejectedValue(new NotFoundException('user not found'));

      await expect(
        controller.exit_conversation(exitConversationDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        controller.exit_conversation(exitConversationDto),
      ).rejects.toThrow('user not found');
    });
  });

  describe('join_conversation', () => {
    const joinConversationDto: JoinConversationDto = {
      ref_id: 'conv-ref-1',
      members: ['user-ref-3'],
    };

    it('should successfully join a conversation', async () => {
      const updatedConversation = {
        ...mockConversation,
        members: ['user-id-1', 'user-id-2', 'user-id-3'],
        ongoing_participants: ['user-id-1', 'user-id-2', 'user-id-3'],
      };

      conversationsService.join_conversation_by_ref_id = jest
        .fn()
        .mockResolvedValue(updatedConversation);

      const result = await controller.join_conversation(joinConversationDto);

      expect(
        conversationsService.join_conversation_by_ref_id,
      ).toHaveBeenCalledWith(joinConversationDto);
      expect(
        conversationsService.join_conversation_by_ref_id,
      ).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedConversation);
    });

    it('should throw BadRequestException for invalid DTO', async () => {
      const invalidDto = { ref_id: '' } as JoinConversationDto;
      conversationsService.join_conversation_by_ref_id = jest
        .fn()
        .mockRejectedValue(
          new BadRequestException(['ref_id should not be empty']),
        );

      await expect(controller.join_conversation(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(
        conversationsService.join_conversation_by_ref_id,
      ).toHaveBeenCalledWith(invalidDto);
    });

    it('should throw NotFoundException if conversation not found', async () => {
      conversationsService.join_conversation_by_ref_id = jest
        .fn()
        .mockRejectedValue(new NotFoundException("didn't find conversation"));

      await expect(
        controller.join_conversation(joinConversationDto),
      ).rejects.toThrow(NotFoundException);
      await expect(
        controller.join_conversation(joinConversationDto),
      ).rejects.toThrow("didn't find conversation");
    });

    it('should handle multiple members joining', async () => {
      const multipleMembersDto: JoinConversationDto = {
        ref_id: 'conv-ref-1',
        members: ['user-ref-3', 'user-ref-4', 'user-ref-5'],
      };
      const updatedConversation = {
        ...mockConversation,
        members: [
          'user-id-1',
          'user-id-2',
          'user-id-3',
          'user-id-4',
          'user-id-5',
        ],
        ongoing_participants: [
          'user-id-1',
          'user-id-2',
          'user-id-3',
          'user-id-4',
          'user-id-5',
        ],
      };

      conversationsService.join_conversation_by_ref_id = jest
        .fn()
        .mockResolvedValue(updatedConversation);

      const result = await controller.join_conversation(multipleMembersDto);

      expect(
        conversationsService.join_conversation_by_ref_id,
      ).toHaveBeenCalledWith(multipleMembersDto);
      expect(result).toEqual(updatedConversation);
    });

    it('should propagate errors from service', async () => {
      const error = new Error('Transaction failed');
      conversationsService.join_conversation_by_ref_id = jest
        .fn()
        .mockRejectedValue(error);

      await expect(
        controller.join_conversation(joinConversationDto),
      ).rejects.toThrow('Transaction failed');
    });
  });
});
