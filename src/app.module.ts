import { Module } from '@nestjs/common';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { BookmarkModule } from './bookmark/bookmark.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [ProductsModule, MongooseModule.forRoot('mongodb+srv://ProductMan:ZqlNXP3GViPBEfYs@cluster0.wbbftwk.mongodb.net/productDB?retryWrites=true&w=majority')],
})
export class AppModule {}
