import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Todo } from '../../todos/todo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Engineer } from '../../engineers/entities/engineer.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @IsNotEmpty({ message: 'メールアドレスは必須です。' })
  @IsEmail({}, { message: 'メールアドレスの形式が不正です。' })
  @Column()
  email!: string;

  @IsNotEmpty({ message: 'パスワードは必須です。' })
  @MinLength(8, { message: 'パスワードは8文字以上で入力をお願いします。' })
  @MaxLength(20, { message: 'パスワードは20文字以内で入力をお願いします。' })
  @Column({ type: 'text' })
  password!: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos?: Todo[];

  @OneToOne(() => Engineer, (engineer) => engineer.user)
  engineer?: Engineer;
}
