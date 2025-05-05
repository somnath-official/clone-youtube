export interface IJwtTokenPayload {
  id: string;
  type?: 'accessToken' | 'refreshToken';
  iat?: number;
  exp?: number;
}
