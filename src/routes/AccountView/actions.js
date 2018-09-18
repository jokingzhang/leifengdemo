export const FETCH_STARTED = 'ACCOUNTS/FETCH_STARTED';
export const FETCH_SUCCESS = 'ACCOUNTS/FETCH_SUCCESS';
export const FETCH_FAILURE = 'ACCOUNTS/FETCH_FAILURE';

export const fetchAccountsStarted = () => ({
  type: FETCH_STARTED
});

export const fetchAccountsSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})

export const fetchAccountsFailure = (error) => ({
  type: FETCH_FAILURE,
  error
})

export const fetchAccounts = () => {

  return (dispatch) => {

    dispatch(fetchAccountsStarted())

    return fetch('/api/accounts').then((response) => {
        if (response.ok) {
            response.json().then(data => {
                dispatch(fetchAccountsSuccess(data));
            })
        } else {
            response.json().then(error => {
                dispatch(fetchAccountsFailure(error));
            });
        }
    }).catch(error => {
        dispatch(fetchAccountsFailure(error));
    })
  };
}


