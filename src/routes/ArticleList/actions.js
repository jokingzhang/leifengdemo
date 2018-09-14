export const FETCH_STARTED = 'ARTICLES/FETCH_STARTED';
export const FETCH_SUCCESS = 'ARTICLES/FETCH_SUCCESS';
export const FETCH_FAILURE = 'ARTICLES/FETCH_FAILURE';

export const fetchArticlesStarted = () => ({
  type: FETCH_STARTED
});

export const fetchArticlesSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})

export const fetchArticlesFailure = (error) => ({
  type: FETCH_FAILURE,
  error
})

export const fetchArticles = () => {

  return (dispatch) => {

    dispatch(fetchArticlesStarted())
    return fetch('/api/articles').then((response) => {
        if (response.ok) {
            response.json().then(data => {
                dispatch(fetchArticlesSuccess(data));
            })
        } else {
            response.json().then(error => {
                dispatch(fetchArticlesFailure(error));
            });
        }
    }).catch(error => {
        dispatch(fetchArticlesFailure(error));
    })
  };
}


