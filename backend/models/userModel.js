import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Этот код добавляет метод matchPassword к схеме пользователя в MongoDB, используя библиотеку bcryptjs.Метод позволяет сравнивать введенный пароль с захешированным паролем, который уже сохранен в базе данных.Когда пользователь пытается войти в систему, он вводит пароль, и следующее происходит:

// bcrypt.compare вызывается с двумя аргументами: паролем, который пользователь ввел(enteredPassword), и захешированным паролем из базы данных(this.password).

// bcrypt затем использует хеш из базы данных, чтобы проверить, соответствует ли введенный пароль хешированной версии.Это делается безопасно, так как реальный пароль никогда не сравнивается напрямую и не хранится в открытом виде.

// Метод возвращает true или false, указывая, совпадает ли введенный пароль с тем, что у нас есть в базе данных.

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;