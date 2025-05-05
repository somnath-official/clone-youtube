export interface IJwtTokenPayload {
  id: string;
  sub: string;
  type?: 'accessToken' | 'refreshToken';
  iat?: number;
  exp?: number;
}
