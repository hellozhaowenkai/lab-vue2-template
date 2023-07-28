/**
 * Root
 */

// state
export interface RootState {
  message: string;
}
// getters
export const DEFAULT_MESSAGE = "DEFAULT_MESSAGE";
export const GET_MESSAGE = "GET_MESSAGE";
// mutations
export const INSERT_MESSAGE = "INSERT_MESSAGE";
export const SELECT_MESSAGE = "SELECT_MESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
// actions
export const ADD_MESSAGE = "ADD_MESSAGE";
export const FIND_MESSAGE = "FIND_MESSAGE";
export const CHANGE_MESSAGE = "CHANGE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

/**
 * Root.Like
 */

// state
export interface LikeModule {
  pk: number;
  totalCount: number;
}
export interface LikeState {
  allLikes: Array<LikeModule>;
}
// getters
export const DEFAULT_LIKE = "DEFAULT_LIKE";
export const GET_LIKE = "GET_LIKE";
// mutations
export const UPDATE_LIKE = "UPDATE_LIKE";
// actions
export const CHANGE_LIKE = "CHANGE_LIKE";
