import { Module } from '@nestjs/common';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { BookmarkModule } from './bookmark/bookmark.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
})
export class AppModule {}
