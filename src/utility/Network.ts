import { AxiosError } from "axios";

/**
 * Returns whether the error caused by calling axios is due
 * to a network error. Should be checked inside of the catch block
 * of an axios call.
 * Based off this suggestion:
 * https://github.com/axios/axios/issues/383#issuecomment-539499963
 * @param {AxiosError} error - object that contains information 
 * about the axios error.
 */
export const isNetworkError = (error: AxiosError) => 
{
  return !!error.isAxiosError && !error.response;
}