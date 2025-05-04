export interface IJwtTokenPayload {
  sub: string;
  type?: 'accessToken' | 'refreshToken';
  iat?: number;
  exp?: number;
}
