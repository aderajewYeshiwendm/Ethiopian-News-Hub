const bcrypt = require('bcrypt'); 
const UserModel = require('../models/usermodel'); 
const CheckEmail = require('../routes/route').CheckEmail;
const autoSave = require('../routes/route').autoSave;

// Mocking the UserModel.findOne method
jest.mock("../models/usermodel", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

// Mocking the bcrypt.hash method
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('CheckEmail function', () => {
  it('should return true for a valid email', () => {
    const validEmail = 'aderajewy26@gmail.com';
    expect(CheckEmail(validEmail)).toBe(true);
  });

  it('should return false for an invalid email', () => {
    const invalidEmail = 'invalid-email';
    expect(CheckEmail(invalidEmail)).toBe(false);
  });
});

describe('autoSave function', () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };
  });

  it('should handle registration with unique email', async () => {
    const mockRequest = {
      body: {
        name: 'aderajew yeshiwendm',
        age: 20,
        gender: 'Male',
        address: '6-kilo addis-ababa',
        username: 'adeyeshi',
        email: 'aderajewy26@gmail.com',
        password: 'password123',
      },
    };

    UserModel.findOne.mockResolvedValue(null);
    UserModel.create.mockResolvedValue({
      _id: 'mockUserId',
      ...mockRequest.body,
    });

    bcrypt.hash.mockResolvedValue('hashedPassword123');

    await autoSave(mockRequest.body, mockRes, 'register');

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockRequest.body.email });
    expect(UserModel.create).toHaveBeenCalledWith({
      ...mockRequest.body,
      password: 'hashedPassword123',
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(mockRequest.body.password, 10);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: 'User registered successfully',
      user: expect.objectContaining({
        _id: 'mockUserId',
        ...mockRequest.body,
      }),
    });
  });
it('should handle registration with an existing email', async () => {
    const mockRequest = {
      body: {
        name: 'aderajew yeshiwendm',
        age: 20,
        gender: 'Male',
        address: '6-kilo addis-ababa',
        username: 'adeyeshi',
        email: 'aderajewy26@gmail.com',
        password: 'password123',
      },
    };

    UserModel.findOne.mockResolvedValue({
      // Mocking an existing user with the same email
      _id: 'existingUserId',
      email: mockRequest.body.email,
    });

    await autoSave(mockRequest.body, mockRes, 'register');

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockRequest.body.email });
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Email already registered',
    });
  });

  it('should handle login with valid credentials', async () => {
    const mockRequest = {
      body: {
        username: 'adeyeshi',
        
      },
    };

    UserModel.findOne.mockResolvedValue({
      // Mock user with valid credentials
      _id: 'validUserId',
      username: mockRequest.body.username,
      
    });

    await autoSave(mockRequest.body, mockRes, 'login');

    expect(UserModel.findOne).toHaveBeenCalledWith({
        
          username:mockRequest.body.username,
        })
      ;
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: 'Login successful',
    });
  });

  it('should handle login with invalid credentials', async () => {
    const mockRequest = {
      body: {
        username: 'adeyeshi',
        
      },
    };

    UserModel.findOne.mockResolvedValue(null);

    await autoSave(mockRequest.body, mockRes, 'login');

    expect(UserModel.findOne).toHaveBeenCalledWith(
       {
         
          username: "adeyeshi",
        })
      
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid credentials',
    });
  });
});
