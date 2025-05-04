import { SetMetadata } from '@nestjs/common';

export const IS_NO_AUTH = 'noAuth';
export const NoAuth = () => SetMetadata(IS_NO_AUTH, true);
