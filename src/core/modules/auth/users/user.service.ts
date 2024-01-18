import { BadRequestError } from '@lib/api';
import UserModel, { UserDocument } from './user.model';
import { RoleCode, RoleModel } from '../roles/role.model';
import bcrypt from 'bcrypt';
class userService {
  constructor(
    private user: typeof UserModel,
    private role: typeof RoleModel,
  ) {}

  async duplicateCheck(email: string): Promise<boolean> {
    this.user.duplicateCheck(email);
    return true;
  }
  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = this.user.findByEmail(email);
    if (!user) {
      throw new BadRequestError('Invalid Credentials');
    }
    return user;
  }
  async comparePassword(
    candidatePassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const isMatch = await this.user.comparePassword(
      candidatePassword,
      storedPassword,
    );
    if (!isMatch) {
      throw new BadRequestError('Invalid Credentials');
    }
    return isMatch;
  }
  async updateByAnyField(field: string, value: any): Promise<void> {
    await this.user.updateByAnyField(field, value);
  }
  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.user.findByEmailAndPassword(email, password);
    if (!user) {
      throw new BadRequestError('Invalid Credentials');
    }
    return user;
  }

  async createUser(input: Partial<UserDocument>): Promise<UserDocument> {
    //check if user exists
    const user = await this.user.findByEmail(input.email);
    if (user) {
      throw new BadRequestError('Email already exists');
    }

    const role = await this.role.findOne({ code: RoleCode.LEARNER });
    //create user
    const newUser = new this.user({
      username: input.username,
      email: input.email,
      password: input.password,
      roles: [role._id],
    });

    return newUser.save();
  }
  async createUserWithRoles(
    input: Partial<UserDocument>,
  ): Promise<UserDocument> {
    const user = await this.user.findByEmail(input.email);
    if (!user) {
      throw new BadRequestError('Email already exists');
    }
    const role = await this.role.findOne({ code: input.roles });
    const newUser = new this.user({
      username: input.username,
      email: input.email,
      password: input.password,
      roles: [role._id],
    });
    return newUser.save();
  }
  async validateLogin(input: Partial<UserDocument>): Promise<UserDocument> {
    const user = await this.user.findByEmail(input.email);
    if (!user) {
      throw new BadRequestError('Invalid Credentials');
    }
    const isMatch = await bcrypt.compare(
      input.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestError('Invalid Credentials');
    }
    return user;
  }
}

export default new userService(UserModel, RoleModel);
