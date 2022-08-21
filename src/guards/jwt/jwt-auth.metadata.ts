import { SetMetadata } from '@nestjs/common';

const IS_ALLOW = 'allow';
const Public = () => SetMetadata(IS_ALLOW, true);

export default {
  IS_ALLOW,
  Public,
};
