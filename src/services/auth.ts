export const TOKEN_KEY = '@localiza-Token';
export const USER_ID = '@localiza-UserID';
export const USER_NAME = '@localiza-UserName';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserId = () => localStorage.getItem(USER_ID);
export const getUserName = () => localStorage.getItem(USER_NAME);

export const login = (entity) => {
  localStorage.setItem(TOKEN_KEY, entity.token);
  localStorage.setItem(USER_ID, entity.id);
  localStorage.setItem(USER_NAME, entity.nome);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER_NAME);
};
